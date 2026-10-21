'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { demoKnop, formulier } from '@/content/homepagina6'

// De demoknop van /homepagina6. Elke knop op de pagina opent dezelfde dialoog met het formulier uit de
// briefing: naam, zakelijk e-mailadres en bureau verplicht, een vraag optioneel en geen telefoonnummer.
// `plek` staat als data-attribuut op de knop, zodat een analytics-koppeling de klik per plek kan tellen.
export function DemoKnop({ plek, className = 'hg-knop hg-knop-primair' }: { plek: 'hero' | 'footer_cta'; className?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" className={className} data-meet="demo_cta_click" data-plek={plek} onClick={() => setOpen(true)}>
        {demoKnop}
      </button>
      <DemoDialoog open={open} onClose={() => setOpen(false)} />
    </>
  )
}

function DemoDialoog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // showModal houdt de focus in de dialoog, Escape sluit hem, en na het sluiten gaat de focus terug
  // naar de knop die hem opende.
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open, mounted])

  // Via een portal in <body>, zodat de opmaak van de sectie met de knop niet doorwerkt in de dialoog.
  if (!mounted) return null
  return createPortal(
    <dialog ref={ref} className="demo-dialog hg-dialoog" aria-labelledby="hg-demo-titel" onClose={onClose}>
      {open && (
        <div className="demo-dialog-body">
          <button type="button" className="demo-close hg-sluit" aria-label="Sluiten" onClick={onClose}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </button>
          <h2 id="hg-demo-titel">{formulier.titel}</h2>
          <p className="demo-intro">{formulier.intro}</p>
          <DemoFormulier />
        </div>
      )}
    </dialog>,
    document.body,
  )
}

function DemoFormulier() {
  const id = useId()
  const [status, setStatus] = useState<'leeg' | 'versturen' | 'ontvangen' | 'fout'>('leeg')

  // De bedankmelding staat er pas als de server de aanvraag heeft verwerkt.
  if (status === 'ontvangen') {
    return <p className="demo-success" role="status">{formulier.bedankt}</p>
  }

  return (
    <form
      className="hg-form"
      data-formulier="homepagina6"
      onSubmit={async (e) => {
        e.preventDefault()
        setStatus('versturen')
        const data = Object.fromEntries(new FormData(e.currentTarget))
        try {
          const res = await fetch('/api/demo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, formulier: 'homepagina6' }) })
          setStatus(res.ok ? 'ontvangen' : 'fout')
        } catch {
          setStatus('fout')
        }
      }}
    >
      <div className="hg-veld">
        <label htmlFor={`${id}-naam`}>Naam</label>
        <input id={`${id}-naam`} name="naam" required autoComplete="name" />
      </div>
      <div className="hg-veld">
        <label htmlFor={`${id}-email`}>Zakelijk e-mailadres</label>
        <input id={`${id}-email`} name="email" type="email" required autoComplete="email" />
      </div>
      <div className="hg-veld">
        <label htmlFor={`${id}-bureau`}>Bureau of bedrijfsnaam</label>
        <input id={`${id}-bureau`} name="bureau" required autoComplete="organization" />
      </div>
      <div className="hg-veld">
        <label htmlFor={`${id}-vraag`}>Wat wil je met Orbit onderzoeken? <span className="hg-optioneel">(optioneel)</span></label>
        <textarea id={`${id}-vraag`} name="vraag" rows={3} />
      </div>
      {/* Honeypot tegen spam: mensen zien dit veld niet */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="demo-honey" />
      <p className="hg-privacy">{formulier.privacy}</p>
      {status === 'fout' && <p className="demo-error" role="alert">Versturen is niet gelukt. Probeer het later opnieuw.</p>}
      <button type="submit" className="hg-knop hg-knop-primair hg-verstuur" disabled={status === 'versturen'}>
        {status === 'versturen' ? 'Versturen…' : formulier.verstuur}
      </button>
    </form>
  )
}
