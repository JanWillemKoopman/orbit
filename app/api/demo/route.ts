import { NextResponse } from 'next/server'

// Stuurt een melding per e-mail via Resend. Instellen als omgevingsvariabelen (Vercel):
//   RESEND_API_KEY  (verplicht)
//   DEMO_NOTIFY_TO  (optioneel, standaard koopman.janwillem@gmail.com)
//   DEMO_MAIL_FROM  (optioneel, standaard het testadres van Resend; gebruik een eigen geverifieerd domein voor productie)
const TO = process.env.DEMO_NOTIFY_TO ?? 'koopman.janwillem@gmail.com'
const FROM = process.env.DEMO_MAIL_FROM ?? 'Orbit <onboarding@resend.dev>'

const tekst = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ongeldig verzoek' }, { status: 400 })
  }

  // Honeypot: bots vullen dit veld in. Doe alsof het gelukt is.
  if (tekst(body.website)) return NextResponse.json({ ok: true })

  const voornaam = tekst(body.voornaam)
  const achternaam = tekst(body.achternaam)
  const email = tekst(body.email)
  const telefoon = tekst(body.telefoon, 40)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || telefoon.replace(/\D/g, '').length < 6) {
    return NextResponse.json({ error: 'E-mailadres en telefoonnummer zijn verplicht' }, { status: 400 })
  }

  const key = process.env.RESEND_API_KEY
  if (!key) return NextResponse.json({ error: 'E-mail is niet ingesteld' }, { status: 500 })

  const naam = [voornaam, achternaam].filter(Boolean).join(' ') || '(geen naam opgegeven)'
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `Nieuwe demo-aanvraag van ${naam}`,
      text: `Nieuwe demo-aanvraag\n\nNaam: ${naam}\nZakelijk e-mailadres: ${email}\nTelefoonnummer: ${telefoon}\n`,
    }),
  })
  if (!res.ok) return NextResponse.json({ error: 'Versturen mislukt' }, { status: 502 })
  return NextResponse.json({ ok: true })
}
