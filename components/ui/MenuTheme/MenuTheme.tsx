'use client';

import { SkeletonGeneric } from '@/components/layouts/SkeletonGeneric/SkeletonGeneric';
import { useMounted } from '@/hooks/useMounted';
import { uiIcons } from '@/icon/ui';
import { cn } from '@/lib/utils/cn';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { DropdownMenuSelector } from '../DropdownMenuSelector/DropdownMenuSelector';

const SIZE = 14;

const OPTIONS = [
  {
    value: 'light',
    key: 'light',
    icon: uiIcons.sun,
  },
  {
    value: 'dark',
    key: 'dark',
    icon: uiIcons.moon,
  },
  {
    value: 'system',
    key: 'system',
    icon: uiIcons.desktopComputer,
  },
] as const;

export function MenuTheme() {
  const mounted = useMounted();
  const tTheme = useTranslations('theme');
  const { theme, setTheme } = useTheme();

  const selectedTheme =
    OPTIONS.find(option => option.value === theme) ?? OPTIONS[2];

  return (
    <DropdownMenuSelector
      value={mounted ? selectedTheme.value : null}
      options={OPTIONS}
      width="w-32"
      onValueChange={setTheme}
      renderTrigger={option => {
        if (!option) {
          return <SkeletonGeneric className="size-3.5" />;
        }

        const Icon = option.icon;
        return <Icon width={SIZE} height={SIZE} />;
      }}
      renderOption={option => {
        const Icon = option.icon;
        return (
          <div className={cn('flex items-center gap-3', 'text-xs')}>
            <Icon width={SIZE} height={SIZE} />
            <span>{tTheme(option.key)}</span>
          </div>
        );
      }}
    />
  );
}
