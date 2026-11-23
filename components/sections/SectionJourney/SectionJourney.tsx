'use client';

import { ExperienceCard } from '@/components/features/ExperienceCard/ExperienceCard';
import { ExperienceDetails } from '@/components/features/ExperienceDetails/ExperienceDetails';
import { Section } from '@/components/layouts/Section/Section';
import { Divider } from '@/components/ui/Divider/Divider';
import { Title } from '@/components/ui/Title/Title';
import type { ILocale } from '@/i18n/routing';
import { uiIcons } from '@/icon/ui';
import { cn } from '@/lib/utils/cn';
import { journeyAcademic, journeyProfessional } from '@/lib/utils/loaders';
import { localize } from '@/lib/utils/localize';
import type { IExperienceType } from '@/schemas/zod/journey.schema';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';

type Props = {
  locale: ILocale;
};

type ISelectedExperience = {
  type: IExperienceType;
  index: number;
};

export function SectionJourney({ locale }: Props) {
  const [selectedExperience, setSelectedExperience] =
    useState<ISelectedExperience | null>(null);

  const title = {
    pt: 'Jornada',
    en: 'Journey',
  };

  const tExperienceColumn = useTranslations('experienceColumn');

  const experiences =
    selectedExperience?.type === 'academic'
      ? journeyAcademic.experiences
      : journeyProfessional.experiences;

  const selectedItem =
    selectedExperience !== null
      ? (experiences[selectedExperience.index] ?? null)
      : null;

  const handlePrevious = useCallback(() => {
    if (selectedExperience === null || experiences.length === 0) return;

    setSelectedExperience(previous => {
      if (!previous) return null;

      return {
        ...previous,
        index: (previous.index - 1 + experiences.length) % experiences.length,
      };
    });
  }, [selectedExperience, experiences]);

  const handleNext = useCallback(() => {
    if (selectedExperience === null || experiences.length === 0) return;

    setSelectedExperience(previous => {
      if (!previous) return null;

      return {
        ...previous,
        index: (previous.index + 1) % experiences.length,
      };
    });
  }, [selectedExperience, experiences]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
        return;
      }

      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
      ) {
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePrevious();
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlePrevious, handleNext]);

  return (
    <div>
      <Section
        title={localize(title, locale)}
        command="$ git log --reverse --oneline"
      >
        <div className={cn('grid grid-cols-2 gap-12')}>
          <div className={cn('flex flex-col gap-6')}>
            <div className={cn('flex items-center gap-2.5')}>
              <uiIcons.graduationCap
                width={16}
                height={16}
                className={cn(
                  'shrink-0',
                  'text-neutral-600 dark:text-neutral-400',
                )}
              />
              <Title
                text={tExperienceColumn('experienceAcademic')}
                className={cn(
                  'text-md font-medium whitespace-nowrap',
                  'text-neutral-600 dark:text-neutral-400',
                )}
              />
              <Divider gradient className={cn('ml-2')} />
            </div>

            {journeyAcademic.experiences.map((item, index) => (
              <ExperienceCard
                key={index}
                experience={item}
                locale={locale}
                onDetails={() =>
                  setSelectedExperience({
                    type: 'academic',
                    index,
                  })
                }
              />
            ))}
          </div>

          <div className={cn('flex flex-col gap-6')}>
            <div className={cn('flex items-center gap-2.5')}>
              <uiIcons.suitcase
                width={16}
                height={16}
                className={cn(
                  'shrink-0',
                  'text-neutral-600 dark:text-neutral-400',
                )}
              />
              <Title
                text={tExperienceColumn('experienceProfessional')}
                className={cn(
                  'text-md font-medium whitespace-nowrap',
                  'text-neutral-600 dark:text-neutral-400',
                )}
              />
              <Divider gradient className={cn('ml-2')} />
            </div>

            {journeyProfessional.experiences.map((item, index) => (
              <ExperienceCard
                key={index}
                experience={item}
                locale={locale}
                onDetails={() =>
                  setSelectedExperience({
                    type: 'professional',
                    index,
                  })
                }
              />
            ))}
          </div>
        </div>
      </Section>

      <ExperienceDetails
        locale={locale}
        experienceIndex={selectedExperience?.index ?? -1}
        experience={selectedItem}
        experienceType={selectedExperience?.type ?? null}
        open={selectedExperience !== null}
        isNavigationDisabled={experiences.length <= 1}
        onOpenChange={open => {
          if (!open) {
            setSelectedExperience(null);
          }
        }}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
}
