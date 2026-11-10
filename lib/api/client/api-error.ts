import { API_ERROR_CODES } from '@/constants/api.const';
import type { IApiErrorCode, IServerApiError } from '@/types/api.type';

export class ClientApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: IApiErrorCode,
    public readonly originalMessage?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function isClientApiError(error: unknown): error is ClientApiError {
  return error instanceof ClientApiError;
}

export function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === 'AbortError';
}

export function isApiErrorBody(error: unknown): error is IServerApiError {
  if (typeof error !== 'object' || error === null || !('error' in error)) {
    return false;
  }

  const errorBody = error.error;

  if (
    typeof errorBody !== 'object' ||
    errorBody === null ||
    !('originalMessage' in errorBody) ||
    typeof errorBody.originalMessage !== 'string'
  ) {
    return false;
  }

  return (
    !('code' in errorBody) ||
    errorBody.code === undefined ||
    isApiErrorCode(errorBody.code)
  );
}

export function isApiErrorMessage(message: unknown): message is string {
  return typeof message === 'string';
}

export function isApiErrorCode(code: unknown): code is IApiErrorCode {
  return (
    typeof code === 'string' && API_ERROR_CODES.includes(code as IApiErrorCode)
  );
}
