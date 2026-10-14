import { useEffect } from 'react'
import { SITE } from '../config/site'

type SEO = { title: string; description: string; path: string; noindex?: boolean }

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
  el.setAttribute('content', value)
}

/** Per-page <title>, description, canonical, Open Graph and robots (the static defaults live in index.html). */
export function useSEO({ title, description, path, noindex = false }: SEO) {
  useEffect(() => {
    const url = SITE.url + (path === '/' ? '/' : path)
    document.title = title
    setMeta('name', 'description', description)
    setMeta('name', 'robots', noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large')
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link) }
    link.href = url
  }, [title, description, path, noindex])
}
