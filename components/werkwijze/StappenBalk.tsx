'use client'

// De balk die onder de header meeloopt zolang je door de tien stappen scrolt: welke stap je leest en
// hoe ver je bent, met een streepje per stap om ernaartoe te springen. Hij verschijnt pas bij de eerste
// stap en verdwijnt na de laatste, zodat hij de hero en de afsluiter vrijlaat.
import { useEffect, useRef, useState } from 'react'

type Item = { id: string; nr: number; titel: string }

export function StappenBalk({ stappen }: { stappen: Item[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [actief, setActief] = useState(-1)
  const [zichtbaar, setZichtbaar] = useState(false)

  useEffect(() => {
    let raf = 0
    const meet = () => {
      raf = 0
      const kop = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 72
      // Een stap telt als actief zodra zijn bovenkant het bovenste derde van het scherm passeert
      const lijn = kop + window.innerHeight * 0.33
      let i = -1
      stappen.forEach((s, n) => {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= lijn) i = n
      })
      const blok = ref.current?.parentElement?.getBoundingClientRect()
      setActief(i)
      setZichtbaar(i >= 0 && !!blok && blok.bottom > kop + 160)
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
  }, [stappen])

  const huidig = stappen[Math.max(0, actief)]
  return (
    <div ref={ref} className="ww-balk" data-zichtbaar={zichtbaar || undefined}>
      <nav className="ww-balk-in" aria-label="Stappen">
        <div className="container ww-balk-rij">
          <p className="ww-balk-nu" aria-live="polite">
            <span className="ww-balk-nr">{String(huidig.nr).padStart(2, '0')}<span> / {stappen.length}</span></span>
            <span className="ww-balk-titel">{huidig.titel}</span>
          </p>
          <ol className="ww-balk-lijst">
            {stappen.map((s, n) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-label={`Stap ${s.nr}: ${s.titel}`}
                  aria-current={n === actief ? 'step' : undefined}
                  data-stand={n < actief ? 'klaar' : n === actief ? 'nu' : undefined}
                >
                  <i />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </div>
  )
}
