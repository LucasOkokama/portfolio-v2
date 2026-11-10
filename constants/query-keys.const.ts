import type { ILocale } from '@/i18n/routing';

export const queryKeys = {
  github: {
    all: ['github'] as const,

    repositories: () => [...queryKeys.github.all, 'repositories'] as const,

    repository: (repositoryName: string, locale: ILocale) =>
      [...queryKeys.github.repositories(), repositoryName, locale] as const,
  },
} as const;
