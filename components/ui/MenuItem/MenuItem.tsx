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

  const menuItemClass = cn(
    'cursor-pointer rounded-full px-4 py-2',
    'text-menumain-item-text text-sm font-medium',
    'hover:text-menumain-item-text-hover',
    'hover:bg-menumain-item-background-hover',
    'transition-colors duration-300',
  );

  const menuItemActiveClass = cn(
    'text-menumain-item-text-active',
    'bg-menumain-item-background-active',
  );

  return (
    <Link
      href={href}
      className={cn(menuItemClass, isActive && menuItemActiveClass)}
    >
      {children}
    </Link>
  );
}
