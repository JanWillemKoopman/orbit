'use client'
// Het podium van de drie schermen. Op desktop en tablet staan ze achter elkaar (alleen CSS); op
// mobiel wordt het een veegbare rij met scroll-snap, en de stipjes eronder volgen welk scherm in
// beeld is. Dit is het enige stukje JavaScript van het blok: zonder werkt het vegen ook, alleen
// blijft dan het eerste stipje actief.
import { Children, useRef, useState } from 'react'

export function ShowcaseSlider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [actief, setActief] = useState(0)
  const aantal = Children.count(children)

  function opScroll() {
    const el = ref.current
    if (!el) return
    const scherm = el.firstElementChild as HTMLElement | null
    if (!scherm) return
    const stap = scherm.offsetWidth + 12 // breedte van een scherm plus de tussenruimte uit de CSS
    setActief(Math.min(aantal - 1, Math.max(0, Math.round(el.scrollLeft / stap))))
  }

  return (
    <>
      <div className="sc-stage" ref={ref} onScroll={opScroll} aria-hidden="true">
        {children}
      </div>
      <div className="sc-dots" aria-hidden="true">
        {Array.from({ length: aantal }, (_, i) => <span key={i} data-active={i === actief || undefined} />)}
      </div>
    </>
  )
}
