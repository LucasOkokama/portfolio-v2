import { cn } from '@/lib/utils/cn';
import type { ComponentProps } from 'react';

type Props = {
  gradient?: boolean;
} & ComponentProps<'div'>;

export function Divider({ gradient = false, className, ...props }: Props) {
  return (
    <div
      className={cn(
        'w-full',
        gradient
          ? 'h-px bg-linear-to-r from-neutral-200 to-transparent dark:from-neutral-800'
          : 'border-t border-neutral-200 dark:border-neutral-800',
        className,
      )}
      {...props}
    />
  );
}
