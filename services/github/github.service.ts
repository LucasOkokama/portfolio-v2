import 'server-only';

import type { IGitHubRepositoryResponse } from '@/types/github.type';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  userAgent: 'portfolio-v2',
});

const OWNER = 'LucasOkokama';

function isNotFoundError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    error.status === 404
  );
}

function isEmptyRepositoryError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    error.status === 409
  );
}

async function getRepositoryLatestCommit(
  repositoryName: string,
  defaultBranch: string | null,
) {
  if (!defaultBranch) {
    return null;
  }

  try {
    const { data } = await octokit.rest.repos.getCommit({
      owner: OWNER,
      repo: repositoryName,
      ref: defaultBranch,
    });

    return data;
  } catch (error) {
    if (isNotFoundError(error) || isEmptyRepositoryError(error)) {
      return null;
    }

    throw error;
  }
}

async function getRepositoryLatestRelease(repositoryName: string) {
  try {
    const { data } = await octokit.rest.repos.getLatestRelease({
      owner: OWNER,
      repo: repositoryName,
    });

    return data;
  } catch (error) {
    if (isNotFoundError(error)) {
      return null;
    }

    throw error;
  }
}

export async function getGitHubRepositoryDetails(
  repositoryName: string,
): Promise<IGitHubRepositoryResponse> {
  const { data: repository } = await octokit.rest.repos.get({
    owner: OWNER,
    repo: repositoryName,
  });

  const [repositoryCommit, repositoryRelease] = await Promise.all([
    getRepositoryLatestCommit(repositoryName, repository.default_branch),
    getRepositoryLatestRelease(repositoryName),
  ]);

  return {
    createdAt: repository.created_at,
    pushedAt: repository.pushed_at,

    stars: repository.stargazers_count,
    forks: repository.forks_count,
    license: repository.license?.spdx_id ?? null,

    latestCommit: repositoryCommit
      ? {
          sha: repositoryCommit.sha,
          url: repositoryCommit.html_url,
          message: repositoryCommit.commit.message,
        }
      : null,

    latestRelease: repositoryRelease
      ? {
          tagName: repositoryRelease.tag_name,
          name: repositoryRelease.name,
          url: repositoryRelease.html_url,
        }
      : null,
  };
}
