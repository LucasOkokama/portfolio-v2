import { API_ERROR_MESSAGES } from '@/constants/api.const';
import { queryKeys } from '@/constants/query-keys.const';
import type { ILocale } from '@/i18n/routing';
import { ClientApiError } from '@/lib/api/client/api-error';
import { fetchGitHubRepositoryDetails } from '@/services/github/github.api';
import { queryOptions } from '@tanstack/react-query';

export function githubRepositoryDetailsQueryOptions(
  repositoryName: string,
  locale: ILocale,
) {
  return queryOptions({
    queryKey: queryKeys.github.repository(repositoryName, locale),

    queryFn: ({ signal }) => {
      if (!repositoryName.trim()) {
        throw new ClientApiError(
          API_ERROR_MESSAGES['GITHUB_INVALID_REPOSITORY_NAME'][locale],
          400,
          'GITHUB_INVALID_REPOSITORY_NAME',
        );
      }

      return fetchGitHubRepositoryDetails(repositoryName, locale, signal);
    },
  });
}
