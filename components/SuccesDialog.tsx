'use client'

import { useEffect, useRef } from 'react'

// Popup na het succesvol versturen van een formulier.
export function SuccesDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className="demo-dialog succes-dialog"
      aria-labelledby="succes-titel"
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose() }}
    >
      {open && (
        <div className="demo-dialog-body succes-body" role="status">
          <button type="button" className="demo-close" aria-label="Sluiten" onClick={onClose}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </button>
          <div className="succes-icoon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 16 16" fill="none"><path d="M3.5 8.4l3 3 6-6.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h2 id="succes-titel">Je bericht is verzonden</h2>
          <p className="demo-intro">Bedankt voor je bericht! We nemen binnenkort contact met je op.</p>
          <button type="button" className="btn demo-submit" onClick={onClose}>Sluiten</button>
        </div>
      )}
    </dialog>
  )
}
