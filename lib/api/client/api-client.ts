import { API_ENABLED, API_ERROR_MESSAGES } from '@/constants/api';
import type { ILocale } from '@/i18n/routing';
import { localize } from '@/lib/utils/localize';
import type { IApiErrorCode } from '@/types/api.type';
import {
  ClientApiError,
  isAbortError,
  isApiErrorBody,
  isApiErrorCode,
  isApiErrorMessage,
} from './api-error';

export async function apiGet<T>(
  url: string,
  locale: ILocale,
  signal?: AbortSignal,
): Promise<T> {
  let response: Response;
  let body: unknown;

  if (!API_ENABLED) {
    const code: IApiErrorCode = 'SERVICE_UNAVAILABLE';
    throw new ClientApiError(
      localize(API_ERROR_MESSAGES[code], locale),
      503,
      code,
    );
  }

  try {
    response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal,
    });
  } catch (error) {
    if (signal?.aborted || isAbortError(error)) {
      throw error;
    }

    const code: IApiErrorCode = 'NETWORK_ERROR';

    throw new ClientApiError(
      localize(API_ERROR_MESSAGES[code], locale),
      0,
      code,
    );
  }

  try {
    body = await response.json();
  } catch (error) {
    if (signal?.aborted || isAbortError(error)) {
      throw error;
    }

    const code: IApiErrorCode = 'INVALID_RESPONSE';

    throw new ClientApiError(
      localize(API_ERROR_MESSAGES[code], locale),
      response.status,
      code,
    );
  }

  if (!response.ok) {
    const errorBody = isApiErrorBody(body) ? body.error : undefined;

    const originalMessage = isApiErrorMessage(errorBody?.originalMessage)
      ? errorBody.originalMessage
      : undefined;

    const code: IApiErrorCode = isApiErrorCode(errorBody?.code)
      ? errorBody.code
      : 'REQUEST_FAILED';

    const message = localize(API_ERROR_MESSAGES[code], locale);

    throw new ClientApiError(message, response.status, code, originalMessage);
  }

  if (typeof body !== 'object' || body === null || !('data' in body)) {
    const code: IApiErrorCode = 'INVALID_RESPONSE';

    throw new ClientApiError(
      localize(API_ERROR_MESSAGES[code], locale),
      response.status,
      code,
    );
  }

  return body.data as T;
}
