import { icons } from '@/icon';
import { cn } from '@/lib/utils/cn';
import type { IIconName } from '@/schemas/zod/common';

type ButtonVariant = 'neutral' | 'primary' | 'secondary';
type ButtonIconPosition = 'left' | 'right';

type ButtonProps = {
  variant?: ButtonVariant;
  iconPosition?: ButtonIconPosition;
  className?: string;
  iconClassName?: string;
  onClick: () => void;
} & (
  | {
      icon: IIconName;
      text?: string;
    }
  | {
      icon?: IIconName;
      text: string;
    }
);

const variantStyles: Record<ButtonVariant, string> = {
  neutral: cn(
    'bg-transparent dark:bg-white/10',
    'border-neutral-300 dark:border-neutral-600',
    'text-neutral-600 dark:text-neutral-200',
    'hover:bg-black/3 hover:dark:bg-white/15',
    'hover:text-orange-500 dark:hover:text-amber-400',
  ),
  primary: cn(
    'bg-orange-400 dark:bg-amber-600',
    'border-transparent',
    'text-neutral-50 dark:text-neutral-50',
    'hover:bg-orange-500 dark:hover:bg-amber-700',
  ),
  secondary: cn(
    'bg-purple-400 dark:bg-purple-600',
    'border-transparent',
    'text-neutral-50 dark:text-neutral-50',
    'hover:bg-purple-500 dark:hover:bg-purple-700',
  ),
};

export function Button({
  icon,
  text,
  variant = 'neutral',
  iconPosition = 'left',
  className,
  iconClassName,
  onClick,
}: ButtonProps) {
  const Icon = icon ? icons[icon] : undefined;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group',
        'flex items-center justify-center gap-2',
        'px-3 py-1.5',
        'rounded-sm border',
        'text-sm font-medium',
        'cursor-pointer',
        'transition-colors duration-200',
        variantStyles[variant],
        className,
      )}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className={cn('size-4', iconClassName)} />
      )}

      {text && <span>{text}</span>}

      {Icon && iconPosition === 'right' && (
        <Icon className={cn('size-4', iconClassName)} />
      )}
    </button>
  );
}
