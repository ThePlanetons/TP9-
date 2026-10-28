/**
 * Vercel Serverless Function — POST /api/contact
 *
 * Sends the website enquiry to your inbox through Resend (https://resend.com), using the key stored in the
 * RESEND_API_KEY environment variable on Vercel. The key lives ONLY on the server — it is never in the browser bundle.
 *
 *   To:        theplanet9official@gmail.com   (CONTACT_TO)
 *   Reply-To:  the client's email             → pressing Reply writes to the client
 *   From:      "<Client name> via THE PLANET 9" <onboarding@resend.dev>   (a client's address can't be used as the real
 *              sender: Gmail would reject/spam it because it isn't sent from their own mail server)
 *
 * Environment variables (Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY        required   re_xxxxxxxx
 *   CONTACT_TO            optional   default theplanet9official@gmail.com
 *   CONTACT_FROM_ADDRESS  optional   default onboarding@resend.dev  (use e.g. website@yourdomain.com once the domain is verified in Resend)
 */
const DEFAULT_TO = 'theplanet9official@gmail.com'
const SITE_NAME = 'THE PLANET 9'
const MAX = { name: 80, email: 254, phone: 20, company: 100, website: 200, message: 2000, pick: 120 }
const SERVICES = ['Web Development', '3D Experiences', 'Branding', 'UI/UX Design', 'Digital Marketing', 'Content Creation', 'E-commerce', 'Other']

// Best-effort limiter (per warm serverless instance): 5 enquiries / IP / hour.
const hits = new Map()
const WINDOW_MS = 60 * 60 * 1000, LIMIT = 5

// eslint-disable-next-line no-control-regex
const clean = (s) => String(s ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim()
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const EMAIL_RE = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/
const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M} .'’-]*$/u
const countLinks = (t) => (t.match(/https?:\/\/|www\./gi) || []).length

function limited(ip) {
  const now = Date.now()
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  arr.push(now)
  hits.set(ip, arr)
  if (hits.size > 500) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k)
  return arr.length > LIMIT
}

/** Validate + normalise. Returns { values } or { errors }. Mirrors the checks in src/lib/contact.ts. */
export function parse(body) {
  const b = body && typeof body === 'object' ? body : {}
  const v = {
    name: clean(b.name), email: clean(b.email), phone: clean(b.phone), company: clean(b.company), website: clean(b.website),
    budget: clean(b.budget).slice(0, MAX.pick), timeline: clean(b.timeline).slice(0, MAX.pick), source: clean(b.source).slice(0, MAX.pick),
    message: clean(b.message),
    services: (Array.isArray(b.services) ? b.services : []).map(clean).filter((s) => SERVICES.includes(s)),
  }
  const e = {}
  if (v.name.length < 2 || v.name.length > MAX.name || !NAME_RE.test(v.name)) e.name = 'invalid'
  if (!v.email || v.email.length > MAX.email || !EMAIL_RE.test(v.email)) e.email = 'invalid'
  if (v.phone && (!/^[+()\d\s-]+$/.test(v.phone) || v.phone.replace(/\D/g, '').length < 7 || v.phone.replace(/\D/g, '').length > 15)) e.phone = 'invalid'
  if (v.company.length > MAX.company) e.company = 'invalid'
  if (v.website.length > MAX.website) e.website = 'invalid'
  if (v.services.length === 0) e.services = 'invalid'
  if (v.message.length < 20 || v.message.length > MAX.message || countLinks(v.message) > 2) e.message = 'invalid'
  if (b.consent !== true) e.consent = 'required'
  return Object.keys(e).length ? { errors: e } : { values: v }
}

/** Display name for the From header: the client's name, stripped of anything that could break/spoof the header. */
export const displayName = (name) => {
  const n = name.replace(/["<>@,;:\\\r\n]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 60)
  return `${n || 'Website visitor'} via ${SITE_NAME}`
}

export function buildEmail(v, env = {}) {
  const to = env.CONTACT_TO || DEFAULT_TO
  const addr = env.CONTACT_FROM_ADDRESS || 'onboarding@resend.dev'
  const rows = [
    ['Name', v.name], ['Email', v.email], ['Phone / WhatsApp', v.phone], ['Company / brand', v.company], ['Current website', v.website],
    ['Services', v.services.join(', ')], ['Project scope', v.budget], ['Timeline', v.timeline], ['Heard about us via', v.source],
  ].filter(([, val]) => val)
  const text = rows.map(([k, val]) => `${k}: ${val}`).join('\n') + `\n\nProject details:\n${v.message}\n\n— Sent from the ${SITE_NAME} website contact form. Reply to this email to answer ${v.name}.`
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#111;max-width:640px">
  <h2 style="margin:0 0 4px;color:#F64618">New project enquiry</h2>
  <p style="margin:0 0 16px;color:#555">From the ${SITE_NAME} website — <strong>reply to this email to answer ${esc(v.name)}</strong>.</p>
  <table style="border-collapse:collapse;width:100%">${rows
    .map(([k, val]) => `<tr><td style="padding:8px 12px;border:1px solid #e5e5e5;background:#fafafa;width:170px;font-weight:bold">${esc(k)}</td><td style="padding:8px 12px;border:1px solid #e5e5e5">${k === 'Email' ? `<a href="mailto:${esc(val)}">${esc(val)}</a>` : esc(val)}</td></tr>`)
    .join('')}</table>
  <h3 style="margin:20px 0 6px">Project details</h3>
  <p style="white-space:pre-wrap;margin:0;padding:12px;border:1px solid #e5e5e5;border-radius:8px">${esc(v.message)}</p></div>`
  return {
    from: `${displayName(v.name)} <${addr}>`,
    to: [to],
    reply_to: v.email,
    subject: `New enquiry from ${v.name} — ${SITE_NAME}`,
    html,
    text,
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false, error: 'method_not_allowed' }) }

  // Only accept posts from this site (blocks other websites from using the endpoint).
  const origin = req.headers.origin
  if (origin) {
    let host = ''
    try { host = new URL(origin).host } catch { /* invalid */ }
    if (host !== req.headers.host && !/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host)) return res.status(403).json({ ok: false, error: 'forbidden_origin' })
  }

  let body = req.body
  if (typeof body === 'string') { try { body = JSON.parse(body) } catch { body = {} } }

  // Honeypot: a bot filled the hidden field → pretend success, send nothing.
  if (clean(body?.hp)) return res.status(200).json({ ok: true })

  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim()
  if (limited(ip)) return res.status(429).json({ ok: false, error: 'rate_limited' })

  const parsed = parse(body)
  if (parsed.errors) return res.status(422).json({ ok: false, error: 'invalid', fields: parsed.errors })

  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.error('contact: RESEND_API_KEY is not set in the Vercel environment variables')
    return res.status(500).json({ ok: false, error: 'not_configured' })
  }

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(buildEmail(parsed.values, process.env)),
      signal: AbortSignal.timeout(10000),
    })
    if (!r.ok) {
      const info = await r.json().catch(() => ({}))
      console.error('contact: Resend rejected the email', r.status, info?.name, info?.message) // no personal data logged
      return res.status(502).json({ ok: false, error: 'send_failed' })
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('contact: could not reach Resend', err?.name, err?.message)
    return res.status(502).json({ ok: false, error: 'send_failed' })
  }
}
