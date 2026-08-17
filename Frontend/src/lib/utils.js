import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function fetchLeetcodeUser(username) {
  if (!username) throw new Error('No LeetCode username provided');
  const query = `{ matchedUser(username: "${username}") { username profile { realName userAvatar ranking } submitStatsGlobal { acSubmissionNum { difficulty count } } tagProblemCounts { advanced { tagName problemsSolved } intermediate { tagName problemsSolved } fundamental { tagName problemsSolved } } } }`;
  const res = await fetch('/leetcode-api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Referer': 'https://leetcode.com' },
    body: JSON.stringify({ query }),
  });
  const json = await res.json();
  const user = json?.data?.matchedUser;
  if (!user) throw new Error('User not found');
  const counts = user.submitStatsGlobal?.acSubmissionNum || [];
  const get = (d) => counts.find(c => c.difficulty === d)?.count ?? 0;
  const t = user.tagProblemCounts || {};
  return {
    username: user.username,
    name: user.profile.realName,
    avatar: user.profile.userAvatar,
    ranking: user.profile.ranking,
    easySolved: get('Easy'),
    mediumSolved: get('Medium'),
    hardSolved: get('Hard'),
    totalSolved: get('All'),
    problemTags: {
      advanced: t.advanced || [],
      intermediate: t.intermediate || [],
      fundamental: t.fundamental || [],
    },
  };
}

export async function fetchCodeforcesUser(handle) {
  if (!handle) throw new Error('No Codeforces handle provided');
  const endpoint = `https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle)}`;
  const res = await fetch(endpoint);
  const json = await res.json();
  if (json.status !== 'OK') {
    throw new Error(json.comment || 'Failed to fetch Codeforces user');
  }
  return json.result[0];
}

export async function fetchCodeforcesContests(handle) {
  if (!handle) throw new Error('No Codeforces handle provided');
  const endpoint = `https://codeforces.com/api/user.rating?handle=${encodeURIComponent(handle)}`;
  const res = await fetch(endpoint);
  const json = await res.json();
  if (json.status !== 'OK') {
    // When a user has no contests, Codeforces may return FAILED; handle gracefully
    throw new Error(json.comment || 'Failed to fetch Codeforces contests');
  }
  // json.result is an array of rating change objects (one per contest)
  return json.result || [];
}
