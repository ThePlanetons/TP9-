// import { useEffect, useMemo, useRef, useState } from 'react'
// import { useFrame, useThree } from '@react-three/fiber'
// import { CanvasTexture, Group, Mesh, MeshBasicMaterial, SRGBColorSpace } from 'three'
// import { sceneState } from '../../store'

// /**
//  * Service mockups (website, web app, code, e-commerce, UI/UX) that orbit the planet.
//  * Drawn once to canvas textures -> 5 camera-facing planes. Scroll drives orbit angle + dissolve.
//  */
// type Kind = 'laptop' | 'phone' | 'code' | 'shop' | 'chart'
// type G = CanvasRenderingContext2D
// const ORANGE = '#F64618'
// const SIZE: Record<Kind, [number, number]> = { laptop: [640, 400], phone: [240, 500], code: [560, 350], shop: [600, 450], chart: [400, 250] }

// // a = start angle (deg, 90 = facing camera), y = height, w/h = world size, mobile = shown on phones
// const ITEMS: { kind: Kind; label: string; w: number; h: number; a: number; y: number; mobile: boolean }[] = [
//   { kind: 'laptop', label: 'Websites', w: 2.7, h: 1.69, a: 150, y: 0.9, mobile: true },
//   { kind: 'phone', label: 'Web Apps', w: 1.0, h: 2.08, a: 20, y: 1.3, mobile: true },
//   { kind: 'code', label: 'Development', w: 2.1, h: 1.31, a: 115, y: -1.3, mobile: false },
//   { kind: 'shop', label: 'E-commerce', w: 2.4, h: 1.8, a: 55, y: -1.0, mobile: true },
//   { kind: 'chart', label: 'UI/UX', w: 1.6, h: 1.0, a: 215, y: 0.2, mobile: false },
// ]

// const rr = (g: G, x: number, y: number, w: number, h: number, r: number) => { g.beginPath(); g.roundRect(x, y, w, h, r) }
// const toTex = (c: HTMLCanvasElement) => { const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; t.anisotropy = 4; return t }
// const txt = (g: G, s: string, x: number, y: number, size: number, color: string) => { g.font = `800 ${size}px Rubik, Arial`; g.fillStyle = color; g.fillText(s, x, y) }
// function area(g: G, x: number, y: number, w: number, h: number) {
//   const p = [[0, 0.9], [0.15, 0.7], [0.3, 0.78], [0.48, 0.45], [0.64, 0.55], [0.82, 0.2], [1, 0.3]]
//   g.beginPath()
//   p.forEach(([a, b], i) => (i ? g.lineTo(x + a * w, y + b * h) : g.moveTo(x + a * w, y + b * h)))
//   g.strokeStyle = ORANGE; g.lineWidth = 3; g.stroke()
//   g.lineTo(x + w, y + h); g.lineTo(x, y + h); g.closePath(); g.fillStyle = 'rgba(246,70,24,.25)'; g.fill()
// }

// function device(kind: Kind) {
//   const [W, H] = SIZE[kind]
//   const c = document.createElement('canvas'); c.width = W; c.height = H
//   const g = c.getContext('2d')!
//   const ph = kind === 'phone', m = ph ? 12 : 14
//   g.fillStyle = '#1d1d1d'; rr(g, 0, 0, W, H, ph ? 38 : 20); g.fill()
//   g.save(); rr(g, m, m, W - 2 * m, H - 2 * m, ph ? 28 : 10); g.clip()
//   g.fillStyle = kind === 'shop' ? '#FBF7F2' : '#131313'; g.fillRect(0, 0, W, H)

