'use client';

import { API_ENABLED } from '@/constants/api';
import type { ILocale } from '@/i18n/routing';
import { githubRepositoryDetailsQueryOptions } from '@/queries/github/github-repository.queries';
import { useQuery } from '@tanstack/react-query';

export function useGitHubRepository(
  repositoryName: string,
  locale: ILocale,
  enabled = true,
) {
  return useQuery({
    ...githubRepositoryDetailsQueryOptions(repositoryName, locale),
    enabled: API_ENABLED && enabled && Boolean(repositoryName.trim()),
  });
}
