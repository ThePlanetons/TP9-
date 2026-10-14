/// <reference types="vite/client" />

/** Only PUBLIC values belong in VITE_* variables — they are embedded in the browser bundle. */
interface ImportMetaEnv {
  /** Canonical site URL, no trailing slash. Used for canonical/OG tags, sitemap and robots.txt. */
  readonly VITE_SITE_URL?: string
  /** Google Analytics 4 measurement ID (G-XXXXXXXXXX). Optional; analytics stay off when empty. */
  readonly VITE_GA_ID?: string
  /** Optional override of the form endpoint (e.g. the private FormSubmit alias URL). */
  readonly VITE_FORM_ENDPOINT?: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
