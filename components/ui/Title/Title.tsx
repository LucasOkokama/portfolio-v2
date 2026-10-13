import { cn } from '@/lib/utils/cn';

type TitleVariant = 'neutral' | 'primary' | 'secondary';
type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface Props {
  text: string;
  className?: string;
  variant?: TitleVariant;
  hover?: boolean;
  level?: TitleLevel;
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

export function Title({
  text,
  className,
  variant = 'neutral',
  hover = false,
  level = 1,
}: Props) {
  const Heading = `h${level}` as const;

  return (
    <Heading
      className={cn(
        'font-outfit text-3xl font-bold',
        'transition-colors duration-200',
        variantStyles[variant],
        hover && hoverStyles[variant],
        className,
      )}
    >
      {text}
    </Heading>
  );
}
