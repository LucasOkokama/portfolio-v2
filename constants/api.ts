import type { ILocalizedText } from '@/schemas/zod/common.schema';
import type { IApiErrorCode } from '@/types/api.type';

export const API_ENABLED = process.env.NEXT_PUBLIC_API_ENABLED !== 'false';

const defineApiErrorCodes = <const T extends readonly IApiErrorCode[]>(
  codes: T &
    (Exclude<IApiErrorCode, T[number]> extends never ? unknown : never),
) => codes;

export const API_ERROR_CODES = defineApiErrorCodes([
  'CONFLICT',
  'FORBIDDEN',
  'GITHUB_FORBIDDEN',
  'GITHUB_INVALID_REPOSITORY_NAME',
  'GITHUB_RATE_LIMIT',
  'GITHUB_REQUEST_FAILED',
  'GITHUB_REPOSITORY_NOT_FOUND',
  'INVALID_REQUEST',
  'INVALID_RESPONSE',
  'NETWORK_ERROR',
  'REQUEST_FAILED',
  'RESOURCE_NOT_FOUND',
  'SERVER_ERROR',
  'SERVICE_UNAVAILABLE',
  'TOO_MANY_REQUESTS',
  'UNAUTHORIZED',
  'VALIDATION_FAILED',
]);

export const API_ERROR_MESSAGES = {
  CONFLICT: {
    pt: 'Conflito na solicitação.',
    en: 'Request conflict.',
  },

  FORBIDDEN: {
    pt: 'Permissão negada.',
    en: 'Permission denied.',
  },

  INVALID_REQUEST: {
    pt: 'Solicitação inválida.',
    en: 'Invalid request.',
  },

  INVALID_RESPONSE: {
    pt: 'Resposta inválida.',
    en: 'Invalid response.',
  },

  NETWORK_ERROR: {
    pt: 'Falha na conexão.',
    en: 'Connection failed.',
  },

  REQUEST_FAILED: {
    pt: 'Falha na solicitação.',
    en: 'Request failed.',
  },

  RESOURCE_NOT_FOUND: {
    pt: 'Recurso não encontrado.',
    en: 'Resource not found.',
  },

  SERVER_ERROR: {
    pt: 'Erro interno do servidor.',
    en: 'Internal server error.',
  },

  SERVICE_UNAVAILABLE: {
    pt: 'Serviço indisponível.',
    en: 'Service unavailable.',
  },

  TOO_MANY_REQUESTS: {
    pt: 'Muitas solicitações. Tente novamente.',
    en: 'Too many requests. Try again.',
  },

  UNAUTHORIZED: {
    pt: 'Autenticação necessária.',
    en: 'Authentication required.',
  },

  VALIDATION_FAILED: {
    pt: 'Dados inválidos.',
    en: 'Invalid data.',
  },

  GITHUB_FORBIDDEN: {
    pt: 'Acesso ao repositório negado.',
    en: 'Repository access denied.',
  },

  GITHUB_INVALID_REPOSITORY_NAME: {
    pt: 'Nome do repositório inválido.',
    en: 'Invalid repository name.',
  },

  GITHUB_RATE_LIMIT: {
    pt: 'Limite da API atingido.',
    en: 'API rate limit reached.',
  },

  GITHUB_REQUEST_FAILED: {
    pt: 'Falha ao consultar o GitHub.',
    en: 'GitHub request failed.',
  },

  GITHUB_REPOSITORY_NOT_FOUND: {
    pt: 'Repositório não encontrado.',
    en: 'Repository not found.',
  },
} satisfies Record<IApiErrorCode, ILocalizedText>;

export const EMPTY_VALUE = '-';
