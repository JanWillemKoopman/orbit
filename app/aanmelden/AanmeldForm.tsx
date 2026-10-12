'use client'

import { useState } from 'react'

// Nog geen backend: net als het contactformulier opent dit het e-mailprogramma met een ingevuld bericht.
export function AanmeldForm({ email }: { email: string }) {
  const [sent, setSent] = useState(false)

  return (
    <form
      className="signup-form"
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const subject = `Accountaanvraag van ${data.get('name')}`
        const body = `Voornaam: ${data.get('name')}\nE-mailadres: ${data.get('email')}\nBedrijf: ${data.get('company')}`
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        setSent(true)
      }}
    >
      <div className="field">
        <label htmlFor="name">Voornaam</label>
        <input id="name" name="name" required autoComplete="given-name" autoFocus />
      </div>
      <div className="field">
        <label htmlFor="email">E-mailadres</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="company">Bedrijf</label>
        <input id="company" name="company" required autoComplete="organization" />
      </div>
      {sent && <span className="signup-success">Je e-mailprogramma is geopend. Bedankt!</span>}
      <button type="submit" className="btn">Account aanvragen</button>
    </form>
  )
}
