'use client';

import { Container } from '@/components/layouts/Container/Container';
import { Text } from '@/components/ui/Text/Text';
import { Title } from '@/components/ui/Title/Title';
import type { ILocale } from '@/i18n/routing';
import { icons } from '@/icon';
import { cn } from '@/lib/utils/cn';
import { localize } from '@/lib/utils/localize';
import type { ITechnologyGroup } from '@/schemas/zod/technologies';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
  locale: ILocale;
  technologies: ITechnologyGroup[];
}

export function TechnologiesGrid({ locale, technologies }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedGroup = technologies[selectedIndex];

  return (
    <div className={cn('h-104', 'grid grid-cols-2 gap-6')}>
      <div className={cn('flex flex-col justify-between')}>
        {technologies.map((group, index) => {
          const isSelected = index === selectedIndex;
          const Icon = icons[group.icon];

          return (
            <Container
              key={group.icon}
              className={cn('p-0')}
              effect={{ type: 'select', selected: isSelected }}
            >
              <button
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  'focus-visible-inset',
                  'w-full',
                  'flex items-start gap-4',
                  'rounded-2xl',
                  'p-4',
                  'cursor-pointer',
                )}
              >
                <div
                  className={cn(
                    'flex shrink-0 items-center justify-center',
                    'rounded-xl border',
                    'p-2.5',
                    'transition-colors duration-200',
                    'bg-neutral-100 dark:bg-neutral-800',
                    'border-neutral-200 dark:border-neutral-700',
                    isSelected && 'bg-orange-500/10 dark:bg-amber-400/15',
                    isSelected &&
                      'border-orange-500/15 dark:border-amber-400/30',
                  )}
                >
                  <Icon
                    className={cn(
                      'size-5',
                      'transition-colors duration-200',
                      'text-neutral-400 dark:text-neutral-500',
                      isSelected && 'text-orange-500 dark:text-amber-400',
                    )}
                  />
                </div>

                <div className={cn('flex flex-col gap-1', 'text-left')}>
                  <span
                    className={cn(
                      'flex items-center justify-between',
                      'transition-colors duration-200',
                    )}
                  >
                    <Title
                      text={localize(group.title, locale)}
                      className={cn(
                        'text-md font-medium',
                        !isSelected && 'text-neutral-400 dark:text-neutral-600',
                      )}
                    />

                    <Text
                      text={`[ ${group.techs.length} ]`}
                      muted={!isSelected}
                      className={cn('text-xs')}
                    />
                  </span>

                  <Text
                    text={localize(group.description, locale)}
                    muted={!isSelected}
                    className={cn('text-xs')}
                  />
                </div>
              </button>
            </Container>
          );
        })}
      </div>

      <Container className={cn('overflow-y-auto')}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            className={cn('flex flex-wrap gap-3')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {selectedGroup?.techs.map((tech, index) => {
              const Icon = icons[tech.icon];

              return (
                <motion.div
                  key={tech.label}
                  className="group min-w-34 flex-1"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: 'easeOut',
                  }}
                >
                  <div
                    className={cn(
                      'h-full w-full',
                      'flex flex-col items-center justify-center gap-2',
                      'rounded-2xl border',
                      'px-7 py-5',
                      'transition-all duration-200',
                      'bg-neutral-100 dark:bg-neutral-800',
                      'border-neutral-200 dark:border-neutral-700',
                      'hover:bg-neutral-200/70 dark:hover:bg-neutral-700/70',
                      'hover:border-orange-500/75 dark:hover:border-amber-400/75',
                      'hover:-translate-y-1',
                    )}
                  >
                    <Icon
                      className={cn(
                        'size-6',
                        'transition-transform duration-350',
                        'group-hover:scale-115',
                      )}
                    />

                    <Text
                      text={tech.label.toUpperCase()}
                      muted
                      className={cn(
                        'text-xs',
                        'font-roboto-mono',
                        'group-hover:text-neutral-700 dark:group-hover:text-neutral-300',
                      )}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </Container>
    </div>
  );
}
