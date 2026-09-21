import { defaultLocale, type ILocale } from '@/i18n/routing';

export type LocalizedText = Record<ILocale, string>;

export function localize(value: LocalizedText, locale: ILocale): string {
  return value[locale] || value[defaultLocale];
}

export function localizeAll(
  values: LocalizedText[],
  locale: ILocale,
): string[] {
  return values.map(value => localize(value, locale));
}