//   if (kind === 'laptop') {
//     g.fillStyle = ORANGE; g.beginPath(); g.arc(46, 46, 7, 0, 7); g.fill()
//     g.fillStyle = 'rgba(255,255,255,.35)'
//     for (let i = 0; i < 3; i++) g.fillRect(W - 190 + i * 56, 42, 38, 6)
//     ;['Better Solutions', 'for a Smarter', 'Tomorrow'].forEach((s, i) => txt(g, s, 44, 150 + i * 46, 38, '#fff'))
//     g.fillStyle = ORANGE; rr(g, 44, 300, 130, 34, 6); g.fill()
//     const r = g.createRadialGradient(W - 150, H - 120, 4, W - 140, H - 110, 90)
//     r.addColorStop(0, '#FFB27A'); r.addColorStop(0.5, ORANGE); r.addColorStop(1, '#4a1202')
//     g.fillStyle = r; g.beginPath(); g.arc(W - 140, H - 110, 90, 0, 7); g.fill()
//   } else if (kind === 'phone') {
//     ;['Your', 'Ideas', 'Online'].forEach((s, i) => txt(g, s, 30, 130 + i * 44, 38, '#fff'))
//     g.fillStyle = ORANGE; rr(g, 30, 280, 90, 26, 6); g.fill()
//     area(g, 24, H - 170, W - 48, 130)
//   } else if (kind === 'code') {
//     const L = [[0, 0.5, 1], [1, 0.7, 0], [1, 0.45, 0], [2, 0.6, 2], [2, 0.3, 0], [1, 0.55, 0], [0, 0.35, 1], [1, 0.5, 0], [2, 0.65, 2], [1, 0.4, 0]]
//     L.forEach(([ind, f, col], i) => {
//       g.fillStyle = col === 1 ? ORANGE : col === 2 ? 'rgba(246,70,24,.6)' : 'rgba(255,255,255,.35)'
//       rr(g, 36 + ind * 30, 48 + i * 28, (W - 120) * f, 9, 4); g.fill()
//     })
//   } else if (kind === 'shop') {
//     txt(g, 'Premium', 36, 120, 36, '#111'); txt(g, 'Headphones', 36, 160, 36, '#111')
//     g.fillStyle = '#111'; rr(g, 36, 190, 110, 30, 6); g.fill()
//     g.fillStyle = '#EDE6DD'; rr(g, W - 250, 50, 210, 210, 14); g.fill()
//     g.strokeStyle = '#111'; g.lineWidth = 12; g.beginPath(); g.arc(W - 145, 150, 52, Math.PI, 0); g.stroke()
//     g.fillStyle = '#111'; rr(g, W - 205, 150, 24, 56, 8); g.fill(); rr(g, W - 109, 150, 24, 56, 8); g.fill()
//     const tw = (W - 72) / 4
//     g.fillStyle = '#EDE6DD'
//     for (let i = 0; i < 4; i++) { rr(g, 36 + i * tw, 290, tw - 14, 100, 8); g.fill() }
//   } else {
//     g.fillStyle = 'rgba(255,255,255,.4)'; rr(g, 30, 30, 120, 10, 5); g.fill()
//     area(g, 30, 70, W - 60, H - 110)
//   }
//   g.restore()
//   const s = g.createLinearGradient(0, 0, W, H)
//   s.addColorStop(0, 'rgba(255,255,255,.16)'); s.addColorStop(0.4, 'rgba(255,255,255,0)')
//   g.fillStyle = s; rr(g, 0, 0, W, H, ph ? 38 : 20); g.fill()
//   return toTex(c)
// }

// function chip(label: string) {
//   const c = document.createElement('canvas')
//   const f = '600 30px "Space Grotesk", Arial'
//   c.getContext('2d')!.font = f
//   const w = Math.ceil(c.getContext('2d')!.measureText(label).width) + 64, h = 64
//   c.width = w; c.height = h // resizing resets the context
//   const g = c.getContext('2d')!
//   g.fillStyle = '#FFF8F0'; rr(g, 2, 2, w - 4, h - 4, 30); g.fill()
//   g.strokeStyle = 'rgba(246,70,24,.45)'; g.lineWidth = 3; g.stroke()
//   g.font = f; g.fillStyle = ORANGE; g.textBaseline = 'middle'; g.fillText(label, 32, h / 2 + 1)
//   return { t: toTex(c), aspect: w / h }
// }

// export default function ServiceOrbit({ mobile }: { mobile: boolean }) {
//   const [ready, setReady] = useState(false)
//   const refs = useRef<(Group | null)[]>([])
//   const camera = useThree((s) => s.camera)

