// // Shared mutable state: GSAP writes it, the R3F render loop reads it (no React re-renders).
// export const sceneState = { z: 0, fov: 35, spin: 0, k: 1 } // k: 1 = split layout (planet right), 0 = centred
// export const mouse = { x: 0, y: 0 }
// export const isMobile = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
// Shared mutable state: GSAP writes it, the R3F render loop reads it (no React re-renders).
// export const sceneState = { z: 0, fov: 35, spin: 0, k: 1, orbit: 0, dissolve: 0, grow: 0, fade: 1, anchorY: 0.3 } // k: 1 = split layout; orbit/dissolve: service icons; grow: planet fills screen; fade: tunnel; anchorY: mobile title position (0-1)
// export const mouse = { x: 0, y: 0 }
// export const isMobile = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
export const sceneState = { z: 0, fov: 35, spin: 0, k: 1, orbit: 0, dissolve: 0, grow: 0, fade: 1, anchorY: 0.76, maxS: 0.3 }
export const mouse = { x: 0, y: 0 }
export const isMobile = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
/** Same breakpoint as the hero copy (Tailwind `lg`): side-by-side only on wide landscape screens. */
export const isWideLayout = (w: number, h: number) => w >= 1024 && w / h >= 1.1