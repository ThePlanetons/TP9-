// import { ArrowRight } from 'lucide-react'
// import { SITE } from '../config/site'
// import { Link } from '../lib/router'
// import { useSEO } from '../lib/seo'

// export default function NotFound() {
//   useSEO({ title: `Page not found | ${SITE.name}`, description: 'The page you were looking for does not exist.', path: '/404', noindex: true })
//   return (
//     <section className="grid min-h-[100svh] place-items-center bg-white px-6 pb-16 pt-28 text-center">
//       <div>
//         <p className="font-display text-[clamp(7rem,28vw,18rem)] font-black leading-[0.8] tracking-tighter text-brand">404</p>
//         <h1 className="mt-6 font-display text-3xl font-black uppercase md:text-5xl">Lost in space</h1>
//         <p className="mx-auto mt-4 max-w-md text-base text-black/75 md:text-lg">This page drifted out of orbit — it may have moved, or the link is wrong.</p>
//         <Link href="/" className="group mt-10 inline-flex items-center gap-3 rounded-full bg-brand-deep px-8 py-4 text-xs font-bold tracking-[0.18em] text-white transition hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
//           BACK TO HOME <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
//         </Link>
//       </div>
//     </section>
//   )
// }
import { ArrowRight } from 'lucide-react'
import { SITE } from '../config/site'
import { Link } from '../lib/router'
import { useSEO } from '../lib/seo'

export default function NotFound() {
  useSEO({ title: `Page not found | ${SITE.name}`, description: 'The page you were looking for does not exist.', path: '/404', noindex: true })
  return (
    <section className="grid min-h-[100svh] place-items-center bg-white px-6 pb-16 pt-28 text-center">
      <div>
        <p className="font-display text-[clamp(7rem,28vw,18rem)] font-black leading-[0.8] tracking-tighter text-brand">404</p>
        <h1 className="mt-6 font-display text-3xl font-black uppercase md:text-5xl">Lost in space</h1>
        <p className="mx-auto mt-4 max-w-md text-base text-black/75 md:text-lg">This page drifted out of orbit — it may have moved, or the link is wrong.</p>
        <Link href="/" className="group mt-10 inline-flex items-center gap-3 rounded-full bg-brand px-8 py-4 text-xs font-bold tracking-[0.18em] text-white transition hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
          BACK TO HOME <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}
