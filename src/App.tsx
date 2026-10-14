import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from './hooks/useScrollAnimation'
import Navbar from './components/navigation/Navbar'
import Footer from './components/sections/Footer'
import CookieBanner from './components/ui/CookieBanner'
import Home from './pages/Home'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'
import { usePath } from './lib/router'
import { trackPageView } from './lib/analytics'

const PAGES: Record<string, () => JSX.Element> = { '/': Home, '/privacy': Privacy, '/terms': Terms }

export default function App() {
  useLenis()
  const path = usePath()
  const Page = PAGES[path] ?? NotFound

  useEffect(() => { trackPageView(path) }, [path])

  // Deep links like /#contact (also from other pages): jump to the section once the page has rendered.
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return
    const t = window.setTimeout(() => {
      ScrollTrigger.refresh()
      document.getElementById(decodeURIComponent(id))?.scrollIntoView()
    }, 80)
    return () => window.clearTimeout(t)
  }, [path])

  return (
    <>
      <a href="#main" className="sr-only z-[80] rounded-full bg-black px-5 py-3 text-xs font-bold tracking-widest text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        SKIP TO CONTENT
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Page />
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
