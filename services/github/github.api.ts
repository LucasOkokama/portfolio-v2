import type { ILocale } from '@/i18n/routing';
import { apiGet } from '@/lib/api/client/api-client';
import type { IGitHubRepositoryResponse } from '@/types/github.type';

const API_URL = '/api/github';

export function fetchGitHubRepositoryDetails(
  repositoryName: string,
  locale: ILocale,
  signal?: AbortSignal,
): Promise<IGitHubRepositoryResponse> {
  return apiGet<IGitHubRepositoryResponse>(
    `${API_URL}/${encodeURIComponent(repositoryName)}`,
    locale,
    signal,
  );
}
