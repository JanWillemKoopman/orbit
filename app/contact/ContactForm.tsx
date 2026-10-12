'use client'

import { useRef, useState } from 'react'
import { SuccesDialog } from '@/components/SuccesDialog'

export function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const formulier = useRef<HTMLFormElement>(null)

  return (
    <>
    <form
      ref={formulier}
      className="contact-form"
      onSubmit={async (e) => {
        e.preventDefault()
        setStatus('sending')
        const data = Object.fromEntries(new FormData(e.currentTarget))
        try {
          const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
          if (res.ok) formulier.current?.reset()
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
    <SuccesDialog open={status === 'sent'} onClose={() => setStatus('idle')} />
    </>
  )
}
