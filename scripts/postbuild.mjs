/**
 * Runs automatically after `npm run build` (npm "postbuild" hook). Plain Node, no dependencies.
 *  - replaces __SITE_URL__ in dist/index.html with VITE_SITE_URL (canonical, Open Graph, JSON-LD)
 *  - injects the Content-Security-Policy <meta> (host headers in public/_headers etc. are the primary source)
 *  - writes dist/sitemap.xml and dist/robots.txt
 *  - warns if the title / description are outside recommended SEO lengths
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
if (!existsSync(join(dist, 'index.html'))) { console.error('postbuild: dist/index.html not found — run the build first'); process.exit(1) }

function envFromFiles() {
  const out = {}
  for (const f of ['.env', '.env.production', '.env.local', '.env.production.local']) {
    const p = join(root, f)
    if (!existsSync(p)) continue
    for (const line of readFileSync(p, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
      if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
  }
  return out
}
const env = { ...envFromFiles(), ...process.env }
const SITE_URL = (env.VITE_SITE_URL || 'https://theplanet9.com').replace(/\/+$/, '')
if (!env.VITE_SITE_URL) console.warn(`⚠ VITE_SITE_URL not set — using ${SITE_URL}. Set it to your real domain (see README).`)

const ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
]

// index.html
let html = readFileSync(join(dist, 'index.html'), 'utf8').replaceAll('__SITE_URL__', SITE_URL)
const csp = readFileSync(join(root, 'scripts', 'csp.txt'), 'utf8').trim()
if (!html.includes('http-equiv="Content-Security-Policy"')) {
  html = html.replace('<meta charset="UTF-8" />', `<meta charset="UTF-8" />\n    <meta http-equiv="Content-Security-Policy" content="${csp}" />`)
}
writeFileSync(join(dist, 'index.html'), html)

// sitemap + robots
const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${ROUTES.map(
  (r) => `  <url>\n    <loc>${SITE_URL}${r.path === '/' ? '/' : r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
).join('\n')}\n</urlset>\n`
writeFileSync(join(dist, 'sitemap.xml'), sitemap)
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)

// SEO length warnings
const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1]?.replace(/&amp;/g, '&') ?? ''
const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] ?? ''
if (title.length === 0 || title.length > 60) console.warn(`⚠ title is ${title.length} chars (aim for ≤ 60)`)
if (desc.length < 70 || desc.length > 160) console.warn(`⚠ description is ${desc.length} chars (aim for 70–160)`)
console.log(`postbuild ✓  site=${SITE_URL}  title=${title.length}c  description=${desc.length}c  → sitemap.xml, robots.txt, CSP meta`)
