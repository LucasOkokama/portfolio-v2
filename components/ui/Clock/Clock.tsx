'use client';

import { SkeletonGeneric } from '@/components/layouts/SkeletonGeneric/SkeletonGeneric';
import { uiIcons } from '@/icon/ui';
import { cn } from '@/lib/utils/cn';
import { useSyncExternalStore } from 'react';
import { Text } from '../Text/Text';

interface Props {
  city: string;
  timezone: string;
  showSeconds?: boolean;
}

function getGMTOffset(timezone: string, date: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    timeZoneName: 'longOffset',
  }).formatToParts(date);

  const offset = parts.find(part => part.type === 'timeZoneName')?.value;

  if (!offset || offset === 'GMT') {
    return 'GMT';
  }

  return offset.replace(':00', '').replace(/^GMT([+-])0(\d)/, 'GMT$1$2');
}

let currentTimestamp = Date.now();

function subscribe(callback: () => void) {
  const interval = window.setInterval(() => {
    currentTimestamp = Date.now();
    callback();
  }, 1000);

  return () => {
    window.clearInterval(interval);
  };
}

function getSnapshot() {
  return currentTimestamp;
}

function getServerSnapshot() {
  return 0;
}

export function Clock({ city, timezone, showSeconds = false }: Props) {
  const timestamp = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const now = timestamp === 0 ? null : new Date(timestamp);

  const time = now
    ? new Intl.DateTimeFormat('pt-BR', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        ...(showSeconds && {
          second: '2-digit',
        }),
        hour12: false,
      }).format(now)
    : null;

  const gmt = now ? getGMTOffset(timezone, now) : null;

  return (
    <div
      className={cn(
        'flex justify-between gap-2.5',
        'rounded-2xl border',
        'p-4',
        'text-sm',
        'bg-neutral-100 dark:bg-neutral-800',
        'border-neutral-200 dark:border-neutral-700',
      )}
    >
      <div className={cn('flex items-center justify-center gap-2.5')}>
        <uiIcons.pin width={16} height={16} />

        <div className={cn('flex items-center justify-center gap-1')}>
          <Text text={city} className={cn('font-semibold')} />
          {gmt ? (
            <Text
              text={gmt}
              muted
              className={cn('mt-0.5', 'text-xs', 'font-medium')}
            />
          ) : (
            <SkeletonGeneric className="h-3.5 w-10" />
          )}
        </div>
      </div>

      {time ? (
        <a
          href="https://time.is/V%C3%ADnland,_Canada"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'font-semibold',
            'transition-colors duration-200',
            'hover:text-orange-500 dark:hover:text-amber-400',
          )}
        >
          {time}
        </a>
      ) : (
        <SkeletonGeneric className="h-5 w-14" />
      )}
    </div>
  );
}
