'use client'

import Link from 'next/link'
import { useState } from 'react'
import { aanmelden } from '@/content/aanmelden'

// Het aanmeldformulier van een bureau, in de popup achter "Gratis uitproberen" en op de pagina /aanmelden.
// Verstuurt naar /api/aanmelden, dat de aanmelding per e-mail doorstuurt. Onder het formulier staat een
// link naar /demo, voor wie eerst met ons wil praten.
export function AanmeldForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  if (status === 'sent') {
    return <p className="demo-success" role="status">{aanmelden.bedankt}</p>
  }

  return (
    <>
      <form
        className="demo-form"
        onSubmit={async (e) => {
          e.preventDefault()
          setStatus('sending')
          const data = Object.fromEntries(new FormData(e.currentTarget))
          try {
            const res = await fetch('/api/aanmelden', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
            setStatus(res.ok ? 'sent' : 'error')
          } catch {
            setStatus('error')
          }
        }}
      >
        <div className="aanmeld-namen">
          <div className="field">
            <label htmlFor="aanmeld-voornaam" className="sr-only">Voornaam</label>
            <input id="aanmeld-voornaam" name="voornaam" required autoComplete="given-name" placeholder="Voornaam" />
          </div>
          <div className="field">
            <label htmlFor="aanmeld-achternaam" className="sr-only">Achternaam</label>
            <input id="aanmeld-achternaam" name="achternaam" required autoComplete="family-name" placeholder="Achternaam" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="aanmeld-bedrijf" className="sr-only">Bedrijfsnaam</label>
          <input id="aanmeld-bedrijf" name="bedrijf" required autoComplete="organization" placeholder="Bedrijfsnaam" />
        </div>
        <div className="field">
          <label htmlFor="aanmeld-email" className="sr-only">Zakelijk e-mailadres</label>
          <input id="aanmeld-email" name="email" type="email" required autoComplete="email" placeholder="Zakelijk e-mailadres" />
        </div>
        {/* Honeypot tegen spam: mensen zien dit veld niet */}
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="demo-honey" />
        {status === 'error' && <p className="demo-error" role="alert">Versturen is niet gelukt. Probeer het later opnieuw.</p>}
        <button type="submit" className="btn demo-submit" disabled={status === 'sending'}>
          {status === 'sending' ? <span className="glans">Versturen…</span> : aanmelden.verstuur}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <p className="aanmeld-privacy">{aanmelden.privacy}</p>
      </form>
      <p className="aanmeld-demo">
        {aanmelden.demoVraag} <Link href="/demo">{aanmelden.demoLink}</Link>
      </p>
    </>
  )
}
