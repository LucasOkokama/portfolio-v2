import type { ILocale } from '@/i18n/routing';

/**
 * Formats the date in a long, readable format.
 * @example "November 18, 2026"
 */
export function formatDateLong(date: string | Date, locale: ILocale): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(date));
}

/**
 * Formats the date as month and year.
 * @example "Nov 2026"
 * @example "Fev. de 2026"
 */
export function formatMonthShortYear(
  date: string | Date | null | undefined,
  locale: ILocale,
): string {
  if (!date) return '';

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return '';

  const formattedDate = new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parsedDate);

  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}

/**
 * Formats the interval between two dates.
 *
 * Rules:
 * - Up to 30 days: "15 days"
 * - From 31 days to 11 months: "3 months"
 * - From 12 months: "1 year"
 * - Years with remaining months: "1 year and 3 months"
 *
 * @example formatDateInterval('2025-01-01', '2025-01-20', 'en-US') -> "19 days"
 * @example formatDateInterval('2025-01-01', '2025-04-01', 'en-US') -> "3 months"
 * @example formatDateInterval('2024-01-01', '2025-04-01', 'en-US') -> "1 year and 3 months"
 */
export function formatDateInterval(
  startDate: string | Date,
  endDate: string | Date,
  locale: ILocale,
): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return '';
  }

  const firstDate = start <= end ? start : end;
  const lastDate = start <= end ? end : start;

  const diffDays = Math.floor(
    (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  const formatUnit = (value: number, unit: 'day' | 'month' | 'year'): string =>
    new Intl.NumberFormat(locale, {
      style: 'unit',
      unit,
      unitDisplay: 'long',
    }).format(value);

  if (diffDays <= 30) {
    return formatUnit(diffDays, 'day');
  }

  let months =
    (lastDate.getUTCFullYear() - firstDate.getUTCFullYear()) * 12 +
    (lastDate.getUTCMonth() - firstDate.getUTCMonth());

  if (lastDate.getUTCDate() < firstDate.getUTCDate()) {
    months--;
  }

  if (months < 1) {
    months = 1;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return formatUnit(months, 'month');
  }

  const yearText = formatUnit(years, 'year');

  if (remainingMonths === 0) {
    return yearText;
  }

  return new Intl.ListFormat(locale, {
    style: 'long',
    type: 'conjunction',
  }).format([yearText, formatUnit(remainingMonths, 'month')]);
}

/**
 * Formats numbers using compact notation.
 * @example 1,500 -> "1.5K" (en-US)
 * @example 1,500 -> "1,5 mil" (pt-BR)
 */
export function formatNumberCompact(value: number, locale: ILocale): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

/**
 * Formats a URL by removing the protocol, query parameters, hash, and trailing slash.
 * @example "https://br.linkedin.com/school/etec-parque-bel%C3%A9m/" -> "br.linkedin.com/school/etec-parque-belém"
 */
export function formatUrl(link: string | null | undefined): string {
  if (!link) return '';

  try {
    const url = new URL(link);
    const pathname = decodeURIComponent(url.pathname);

    return `${url.host}${pathname}`.replace(/\/$/, '');
  } catch {
    return '';
  }
}
