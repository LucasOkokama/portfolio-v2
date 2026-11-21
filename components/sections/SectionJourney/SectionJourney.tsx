import { ExperienceCard } from '@/components/features/ExperienceCard/ExperienceCard';
import { Section } from '@/components/layouts/Section/Section';
import { Divider } from '@/components/ui/Divider/Divider';
import { Title } from '@/components/ui/Title/Title';
import type { ILocale } from '@/i18n/routing';
import { uiIcons } from '@/icon/ui';
import { cn } from '@/lib/utils/cn';
import { journeyAcademic, journeyProfessional } from '@/lib/utils/loaders';
import { localize } from '@/lib/utils/localize';
import { useTranslations } from 'next-intl';

type Props = {
  locale: ILocale;
};

export function SectionJourney({ locale }: Props) {
  const title = {
    pt: 'Jornada',
    en: 'Journey',
  };

  const tExperienceColumn = useTranslations('experienceColumn');

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
              <ExperienceCard key={index} experience={item} locale={locale} />
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
              <ExperienceCard key={index} experience={item} locale={locale} />
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
