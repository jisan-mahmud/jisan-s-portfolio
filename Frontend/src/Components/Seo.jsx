import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { resolveMediaUrl } from '../lib/api'

const DEFAULT_TITLE = 'Jisan Mahmud | Backend-Focused Full-Stack Developer'
const DEFAULT_DESCRIPTION =
  'Explore the portfolio of Jisan Mahmud, a backend-focused full-stack developer building APIs and web applications with Django, Python, and React.'
const DEFAULT_IMAGE = '/images/jisan-mahmud.png'

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

export default function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  type = 'website',
  path,
  noIndex = false,
  structuredData,
}) {
  const { pathname } = useLocation()

  useEffect(() => {
    const configuredSiteUrl = import.meta.env.VITE_SITE_URL
    const siteOrigin = configuredSiteUrl
      ? new URL(configuredSiteUrl).origin
      : window.location.origin
    const canonicalUrl = new URL(path || pathname, `${siteOrigin}/`).href
    const imageUrl = new URL(resolveMediaUrl(image || DEFAULT_IMAGE), `${siteOrigin}/`).href
    const pageTitle = title || DEFAULT_TITLE
    const pageDescription = (description || DEFAULT_DESCRIPTION).replace(/\s+/g, ' ').trim().slice(0, 160)

    document.title = pageTitle
    setMeta('name', 'description', pageDescription)
    setMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow')
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:site_name', 'Jisan Mahmud')
    setMeta('property', 'og:title', pageTitle)
    setMeta('property', 'og:description', pageDescription)
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:image', imageUrl)
    setMeta('property', 'og:image:alt', `${pageTitle} — Jisan Mahmud`)
    setMeta('name', 'twitter:card', 'summary')
    setMeta('name', 'twitter:title', pageTitle)
    setMeta('name', 'twitter:description', pageDescription)
    setMeta('name', 'twitter:image', imageUrl)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl

    let schema = document.getElementById('seo-structured-data')
    if (structuredData) {
      if (!schema) {
        schema = document.createElement('script')
        schema.id = 'seo-structured-data'
        schema.type = 'application/ld+json'
        document.head.appendChild(schema)
      }
      schema.textContent = JSON.stringify(structuredData)
    } else {
      schema?.remove()
    }
  }, [description, image, noIndex, path, pathname, structuredData, title, type])

  return null
}
