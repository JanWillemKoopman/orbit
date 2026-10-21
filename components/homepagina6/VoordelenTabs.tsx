'use client'

import { useRef, useState } from 'react'
import { voordelen } from '@/content/homepagina6'
import { Icoon, type IcoonNaam } from './Visuals'

// Variant 05: links de voordelen als tabbladen, rechts het gekozen voordeel groot. Werkt met de muis en met
// het toetsenbord (pijltjes omhoog en omlaag, Home en End), zoals een tablist hoort te werken.
export function VoordelenTabs() {
  const [actief, setActief] = useState(0)
  const knoppen = useRef<(HTMLButtonElement | null)[]>([])

  const kies = (i: number) => {
    const n = (i + voordelen.length) % voordelen.length
    setActief(n)
    knoppen.current[n]?.focus()
  }

  const v = voordelen[actief]
  return (
    <div className="p4-tabs">
      <div className="p4-tablijst" role="tablist" aria-orientation="vertical" aria-label="Voordelen van Orbit">
        {voordelen.map((x, i) => (
          <button
            key={x.titel}
            ref={(el) => { knoppen.current[i] = el }}
            type="button"
            role="tab"
            id={`p4-tab-${i}`}
            aria-selected={i === actief}
            aria-controls="p4-tabpaneel"
            tabIndex={i === actief ? 0 : -1}
            className="p4-tab"
            onClick={() => setActief(i)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') { e.preventDefault(); kies(actief + 1) }
              if (e.key === 'ArrowUp') { e.preventDefault(); kies(actief - 1) }
              if (e.key === 'Home') { e.preventDefault(); kies(0) }
              if (e.key === 'End') { e.preventDefault(); kies(voordelen.length - 1) }
            }}
          >
            <span className="p4-tab-nr">{String(i + 1).padStart(2, '0')}</span>{x.titel}
          </button>
        ))}
      </div>
      <div className="p4-tabpaneel" role="tabpanel" id="p4-tabpaneel" aria-labelledby={`p4-tab-${actief}`} tabIndex={0}>
        <span className="p4-tabpaneel-icoon"><Icoon naam={v.icoon as IcoonNaam} /></span>
        <h3>{v.titel}</h3>
        <p>{v.tekst}</p>
        <span className="p4-tabpaneel-stand">{actief + 1} van {voordelen.length}</span>
      </div>
    </div>
  )
}
