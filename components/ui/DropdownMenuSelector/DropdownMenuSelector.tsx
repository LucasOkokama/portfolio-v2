import { uiIcons } from '@/icon/ui';
import { cn } from '@/lib/utils/cn';
import { AnimatePresence, motion } from 'framer-motion';
import { DropdownMenu } from 'radix-ui';
import { ReactNode, useState } from 'react';

const SIZE = 10;

export interface IDropdownMenuSelectorOption {
  value: string;
}

interface Props<T extends IDropdownMenuSelectorOption> {
  value: string | null;
  options: readonly T[];
  width: string;
  onValueChange: (value: string) => void | Promise<void>;
  renderTrigger: (option: T | null) => ReactNode;
  renderOption: (option: T) => ReactNode;
}

export function DropdownMenuSelector<T extends IDropdownMenuSelectorOption>({
  value,
  options,
  width,
  onValueChange,
  renderTrigger,
  renderOption,
}: Props<T>) {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find(option => option.value === value) ?? null;

  const handleValueChange = async (nextValue: string) => {
    await onValueChange(nextValue);
  };

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className={cn(
            'size-8.5',
            'flex items-center justify-center',
            'rounded-lg border',
            'text-xs font-medium',
            'cursor-pointer',
            'bg-white dark:bg-neutral-800',
            'border-neutral-200 dark:border-neutral-700',
            'hover:bg-neutral-100 dark:hover:bg-neutral-700',
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={selectedOption?.value ?? 'empty'}
              initial={{
                opacity: 0,
                x: -6,
                y: 6,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                x: 6,
                y: 6,
                scale: 0.8,
              }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              {renderTrigger(selectedOption)}
            </motion.span>
          </AnimatePresence>
        </button>
      </DropdownMenu.Trigger>

      <AnimatePresence>
        {open && (
          <DropdownMenu.Content
            forceMount
            asChild
            align="end"
            sideOffset={6}
            onCloseAutoFocus={event => {
              event.preventDefault();
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.9 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className={cn(
                'rounded-md border',
                'p-1',
                'bg-white dark:bg-neutral-800',
                'border-neutral-200 dark:border-neutral-700',
                'shadow-md',
                width,
              )}
            >
              <DropdownMenu.RadioGroup
                value={value ?? undefined}
                onValueChange={handleValueChange}
                className={cn('flex flex-col gap-0.5')}
              >
                {options.map(option => (
                  <DropdownMenu.RadioItem
                    key={option.value}
                    value={option.value}
                    className={cn(
                      'flex items-center justify-between',
                      'px-2 py-1.5',
                      'rounded-md border border-transparent',
                      'transition-all duration-200 ease-out',
                      'cursor-pointer',
                      'data-[highlighted]:pl-3',
                      'data-[highlighted]:bg-orange-500/5',
                      'data-[highlighted]:dark:bg-amber-400/15',
                      'data-[highlighted]:border-orange-500/15',
                      'data-[highlighted]:dark:border-amber-400/15',
                      'data-[highlighted]:text-orange-500',
                      'data-[highlighted]:dark:text-amber-400',
                    )}
                  >
                    {renderOption(option)}

                    <DropdownMenu.ItemIndicator asChild>
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.15,
                          ease: 'easeOut',
                        }}
                      >
                        <uiIcons.check
                          className={cn('text-orange-500 dark:text-amber-400')}
                          width={SIZE}
                          height={SIZE}
                        />
                      </motion.span>
                    </DropdownMenu.ItemIndicator>
                  </DropdownMenu.RadioItem>
                ))}
              </DropdownMenu.RadioGroup>
            </motion.div>
          </DropdownMenu.Content>
        )}
      </AnimatePresence>
    </DropdownMenu.Root>
  );
}
