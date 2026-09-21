import { routing } from '@/i18n/routing';
import { hasLocale } from 'next-intl';
import { getFormatter, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import * as rootParams from 'next/root-params';

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const headerTranlated = await getTranslations('header');
  const localeFromRootParameterValue = await rootParams.locale();

  const format = getFormatter();

  return (
    <div>
      <h1>Locale:{headerTranlated('title')}</h1>
      <p>
        Selected Language:{' '}
        {(await format).displayName(localeFromRootParameterValue, {
          type: 'language',
        })}
      </p>
    </div>
  );
}
