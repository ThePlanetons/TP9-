// import { ArrowUpRight, Instagram, Linkedin, Twitter, Youtube, type LucideIcon } from 'lucide-react'
// import { SERVICES, SITE } from '../../config/site'
// import { Link } from '../../lib/router'
// import { openCookieSettings } from '../../lib/consent'

// /**
//  * THE PLANET 9 — Footer
//  * Uses the site's own fonts (Rubik for headings via `font-display`, Space Grotesk for body text) — no per-component font stacks.
//  * Only links that exist are rendered: pages, in-page anchors, the contact email, and social profiles you fill in under
//  * SITE.social in src/config/site.ts.
//  */
// type FooterLink = { label: string; href: string }

// const COLUMNS: { title: string; links: FooterLink[] }[] = [
//   {
//     title: 'Company',
//     links: [
//       { label: 'Work', href: '/#work' },
//       { label: 'Services', href: '/#services' },
//       { label: 'About', href: '/#about' },
//       { label: 'Contact', href: '/#contact' },
//     ],
//   },
//   { title: 'Services', links: SERVICES.map((s) => ({ label: s, href: '/#services' })) },
//   {
//     title: 'Legal',
//     links: [
//       { label: 'Privacy Policy', href: '/privacy' },
//       { label: 'Terms & Conditions', href: '/terms' },
//     ],
//   },
// ]

// const SOCIALS: { label: string; href: string; Icon: LucideIcon }[] = [
//   { label: 'Instagram', href: SITE.social.instagram, Icon: Instagram },
//   { label: 'LinkedIn', href: SITE.social.linkedin, Icon: Linkedin },
//   { label: 'YouTube', href: SITE.social.youtube, Icon: Youtube },
//   { label: 'X (Twitter)', href: SITE.social.x, Icon: Twitter },
// ].filter((s) => s.href)

// const linkClass =
//   'inline-block py-1 text-base font-medium text-black/75 outline-none transition-transform duration-200 hover:translate-x-1 hover:text-brand-deep focus-visible:text-brand-deep focus-visible:underline focus-visible:underline-offset-4'

// export default function Footer() {
//   return (
//     <footer className="w-full bg-white px-4 pb-6 pt-6 text-black sm:px-6 lg:px-10">
//       <div className="mx-auto max-w-7xl border-t border-black/15">
//         <div className="grid gap-14 pb-16 pt-14 lg:grid-cols-12 lg:gap-10 lg:pt-20">
//           {/* Brand */}
//           <div className="lg:col-span-4">
//             <Link
//               href="/"
//               aria-label="THE PLANET 9 — home"
//               className="inline-block font-display outline-none focus-visible:ring-4 focus-visible:ring-brand focus-visible:ring-offset-4"
//             >
//               <span className="block text-[clamp(2.5rem,6vw,4.25rem)] font-black uppercase leading-[0.9] tracking-tighter">The</span>
//               <span className="flex items-end gap-3 text-[clamp(2.5rem,6vw,4.25rem)] font-black uppercase leading-[0.9] tracking-tighter">
//                 Planet
//                 <span aria-hidden="true" className="inline-flex aspect-square h-[0.95em] items-center justify-center rounded-full bg-brand text-[0.6em] leading-none text-black">9</span>
//               </span>
//             </Link>
//             <p className="mt-6 text-lg font-medium text-black/75">{SITE.tagline}.</p>
//             <a href={`mailto:${SITE.email}`} className="mt-4 inline-flex items-center gap-1 break-all text-base font-bold underline underline-offset-4 hover:text-brand-deep">
//               {SITE.email} <ArrowUpRight size={16} aria-hidden />
//             </a>

//             {SOCIALS.length > 0 && (
//               <ul className="mt-8 flex items-center gap-3" aria-label="Social media">
//                 {SOCIALS.map(({ label, href, Icon }) => (
//                   <li key={label}>
//                     <a
//                       href={href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       aria-label={`${label} (opens in a new tab)`}
//                       className="flex h-12 w-12 items-center justify-center rounded-full border border-black/30 text-black outline-none transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:bg-brand focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
//                     >
//                       <Icon className="h-5 w-5" aria-hidden="true" />
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* Navigation */}
//           <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:col-span-8 lg:pl-8">
//             {COLUMNS.map((column, i) => (
//               <nav key={column.title} aria-labelledby={`footer-nav-${i}`} className={i === 2 ? 'col-span-2 sm:col-span-1' : undefined}>
//                 <h2 id={`footer-nav-${i}`} className="font-display text-sm font-black uppercase tracking-wide">{column.title}</h2>
//                 <ul className="mt-5 space-y-2">
//                   {column.links.map((link) => (
//                     <li key={link.label}>
//                       <Link href={link.href} className={linkClass}>{link.label}</Link>
//                     </li>
//                   ))}
//                   {i === 2 && (
//                     <li>
//                       <button type="button" onClick={openCookieSettings} className={`${linkClass} text-left`}>Cookie settings</button>
//                     </li>
//                   )}
//                 </ul>
//               </nav>
//             ))}
//           </div>
//         </div>

