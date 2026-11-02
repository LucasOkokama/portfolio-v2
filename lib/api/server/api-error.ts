import { API_ERROR_MESSAGES } from '@/constants/api';
import { defaultLocale } from '@/i18n/routing';
import type { IApiErrorCode, IServerApiError } from '@/types/api.type';
import { NextResponse } from 'next/server';

const DEFAULT_ERROR_STATUS = 500;

export function getApiErrorStatus(error: unknown): number {
  if (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof error.status === 'number' &&
    Number.isInteger(error.status) &&
    error.status >= 100 &&
    error.status <= 599
  ) {
    return error.status;
  }

  return DEFAULT_ERROR_STATUS;
}

export function createApiErrorResponse(
  originalMessage: string,
  status: number,
  code?: IApiErrorCode,
) {
  const body: IServerApiError = {
    error: {
      originalMessage: originalMessage,
      ...(code ? { code } : {}),
    },
  };

  return NextResponse.json(body, { status });
}

export function createHttpErrorResponse(status: number) {
  let originalMessage: string;
  let code: IApiErrorCode;

  switch (status) {
    case 400:
      code = 'INVALID_REQUEST';
      originalMessage = API_ERROR_MESSAGES[code][defaultLocale];
      break;

    case 401:
      code = 'UNAUTHORIZED';
      originalMessage = API_ERROR_MESSAGES[code][defaultLocale];
      break;

    case 403:
      code = 'FORBIDDEN';
      originalMessage = API_ERROR_MESSAGES[code][defaultLocale];
      break;

    case 404:
      code = 'RESOURCE_NOT_FOUND';
      originalMessage = API_ERROR_MESSAGES[code][defaultLocale];
      break;

    case 409:
      code = 'CONFLICT';
      originalMessage = API_ERROR_MESSAGES[code][defaultLocale];
      break;

    case 422:
      code = 'VALIDATION_FAILED';
      originalMessage = API_ERROR_MESSAGES[code][defaultLocale];
      break;

    case 429:
      code = 'TOO_MANY_REQUESTS';
      originalMessage = API_ERROR_MESSAGES[code][defaultLocale];
      break;

    case 503:
      code = 'SERVICE_UNAVAILABLE';
      originalMessage = API_ERROR_MESSAGES[code][defaultLocale];
      break;

    default:
      code = status >= 500 ? 'SERVER_ERROR' : 'REQUEST_FAILED';
      originalMessage = API_ERROR_MESSAGES[code][defaultLocale];
  }

  return createApiErrorResponse(originalMessage, status, code);
}
