const configuredBase = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export const API_BASE_URL = configuredBase.replace(/\/$/, '');

const API_ORIGIN = /^https?:\/\//i.test(API_BASE_URL) ? new URL(API_BASE_URL).origin : '';

export function resolveMediaUrl(src) {
  if (!src) return '';
  if (/^(https?:|data:|blob:)/i.test(src)) return src;
  if (src.startsWith('/media/') && API_ORIGIN) return `${API_ORIGIN}${src}`;
  return src;
}

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    const detail =
      payload?.detail ||
      payload?.message ||
      (typeof payload === 'object' && payload ? Object.values(payload).flat().join(' ') : '') ||
      `Request failed with status ${response.status}`;
    throw new Error(detail);
  }

  return payload;
}

function endpoint(path) {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return `${API_BASE_URL}/${clean}/`;
}

export async function apiGet(path) {
  const response = await fetch(endpoint(path), {
    headers: { Accept: 'application/json' },
  });
  return parseResponse(response);
}

export async function apiPost(path, body) {
  const response = await fetch(endpoint(path), {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return parseResponse(response);
}
