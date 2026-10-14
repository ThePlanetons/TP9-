// import { RefObject, useLayoutEffect } from 'react'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import Lenis from 'lenis'
// import { sceneState } from '../store'

// gsap.registerPlugin(ScrollTrigger)

// /** Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync. */
// export function useLenis() {
//   useLayoutEffect(() => {
//     const lenis = new Lenis({ lerp: 0.085 })
//     lenis.on('scroll', ScrollTrigger.update)
//     const tick = (t: number) => lenis.raf(t * 1000)
//     gsap.ticker.add(tick)
//     gsap.ticker.lagSmoothing(0)
//     return () => { gsap.ticker.remove(tick); lenis.destroy() }
//   }, [])
// }

// type Refs = { stage: RefObject<HTMLElement>; hero: RefObject<HTMLElement>; logo: RefObject<HTMLElement>; overlay: RefObject<HTMLElement> }

// /** One scrubbed timeline: split hero -> planet centres -> fly-through -> white -> logo -> motion graphics. */
// export function useScrollAnimation(r: Refs) {
//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       const O = 18 // the original sequence starts after the planet has centred
//       const tl = gsap.timeline({
//         defaults: { ease: 'none' },
//         scrollTrigger: { trigger: r.stage.current, start: 'top top', end: 'bottom bottom', scrub: 1 },
//       })
//       // Phase 1: left copy fades out, planet glides from the right to the centre
//       tl.to(r.hero.current, { opacity: 0, x: -60, ease: 'power1.in', duration: 10 }, 0)
//         .to(sceneState, { k: 0, ease: 'power2.inOut', duration: 15 }, 3)
//         // Phase 2: the original cinematic sequence
//         .to(sceneState, { z: 10.5, ease: 'power2.in', duration: 45 }, O)
//         .to(sceneState, { fov: 80, ease: 'power2.in', duration: 45 }, O)
//         .to(sceneState, { spin: 1.2, duration: 45 }, O)
//         .fromTo(r.logo.current, { opacity: 0, scale: 0.7, letterSpacing: '-0.08em' },
//           { opacity: 1, scale: 1, letterSpacing: '-0.02em', ease: 'power3.out', duration: 25 }, O + 42)
//         .to(r.logo.current, { scale: 1.06, duration: 37 }, O + 67)
//         .fromTo(r.overlay.current, { opacity: 0 }, { opacity: 1, duration: 15 }, O + 62)
//         .to([r.logo.current, r.overlay.current], { opacity: 0, y: -60, duration: 8 }, O + 96)
//     })
//     return () => ctx.revert()
//   }, [])
// }

// export function useReveal() {
//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) =>
//         gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }))
//     })
//     return () => ctx.revert()
//   }, [])
// }
// import { RefObject, useLayoutEffect } from 'react'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import Lenis from 'lenis'
// import { sceneState } from '../store'

// gsap.registerPlugin(ScrollTrigger)

// /** Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync. */
// export function useLenis() {
//   useLayoutEffect(() => {
//     const lenis = new Lenis({ lerp: 0.085 })
//     lenis.on('scroll', ScrollTrigger.update)
//     const tick = (t: number) => lenis.raf(t * 1000)
//     gsap.ticker.add(tick)
//     gsap.ticker.lagSmoothing(0)
//     return () => { gsap.ticker.remove(tick); lenis.destroy() }
//   }, [])
// }

// type Refs = { stage: RefObject<HTMLElement>; hero: RefObject<HTMLElement>; logo: RefObject<HTMLElement>; overlay: RefObject<HTMLElement>; tag: RefObject<HTMLElement> }

// /**
//  * Split hero -> planet centres -> service icons orbit + dissolve -> planet fills screen ->
//  * "TAKE YOUR BRAND TO ANOTHER WORLD" -> fly through -> white -> THE PLANET 9 -> motion graphics.
//  */
// export function useScrollAnimation(r: Refs) {
//   useLayoutEffect(() => {
//     // Mobile: tell the 3D scene where the title sits so the planet can be placed behind it.
//     const measure = () => {
//       const t = document.getElementById('hero-title')
//       if (t) { const b = t.getBoundingClientRect(); sceneState.anchorY = (b.top + b.height / 2) / window.innerHeight }
//     }
//     measure()
//     window.addEventListener('resize', measure)

