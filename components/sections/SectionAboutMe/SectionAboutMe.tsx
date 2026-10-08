import { Container } from '@/components/layouts/Container/Container';
import { BadgeStatus } from '@/components/ui/BadgeStatus/BadgeStatus';
import { Clock } from '@/components/ui/Clock/Clock';
import { ExternalLinksGroup } from '@/components/ui/ExternalLinkGroup/ExternalLinkGroup';
import { Text } from '@/components/ui/Text/Text';
import { Title } from '@/components/ui/Title/Title';
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
        <Container>
          <div>
            <Title
              text={aboutMe.name}
              className="font-playfair text-6xl font-semibold"
            />

            <Text
              text={localize(aboutMe.role, locale).toUpperCase()}
              className={cn(
                'mt-3',
                'font-semibold tracking-widest text-neutral-300',
              )}
            />
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
        <Container className={cn('py-4')}>
          <div className={cn('flex justify-between')}>
            <div className={cn('flex items-center gap-3 font-medium')}>
              {aboutMe.highlights.map((item, index) => (
                <Fragment key={index}>
                  {index > 0 && (
                    <Text
                      aria-hidden="true"
                      muted
                      className={cn('text-xs')}
                      text="/"
                    />
                  )}

                  <Text text={localize(item, locale)} />
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

        <Container>
          <div className={cn('flex flex-col gap-4')}>
            <Title text={localize(aboutMe.biography.title, locale)} />
            <Text text={localize(aboutMe.biography.description, locale)} />
          </div>
        </Container>
      </div>
    </div>
  );
}
