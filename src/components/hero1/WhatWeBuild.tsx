import { Code2, Globe, Palette, Rocket, ShoppingCart, Smartphone } from 'lucide-react'

const ITEMS = [
  [Globe, 'Websites', 'Modern & responsive websites for your brand'],
  [Code2, 'Web Apps', 'Custom web applications for real business needs'],
  [Palette, 'UI/UX Design', 'Beautiful, intuitive and user-focused designs'],
  [ShoppingCart, 'E-commerce', 'Powerful online stores built to sell'],
  [Smartphone, 'Responsive Design', 'Perfect experiences on every device'],
  [Rocket, 'Digital Experiences', 'Ideas turned into impactful digital products'],
] as const

export default function WhatWeBuild() {
  return (
    <div data-strip className="mt-10 lg:mt-2">
      <p className="mb-5 flex items-center gap-4 text-[11px] font-medium tracking-[0.25em] text-[#F64618]">
        WHAT WE BUILD <span className="h-px w-24 bg-[#F64618]/30" />
      </p>
      <ul className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-6 lg:gap-0">
        {ITEMS.map(([Icon, title, desc]) => (
          <li key={title} className="lg:border-l lg:border-[#F64618]/20 lg:px-6 lg:first:border-l-0 lg:first:pl-0">
            <span className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-[#F64618]/10 text-[#F64618]"><Icon size={18} /></span>
            <h3 className="text-sm font-bold">{title}</h3>
            <p className="mt-1 max-w-[18ch] text-xs leading-relaxed text-black/60">{desc}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
