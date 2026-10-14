import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import logo from '../../assets/TP9_logo.png'
import { Link, currentPath } from '../../lib/router'
import { trackEvent } from '../../lib/analytics'

const LINKS = [
  { label: 'WORK', href: '/#work' },
  { label: 'SERVICES', href: '/#services' },
  { label: 'ABOUT', href: '/#about' },
]
const CTA = { label: 'START A PROJECT', href: '/#contact' }

export default function Navbar() {
  const [on, setOn] = useState(false)
  const [showNav, setShowNav] = useState(true)
  const [open, setOpen] = useState(false)
  const lastScrollY = useRef(0)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLink = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const f = () => {
      const y = window.scrollY
      setOn(y > window.innerHeight * 0.5)
      if (y <= 10) setShowNav(true)
      else if (y > lastScrollY.current) setShowNav(false) // scrolling down → hide
      else setShowNav(true) // scrolling up → show
      lastScrollY.current = y
    }
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])

  // Mobile menu: lock page scroll, close on Escape, move focus in and back out.
  useEffect(() => {
    if (!open) return
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    firstLink.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); toggleRef.current?.focus() } }
    window.addEventListener('keydown', onKey)
    return () => { document.documentElement.style.overflow = prev; window.removeEventListener('keydown', onKey) }
  }, [open])

  const goTop = (e: React.MouseEvent) => {
    if (currentPath() === '/') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  }
  const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black'

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 text-[11px] tracking-[0.25em] transition-all duration-500 md:px-10 ${
          on || open ? 'bg-white/90 backdrop-blur' : ''
        } ${showNav || open ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <Link href="/" onClick={goTop} aria-label="THE PLANET 9 — home" className={`flex h-10 items-center ${focusRing}`}>
          <img src={logo} alt="THE PLANET 9" width={360} height={140} decoding="async" className="h-9 w-auto" />
        </Link>

        {/* desktop */}
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link key={l.label} href={l.href} className={`py-2 transition-colors hover:text-brand-deep ${focusRing}`}>{l.label}</Link>
          ))}
          <Link
            href={CTA.href}
            onClick={() => trackEvent('cta_click', { location: 'navbar' })}
            className={`rounded-full bg-brand-deep px-6 py-3 font-bold text-white transition hover:bg-black ${focusRing}`}
          >
            {CTA.label}
          </Link>
        </nav>

        {/* mobile */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className={`grid h-11 w-11 place-items-center rounded-full border border-black/30 md:hidden ${focusRing}`}
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex-col justify-center bg-white px-8 pb-10 pt-24 md:hidden ${open ? 'flex' : 'hidden'}`}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-2">
          {LINKS.map((l, i) => (
            <Link
              key={l.label}
              ref={i === 0 ? firstLink : undefined}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`border-b border-black/15 py-5 font-display text-4xl font-black tracking-tight ${focusRing}`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={CTA.href}
            onClick={() => { setOpen(false); trackEvent('cta_click', { location: 'mobile_menu' }) }}
            className={`mt-8 rounded-full bg-brand-deep px-8 py-5 text-center text-xs font-bold tracking-[0.18em] text-white ${focusRing}`}
          >
            {CTA.label}
          </Link>
        </nav>
      </div>
    </>
  )
}
