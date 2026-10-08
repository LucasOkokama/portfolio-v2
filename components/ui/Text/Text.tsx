import { cn } from '@/lib/utils/cn';

interface Props {
  text: string;
  muted?: boolean;
  className?: string;
}

export function Text({ text, muted = false, className }: Props) {
  return (
    <p
      className={cn(
        'text-sm leading-6',
        muted
          ? 'text-neutral-400 dark:text-neutral-500'
          : 'text-neutral-600 dark:text-neutral-400',
        className,
      )}
    >
      {text}
    </p>
  );
}