//   useEffect(() => { // draw textures only after the web fonts are available
//     let on = true
//     Promise.all([document.fonts.load('800 40px Rubik'), document.fonts.load('600 30px "Space Grotesk"')])
//       .catch(() => {}).then(() => on && setReady(true))
//     return () => { on = false }
//   }, [])

//   const assets = useMemo(() => (ready ? ITEMS.map((it) => ({ it, dev: device(it.kind), ch: chip(it.label) })) : []), [ready])

//   useFrame((state) => {
//     const phi = sceneState.orbit * Math.PI * 1.1, t = state.clock.elapsedTime
//     assets.forEach(({ it }, i) => {
//       const g = refs.current[i]
//       if (!g) return
//       const a = (it.a * Math.PI) / 180 + phi
//       g.position.set(Math.cos(a) * 3.9, it.y + Math.sin(t * 0.8 + i) * 0.06, Math.sin(a) * 3.3)
//       g.quaternion.copy(camera.quaternion) // always face the viewer
//       const d = Math.min(1, Math.max(0, (sceneState.dissolve - i * 0.08) / 0.5)) // staggered dissolve
//       g.scale.setScalar(1 - 0.35 * d)
//       g.visible = d < 1 && (!mobile || it.mobile)
//       for (const c of g.children) ((c as Mesh).material as MeshBasicMaterial).opacity = (1 - d) * show
//     })
//   })

//   return (
//     <group>
//       {assets.map(({ it, dev, ch }, i) => (
//         <group key={it.kind} ref={(el) => { refs.current[i] = el }}>
//           <mesh>
//             <planeGeometry args={[it.w, it.h]} />
//             <meshBasicMaterial map={dev} transparent depthWrite={false} toneMapped={false} />
//           </mesh>
//           <mesh position={[-it.w / 2 + (0.3 * ch.aspect) / 2 + 0.05, it.h / 2 + 0.32, 0.02]}>
//             <planeGeometry args={[0.3 * ch.aspect, 0.3]} />
//             <meshBasicMaterial map={ch.t} transparent depthWrite={false} toneMapped={false} />
//           </mesh>
//         </group>
//       ))}
//     </group>
//   )
// }
// import { useEffect, useMemo, useRef, useState } from 'react'
// import { useFrame, useThree } from '@react-three/fiber'
// import { CanvasTexture, Group, Mesh, MeshBasicMaterial, SRGBColorSpace } from 'three'
// import { sceneState, isWideLayout } from '../../store'

// /**
//  * Service mockups (website, web app, code, e-commerce, UI/UX) that orbit the planet.
//  * Drawn once to canvas textures -> 5 camera-facing planes. Scroll drives orbit angle + dissolve.
//  */
// type Kind = 'laptop' | 'phone' | 'code' | 'shop' | 'chart'
// type G = CanvasRenderingContext2D
// const ORANGE = '#F64618'
// const SIZE: Record<Kind, [number, number]> = { laptop: [640, 400], phone: [240, 500], code: [560, 350], shop: [600, 450], chart: [400, 250] }

// // a = start angle (deg, 90 = facing camera), y = height, w/h = world size, mobile = shown on phones
// const ITEMS: { kind: Kind; label: string; w: number; h: number; a: number; y: number; mobile: boolean }[] = [
//   { kind: 'laptop', label: 'Websites', w: 2.7, h: 1.69, a: 150, y: 0.9, mobile: true },
//   { kind: 'phone', label: 'Web Apps', w: 1.0, h: 2.08, a: 20, y: 1.3, mobile: true },
//   { kind: 'code', label: 'Development', w: 2.1, h: 1.31, a: 115, y: -1.3, mobile: false },
//   { kind: 'shop', label: 'E-commerce', w: 2.4, h: 1.8, a: 55, y: -1.0, mobile: true },
//   { kind: 'chart', label: 'UI/UX', w: 1.6, h: 1.0, a: 215, y: 0.2, mobile: false },
// ]

