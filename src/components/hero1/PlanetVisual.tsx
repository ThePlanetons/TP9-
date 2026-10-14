import OrbitRing from './OrbitRing'

// size = % of stage, rot = in-plane angle, tilt = rotateX(deg). Rings 2 & 3 are hidden on phones.
const RINGS = [
  { id: 0, size: 150, rot: -4, tilt: 74, opacity: 0.9, className: '' },
  { id: 1, size: 122, rot: -25, tilt: 70, opacity: 0.55, className: 'hidden md:block' },
  { id: 2, size: 122, rot: 25, tilt: 70, opacity: 0.45, className: 'hidden md:block' },
  { id: 3, size: 90, rot: 0, tilt: 66, opacity: 0.7, className: '' },
]

const noise = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.012 .09' numOctaves='4' seed='4'/><feColorMatrix values='0 0 0 0 .45 0 0 0 0 .1 0 0 0 0 0 0 0 0 1.2 -.2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`,
)

export default function PlanetVisual() {
  return (
    <div data-core className="absolute inset-0 z-10">
      {RINGS.map((r) => <OrbitRing key={`b${r.id}`} {...r} layer="back" />)}
      <div
        className="absolute inset-[17%] z-[2] overflow-hidden rounded-full"
        style={{
          background: 'radial-gradient(circle at 66% 28%, #FFC58A 0, #FF8A3D 9%, #F64618 38%, #C93208 70%, #7E1E04 100%)',
          boxShadow: '0 0 90px 12px rgba(246,70,24,.32), inset -2.6cqw -3.4cqw 7cqw rgba(90,16,0,.55)',
        }}
      >
        <div className="absolute inset-0 opacity-50" style={{ backgroundImage: `url("data:image/svg+xml,${noise}")`, backgroundSize: '100% 100%' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 68% 26%, rgba(255,255,255,.75), rgba(255,255,255,0) 9%)' }} />
      </div>
      {RINGS.map((r) => <OrbitRing key={`f${r.id}`} {...r} layer="front" />)}
    </div>
  )
}
