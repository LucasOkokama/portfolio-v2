import { defineRouting } from 'next-intl/routing';

export const locales = ['pt', 'en'] as const;
export type ILocale = (typeof locales)[number];

export const defaultLocale: ILocale = 'en';

export const routing = defineRouting({
  locales,
  defaultLocale,
  // localePrefix: 'as-needed',
  localeDetection: false,
  pathnames: {
    '/': '/',
    '/projects': {
      pt: '/projetos',
      en: '/projects',
    },
    '/journey': {
      pt: '/trajetoria',
      en: '/journey',
    },
    '/certificates': {
      pt: '/certificados',
      en: '/certificates',
    },
    '/favorites': {
      pt: '/favoritos',
      en: '/favorites',
    },
    '/design-system': {
      pt: '/design-system',
      en: '/design-system',
    },
  },
});

export type AppPathname = keyof typeof routing.pathnames;
