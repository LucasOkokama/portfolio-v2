import { API_ERROR_MESSAGES } from '@/constants/api.const';
import { defaultLocale } from '@/i18n/routing';
import { createApiErrorResponse } from '@/lib/api/server/api-error';
import { requireApiEnabled } from '@/lib/api/server/api-guard';
import {
  createGitHubErrorResponse,
  getGitHubOriginalMessage,
} from '@/services/github/github.error';
import { getGitHubRepositoryDetails } from '@/services/github/github.service';
import type { IServerApiSuccess } from '@/types/api.type';
import type { IGitHubRepositoryResponse } from '@/types/github.type';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const apiGuardResponse = requireApiEnabled();

  if (apiGuardResponse) {
    return apiGuardResponse;
  }

  try {
    const { searchParams } = new URL(request.url);

    const owner = searchParams.get('owner')?.trim();
    const repositoryName = searchParams.get('repository')?.trim();

    if (!owner) {
      return createApiErrorResponse(
        API_ERROR_MESSAGES.GITHUB_INVALID_OWNER[defaultLocale],
        400,
        'GITHUB_INVALID_OWNER',
      );
    }

    if (!repositoryName) {
      return createApiErrorResponse(
        API_ERROR_MESSAGES.GITHUB_INVALID_REPOSITORY_NAME[defaultLocale],
        400,
        'GITHUB_INVALID_REPOSITORY_NAME',
      );
    }

    const data = await getGitHubRepositoryDetails({
      owner,
      name: repositoryName,
    });

    const body: IServerApiSuccess<IGitHubRepositoryResponse> = {
      data,
    };

    return NextResponse.json(body);
  } catch (error) {
    console.error('[API | GitHub | Repository]', {
      originalMessage: getGitHubOriginalMessage(error),
    });

    return createGitHubErrorResponse(error);
  }
}
