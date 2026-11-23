import { Container } from '@/components/layouts/Container/Container';
import { BadgeTag } from '@/components/ui/BadgeTag/BadgeTag';
import { ExternalLink } from '@/components/ui/ExternalLink/ExternalLink';
import { IconBulletList } from '@/components/ui/IconBulletList/IconBulletList';
import { Text } from '@/components/ui/Text/Text';
import { Title } from '@/components/ui/Title/Title';
import { EMPTY_VALUE } from '@/constants/api.const';
import {
  experienceParticipationModeLabels,
  experienceParticipationModeTitle,
  experienceTimelineTitle,
  experienceTypeTitle,
} from '@/constants/journey.const';
import type { ILocale } from '@/i18n/routing';
import { icons } from '@/icon';
import { logosIcons } from '@/icon/logos';
import { uiIcons } from '@/icon/ui';
import { cn } from '@/lib/utils/cn';
import { formatDateInterval, formatUrl } from '@/lib/utils/format';
import { localize, localizeAll } from '@/lib/utils/localize';
import type {
  IExperience,
  IExperienceTimelineItem,
  IExperienceType,
} from '@/schemas/zod/journey.schema';
import { useTranslations } from 'next-intl';
import { Dialog } from 'radix-ui';
import { ExperienceDateRange } from '../ExperienceCard/ExperienceCard';

const SIZE = 12;

type ExperienceInfoCardProps = {
  title: string;
  icon?: React.ReactNode;
  value: React.ReactNode;
};

function ExperienceInfoCard({ title, icon, value }: ExperienceInfoCardProps) {
  return (
    <Container
      className={cn('shrink-0', 'p-4')}
      effect={{ type: 'select', selected: true }}
    >
      <div className={cn('flex flex-col gap-1.5')}>
        <Title
          text={title.toUpperCase()}
          type="subTitle"
          leftElement={icon}
          className={cn('text-neutral-600 dark:text-neutral-400')}
        />

        <div className={cn('text-neutral-800 dark:text-neutral-200')}>
          {value}
        </div>
      </div>
    </Container>
  );
}

type ExperienceTimelineProps = {
  items: IExperienceTimelineItem[];
  locale: ILocale;
};

