import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import { loadEnv } from 'vite'

const frontendDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outputDirectory = resolve(frontendDirectory, 'dist')
const env = { ...loadEnv('production', frontendDirectory, ''), ...process.env }
const publicUrl = env.VITE_SITE_URL?.trim()
  || env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
  || (env.VERCEL_ENV === 'production' ? env.VERCEL_URL?.trim() : '')

function normalizeOrigin(value) {
  if (!value) return null
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`
  return new URL(withProtocol).origin
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

async function getPublishedProjects(siteOrigin) {
  const apiBase = env.VITE_API_BASE_URL?.trim()
  if (!apiBase) {
    console.warn('VITE_API_BASE_URL is not set; the sitemap will list the home page only.')
    return []
  }
  if (!/^https?:\/\//i.test(apiBase)) {
    console.warn('VITE_API_BASE_URL is not absolute; the sitemap will list the home page only.')
    return []
  }

  const apiBaseUrl = new URL(apiBase, `${siteOrigin}/`)
  const endpointPath = `${apiBaseUrl.pathname.replace(/\/+$/, '')}/portfolio/projects/`
  apiBaseUrl.pathname = endpointPath
  apiBaseUrl.search = ''
  apiBaseUrl.hash = ''

  const response = await fetch(apiBaseUrl, { signal: AbortSignal.timeout(15000) })
  if (!response.ok) {
    throw new Error(`Could not fetch published projects for the sitemap: HTTP ${response.status}`)
  }

  const projects = await response.json()
  if (!Array.isArray(projects) || projects.some((project) => typeof project.slug !== 'string')) {
    throw new Error('The project API returned an invalid sitemap payload.')
  }

  return projects
}

async function main() {
  await mkdir(outputDirectory, { recursive: true })

  const siteOrigin = normalizeOrigin(publicUrl)
  const robotsLines = ['User-agent: *', 'Allow: /']
  if (!siteOrigin) {
    console.warn(
      'No public site origin configured. Set VITE_SITE_URL for production SEO metadata and sitemap generation.',
    )
    await writeFile(resolve(outputDirectory, 'robots.txt'), `${robotsLines.join('\n')}\n`)
    return
  }

  robotsLines.push(`Sitemap: ${siteOrigin}/sitemap.xml`)
  await writeFile(resolve(outputDirectory, 'robots.txt'), `${robotsLines.join('\n')}\n`)

  const indexPath = resolve(outputDirectory, 'index.html')
  let html = await readFile(indexPath, 'utf8')
  const socialImageUrl = `${siteOrigin}/images/jisan-mahmud.png`
  html = html
    .replace('content="/"', `content="${siteOrigin}/"`)
    .replaceAll('content="/images/jisan-mahmud.png"', `content="${socialImageUrl}"`)

  await writeFile(indexPath, html)

  const projects = await getPublishedProjects(siteOrigin)
  const urls = [
    `${siteOrigin}/`,
    ...projects.map((project) => `${siteOrigin}/projects/${encodeURIComponent(project.slug)}`),
  ]
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n')
  await writeFile(resolve(outputDirectory, 'sitemap.xml'), sitemap)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
