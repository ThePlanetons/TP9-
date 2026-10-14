import type { CSSProperties } from 'react'
import { Headphones } from 'lucide-react'

export type DeviceKind = 'laptop' | 'phone' | 'code' | 'shop' | 'chart'
type Props = { id: string; kind: DeviceKind; label: string; box: CSSProperties; rot: number; layer: 'front' | 'back'; delay: number; className?: string }

const FRAME: Record<DeviceKind, string> = {
  laptop: 'aspect-[16/10] rounded-[1cqw]', phone: 'aspect-[9/19] rounded-[2.4cqw]', code: 'aspect-[16/10] rounded-[1cqw]',
  shop: 'aspect-[4/3] rounded-[1cqw]', chart: 'aspect-[16/10] rounded-[1cqw]',
}

const Chart = () => (
  <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-full w-full">
    <path d="M0 36 L15 28 L30 31 L48 18 L64 22 L82 8 L100 12 V40 H0Z" fill="#F64618" fillOpacity=".25" />
    <path d="M0 36 L15 28 L30 31 L48 18 L64 22 L82 8 L100 12" fill="none" stroke="#F64618" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
  </svg>
)

const CODE: [number, number, string][] = [[0, 40, '#F64618'], [6, 55, '#ffffff66'], [6, 35, '#ffffff66'], [12, 60, '#F6461899'], [12, 30, '#ffffff66'], [6, 45, '#ffffff66'], [0, 25, '#F64618'], [6, 50, '#ffffff66']]

function Screen({ kind }: { kind: DeviceKind }) {
  if (kind === 'laptop') return (
    <div className="relative flex h-full flex-col bg-[#131313] p-[5%] text-white">
      <div className="mb-[6%] flex items-center justify-between">
        <i className="h-[1.2cqw] w-[1.2cqw] rounded-full bg-[#F64618]" />
        <span className="flex gap-[1.6cqw]">{[0, 1, 2].map((i) => <i key={i} className="h-[.5cqw] w-[2.4cqw] rounded bg-white/30" />)}</span>
      </div>
      <p className="max-w-[55%] font-display text-[2.2cqw] font-extrabold leading-[1.05]">Better Solutions for a Smarter Tomorrow</p>
      <i className="mt-[4%] block h-[2cqw] w-[8cqw] rounded-[.4cqw] bg-[#F64618]" />
      <i className="absolute bottom-[8%] right-[7%] aspect-square w-[34%] rounded-full" style={{ background: 'radial-gradient(circle at 35% 30%, #FFB27A, #F64618 45%, #4a1202)' }} />
    </div>
  )
  if (kind === 'phone') return (
    <div className="flex h-full flex-col bg-[#131313] p-[10%] text-white">
      <i className="mx-auto mb-[12%] block h-[.7cqw] w-[30%] rounded-full bg-white/20" />
      <p className="font-display text-[2.2cqw] font-extrabold leading-tight">Your Ideas Online</p>
      <i className="mt-[8%] block h-[1.6cqw] w-[45%] rounded-[.4cqw] bg-[#F64618]" />
      <div className="mt-auto h-[28%]"><Chart /></div>
    </div>
  )
  if (kind === 'code') return (
    <div className="flex h-full flex-col gap-[3.5%] bg-[#131313] p-[6%]">
      {CODE.map(([ind, w, c], i) => <i key={i} className="block h-[.7cqw] rounded-full" style={{ marginLeft: `${ind}%`, width: `${w}%`, background: c }} />)}
    </div>
  )
  if (kind === 'shop') return (
    <div className="grid h-full grid-cols-[1fr_1fr] grid-rows-[1fr_auto] gap-[4%] bg-[#FBF7F2] p-[5%]">
      <div className="self-center"><p className="font-display text-[1.9cqw] font-extrabold leading-tight text-black">Premium Headphones</p><i className="mt-[8%] block h-[1.5cqw] w-[6cqw] rounded-[.4cqw] bg-black" /></div>
      <div className="grid place-items-center rounded-[.8cqw] bg-[#EDE6DD] text-black"><Headphones className="h-[55%] w-[55%]" strokeWidth={1.4} /></div>
      <div className="col-span-2 grid grid-cols-4 gap-[3%]">{[0, 1, 2, 3].map((i) => <i key={i} className="aspect-[4/3] rounded-[.5cqw] bg-[#EDE6DD]" />)}</div>
    </div>
  )
  return (
    <div className="flex h-full flex-col bg-[#131313] p-[8%]">
      <i className="mb-[8%] block h-[.7cqw] w-[40%] rounded-full bg-white/40" />
      <div className="flex-1"><Chart /></div>
    </div>
  )
}

export default function FloatingDevice({ id, kind, label, box, rot, layer, delay, className = '' }: Props) {
  const bob = (d: number) => ({ animation: `bob 7s ease-in-out ${d}s infinite alternate` })
  return (
    <div data-dev={id} data-rot={rot} className={`absolute ${className}`} style={{ ...box, zIndex: layer === 'front' ? 20 : 0 }}>
      <div className="relative" style={bob(delay)}>
        <div className={`relative overflow-hidden border-[.45cqw] border-[#1d1d1d] bg-[#1d1d1d] shadow-[0_2.2cqw_4cqw_-1.2cqw_rgba(40,12,0,.45)] ${FRAME[kind]}`}>
          <Screen kind={kind} />
          <i className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent" />
        </div>
        {kind === 'laptop' && <i className="-ml-[4%] mt-[.2cqw] block h-[.9cqw] w-[108%] rounded-b-[1cqw] bg-gradient-to-b from-[#d8d4cf] to-[#a9a49e]" />}
        <span
          style={bob(delay + 1.3)}
          className="absolute -top-[3.6cqw] left-[4%] whitespace-nowrap rounded-full border border-[#F64618]/40 bg-[#FFF8F0]/95 px-[1.6cqw] py-[.6cqw] text-[max(10px,1.5cqw)] font-medium text-[#F64618] shadow-[0_.6cqw_1.6cqw_-.6cqw_rgba(246,70,24,.35)]"
        >
          {label}
        </span>
      </div>
    </div>
  )
}
