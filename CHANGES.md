# TP9 — changes since your `tp9LA.zip`

16 files in the patch: **15 modified + 1 new** (`api/contact.js`), plus a cleaned `README.md`.
Every file is available on its own in `changed-files/` (same folder structure as your project), and `changes.patch` contains all the diffs below.

## How to apply to your local code (pick one)

1. **One command (recommended)** — put `changes.patch` in your project root, then:
   ```bash
   git apply --check changes.patch   # dry run
   git apply changes.patch
   ```
2. **File by file** — copy each file from `changed-files/` over your file (create the `api/` folder for `contact.js`). Then review with `git diff`.
3. **By hand** — use the diffs below (lines starting with `-` are removed, `+` are added).

Then replace `README.md` with `changed-files/README.md` (yours has stray UTF-16 characters at the end — `# TP9-` from a PowerShell `echo >>` — which makes git treat it as binary, so it is not in the patch).

## Before it works on Vercel — 3 things to do

1. **Email key:** sign up at https://resend.com **with theplanet9official@gmail.com** → API Keys → create one. In Vercel → Project → Settings → Environment Variables add `RESEND_API_KEY` = `re_…` (Production and Preview) → **Redeploy**. (Resend's free sender can only deliver to the email the account was created with — that is why it must be your official address.)
2. **Social links:** replace each `YOUR_HANDLE` in `src/config/site.ts` → `social`. Set a platform to `''` to hide its icon.
3. Test: submit the form on the live site. If no email arrives, Vercel → Logs → `/api/contact` shows the exact reason.

## What was tested

- `api/contact.js`: 31 unit tests — validation, exact email (To / Reply-To / From), HTML/header-injection escaping, honeypot, rate limit, wrong-origin block, missing key, Resend failure (Resend itself was mocked; I cannot reach the internet from here).
- Browser (real Chromium): 22 end-to-end checks — form → `/api/contact` → email, fallback, error states, footer icons, and that only one orange exists in the computed styles.
- Mobile layout: checked at 360×640, 393×851, 412×915, 600×880 and 768×1024 through the whole orbit/dissolve scroll.

## Trade-off to know about

`#F64618` with white text is 3.6 : 1 contrast (WCAG AA wants 4.5 : 1 for small text); it only passes for large text. Black text on the orange passes (5.8 : 1). I used your orange exactly as asked — if you ever want AA on the small button labels, change `text-white` to `text-black` on the orange buttons.

---

## 1. Orange: one colour (#F64618) everywhere

