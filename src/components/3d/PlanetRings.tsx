import { DoubleSide } from 'three'

// [inner, outer, opacity, color] — three translucent bands with gaps, like a real ring system.
const BANDS: [number, number, number, string][] = [
  [2.7, 3.15, 0.55, '#F64618'],
  [3.25, 4.1, 0.5, '#FFC9B8'],
  [4.2, 4.55, 0.6, '#F64618'],
]

export default function PlanetRings({ segments }: { segments: number }) {
  return (
    <group>
      {BANDS.map(([a, b, o, c], i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[a, b, segments * 2]} />
          <meshBasicMaterial color={c} transparent opacity={o} side={DoubleSide} depthWrite={false} />
        </mesh>
      ))}
      {/* tiny moon so the ring rotation reads */}
      <mesh position={[4.85, 0, 0]}>
        <sphereGeometry args={[0.11, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  )
}
