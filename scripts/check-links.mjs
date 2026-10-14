/**
 * Link checker:  npm run check:links            (internal links + anchors only, offline-safe)
 *                npm run check:links -- --external   (also HEAD-requests every https:// link; needs internet)
 * Scans src/ and index.html for href values and verifies:
 *   - internal paths exist in ROUTES   - #anchors / /#anchors match an id="…" in the source
 *   - mailto: addresses look valid     - external URLs respond (with --external)
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const files = []
;(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f)
    if (statSync(p).isDirectory()) walk(p)
    else if (/\.(tsx?|html)$/.test(f)) files.push(p)
  }
})(join(root, 'src'))
files.push(join(root, 'index.html'))

const cfg = readFileSync(join(root, 'src/config/site.ts'), 'utf8')
const routes = [...(cfg.match(/ROUTES = \[([^\]]*)\]/)?.[1] ?? "'/'").matchAll(/'([^']+)'/g)].map((m) => m[1])
const src = files.map((f) => readFileSync(f, 'utf8')).join('\n')
const ids = new Set([...src.matchAll(/\bid=["']([^"'{}]+)["']/g)].map((m) => m[1]))

// Only look at live code: drop // line comments and /* */ blocks so old commented-out markup isn't reported.
const live = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')
const hrefs = new Set([...live.matchAll(/href[=:]\s*["'`]([^"'`{}$]+)["'`]/g)].map((m) => m[1]))

const bad = [], external = [], ok = []
for (const h of hrefs) {
  if (h.startsWith('__SITE_URL__')) continue // build-time placeholder
  if (h === '#' || h === '') { bad.push([h, 'empty link']); continue }
  if (h.startsWith('mailto:')) { /^mailto:[^@\s]+@[^@\s]+\.[a-z]{2,}/i.test(h) ? ok.push(h) : bad.push([h, 'invalid mailto']); continue }
  if (/^https?:\/\//.test(h)) { /fonts\.(googleapis|gstatic)|googletagmanager|schema\.org|formsubmit/.test(h) || external.push(h); continue }
  if (h.startsWith('/') && !h.startsWith('/#') && /\.[a-z0-9]+$/i.test(h)) continue // static asset
  const [path, hash] = h.startsWith('#') ? ['/', h.slice(1)] : h.split('#')
  if (path && !routes.includes(path.replace(/\/+$/, '') || '/')) { bad.push([h, `route ${path} does not exist`]); continue }
  if (hash && !ids.has(hash)) { bad.push([h, `no element with id="${hash}"`]); continue }
  ok.push(h)
}
console.log(`internal OK: ${ok.length}   external: ${external.length}   routes: ${routes.join(' ')}`)
if (process.argv.includes('--external')) {
  for (const u of external) {
    try {
      const r = await fetch(u, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(12000), headers: { 'user-agent': 'Mozilla/5.0 link-check' } })
      if (r.status >= 400) bad.push([u, `HTTP ${r.status}`]); else console.log('  ✓', r.status, u)
    } catch (e) { bad.push([u, `unreachable (${e.cause?.code || e.message})`]) }
  }
} else if (external.length) console.log('external links (run with --external to verify):\n  ' + external.join('\n  '))
if (bad.length) { console.error('\nBROKEN:'); for (const [h, why] of bad) console.error(`  ✗ ${h} — ${why}`); process.exit(1) }
console.log('no broken links found')
