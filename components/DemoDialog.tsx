'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { DemoForm } from './DemoForm'

export function DemoDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

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
      aria-labelledby="demo-titel"
      onClose={onClose}
      // Alleen het kruisje sluit de popup: niet via de achtergrond en niet via Escape.
      onCancel={(e) => e.preventDefault()}
    >
      {open && (
        <div className="demo-dialog-body">
          <button type="button" className="demo-close" aria-label="Sluiten" onClick={onClose}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </button>
          <p className="demo-eyebrow">Demo</p>
          <h2 id="demo-titel">Plan een gratis demo</h2>
          <p className="demo-intro">Laat je gegevens achter en we plannen samen een sessie van 15 of 45 minuten, wanneer het jou uitkomt.</p>
          <DemoForm />
        </div>
      )}
    </dialog>,
    document.body,
  )
}