//         {/* Bottom bar */}
//         <div className="border-t border-black/15 pt-6">
//           <div className="flex flex-col gap-2 text-sm text-black/70 sm:flex-row sm:items-center sm:justify-between">
//             <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
//             <p>Websites &amp; digital experiences, made to be noticed.</p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }
import { ArrowUpRight, Facebook, Instagram, Linkedin, Twitter, Youtube, type LucideIcon } from 'lucide-react'
import { SERVICES, SITE } from '../../config/site'
import { Link } from '../../lib/router'
import { openCookieSettings } from '../../lib/consent'

/**
 * THE PLANET 9 — Footer
 * Uses the site's own fonts (Rubik for headings via `font-display`, Space Grotesk for body text) — no per-component font stacks.
 * Only links that exist are rendered: pages, in-page anchors, the contact email, and social profiles you fill in under
 * SITE.social in src/config/site.ts.
 */
type FooterLink = { label: string; href: string }

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Company',
    links: [
      { label: 'Work', href: '/#work' },
      { label: 'Services', href: '/#services' },
      { label: 'About', href: '/#about' },
      { label: 'Contact', href: '/#contact' },
    ],
  },
  { title: 'Services', links: SERVICES.map((s) => ({ label: s, href: '/#services' })) },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
    ],
  },
]

const SOCIALS: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: 'Instagram', href: SITE.social.instagram, Icon: Instagram },
  { label: 'LinkedIn', href: SITE.social.linkedin, Icon: Linkedin },
  { label: 'YouTube', href: SITE.social.youtube, Icon: Youtube },
  { label: 'Facebook', href: SITE.social.facebook, Icon: Facebook },
  { label: 'X (Twitter)', href: SITE.social.x, Icon: Twitter },
].filter((s) => s.href)

const linkClass =
  'inline-block py-1 text-base font-medium text-black/75 outline-none transition-transform duration-200 hover:translate-x-1 hover:text-brand focus-visible:text-brand focus-visible:underline focus-visible:underline-offset-4'

export default function Footer() {
  return (
    <footer className="w-full bg-white px-4 pb-6 pt-6 text-black sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl border-t border-black/15">
        <div className="grid gap-14 pb-16 pt-14 lg:grid-cols-12 lg:gap-10 lg:pt-20">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              aria-label="THE PLANET 9 — home"
              className="inline-block font-display outline-none focus-visible:ring-4 focus-visible:ring-brand focus-visible:ring-offset-4"
            >
              <span className="block text-[clamp(2.5rem,6vw,4.25rem)] font-black uppercase leading-[0.9] tracking-tighter">The</span>
              <span className="flex items-end gap-3 text-[clamp(2.5rem,6vw,4.25rem)] font-black uppercase leading-[0.9] tracking-tighter">
                Planet
                <span aria-hidden="true" className="inline-flex aspect-square h-[1em] items-center justify-center rounded-full bg-brand text-[0.9em] leading-none text-black">9</span>
              </span>
            </Link>
            <p className="mt-6 text-lg font-medium text-black/75">{SITE.tagline}.</p>
            <a href={`mailto:${SITE.email}`} className="mt-4 inline-flex items-center gap-1 break-all text-base font-bold underline underline-offset-4 hover:text-brand">
              {SITE.email} <ArrowUpRight size={16} aria-hidden />
            </a>

            {SOCIALS.length > 0 && (
              <div className="mt-8">
                <p className="mb-3 text-xs font-bold tracking-[0.22em] text-black/70">FOLLOW US</p>
                <ul className="flex flex-wrap items-center gap-3" aria-label="Social media">
                  {SOCIALS.map(({ label, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label} (opens in a new tab)`}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-black/30 text-black outline-none transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:bg-brand hover:text-white focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:col-span-8 lg:pl-8">
            {COLUMNS.map((column, i) => (
              <nav key={column.title} aria-labelledby={`footer-nav-${i}`} className={i === 2 ? 'col-span-2 sm:col-span-1' : undefined}>
                <h2 id={`footer-nav-${i}`} className="font-display text-sm font-black uppercase tracking-wide">{column.title}</h2>
                <ul className="mt-5 space-y-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className={linkClass}>{link.label}</Link>
                    </li>
                  ))}
                  {i === 2 && (
                    <li>
                      <button type="button" onClick={openCookieSettings} className={`${linkClass} text-left`}>Cookie settings</button>
                    </li>
                  )}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-black/15 pt-6">
          <div className="flex flex-col gap-2 text-sm text-black/70 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
            <p>Websites &amp; digital experiences, made to be noticed.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
