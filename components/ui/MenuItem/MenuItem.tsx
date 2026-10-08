'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';
import type { ComponentProps } from 'react';

type Props = {
  href: ComponentProps<typeof Link>['href'];
  children: React.ReactNode;
};

export function MenuItem({ href, children }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'px-4 py-2',
        'rounded-full',
        'text-sm font-medium',
        'cursor-pointer',
        'hover:bg-black/3 dark:hover:bg-white/5',
        'text-neutral-500 dark:text-neutral-400',
        'hover:text-orange-600 dark:hover:text-orange-400',
        'transition-colors duration-200',
        isActive && 'text-orange-600 dark:text-orange-400',
        isActive && 'bg-black/5 dark:bg-white/10',
      )}
    >
      {children}
    </Link>
  );
}
