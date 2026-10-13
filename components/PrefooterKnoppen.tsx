'use client'

import Link from 'next/link'
import { useState } from 'react'
import { DemoDialog } from './DemoDialog'

// De twee knoppen onderaan de pagina's: links de demo-popup, rechts een link naar /contact.
export function PrefooterKnoppen() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" className="btn btn-lg btn-invert" onClick={() => setOpen(true)}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M2 6.75h12M5.25 1.75v2.5M10.75 1.75v2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Plan een gratis demo
      </button>
      <Link href="/contact" className="btn btn-lg btn-secondary">Contact opnemen</Link>
      <DemoDialog open={open} onClose={() => setOpen(false)} />
    </>
  )
}
