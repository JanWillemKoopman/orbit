'use client'

import { useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import type { FaqItem } from '@/content/home'

// Eén vraag uit de FAQ. Het blijft een gewoon details-element (werkt ook zonder JavaScript, met het
// toetsenbord en voor een schermlezer); met JavaScript groeit het antwoord vloeiend open en schuift
// het weer dicht, in plaats van in één keer te verspringen.

// Beide met ease-out-quad (--ease-out-quad): die begint rustig genoeg om niet te springen.
const OPEN = { duration: 450, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }
const DICHT = { duration: 320, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }

export function FaqVraag({ item }: { item: FaqItem }) {
  const details = useRef<HTMLDetailsElement>(null)
  const inhoud = useRef<HTMLDivElement>(null)
  const animatie = useRef<Animation | null>(null)
  const sluitend = useRef(false)
  const [open, setOpen] = useState(false)

  const opKlik = (e: MouseEvent) => {
    const d = details.current
    const el = inhoud.current
    if (!d || !el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    e.preventDefault()
    // Wat er werkelijk open staat telt, ook als het element al openging voordat de pagina geladen was.
    const isOpen = d.open && !sluitend.current
    // Een animatie die nog loopt, begint de nieuwe vanaf de hoogte waar hij nu is. Een dicht element
    // telt als 0 (de browser geeft de verborgen inhoud soms toch een hoogte).
    const van = d.open ? el.getBoundingClientRect().height : 0
    animatie.current?.cancel()

    if (!isOpen) {
      sluitend.current = false
      setOpen(true)
      d.open = true
      const naar = el.scrollHeight
      animatie.current = el.animate(
        [{ height: `${van}px`, opacity: van ? 1 : 0 }, { height: `${naar}px`, opacity: 1 }],
        OPEN,
      )
    } else {
      sluitend.current = true
      setOpen(false)
      // De hoogte blijft op 0 staan (fill) tot het element echt dicht is, zodat er niets terugspringt.
      const anim = el.animate([{ height: `${van}px`, opacity: 1 }, { height: '0px', opacity: 0 }], { ...DICHT, fill: 'forwards' })
      anim.onfinish = () => {
        d.open = false
        sluitend.current = false
        anim.cancel()
      }
      animatie.current = anim
    }
  }

  return (
    <details
      ref={details}
      className="faq-item"
      data-open={open || undefined}
      // Houdt de staat gelijk als de browser het element zelf opent, bijvoorbeeld via zoeken op de pagina.
      onToggle={(e) => { if (!sluitend.current) setOpen(e.currentTarget.open) }}
    >
      <summary className="faq-question" onClick={opKlik}>
        <span>{item.question}</span>
        <svg className="faq-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <path d="M8 3v10" />
          <path d="M3 8h10" />
        </svg>
      </summary>
      <div ref={inhoud} className="faq-answer-wrap">
        <p className="faq-answer">{item.answer}</p>
      </div>
    </details>
  )
}
