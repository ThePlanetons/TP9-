type Props = { id: number; size: number; rot: number; tilt: number; opacity: number; layer: 'back' | 'front'; className?: string }

/**
 * One orbit, drawn twice (back half / front half) so the planet can sit between them.
 * Structure: positioned box -> [data-ring] in-plane rotation -> [data-tilt] 3D tilt -> clipped SVG.
 * GSAP animates data-ring (rotation), data-tilt (rotationX) and data-arc (travelling highlight).
 */
export default function OrbitRing({ id, size, rot, tilt, opacity, layer, className = '' }: Props) {
  const front = layer === 'front'
  return (
    <div
      className={`pointer-events-none absolute aspect-square scale-[.74] md:scale-100 ${className}`}
      style={{ width: `${size}%`, left: `${(100 - size) / 2}%`, top: `${(100 - size) / 2}%`, zIndex: front ? 3 : 1 }}
    >
      <div data-ring={id} data-rot={rot} className="h-full w-full">
        <div data-tilt={tilt} className="h-full w-full">
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full overflow-visible"
            style={{ clipPath: front ? 'inset(50% 0 0 0)' : 'inset(0 0 50% 0)', filter: 'drop-shadow(0 0 5px rgba(246,70,24,.55))' }}
          >
            <circle cx="50" cy="50" r="49" fill="none" stroke="#F64618" strokeOpacity={opacity * 0.45} strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <circle
              data-arc={id} cx="50" cy="50" r="49" fill="none" stroke="#F64618" strokeOpacity={opacity}
              strokeWidth="2.4" strokeLinecap="round" pathLength={100} strokeDasharray="16 84" vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
