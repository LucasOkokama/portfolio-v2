import { API_ERROR_MESSAGES } from '@/constants/api';
import { defaultLocale } from '@/i18n/routing';
import { createApiErrorResponse } from './api-error';

export function requireApiEnabled(): Response | null {
  const apiEnabled = process.env.API_ENABLED !== 'false';

  if (apiEnabled) {
    return null;
  }

  return createApiErrorResponse(
    API_ERROR_MESSAGES.SERVICE_UNAVAILABLE[defaultLocale],
    503,
    'SERVICE_UNAVAILABLE',
  );
}
