'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AanmeldDialog } from './AanmeldDialog'

// De twee knoppen onderaan de pagina's: links het aanmeldformulier (gratis uitproberen), rechts een link naar /contact.
export function PrefooterKnoppen() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" className="btn btn-lg btn-invert" onClick={() => setOpen(true)}>
        Gratis uitproberen
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <Link href="/contact" className="btn btn-lg btn-secondary">Contact opnemen</Link>
      <AanmeldDialog open={open} onClose={() => setOpen(false)} />
    </>
  )
}
