import type { ILocale } from '@/i18n/routing';

export function formatDateLong(date: string | Date, locale: ILocale): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(date));
}

export function formatNumberCompact(value: number, locale: ILocale): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}
