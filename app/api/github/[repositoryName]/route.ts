import { API_ERROR_MESSAGES } from '@/constants/api';
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

interface Props {
  params: Promise<{
    repositoryName: string;
  }>;
}

export async function GET(_request: Request, { params }: Props) {
  const apiGuardResponse = requireApiEnabled();
  if (apiGuardResponse) {
    return apiGuardResponse;
  }

  try {
    const { repositoryName } = await params;
    const normalizedRepositoryName = repositoryName.trim();

    if (!normalizedRepositoryName) {
      return createApiErrorResponse(
        API_ERROR_MESSAGES.GITHUB_INVALID_REPOSITORY_NAME[defaultLocale],
        400,
        'GITHUB_INVALID_REPOSITORY_NAME',
      );
    }

    const data = await getGitHubRepositoryDetails(normalizedRepositoryName);

    const body: IServerApiSuccess<IGitHubRepositoryResponse> = {
      data,
    };

    return NextResponse.json(body);
  } catch (error) {
    console.error('[API | GitHub | RepositoryName]', {
      originalMessage: getGitHubOriginalMessage(error),
    });

    return createGitHubErrorResponse(error);
  }
}
