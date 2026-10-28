// import { useMemo, useRef } from 'react'
// import { useFrame, useThree } from '@react-three/fiber'
// import { BackSide, CanvasTexture, Group, SRGBColorSpace, } from 'three'
// import PlanetRings from './PlanetRings'
// import { sceneState } from '../../store'


// const ORANGE = '#F64618'

// const glowVert = `varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`
// const glowFrag = `varying vec3 vN; void main(){ float i = pow(max(0.0, -vN.z), 2.0) * 2.0; gl_FragColor = vec4(0.965, 0.275, 0.094, clamp(i, 0.0, 1.0)); }`

// export default function Saturn({ mobile }: { mobile: boolean }) {
//   const group = useRef<Group>(null!)
//   const body = useRef<Group>(null!)
//   const rings = useRef<Group>(null!)
//   const size = useThree((s) => s.size)
//   const seg = mobile ? 32 : 64

//   // Soft horizontal cloud bands, tinted around #F64618.
//   const bands = useMemo(() => {
//     const c = document.createElement('canvas')
//     c.width = 4; c.height = 256
//     const g = c.getContext('2d')!
//     for (let i = 0; i < 256; i++) {
//       const l = Math.sin(i * 0.35) * 0.5 + Math.sin(i * 0.11) * 0.5
//       g.fillStyle = `hsl(12 ${90 + l * 6}% ${53 + l * 4}%)`
//       g.fillRect(0, i, 4, 1)
//     }
//     const t = new CanvasTexture(c)
//     t.colorSpace = SRGBColorSpace
//     return t
//   }, [])

//   useFrame((state, dt) => {
//     const aspect = size.width / size.height
//     const s0 = Math.min(1, Math.max(0.32, (5.67 * aspect) / 9.6)) // responsive scale
//     const wide = aspect >= 1.1
//     const k = (sceneState as typeof sceneState & { k?: number }).k ?? 0 // 1 = split hero (planet right / below text), 0 = centred
//     const s = s0 * (1 - (wide ? 0.4 : 0.15) * k)
//     const x = wide ? k * 0.21 * 5.67 * aspect : 0
//     const y = 0.7 * s + Math.sin(state.clock.elapsedTime * 0.6) * 0.08 - (wide ? 0 : k * 1.0)
//     group.current.scale.setScalar(s)
//     group.current.position.set(x, y, sceneState.z)
//     group.current.rotation.y = sceneState.spin
//     group.current.visible = sceneState.z < 10.4
//     body.current.rotation.y += dt * 0.05
//     rings.current.rotation.y += dt * 0.025
//   })

//   return (
//     <group ref={group} rotation={[0.45, 0, -0.35]}>
//       <group ref={body}>
//         <mesh>
//           <sphereGeometry args={[2, seg, seg]} />
//           <meshPhysicalMaterial map={bands} color="#ffffff" roughness={0.38} clearcoat={1} clearcoatRoughness={0.25} emissive={ORANGE} emissiveIntensity={0.12} />
//         </mesh>
//         <mesh scale={1.2}>
//           <sphereGeometry args={[2, 32, 32]} />
//           <shaderMaterial vertexShader={glowVert} fragmentShader={glowFrag} transparent depthWrite={false} side={BackSide} />
//         </mesh>
//       </group>
//       <group ref={rings}>
//         <PlanetRings segments={seg} />
//       </group>
//     </group>
//   )
// }
// import { useMemo, useRef } from 'react'
// import { useFrame, useThree } from '@react-three/fiber'
// import { BackSide, CanvasTexture, Group, SRGBColorSpace } from 'three'
// import PlanetRings from './PlanetRings'
// import ServiceOrbit from './ServiceOrbit'
// import { sceneState } from '../../store'

// const ORANGE = '#F64618'

// const glowVert = `varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`
// const glowFrag = `uniform float uFade; varying vec3 vN; void main(){ float i = pow(max(0.0, -vN.z), 2.0) * 2.0; gl_FragColor = vec4(0.965, 0.275, 0.094, clamp(i, 0.0, 1.0) * uFade); }`

