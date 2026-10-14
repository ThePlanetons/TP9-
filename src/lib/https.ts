/**
 * Client-side HTTPS safety net. The real redirect belongs on the host (see README → "HTTPS"); this catches the
 * case where a host serves the site over plain http. localhost / LAN preview URLs are left alone.
 */
const local = /^(localhost|127\.0\.0\.1|\[::1\]|.*\.local|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+)$/
if (typeof window !== 'undefined' && window.location.protocol === 'http:' && !local.test(window.location.hostname)) {
  window.location.replace('https://' + window.location.host + window.location.pathname + window.location.search + window.location.hash)
}
export {}
