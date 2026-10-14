/** Cookie / analytics consent, stored locally (no cookie is set until the visitor chooses). */
const KEY = 'tp9_cookie_consent'
const CHANGE = 'tp9:consent'
export const OPEN_SETTINGS = 'tp9:cookie-settings'

export type Consent = { analytics: boolean; ts: number; v: 1 }

export function getConsent(): Consent | null {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return null
    const c = JSON.parse(raw) as Consent
    return typeof c.analytics === 'boolean' ? c : null
  } catch { return null }
}

export function setConsent(analytics: boolean) {
  const c: Consent = { analytics, ts: Date.now(), v: 1 }
  try { window.localStorage.setItem(KEY, JSON.stringify(c)) } catch { /* private mode: choice lasts for this visit only */ }
  window.dispatchEvent(new CustomEvent(CHANGE, { detail: c }))
  return c
}

export function onConsentChange(fn: (c: Consent) => void) {
  const h = (e: Event) => fn((e as CustomEvent<Consent>).detail)
  window.addEventListener(CHANGE, h)
  return () => window.removeEventListener(CHANGE, h)
}

export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_SETTINGS))
