import { forwardRef } from 'react'

const TAGS: [string, string, string][] = [
  ['THE PLANET 9', '8%', '14%'], ['DIGITAL BRANDING HOUSE', '66%', '12%'], ['CREATIVE TECHNOLOGY', '8%', '84%'],
  ['EST. 2025', '82%', '80%'], ['DESIGN / DEVELOPMENT / CONTENT', '36%', '92%'], ['TP9', '91%', '46%'],
  ['09', '3%', '48%'], ['EXPLORE', '24%', '28%'], ['CREATE', '74%', '30%'], ['BUILD', '20%', '70%'],
  ['MOVE', '78%', '68%'], ['X 000.09 / Y 009.00', '52%', '6%'],
]

const CreativeOverlay = forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="pointer-events-none absolute inset-0 z-[5] overflow-hidden opacity-0" aria-hidden>
    <div className="bg-grid absolute inset-0" />
    <div className="orbit" style={{ width: '56vw', height: '56vw' }}><i /></div>
    <div className="orbit" style={{ width: '70vw', height: '22vw', animationDuration: '70s', animationDirection: 'reverse', borderColor: '#000', opacity: 0.25 }}><i style={{ background: '#000' }} /></div>
    <div className="orbit" style={{ width: '38vw', height: '38vw', animationDuration: '25s', borderColor: '#d9d9d9' }}><i style={{ background: '#d9d9d9' }} /></div>
    <div className="pulse" style={{ left: '14%', top: '30%' }} />
    <div className="pulse" style={{ left: '76%', top: '58%', animationDelay: '3s' }} />
    <div className="hline" style={{ top: '22%' }} />
    <div className="hline" style={{ top: '50%', animationDelay: '4s', animationDuration: '14s' }} />
    <div className="hline" style={{ top: '78%', animationDelay: '7s' }} />
    {TAGS.map(([t, x, y], i) => (
      <span key={t} className="tag" style={{ left: x, top: y, animationDelay: `${-i * 0.9}s` }}>{t}</span>
    ))}
  </div>
))
export default CreativeOverlay