// export default function Saturn({ mobile }: { mobile: boolean }) {
//   const rig = useRef<Group>(null!)
//   const tilt = useRef<Group>(null!)
//   const body = useRef<Group>(null!)
//   const rings = useRef<Group>(null!)
//   const size = useThree((s) => s.size)
//   const seg = mobile ? 48 : 64
//   const uniforms = useMemo(() => ({ uFade: { value: 1 } }), [])

//   // Soft horizontal cloud bands, tinted around #F64618.
//   const bands = useMemo(() => {
//     const c = document.createElement('canvas')
//     c.width = 4; c.height = 256
//     const g = c.getContext('2d')!
//     for (let i = 0; i < 256; i++) {
//       const l = Math.sin(i * 0.35) * 0.5 + Math.sin(i * 0.11) * 0.5
//       g.fillStyle = `hsl(12 ${90 + l * 6}% ${53 + l * 4}%)`
//       g.fillRect(0, i, 4, 1)
//     }
//     const t = new CanvasTexture(c)
//     t.colorSpace = SRGBColorSpace
//     return t
//   }, [])

//   useFrame((state, dt) => {
//     const { k, grow: g, z } = sceneState
//     const aspect = size.width / size.height
//     const s0 = Math.min(1, Math.max(0.42, (5.67 * aspect) / 9.6))
//     const wide = aspect >= 1.1
//     const sBase = s0 * (1 - (wide ? 0.4 : 0) * k)
//     const s = sBase * (1 - g) + 1.5 * g // grows until it fills the screen
//     const x = wide ? k * 0.21 * 5.67 * aspect : 0
//     // Wide: planet right of the copy. Narrow: planet sits behind the title.
//     const yK = wide ? 0.7 * sBase : 0.7 * sBase * (1 - k) + (0.5 - sceneState.anchorY) * 5.67 * k
//     rig.current.scale.setScalar(s)
//     rig.current.position.set(x, yK * (1 - g) + Math.sin(state.clock.elapsedTime * 0.6) * 0.08, z)
//     rig.current.visible = z < 10.4
//     tilt.current.rotation.y = sceneState.spin
//     uniforms.uFade.value = sceneState.fade
//     body.current.rotation.y += dt * 0.05
//     rings.current.rotation.y += dt * 0.025
//   })

//   return (
//     <group ref={rig}>
//       <group ref={tilt} rotation={[0.45, 0, -0.35]}>
//         <group ref={body}>
//           <mesh>
//             <sphereGeometry args={[2, seg, seg]} />
//             <meshPhysicalMaterial map={bands} color="#ffffff" roughness={0.38} clearcoat={1} clearcoatRoughness={0.25} emissive={ORANGE} emissiveIntensity={0.12} />
//           </mesh>
//           <mesh scale={1.2}>
//             <sphereGeometry args={[2, 32, 32]} />
//             <shaderMaterial uniforms={uniforms} vertexShader={glowVert} fragmentShader={glowFrag} transparent depthWrite={false} side={BackSide} />
//           </mesh>
//         </group>
//         <group ref={rings}>
//           <PlanetRings segments={seg} />
//         </group>
//       </group>
//       <ServiceOrbit mobile={mobile} />
//     </group>
//   )
// }

// import { useMemo, useRef } from 'react'
// import { useFrame, useThree } from '@react-three/fiber'
// import { BackSide, CanvasTexture, Group, SRGBColorSpace } from 'three'
// import PlanetRings from './PlanetRings'
// import ServiceOrbit from './ServiceOrbit'
// import { sceneState, isWideLayout } from '../../store'

// const ORANGE = '#F64618'
// const HALF_H = 9 * Math.tan((35 / 2) * (Math.PI / 180)) // visible half-height at the planet's plane (camera z = 9, fov 35)
// const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))

// const glowVert = `varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`
// const glowFrag = `uniform float uFade; varying vec3 vN; void main(){ float i = pow(max(0.0, -vN.z), 2.0) * 2.0; gl_FragColor = vec4(0.965, 0.275, 0.094, clamp(i, 0.0, 1.0) * uFade); }`

// export default function Saturn({ mobile }: { mobile: boolean }) {
//   const rig = useRef<Group>(null!)
//   const tilt = useRef<Group>(null!)
//   const body = useRef<Group>(null!)
//   const rings = useRef<Group>(null!)
//   const size = useThree((s) => s.size)
//   const seg = mobile ? 48 : 64
//   const uniforms = useMemo(() => ({ uFade: { value: 1 } }), [])

