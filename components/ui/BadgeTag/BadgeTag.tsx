import { icons } from '@/icon';
import { cn } from '@/lib/utils/cn';
import type { IIconName } from '@/schemas/zod/common.schema';

export type BadgeTagVariant =
  | 'success'
  | 'warning'
  | 'error'
  | 'information'
  | 'new'
  | 'featured'
  | 'neutral';

interface Props {
  label: React.ReactNode;
  icon?: IIconName;
  variant?: BadgeTagVariant;
  backgroundOpacity?: number;
  className?: string;
  classNameIcon?: string;
  classNameLabel?: string;
}

const variantBackgroundOpacity: Record<BadgeTagVariant, number> = {
  success: 10,
  warning: 10,
  error: 10,
  information: 10,
  new: 10,
  featured: 10,
  neutral: 5,
};

const variantStyles: Record<BadgeTagVariant, string> = {
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
    'text-amber-600 dark:text-amber-400',
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

export function BadgeTag({
  label,
  icon,
  variant = 'neutral',
  backgroundOpacity,
  className,
  classNameIcon,
  classNameLabel,
}: Props) {
  const Icon = icon ? icons[icon] : undefined;

  const bgOpacity = backgroundOpacity ?? variantBackgroundOpacity[variant];

  return (
    <div
      style={
        {
          '--badge-bg-opacity': `${bgOpacity}%`,
        } as React.CSSProperties
      }
      className={cn(
        'flex items-center justify-center gap-2',
        'rounded-sm border',
        'transition-colors duration-200',
        'px-2.5 py-1.25',
        variantStyles[variant],
        className,
      )}
    >
      {Icon && <Icon className={cn('h-3 w-auto', classNameIcon)} />}

      <span className={cn('text-xs', classNameLabel)}>{label}</span>
    </div>
  );
}
