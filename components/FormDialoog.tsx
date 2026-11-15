'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

// De popup rond een formulier (aanmelden of demo): kop, inleiding en het formulier eronder.
export function FormDialoog({ open, onClose, id, eyebrow, titel, intro, children }: {
  open: boolean
  onClose: () => void
  id: string
  eyebrow: string
  titel: string
  intro: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Klik je naast de popup of druk je op Escape, dan sluit hij niet (zodat je niet per ongeluk een half
  // ingevuld formulier kwijtraakt) maar veert hij kort in, zoals de dialogen op linear.app.
  const veer = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    ref.current?.animate([{ transform: 'none' }, { transform: 'scale(0.98)' }, { transform: 'none' }], { duration: 150, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' })
  }

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open, mounted])

  // Via een portal in <body>, zodat koppen en teksten van de sectie waarin de knop staat
  // (bijv. .home-prefooter h2) niet doorwerken in de popup.
  if (!mounted) return null
  return createPortal(
    <dialog
      ref={ref}
      className="demo-dialog"
      aria-labelledby={id}
      onClose={onClose}
      // Alleen het kruisje sluit de popup: niet via de achtergrond en niet via Escape.
      onCancel={(e) => { e.preventDefault(); veer() }}
      onClick={(e) => { if (e.target === ref.current) veer() }}
    >
      {open && (
        <div className="demo-dialog-body">
          <button type="button" className="demo-close" aria-label="Sluiten" onClick={onClose}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </button>
          <p className="demo-eyebrow">{eyebrow}</p>
          <h2 id={id}>{titel}</h2>
          <p className="demo-intro">{intro}</p>
          {children}
        </div>
      )}
    </dialog>,
    document.body,
  )
}
