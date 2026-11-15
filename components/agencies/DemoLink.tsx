'use client'

import { useState } from 'react'
import { AanmeldDialog } from '@/components/AanmeldDialog'

// Tekstlink onder de inleiding van /agencies die het aanmeldformulier opent: dezelfde popup als de knop
// onderaan de pagina, zodat een bezoeker niet eerst helemaal naar beneden hoeft.
export function DemoLink({ label }: { label: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" className="home-link a3-demo" onClick={() => setOpen(true)}>
        {label}
        <span className="pijl" aria-hidden="true">→</span>
      </button>
      <AanmeldDialog open={open} onClose={() => setOpen(false)} />
    </>
  )
}
