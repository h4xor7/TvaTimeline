export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  homepage?: string;
  topics: string[];
  updated_at: string;
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const response = await fetch(`/api/github/user/${username}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub user: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const response = await fetch(`/api/github/repos/${username}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub repositories: ${response.statusText}`);
  }
  return response.json();
}

export function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    Kotlin: '#A97BFF',
    Java: '#b07219',
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    Swift: '#ffac45',
    Dart: '#00B4AB',
    XML: '#0060ac',
  };
  return colors[language] || '#858585';
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
