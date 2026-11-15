import type { ILocale } from '@/i18n/routing';

export const queryKeys = {
  github: {
    all: ['github'] as const,

    repositories: () => [...queryKeys.github.all, 'repositories'] as const,

    repository: (owner: string, repositoryName: string, locale: ILocale) =>
      [
        ...queryKeys.github.repositories(),
        owner,
        repositoryName,
        locale,
      ] as const,
  },
} as const;
