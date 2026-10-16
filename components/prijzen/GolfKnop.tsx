'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'

// Witte knop met bij de eerste hover een trage golf in perspectief: een ring die schuin in de ruimte
// ligt en om de knop heen uitdijt. De achterste helft loopt achter de knop langs, de voorste helft
// ervoor, zodat het lijkt alsof de golf echt om de knop heen gaat. Daarna is het een gewone knop die
// bij hover wit wordt. Met reduced motion gebeurt er niets.

const DUUR = 3600

function Ringen() {
  return (
    <>
      <span className="pr-golf-ring" style={{ '--n': 0 } as React.CSSProperties} />
      <span className="pr-golf-ring" style={{ '--n': 1 } as React.CSSProperties} />
    </>
  )
}

export function GolfKnop({ href, children }: { href: string; children: React.ReactNode }) {
  const [golf, setGolf] = useState(false)
  const geweest = useRef(false)

  const start = () => {
    if (geweest.current) return
    geweest.current = true
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setGolf(true)
    window.setTimeout(() => setGolf(false), DUUR)
  }

  return (
    <span className="pr-golf" data-golf={golf || undefined}>
      {golf && (
        <span className="pr-golf-laag pr-golf-achter" aria-hidden="true"><Ringen /></span>
      )}
      <Link href={href} className="btn btn-lg btn-invert pr-golfknop" onPointerEnter={start}>
        {children}
      </Link>
      {golf && (
        <span className="pr-golf-laag pr-golf-voor" aria-hidden="true"><Ringen /></span>
      )}
    </span>
  )
}
