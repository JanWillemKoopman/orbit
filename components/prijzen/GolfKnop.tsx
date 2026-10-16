'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'

// Witte knop die bij de eerste hover ontploft als de uitlaat van een raketmotor: een felle flits,
// drie drukgolven die ver buiten de knop doorlopen en vonken die wegspatten. Daarna is het een
// gewone knop die bij hover wit wordt. Met reduced motion gebeurt er niets.

const DUUR = 1600
const VONKEN = 14

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
        <span className="pr-golf-lagen" aria-hidden="true">
          <span className="pr-golf-flits" />
          <span className="pr-golf-ring" style={{ '--n': 0 } as React.CSSProperties} />
          <span className="pr-golf-ring" style={{ '--n': 1 } as React.CSSProperties} />
          <span className="pr-golf-ring" style={{ '--n': 2 } as React.CSSProperties} />
          {Array.from({ length: VONKEN }, (_, i) => (
            <span
              key={i}
              className="pr-golf-vonk"
              // Vaste spreiding in plaats van toeval, zodat server en browser hetzelfde tekenen
              style={{ '--hoek': `${(360 / VONKEN) * i + (i % 3) * 7}deg`, '--ver': `${180 + (i % 4) * 45}px` } as React.CSSProperties}
            />
          ))}
        </span>
      )}
      <Link href={href} className="btn btn-lg btn-invert pr-golfknop" onPointerEnter={start}>
        {children}
      </Link>
    </span>
  )
}
