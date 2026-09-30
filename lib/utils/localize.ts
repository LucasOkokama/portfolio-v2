import { defaultLocale, routing, type ILocale } from '@/i18n/routing';
import type { ILocalizedText } from '@/types/profile.type';
import { hasLocale } from 'next-intl';
import { getLocale } from 'next-intl/server';

export async function getAppLocale(): Promise<ILocale> {
  const locale = await getLocale();
  if (!hasLocale(routing.locales, locale)) {
    throw new Error(`Invalid locale: ${locale}`);
  }
  return locale;
}

export function localize(value: ILocalizedText, locale: ILocale): string {
  return value[locale] || value[defaultLocale];
}

export function localizeAll(
  values: ILocalizedText[],
  locale: ILocale,
): string[] {
  return values.map(value => localize(value, locale));
}
