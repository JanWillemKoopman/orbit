'use client'

import { useState } from 'react'
import { AanmeldDialog } from '../AanmeldDialog'

// De twee acties onder de afsluiting van /over: dezelfde aanmeldpopup als de knop "Gratis uitproberen"
// elders op de site, en een mailtje aan Jan-Willem.
export function AfsluitingKnoppen({ knop, mail }: { knop: string; mail: { label: string; href: string } }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" className="btn btn-lg btn-invert" onClick={() => setOpen(true)}>
        {knop}
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <a href={mail.href} className="btn btn-lg btn-secondary">{mail.label}</a>
      <AanmeldDialog open={open} onClose={() => setOpen(false)} />
    </>
  )
}