// const rr = (g: G, x: number, y: number, w: number, h: number, r: number) => { g.beginPath(); g.roundRect(x, y, w, h, r) }
// const toTex = (c: HTMLCanvasElement) => { const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; t.anisotropy = 4; return t }
// const txt = (g: G, s: string, x: number, y: number, size: number, color: string) => { g.font = `800 ${size}px Rubik, Arial`; g.fillStyle = color; g.fillText(s, x, y) }
// function area(g: G, x: number, y: number, w: number, h: number) {
//   const p = [[0, 0.9], [0.15, 0.7], [0.3, 0.78], [0.48, 0.45], [0.64, 0.55], [0.82, 0.2], [1, 0.3]]
//   g.beginPath()
//   p.forEach(([a, b], i) => (i ? g.lineTo(x + a * w, y + b * h) : g.moveTo(x + a * w, y + b * h)))
//   g.strokeStyle = ORANGE; g.lineWidth = 3; g.stroke()
//   g.lineTo(x + w, y + h); g.lineTo(x, y + h); g.closePath(); g.fillStyle = 'rgba(246,70,24,.25)'; g.fill()
// }

// function device(kind: Kind) {
//   const [W, H] = SIZE[kind]
//   const c = document.createElement('canvas'); c.width = W; c.height = H
//   const g = c.getContext('2d')!
//   const ph = kind === 'phone', m = ph ? 12 : 14
//   g.fillStyle = '#1d1d1d'; rr(g, 0, 0, W, H, ph ? 38 : 20); g.fill()
//   g.save(); rr(g, m, m, W - 2 * m, H - 2 * m, ph ? 28 : 10); g.clip()
//   g.fillStyle = kind === 'shop' ? '#FBF7F2' : '#131313'; g.fillRect(0, 0, W, H)

//   if (kind === 'laptop') {
//     g.fillStyle = ORANGE; g.beginPath(); g.arc(46, 46, 7, 0, 7); g.fill()
//     g.fillStyle = 'rgba(255,255,255,.35)'
//     for (let i = 0; i < 3; i++) g.fillRect(W - 190 + i * 56, 42, 38, 6)
//     ;['Better Solutions', 'for a Smarter', 'Tomorrow'].forEach((s, i) => txt(g, s, 44, 150 + i * 46, 38, '#fff'))
//     g.fillStyle = ORANGE; rr(g, 44, 300, 130, 34, 6); g.fill()
//     const r = g.createRadialGradient(W - 150, H - 120, 4, W - 140, H - 110, 90)
//     r.addColorStop(0, '#FFB27A'); r.addColorStop(0.5, ORANGE); r.addColorStop(1, '#4a1202')
//     g.fillStyle = r; g.beginPath(); g.arc(W - 140, H - 110, 90, 0, 7); g.fill()
//   } else if (kind === 'phone') {
//     ;['Your', 'Ideas', 'Online'].forEach((s, i) => txt(g, s, 30, 130 + i * 44, 38, '#fff'))
//     g.fillStyle = ORANGE; rr(g, 30, 280, 90, 26, 6); g.fill()
//     area(g, 24, H - 170, W - 48, 130)
//   } else if (kind === 'code') {
//     const L = [[0, 0.5, 1], [1, 0.7, 0], [1, 0.45, 0], [2, 0.6, 2], [2, 0.3, 0], [1, 0.55, 0], [0, 0.35, 1], [1, 0.5, 0], [2, 0.65, 2], [1, 0.4, 0]]
//     L.forEach(([ind, f, col], i) => {
//       g.fillStyle = col === 1 ? ORANGE : col === 2 ? 'rgba(246,70,24,.6)' : 'rgba(255,255,255,.35)'
//       rr(g, 36 + ind * 30, 48 + i * 28, (W - 120) * f, 9, 4); g.fill()
//     })
//   } else if (kind === 'shop') {
//     txt(g, 'Premium', 36, 120, 36, '#111'); txt(g, 'Headphones', 36, 160, 36, '#111')
//     g.fillStyle = '#111'; rr(g, 36, 190, 110, 30, 6); g.fill()
//     g.fillStyle = '#EDE6DD'; rr(g, W - 250, 50, 210, 210, 14); g.fill()
//     g.strokeStyle = '#111'; g.lineWidth = 12; g.beginPath(); g.arc(W - 145, 150, 52, Math.PI, 0); g.stroke()
//     g.fillStyle = '#111'; rr(g, W - 205, 150, 24, 56, 8); g.fill(); rr(g, W - 109, 150, 24, 56, 8); g.fill()
//     const tw = (W - 72) / 4
//     g.fillStyle = '#EDE6DD'
//     for (let i = 0; i < 4; i++) { rr(g, 36 + i * tw, 290, tw - 14, 100, 8); g.fill() }
//   } else {
//     g.fillStyle = 'rgba(255,255,255,.4)'; rr(g, 30, 30, 120, 10, 5); g.fill()
//     area(g, 30, 70, W - 60, H - 110)
//   }
//   g.restore()
//   const s = g.createLinearGradient(0, 0, W, H)
//   s.addColorStop(0, 'rgba(255,255,255,.16)'); s.addColorStop(0.4, 'rgba(255,255,255,0)')
//   g.fillStyle = s; rr(g, 0, 0, W, H, ph ? 38 : 20); g.fill()
//   return toTex(c)
// }

