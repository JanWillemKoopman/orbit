'use client'

import { useEffect, useRef } from 'react'

// De tussenzin op /agencies en /werkwijze licht woord voor woord op terwijl je erlangs scrolt: de
// woorden staan eerst gedimd en komen op volle sterkte naarmate de zin door het beeld schuift. Zonder
// JavaScript of met reduced motion staat alles meteen op volle sterkte. Het citaat op de homepage
// gebruikt dit niet; dat staat meteen in beeld (components/home/Citaat.tsx).

const GEDIMD = 0.18 // doorzichtigheid van een woord dat nog niet aan de beurt is

const woorden = (tekst: string) => tekst.split(/(\s+)/)

// Eén vorm: een tussenzin van een vetgedrukt begin (strong) en een vervolg (rest).
type Props = { strong: string; rest: string }

export function CitaatScroll(props: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const p = ref.current
    if (!p || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const spans = Array.from(p.querySelectorAll<HTMLSpanElement>('[data-woord]'))
    let frame = 0

    const update = () => {
      frame = 0
      const rect = p.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 zodra de bovenkant op 90% van het beeld staat, 1 zodra de onderkant op 75% staat. Het venster
      // ertussen bepaalt hoe snel de tekst wit wordt: krapper is sneller.
      // Mobiel is het citaat hoger en het scherm korter, dus daar begint en eindigt het iets eerder.
      const mobiel = window.matchMedia('(max-width: 640px)').matches
      const start = vh * (mobiel ? 0.94 : 0.9)
      const eind = vh * (mobiel ? 0.84 : 0.75) - rect.height
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
    <p ref={ref as React.RefObject<HTMLParagraphElement>}>
      <strong>{woorden(props.strong).map(span)}</strong>{' '}
      {woorden(props.rest).map(span)}
    </p>
  )
}
