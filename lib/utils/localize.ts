import { defaultLocale, routing, type ILocale } from '@/i18n/routing';
import type { ILocalizedText } from '@/schemas/zod/common.schema';
import { hasLocale } from 'next-intl';
import { getLocale } from 'next-intl/server';

export function validateLocale(locale: string): ILocale {
  if (!hasLocale(routing.locales, locale)) {
    return defaultLocale;
  }
  return locale;
}

export async function getAppLocale(): Promise<ILocale> {
  const locale = await getLocale();
  return validateLocale(locale);
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
