// import { useRef } from 'react'
// import Hero from '../hero/Hero'
// import HeroOverlay from '../hero/HeroOverlay'
// import CreativeOverlay from './CreativeOverlay'
// import { useScrollAnimation } from '../../hooks/useScrollAnimation'

// export default function PlanetTransition() {
//   const stage = useRef<HTMLElement>(null)
//   const hero = useRef<HTMLDivElement>(null)
//   const logo = useRef<HTMLHeadingElement>(null)
//   const overlay = useRef<HTMLDivElement>(null)
//   useScrollAnimation({ stage, hero, logo, overlay })

//   return (
//     <section ref={stage} className="relative h-[650vh]">
//       <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
//         <Hero />
//         <CreativeOverlay ref={overlay} />
//         <h2
//           ref={logo}
//           className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center whitespace-nowrap font-display text-[9vw] font-black leading-none text-black opacity-0 will-change-transform"
//         >
//           THE PLANET 9
//         </h2>
//         <HeroOverlay ref={hero} />
//       </div>
//     </section>
//   )
// }
// import { useRef } from 'react'
// import Hero from '../hero/Hero'
// import HeroOverlay from '../hero/HeroOverlay'
// import CreativeOverlay from './CreativeOverlay'
// import { useScrollAnimation } from '../../hooks/useScrollAnimation'

// export default function PlanetTransition() {
//   const stage = useRef<HTMLElement>(null)
//   const hero = useRef<HTMLDivElement>(null)
//   const logo = useRef<HTMLHeadingElement>(null)
//   const overlay = useRef<HTMLDivElement>(null)
//   const tag = useRef<HTMLDivElement>(null)
//   useScrollAnimation({ stage, hero, logo, overlay, tag })

//   return (
//     <section ref={stage} className="relative h-[800vh]">
//       <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
//         <Hero />
//         <CreativeOverlay ref={overlay} />
//         <div ref={tag} className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 text-center font-display text-[8vw] font-black leading-[0.95] tracking-[-0.02em] text-white md:text-[6.2vw]">
//           <p>
//             {['TAKE YOUR BRAND', 'TO ANOTHER', 'WORLD'].map((l) => (
//               <span key={l} data-line className="block opacity-0">{l}</span>
//             ))}
//           </p>
//         </div>
//         <h2
//           ref={logo}
//           className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center whitespace-nowrap font-display text-[9vw] font-black leading-none text-black opacity-0 will-change-transform"
//         >
//           THE PLANET 9
//         </h2>
//         <HeroOverlay ref={hero} />
//       </div>
//     </section>
//   )
// }
import { useRef } from 'react'
import Hero from '../hero/Hero'
import HeroOverlay from '../hero/HeroOverlay'
import CreativeOverlay from './CreativeOverlay'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

// The grid / orbit lines / floating labels that appear behind "THE PLANET 9". Set to false to remove them entirely.
const SHOW_MOTION_LAYER = true

export default function PlanetTransition() {
  const stage = useRef<HTMLElement>(null)
  const hero = useRef<HTMLDivElement>(null)
  const logo = useRef<HTMLHeadingElement>(null)
  const overlay = useRef<HTMLDivElement>(null)
  const tag = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLDivElement>(null)
  const p = useRef<HTMLSpanElement>(null)
  const nine = useRef<HTMLSpanElement>(null)
  useScrollAnimation({ stage, hero, logo, overlay, tag, canvas, p, nine })

  return (
    <section ref={stage} className="relative h-[800vh]">
      {/* svh = visible height on phones (ignores the collapsing browser bar) */}
      <div id="hero-stage" className="sticky top-0 h-[100svh] w-full overflow-hidden bg-white">
        <Hero ref={canvas} />
        {SHOW_MOTION_LAYER && <CreativeOverlay ref={overlay} />}
        <div ref={tag} className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-5 text-center font-display text-[7.2vw] font-black leading-[0.95] tracking-[-0.02em] text-white sm:text-[6.6vw] md:text-[6.2vw]">
          <p>
            {['TAKE YOUR BRAND', 'TO ANOTHER', 'WORLD'].map((l) => (
              <span key={l} data-line className="block opacity-0">{l}</span>
            ))}
          </p>
        </div>
        {/* Portrait: "THE" over "PLANET 9". Landscape: one line. The 9 always sits on the same line as the P it jumps from. */}
        <h2
          ref={logo}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center font-display text-[17vw] font-black leading-[0.88] tracking-[-0.02em] text-black opacity-0 will-change-transform md:flex-row md:gap-[0.28em] md:text-[9vw] md:leading-none"
        >
          <span aria-hidden className="block">THE</span>
          <span aria-hidden className="block whitespace-nowrap">
            <span ref={p} className="inline-block">P</span>LANET{' '}
            <span ref={nine} className="relative inline-block will-change-transform">9</span>
          </span>
        </h2>
        <HeroOverlay ref={hero} />
      </div>
    </section>
  )
}
