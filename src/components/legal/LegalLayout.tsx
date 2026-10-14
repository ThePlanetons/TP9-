import { ReactNode } from 'react'
import { LEGAL } from '../../config/site'

export default function LegalLayout({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <article className="bg-white px-6 pb-24 pt-32 md:px-16 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-bold tracking-[0.22em] text-brand-deep">LEGAL</p>
        <h1 className="mt-3 font-display text-[clamp(2.5rem,8vw,4.5rem)] font-black uppercase leading-[0.95] tracking-tight">{title}</h1>
        <p className="mt-4 text-sm text-black/70">Last updated: {LEGAL.lastUpdated}</p>
        <p className="mt-8 text-lg leading-relaxed text-black/80">{intro}</p>
        <div className="legal mt-10 space-y-10 text-base leading-relaxed text-black/80 [&_a]:font-bold [&_a]:text-black [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:no-underline [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-black [&_li]:mt-2 [&_ul]:list-disc [&_ul]:pl-6 [&_p+p]:mt-3 [&_p+ul]:mt-3">
          {children}
        </div>
      </div>
    </article>
  )
}
