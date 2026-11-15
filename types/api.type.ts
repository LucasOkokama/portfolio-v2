export interface IServerApiSuccess<T> {
  data: T;
}

export interface IServerApiError {
  error: {
    originalMessage: string;
    code?: IApiErrorCode;
  };
}

export type IApiErrorCode =
  | 'CONFLICT' // Request conflicts with the current resource state (409).
  | 'FORBIDDEN' // Authenticated user lacks permission to perform the action (403).
  | 'GITHUB_FORBIDDEN' // GitHub rejected the request due to insufficient permissions or access restrictions.
  | 'GITHUB_INVALID_OWNER' // GitHub username or organization name is invalid.
  | 'GITHUB_INVALID_REPOSITORY_NAME' // Repository name violates GitHub naming rules.
  | 'GITHUB_RATE_LIMIT' // GitHub API rate limit has been exceeded.
  | 'GITHUB_REQUEST_FAILED' // GitHub API request failed for an unexpected or unclassified reason.
  | 'GITHUB_REPOSITORY_NOT_FOUND' // GitHub repository does not exist or is not accessible.
  | 'INVALID_REQUEST' // Request is malformed or contains invalid parameters (400).
  | 'INVALID_RESPONSE' // External service returned an unexpected or malformed response.
  | 'NETWORK_ERROR' // Network failure prevented the request from completing.
  | 'REQUEST_FAILED' // Request failed for an unexpected or unclassified reason.
  | 'RESOURCE_NOT_FOUND' // Requested application resource does not exist (404).
  | 'SERVER_ERROR' // Server encountered an unexpected internal error (5xx).
  | 'SERVICE_UNAVAILABLE' // Service is temporarily unavailable and cannot process requests (503).
  | 'TOO_MANY_REQUESTS' // Application API rate limit has been exceeded (429).
  | 'UNAUTHORIZED' // Authentication is missing, invalid, or expired (401).
  | 'VALIDATION_FAILED'; // Request data failed business rules or field validation (422).
