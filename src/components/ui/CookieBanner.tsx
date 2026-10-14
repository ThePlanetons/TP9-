import { useEffect, useRef, useState } from 'react'
import { Link } from '../../lib/router'
import { OPEN_SETTINGS, getConsent, setConsent } from '../../lib/consent'
import { syncAnalytics } from '../../lib/analytics'

/**
 * Consent banner. Nothing non-essential runs (no analytics script, no analytics cookies) until the visitor accepts,
 * and "Essential only" is as easy to click as "Accept". Re-openable from the footer ("Cookie settings").
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const acceptRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const c = getConsent()
    syncAnalytics(c)
    if (!c) setVisible(true)
    const reopen = () => { setVisible(true); setTimeout(() => acceptRef.current?.focus(), 50) }
    window.addEventListener(OPEN_SETTINGS, reopen)
    return () => window.removeEventListener(OPEN_SETTINGS, reopen)
  }, [])

  const choose = (analytics: boolean) => {
    const c = setConsent(analytics)
    syncAnalytics(c)
    setVisible(false)
  }
  if (!visible) return null

  const btn = 'rounded-full px-5 py-3 text-xs font-bold tracking-[0.14em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
  return (
    <section
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-lg rounded-2xl border border-black/20 bg-white p-5 text-black shadow-2xl sm:left-6 sm:right-auto sm:mx-0"
    >
      <p className="text-sm leading-relaxed">
        We use essential storage to run this site and, <strong>only if you agree</strong>, analytics cookies to learn how it&rsquo;s used.
        Details in our <Link href="/privacy#cookies" className="font-bold underline underline-offset-2 hover:no-underline">Privacy Policy</Link>.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button ref={acceptRef} type="button" onClick={() => choose(true)} className={`${btn} bg-black text-white hover:bg-brand-deep`}>ACCEPT ANALYTICS</button>
        <button type="button" onClick={() => choose(false)} className={`${btn} border border-black hover:bg-black hover:text-white`}>ESSENTIAL ONLY</button>
      </div>
    </section>
  )
}
