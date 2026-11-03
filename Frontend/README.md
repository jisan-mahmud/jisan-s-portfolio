# Portfolio Frontend

React + Vite frontend for the Jisan Mahmud portfolio. All content is loaded from the Django API in `../Backend`.

## Development

```bash
npm install
cp .env.example .env
npm run dev
```

The Vite dev server proxies `/api` and `/media` to `http://localhost:8007` by default. Override the backend target with `VITE_API_PROXY_TARGET` if needed.

## Environment

Copy `.env.example` to `.env`:

```env
VITE_API_BASE_URL=/api/v1
```

- In development, keep `VITE_API_BASE_URL=/api/v1` and let Vite proxy requests.
- In production, set it to the deployed backend URL, e.g. `https://api.example.com/api/v1`.
- Set `VITE_SITE_URL` to the canonical public frontend origin, such as `https://portfolio.example.com`. If omitted, Vercel's production domain is used during the build when available; page metadata otherwise falls back to the browser's current origin. The build always emits `robots.txt` and emits `sitemap.xml` when a public site origin is available. Set `VITE_API_BASE_URL` to the absolute public API URL so the sitemap can include published project pages; without it, the sitemap lists only the homepage.

The site remains a client-rendered Vite app: route-specific project metadata is applied after JavaScript loads. Search engines that do not render JavaScript may only see the generic HTML metadata on project URLs; server rendering or prerendering would be needed to remove that limitation.

## Content and stats

- Portfolio content (profile, projects, experience, education, skills, contact links) comes from `GET /api/v1/portfolio/home/`.
- Project details come from `GET /api/v1/portfolio/projects/<slug>/`.
- Codeforces and LeetCode statistics are fetched through the backend integration endpoints.
- Content is managed in the Django admin at the backend `/admin/`.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```