// function chip(label: string) {
//   const c = document.createElement('canvas')
//   const f = '600 30px "Space Grotesk", Arial'
//   c.getContext('2d')!.font = f
//   const w = Math.ceil(c.getContext('2d')!.measureText(label).width) + 64, h = 64
//   c.width = w; c.height = h // resizing resets the context
//   const g = c.getContext('2d')!
//   g.fillStyle = '#FFF8F0'; rr(g, 2, 2, w - 4, h - 4, 30); g.fill()
//   g.strokeStyle = 'rgba(246,70,24,.45)'; g.lineWidth = 3; g.stroke()
//   g.font = f; g.fillStyle = ORANGE; g.textBaseline = 'middle'; g.fillText(label, 32, h / 2 + 1)
//   return { t: toTex(c), aspect: w / h }
// }

// export default function ServiceOrbit() {
//   const [ready, setReady] = useState(false)
//   const refs = useRef<(Group | null)[]>([])
//   const camera = useThree((s) => s.camera)

//   useEffect(() => { // draw textures only after the web fonts are available
//     let on = true
//     Promise.all([document.fonts.load('800 40px Rubik'), document.fonts.load('600 30px "Space Grotesk"')])
//       .catch(() => {}).then(() => on && setReady(true))
//     return () => { on = false }
//   }, [])

//   const assets = useMemo(() => (ready ? ITEMS.map((it) => ({ it, dev: device(it.kind), ch: chip(it.label) })) : []), [ready])

//   useFrame((state) => {
//     const phi = sceneState.orbit * Math.PI * 1.1, t = state.clock.elapsedTime
//     // Portrait / small screens: tighter orbit + slightly bigger mockups (the whole rig is scaled down there), 3 devices only.
//     const compact = !isWideLayout(state.size.width, state.size.height)
//     const rx = compact ? 3.0 : 3.9, rz = compact ? 2.6 : 3.3, ds = compact ? 1.25 : 1
//     // Portrait start state = a clean planet + rings only. The mockups fade in while the planet rises to the centre (k: 1 → 0).
//     const kk = Math.min(1, Math.max(0, (0.65 - sceneState.k) / 0.45))
//     const show = compact ? kk * kk * (3 - 2 * kk) : 1
//     assets.forEach(({ it }, i) => {
//       const g = refs.current[i]
//       if (!g) return
//       const a = (it.a * Math.PI) / 180 + phi
//       g.position.set(Math.cos(a) * rx, it.y + Math.sin(t * 0.8 + i) * 0.06, Math.sin(a) * rz)
//       g.quaternion.copy(camera.quaternion) // always face the viewer
//       const d = Math.min(1, Math.max(0, (sceneState.dissolve - i * 0.08) / 0.5)) // staggered dissolve
//       g.scale.setScalar((1 - 0.35 * d) * ds)
//       g.visible = d < 1 && show > 0.01 && (!compact || it.mobile)
//       for (const c of g.children) ((c as Mesh).material as MeshBasicMaterial).opacity = (1 - d) * show
//     })
//   })

