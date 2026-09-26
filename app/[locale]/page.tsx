import { ExternalLinksGroup } from '@/components/features/ExternalLinkGroup/ExternalLinkGroup';
import { Container } from '@/components/layouts/Container/Container';
import profile from '@/contents/profile.json';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils/cn';
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

  return (
    <div className={cn('w-full')}>
      <div className={cn('flex gap-12')}>
        <div className={cn('flex w-2/5 flex-col gap-4')}>
          <Container>
            <div>
              <h1 className="font-rafgins text-6xl font-bold tracking-wide">
                {profile.name}
              </h1>
              <span
                className={cn(
                  'text-content-text-tertiary mt-2 block text-sm font-semibold tracking-widest',
                )}
              >
                {localize(profile.role, locale).toUpperCase()}
              </span>
            </div>
          </Container>

          <Container className={cn('p-4')}>
            <div className="flex flex-col gap-3">
              <ExternalLinksGroup
                items={[
                  {
                    icon: 'github',
                    website: 'GitHub',
                    href: 'https://github.com/LucasOkokama',
                    username: '@LucasOkokama',
                  },
                  {
                    icon: 'linkedin',
                    website: 'LinkedIn',
                    href: 'https://br.linkedin.com/in/lucas-okokama',
                    username: '@lucas-okokama',
                  },
                  {
                    icon: 'gmail',
                    website: 'Gmail',
                    href: 'mailto:lucaslko429@gmail.com',
                    username: 'lucaslko429@gmail.com',
                  },
                  {
                    icon: 'grain',
                    website: localize(profile.contact.curriculum, locale),
                    href: '/pdf/curriculum/Curriculum_LucasOkokama.pdf',
                    username: 'Download PDF',
                  },
                ]}
              />
            </div>
          </Container>
        </div>
        <div className={cn('grow')}>PPPPPP</div>
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
