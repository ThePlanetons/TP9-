import { SITE } from '../config/site'
import type { Consent } from './consent'

/**
 * Google Analytics 4, loaded ONLY after the visitor accepts analytics cookies, and only when VITE_GA_ID is set.
 * No ID → nothing is loaded and every call below is a no-op.
 */
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
    [key: `ga-disable-${string}`]: boolean | undefined
  }
}

let loaded = false
let enabled = false

function gtag(..._args: unknown[]) {
  // GA requires the `arguments` object itself on the dataLayer, not an array.
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments)
}

function load(id: string) {
  window.dataLayer = window.dataLayer || []
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', id, { anonymize_ip: true, send_page_view: false })
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  document.head.appendChild(s)
  loaded = true
}

function clearGaCookies() {
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim()
    if (name === '_ga' || name.startsWith('_ga_') || name === '_gid') {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${location.hostname.replace(/^www\./, '')}; SameSite=Lax`
    }
  })
}

/** Call on startup and whenever the visitor changes their choice. */
export function syncAnalytics(consent: Consent | null) {
  const id = SITE.gaId
  if (!id) return
  if (consent?.analytics) {
    window[`ga-disable-${id}`] = false
    enabled = true
    if (!loaded) load(id)
    trackPageView(window.location.pathname)
  } else {
    enabled = false
    window[`ga-disable-${id}`] = true
    if (loaded) clearGaCookies()
  }
}

export function trackPageView(path: string) {
  if (!enabled || !loaded) return
  gtag('event', 'page_view', { page_path: path, page_location: window.location.href, page_title: document.title })
}

/** Never pass personal data (names, emails, message text) as event parameters. */
export function trackEvent(name: string, params: Record<string, string | number | boolean> = {}) {
  if (!enabled || !loaded) return
  gtag('event', name, params)
}
