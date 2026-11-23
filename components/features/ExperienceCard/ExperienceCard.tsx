import { AsyncRenderImage } from '@/components/layouts/AsyncRenderImage/AsyncRenderImage';
import { Container } from '@/components/layouts/Container/Container';
import { ExternalLink } from '@/components/ui/ExternalLink/ExternalLink';
import { Text } from '@/components/ui/Text/Text';
import { Title } from '@/components/ui/Title/Title';
import type { ILocale } from '@/i18n/routing';
import { uiIcons } from '@/icon/ui';
import { cn } from '@/lib/utils/cn';
import { formatMonthShortYear } from '@/lib/utils/format';
import { localize } from '@/lib/utils/localize';
import type { IExperience } from '@/schemas/zod/journey.schema';
import { useTranslations } from 'next-intl';

type ExperienceDateRangeProps = {
  startDate: Date | string;
  endDate: Date | string | null;
  locale: ILocale;
  isUppercase?: boolean;
  isMuted?: boolean;
  isSmall?: boolean;
};

export function ExperienceDateRange({
  startDate,
  endDate,
  locale,
  isUppercase = false,
  isMuted = false,
  isSmall = false,
}: ExperienceDateRangeProps) {
  const tExperienceCard = useTranslations('experienceCard');

  const startLabel = formatMonthShortYear(startDate, locale);
  const endLabel = endDate
    ? formatMonthShortYear(endDate, locale)
    : tExperienceCard('present');

  const textColor = isMuted ? '' : 'text-neutral-800 dark:text-neutral-200';
  const textSize = isSmall ? 'text-xs' : 'text-sm';

  return (
    <div className={cn('flex items-center gap-1.5')}>
      <Text
        text={isUppercase ? startLabel.toUpperCase() : startLabel}
        className={cn(textColor, textSize)}
      />

      <Text text="-" className={cn(textColor, textSize)} />

      <Text
        text={isUppercase ? endLabel.toUpperCase() : endLabel}
        className={cn(
          textColor,
          textSize,
          !endDate && 'font-medium',
          !endDate && 'text-emerald-600 dark:text-emerald-400',
        )}
      />
    </div>
  );
}

type Props = {
  locale: ILocale;
  experience: IExperience;
  onDetails: () => void;
};

export function ExperienceCard({ locale, experience, onDetails }: Props) {
  const firstTimelineItem = experience.experienceTimeline[0];
  const lastTimelineItem = experience.experienceTimeline.at(-1);

  if (!firstTimelineItem) return null;

  return (
    <Container
      className={cn(
        'p-0',
        'hover:border-orange-500/75 dark:hover:border-amber-400/75',
      )}
    >
      <div>
        <div className={cn('flex flex-col gap-4', 'px-6 py-4')}>
          <div className={cn('flex justify-between gap-6')}>
            <div className={cn('flex gap-4')}>
              {experience.logo && (
                <div
                  className={cn(
                    'shrink-0',
                    'rounded-lg border',
                    'opacity-85',
                    'border-neutral-900/10 dark:border-neutral-100/10',
                    'bg-neutral-900/5 dark:bg-neutral-100/5',
                    experience.website && 'cursor-pointer',
                    experience.website &&
                      'transition-opacity hover:opacity-100',
                  )}
                >
                  {experience.website ? (
                    <a
                      href={experience.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'block',
                        'h-14 w-14',
                        'rounded-lg',
                        'p-1.5',
                      )}
                    >
                      <AsyncRenderImage
                        src={experience.logo}
                        alt=""
                        width={200}
                        height={200}
                        locale={locale}
                        compactFallback
                      />
                    </a>
                  ) : (
                    <div className={cn('h-14 w-14', 'rounded-lg', 'p-1.5')}>
                      <AsyncRenderImage
                        src={experience.logo}
                        alt=""
                        width={200}
                        height={200}
                        locale={locale}
                        compactFallback
                      />
                    </div>
                  )}
                </div>
              )}

              <div>
                <Title
                  text={localize(firstTimelineItem.title, locale)}
                  className={cn('text-lg font-semibold')}
                />

                {experience.website ? (
                  <ExternalLink href={experience.website}>
                    {experience.organization}
                  </ExternalLink>
                ) : (
                  <span className="text-sm">{experience.organization}</span>
                )}
              </div>
            </div>
            <button
              className={cn(
                'group self-start',
                'p-2.5',
                'rounded-lg border',
                'transition-colors duration-200',
                'cursor-pointer',
                'border-neutral-300 dark:border-neutral-700',
                'hover:border-neutral-400 dark:hover:border-neutral-600',
                'hover:text-neutral-950 dark:hover:text-neutral-50',
                'hover:bg-neutral-300/70 dark:hover:bg-neutral-700/70',
              )}
              onClick={onDetails}
            >
              <uiIcons.arrowRight
                width={12}
                height={12}
                className={cn(
                  'transition-transform duration-200',
                  'group-hover:-rotate-45',
                )}
              />
            </button>
          </div>

          <Text text={localize(experience.overview, locale)} />
        </div>

        <div
          className={cn(
            'flex items-center justify-between',
            'px-4 py-2.5',
            'text-xs',
            'border-t',
            'border-neutral-200/75 dark:border-neutral-700/75',
            'bg-neutral-100 dark:bg-neutral-800',
          )}
        >
          <div className={cn('flex items-center gap-2')}>
            <uiIcons.pin width={12} height={12} />
            <Text text={experience.location} className={cn('text-xs')} />
          </div>

          {lastTimelineItem && (
            <ExperienceDateRange
              startDate={lastTimelineItem.startDate}
              endDate={firstTimelineItem.endDate}
              locale={locale}
              isUppercase
              isMuted
              isSmall
            />
          )}
        </div>
      </div>
    </Container>
  );
}
