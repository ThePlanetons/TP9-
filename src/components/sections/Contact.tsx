import { FormEvent, useEffect, useId, useRef, useState } from 'react'
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react'
import { SITE } from '../../config/site'
import { Link } from '../../lib/router'
import { trackEvent } from '../../lib/analytics'
import {
  BUDGETS, LIMITS, SERVICE_OPTIONS, SOURCES, TIMELINES, clean, cooldownLeft, emptyValues, looksLikeBot, markSent, sendEnquiry, validate,
  type ContactErrors, type ContactValues,
} from '../../lib/contact'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const input =
  'w-full rounded-xl border border-black/55 bg-white px-4 py-3 text-base text-black placeholder:text-black/55 transition focus:border-black focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-60'
const invalid = 'border-red-700 focus:border-red-700 focus:ring-red-700'

function Field({ id, label, hint, error, required, children }: { id: string; label: string; hint?: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-black">
        {label} {required ? <span aria-hidden className="text-red-700">*</span> : <span className="font-normal text-black/60">(optional)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-xs text-black/65">{hint}</p>}
      {error && <p id={`${id}-err`} role="alert" className="mt-1.5 text-sm font-medium text-red-700">{error}</p>}
    </div>
  )
}

export default function Contact() {
  const uid = useId()
  const [v, setV] = useState<ContactValues>(emptyValues)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [failReason, setFailReason] = useState('')
  const openedAt = useRef(Date.now())
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  const id = (k: string) => `${uid}-${k}`

  useEffect(() => { openedAt.current = Date.now() }, [])
  useEffect(() => { if (status === 'sent') successRef.current?.focus() }, [status])

  const set = <K extends keyof ContactValues>(k: K, val: ContactValues[K]) => {
    setV((p) => ({ ...p, [k]: val }))
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined })) // clear an error as soon as the visitor fixes it
  }
  const toggleService = (s: string) => set('services', v.services.includes(s) ? v.services.filter((x) => x !== s) : [...v.services, s])

  const aria = (k: keyof ContactValues, hint = false) => ({
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `${id(k)}-err` : hint ? `${id(k)}-hint` : undefined,
  })

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (status === 'sending') return
    const errs = validate(v)
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) {
      const el = first === 'services' ? formRef.current?.querySelector<HTMLElement>('[data-first-service]') : formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id(first))}`)
      el?.focus()
      return
    }
    // 1) Honeypot filled → a bot. Show a convincing "sent" screen; nothing is delivered.
    if (clean(v.hp)) { setStatus('sent'); return }
    // 2) Cooldown: a person re-sending straight away gets a clear explanation.
    const wait = cooldownLeft()
    if (wait > 0) {
      setFailReason(`You've just sent an enquiry. Please wait ${Math.ceil(wait / 1000)} seconds before sending another.`)
      setStatus('error')
      return
    }
    // 3) Time trap: a detailed form can't be completed in a couple of seconds.
    if (looksLikeBot(v, openedAt.current)) {
      setErrors({ message: 'That was quick! Please re-read your message and press send again.' })
      openedAt.current = Date.now() - 3000
      return
    }
    setStatus('sending')
    const res = await sendEnquiry(v)
    if (res.ok) {
      markSent()
      trackEvent('generate_lead', { services_selected: v.services.length })
      setStatus('sent')
    } else {
      setFailReason(res.reason === 'timeout' ? 'The request timed out.' : res.reason === 'network' ? 'We couldn’t reach the server — check your connection.' : 'The message couldn’t be delivered.')
      setStatus('error')
    }
  }

  const reset = () => { setV(emptyValues); setErrors({}); setStatus('idle'); openedAt.current = Date.now() }
  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent('Project enquiry')}&body=${encodeURIComponent(clean(v.message).slice(0, 1500))}`
  const sending = status === 'sending'

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-white px-4 py-20 sm:px-6 md:py-28 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] bg-brand p-6 sm:p-10 lg:grid-cols-[5fr_7fr] lg:gap-14 lg:rounded-[2.5rem] lg:p-14">
        {/* ───────── pitch ───────── */}
        <div className="text-black">
          <p className="text-xs font-bold tracking-[0.22em]">START A PROJECT</p>
          <h2 id="contact-heading" className="mt-4 font-display text-[clamp(2.25rem,6vw,4.75rem)] font-black uppercase leading-[0.95] tracking-tight">
            Let&rsquo;s build something impossible.
          </h2>
          <p className="mt-6 max-w-md text-base font-medium leading-relaxed sm:text-lg">
            Tell us about your idea. The more detail you share, the better our first reply will be.
          </p>
          <ol className="mt-8 space-y-3 text-sm font-medium sm:text-base">
            {['Send us the details of your project.', 'We review it and reply by email.', 'We scope, propose and start building.'].map((t, i) => (
              <li key={t} className="flex items-start gap-3">
                <span aria-hidden className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-black text-xs font-bold text-white">{i + 1}</span>
                <span className="pt-0.5">{t}</span>
              </li>
            ))}
          </ol>
          <a href={`mailto:${SITE.email}`} className="mt-8 inline-flex items-center gap-2 break-all text-base font-bold underline decoration-2 underline-offset-4 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
            <Mail size={18} aria-hidden /> {SITE.email}
          </a>
        </div>

        {/* ───────── form ───────── */}
        <div className="rounded-3xl bg-white p-5 text-black shadow-[0_30px_60px_-30px_rgba(0,0,0,.45)] sm:p-8">
          {status === 'sent' ? (
            <div ref={successRef} tabIndex={-1} role="status" className="flex min-h-[26rem] flex-col items-center justify-center text-center outline-none">
              <CheckCircle2 size={56} className="text-green-700" aria-hidden />
              <h3 className="mt-5 font-display text-3xl font-black uppercase">Message sent</h3>
              <p className="mt-3 max-w-sm text-base text-black/75">
                Thank you{clean(v.name) ? `, ${clean(v.name).split(' ')[0]}` : ''}! We&rsquo;ve received your enquiry and will reply to your email.
              </p>
              <button type="button" onClick={reset} className="mt-8 rounded-full border border-black px-6 py-3 text-xs font-bold tracking-[0.18em] transition hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
                SEND ANOTHER
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={`${id('note')}`} className="space-y-5" autoComplete="on">
              <p id={id('note')} className="text-xs text-black/65"><span aria-hidden className="text-red-700">*</span> Required fields</p>

              {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor={id('hp')}>Leave this field empty</label>
                <input id={id('hp')} name="website_url_confirm" tabIndex={-1} autoComplete="off" value={v.hp} onChange={(e) => set('hp', e.target.value)} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id={id('name')} label="Full name" required error={errors.name}>
                  <input id={id('name')} name="name" type="text" autoComplete="name" maxLength={LIMITS.name} value={v.name} onChange={(e) => set('name', e.target.value)} className={`${input} ${errors.name ? invalid : ''}`} {...aria('name')} />
                </Field>
                <Field id={id('email')} label="Email" required error={errors.email}>
                  <input id={id('email')} name="email" type="email" inputMode="email" autoComplete="email" maxLength={LIMITS.email} value={v.email} onChange={(e) => set('email', e.target.value)} className={`${input} ${errors.email ? invalid : ''}`} {...aria('email')} />
                </Field>
                <Field id={id('phone')} label="Phone / WhatsApp" error={errors.phone}>
                  <input id={id('phone')} name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={LIMITS.phone} value={v.phone} onChange={(e) => set('phone', e.target.value)} className={`${input} ${errors.phone ? invalid : ''}`} {...aria('phone')} />
                </Field>
                <Field id={id('company')} label="Company / brand" error={errors.company}>
                  <input id={id('company')} name="company" type="text" autoComplete="organization" maxLength={LIMITS.company} value={v.company} onChange={(e) => set('company', e.target.value)} className={`${input} ${errors.company ? invalid : ''}`} {...aria('company')} />
                </Field>
              </div>

              <Field id={id('website')} label="Current website" hint="If you already have one, so we can take a look." error={errors.website}>
                <input id={id('website')} name="website" type="text" inputMode="url" autoComplete="url" maxLength={LIMITS.website} placeholder="yourbrand.com" value={v.website} onChange={(e) => set('website', e.target.value)} className={`${input} ${errors.website ? invalid : ''}`} {...aria('website', true)} />
              </Field>

              <fieldset aria-describedby={errors.services ? `${id('services')}-err` : undefined}>
                <legend className="mb-2 text-sm font-bold">What do you need? <span aria-hidden className="text-red-700">*</span></legend>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_OPTIONS.map((s, i) => (
                    <label key={s} className="cursor-pointer">
                      <input type="checkbox" className="peer sr-only" checked={v.services.includes(s)} onChange={() => toggleService(s)} {...(i === 0 ? { 'data-first-service': true } : {})} />
                      <span className="inline-block rounded-full border border-black/55 px-4 py-2.5 text-sm font-medium transition hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-black peer-focus-visible:ring-offset-2">
                        {s}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.services && <p id={`${id('services')}-err`} role="alert" className="mt-1.5 text-sm font-medium text-red-700">{errors.services}</p>}
              </fieldset>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id={id('budget')} label="Project scope" hint="A rough guide only — it helps us prepare.">
                  <select id={id('budget')} name="budget" value={v.budget} onChange={(e) => set('budget', e.target.value)} className={input} aria-describedby={`${id('budget')}-hint`}>
                    <option value="">Select…</option>
                    {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </Field>
                <Field id={id('timeline')} label="Timeline">
                  <select id={id('timeline')} name="timeline" value={v.timeline} onChange={(e) => set('timeline', e.target.value)} className={input}>
                    <option value="">Select…</option>
                    {TIMELINES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Field>
              </div>

              <Field id={id('message')} label="Project details" required error={errors.message} hint={undefined}>
                <textarea id={id('message')} name="message" rows={5} maxLength={LIMITS.message} value={v.message} onChange={(e) => set('message', e.target.value)} placeholder="What are you building, who is it for, and what does success look like?" className={`${input} resize-y ${errors.message ? invalid : ''}`} {...aria('message')} />
                <p className="mt-1.5 text-right text-xs tabular-nums text-black/65" aria-live="off">{clean(v.message).length} / {LIMITS.message}</p>
              </Field>

              <Field id={id('source')} label="How did you hear about us?">
                <select id={id('source')} name="source" value={v.source} onChange={(e) => set('source', e.target.value)} className={input}>
                  <option value="">Select…</option>
                  {SOURCES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>

              <div>
                <label className="flex cursor-pointer items-start gap-3 text-sm">
                  <input id={id('consent')} type="checkbox" checked={v.consent} onChange={(e) => set('consent', e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-black" aria-invalid={errors.consent ? true : undefined} aria-describedby={errors.consent ? `${id('consent')}-err` : undefined} />
                  <span>
                    I agree to the <Link href="/privacy" className="font-bold underline underline-offset-2 hover:no-underline">Privacy Policy</Link> and to being contacted about this enquiry. <span aria-hidden className="text-red-700">*</span>
                  </span>
                </label>
                {errors.consent && <p id={`${id('consent')}-err`} role="alert" className="mt-1.5 text-sm font-medium text-red-700">{errors.consent}</p>}
              </div>

              {status === 'error' && (
                <div role="alert" className="rounded-xl border border-red-700 bg-red-50 p-4 text-sm text-red-900">
                  <p className="font-bold">{failReason}</p>
                  <p className="mt-1">Your details are still here — try again, or <a className="font-bold underline" href={mailto}>email us directly</a> at {SITE.email}.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                onClick={() => trackEvent('cta_click', { location: 'contact_form' })}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand-deep px-8 py-4 text-xs font-bold tracking-[0.18em] text-white shadow-[0_10px_30px_-10px_rgba(204,54,13,.7)] transition hover:-translate-y-0.5 hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {sending ? 'SENDING…' : 'SEND MY ENQUIRY'}
                {!sending && <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />}
              </button>
              <p className="sr-only" role="status" aria-live="polite">{sending ? 'Sending your enquiry' : ''}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
