import { cn } from '@/lib/utils/cn';
import type { ComponentProps } from 'react';

type Props = {
  href: string;
} & Omit<ComponentProps<'a'>, 'href'>;

export function ExternalLink({ href, children, className, ...props }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'text-sm',
        'cursor-pointer',
        'text-amber-600/85 dark:text-amber-400/85',
        'bg-[linear-gradient(currentColor,currentColor)] bg-position-[0_100%] bg-no-repeat',
        'transition-[color,background-size] duration-200',
        'bg-size-[0%_1px] hover:bg-size-[100%_1px]',
        'hover:text-amber-600 hover:dark:text-amber-400',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