//   return (
//     <group>
//       {assets.map(({ it, dev, ch }, i) => (
//         <group key={it.kind} ref={(el) => { refs.current[i] = el }}>
//           <mesh>
//             <planeGeometry args={[it.w, it.h]} />
//             <meshBasicMaterial map={dev} transparent depthWrite={false} toneMapped={false} />
//           </mesh>
//           <mesh position={[-it.w / 2 + (0.3 * ch.aspect) / 2 + 0.05, it.h / 2 + 0.32, 0.02]}>
//             <planeGeometry args={[0.3 * ch.aspect, 0.3]} />
//             <meshBasicMaterial map={ch.t} transparent depthWrite={false} toneMapped={false} />
//           </mesh>
//         </group>
//       ))}
//     </group>
//   )
// }
import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { CanvasTexture, Group, Mesh, MeshBasicMaterial, SRGBColorSpace } from 'three'
import { sceneState, isWideLayout } from '../../store'

/**
 * Service mockups (website, web app, code, e-commerce, UI/UX) that orbit the planet.
 * Drawn once to canvas textures -> 5 camera-facing planes. Scroll drives orbit angle + dissolve.
 */
type Kind = 'laptop' | 'phone' | 'code' | 'shop' | 'chart'
type G = CanvasRenderingContext2D
const ORANGE = '#F64618'
const SIZE: Record<Kind, [number, number]> = { laptop: [640, 400], phone: [240, 500], code: [560, 350], shop: [600, 450], chart: [400, 250] }

// a = start angle (deg, 90 = facing camera), y = height, w/h = world size, mobile = shown on phones
const ITEMS: { kind: Kind; label: string; w: number; h: number; a: number; y: number; mobile: boolean }[] = [
  { kind: 'laptop', label: 'Websites', w: 2.7, h: 1.69, a: 150, y: 0.9, mobile: true },
  { kind: 'phone', label: 'Web Apps', w: 1.0, h: 2.08, a: 20, y: 1.3, mobile: true },
  { kind: 'code', label: 'Development', w: 2.1, h: 1.31, a: 115, y: -1.3, mobile: false },
  { kind: 'shop', label: 'E-commerce', w: 2.4, h: 1.8, a: 55, y: -1.0, mobile: true },
  { kind: 'chart', label: 'UI/UX', w: 1.6, h: 1.0, a: 215, y: 0.2, mobile: false },
]

const rr = (g: G, x: number, y: number, w: number, h: number, r: number) => { g.beginPath(); g.roundRect(x, y, w, h, r) }
const toTex = (c: HTMLCanvasElement) => { const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; t.anisotropy = 4; return t }
const txt = (g: G, s: string, x: number, y: number, size: number, color: string) => { g.font = `800 ${size}px Rubik, Arial`; g.fillStyle = color; g.fillText(s, x, y) }
function area(g: G, x: number, y: number, w: number, h: number) {
  const p = [[0, 0.9], [0.15, 0.7], [0.3, 0.78], [0.48, 0.45], [0.64, 0.55], [0.82, 0.2], [1, 0.3]]
  g.beginPath()
  p.forEach(([a, b], i) => (i ? g.lineTo(x + a * w, y + b * h) : g.moveTo(x + a * w, y + b * h)))
  g.strokeStyle = ORANGE; g.lineWidth = 3; g.stroke()
  g.lineTo(x + w, y + h); g.lineTo(x, y + h); g.closePath(); g.fillStyle = 'rgba(246,70,24,.25)'; g.fill()
}

