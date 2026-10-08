'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import type { ILocale } from '@/i18n/routing';
import { uiIcons } from '@/icon/ui';
import { wait } from '@/lib/utils/async';
import { cn } from '@/lib/utils/cn';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { DropdownMenu } from 'radix-ui';
import { useState } from 'react';

const SIZE = 14;

interface IMenuLocaleItem {
  value: ILocale;
  key: ILocale;
  label: string;
}

const OPTIONS: IMenuLocaleItem[] = [
  {
    value: 'pt',
    key: 'pt',
    label: 'BR',
  },
  {
    value: 'en',
    key: 'en',
    label: 'US',
  },
] as const;

export function MenuLocale() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const tLocale = useTranslations('locale');

  const [displayLocale, setDisplayLocale] = useState(locale);
  const [open, setOpen] = useState(false);

  const selectedLocale =
    OPTIONS.find(option => option.value === displayLocale) ?? OPTIONS[0];

  const handleLocaleChange = async (value: string) => {
    if (value === displayLocale) return;

    setDisplayLocale(value);
    setOpen(false);
    await wait(150);

    router.replace(pathname, {
      locale: value,
      scroll: false,
    });
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
            'bg-white dark:bg-neutral-800',
            'border-neutral-200 dark:border-neutral-700',
            'hover:bg-neutral-100 dark:hover:bg-neutral-700',
            'cursor-pointer',
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={selectedLocale.value}
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
              {selectedLocale.label}
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
                'w-38',
                'rounded-md border',
                'p-1',
                'bg-white dark:bg-neutral-800',
                'border-neutral-200 dark:border-neutral-700',
                'shadow-md',
              )}
            >
              <DropdownMenu.RadioGroup
                value={locale}
                onValueChange={handleLocaleChange}
                className={cn('flex flex-col gap-0.5')}
              >
                {OPTIONS.map(option => (
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
                      <span className="text-sm font-semibold">
                        {option.label}
                      </span>
                      <span>{tLocale(option.key)}</span>
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
                          className={cn('text-orange-500 dark:text-amber-400')}
                          width={SIZE - 4}
                          height={SIZE - 4}
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
