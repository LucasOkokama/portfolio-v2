import { Container } from '@/components/layouts/Container/Container';
import { BadgeStatus } from '@/components/ui/BadgeStatus/BadgeStatus';
import { Clock } from '@/components/ui/Clock/Clock';
import { ExternalLinksGroup } from '@/components/ui/ExternalLinkGroup/ExternalLinkGroup';
import { type ILocale } from '@/i18n/routing';
import { cn } from '@/lib/utils/cn';
import { aboutMe } from '@/lib/utils/loaders';
import { localize } from '@/lib/utils/localize';
import { Fragment } from 'react/jsx-runtime';

type Props = {
  locale: ILocale;
};

export function SectionAboutMe({ locale }: Props) {
  const isAvailable = aboutMe.availability.status === true;
  const availabilityVariant = isAvailable ? 'success' : 'warning';

  const availabilityLabel = localize(
    isAvailable
      ? aboutMe.availability.available
      : aboutMe.availability.unavailable,
    locale,
  );

  return (
    <div className={cn('grid grid-cols-[6fr_12fr] gap-4')}>
      <div className={cn('flex min-w-0 flex-col gap-4')}>
        <Container className={cn('p-7')}>
          <div>
            <h1 className="font-playfair text-6xl font-semibold">
              {aboutMe.name}
            </h1>

            <span
              className={cn(
                'text-content-text-quinary mt-3 block text-sm font-semibold tracking-widest',
              )}
            >
              {localize(aboutMe.role, locale).toUpperCase()}
            </span>
          </div>
        </Container>

        <Container className={cn('p-4')}>
          <div className="flex flex-col gap-2">
            <Clock
              city={aboutMe.clock.city}
              timezone={aboutMe.clock.timezone}
              showSeconds
            />

            <ExternalLinksGroup
              items={aboutMe.contacts.links}
              locale={locale}
            />
          </div>
        </Container>
      </div>

      <div className={cn('flex min-w-0 flex-col gap-4')}>
        <Container className="px-7 py-4">
          <div className={cn('flex justify-between')}>
            <div className={cn('flex items-center gap-3 font-medium')}>
              {aboutMe.highlights.map((item, index) => (
                <Fragment key={index}>
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className={cn('text-highlights-slash-text text-xs')}
                    >
                      /
                    </span>
                  )}

                  <span className={cn('text-highlights-text text-sm')}>
                    {localize(item, locale)}
                  </span>
                </Fragment>
              ))}
            </div>

            <BadgeStatus
              variant={availabilityVariant}
              indicatorVariant={availabilityVariant}
            >
              {availabilityLabel}
            </BadgeStatus>
          </div>
        </Container>

        <Container className="p-7">
          <div className={cn('flex flex-col gap-4')}>
            <h2
              className={cn(
                'text-content-text-primary font-outfit text-3xl font-bold',
              )}
            >
              {localize(aboutMe.biography.title, locale)}
            </h2>

            <span
              className={cn('text-content-text-secondary text-sm leading-6')}
            >
              {localize(aboutMe.biography.description, locale)}
            </span>
          </div>
        </Container>
      </div>
    </div>
  );
}
