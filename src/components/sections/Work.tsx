type Project = {
  name: string
  href: string
  /** Base filename in /public/img (…-640/1200/2000.webp + .jpg fallback) */
  img: string
  widths: number[]
  alt: string
  w: number
  h: number
}

// Replace / extend with real projects. Every image needs descriptive alt text.
const PROJECTS: Project[] = [
  {
    name: 'V11 Tech',
    href: 'https://v11tech.com/',
    img: 'w-1',
    widths: [640, 1200, 2000],
    alt: 'Homepage of the V11 Tech website, designed and built by THE PLANET 9',
    w: 2996,
    h: 2931,
  },
  {
    name: 'Navesha Giftory',
    href: 'https://www.navesha.com/',
    img: 'w-2',
    widths: [500],
    alt: 'Homepage of the Navesha Giftory website, designed and built by THE PLANET 9',
    w: 500,
    h: 500,
  },
]

const card =
  'group relative h-[280px] overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl sm:h-[360px] md:col-span-2 md:h-[520px] lg:h-[580px] xl:h-[620px]'

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="bg-white px-6 py-24 md:px-16 md:py-32">
      <h2 id="work-heading" data-reveal className="mb-14 font-display text-[11vw] font-black leading-none md:text-[6vw]">SELECTED WORK</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <article key={p.name} className={card}>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.name} — visit website (opens in a new tab)`}
              className="block h-full w-full focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-brand"
            >
              <picture>
                <source
                  type="image/webp"
                  srcSet={p.widths.map((w) => `/img/${p.img}-${w}.webp ${w}w`).join(', ')}
                  sizes="(min-width: 768px) 100vw, 100vw"
                />
                <img
                  src={`/img/${p.img}.jpg`}
                  alt={p.alt}
                  width={p.w}
                  height={p.h}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </picture>
              {/* guarantees the white label stays readable on any screenshot */}
              <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/75 to-transparent" />
              <h3 className="absolute left-4 top-4 text-xl font-medium text-white">{p.name}</h3>
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
