'use client';

/**
 * One line in the footer that proves the project is still moving, pulled from
 * GitHub in the browser so nobody has to remember to update it.
 *
 * The account is a user, not an organisation, so /users/ not /orgs/.
 * Unauthenticated GitHub API: 60 requests an hour per visitor IP, and this
 * makes one call for the repository list plus one per repository for the
 * month's commits — six at the time of writing. If anything fails the line
 * renders nothing rather than a stale or made-up number, in keeping with the
 * rule that no figure appears on the site that nobody can check.
 */

import { useEffect, useState } from 'react';

const ORG = 'orbierobot';

type Repo = { full_name: string; pushed_at: string; fork: boolean };

type Life = { daysAgo: number; commits: number; capped: boolean };

function startOfMonthUTC(): string {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
}

async function fetchLife(): Promise<Life> {
  const headers = { Accept: 'application/vnd.github+json' };
  const repos: Repo[] = await fetch(
    `https://api.github.com/users/${ORG}/repos?per_page=100&sort=pushed`,
    { headers },
  ).then((r) => (r.ok ? r.json() : Promise.reject(r.status)));

  const own = repos.filter((r) => !r.fork);
  const latest = Math.max(...own.map((r) => Date.parse(r.pushed_at)));
  const daysAgo = Math.max(0, Math.floor((Date.now() - latest) / 86_400_000));

  const since = startOfMonthUTC();
  const counts = await Promise.all(
    own.map((r) =>
      fetch(`https://api.github.com/repos/${r.full_name}/commits?since=${since}&per_page=100`, {
        headers,
      })
        .then((res) => (res.ok ? res.json() : []))
        .then((list: unknown[]) => list.length)
        .catch(() => 0),
    ),
  );
  const commits = counts.reduce((a, b) => a + b, 0);
  return { daysAgo, commits, capped: counts.some((c) => c >= 100) };
}

export function ProofOfLife() {
  const [life, setLife] = useState<Life | null>(null);

  useEffect(() => {
    let alive = true;
    fetchLife()
      .then((l) => alive && setLife(l))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  if (!life) return null;

  const when =
    life.daysAgo === 0 ? 'today' : life.daysAgo === 1 ? 'yesterday' : `${life.daysAgo} days ago`;
  const n = life.capped ? `${life.commits}+` : String(life.commits);

  return (
    <p className="text-[11px] tracking-[0.14em] text-alu-3">
      LAST BUILD UPDATE <span className="text-ember">{when.toUpperCase()}</span>
      <span className="px-3 text-line-lit">/</span>
      <span className="text-alu-2">{n}</span> COMMITS THIS MONTH
      <span className="px-3 text-line-lit">/</span>
      <a
        href={`https://github.com/${ORG}`}
        className="text-alu-2 hover:text-ember"
        target="_blank"
        rel="noreferrer"
      >
        FROM GITHUB
      </a>
    </p>
  );
}
