'use client'

// De tien stappen van /werkwijze2 als cyclus: links een wijzerplaat met een segment per stap die
// meeloopt met het scrollen, rechts een tijdlijn met de stappen. De wijzerplaat laat zien dat de
// werkwijze rondgaat: na stap 10 begint de cyclus opnieuw. Op een smal scherm wordt de wijzerplaat
// een kleine balk die onder de header meeloopt. De tekst wordt op de server gerenderd; dit onderdeel
// voegt alleen bij welke stap je bent toe.
import { useEffect, useRef, useState } from 'react'
import type { Stap } from '@/content/werkwijze'

const nr = (n: number) => String(n).padStart(2, '0')

const R = 150 // straal van de segmenten
const GAT = 3 // graden tussen twee segmenten

function punt(graden: number, r: number) {
  const rad = ((graden - 90) * Math.PI) / 180
  return [Math.round(r * Math.cos(rad) * 100) / 100, Math.round(r * Math.sin(rad) * 100) / 100]
}

function boog(i: number, n: number) {
  const stuk = 360 / n
  const [x0, y0] = punt(i * stuk + GAT, R)
  const [x1, y1] = punt((i + 1) * stuk - GAT, R)
  return `M ${x0} ${y0} A ${R} ${R} 0 0 1 ${x1} ${y1}`
}

export function Cyclus({ stappen }: { stappen: Stap[] }) {
  const [actief, setActief] = useState(0)
  const lijst = useRef<HTMLOListElement>(null)

  useEffect(() => {
    let raf = 0
    const meet = () => {
      raf = 0
      const ol = lijst.current
      if (!ol) return
      const items = Array.from(ol.children) as HTMLElement[]
      // Een stap is actief zodra zijn bovenkant 40% van de schermhoogte passeert
      const lijn = window.innerHeight * 0.4
      let i = 0
      items.forEach((el, n) => { if (el.getBoundingClientRect().top <= lijn) i = n })
      // Onderaan de pagina komt de laatste stap nooit tot de lijn; dan telt hij toch
      if (ol.getBoundingClientRect().bottom <= window.innerHeight) i = items.length - 1
      const eerste = items[0].getBoundingClientRect().top
      const laatste = items[items.length - 1].getBoundingClientRect().top
      const voortgang = Math.min(1, Math.max(0, (lijn - eerste) / Math.max(1, laatste - eerste)))
      ol.style.setProperty('--voortgang', voortgang.toFixed(4))
      setActief(i)
    }
    const plan = () => { if (!raf) raf = requestAnimationFrame(meet) }
    meet()
    window.addEventListener('scroll', plan, { passive: true })
    window.addEventListener('resize', plan)
    return () => {
      window.removeEventListener('scroll', plan)
      window.removeEventListener('resize', plan)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const n = stappen.length
  const nu = stappen[actief]
  const stand = (i: number) => (i < actief ? 'klaar' : i === actief ? 'nu' : 'open')

  return (
    <div className="w2-cyclus">
      <nav className="w2-wijzer" aria-label="Stappen">
        <div className="w2-plaat">
          <svg className="w2-svg" viewBox="-190 -190 380 380" aria-hidden="true">
            {/* Fijne schaalverdeling, zoals op een meetinstrument */}
            {Array.from({ length: 120 }, (_, t) => {
              const lang = t % 12 === 0
              const [x0, y0] = punt(t * 3, lang ? 120 : 124)
              const [x1, y1] = punt(t * 3, 130)
              return <line key={t} className={lang ? 'w2-streep w2-streep-lang' : 'w2-streep'} x1={x0} y1={y0} x2={x1} y2={y1} />
            })}
            {stappen.map((s, i) => {
              const [lx, ly] = punt((i + 0.5) * (360 / n), 174)
              return (
                <g key={s.id} className="w2-segment" data-stand={stand(i)}>
                  <path className="w2-boog-veld" d={boog(i, n)} />
                  <path className="w2-boog" d={boog(i, n)} />
                  <text className="w2-label" x={lx} y={ly} textAnchor="middle" dominantBaseline="central">{nr(s.nr)}</text>
                </g>
              )
            })}
            {/* De pijl tussen 10 en 1: na de laatste stap begint de cyclus opnieuw */}
            <path className="w2-pijl" d="M -5 -155 L 1 -150 L -5 -145" />
          </svg>
          {/* Klikvlakken over de segmenten */}
          <ol className="w2-sprongen">
            {stappen.map((s, i) => (
              <li key={s.id} style={{ '--hoek': `${(i + 0.5) * (360 / n)}deg` } as React.CSSProperties}>
                <a href={`#${s.id}`} aria-label={`Stap ${s.nr}: ${s.titel}`} aria-current={i === actief ? 'step' : undefined} />
              </li>
            ))}
          </ol>
          <div className="w2-midden" aria-live="polite">
            <span className="w2-midden-nr" key={`nr-${actief}`}>{nr(nu.nr)}<span>/{n}</span></span>
            <span className="w2-midden-titel" key={`t-${actief}`}>{nu.titel}</span>
          </div>
        </div>
      </nav>

      <ol className="w2-lijst" ref={lijst}>
        {stappen.map((s, i) => (
          <li key={s.id} id={s.id} className="w2-stap" data-stand={stand(i)} aria-labelledby={`${s.id}-titel`}>
            <span className="w2-punt" aria-hidden="true" />
            <p className="w2-nr" aria-hidden="true">Stap {nr(s.nr)}</p>
            <h2 id={`${s.id}-titel`} className="w2-titel">
              <span className="sr-only">Stap {s.nr}: </span>{s.titel}
            </h2>
            <p className="w2-aanloop">{s.aanloop}</p>
            <p className="w2-tekst">{s.tekst}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
