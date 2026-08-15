import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function fetchLeetcodeUser(username) {
  if (!username) throw new Error('No LeetCode username provided');
  const base = `https://leetcode-api-faisalshohag.vercel.app/${encodeURIComponent(username)}`;
  const res = await fetch(base);
  const profile = await res.json();
  if (!profile.easySolved && profile.easySolved !== 0) throw new Error('User not found');

  let name = null, avatar = null, problemTags = { advanced: [], intermediate: [], fundamental: [] };
  try {
    const r = await fetch(`https://alfa-leetcode-api.onrender.com/${encodeURIComponent(username)}`);
    const text = await r.text();
    const extra = JSON.parse(text);
    name = extra?.name || null;
    avatar = extra?.avatar || null;
  } catch (_) {}

  try {
    const sr = await fetch(`https://alfa-leetcode-api.onrender.com/skillStats/${encodeURIComponent(username)}`);
    const text = await sr.text();
    const skills = JSON.parse(text);
    const t = skills?.matchedUser?.tagProblemCounts || {};
    problemTags = {
      advanced: t.advanced || [],
      intermediate: t.intermediate || [],
      fundamental: t.fundamental || [],
    };
  } catch (_) {}

  return { ...profile, name, avatar, problemTags };
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
