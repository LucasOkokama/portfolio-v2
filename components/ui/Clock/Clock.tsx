'use client';

import { SkeletonGeneric } from '@/components/layouts/SkeletonGeneric/SkeletonGeneric';
import { uiIcons } from '@/icon/ui';
import { cn } from '@/lib/utils/cn';
import { useSyncExternalStore } from 'react';

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
        'bg-clock-background',
        'border-clock-border',
        'flex justify-between',
        'gap-2.5',
        'rounded-2xl border',
        'p-4',
        'text-sm',
      )}
    >
      <div className={cn('flex items-center justify-center', 'gap-2.5')}>
        <uiIcons.pin
          width={16}
          height={16}
          className={cn('text-clock-text-primary')}
        />

        <div>
          <span className={cn('text-clock-text-primary', 'font-semibold')}>
            {city}
          </span>{' '}
          {gmt ? (
            <span
              className={cn('text-clock-text-secondary', 'mt-0.5', 'text-xs')}
            >
              {gmt}
            </span>
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
            'text-clock-text-primary',
            'font-semibold',
            'transition-colors',
            'hover:text-brand-primary',
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
