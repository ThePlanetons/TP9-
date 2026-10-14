// import { lazy, Suspense } from 'react'
// import { useMouseParallax } from '../../hooks/useMouseParallax'

// const PlanetScene = lazy(() => import('../3d/PlanetScene')) // 3D code loads on demand

// export default function Hero() {
//   useMouseParallax()
//   return (
//     <div className="absolute inset-0 z-0">
//       <Suspense fallback={null}><PlanetScene /></Suspense>
//     </div>
//   )
// }

import { forwardRef, lazy, Suspense } from 'react'
import { useMouseParallax } from '../../hooks/useMouseParallax'

const PlanetScene = lazy(() => import('../3d/PlanetScene')) // 3D code loads on demand

const Hero = forwardRef<HTMLDivElement>((_, ref) => {
  useMouseParallax()
  return (
    <div ref={ref} role="img" aria-label="A ringed orange planet surrounded by website, app and online-store mockups" className="absolute inset-0 z-0">
      <Suspense fallback={null}><PlanetScene /></Suspense>
    </div>
  )
})
export default Hero