//     const ctx = gsap.context(() => {
//       const O = 18 // start of the cinematic part (after the planet has centred)
//       const P = O + 78 // start of the THE PLANET 9 reveal
//       const lines = gsap.utils.toArray<HTMLElement>('[data-line]', r.tag.current)
//       const tl = gsap.timeline({
//         defaults: { ease: 'none' },
//         scrollTrigger: { trigger: r.stage.current, start: 'top top', end: 'bottom bottom', scrub: 1 },
//       })
//       // 1) left copy out, planet glides to centre
//       tl.to(r.hero.current, { opacity: 0, x: -60, ease: 'power1.in', duration: 10 }, 0)
//         .to(sceneState, { k: 0, ease: 'power2.inOut', duration: 15 }, 3)
//         // 2) service icons orbit around the planet, then dissolve one by one
//         .to(sceneState, { orbit: 1, ease: 'power1.inOut', duration: 40 }, O)
//         .to(sceneState, { dissolve: 1, duration: 30 }, O + 6)
//         // 3) planet approaches until it fills the screen (now plain), then holds
//         .to(sceneState, { z: 5.6, fov: 80, grow: 1, ease: 'power2.in', duration: 42 }, O)
//         .to(sceneState, { z: 5.75, duration: 22 }, O + 42)
//         .to(sceneState, { spin: 1.4, duration: 84 }, O)
//         // 4) tagline over the orange, then it rushes past as we pass through
//         .fromTo(lines, { opacity: 0, y: 50 }, { opacity: 1, y: 0, ease: 'power3.out', duration: 8, stagger: 4 }, O + 40)
//         .to(r.tag.current, { opacity: 0, scale: 1.25, ease: 'power2.in', duration: 7 }, O + 62)
//         // 5) fly through the planet; the orange interior dissolves to white
//         .to(sceneState, { z: 10.5, ease: 'power2.in', duration: 20 }, O + 62)
//         .to(sceneState, { fade: 0, ease: 'power2.in', duration: 20 }, O + 62)
//         // 6) THE PLANET 9, then the creative motion layer
//         .fromTo(r.logo.current, { opacity: 0, scale: 0.7, letterSpacing: '-0.08em' },
//           { opacity: 1, scale: 1, letterSpacing: '-0.02em', ease: 'power3.out', duration: 25 }, P)
//         .to(r.logo.current, { scale: 1.06, duration: 25 }, P + 25)
//         .fromTo(r.overlay.current, { opacity: 0 }, { opacity: 1, duration: 15 }, P + 20)
//         .to([r.logo.current, r.overlay.current], { opacity: 0, y: -60, duration: 8 }, P + 50)
//     })
//     return () => { ctx.revert(); window.removeEventListener('resize', measure) }
//   }, [])
// }

