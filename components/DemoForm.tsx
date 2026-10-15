'use client'

import { useState } from 'react'

// Het demo-aanvraagformulier, gebruikt in de popup (header) en op de pagina /demo.
// Verstuurt naar /api/demo, dat een melding per e-mail stuurt.
export function DemoForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  if (status === 'sent') {
    return <p className="demo-success" role="status">Bedankt! We hebben je aanvraag ontvangen en nemen snel contact met je op om een moment te plannen.</p>
  }

  return (
    <form
      className="demo-form"
      onSubmit={async (e) => {
        e.preventDefault()
        setStatus('sending')
        const data = Object.fromEntries(new FormData(e.currentTarget))
        try {
          const res = await fetch('/api/demo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
          setStatus(res.ok ? 'sent' : 'error')
        } catch {
          setStatus('error')
        }
      }}
    >
      <div className="field">
        <label htmlFor="demo-voornaam" className="sr-only">Voornaam</label>
        <input id="demo-voornaam" name="voornaam" autoComplete="given-name" placeholder="Voornaam" />
      </div>
      <div className="field">
        <label htmlFor="demo-email" className="sr-only">Zakelijk e-mailadres</label>
        <input id="demo-email" name="email" type="email" required autoComplete="email" placeholder="Zakelijk e-mailadres *" />
      </div>
      <div className="field">
        <label htmlFor="demo-telefoon" className="sr-only">Telefoonnummer</label>
        <input id="demo-telefoon" name="telefoon" type="tel" required autoComplete="tel" placeholder="Telefoonnummer *" />
      </div>
      {/* Honeypot tegen spam: mensen zien dit veld niet */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="demo-honey" />
      {status === 'error' && <p className="demo-error" role="alert">Versturen is niet gelukt. Probeer het later opnieuw.</p>}
      <button type="submit" className="btn demo-submit" disabled={status === 'sending'}>
        {status === 'sending' ? <span className="glans">Versturen…</span> : 'Plan mijn demo'}
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </form>
  )
}
