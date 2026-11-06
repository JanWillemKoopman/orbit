'use client'
// Twee beelden naast elkaar (.hk-duo). Op desktop en tablet een gewoon raster (alleen CSS); op mobiel
// staan ze, net als de drie schermen in Showcase, samen in één venster (.hk-venster): een veegbare rij met
// scroll-snap, de stipjes eronder en daaronder het bijschrift van het beeld dat in beeld is. Op mobiel
// blijft het bijschrift in elk beeld alleen voor schermlezers staan; het losse bijschrift is daarom
// aria-hidden. Zonder JavaScript werkt het vegen ook, alleen blijven dan het eerste stipje en bijschrift staan.
import { Children, useRef, useState } from 'react'

type Bijschrift = { titel: string; tekst: string }

export function DuoSlider({ children, bijschriften }: { children: React.ReactNode; bijschriften: Bijschrift[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [actief, setActief] = useState(0)
  const aantal = Children.count(children)
  const bijschrift = bijschriften[actief]

  function opScroll() {
    const el = ref.current
    const beeld = el?.firstElementChild as HTMLElement | null
    if (!el || !beeld) return
    const stap = beeld.offsetWidth + 12 // breedte van een beeld plus de tussenruimte uit de CSS
    setActief(Math.min(aantal - 1, Math.max(0, Math.round(el.scrollLeft / stap))))
  }

  return (
    <div className="hk-venster">
      <div className="hk-duo" ref={ref} onScroll={opScroll}>
        {children}
      </div>
      <div className="sc-dots hk-dots" aria-hidden="true">
        {Array.from({ length: aantal }, (_, i) => <span key={i} data-active={i === actief || undefined} />)}
      </div>
      {bijschrift && (
        <div className="sc-caption-block hk-venster-caption" aria-hidden="true">
          <h3>{bijschrift.titel}</h3>
          <p>{bijschrift.tekst}</p>
        </div>
      )}
    </div>
  )
}
