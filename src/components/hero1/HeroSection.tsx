import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import PlanetVisual from './PlanetVisual'
import FloatingDevice, { DeviceKind } from './FloatingDevice'
import WhatWeBuild from './WhatWeBuild'
import './hero.css'

function useHeroScroll(root: { current: HTMLElement | null }) {
  useEffect(() => {
    const section = root.current
    if (!section) return

    const update = () => {
      const scrollDistance = section.offsetHeight - window.innerHeight
      const progress = scrollDistance > 0
        ? Math.max(0, Math.min(1, (window.scrollY - section.offsetTop) / scrollDistance))
        : 0

      section.querySelectorAll<HTMLElement>('[data-copy]').forEach((element) => {
        element.style.opacity = String(1 - progress * 0.7)
        element.style.transform = `translateY(${-progress * 48}px)`
      })

      const hint = section.querySelector<HTMLElement>('[data-hint]')
      if (hint) hint.style.opacity = String(Math.max(0, 1 - progress * 2))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [root])
}

type Dev = { id: string; kind: DeviceKind; label: string; layer: 'front' | 'back'; rot: number; delay: number; box: { left: string; top: string; width: string }; className?: string }

const DEVICES: Dev[] = [
  { id: 'laptop', kind: 'laptop', label: 'Websites', layer: 'front', rot: -3, delay: 0, box: { left: '1%', top: '16%', width: '42%' } },
  { id: 'phone', kind: 'phone', label: 'Web Apps', layer: 'front', rot: 8, delay: 1.2, box: { left: '67%', top: '3%', width: '15%' } },
  { id: 'code', kind: 'code', label: 'Development', layer: 'front', rot: -9, delay: 2.1, box: { left: '3%', top: '63%', width: '33%' }, className: 'hidden md:block' },
  { id: 'shop', kind: 'shop', label: 'E-commerce', layer: 'front', rot: -7, delay: 0.6, box: { left: '55%', top: '66%', width: '38%' } },
  { id: 'chart', kind: 'chart', label: 'UI/UX', layer: 'back', rot: 6, delay: 1.7, box: { left: '82%', top: '38%', width: '19%' }, className: 'hidden lg:block' },
]

const btn = 'inline-flex items-center rounded-full px-7 py-4 text-xs font-bold tracking-[0.18em] transition duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F64618]'

export default function HeroSection() {
  const root = useRef<HTMLElement>(null)
  useHeroScroll(root)
  const render = (layer: 'front' | 'back') =>
    DEVICES.filter((d) => d.layer === layer).map((d) => <FloatingDevice key={d.id} {...d} />)

  return (
    <section ref={root} id="top" className="relative bg-[#FAF3EB] lg:h-[300vh]">
      <div data-stick className="relative overflow-hidden bg-[#FAF3EB] px-6 pb-10 pt-28 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:px-16 lg:pb-6 lg:pt-24">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-6">
          <div className="relative z-30">
            <p data-copy className="text-xs font-medium tracking-[0.22em] text-[#F64618] md:text-sm">WEB DEVELOPMENT &amp; DIGITAL SOLUTIONS</p>
            <h1 data-copy className="mt-5 font-display text-[clamp(2.4rem,10vw,4rem)] font-black leading-[0.92] tracking-[-0.02em] lg:whitespace-nowrap lg:text-[3.6vw]">
              WE BUILD<br /><span className="text-[#F64618]">DIGITAL</span> WORLDS.
            </h1>
            <p data-copy className="mt-6 max-w-md text-lg leading-relaxed text-black/75">
              Websites &amp; digital experiences designed to make your brand impossible to ignore.
            </p>
            <div data-copy className="mt-9 flex flex-wrap gap-4">
              <a href="#contact" className={`${btn} group gap-3 bg-[#F64618] text-white shadow-[0_10px_30px_-10px_rgba(246,70,24,.7)] hover:shadow-[0_16px_36px_-10px_rgba(246,70,24,.85)]`}>
                START A PROJECT <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#work" className={`${btn} border border-black/80 hover:bg-black hover:text-white`}>EXPLORE OUR WORK</a>
            </div>
          </div>

          <div className="flex justify-center">
            <div data-stage className="relative aspect-square w-full max-w-[560px] [container-type:inline-size] lg:w-[min(58vh,42vw)] lg:max-w-none">
              <div data-mover className="absolute inset-0">
                {render('back')}
                <PlanetVisual />
                {render('front')}
              </div>
            </div>
          </div>
        </div>

        <p data-hint className="hidden flex-col items-center gap-1 py-2 text-[10px] tracking-[0.3em] text-black/60 lg:flex">
          SCROLL TO EXPLORE <ArrowDown size={14} className="animate-bounce" />
        </p>
        <WhatWeBuild />
      </div>
    </section>
  )
}