The "different" orange was the `brand-deep` (#CC360D) colour I added earlier for contrast. It is removed; every button, label, hover and the 404 page now use exactly `#F64618` (`brand` in Tailwind).

### `tailwind.config.js`

```diff
--- your code: tailwind.config.js
+++ new: tailwind.config.js
@@ -4,10 +4,8 @@
     extend: {
       fontFamily: { display: ['Rubik', 'Inter', 'sans-serif'], sans: ['"Space Grotesk"', 'Inter', 'sans-serif'] },
       colors: {
-        // Bright brand orange: big display type, graphics, backgrounds that carry black text.
+        // THE one brand orange. Use it everywhere (backgrounds, buttons, accents, text).
         brand: '#F64618',
-        // Slightly deeper orange for SMALL text and white-on-orange buttons: 5.1:1 on white (brand orange is only 3.6:1).
-        'brand-deep': '#CC360D',
       },
     },
   },
```

### `src/components/hero/HeroOverlay.tsx`

```diff
--- your code: src/components/hero/HeroOverlay.tsx
+++ new: src/components/hero/HeroOverlay.tsx
@@ -250,7 +250,7 @@
     className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-start px-6 pb-8 pt-24 text-center sm:pt-28 md:px-16 lg:items-start lg:justify-center lg:pt-0 lg:text-left"
   >
     <div className="max-w-xl">
-      <p className="text-xs font-medium tracking-[0.22em] text-brand-deep md:text-sm">A DIGITAL BRANDING HOUSE</p>
+      <p className="text-xs font-medium tracking-[0.22em] text-brand md:text-sm">A DIGITAL BRANDING HOUSE</p>
 
       <h1 id="hero-title" className="mt-5 font-display text-[clamp(3rem,15vw,5rem)] font-black leading-[0.9] tracking-[-0.02em] lg:text-[6.2vw]">
         THE
@@ -266,7 +266,7 @@
         <Link
           href="/#contact"
           onClick={() => trackEvent('cta_click', { location: 'hero' })}
-          className="group pointer-events-auto inline-flex items-center gap-3 rounded-full bg-brand-deep px-7 py-4 text-xs font-bold tracking-[0.18em] text-white shadow-[0_10px_30px_-10px_rgba(204,54,13,.7)] transition duration-300 hover:-translate-y-0.5 hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
+          className="group pointer-events-auto inline-flex items-center gap-3 rounded-full bg-brand px-7 py-4 text-xs font-bold tracking-[0.18em] text-white shadow-[0_10px_30px_-10px_rgba(246,70,24,.7)] transition duration-300 hover:-translate-y-0.5 hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
         >
           START A PROJECT
           <ArrowRight size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
@@ -274,7 +274,7 @@
 
         <Link
           href="/#work"
-          className="pointer-events-auto py-3 text-xs font-bold tracking-[0.18em] underline decoration-black/30 decoration-2 underline-offset-8 transition hover:decoration-brand-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
+          className="pointer-events-auto py-3 text-xs font-bold tracking-[0.18em] underline decoration-black/30 decoration-2 underline-offset-8 transition hover:decoration-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
         >
           EXPLORE OUR WORK
         </Link>
```

### `src/components/navigation/Navbar.tsx`

```diff
--- your code: src/components/navigation/Navbar.tsx
+++ new: src/components/navigation/Navbar.tsx
@@ -63,12 +63,12 @@
         {/* desktop */}
         <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
           {LINKS.map((l) => (
-            <Link key={l.label} href={l.href} className={`py-2 transition-colors hover:text-brand-deep ${focusRing}`}>{l.label}</Link>
+            <Link key={l.label} href={l.href} className={`py-2 transition-colors hover:text-brand ${focusRing}`}>{l.label}</Link>
           ))}
           <Link
             href={CTA.href}
             onClick={() => trackEvent('cta_click', { location: 'navbar' })}
-            className={`rounded-full bg-brand-deep px-6 py-3 font-bold text-white transition hover:bg-black ${focusRing}`}
+            className={`rounded-full bg-brand px-6 py-3 font-bold text-white transition hover:bg-black ${focusRing}`}
           >
             {CTA.label}
           </Link>
@@ -107,7 +107,7 @@
           <Link
             href={CTA.href}
             onClick={() => { setOpen(false); trackEvent('cta_click', { location: 'mobile_menu' }) }}
-            className={`mt-8 rounded-full bg-brand-deep px-8 py-5 text-center text-xs font-bold tracking-[0.18em] text-white ${focusRing}`}
+            className={`mt-8 rounded-full bg-brand px-8 py-5 text-center text-xs font-bold tracking-[0.18em] text-white ${focusRing}`}
           >
             {CTA.label}
           </Link>
```

### `src/components/sections/Contact.tsx`

```diff
--- your code: src/components/sections/Contact.tsx
+++ new: src/components/sections/Contact.tsx
@@ -224,7 +224,7 @@
                 type="submit"
                 disabled={sending}
                 onClick={() => trackEvent('cta_click', { location: 'contact_form' })}
-                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand-deep px-8 py-4 text-xs font-bold tracking-[0.18em] text-white shadow-[0_10px_30px_-10px_rgba(204,54,13,.7)] transition hover:-translate-y-0.5 hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
+                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand px-8 py-4 text-xs font-bold tracking-[0.18em] text-white shadow-[0_10px_30px_-10px_rgba(246,70,24,.7)] transition hover:-translate-y-0.5 hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
               >
                 {sending ? 'SENDING…' : 'SEND MY ENQUIRY'}
                 {!sending && <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />}
```

### `src/components/ui/CookieBanner.tsx`

```diff
--- your code: src/components/ui/CookieBanner.tsx
+++ new: src/components/ui/CookieBanner.tsx
@@ -38,7 +38,7 @@
         Details in our <Link href="/privacy#cookies" className="font-bold underline underline-offset-2 hover:no-underline">Privacy Policy</Link>.
       </p>
       <div className="mt-4 flex flex-wrap gap-3">
-        <button ref={acceptRef} type="button" onClick={() => choose(true)} className={`${btn} bg-black text-white hover:bg-brand-deep`}>ACCEPT ANALYTICS</button>
+        <button ref={acceptRef} type="button" onClick={() => choose(true)} className={`${btn} bg-black text-white hover:bg-brand`}>ACCEPT ANALYTICS</button>
         <button type="button" onClick={() => choose(false)} className={`${btn} border border-black hover:bg-black hover:text-white`}>ESSENTIAL ONLY</button>
       </div>
     </section>
```

### `src/components/legal/LegalLayout.tsx`

```diff
--- your code: src/components/legal/LegalLayout.tsx
+++ new: src/components/legal/LegalLayout.tsx
@@ -5,7 +5,7 @@
   return (
     <article className="bg-white px-6 pb-24 pt-32 md:px-16 md:pt-40">
       <div className="mx-auto max-w-3xl">
-        <p className="text-xs font-bold tracking-[0.22em] text-brand-deep">LEGAL</p>
+        <p className="text-xs font-bold tracking-[0.22em] text-brand">LEGAL</p>
         <h1 className="mt-3 font-display text-[clamp(2.5rem,8vw,4.5rem)] font-black uppercase leading-[0.95] tracking-tight">{title}</h1>
         <p className="mt-4 text-sm text-black/70">Last updated: {LEGAL.lastUpdated}</p>
         <p className="mt-8 text-lg leading-relaxed text-black/80">{intro}</p>
```

### `src/pages/NotFound.tsx`

```diff
--- your code: src/pages/NotFound.tsx
+++ new: src/pages/NotFound.tsx
@@ -11,7 +11,7 @@
         <p className="font-display text-[clamp(7rem,28vw,18rem)] font-black leading-[0.8] tracking-tighter text-brand">404</p>
         <h1 className="mt-6 font-display text-3xl font-black uppercase md:text-5xl">Lost in space</h1>
         <p className="mx-auto mt-4 max-w-md text-base text-black/75 md:text-lg">This page drifted out of orbit — it may have moved, or the link is wrong.</p>
-        <Link href="/" className="group mt-10 inline-flex items-center gap-3 rounded-full bg-brand-deep px-8 py-4 text-xs font-bold tracking-[0.18em] text-white transition hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
+        <Link href="/" className="group mt-10 inline-flex items-center gap-3 rounded-full bg-brand px-8 py-4 text-xs font-bold tracking-[0.18em] text-white transition hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
           BACK TO HOME <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
         </Link>
       </div>
```

### `public/404.html`

```diff
--- your code: public/404.html
+++ new: public/404.html
@@ -16,7 +16,7 @@
       .n{font-family:Rubik,'Arial Black',sans-serif;font-weight:900;font-size:clamp(7rem,28vw,18rem);line-height:.8;letter-spacing:-.04em;color:#F64618;margin:0}
       h1{font-family:Rubik,'Arial Black',sans-serif;font-weight:900;text-transform:uppercase;font-size:clamp(1.75rem,5vw,3rem);margin:1.5rem 0 0}
       p{max-width:28rem;margin:1rem auto 0;font-size:1.0625rem;line-height:1.6;color:rgba(0,0,0,.75)}
-      a.b{display:inline-block;margin-top:2.5rem;padding:1.1rem 2rem;border-radius:999px;background:#CC360D;color:#fff;font-weight:700;font-size:.75rem;letter-spacing:.18em;text-decoration:none}
+      a.b{display:inline-block;margin-top:2.5rem;padding:1.1rem 2rem;border-radius:999px;background:#F64618;color:#fff;font-weight:700;font-size:.75rem;letter-spacing:.18em;text-decoration:none}
       a.b:hover,a.b:focus-visible{background:#000;outline:2px solid #000;outline-offset:4px}
     </style>
   </head>
```

## 2. Contact form → email now sent by your own server function

`api/contact.js` (NEW file, see `changed-files/api/contact.js`) is a Vercel serverless function. **To** = theplanet9official@gmail.com, **Reply-To** = the client, sender name = the client's name. The key lives only in Vercel environment variables. `contact.ts` posts to it first and only falls back to FormSubmit where no function exists (plain `npm run dev`).

### `src/config/site.ts`

```diff
--- your code: src/config/site.ts
+++ new: src/config/site.ts
@@ -15,16 +15,23 @@
   url: (import.meta.env.VITE_SITE_URL || 'https://theplanet9.com').replace(/\/+$/, ''),
   gaId: import.meta.env.VITE_GA_ID || '',
   /**
-   * Where the contact form is delivered. Default: FormSubmit (https://formsubmit.co), which forwards submissions to the
-   * email above without any API key in the browser. The first submission triggers a one-time activation email.
+   * Contact form delivery. The form posts to YOUR serverless function first (api/contact.js on Vercel), which emails
+   * theplanet9official@gmail.com with the key kept server-side. Where no function exists (plain `npm run dev`, or
+   * another host) it falls back to FormSubmit, which needs a one-time email activation.
+   */
+  formApi: '/api/contact',
+  formFallback: import.meta.env.VITE_FORM_ENDPOINT || 'https://formsubmit.co/ajax/theplanet9official@gmail.com',
+  /**
+   * Social profiles shown as icons in the footer. REPLACE every YOUR_HANDLE with the real profile, e.g.
+   * 'https://instagram.com/theplanet9official'. Set a platform to '' to hide its icon.
+   * (`npm run check:links` fails until no YOUR_ placeholder is left.)
    */
-  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || 'https://formsubmit.co/ajax/theplanet9official@gmail.com',
-  /** Fill these in with the real company profiles; empty ones are not rendered (no placeholder links). */
   social: {
-    instagram: '',
-    linkedin: '',
-    youtube: '',
-    x: '',
+    instagram: 'https://instagram.com/YOUR_HANDLE',
+    linkedin: 'https://www.linkedin.com/company/YOUR_HANDLE',
+    youtube: 'https://www.youtube.com/@YOUR_HANDLE',
+    facebook: 'https://www.facebook.com/YOUR_HANDLE',
+    x: 'https://x.com/YOUR_HANDLE',
   },
 } as const
```

### `src/lib/contact.ts`

```diff
--- your code: src/lib/contact.ts
+++ new: src/lib/contact.ts
@@ -101,9 +101,44 @@
 
 export type SubmitResult = { ok: true } | { ok: false; reason: 'network' | 'rejected' | 'timeout' }
 
+type Attempt = 'ok' | 'missing' | 'rejected' | 'timeout' | 'network'
+
+async function post(url: string, body: unknown, fetchImpl: typeof fetch): Promise<Attempt> {
+  const ctrl = new AbortController()
+  const timer = setTimeout(() => ctrl.abort(), 15000)
+  try {
+    const res = await fetchImpl(url, {
+      method: 'POST',
+      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
+      body: JSON.stringify(body),
+      signal: ctrl.signal,
+    })
+    // 404/405 = there is no serverless function on this host (e.g. `npm run dev`) → caller may use the fallback.
+    if (res.status === 404 || res.status === 405) return 'missing'
+    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; success?: string | boolean }
+    return res.ok && (data.ok === true || data.success === true || data.success === 'true') ? 'ok' : 'rejected'
+  } catch (err) {
+    return (err as Error).name === 'AbortError' ? 'timeout' : 'network'
+  } finally {
+    clearTimeout(timer)
+  }
+}
+
+const toResult = (a: Attempt): SubmitResult => (a === 'ok' ? { ok: true } : { ok: false, reason: a === 'missing' ? 'rejected' : a })
+
 export async function sendEnquiry(v: ContactValues, fetchImpl: typeof fetch = fetch): Promise<SubmitResult> {
   const website = normaliseWebsite(v.website) || ''
-  const payload = {
+
+  // 1) Primary: our own function → email to theplanet9official@gmail.com (Reply-To = the client).
+  const api = await post(SITE.formApi, {
+    name: clean(v.name), email: clean(v.email), phone: clean(v.phone), company: clean(v.company), website,
+    services: v.services, budget: v.budget, timeline: v.timeline, source: v.source, message: clean(v.message),
+    consent: true, hp: clean(v.hp),
+  }, fetchImpl)
+  if (api !== 'missing') return toResult(api)
+
+  // 2) Fallback (no function on this host): FormSubmit.
+  const fallback = await post(SITE.formFallback, {
     name: clean(v.name),
     email: clean(v.email),
     phone: clean(v.phone),
@@ -117,24 +152,8 @@
     privacy_policy_accepted: 'yes',
     _subject: `New project enquiry from ${clean(v.name)} — ${SITE.name}`,
     _template: 'table',
-    _captcha: 'false', // AJAX mode has no captcha; the honeypot + time trap above do the filtering
+    _captcha: 'false',
     _honey: '',
-  }
-  const ctrl = new AbortController()
-  const timer = setTimeout(() => ctrl.abort(), 15000)
-  try {
-    const res = await fetchImpl(SITE.formEndpoint, {
-      method: 'POST',
-      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
-      body: JSON.stringify(payload),
-      signal: ctrl.signal,
-    })
-    const data = (await res.json().catch(() => ({}))) as { success?: string | boolean }
-    if (res.ok && (data.success === true || data.success === 'true')) return { ok: true }
-    return { ok: false, reason: 'rejected' }
-  } catch (err) {
-    return { ok: false, reason: (err as Error).name === 'AbortError' ? 'timeout' : 'network' }
-  } finally {
-    clearTimeout(timer)
-  }
+  }, fetchImpl)
+  return toResult(fallback)
 }
```

### `.env.example`

```diff
--- your code: .env.example
+++ new: .env.example
@@ -1,4 +1,4 @@
-# Copy to `.env.production` (or set these in your host's dashboard → Environment variables).
+# ───────── PUBLIC (browser) variables — copy to `.env.production` or set in Vercel → Environment Variables ─────────
 # ⚠ Anything starting with VITE_ is embedded in the public browser bundle. NEVER put private keys, passwords or tokens here.
 
 # Your final domain, no trailing slash (canonical URLs, social previews, sitemap.xml, robots.txt)
@@ -7,6 +7,12 @@
 # Google Analytics 4 measurement ID (G-XXXXXXXXXX). Public by design. Leave empty to keep analytics off.
 VITE_GA_ID=
 
-# Optional: private FormSubmit endpoint (the random-alias URL FormSubmit emails you after activation)
-# so your address isn't in the bundle. Leave empty to use https://formsubmit.co/ajax/<email from src/config/site.ts>.
+# Optional: FormSubmit fallback endpoint (only used where the /api/contact function doesn't exist, e.g. `npm run dev`).
 VITE_FORM_ENDPOINT=
+
+# ───────── SERVER-ONLY variables — set these ONLY in Vercel → Project → Settings → Environment Variables ─────────
+# (no VITE_ prefix = never sent to the browser. Do NOT put real values in this file or commit them.)
+#
+#   RESEND_API_KEY=re_xxxxxxxxxxxxxxxx     required — contact form email (create at https://resend.com, signed up with theplanet9official@gmail.com)
+#   CONTACT_TO=theplanet9official@gmail.com   optional — where enquiries are delivered (this is the default)
+#   CONTACT_FROM_ADDRESS=onboarding@resend.dev  optional — sender address; switch to e.g. website@yourdomain.com after verifying your domain in Resend
```

## 3. Mobile: mockups no longer overlap each other or the planet

On portrait screens the three mockups now sit in fixed slots (laptop above the planet, shop below, phone beside it) with only a gentle sway, instead of circling through each other. The fit calculation also accounts for the taller layout.

### `src/components/3d/ServiceOrbit.tsx`

```diff
--- your code: src/components/3d/ServiceOrbit.tsx
+++ new: src/components/3d/ServiceOrbit.tsx
@@ -234,6 +234,13 @@
   return { t: toTex(c), aspect: w / h }
 }
 
+/** Portrait slots (rig units; the rig is scaled down on phones, and a phone screen is ~2× taller than wide in these units). */
+const COMPACT: Record<string, { x: number; y: number; z: number; sway: number }> = {
+  laptop: { x: -0.5, y: 4.9, z: 0.6, sway: 0.5 },
+  phone: { x: 3.1, y: 0.3, z: 1.2, sway: 0.3 },
+  shop: { x: 0.4, y: -4.9, z: 0.6, sway: 0.5 },
+}
+
 export default function ServiceOrbit() {
   const [ready, setReady] = useState(false)
   const refs = useRef<(Group | null)[]>([])
@@ -252,15 +259,24 @@
     const phi = sceneState.orbit * Math.PI * 1.1, t = state.clock.elapsedTime
     // Portrait / small screens: tighter orbit + slightly bigger mockups (the whole rig is scaled down there), 3 devices only.
     const compact = !isWideLayout(state.size.width, state.size.height)
-    const rx = compact ? 3.0 : 3.9, rz = compact ? 2.6 : 3.3, ds = compact ? 1.25 : 1
+    const rx = 3.9, rz = 3.3, ds = compact ? 1.25 : 1
     // Portrait start state = a clean planet + rings only. The mockups fade in while the planet rises to the centre (k: 1 → 0).
     const kk = Math.min(1, Math.max(0, (0.65 - sceneState.k) / 0.45))
     const show = compact ? kk * kk * (3 - 2 * kk) : 1
     assets.forEach(({ it }, i) => {
       const g = refs.current[i]
       if (!g) return
-      const a = (it.a * Math.PI) / 180 + phi
-      g.position.set(Math.cos(a) * rx, it.y + Math.sin(t * 0.8 + i) * 0.06, Math.sin(a) * rz)
+      if (compact) {
+        // Portrait: fixed, NON-overlapping slots (they only sway a little as you scroll) — laptop above the planet,
+        // shop below, phone beside it. Each slot is separated vertically (or sits outside the planet), so mockups
+        // never cover each other or the planet, whatever the scroll position.
+        const c = COMPACT[it.kind]
+        if (!c) { g.visible = false; return } // desktop-only mockups (code, chart) are not shown on portrait screens
+        g.position.set(c.x + Math.sin(phi * 2 + i * 2.1) * c.sway, c.y + Math.sin(t * 0.8 + i) * 0.06, c.z)
+      } else {
+        const a = (it.a * Math.PI) / 180 + phi
+        g.position.set(Math.cos(a) * rx, it.y + Math.sin(t * 0.8 + i) * 0.06, Math.sin(a) * rz)
+      }
       g.quaternion.copy(camera.quaternion) // always face the viewer
       const d = Math.min(1, Math.max(0, (sceneState.dissolve - i * 0.08) / 0.5)) // staggered dissolve
       g.scale.setScalar((1 - 0.35 * d) * ds)
```

### `src/components/3d/Saturn.tsx`

```diff
--- your code: src/components/3d/Saturn.tsx
+++ new: src/components/3d/Saturn.tsx
@@ -191,7 +191,8 @@
     // ~5.3 / 4.7 = half-width of the assembly in planet units, 2.95 = half-height (the tilted ring's near side is magnified by perspective).
     const sFit = wide
       ? Math.min(1, (0.8 * hW) / 5.3, (0.78 * HALF_H) / 2.95)
-      : clamp((0.88 * hW) / 4.7, 0.2, 0.75)
+      // portrait: limited by width (ring ≈ 4.7) and by height (laptop above + shop below the planet ≈ 7.2 each way)
+      : clamp(Math.min((0.88 * hW) / 4.7, (0.8 * HALF_H) / 7.2), 0.2, 0.75)
     // Start size (k = 1): smaller beside the copy on wide screens; on portrait it must fit under the buttons.
     const sStart = wide ? sFit * 0.6 : Math.min(sFit, sceneState.maxS)
     const sBase = sFit * (1 - k) + sStart * k
```

## 4. Footer: social media icons

Instagram, LinkedIn, YouTube, Facebook and X icons under a "FOLLOW US" label (48px tap targets, open in a new tab). URLs come from `SITE.social` in `src/config/site.ts` (shown in section 2's diff). `check-links.mjs` now fails until the `YOUR_HANDLE` placeholders are replaced.

### `src/components/sections/Footer.tsx`

```diff
--- your code: src/components/sections/Footer.tsx
+++ new: src/components/sections/Footer.tsx
@@ -1,4 +1,4 @@
-import { ArrowUpRight, Instagram, Linkedin, Twitter, Youtube, type LucideIcon } from 'lucide-react'
+import { ArrowUpRight, Facebook, Instagram, Linkedin, Twitter, Youtube, type LucideIcon } from 'lucide-react'
 import { SERVICES, SITE } from '../../config/site'
 import { Link } from '../../lib/router'
 import { openCookieSettings } from '../../lib/consent'
@@ -35,11 +35,12 @@
   { label: 'Instagram', href: SITE.social.instagram, Icon: Instagram },
   { label: 'LinkedIn', href: SITE.social.linkedin, Icon: Linkedin },
   { label: 'YouTube', href: SITE.social.youtube, Icon: Youtube },
+  { label: 'Facebook', href: SITE.social.facebook, Icon: Facebook },
   { label: 'X (Twitter)', href: SITE.social.x, Icon: Twitter },
 ].filter((s) => s.href)
 
 const linkClass =
-  'inline-block py-1 text-base font-medium text-black/75 outline-none transition-transform duration-200 hover:translate-x-1 hover:text-brand-deep focus-visible:text-brand-deep focus-visible:underline focus-visible:underline-offset-4'
+  'inline-block py-1 text-base font-medium text-black/75 outline-none transition-transform duration-200 hover:translate-x-1 hover:text-brand focus-visible:text-brand focus-visible:underline focus-visible:underline-offset-4'
 
 export default function Footer() {
   return (
@@ -60,26 +61,29 @@
               </span>
             </Link>
             <p className="mt-6 text-lg font-medium text-black/75">{SITE.tagline}.</p>
-            <a href={`mailto:${SITE.email}`} className="mt-4 inline-flex items-center gap-1 break-all text-base font-bold underline underline-offset-4 hover:text-brand-deep">
+            <a href={`mailto:${SITE.email}`} className="mt-4 inline-flex items-center gap-1 break-all text-base font-bold underline underline-offset-4 hover:text-brand">
               {SITE.email} <ArrowUpRight size={16} aria-hidden />
             </a>
 
             {SOCIALS.length > 0 && (
-              <ul className="mt-8 flex items-center gap-3" aria-label="Social media">
-                {SOCIALS.map(({ label, href, Icon }) => (
-                  <li key={label}>
-                    <a
-                      href={href}
-                      target="_blank"
-                      rel="noopener noreferrer"
-                      aria-label={`${label} (opens in a new tab)`}
-                      className="flex h-12 w-12 items-center justify-center rounded-full border border-black/30 text-black outline-none transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:bg-brand focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
-                    >
-                      <Icon className="h-5 w-5" aria-hidden="true" />
-                    </a>
-                  </li>
-                ))}
-              </ul>
+              <div className="mt-8">
+                <p className="mb-3 text-xs font-bold tracking-[0.22em] text-black/70">FOLLOW US</p>
+                <ul className="flex flex-wrap items-center gap-3" aria-label="Social media">
+                  {SOCIALS.map(({ label, href, Icon }) => (
+                    <li key={label}>
+                      <a
+                        href={href}
+                        target="_blank"
+                        rel="noopener noreferrer"
+                        aria-label={`${label} (opens in a new tab)`}
+                        className="flex h-12 w-12 items-center justify-center rounded-full border border-black/30 text-black outline-none transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:bg-brand hover:text-white focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
+                      >
+                        <Icon className="h-5 w-5" aria-hidden="true" />
+                      </a>
+                    </li>
+                  ))}
+                </ul>
+              </div>
             )}
           </div>
```

### `scripts/check-links.mjs`

```diff
--- your code: scripts/check-links.mjs
+++ new: scripts/check-links.mjs
@@ -41,6 +41,9 @@
   if (hash && !ids.has(hash)) { bad.push([h, `no element with id="${hash}"`]); continue }
   ok.push(h)
 }
+// Placeholder social URLs left in the config
+const placeholders = [...cfg.matchAll(/'(https?:\/\/[^']*YOUR_[^']*)'/g)].map((m) => m[1])
+for (const u of placeholders) bad.push([u, 'placeholder in src/config/site.ts — replace YOUR_HANDLE with the real profile (or set it to \'\' to hide the icon)'])
 console.log(`internal OK: ${ok.length}   external: ${external.length}   routes: ${routes.join(' ')}`)
 if (process.argv.includes('--external')) {
   for (const u of external) {
```

## New file: `api/contact.js`

Full file: `changed-files/api/contact.js` (142 lines, nothing to edit; configured through Vercel environment variables).

## `README.md`

Updated setup notes (Resend/Vercel steps, social placeholders, single orange). Full file: `changed-files/README.md`.
