'use client'

import { useState } from 'react'

const groottes = ['1–10', '11–50', '51–200', '201–500', '501–1.000', '1.001–5.000', '5.001–10.000', '10.000+']

export function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  if (status === 'sent') {
    return <p className="contact-success" role="status">Bedankt voor je bericht! We nemen binnen één werkdag contact met je op.</p>
  }

  return (
    <form
      className="contact-form"
      onSubmit={async (e) => {
        e.preventDefault()
        setStatus('sending')
        const data = Object.fromEntries(new FormData(e.currentTarget))
        try {
          const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
          setStatus(res.ok ? 'sent' : 'error')
        } catch {
          setStatus('error')
        }
      }}
    >
      <div className="contact-field">
        <label htmlFor="contact-naam">Volledige naam</label>
        <input id="contact-naam" name="naam" required autoComplete="name" placeholder="Jan de Vries" />
      </div>
      <div className="contact-field">
        <label htmlFor="contact-email">Zakelijk e-mailadres</label>
        <input id="contact-email" name="email" type="email" required autoComplete="email" placeholder="jan@bedrijf.nl" />
      </div>
      <div className="contact-field">
        <label htmlFor="contact-grootte">Bedrijfsgrootte</label>
        <div className="contact-select">
          <select id="contact-grootte" name="grootte" defaultValue="10.000+">
            {groottes.map((g) => <option key={g}>{g}</option>)}
          </select>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4.5 6L8 2.5 11.5 6M4.5 10L8 13.5 11.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </div>
      <div className="contact-field">
        <label htmlFor="contact-bericht">Vertel ons over je wensen</label>
        <textarea id="contact-bericht" name="bericht" required placeholder="Ik ben geïnteresseerd in Orbit voor mijn team…" />
      </div>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="demo-honey" />
      {status === 'error' && <p className="demo-error" role="alert">Versturen is niet gelukt. Probeer het later opnieuw.</p>}
      <div className="contact-actions">
        <button type="submit" className="btn btn-lg btn-invert" disabled={status === 'sending'}>{status === 'sending' ? 'Versturen…' : 'Bericht versturen'}</button>
        <span className="contact-mail">Je kunt ons ook mailen op <a href={`mailto:${email}`}>{email}</a></span>
      </div>
    </form>
  )
}
