'use client'

import { useState } from 'react'

// Er is nog geen backend: het formulier opent het e-mailprogramma met een ingevuld bericht.
// Koppel later eenvoudig een formulierdienst of API-route door onSubmit aan te passen.
export function ContactForm({ email }: { email: string }) {
  const [sent, setSent] = useState(false)

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const subject = `[${data.get('topic')}] Bericht van ${data.get('name')}`
        const body = `${data.get('message')}\n\n—\n${data.get('name')}\n${data.get('email')}${data.get('company') ? `\n${data.get('company')}` : ''}`
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        setSent(true)
      }}
    >
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Naam</label>
          <input id="name" name="name" required autoComplete="name" placeholder="Je naam" />
        </div>
        <div className="field">
          <label htmlFor="email">E-mailadres</label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="naam@bedrijf.nl" />
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="company">Bedrijf <span style={{ color: 'var(--text-quaternary)' }}>(optioneel)</span></label>
          <input id="company" name="company" autoComplete="organization" placeholder="Bedrijfsnaam" />
        </div>
        <div className="field">
          <label htmlFor="topic">Onderwerp</label>
          <select id="topic" name="topic" defaultValue="Algemeen">
            <option>Algemeen</option>
            <option>Samenwerking</option>
            <option>Pers</option>
            <option>Artikelidee</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="message">Bericht</label>
        <textarea id="message" name="message" required placeholder="Waar kunnen we je mee helpen?" />
      </div>
      <div className="form-footer">
        {sent ? <span className="form-success">Je e-mailprogramma is geopend. Bedankt!</span> : <span className="form-note">We gebruiken je gegevens alleen om te reageren.</span>}
        <button type="submit" className="btn btn-invert">Versturen</button>
      </div>
    </form>
  )
}
