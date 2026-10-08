import { cn } from '@/lib/utils/cn';

type Effect =
  { type: 'select'; selected: boolean } | { type: 'hover' } | undefined;

interface Props {
  children: React.ReactNode;
  className?: string;
  effect?: Effect;
}

export function Container({ children, className, effect }: Props) {
  const isSelected = effect?.type === 'select' && effect.selected;
  const hasHover = effect?.type === 'hover';

  return (
    <div
      className={cn(
        'w-full',
        'rounded-2xl border',
        'p-7',
        'transition-colors duration-200',
        'overflow-hidden',
        'bg-neutral-50 dark:bg-neutral-900',
        'border-neutral-200 dark:border-neutral-800',
        isSelected && 'bg-neutral-100 dark:bg-neutral-800',
        isSelected && 'border-neutral-300 dark:border-neutral-700',
        hasHover && 'hover:bg-neutral-100 dark:hover:bg-neutral-800',
        hasHover && 'hover:border-neutral-300 dark:hover:border-neutral-700',
        className,
      )}
    >
      {children}
    </div>
  );
}
