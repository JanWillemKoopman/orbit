'use client'

import { useState } from 'react'
import { DemoDialog } from '@/components/DemoDialog'

// Een knop die de demo-popup opent, dezelfde als achter "Gratis demo" in de header. De vormgeving komt van
// de klasse die de pagina meegeeft: een gewone knop of de tekstlink rechts in de hero.
export function DemoKnop({ className, children }: { className: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>{children}</button>
      <DemoDialog open={open} onClose={() => setOpen(false)} />
    </>
  )
}
