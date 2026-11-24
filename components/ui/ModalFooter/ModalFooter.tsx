import { uiIcons } from '@/icon/ui';
import { cn } from '@/lib/utils/cn';
import { useTranslations } from 'next-intl';

const SIZE = 9;

type Props = {
  arrowShortcutLabel?: string;
  shiftArrowShortcutLabel?: string;
};

function ShortcutKey({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2',
        'h-6',
        'rounded-lg',
        'px-2.5',
        'bg-neutral-300/70 dark:bg-neutral-800/70',
      )}
    >
      {children}
    </div>
  );
}

export function ModalFooter({
  arrowShortcutLabel,
  shiftArrowShortcutLabel,
}: Props) {
  const tModal = useTranslations('modal');

  return (
    <div
      className={cn(
        'flex items-center justify-between',
        'px-4 py-2',
        'border-t',
        'text-xs',
        'bg-neutral-200/70 dark:bg-neutral-950/40',
        'border-t-neutral-300/70 dark:border-t-neutral-800',
        'text-neutral-400 dark:text-neutral-600',
      )}
    >
      <div className="flex items-center justify-center gap-2">
        <ShortcutKey>
          <span className="font-bold">ESC</span>
        </ShortcutKey>

        <span className="font-semibold tracking-wider">
          {tModal('close').toUpperCase()}
        </span>
      </div>

      {arrowShortcutLabel && (
        <div className="flex items-center justify-center gap-2">
          <ShortcutKey>
            <uiIcons.caretLeft width={SIZE} height={SIZE} />
            <span>/</span>
            <uiIcons.caretRight width={SIZE} height={SIZE} />
          </ShortcutKey>

          <span className="font-semibold tracking-wider">
            {arrowShortcutLabel.toUpperCase()}
          </span>
        </div>
      )}

      {shiftArrowShortcutLabel && (
        <div className="flex items-center justify-center gap-2">
          <ShortcutKey>
            <span className="font-semibold">SHIFT</span>
            <uiIcons.shift width={SIZE} height={SIZE} />
          </ShortcutKey>

          <ShortcutKey>
            <uiIcons.caretLeft width={SIZE} height={SIZE} />
            <span>/</span>
            <uiIcons.caretRight width={SIZE} height={SIZE} />
          </ShortcutKey>

          <span className="font-semibold tracking-wider">
            {shiftArrowShortcutLabel.toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
}
