import 'server-only';

import type { IProjectRepository } from '@/schemas/zod/projects.schema';
import type { IGitHubRepositoryResponse } from '@/types/github.type';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  userAgent: 'portfolio-v2',
});

function isNotFoundError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof error.status === 'number' &&
    error.status === 404
  );
}

function isEmptyRepositoryError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof error.status === 'number' &&
    error.status === 409
  );
}

async function getRepositoryLatestCommit(
  repository: IProjectRepository,
  defaultBranch: string | null,
) {
  if (!defaultBranch) {
    return null;
  }

  try {
    const { data } = await octokit.rest.repos.getCommit({
      owner: repository.owner,
      repo: repository.name,
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

async function getRepositoryCommitsCount(
  repository: IProjectRepository,
): Promise<number> {
  const { headers, data } = await octokit.rest.repos.listCommits({
    owner: repository.owner,
    repo: repository.name,
    per_page: 1,
  });

  const link = headers.link;
  if (!link) {
    return data.length;
  }

  const lastPage = link.match(/&page=(\d+)>;\s*rel="last"/);

  return lastPage ? Number(lastPage[1]) : data.length;
}

async function getRepositoryLatestRelease(repository: IProjectRepository) {
  try {
    const { data } = await octokit.rest.repos.getLatestRelease({
      owner: repository.owner,
      repo: repository.name,
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
  repository: IProjectRepository,
): Promise<IGitHubRepositoryResponse> {
  const { data } = await octokit.rest.repos.get({
    owner: repository.owner,
    repo: repository.name,
  });

  const [repositoryCommit, repositoryCommitsCount, repositoryRelease] =
    await Promise.all([
      getRepositoryLatestCommit(repository, data.default_branch),
      getRepositoryCommitsCount(repository),
      getRepositoryLatestRelease(repository),
    ]);

  return {
    htmlUrl: data.html_url,
    defaultBranch: data.default_branch,
    createdAt: data.created_at,
    pushedAt: data.pushed_at,

    stars: data.stargazers_count,
    forks: data.forks_count,
    license: data.license?.spdx_id
      ? {
          spdx_id: data.license.spdx_id,
          url: `https://choosealicense.com/licenses/${data.license.key}/`,
        }
      : null,

    latestCommit: repositoryCommit
      ? {
          sha: repositoryCommit.sha,
          url: repositoryCommit.html_url,
          message: repositoryCommit.commit.message,
        }
      : null,

    commits: repositoryCommitsCount,

    latestRelease: repositoryRelease
      ? {
          tagName: repositoryRelease.tag_name,
          name: repositoryRelease.name,
          url: repositoryRelease.html_url,
        }
      : null,
  };
}
