import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
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
