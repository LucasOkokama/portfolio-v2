'use client';

import { SkeletonGeneric } from '@/components/layouts/SkeletonGeneric/SkeletonGeneric';
import { useMounted } from '@/hooks/useMounted';
import { uiIcons } from '@/icon/ui';
import { cn } from '@/lib/utils/cn';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { DropdownMenu } from 'radix-ui';
import { useState } from 'react';

const SIZE = 14;

const OPTIONS = [
  {
    value: 'light',
    key: 'light',
    icon: uiIcons.sun,
  },
  {
    value: 'dark',
    key: 'dark',
    icon: uiIcons.moon,
  },
  {
    value: 'system',
    key: 'system',
    icon: uiIcons.desktopComputer,
  },
] as const;

export function MenuTheme() {
  const mounted = useMounted();
  const tTheme = useTranslations('theme');
  const { theme, setTheme } = useTheme();

  const [open, setOpen] = useState(false);

  const selectedTheme = mounted
    ? (OPTIONS.find(option => option.value === theme) ?? OPTIONS[2])
    : null;

  const SelectedIcon = selectedTheme?.icon;

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
            'bg-white dark:bg-neutral-800',
            'border-neutral-200 dark:border-neutral-700',
            'hover:bg-neutral-100 dark:hover:bg-neutral-700',
            'cursor-pointer',
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {!mounted ? (
              <SkeletonGeneric className="size-3.5" />
            ) : SelectedIcon ? (
              <motion.span
                key={selectedTheme.value}
                initial={{
                  opacity: 0,
                  x: -6,
                  y: 6,
                  rotate: -30,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: 6,
                  y: 6,
                  rotate: 30,
                  scale: 0.8,
                }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              >
                <SelectedIcon width={SIZE} height={SIZE} />
              </motion.span>
            ) : null}
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
                'w-32',
                'rounded-md border',
                'p-1',
                'bg-white dark:bg-neutral-800',
                'border-neutral-200 dark:border-neutral-700',
                'shadow-md',
              )}
            >
              <DropdownMenu.RadioGroup
                value={theme}
                onValueChange={setTheme}
                className={cn('flex flex-col gap-0.5')}
              >
                {OPTIONS.map(option => {
                  const Icon = option.icon;

                  return (
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
                      <div className={cn('flex items-center gap-3', 'text-xs')}>
                        <Icon width={SIZE} height={SIZE} />
                        <span>{tTheme(option.key)}</span>
                      </div>

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
                            className={cn(
                              'text-orange-500 dark:text-amber-400',
                            )}
                            width={SIZE - 4}
                            height={SIZE - 4}
                          />
                        </motion.span>
                      </DropdownMenu.ItemIndicator>
                    </DropdownMenu.RadioItem>
                  );
                })}
              </DropdownMenu.RadioGroup>
            </motion.div>
          </DropdownMenu.Content>
        )}
      </AnimatePresence>
    </DropdownMenu.Root>
  );
}
