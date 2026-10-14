import { AnchorHTMLAttributes, MouseEvent, forwardRef, useEffect, useState } from 'react'

/**
 * Tiny History-API router (no dependency). Pages: see ROUTES in config/site.ts.
 * Anything else renders the custom 404 page.
 */
const EVENT = 'tp9:navigate'
const clean = (p: string) => p.replace(/\/+$/, '') || '/'
export const currentPath = () => clean(window.location.pathname)

export function usePath() {
  const [path, setPath] = useState(currentPath)
  useEffect(() => {
    const on = () => setPath(currentPath())
    window.addEventListener('popstate', on)
    window.addEventListener(EVENT, on)
    return () => {
      window.removeEventListener('popstate', on)
      window.removeEventListener(EVENT, on)
    }
  }, [])
  return path
}

export function navigate(to: string) {
  const url = new URL(to, window.location.origin)
  if (url.origin !== window.location.origin) { window.location.href = to; return }
  window.history.pushState({}, '', url.pathname + url.search + url.hash)
  window.dispatchEvent(new Event(EVENT))
  if (!url.hash) window.scrollTo(0, 0)
}

const isModified = (e: MouseEvent) => e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0

/** Internal link: client-side navigation between pages, normal anchor behaviour for everything else. */
export const Link = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }>(function Link({ href, onClick, ...rest }, ref) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || isModified(e) || rest.target === '_blank') return
    const url = new URL(href, window.location.origin)
    if (url.origin !== window.location.origin) return
    // Same page + hash → let the browser jump to the anchor.
    if (clean(url.pathname) === currentPath() && url.hash) return
    e.preventDefault()
    navigate(url.pathname + url.search + url.hash)
  }
  return <a ref={ref} href={href} onClick={handle} {...rest} />
})
