import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';
import styles from './BadgeStatus.module.css';

type BadgeStatusVariant =
  | 'success'
  | 'warning'
  | 'error'
  | 'information'
  | 'new'
  | 'featured'
  | 'neutral';

type BadgeStatusShape = 'pill' | 'square';

interface Props {
  children: ReactNode;
  variant?: BadgeStatusVariant;
  shape?: BadgeStatusShape;
  indicatorVariant?: BadgeStatusVariant;
  className?: string;
}

const variantStyles: Record<BadgeStatusVariant, string> = {
  success: cn(
    'bg-green-400/10',
    'border-green-600/20',
    'hover:border-green-600/50 dark:hover:border-green-500/50',
    'text-green-500 dark:text-green-400',
    'hover:text-green-700 dark:hover:text-green-300',
  ),

  warning: cn(
    'bg-yellow-400/10',
    'border-yellow-600/20',
    'hover:border-yellow-600/50 dark:hover:border-yellow-500/50',
    'text-yellow-500 dark:text-yellow-400',
    'hover:text-yellow-700 dark:hover:text-yellow-300',
  ),

  error: cn(
    'bg-red-400/10',
    'border-red-600/20',
    'hover:border-red-600/50 dark:hover:border-red-500/50',
    'text-red-500 dark:text-red-400',
    'hover:text-red-700 dark:hover:text-red-300',
  ),

  information: cn(
    'bg-blue-400/10',
    'border-blue-600/20',
    'hover:border-blue-600/50 dark:hover:border-blue-500/50',
    'text-blue-500 dark:text-blue-400',
    'hover:text-blue-700 dark:hover:text-blue-300',
  ),

  new: cn(
    'bg-purple-400/10',
    'border-purple-600/20',
    'hover:border-purple-600/50 dark:hover:border-purple-500/50',
    'text-purple-500 dark:text-purple-400',
    'hover:text-purple-700 dark:hover:text-purple-300',
  ),

  featured: cn(
    'bg-orange-400/10',
    'border-orange-600/20',
    'hover:border-orange-600/50 dark:hover:border-orange-500/50',
    'text-orange-500 dark:text-orange-400',
    'hover:text-orange-700 dark:hover:text-orange-300',
  ),

  neutral: cn(
    'bg-black/5 dark:bg-white/5',
    'border-neutral-300 dark:border-neutral-800',
    'hover:border-neutral-400 dark:hover:border-neutral-600',
    'text-neutral-500 dark:text-neutral-400',
    'hover:text-neutral-700 dark:hover:text-neutral-300',
  ),
};

const indicatorStyles: Record<BadgeStatusVariant, string> = {
  success: 'text-green-500 dark:text-green-400',
  warning: 'text-yellow-500 dark:text-yellow-400',
  error: 'text-red-500 dark:text-red-400',
  information: 'text-blue-500 dark:text-blue-400',
  new: 'text-purple-500 dark:text-purple-400',
  featured: 'text-orange-500 dark:text-orange-400',
  neutral: 'text-neutral-500 dark:text-neutral-400',
};

const shapeStyles: Record<BadgeStatusShape, string> = {
  pill: 'rounded-full',
  square: 'rounded-md',
};

export function BadgeStatus({
  children,
  variant = 'information',
  shape = 'pill',
  indicatorVariant,
  className,
}: Props) {
  const variantStyle = variantStyles[variant];
  const indicatorStyle = indicatorStyles[indicatorVariant ?? variant];

  return (
    <span
      className={cn(
        'w-fit',
        'inline-flex items-center justify-center gap-1',
        'border',
        'px-3.5 py-2',
        'text-xs leading-none font-medium',
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

      {children}
    </span>
  );
}
