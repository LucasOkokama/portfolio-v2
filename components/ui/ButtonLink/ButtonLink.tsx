import { icons } from '@/icon';
import { cn } from '@/lib/utils/cn';
import type { IIconName } from '@/schemas/zod/common';
import Link from 'next/link';

type ButtonLinkVariant = 'neutral' | 'primary' | 'secondary';
type ButtonLinkIconPosition = 'left' | 'right';

type Props = {
  href: string;
  internal?: boolean;
  variant?: ButtonLinkVariant;
  iconPosition?: ButtonLinkIconPosition;
  className?: string;
  iconClassName?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
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

const variantStyles: Record<ButtonLinkVariant, string> = {
  neutral: cn(
    'border-neutral-300 dark:border-neutral-700',
    'text-neutral-600 dark:text-neutral-300',
    'hover:bg-neutral-200 dark:hover:bg-neutral-800',
    'hover:border-neutral-300 dark:hover:border-neutral-600',
    'hover:text-orange-500 dark:hover:text-amber-400',
  ),
  primary: cn(
    'bg-orange-500 dark:bg-amber-400',
    'border-transparent',
    'text-neutral-50 dark:text-neutral-900',
    'hover:bg-orange-600 dark:hover:bg-amber-500',
  ),
  secondary: cn(
    'bg-purple-500 dark:bg-purple-400',
    'border-transparent',
    'text-neutral-50 dark:text-neutral-900',
    'hover:bg-purple-600 dark:hover:bg-purple-500',
  ),
};

export function ButtonLink({
  href,
  icon,
  text,
  internal = false,
  variant = 'neutral',
  iconPosition = 'left',
  className,
  iconClassName,
  target = '_blank',
  rel = 'noopener noreferrer',
}: Props) {
  const Icon = icon ? icons[icon] : undefined;

  const content = (
    <>
      {Icon && iconPosition === 'left' && (
        <Icon className={cn('size-4', iconClassName)} />
      )}

      {text && <span>{text}</span>}

      {Icon && iconPosition === 'right' && (
        <Icon className={cn('size-4', iconClassName)} />
      )}
    </>
  );

  const classNameValue = cn(
    'group',
    'flex items-center justify-center gap-2',
    'px-3 py-1.5',
    'rounded-sm border',
    'text-sm font-medium',
    'cursor-pointer',
    'transition-colors duration-200',
    variantStyles[variant],
    className,
  );

  if (internal) {
    return (
      <Link href={href} className={classNameValue}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} target={target} rel={rel} className={classNameValue}>
      {content}
    </a>
  );
}