//   // Soft horizontal cloud bands, tinted around #F64618.
//   const bands = useMemo(() => {
//     const c = document.createElement('canvas')
//     c.width = 4; c.height = 256
//     const g = c.getContext('2d')!
//     for (let i = 0; i < 256; i++) {
//       const l = Math.sin(i * 0.35) * 0.5 + Math.sin(i * 0.11) * 0.5
//       g.fillStyle = `hsl(12 ${90 + l * 6}% ${53 + l * 4}%)`
//       g.fillRect(0, i, 4, 1)
//     }
//     const t = new CanvasTexture(c)
//     t.colorSpace = SRGBColorSpace
//     return t
//   }, [])

//   useFrame((state, dt) => {
//     const { k, grow: g, z } = sceneState
//     const aspect = size.width / size.height
//     const hW = HALF_H * aspect
//     const wide = isWideLayout(size.width, size.height)

//     // Fit the WHOLE assembly (rings + orbiting devices) inside the viewport so nothing crops.
//     // ~5.3 / 4.7 = half-width of the assembly in planet units, 2.95 = half-height (the tilted ring's near side is magnified by perspective).
//     const sFit = wide
//       ? Math.min(1, (0.8 * hW) / 5.3, (0.78 * HALF_H) / 2.95)
//       : clamp((0.88 * hW) / 4.7, 0.2, 0.75)
//     // Start size (k = 1): smaller beside the copy on wide screens; on portrait it must fit under the buttons.
//     const sStart = wide ? sFit * 0.6 : Math.min(sFit, sceneState.maxS)
//     const sBase = sFit * (1 - k) + sStart * k
//     const s = sBase * (1 - g) + 1.5 * g // grows until it fills the screen

//     const x = wide ? k * 0.21 * 2 * hW : 0
//     // y = 0.3 is the point the camera looks at, i.e. the screen centre.
//     const yCentre = 0.3
//     // Wide: planet right of the copy. Portrait: planet starts bottom-middle (below the buttons), then rises to centre on scroll.
//     const yStart = 0.3 + (0.5 - sceneState.anchorY) * 2 * HALF_H
//     const yK = wide ? yCentre : yCentre * (1 - k) + yStart * k
//     rig.current.scale.setScalar(s)
//     rig.current.position.set(x, yK * (1 - g) + Math.sin(state.clock.elapsedTime * 0.6) * 0.08, z)
//     rig.current.visible = z < 10.4 && sceneState.fade > 0.003
//     tilt.current.rotation.y = sceneState.spin
//     uniforms.uFade.value = sceneState.fade
//     body.current.rotation.y += dt * 0.05
//     rings.current.rotation.y += dt * 0.025
//   })

//   return (
//     <group ref={rig}>
//       <group ref={tilt} rotation={[0.45, 0, -0.35]}>
//         <group ref={body}>
//           <mesh>
//             <sphereGeometry args={[2, seg, seg]} />
//             <meshPhysicalMaterial map={bands} color="#ffffff" roughness={0.38} clearcoat={1} clearcoatRoughness={0.25} emissive={ORANGE} emissiveIntensity={0.12} />
//           </mesh>
//           <mesh scale={1.2}>
//             <sphereGeometry args={[2, 32, 32]} />
//             <shaderMaterial uniforms={uniforms} vertexShader={glowVert} fragmentShader={glowFrag} transparent depthWrite={false} side={BackSide} />
//           </mesh>
//         </group>
//         <group ref={rings}>
//           <PlanetRings segments={seg} />
//         </group>
//       </group>
//       <ServiceOrbit />
//     </group>
//   )
// }
import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { BackSide, CanvasTexture, Group, SRGBColorSpace } from 'three'
import PlanetRings from './PlanetRings'
import ServiceOrbit from './ServiceOrbit'
import { sceneState, isWideLayout } from '../../store'

const ORANGE = '#F64618'
const HALF_H = 9 * Math.tan((35 / 2) * (Math.PI / 180)) // visible half-height at the planet's plane (camera z = 9, fov 35)
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))

