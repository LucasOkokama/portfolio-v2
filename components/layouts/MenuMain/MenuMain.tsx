import { MenuItem } from '@/components/ui/MenuItem/MenuItem';
import { MenuLocale } from '@/components/ui/MenuLocale/MenuLocale';
import { MenuTheme } from '@/components/ui/MenuTheme/MenuTheme';
import { Link } from '@/i18n/navigation';
import { brandIcons } from '@/icon/brand';
import { cn } from '@/lib/utils/cn';
import { getTranslations } from 'next-intl/server';

export async function MenuMain() {
  const tMainMenu = await getTranslations('mainmenu');

  return (
    <header>
      <div
        className={cn(
          'w-full',
          'flex items-center justify-between gap-6',
          'px-5 py-3',
          'rounded-full border',
          'bg-neutral-50 dark:bg-neutral-900',
          'border-neutral-200 dark:border-neutral-700',
        )}
      >
        <div className={cn('flex items-center gap-6')}>
          <Link
            href="/"
            className={cn(
              'cursor-pointer',
              'transition-colors duration-500',
              'text-orange-400 dark:text-amber-400',
              'hover:text-orange-500 dark:hover:text-amber-500',
            )}
          >
            <brandIcons.logo width={26} height={26} />
          </Link>

          <div
            className={cn(
              'flex gap-2',
              'text-sm font-medium',
              'text-neutral-500 dark:text-neutral-400',
            )}
          >
            <MenuItem href="/projects">{tMainMenu('projects')}</MenuItem>
            <MenuItem href="/journey">{tMainMenu('journey')}</MenuItem>
            <MenuItem href="/certificates">
              {tMainMenu('certificates')}
            </MenuItem>
          </div>
        </div>

        <div className={cn('flex items-center justify-center gap-3')}>
          <MenuLocale />
          <MenuTheme />
        </div>
      </div>
    </header>
  );
}
