import { ExternalLinksGroup } from '@/components/features/ExternalLinkGroup/ExternalLinkGroup';
import { Container } from '@/components/layouts/Container/Container';
import { BadgeStatus } from '@/components/ui/BadgeStatus/BadgeStatus';
import { Clock } from '@/components/ui/Clock/Clock';
import { Highlights } from '@/components/ui/Highlights/Highlights';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils/cn';
import { profile } from '@/lib/utils/loaders';
import { localize } from '@/lib/utils/localize';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const isAvailable = profile.availability.status === 'available';
  const availabilityVariant = isAvailable ? 'success' : 'warning';
  const availabilityLabel = localize(
    isAvailable
      ? profile.availability.available
      : profile.availability.unavailable,
    locale,
  );

  return (
    <div className={cn('w-full')}>
      <div className={cn('flex gap-4')}>
        <div className={cn('flex w-8/24 flex-col gap-4')}>
          <Container className={cn('px-10 pt-12 pb-10')}>
            <div>
              <h1 className="font-rafgins text-6xl font-bold tracking-wide">
                {profile.name}
              </h1>
              <span
                className={cn(
                  'text-content-text-quaternary mt-3 block text-sm font-semibold tracking-widest',
                )}
              >
                {localize(profile.role, locale).toUpperCase()}
              </span>
            </div>
          </Container>

          <Container className={cn('p-4')}>
            <div className="flex flex-col gap-2">
              <Clock
                city={profile.clock.city}
                timezone={profile.clock.timezone}
                showSeconds
              />

              <ExternalLinksGroup
                items={profile.contacts.links}
                locale={locale}
              />
            </div>
          </Container>
        </div>
        <div className={cn('flex grow flex-col gap-4')}>
          <Container className="px-7 py-4">
            <div className={cn('flex justify-between')}>
              <Highlights items={profile.highlights} locale={locale} />

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
              <h1
                className={cn(
                  'text-content-text-primary text-3xl font-extrabold',
                )}
              >
                {localize(profile.biography.title, locale)}
              </h1>
              <span
                className={cn('text-content-text-secondary text-sm leading-7')}
              >
                {localize(profile.biography.description, locale)}
              </span>
            </div>
          </Container>
        </div>
      </div>

      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
    </div>
  );
}
