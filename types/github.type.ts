export interface IGitHubRepositoryResponse {
  createdAt: string;
  pushedAt: string | null;
  stars: number;
  forks: number;
  license: string | null;
  latestCommit: {
    sha: string;
    url: string;
    message: string;
  } | null;
  latestRelease: {
    tagName: string;
    name: string | null;
    url: string;
  } | null;
}
