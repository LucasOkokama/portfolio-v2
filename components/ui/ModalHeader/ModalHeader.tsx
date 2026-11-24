import { uiIcons } from '@/icon/ui';
import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';

type Props = {
  leftElement: ReactNode;
  title: string;
  onPrevious: () => void;
  onNext: () => void;
  onClose: () => void;
  isNavigationDisabled?: boolean;
};

export function ModalHeader({
  leftElement,
  title,
  onPrevious,
  onNext,
  onClose,
  isNavigationDisabled = false,
}: Props) {
  return (
    <div
      className={cn(
        'grid grid-cols-3 items-center',
        'px-4 py-2',
        'border-b',
        'bg-neutral-200/70 dark:bg-neutral-950/40',
        'border-b-neutral-300/70 dark:border-b-neutral-800',
        'text-sm',
      )}
    >
      <div className="flex items-center gap-3">{leftElement}</div>

      <span
        className={cn(
          'text-center',
          'font-semibold tracking-wider',
          'text-purple-500 dark:text-purple-400',
        )}
      >
        {title.toUpperCase()}
      </span>

      <div className="flex items-center gap-6 justify-self-end">
        <div className="flex gap-1">
          <button
            type="button"
            onClick={onPrevious}
            disabled={isNavigationDisabled}
            aria-label="Previous item"
            className={cn(
              'p-2.5',
              'rounded-lg',
              'transition-colors duration-200',
              isNavigationDisabled
                ? 'cursor-not-allowed opacity-50'
                : cn(
                    'cursor-pointer',
                    'hover:text-neutral-950 dark:hover:text-neutral-50',
                    'hover:bg-neutral-300/70 dark:hover:bg-neutral-700/70',
                  ),
            )}
          >
            <uiIcons.chevronLeft width={12} height={12} />
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={isNavigationDisabled}
            aria-label="Next item"
            className={cn(
              'p-2.5',
              'rounded-lg',
              'transition-colors duration-200',
              isNavigationDisabled
                ? 'cursor-not-allowed opacity-50'
                : cn(
                    'cursor-pointer',
                    'hover:text-neutral-950 dark:hover:text-neutral-50',
                    'hover:bg-neutral-300/70 dark:hover:bg-neutral-700/70',
                  ),
            )}
          >
            <uiIcons.chevronRight width={12} height={12} />
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className={cn(
            'p-2.5',
            'rounded-lg',
            'transition-colors duration-200',
            'cursor-pointer',
            'hover:text-red-500 hover:dark:text-red-400',
            'hover:bg-neutral-300/70 dark:hover:bg-neutral-700/70',
          )}
        >
          <uiIcons.close width={14} height={14} />
        </button>
      </div>
    </div>
  );
}
