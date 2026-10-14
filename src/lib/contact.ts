import { SERVICES, SITE } from '../config/site'

export const SERVICE_OPTIONS = [...SERVICES, 'E-commerce', 'Other'] as const
export const BUDGETS = [
  'Starter — single page or landing page',
  'Standard — multi-page business website',
  'Advanced — e-commerce, web app or 3D',
  'Not sure yet — I need guidance',
] as const
export const TIMELINES = ['As soon as possible', 'Within 1 month', '1–3 months', 'Flexible'] as const
export const SOURCES = ['Instagram', 'Google search', 'Referral', 'Another website', 'Other'] as const

export const LIMITS = { name: 80, email: 254, phone: 20, company: 100, website: 200, message: 2000, messageMin: 20 }

export type ContactValues = {
  name: string
  email: string
  phone: string
  company: string
  website: string
  services: string[]
  budget: string
  timeline: string
  source: string
  message: string
  consent: boolean
  /** Honeypot — real visitors never see or fill this. */
  hp: string
}
export type ContactErrors = Partial<Record<keyof ContactValues, string>>

export const emptyValues: ContactValues = {
  name: '', email: '', phone: '', company: '', website: '', services: [], budget: '', timeline: '', source: '', message: '', consent: false, hp: '',
}

// eslint-disable-next-line no-control-regex
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g
export const clean = (s: string) => s.replace(CONTROL, '').trim()

const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M} .'’-]*$/u
const EMAIL_RE = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/

/** Accepts "example.com" or "https://example.com/path"; returns a normalised https URL or null. */
export function normaliseWebsite(raw: string): string | null {
  const s = clean(raw)
  if (!s) return ''
  try {
    const u = new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`)
    if (!/^https?:$/.test(u.protocol) || !u.hostname.includes('.') || /\s/.test(s)) return null
    return u.toString()
  } catch { return null }
}

export const countLinks = (text: string) => (text.match(/https?:\/\/|www\./gi) || []).length

export function validate(v: ContactValues): ContactErrors {
  const e: ContactErrors = {}
  const name = clean(v.name), email = clean(v.email), phone = clean(v.phone), msg = clean(v.message)

  if (!name) e.name = 'Please enter your name.'
  else if (name.length < 2) e.name = 'Your name looks too short.'
  else if (name.length > LIMITS.name) e.name = `Please keep your name under ${LIMITS.name} characters.`
  else if (!NAME_RE.test(name)) e.name = 'Please use letters only in your name.'

  if (!email) e.email = 'Please enter your email address.'
  else if (email.length > LIMITS.email || !EMAIL_RE.test(email)) e.email = 'That email address doesn’t look right (e.g. name@company.com).'

  if (phone) {
    const digits = phone.replace(/\D/g, '')
    if (!/^[+()\d\s-]+$/.test(phone) || digits.length < 7 || digits.length > 15) e.phone = 'Enter a valid phone number (7–15 digits), or leave it blank.'
  }

  if (clean(v.company).length > LIMITS.company) e.company = `Please keep this under ${LIMITS.company} characters.`

  if (clean(v.website) && (normaliseWebsite(v.website) === null || clean(v.website).length > LIMITS.website))
    e.website = 'Enter a valid website address (e.g. yourbrand.com), or leave it blank.'

  if (v.services.length === 0) e.services = 'Choose at least one service.'

  if (!msg) e.message = 'Tell us a little about your project.'
  else if (msg.length < LIMITS.messageMin) e.message = `Please add a bit more detail (at least ${LIMITS.messageMin} characters).`
  else if (msg.length > LIMITS.message) e.message = `Please keep your message under ${LIMITS.message} characters.`
  else if (countLinks(msg) > 2) e.message = 'Please include at most two links in your message.'

  if (!v.consent) e.consent = 'Please confirm you agree to the Privacy Policy so we can reply to you.'
  return e
}

/* ───────────── spam / bot protection (no keys, nothing to leak) ───────────── */
export const MIN_FILL_MS = 4000 // humans take longer than this to fill a detailed form
export const COOLDOWN_MS = 60_000
const LAST_KEY = 'tp9_last_enquiry'

export const cooldownLeft = (now = Date.now()) => {
  try { return Math.max(0, COOLDOWN_MS - (now - Number(window.localStorage.getItem(LAST_KEY) || 0))) } catch { return 0 }
}
export const markSent = () => { try { window.localStorage.setItem(LAST_KEY, String(Date.now())) } catch { /* ignore */ } }

/** True when the submission looks automated: honeypot filled or the form was completed implausibly fast. */
export const looksLikeBot = (v: ContactValues, openedAt: number, now = Date.now()) => clean(v.hp).length > 0 || now - openedAt < MIN_FILL_MS

export type SubmitResult = { ok: true } | { ok: false; reason: 'network' | 'rejected' | 'timeout' }

export async function sendEnquiry(v: ContactValues, fetchImpl: typeof fetch = fetch): Promise<SubmitResult> {
  const website = normaliseWebsite(v.website) || ''
  const payload = {
    name: clean(v.name),
    email: clean(v.email),
    phone: clean(v.phone),
    company: clean(v.company),
    website,
    services: v.services.join(', '),
    budget: v.budget,
    timeline: v.timeline,
    heard_about_us: v.source,
    message: clean(v.message),
    privacy_policy_accepted: 'yes',
    _subject: `New project enquiry from ${clean(v.name)} — ${SITE.name}`,
    _template: 'table',
    _captcha: 'false', // AJAX mode has no captcha; the honeypot + time trap above do the filtering
    _honey: '',
  }
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), 15000)
  try {
    const res = await fetchImpl(SITE.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    })
    const data = (await res.json().catch(() => ({}))) as { success?: string | boolean }
    if (res.ok && (data.success === true || data.success === 'true')) return { ok: true }
    return { ok: false, reason: 'rejected' }
  } catch (err) {
    return { ok: false, reason: (err as Error).name === 'AbortError' ? 'timeout' : 'network' }
  } finally {
    clearTimeout(timer)
  }
}
