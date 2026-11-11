'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

// Het citaat op de homepage licht woord voor woord op terwijl je erlangs scrolt: de woorden staan
// eerst gedimd en komen op volle sterkte naarmate het citaat door het beeld schuift. Zonder
// JavaScript of met reduced motion staat alles meteen op volle sterkte. Onder het citaat staan een
// rond portret, de naam en de functie van wie het zegt; die lichten niet mee op.

const GEDIMD = 0.18 // doorzichtigheid van een woord dat nog niet aan de beurt is

const woorden = (tekst: string) => tekst.split(/(\s+)/)

const initialen = (naam: string) =>
  naam.split(/[\s-]+/).filter(Boolean).slice(0, 2).map((d) => d[0]).join('').toUpperCase()

// Twee vormen: een tussenzin (strong + rest, zoals op /agencies) of een citaat met naam, functie en
// portret (zoals op de homepage). Beide lichten op dezelfde manier op tijdens het scrollen.
type Props =
  | { strong: string; rest: string; citaat?: never; naam?: never; functie?: never; foto?: never }
  | { citaat: string; naam: string; functie: string; foto?: string; strong?: never; rest?: never }

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

  if (props.citaat === undefined) {
    return (
      <p ref={ref as React.RefObject<HTMLParagraphElement>}>
        <strong>{woorden(props.strong).map(span)}</strong>{' '}
        {woorden(props.rest).map(span)}
      </p>
    )
  }

  const { citaat, naam, functie, foto } = props

  return (
    <figure className="citaat">
      <blockquote ref={ref as React.RefObject<HTMLQuoteElement>} className="citaat-tekst">
        <p>
          <span aria-hidden="true">&ldquo;</span>{woorden(citaat).map(span)}<span aria-hidden="true">&rdquo;</span>
        </p>
      </blockquote>
      <figcaption className="citaat-bron">
        {foto ? (
          <Image src={foto} alt={`Portret van ${naam}`} width={44} height={44} className="citaat-foto" />
        ) : (
          <span className="citaat-foto citaat-foto-leeg" aria-hidden="true">{initialen(naam)}</span>
        )}
        <span className="citaat-bron-tekst">
          <span className="citaat-naam">{naam}</span>
          <span className="citaat-functie">{functie}</span>
        </span>
      </figcaption>
    </figure>
  )
}