function device(kind: Kind) {
  const [W, H] = SIZE[kind]
  const c = document.createElement('canvas'); c.width = W; c.height = H
  const g = c.getContext('2d')!
  const ph = kind === 'phone', m = ph ? 12 : 14
  g.fillStyle = '#1d1d1d'; rr(g, 0, 0, W, H, ph ? 38 : 20); g.fill()
  g.save(); rr(g, m, m, W - 2 * m, H - 2 * m, ph ? 28 : 10); g.clip()
  g.fillStyle = kind === 'shop' ? '#FBF7F2' : '#131313'; g.fillRect(0, 0, W, H)

  if (kind === 'laptop') {
    g.fillStyle = ORANGE; g.beginPath(); g.arc(46, 46, 7, 0, 7); g.fill()
    g.fillStyle = 'rgba(255,255,255,.35)'
    for (let i = 0; i < 3; i++) g.fillRect(W - 190 + i * 56, 42, 38, 6)
    ;['Better Solutions', 'for a Smarter', 'Tomorrow'].forEach((s, i) => txt(g, s, 44, 150 + i * 46, 38, '#fff'))
    g.fillStyle = ORANGE; rr(g, 44, 300, 130, 34, 6); g.fill()
    const r = g.createRadialGradient(W - 150, H - 120, 4, W - 140, H - 110, 90)
    r.addColorStop(0, '#FFB27A'); r.addColorStop(0.5, ORANGE); r.addColorStop(1, '#4a1202')
    g.fillStyle = r; g.beginPath(); g.arc(W - 140, H - 110, 90, 0, 7); g.fill()
  } else if (kind === 'phone') {
    ;['Your', 'Ideas', 'Online'].forEach((s, i) => txt(g, s, 30, 130 + i * 44, 38, '#fff'))
    g.fillStyle = ORANGE; rr(g, 30, 280, 90, 26, 6); g.fill()
    area(g, 24, H - 170, W - 48, 130)
  } else if (kind === 'code') {
    const L = [[0, 0.5, 1], [1, 0.7, 0], [1, 0.45, 0], [2, 0.6, 2], [2, 0.3, 0], [1, 0.55, 0], [0, 0.35, 1], [1, 0.5, 0], [2, 0.65, 2], [1, 0.4, 0]]
    L.forEach(([ind, f, col], i) => {
      g.fillStyle = col === 1 ? ORANGE : col === 2 ? 'rgba(246,70,24,.6)' : 'rgba(255,255,255,.35)'
      rr(g, 36 + ind * 30, 48 + i * 28, (W - 120) * f, 9, 4); g.fill()
    })
  } else if (kind === 'shop') {
    txt(g, 'Premium', 36, 120, 36, '#111'); txt(g, 'Headphones', 36, 160, 36, '#111')
    g.fillStyle = '#111'; rr(g, 36, 190, 110, 30, 6); g.fill()
    g.fillStyle = '#EDE6DD'; rr(g, W - 250, 50, 210, 210, 14); g.fill()
    g.strokeStyle = '#111'; g.lineWidth = 12; g.beginPath(); g.arc(W - 145, 150, 52, Math.PI, 0); g.stroke()
    g.fillStyle = '#111'; rr(g, W - 205, 150, 24, 56, 8); g.fill(); rr(g, W - 109, 150, 24, 56, 8); g.fill()
    const tw = (W - 72) / 4
    g.fillStyle = '#EDE6DD'
    for (let i = 0; i < 4; i++) { rr(g, 36 + i * tw, 290, tw - 14, 100, 8); g.fill() }
  } else {
    g.fillStyle = 'rgba(255,255,255,.4)'; rr(g, 30, 30, 120, 10, 5); g.fill()
    area(g, 30, 70, W - 60, H - 110)
  }
  g.restore()
  const s = g.createLinearGradient(0, 0, W, H)
  s.addColorStop(0, 'rgba(255,255,255,.16)'); s.addColorStop(0.4, 'rgba(255,255,255,0)')
  g.fillStyle = s; rr(g, 0, 0, W, H, ph ? 38 : 20); g.fill()
  return toTex(c)
}

function chip(label: string) {
  const c = document.createElement('canvas')
  const f = '600 30px "Space Grotesk", Arial'
  c.getContext('2d')!.font = f
  const w = Math.ceil(c.getContext('2d')!.measureText(label).width) + 64, h = 64
  c.width = w; c.height = h // resizing resets the context
  const g = c.getContext('2d')!
  g.fillStyle = '#FFF8F0'; rr(g, 2, 2, w - 4, h - 4, 30); g.fill()
  g.strokeStyle = 'rgba(246,70,24,.45)'; g.lineWidth = 3; g.stroke()
  g.font = f; g.fillStyle = ORANGE; g.textBaseline = 'middle'; g.fillText(label, 32, h / 2 + 1)
  return { t: toTex(c), aspect: w / h }
}

