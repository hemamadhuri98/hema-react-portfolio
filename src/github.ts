export type GithubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  pushed_at: string;
  fork: boolean;
};

export type GithubEvent = {
  id: string;
  type: string;
  actor: { login: string; avatar_url: string };
  repo: { name: string; url: string };
  created_at: string;
  payload: Record<string, any>;
};

const API = 'https://api.github.com';
const USER = 'hemamadhuri98';

async function githubFetch<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } });
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  return res.json();
}

export async function getRepos(): Promise<GithubRepo[]> {
  const repos = await githubFetch<GithubRepo[]>(`${API}/users/${USER}/repos?per_page=100&sort=updated`);
  return repos.filter(r => !r.fork);
}

export async function getEvents(): Promise<GithubEvent[]> {
  return githubFetch<GithubEvent[]>(`${API}/users/${USER}/events/public?per_page=30`);
}

export async function getReadmeImages(repo: GithubRepo): Promise<string[]> {
  try {
    const res = await fetch(`${API}/repos/${repo.full_name}/readme`, {
      headers: { Accept: 'application/vnd.github.raw+json' }
    });
    if (!res.ok) return [];
    const markdown = await res.text();
    const images = [...markdown.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map(m => m[1].trim());
    const htmlImages = [...markdown.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1].trim());
    return [...images, ...htmlImages]
      .filter(src => !src.startsWith('data:'))
      .map(src => src.startsWith('http') ? src : `https://raw.githubusercontent.com/${repo.full_name}/HEAD/${src.replace(/^\.\//, '')}`)
      .slice(0, 6);
  } catch {
    return [];
  }
}

export function githubEventLabel(event: GithubEvent): string {
  switch (event.type) {
    case 'PushEvent': return `Pushed code to ${event.repo.name}`;
    case 'PullRequestEvent': return `${event.payload.action ?? 'Updated'} a pull request in ${event.repo.name}`;
    case 'IssuesEvent': return `${event.payload.action ?? 'Updated'} an issue in ${event.repo.name}`;
    case 'CreateEvent': return `Created ${event.payload.ref_type ?? 'content'} in ${event.repo.name}`;
    case 'DeleteEvent': return `Deleted ${event.payload.ref_type ?? 'content'} in ${event.repo.name}`;
    case 'WatchEvent': return `Starred ${event.repo.name}`;
    case 'ForkEvent': return `Forked ${event.repo.name}`;
    default: return `${event.type.replace('Event', '')} in ${event.repo.name}`;
  }
}
