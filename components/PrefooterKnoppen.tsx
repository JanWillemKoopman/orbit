'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AanmeldDialog } from './AanmeldDialog'

// De knoppen onderaan de pagina's: het aanmeldformulier (gratis uitproberen) en een link naar /contact.
// Met `contact={false}` staat alleen de knop Gratis uitproberen er: één duidelijke vervolgstap.
export function PrefooterKnoppen({ contact = true }: { contact?: boolean } = {}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" className="btn btn-lg btn-invert" onClick={() => setOpen(true)}>
        Gratis uitproberen
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {contact && <Link href="/contact" className="btn btn-lg btn-secondary">Contact opnemen</Link>}
      <AanmeldDialog open={open} onClose={() => setOpen(false)} />
    </>
  )
}
