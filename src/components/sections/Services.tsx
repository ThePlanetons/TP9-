import { ArrowUpRight } from 'lucide-react'
import { SERVICES } from '../../config/site'

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="bg-[#F5F5F5] px-6 py-24 md:px-16 md:py-32">
      <h2 id="services-heading" className="sr-only">Services</h2>
      <ul>
        {SERVICES.map((s) => (
          <li key={s} data-reveal className="group flex items-center justify-between gap-4 border-t border-black/20 py-6 last:border-b">
            <span className="flex-1 font-display text-[5.4vw] font-black uppercase leading-none transition-all duration-500 group-hover:translate-x-4 group-hover:text-brand md:text-[4.5vw]">{s}</span>
            <span aria-hidden className="grid h-10 w-10 place-items-center rounded-full border border-black/30 transition group-hover:border-brand group-hover:bg-brand group-hover:text-black">
              <ArrowUpRight size={16} />
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
