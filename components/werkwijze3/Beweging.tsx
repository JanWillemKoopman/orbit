'use client'

// De beweging op /werkwijze3 en /werkwijze4 (`prefix` is w3 of w4). Zet `data-in` op een kaart zodra
// die in beeld komt (de animatie van de kaart speelt dan één keer af) en `data-onder` op een kaart waar
// de volgende overheen schuift, zodat die iets terugwijkt. Zonder JavaScript of met minder beweging aan
// staat alles meteen in beeld (zie
// .w3-js in werkwijze3.css en .w4-js in werkwijze4.css).
import { useEffect } from 'react'

export function Beweging({ prefix = 'w3' }: { prefix?: string }) {
  useEffect(() => {
    const root = document.querySelector(`.${prefix}`)
    if (!root) return
    const kaarten = Array.from(root.querySelectorAll<HTMLElement>(`.${prefix}-kaart`))
    // Wie minder beweging wil, krijgt alles meteen te zien
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      kaarten.forEach((k) => k.setAttribute('data-in', ''))
      return
    }
    root.classList.add(`${prefix}-js`)

    const zien = new IntersectionObserver(
      (items) => items.forEach((e) => {
        if (e.isIntersecting) { e.target.setAttribute('data-in', ''); zien.unobserve(e.target) }
      }),
      { rootMargin: '0px 0px -25% 0px', threshold: 0.15 },
    )
    kaarten.forEach((k) => zien.observe(k))

    let raf = 0
    const stapel = () => {
      raf = 0
      kaarten.forEach((k, i) => {
        const volgende = kaarten[i + 1]
        if (!volgende) return
        // Een kaart wijkt terug zodra de volgende er voor een groot deel overheen ligt
        const onder = volgende.getBoundingClientRect().top - k.getBoundingClientRect().top < k.offsetHeight * 0.6
        k.toggleAttribute('data-onder', onder)
      })
    }
    const plan = () => { if (!raf) raf = requestAnimationFrame(stapel) }
    stapel()
    window.addEventListener('scroll', plan, { passive: true })
    window.addEventListener('resize', plan)
    return () => {
      zien.disconnect()
      window.removeEventListener('scroll', plan)
      window.removeEventListener('resize', plan)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [prefix])
  return null
}
