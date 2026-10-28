// /**
//  * Single source of truth for business details, so nothing is hard-coded across components.
//  * Everything here is PUBLIC (it ships to the browser). Never put passwords, private API keys or tokens in this file —
//  * see README → "Secrets".
//  */
// export const SITE = {
//   name: 'THE PLANET 9',
//   shortName: 'TP9',
//   tagline: 'A Digital Branding House',
//   title: 'THE PLANET 9 | Websites & Digital Branding House',
//   description:
//     'THE PLANET 9 is a digital branding house. We design and build fast websites, 3D web experiences and e-commerce stores that make your brand impossible to ignore.',
//   email: 'theplanet9official@gmail.com',
//   /** Canonical origin. Set VITE_SITE_URL in your host's environment settings once the domain is final. */
//   url: (import.meta.env.VITE_SITE_URL || 'https://theplanet9.com').replace(/\/+$/, ''),
//   gaId: import.meta.env.VITE_GA_ID || '',
//   /**
//    * Where the contact form is delivered. Default: FormSubmit (https://formsubmit.co), which forwards submissions to the
//    * email above without any API key in the browser. The first submission triggers a one-time activation email.
//    */
//   formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || 'https://formsubmit.co/ajax/theplanet9official@gmail.com',
//   /** Fill these in with the real company profiles; empty ones are not rendered (no placeholder links). */
//   social: {
//     instagram: '',
//     linkedin: '',
//     youtube: '',
//     x: '',
//   },
// } as const

// export const SERVICES = [
//   'Web Development',
//   '3D Experiences',
//   'Branding',
//   'UI/UX Design',
//   'Digital Marketing',
//   'Content Creation',
// ] as const

// /** Used by the privacy policy and terms pages. Review with a lawyer before relying on them. */
// export const LEGAL = {
//   lastUpdated: 'October 14, 2026',
//   governingLaw: 'India',
// } as const

// /** Pages that exist. Used by the router, sitemap and link checker. */
// export const ROUTES = ['/', '/privacy', '/terms'] as const
/**
 * Single source of truth for business details, so nothing is hard-coded across components.
 * Everything here is PUBLIC (it ships to the browser). Never put passwords, private API keys or tokens in this file —
 * see README → "Secrets".
 */
export const SITE = {
  name: 'THE PLANET 9',
  shortName: 'TP9',
  tagline: 'A Digital Branding House',
  title: 'THE PLANET 9',
  description:
    'THE PLANET 9 is a digital branding house. We design and build fast websites, 3D web experiences and e-commerce stores that make your brand impossible to ignore.',
  email: 'theplanet9official@gmail.com',
  /** Canonical origin. Set VITE_SITE_URL in your host's environment settings once the domain is final. */
  url: (import.meta.env.VITE_SITE_URL || 'https://theplanet9.com').replace(/\/+$/, ''),
  gaId: import.meta.env.VITE_GA_ID || '',
  /**
   * Contact form delivery. The form posts to YOUR serverless function first (api/contact.js on Vercel), which emails
   * theplanet9official@gmail.com with the key kept server-side. Where no function exists (plain `npm run dev`, or
   * another host) it falls back to FormSubmit, which needs a one-time email activation.
   */
  formApi: '/api/contact',
  formFallback: import.meta.env.VITE_FORM_ENDPOINT || 'https://formsubmit.co/ajax/theplanet9official@gmail.com',
  /**
   * Social profiles shown as icons in the footer. REPLACE every YOUR_HANDLE with the real profile, e.g.
   * 'https://instagram.com/theplanet9official'. Set a platform to '' to hide its icon.
   * (`npm run check:links` fails until no YOUR_ placeholder is left.)
   */
  social: {
    instagram: 'https://instagram.com/YOUR_HANDLE',
    linkedin: 'https://www.linkedin.com/company/YOUR_HANDLE',
    youtube: 'https://www.youtube.com/@YOUR_HANDLE',
    facebook: 'https://www.facebook.com/YOUR_HANDLE',
    x: 'https://x.com/YOUR_HANDLE',
  },
} as const

export const SERVICES = [
  'Web Development',
  '3D Experiences',
  'Branding',
  'UI/UX Design',
  'Digital Marketing',
  'Content Creation',
] as const

/** Used by the privacy policy and terms pages. Review with a lawyer before relying on them. */
export const LEGAL = {
  lastUpdated: 'October 14, 2026',
  governingLaw: 'India',
} as const

/** Pages that exist. Used by the router, sitemap and link checker. */
export const ROUTES = ['/', '/privacy', '/terms'] as const
