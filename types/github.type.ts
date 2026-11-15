export interface IGitHubRepositoryResponse {
  htmlUrl: string;
  defaultBranch: string;
  createdAt: string;
  pushedAt: string | null;
  stars: number;
  forks: number;
  license: {
    spdx_id: string;
    url: string;
  } | null;
  latestCommit: {
    sha: string;
    url: string;
    message: string;
  } | null;
  commits: number;
  latestRelease: {
    tagName: string;
    name: string | null;
    url: string;
  } | null;
}
