'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { whiteLabel } from '@/content/home'

// Smal zwart blok onder de vier voordelen met een donkergrijze rand. De eerste keer dat het blok in beeld
// komt, loopt er eenmalig een limegroen licht over de rand, één keer rond (home.css, .wl-licht).
// Links titel en uitleg, rechts een link naar /agencies.
export function WhiteLabel() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      el.dataset.licht = ''
      io.disconnect()
    }, { threshold: 0.6 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <aside ref={ref} className="wl" aria-labelledby="home-white-label">
      <span className="wl-licht" aria-hidden="true" />
      <div>
        <h3 id="home-white-label" className="wl-titel">{whiteLabel.titel}</h3>
        <p className="wl-uitleg">{whiteLabel.tekst}</p>
      </div>
      <Link href={whiteLabel.link.href} className="btn btn-secondary wl-link">
        {whiteLabel.link.label} <span className="feature-plus" aria-hidden="true">→</span>
      </Link>
    </aside>
  )
}