// export function useReveal() {
//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) =>
//         gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }))
//     })
//     return () => ctx.revert()
//   }, [])
// }
import { RefObject, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { sceneState } from '../store'

gsap.registerPlugin(ScrollTrigger)

/** Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function useLenis() {
  useLayoutEffect(() => {
    const lenis = new Lenis({ lerp: 0.085 })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(tick); lenis.destroy() }
  }, [])
}


type Refs = {
  stage: RefObject<HTMLElement>; hero: RefObject<HTMLElement>; logo: RefObject<HTMLElement>; overlay: RefObject<HTMLElement>
  tag: RefObject<HTMLElement>; canvas: RefObject<HTMLElement>; p: RefObject<HTMLElement>; nine: RefObject<HTMLElement>
}

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))

/**
 * Split hero -> planet centres -> service icons orbit + dissolve -> planet fills screen ->
 * "TAKE YOUR BRAND TO ANOTHER WORLD" -> orange dissolves to white -> THE PLANET 9 (the 9 jumps out of the P) -> motion graphics.
 */
export function useScrollAnimation(r: Refs) {
  useLayoutEffect(() => {
    // Portrait screens: the planet starts bottom-middle, in the free space under the hero buttons.
    // Measure that space so the planet is centred in it and sized to fit it (works for any phone height).
    const measure = () => {
      const stage = document.getElementById('hero-stage')
      const cta = document.getElementById('hero-cta')
      if (!stage || !cta) return
      const sb = stage.getBoundingClientRect()
      const H = sb.height || window.innerHeight
      const bottom = clamp(cta.getBoundingClientRect().bottom - sb.top, 0, H)
      const top = bottom + 20 // breathing room under the buttons
      const end = H - 64 // keep clear of the "SCROLL TO EXPLORE" hint
      const space = Math.max(end - top, 0)
      sceneState.anchorY = clamp((top + end) / 2 / H, 0.55, 0.88)
      // Planet + tilted rings are ~0.85 × scale tall, in screen heights; leave a little slack.
      sceneState.maxS = clamp((space / H / 0.85) * 0.92, 0.16, 1)
    }
    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('orientationchange', measure)
    // Fonts / wrapping can change the copy's height after first paint: re-measure whenever it changes size.
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    const cta = document.getElementById('hero-cta')
    if (ro && cta) { ro.observe(cta); if (cta.parentElement) ro.observe(cta.parentElement) }
    document.fonts?.ready.then(() => { measure(); ScrollTrigger.refresh() })

    const ctx = gsap.context(() => {
      const O = 18 // start of the cinematic part (after the planet has centred)
      const P = O + 78 // start of the THE PLANET 9 reveal
      const lines = gsap.utils.toArray<HTMLElement>('[data-line]', r.tag.current)
      const motion = [r.logo.current, r.overlay.current].filter(Boolean)
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: r.stage.current, start: 'top top', end: 'bottom bottom', scrub: 1, invalidateOnRefresh: true },
      })
      // Distance from the 9's resting place back to the P (centre to centre). Re-evaluated on every resize.
      const toP = () => {
        const p = r.p.current as HTMLElement, n = r.nine.current as HTMLElement
        return p.offsetLeft + p.offsetWidth / 2 - (n.offsetLeft + n.offsetWidth / 2)
      }
      // 1) left copy out, planet glides to centre
      tl.to(r.hero.current, { opacity: 0, x: -60, ease: 'power1.in', duration: 10 }, 0)
        .to(sceneState, { k: 0, ease: 'power2.inOut', duration: 15 }, 3)
        // 2) service icons orbit around the planet, then dissolve one by one
        .to(sceneState, { orbit: 1, ease: 'power1.inOut', duration: 40 }, O)
        .to(sceneState, { dissolve: 1, duration: 30 }, O + 6)
        // 3) planet approaches until it fills the screen (now plain), then holds
        .to(sceneState, { z: 5.6, fov: 80, grow: 1, ease: 'power2.in', duration: 42 }, O)
        .to(sceneState, { z: 5.75, duration: 22 }, O + 42)
        .to(sceneState, { spin: 1.4, duration: 84 }, O)
        // 4) tagline over the orange, then it rushes past as we pass through
        .fromTo(lines, { opacity: 0, y: 50 }, { opacity: 1, y: 0, ease: 'power3.out', duration: 8, stagger: 4 }, O + 40)
        .to(r.tag.current, { opacity: 0, scale: 1.25, ease: 'power2.in', duration: 7 }, O + 62)
        // 5) no fly-through (that is where the glow-shell blob + ring line showed up): the full-screen orange simply
        //    dissolves to white, finishing before the logo starts (P = O + 78), so nothing of the planet is left behind.
        .to(r.canvas.current, { opacity: 0, ease: 'power1.inOut', duration: 12 }, O + 62)
        .to(sceneState, { fade: 0, ease: 'none', duration: 12 }, O + 62) // also stops the planet from rendering once it is invisible
        // 6) THE PLANET 9 ...
        .fromTo(r.logo.current, { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, ease: 'power3.out', duration: 25 }, P)
        // ... the 9 pops out of the P, arcs over the word spinning, and lands in its place
        .fromTo(r.nine.current, { x: toP, y: 0, yPercent: 0, rotation: -360, scale: 0.4, opacity: 0 },
          { x: 0, rotation: 0, scale: 1, opacity: 1, ease: 'power1.inOut', duration: 16 }, P + 8)
        .fromTo(r.nine.current, { yPercent: 0 }, { yPercent: -85, ease: 'power2.out', duration: 8 }, P + 8)
        .to(r.nine.current, { yPercent: 0, ease: 'bounce.out', duration: 8 }, P + 16)
        .to(r.logo.current, { scale: 1.06, duration: 25 }, P + 25)
        if (r.overlay.current) tl.fromTo(r.overlay.current, { opacity: 0 }, { opacity: 1, duration: 15 }, P + 20)
        tl.to(motion, { opacity: 0, y: -60, duration: 8 }, P + 50)
    })
    // The canvas is faded by GSAP only inside the timeline; make sure it is visible again if we are scrolled back to the top.
    return () => { ctx.revert(); ro?.disconnect(); window.removeEventListener('resize', measure); window.removeEventListener('orientationchange', measure) }
  }, [])
}

export function useReveal() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) =>
        gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }))
    })
    return () => ctx.revert()
  }, [])
}
