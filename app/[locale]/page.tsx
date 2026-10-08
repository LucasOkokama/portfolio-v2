import { Section } from '@/components/layouts/Section/Section';
import { SectionAboutMe } from '@/components/sections/SectionAboutMe/SectionAboutMe';
import { SectionProjects } from '@/components/sections/SectionProjects/SectionProjects';
import { SectionTechnology } from '@/components/sections/SectionTechnology/SectionTechnology';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils/cn';
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
    <div className={cn('flex w-full flex-col gap-16')}>
      <SectionAboutMe locale={locale} />

      <SectionTechnology locale={locale} />

      <SectionProjects locale={locale} />

      <Section title="Journey" command="$ git log --reverse --oneline">
        <div>123</div>
      </Section>

      <Section title="Certificates" command=">_ openssl x509 -noout -dates">
        <div>123</div>
      </Section>

      <Section title="Statistics" command="$ metricsctl stats --summary">
        <div>123</div>
      </Section>
    </div>
  );
}