function ExperienceTimeline({ items, locale }: ExperienceTimelineProps) {
  return (
    <div>
      {items.map((item, index) => {
        const Icon = icons[item.icon];

        return (
          <div key={index} className={cn('flex')}>
            <div className={cn('flex', 'pl-1.25')}>
              <div
                className={cn(
                  'w-0.5',
                  'bg-neutral-300/75 dark:bg-neutral-700/75',
                  index === items.length - 1 ? 'h-10.5' : 'h-full',
                )}
              />

              <div className={cn('flex')}>
                <div
                  className={cn(
                    'h-0.5 w-4',
                    'mt-10',
                    'bg-neutral-300/75 dark:bg-neutral-700/75',
                  )}
                />

                <div
                  className={cn(
                    'h-fit',
                    'mt-10',
                    '-translate-y-1/2',
                    'p-2.5',
                    'rounded-lg border',
                    'border-neutral-300/75 dark:border-neutral-600/75',
                    'bg-neutral-200 dark:bg-neutral-700',
                  )}
                >
                  <Icon
                    width={24}
                    height={24}
                    className={cn('text-neutral-500 dark:text-neutral-400')}
                  />
                </div>
              </div>
            </div>
            <div className={cn('flex flex-col gap-4', 'p-4')}>
              <div className={cn('flex flex-col gap-1')}>
                <Title
                  text={localize(item.title, locale)}
                  className={cn('text-md font-semibold')}
                />
                <div className={cn('flex gap-2.5')}>
                  <ExperienceDateRange
                    startDate={item.startDate}
                    endDate={item.endDate}
                    locale={locale}
                    isMuted
                    isSmall
                  />
                  <Text text="|" className={cn('text-xs')} />
                  <Text
                    text={formatDateInterval(
                      item.startDate,
                      item.endDate ?? new Date(),
                      locale,
                    )}
                    className={cn('text-xs')}
                  />
                </div>
              </div>
              <div>
                <IconBulletList
                  items={localizeAll(item.keyActivities, locale)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

type Props = {
  locale: ILocale;
  experience: IExperience | null;
  experienceType: IExperienceType | null;
  experienceIndex: number;
  open: boolean;
  isNavigationDisabled: boolean;
  onOpenChange: (open: boolean) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function ExperienceDetails({
  locale,
  experienceIndex,
  experience,
  experienceType,
  open,
  isNavigationDisabled,
  onOpenChange,
  onPrevious,
  onNext,
}: Props) {
  const tExperienceDetails = useTranslations('experienceDetails');

  const firstTimelineItem = experience?.experienceTimeline[0];
  const lastTimelineItem = experience?.experienceTimeline.at(-1);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            'z-20',
            'fixed inset-0',
            'backdrop-blur-xs',
            'bg-black/15 dark:bg-black/20',
          )}
        />

        <Dialog.Content
          className={cn(
            'z-25',
            'fixed top-1/2 left-1/2',
            '-translate-x-1/2 -translate-y-1/2',
            'w-[calc(100vw-4rem)] max-w-4xl',
            'h-200 max-h-[calc(100dvh-4rem)]',
            'flex flex-col',
            'overflow-hidden',
          )}
        >
          <Container className={cn('h-full', 'p-0')}>
            <div className={cn('h-full w-full', 'flex flex-col')}>
              <div
                className={cn(
                  'flex items-center justify-between',
                  'px-4 py-2',
                  'border-b',
                  'bg-neutral-200/70 dark:bg-neutral-950/40',
                  'border-b-neutral-300/70 dark:border-b-neutral-800',
                  'text-sm',
                )}
              >
                <div className={cn('flex gap-3')}>
                  <BadgeTag
                    label={`${experienceIndex + 1}`}
                    variant="new"
                    className={cn('font-roboto-mono font-bold')}
                  />

                  {experienceType && (
                    <BadgeTag
                      label={localize(
                        experienceTypeTitle[experienceType],
                        locale,
                      ).toUpperCase()}
                      variant="information"
                      className="font-semibold tracking-wider"
                    />
                  )}
                </div>

                <span
                  className={cn(
                    'font-semibold',
                    'tracking-wider',
                    'text-purple-500 dark:text-purple-400',
                  )}
                >
                  {tExperienceDetails('title').toUpperCase()}
                </span>

                <div className={cn('flex items-center gap-6')}>
                  <div className={cn('flex gap-1')}>
                    <button
                      onClick={onPrevious}
                      disabled={isNavigationDisabled}
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
                      onClick={onNext}
                      disabled={isNavigationDisabled}
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
                  <Dialog.Close asChild>
                    <div
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
                    </div>
                  </Dialog.Close>
                </div>
              </div>
              <div
                className={cn('flex flex-col gap-3', 'p-4', 'overflow-y-auto')}
              >
                <div className={cn('grid grid-cols-2 gap-3')}>
                  <ExperienceInfoCard
                    title={tExperienceDetails('location')}
                    icon={<uiIcons.pin width={SIZE} height={SIZE} />}
                    value={
                      <Text
                        text={experience?.location ?? EMPTY_VALUE}
                        className={cn('text-neutral-800 dark:text-neutral-200')}
                      />
                    }
                  />

                  {experienceType && (
                    <ExperienceInfoCard
                      title={localize(
                        experienceParticipationModeTitle[experienceType],
                        locale,
                      )}
                      icon={<uiIcons.user width={SIZE} height={SIZE} />}
                      value={
                        <Text
                          text={
                            experience?.participationMode
                              ? localize(
                                  experienceParticipationModeLabels[
                                    experience.participationMode
                                  ],
                                  locale,
                                )
                              : EMPTY_VALUE
                          }
                          className={cn(
                            'text-neutral-800 dark:text-neutral-200',
                          )}
                        />
                      }
                    />
                  )}

                  <ExperienceInfoCard
                    title={tExperienceDetails('period')}
                    icon={<uiIcons.calendar width={SIZE} height={SIZE} />}
                    value={
                      lastTimelineItem && firstTimelineItem ? (
                        <ExperienceDateRange
                          startDate={lastTimelineItem.startDate}
                          endDate={firstTimelineItem.endDate}
                          locale={locale}
                          isUppercase
                        />
                      ) : (
                        EMPTY_VALUE
                      )
                    }
                  />

                  <ExperienceInfoCard
                    title={tExperienceDetails('duration')}
                    icon={<uiIcons.clock width={SIZE} height={SIZE} />}
                    value={
                      <Text
                        text={
                          lastTimelineItem && firstTimelineItem
                            ? formatDateInterval(
                                lastTimelineItem.startDate,
                                firstTimelineItem.endDate ?? new Date(),
                                locale,
                              )
                            : EMPTY_VALUE
                        }
                        className={cn('text-neutral-800 dark:text-neutral-200')}
                      />
                    }
                  />

                  <ExperienceInfoCard
                    title={tExperienceDetails('linkedin')}
                    icon={<logosIcons.linkedin width={SIZE} height={SIZE} />}
                    value={
                      experience?.linkedIn ? (
                        <ExternalLink href={experience.linkedIn}>
                          {formatUrl(experience.linkedIn)}
                        </ExternalLink>
                      ) : (
                        EMPTY_VALUE
                      )
                    }
                  />

                  <ExperienceInfoCard
                    title={tExperienceDetails('website')}
                    icon={<uiIcons.globe width={SIZE} height={SIZE} />}
                    value={
                      experience?.website ? (
                        <ExternalLink href={experience.website}>
                          {formatUrl(experience.website)}
                        </ExternalLink>
                      ) : (
                        EMPTY_VALUE
                      )
                    }
                  />

                  {experience?.additionalInformations.map((item, index) => (
                    <ExperienceInfoCard
                      key={index}
                      title={localize(item.title, locale)}
                      value={
                        <Text
                          text={item.value ?? EMPTY_VALUE}
                          className={cn(
                            'text-neutral-800 dark:text-neutral-200',
                          )}
                        />
                      }
                    />
                  ))}
                </div>
                <ExperienceInfoCard
                  title={tExperienceDetails('description')}
                  icon={<uiIcons.alignLeft width={SIZE} height={SIZE} />}
                  value={
                    <Text
                      text={
                        experience?.description
                          ? localize(experience?.description, locale)
                          : EMPTY_VALUE
                      }
                      className={cn('text-neutral-800 dark:text-neutral-200')}
                    />
                  }
                />
                <ExperienceInfoCard
                  title={tExperienceDetails('technologies')}
                  icon={<uiIcons.stack width={SIZE} height={SIZE} />}
                  value={
                    experience?.technologies?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map(item => (
                          <BadgeTag
                            key={item.label}
                            label={item.label}
                            icon={item.icon}
                          />
                        ))}
                      </div>
                    ) : (
                      EMPTY_VALUE
                    )
                  }
                />
                {experienceType && experience?.experienceTimeline && (
                  <ExperienceInfoCard
                    title={localize(
                      experienceTimelineTitle[experienceType],
                      locale,
                    )}
                    icon={<uiIcons.check width={SIZE} height={SIZE} />}
                    value={
                      <ExperienceTimeline
                        items={experience.experienceTimeline}
                        locale={locale}
                      />
                    }
                  />
                )}
              </div>
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
                <div className={cn('flex items-center justify-center gap-2')}>
                  <div
                    className={cn(
                      'flex items-center justify-center gap-2',
                      'h-6',
                      'rounded-lg',
                      'px-2.5',
                      'bg-neutral-300/70 dark:bg-neutral-800/70',
                    )}
                  >
                    <span className={cn('font-bold')}>ESC</span>
                  </div>
                  <span className={cn('font-semibold tracking-wider')}>
                    {tExperienceDetails('close').toUpperCase()}
                  </span>
                </div>

                <div className={cn('flex items-center justify-center gap-2')}>
                  <div
                    className={cn(
                      'flex items-center justify-center gap-2',
                      'h-6',
                      'rounded-lg',
                      'px-2.5',
                      'bg-neutral-300/70 dark:bg-neutral-800/70',
                    )}
                  >
                    <span className={cn('font-semibold')}>SHIFT</span>
                    <uiIcons.shift width={SIZE} height={SIZE} />
                  </div>
                  <div
                    className={cn(
                      'flex items-center justify-center gap-2',
                      'h-6',
                      'rounded-lg',
                      'px-2.5',
                      'bg-neutral-300/70 dark:bg-neutral-800/70',
                    )}
                  >
                    <uiIcons.caretLeft width={SIZE} height={SIZE} />
                    <span>/</span>
                    <uiIcons.caretRight width={SIZE} height={SIZE} />
                  </div>
                  <span className={cn('font-semibold tracking-wider')}>
                    {tExperienceDetails('experience').toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
