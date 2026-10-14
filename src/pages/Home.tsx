import { SITE } from '../config/site'
import { useSEO } from '../lib/seo'
import { useReveal } from '../hooks/useScrollAnimation'
import PlanetTransition from '../components/transitions/PlanetTransition'
import Intro from '../components/sections/Intro'
import Services from '../components/sections/Services'
import Work from '../components/sections/Work'
import About from '../components/sections/About'
import Contact from '../components/sections/Contact'

export default function Home() {
  useSEO({ title: SITE.title, description: SITE.description, path: '/' })
  useReveal()
  return (
    <>
      <PlanetTransition />
      <Intro />
      <Services />
      <Work />
      <About />
      <Contact />
    </>
  )
}
