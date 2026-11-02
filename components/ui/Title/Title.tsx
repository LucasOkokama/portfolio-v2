import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';

type TitleType = 'mainTitle' | 'subTitle';
type TitleVariant = 'neutral' | 'primary' | 'secondary';
type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface Props {
  text: string;
  className?: string;
  type?: TitleType;
  variant?: TitleVariant;
  hover?: boolean;
  level?: TitleLevel;
  rightElement?: ReactNode;
}

const variantStyles: Record<TitleVariant, string> = {
  neutral: cn('text-neutral-900 dark:text-neutral-100'),
  primary: cn('text-orange-500 dark:text-amber-400'),
  secondary: cn('text-purple-500 dark:text-purple-400'),
};

const hoverStyles: Record<TitleVariant, string> = {
  neutral: cn('hover:text-neutral-700 dark:hover:text-neutral-300'),
  primary: cn('hover:text-orange-600 dark:hover:text-amber-500'),
  secondary: cn('hover:text-purple-600 dark:hover:text-purple-500'),
};

const typeStyles: Record<TitleType, string> = {
  mainTitle: cn('font-outfit text-3xl font-bold'),
  subTitle: cn('font-roboto-mono text-xs tracking-widest'),
};

export function Title({
  text,
  className,
  type = 'mainTitle',
  variant = 'neutral',
  hover = false,
  level = 1,
  rightElement,
}: Props) {
  const Heading = `h${level}` as const;

  return (
    <Heading
      className={cn(
        'transition-colors duration-200',
        typeStyles[type],
        variantStyles[variant],
        hover && hoverStyles[variant],
        rightElement && 'flex items-center justify-between gap-4',
        className,
      )}
    >
      <span>{text}</span>

      {rightElement}
    </Heading>
  );
}
