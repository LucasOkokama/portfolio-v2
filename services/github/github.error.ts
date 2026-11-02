import {
  createApiErrorResponse,
  getApiErrorStatus,
} from '@/lib/api/server/api-error';
import type { IApiErrorCode } from '@/types/api.type';
import { RequestError } from '@octokit/request-error';

export function getGitHubOriginalMessage(error: unknown): string {
  if (error instanceof RequestError) {
    return error.message;
  }

  return error instanceof Error ? error.message : 'Unknown GitHub error';
}

export function createGitHubErrorResponse(error: unknown) {
  const status = getApiErrorStatus(error);
  const originalMessage = getGitHubOriginalMessage(error);

  let code: IApiErrorCode;

  switch (status) {
    case 404:
      code = 'GITHUB_REPOSITORY_NOT_FOUND';
      break;

    case 429:
      code = 'GITHUB_RATE_LIMIT';
      break;

    case 403: {
      const isRateLimit =
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof error.response === 'object' &&
        error.response !== null &&
        'headers' in error.response &&
        typeof error.response.headers === 'object' &&
        error.response.headers !== null &&
        'x-ratelimit-remaining' in error.response.headers &&
        error.response.headers['x-ratelimit-remaining'] === '0';

      if (isRateLimit) {
        code = 'GITHUB_RATE_LIMIT';
        break;
      }

      code = 'GITHUB_FORBIDDEN';
      break;
    }

    default:
      code = status >= 500 ? 'SERVER_ERROR' : 'REQUEST_FAILED';
  }

  return createApiErrorResponse(originalMessage, status, code);
}
