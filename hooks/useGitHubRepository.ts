'use client';

import { API_ENABLED } from '@/constants/api.const';
import type { ILocale } from '@/i18n/routing';
import { githubRepositoryDetailsQueryOptions } from '@/queries/github/github-repository.queries';
import { useQuery } from '@tanstack/react-query';

export function useGitHubRepository(
  owner: string,
  repositoryName: string,
  locale: ILocale,
  enabled = true,
) {
  return useQuery({
    ...githubRepositoryDetailsQueryOptions(owner, repositoryName, locale),
    enabled:
      API_ENABLED &&
      enabled &&
      Boolean(owner.trim()) &&
      Boolean(repositoryName.trim()),
  });
}
