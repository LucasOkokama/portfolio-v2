import { cn } from '@/lib/utils/cn';

interface PlaceholderDisabledProps {
  className?: string;
}

export function PlaceholderDisabled({ className }: PlaceholderDisabledProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'h-full w-full',
        'rounded-lg border',
        'opacity-50',
        'cursor-not-allowed',
        'bg-[repeating-linear-gradient(135deg,var(--color-neutral-300)_0_2px,transparent_2px_4px)]',
        'dark:bg-[repeating-linear-gradient(135deg,var(--color-neutral-700)_0_2px,transparent_2px_4px)]',
        'border-neutral-300 dark:border-neutral-700',
        className,
      )}
    />
  );
}
