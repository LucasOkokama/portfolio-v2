import type { ILocale } from '@/i18n/routing';
import { apiGet } from '@/lib/api/client/api-client';
import type { IGitHubRepositoryResponse } from '@/types/github.type';

const API_URL = '/api/github';

export function fetchGitHubRepositoryDetails(
  owner: string,
  repositoryName: string,
  locale: ILocale,
  signal?: AbortSignal,
): Promise<IGitHubRepositoryResponse> {
  const params = new URLSearchParams({
    owner,
    repository: repositoryName,
  });

  return apiGet<IGitHubRepositoryResponse>(
    `${API_URL}?${params.toString()}`,
    locale,
    signal,
  );
}
