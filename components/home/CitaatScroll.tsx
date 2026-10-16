'use client'

import { useEffect, useRef } from 'react'

// Het citaat op de homepage licht woord voor woord op terwijl je erlangs scrolt: de woorden staan
// eerst gedimd en krijgen hun eigen kleur (wit voor het vetgedrukte deel, grijs voor de rest)
// naarmate het citaat door het beeld schuift. Zonder JavaScript of met reduced motion staat alles
// meteen op volle sterkte.

const GEDIMD = 0.18 // doorzichtigheid van een woord dat nog niet aan de beurt is

const woorden = (tekst: string) => tekst.split(/(\s+)/)

export function CitaatScroll({ strong, rest }: { strong: string; rest: string }) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const p = ref.current
    if (!p || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const spans = Array.from(p.querySelectorAll<HTMLSpanElement>('[data-woord]'))
    let frame = 0

    const update = () => {
      frame = 0
      const rect = p.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 zodra de bovenkant op 85% van het beeld staat, 1 zodra de onderkant op 60% staat.
      // Mobiel is het citaat hoger en het scherm korter, dus daar begint en eindigt het eerder:
      // bovenkant op 90%, onderkant op 75%.
      const mobiel = window.matchMedia('(max-width: 640px)').matches
      const start = vh * (mobiel ? 0.9 : 0.85)
      const eind = vh * (mobiel ? 0.75 : 0.6) - rect.height
      const voortgang = Math.min(1, Math.max(0, (start - rect.top) / (start - eind)))
      const n = spans.length
      spans.forEach((s, i) => {
        const w = Math.min(1, Math.max(0, voortgang * n - i))
        s.style.opacity = String(GEDIMD + (1 - GEDIMD) * w)
      })
    }
    const opScroll = () => { if (!frame) frame = requestAnimationFrame(update) }

    update()
    window.addEventListener('scroll', opScroll, { passive: true })
    window.addEventListener('resize', opScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', opScroll)
      window.removeEventListener('resize', opScroll)
      spans.forEach((s) => { s.style.opacity = '' })
    }
  }, [])

  const span = (w: string, i: number) => (/^\s+$/.test(w) ? w : <span key={i} data-woord className="citaat-woord">{w}</span>)

  return (
    <p ref={ref}>
      <strong>
        <span className="home-quote-mark" aria-hidden="true">“</span>
        {woorden(strong).map(span)}
      </strong>{' '}
      {woorden(rest).map(span)}
      <span aria-hidden="true">”</span>
    </p>
  )
}
