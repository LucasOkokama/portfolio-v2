import type { ILocale } from '@/i18n/routing';

// Formats the date in a long, readable format.
// Example: "November 18, 2026"
export function formatDateLong(date: string | Date, locale: ILocale): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(date));
}

// Formats the date as month and year.
// Example: "NOV 2026"
export function formatMonthShortYear(
  date: string | Date | null | undefined,
  locale: ILocale,
): string {
  if (!date) return '';

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return '';

  const formatted = new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parsedDate);

  return formatted.toLocaleUpperCase(locale);
}

// Formats numbers using compact notation.
// Example: 1,500 → "1.5K" (en-US)
// Example: 1,500 → "1,5 mil" (pt-BR)
export function formatNumberCompact(value: number, locale: ILocale): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}
