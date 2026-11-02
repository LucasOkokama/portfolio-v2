import { QueryClient } from '@tanstack/react-query';
import { ClientApiError } from '../api/client/api-error';

const QUERY_STALE_TIME = 5 * 60 * 1000;
const QUERY_GC_TIME = 10 * 60 * 1000;
const QUERY_MAX_RETRIES = 2;

function shouldRetryQuery(failureCount: number, error: Error): boolean {
  if (error instanceof ClientApiError) {
    if (
      error.status === 0 ||
      error.status === 408 ||
      error.status === 425 ||
      error.status >= 500
    ) {
      return failureCount < QUERY_MAX_RETRIES;
    }

    return false;
  }

  return failureCount < QUERY_MAX_RETRIES;
}

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_STALE_TIME,
        gcTime: QUERY_GC_TIME,
        retry: shouldRetryQuery,
        refetchOnWindowFocus: true,
      },

      mutations: {
        retry: false,
      },
    },
  });
}