/** Portrait slots (rig units; the rig is scaled down on phones, and a phone screen is ~2× taller than wide in these units). */
const COMPACT: Record<string, { x: number; y: number; z: number; sway: number }> = {
  laptop: { x: -0.5, y: 4.9, z: 0.6, sway: 0.5 },
  phone: { x: 3.1, y: 0.3, z: 1.2, sway: 0.3 },
  shop: { x: 0.4, y: -4.9, z: 0.6, sway: 0.5 },
}

export default function ServiceOrbit() {
  const [ready, setReady] = useState(false)
  const refs = useRef<(Group | null)[]>([])
  const camera = useThree((s) => s.camera)

  useEffect(() => { // draw textures only after the web fonts are available
    let on = true
    Promise.all([document.fonts.load('800 40px Rubik'), document.fonts.load('600 30px "Space Grotesk"')])
      .catch(() => {}).then(() => on && setReady(true))
    return () => { on = false }
  }, [])

  const assets = useMemo(() => (ready ? ITEMS.map((it) => ({ it, dev: device(it.kind), ch: chip(it.label) })) : []), [ready])

  useFrame((state) => {
    const phi = sceneState.orbit * Math.PI * 1.1, t = state.clock.elapsedTime
    // Portrait / small screens: tighter orbit + slightly bigger mockups (the whole rig is scaled down there), 3 devices only.
    const compact = !isWideLayout(state.size.width, state.size.height)
    const rx = 3.9, rz = 3.3, ds = compact ? 1.25 : 1
    // Portrait start state = a clean planet + rings only. The mockups fade in while the planet rises to the centre (k: 1 → 0).
    const kk = Math.min(1, Math.max(0, (0.65 - sceneState.k) / 0.45))
    const show = compact ? kk * kk * (3 - 2 * kk) : 1
    assets.forEach(({ it }, i) => {
      const g = refs.current[i]
      if (!g) return
      if (compact) {
        // Portrait: fixed, NON-overlapping slots (they only sway a little as you scroll) — laptop above the planet,
        // shop below, phone beside it. Each slot is separated vertically (or sits outside the planet), so mockups
        // never cover each other or the planet, whatever the scroll position.
        const c = COMPACT[it.kind]
        if (!c) { g.visible = false; return } // desktop-only mockups (code, chart) are not shown on portrait screens
        g.position.set(c.x + Math.sin(phi * 2 + i * 2.1) * c.sway, c.y + Math.sin(t * 0.8 + i) * 0.06, c.z)
      } else {
        const a = (it.a * Math.PI) / 180 + phi
        g.position.set(Math.cos(a) * rx, it.y + Math.sin(t * 0.8 + i) * 0.06, Math.sin(a) * rz)
      }
      g.quaternion.copy(camera.quaternion) // always face the viewer
      const d = Math.min(1, Math.max(0, (sceneState.dissolve - i * 0.08) / 0.5)) // staggered dissolve
      g.scale.setScalar((1 - 0.35 * d) * ds)
      g.visible = d < 1 && show > 0.01 && (!compact || it.mobile)
      for (const c of g.children) ((c as Mesh).material as MeshBasicMaterial).opacity = (1 - d) * show
    })
  })

  return (
    <group>
      {assets.map(({ it, dev, ch }, i) => (
        <group key={it.kind} ref={(el) => { refs.current[i] = el }}>
          <mesh>
            <planeGeometry args={[it.w, it.h]} />
            <meshBasicMaterial map={dev} transparent depthWrite={false} toneMapped={false} />
          </mesh>
          <mesh position={[-it.w / 2 + (0.3 * ch.aspect) / 2 + 0.05, it.h / 2 + 0.32, 0.02]}>
            <planeGeometry args={[0.3 * ch.aspect, 0.3]} />
            <meshBasicMaterial map={ch.t} transparent depthWrite={false} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
