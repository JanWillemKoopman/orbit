'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// Elementen met data-opbouw bouwen zichzelf op zodra ze in beeld komen, zoals op linear.app:
// grafieken in de productbeelden (werkwijze.css) en afbeeldingen die met een veeg verschijnen
// (globals.css). Dit component zet data-opbouw eerst op "wacht" (de CSS verbergt dan wat nog moet
// verschijnen) en op "klaar" zodra het element voor een deel in beeld is. Zonder JavaScript of met
// reduced motion gebeurt er niets en staat alles er meteen.
export function OpbouwInBeeld() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const elementen = Array.from(document.querySelectorAll<HTMLElement>('[data-opbouw]')).filter((el) => el.dataset.opbouw !== 'klaar')
    if (!elementen.length) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          ;(e.target as HTMLElement).dataset.opbouw = 'klaar'
          io.unobserve(e.target)
        }
      },
      { threshold: 0.35 },
    )
    for (const el of elementen) {
      el.dataset.opbouw = 'wacht'
      io.observe(el)
    }
    return () => io.disconnect()
  }, [pathname])

  return null
}