const glowVert = `varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`
const glowFrag = `uniform float uFade; varying vec3 vN; void main(){ float i = pow(max(0.0, -vN.z), 2.0) * 2.0; gl_FragColor = vec4(0.965, 0.275, 0.094, clamp(i, 0.0, 1.0) * uFade); }`

export default function Saturn({ mobile }: { mobile: boolean }) {
  const rig = useRef<Group>(null!)
  const tilt = useRef<Group>(null!)
  const body = useRef<Group>(null!)
  const rings = useRef<Group>(null!)
  const size = useThree((s) => s.size)
  const seg = mobile ? 48 : 64
  const uniforms = useMemo(() => ({ uFade: { value: 1 } }), [])

  // Soft horizontal cloud bands, tinted around #F64618.
  const bands = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 4; c.height = 256
    const g = c.getContext('2d')!
    for (let i = 0; i < 256; i++) {
      const l = Math.sin(i * 0.35) * 0.5 + Math.sin(i * 0.11) * 0.5
      g.fillStyle = `hsl(12 ${90 + l * 6}% ${53 + l * 4}%)`
      g.fillRect(0, i, 4, 1)
    }
    const t = new CanvasTexture(c)
    t.colorSpace = SRGBColorSpace
    return t
  }, [])

  useFrame((state, dt) => {
    const { k, grow: g, z } = sceneState
    const aspect = size.width / size.height
    const hW = HALF_H * aspect
    const wide = isWideLayout(size.width, size.height)

    // Fit the WHOLE assembly (rings + orbiting devices) inside the viewport so nothing crops.
    // ~5.3 / 4.7 = half-width of the assembly in planet units, 2.95 = half-height (the tilted ring's near side is magnified by perspective).
    const sFit = wide
      ? Math.min(1, (0.8 * hW) / 5.3, (0.78 * HALF_H) / 2.95)
      // portrait: limited by width (ring ≈ 4.7) and by height (laptop above + shop below the planet ≈ 7.2 each way)
      : clamp(Math.min((0.88 * hW) / 4.7, (0.8 * HALF_H) / 7.2), 0.2, 0.75)
    // Start size (k = 1): smaller beside the copy on wide screens; on portrait it must fit under the buttons.
    const sStart = wide ? sFit * 0.6 : Math.min(sFit, sceneState.maxS)
    const sBase = sFit * (1 - k) + sStart * k
    const s = sBase * (1 - g) + 1.5 * g // grows until it fills the screen

    const x = wide ? k * 0.21 * 2 * hW : 0
    // y = 0.3 is the point the camera looks at, i.e. the screen centre.
    const yCentre = 0.3
    // Wide: planet right of the copy. Portrait: planet starts bottom-middle (below the buttons), then rises to centre on scroll.
    const yStart = 0.3 + (0.5 - sceneState.anchorY) * 2 * HALF_H
    const yK = wide ? yCentre : yCentre * (1 - k) + yStart * k
    rig.current.scale.setScalar(s)
    rig.current.position.set(x, yK * (1 - g) + Math.sin(state.clock.elapsedTime * 0.6) * 0.08, z)
    rig.current.visible = z < 10.4 && sceneState.fade > 0.003
    tilt.current.rotation.y = sceneState.spin
    uniforms.uFade.value = sceneState.fade
    body.current.rotation.y += dt * 0.05
    rings.current.rotation.y += dt * 0.025
  })

  return (
    <group ref={rig}>
      <group ref={tilt} rotation={[0.45, 0, -0.35]}>
        <group ref={body}>
          <mesh>
            <sphereGeometry args={[2, seg, seg]} />
            <meshPhysicalMaterial map={bands} color="#ffffff" roughness={0.38} clearcoat={1} clearcoatRoughness={0.25} emissive={ORANGE} emissiveIntensity={0.12} />
          </mesh>
          <mesh scale={1.2}>
            <sphereGeometry args={[2, 32, 32]} />
            <shaderMaterial uniforms={uniforms} vertexShader={glowVert} fragmentShader={glowFrag} transparent depthWrite={false} side={BackSide} />
          </mesh>
        </group>
        <group ref={rings}>
          <PlanetRings segments={seg} />
        </group>
      </group>
      <ServiceOrbit />
    </group>
  )
}
