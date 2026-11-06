'use client'
// Twee beelden naast elkaar (.hk-duo). Op desktop en tablet een gewoon raster (alleen CSS); op mobiel
// een veegbare rij met scroll-snap, zoals de drie schermen in Showcase, met dezelfde stipjes eronder.
// Zonder JavaScript werkt het vegen ook, alleen blijft dan het eerste stipje actief.
import { Children, useRef, useState } from 'react'

export function DuoSlider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [actief, setActief] = useState(0)
  const aantal = Children.count(children)

  function opScroll() {
    const el = ref.current
    const beeld = el?.firstElementChild as HTMLElement | null
    if (!el || !beeld) return
    const stap = beeld.offsetWidth + 12 // breedte van een beeld plus de tussenruimte uit de CSS
    setActief(Math.min(aantal - 1, Math.max(0, Math.round(el.scrollLeft / stap))))
  }

  return (
    <>
      <div className="hk-duo" ref={ref} onScroll={opScroll}>
        {children}
      </div>
      <div className="sc-dots hk-dots" aria-hidden="true">
        {Array.from({ length: aantal }, (_, i) => <span key={i} data-active={i === actief || undefined} />)}
      </div>
    </>
  )
}
