// import { useState } from 'react'
// import { Canvas } from '@react-three/fiber'
// import { PerformanceMonitor } from '@react-three/drei'
// import Saturn from './Saturn'
// import CameraRig from './CameraRig'
// import { isMobile } from '../../store'

// function PlanetLighting() {
//   return (
//     <>
//       <hemisphereLight args={['#ffffff', '#F64618', 0.7]} />
//       <directionalLight position={[5, 4, 6]} intensity={2.4} />
//         <directionalLight position={[-6, -2, -3]} intensity={0.5} color="#F64618" />
//     </>
//   )
// }

// export default function PlanetScene() {
//   const mobile = isMobile()
//   const [maxDpr, setMaxDpr] = useState(mobile ? 1.25 : 1.5)
//   return (
//     <Canvas
//       dpr={[1, maxDpr]}
//       camera={{ position: [0, 0, 9], fov: 35, near: 0.1, far: 50 }}
//       gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
//     >
//       <PerformanceMonitor onDecline={() => setMaxDpr(1)} />
//       <PlanetLighting />
//       <Saturn mobile={mobile} />
//       <CameraRig />
//     </Canvas>
//   )
// }
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import Saturn from './Saturn'
import CameraRig from './CameraRig'
import { isMobile } from '../../store'

function PlanetLighting() {
  return (
    <>
      <hemisphereLight args={['#ffffff', '#F64618', 0.7]} />
      <directionalLight position={[5, 4, 6]} intensity={2.4} />
      <directionalLight position={[-6, -2, -3]} intensity={0.5} color="#F64618" />
    </>
  )
}

/** Lowers the render resolution when the device can't hold ~40 fps (replaces drei's PerformanceMonitor, which
 *  pulled a very large library into the bundle for one callback). */
function FpsGuard({ onDecline }: { onDecline: () => void }) {
  const s = useRef({ start: 0, n: 0, bad: 0, born: performance.now() })
  useFrame(() => {
    const now = performance.now(), t = s.current
    if (now - t.born < 1500) return // ignore shader-compile warm-up
    if (!t.start) { t.start = now; return }
    t.n++
    if (now - t.start >= 2000) {
      const fps = (t.n * 1000) / (now - t.start)
      t.bad = fps < 40 ? t.bad + 1 : 0
      t.n = 0
      t.start = now
      if (t.bad >= 2) onDecline()
    }
  })
  return null
}

export default function PlanetScene() {
  const mobile = isMobile()
  const [maxDpr, setMaxDpr] = useState(mobile ? 2 : 1.5)
  const [onScreen, setOnScreen] = useState(true)
  const holder = useRef<HTMLDivElement>(null)

  // Stop rendering once the hero has scrolled out of view (saves battery and keeps the rest of the page smooth).
  useEffect(() => {
    const el = holder.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { rootMargin: '200px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={holder} className="h-full w-full">
      <Canvas
        dpr={[1, maxDpr]}
        frameloop={onScreen ? 'always' : 'never'}
        camera={{ position: [0, 0, 9], fov: 35, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <FpsGuard onDecline={() => setMaxDpr(1)} />
        <PlanetLighting />
        <Saturn mobile={mobile} />
        <CameraRig />
      </Canvas>
    </div>
  )
}
