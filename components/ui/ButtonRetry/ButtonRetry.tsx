import { Text } from '@/components/ui/Text/Text';
import { uiIcons } from '@/icon/ui';
import { cn } from '@/lib/utils/cn';

interface Props {
  message: string | null | undefined;
  loading?: boolean;
  onRetry: () => void;
  className?: string;
}

export function ButtonRetry({
  message,
  loading = false,
  onRetry,
  className,
}: Props) {
  return (
    <div
      className={cn(
        'font-inter group flex w-full min-w-0 items-center gap-2.5',
        className,
      )}
    >
      <button
        type="button"
        onClick={onRetry}
        disabled={loading}
        aria-label="Retry"
        className={cn(
          'shrink-0',
          'cursor-pointer disabled:cursor-not-allowed',
          'transition-colors duration-200',
          'disabled:opacity-50',
          'text-neutral-400 dark:text-neutral-600',
          'group-hover:text-neutral-600 dark:group-hover:text-neutral-400',
        )}
      >
        {loading ? (
          <uiIcons.reload width={14} height={14} className="animate-spin" />
        ) : (
          <uiIcons.reload width={14} height={14} />
        )}
      </button>

      {!loading && message && (
        <Text
          text={message}
          className={cn(
            'truncate',
            'text-xs',
            'transition-opacity duration-200',
            'opacity-60 group-hover:opacity-100',
            'text-red-600 dark:text-red-400',
          )}
        />
      )}
    </div>
  );
}
