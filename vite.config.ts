import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split heavy, rarely-changing libraries so they cache independently of app code
        // (three.js is already lazy-loaded with the hero scene).
        manualChunks(id) {
          if (id.includes('/node_modules/three/')) return 'three'
          if (id.includes('/node_modules/gsap/') || id.includes('/node_modules/lenis/')) return 'motion'
        },
      },
    },
  },
})
