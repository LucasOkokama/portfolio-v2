'use client';

import { BadgeTag } from '@/components/ui/BadgeTag/BadgeTag';
import type { ILocale } from '@/i18n/routing';
import { icons } from '@/icon';
import { cn } from '@/lib/utils/cn';
import { localize } from '@/lib/utils/localize';
import type { ITechnologyGroup } from '@/types/technologies.type';
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
    <div className={cn('grid grid-cols-2 gap-6')}>
      <div className={cn('flex flex-col gap-4')}>
        {technologies.map((group, index) => {
          const isSelected = index === selectedIndex;
          const Icon = icons[group.icon];

          return (
            <button
              key={group.icon}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={cn(
                'flex items-start gap-4',
                'bg-technologiesgrid-categorytechs-background',
                'border-technologiesgrid-categorytechs-border rounded-xl border',
                'p-4',
                'transition-colors duration-200',
                isSelected &&
                  'bg-technologiesgrid-categorytechs-background-selected border-technologiesgrid-categorytechs-border-selected',
              )}
            >
              <div
                className={cn(
                  'shrink-0',
                  'flex items-center justify-center',
                  'bg-technologiesgrid-iconbox-background',
                  'border-technologiesgrid-categorytechs-border rounded-xl border',
                  'p-2.5',
                  'transition-colors duration-200',
                  isSelected &&
                    'bg-technologiesgrid-iconbox-background-selected',
                )}
              >
                <Icon
                  className={cn(
                    'text-technologiesgrid-icon size-5',
                    'transition-colors duration-200',
                    isSelected && 'text-technologiesgrid-icon-selected',
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
                  <span
                    className={cn(
                      'font-medium',
                      'text-technologiesgrid-categorytechstitle-text',
                      isSelected &&
                        'text-technologiesgrid-categorytechstitle-text-selected',
                    )}
                  >
                    {localize(group.title, locale)}
                  </span>
                  <span
                    className={cn(
                      'text-technologiesgrid-categorytechsdescription-text flex gap-0.5 text-xs font-normal',
                    )}
                  >
                    <span>[</span>
                    <span>{group.techs.length}</span>
                    <span>]</span>
                  </span>
                </span>

                <p
                  className={cn(
                    'text-technologiesgrid-categorytechsdescription-text text-xs',
                    'transition-colors duration-200',
                    isSelected &&
                      'text-technologiesgrid-categorytechsdescription-text-selected',
                  )}
                >
                  {localize(group.description, locale)}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div
        className={cn(
          'min-w-0',
          'flex flex-wrap content-start gap-3',
          'border-technologiesgrid-techs-border rounded-xl border',
          'p-8',
          'bg-technologiesgrid-techs-background',
          '[background-image:linear-gradient(to_right,var(--color-technologiesgrid-techs-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-technologiesgrid-techs-grid)_1px,transparent_1px)]',
          '[background-size:30px_30px]',
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            className="flex flex-wrap content-start gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {selectedGroup?.techs.map((tech, index) => (
              <motion.div
                key={tech.label}
                initial={{ opacity: 0, y: 3, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.15,
                  delay: index * 0.02,
                  ease: 'easeOut',
                }}
              >
                <BadgeTag label={tech.label} icon={tech.icon} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
