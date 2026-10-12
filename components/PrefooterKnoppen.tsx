'use client'

import Link from 'next/link'
import { useState } from 'react'
import { DemoDialog } from './DemoDialog'

// De twee knoppen onderaan de pagina's: links de demo-popup, rechts een link naar /contact.
export function PrefooterKnoppen() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" className="btn btn-lg btn-invert" onClick={() => setOpen(true)}>Plan een gratis demo</button>
      <Link href="/contact" className="btn btn-lg btn-secondary">Contact opnemen</Link>
      <DemoDialog open={open} onClose={() => setOpen(false)} />
    </>
  )
}
