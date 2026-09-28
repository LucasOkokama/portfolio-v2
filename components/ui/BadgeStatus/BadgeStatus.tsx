import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';
import styles from './BadgeStatus.module.css';

type BadgeStatusVariant =
  'success' | 'warning' | 'error' | 'information' | 'new' | 'neutral';

type BadgeStatusShape = 'pill' | 'square';

interface Props {
  children: ReactNode;
  variant?: BadgeStatusVariant;
  shape?: BadgeStatusShape;
  indicatorVariant?: BadgeStatusVariant;
}

const variantStyles: Record<
  BadgeStatusVariant,
  {
    background: string;
    border: string;
    text: string;
  }
> = {
  success: {
    background: 'bg-badgestatus-background-success',
    border: 'border-badgestatus-border-success',
    text: 'text-badgestatus-text-success',
  },

  warning: {
    background: 'bg-badgestatus-background-warning',
    border: 'border-badgestatus-border-warning',
    text: 'text-badgestatus-text-warning',
  },

  error: {
    background: 'bg-badgestatus-background-error',
    border: 'border-badgestatus-border-error',
    text: 'text-badgestatus-text-error',
  },

  information: {
    background: 'bg-badgestatus-background-information',
    border: 'border-badgestatus-border-information',
    text: 'text-badgestatus-text-information',
  },

  new: {
    background: 'bg-badgestatus-background-new',
    border: 'border-badgestatus-border-new',
    text: 'text-badgestatus-text-new',
  },

  neutral: {
    background: 'bg-badgestatus-background-neutral',
    border: 'border-badgestatus-border-neutral',
    text: 'text-badgestatus-text-neutral',
  },
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
}: Props) {
  const variantStyle = variantStyles[variant];
  const indicatorStyle = variantStyles[indicatorVariant ?? variant];

  return (
    <span
      className={cn(
        'inline-flex w-fit items-center justify-center gap-1',
        'border',
        'px-3.5 py-2',
        'text-xs leading-none font-medium',
        'whitespace-nowrap',
        shapeStyles[shape],
        variantStyle.background,
        variantStyle.border,
        variantStyle.text,
      )}
    >
      {indicatorVariant && (
        <span
          className={cn(
            'mr-1.5 size-1.75 shrink-0 rounded-full',
            'bg-current',
            'shadow-[0_0_8px_currentColor]',
            styles.pulse,
            indicatorStyle.text,
          )}
          aria-hidden="true"
        />
      )}

      {children}
    </span>
  );
}
