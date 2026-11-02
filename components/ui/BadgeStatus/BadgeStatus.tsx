import { cn } from '@/lib/utils/cn';
import styles from './BadgeStatus.module.css';

export type BadgeStatusVariant =
  | 'success'
  | 'warning'
  | 'error'
  | 'information'
  | 'new'
  | 'featured'
  | 'neutral';

type BadgeStatusShape = 'pill' | 'square';

interface Props {
  label: string;
  variant?: BadgeStatusVariant;
  shape?: BadgeStatusShape;
  indicatorVariant?: BadgeStatusVariant;
  backgroundOpacity?: number;
  className?: string;
}

const variantBackgroundOpacity: Record<BadgeStatusVariant, number> = {
  success: 10,
  warning: 10,
  error: 10,
  information: 10,
  new: 10,
  featured: 10,
  neutral: 5,
};

const variantStyles: Record<BadgeStatusVariant, string> = {
  success: cn(
    'bg-green-400/[var(--badge-bg-opacity)]',
    'border-green-600/20',
    'hover:border-green-600/50 dark:hover:border-green-500/50',
    'text-green-600 dark:text-green-400',
    'hover:text-green-800 dark:hover:text-green-300',
  ),

  warning: cn(
    'bg-yellow-400/[var(--badge-bg-opacity)]',
    'border-yellow-600/20',
    'hover:border-yellow-600/50 dark:hover:border-yellow-500/50',
    'text-yellow-600 dark:text-yellow-400',
    'hover:text-yellow-800 dark:hover:text-yellow-300',
  ),

  error: cn(
    'bg-red-400/[var(--badge-bg-opacity)]',
    'border-red-600/20',
    'hover:border-red-600/50 dark:hover:border-red-500/50',
    'text-red-600 dark:text-red-400',
    'hover:text-red-800 dark:hover:text-red-300',
  ),

  information: cn(
    'bg-blue-400/[var(--badge-bg-opacity)]',
    'border-blue-600/20',
    'hover:border-blue-600/50 dark:hover:border-blue-500/50',
    'text-blue-600 dark:text-blue-400',
    'hover:text-blue-800 dark:hover:text-blue-300',
  ),

  new: cn(
    'bg-purple-400/[var(--badge-bg-opacity)]',
    'border-purple-600/20',
    'hover:border-purple-600/50 dark:hover:border-purple-500/50',
    'text-purple-600 dark:text-purple-400',
    'hover:text-purple-800 dark:hover:text-purple-300',
  ),

  featured: cn(
    'bg-amber-500/[var(--badge-bg-opacity)] dark:bg-amber-400/[var(--badge-bg-opacity)]',
    'border-amber-600/20',
    'hover:border-amber-600/50 dark:hover:border-amber-500/50',
    // 'text-amber-600 dark:text-amber-400',
    'hover:text-amber-800 dark:hover:text-amber-300',
  ),

  neutral: cn(
    'bg-black/[var(--badge-bg-opacity)] dark:bg-white/[var(--badge-bg-opacity)]',
    'border-neutral-300 dark:border-neutral-600',
    'hover:border-neutral-400 dark:hover:border-neutral-500',
    'text-neutral-600 dark:text-neutral-400',
    'hover:text-neutral-800 dark:hover:text-neutral-200',
  ),
};

const indicatorStyles: Record<BadgeStatusVariant, string> = {
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  error: 'text-red-600 dark:text-red-400',
  information: 'text-blue-600 dark:text-blue-400',
  new: 'text-purple-600 dark:text-purple-400',
  featured: 'text-orange-600 dark:text-orange-400',
  neutral: 'text-neutral-800 dark:text-neutral-400',
};

const shapeStyles: Record<BadgeStatusShape, string> = {
  pill: 'rounded-full',
  square: 'rounded-md',
};

export function BadgeStatus({
  label,
  variant = 'information',
  shape = 'pill',
  indicatorVariant,
  backgroundOpacity,
  className,
}: Props) {
  const variantStyle = variantStyles[variant];
  const indicatorStyle = indicatorStyles[indicatorVariant ?? variant];

  const bgOpacity = backgroundOpacity ?? variantBackgroundOpacity[variant];

  return (
    <span
      style={
        {
          '--badge-bg-opacity': `${bgOpacity}%`,
        } as React.CSSProperties
      }
      className={cn(
        'w-fit',
        'inline-flex items-center justify-center gap-1',
        'border',
        'px-3.5 py-2',
        'leading-none font-medium',
        'whitespace-nowrap',
        'transition-colors duration-200',
        variantStyle,
        shapeStyles[shape],
        className,
      )}
    >
      {indicatorVariant && (
        <span
          aria-hidden="true"
          className={cn(
            'size-1.75',
            'mr-1.5',
            'shrink-0',
            'rounded-full',
            'bg-current',
            'shadow-[0_0_8px_currentColor]',
            styles.pulse,
            indicatorStyle,
          )}
        />
      )}
      <span className={cn('text-xs')}>{label}</span>
    </span>
  );
}
