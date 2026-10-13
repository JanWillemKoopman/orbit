import { NextResponse } from 'next/server'
import { stuurMelding, tekst } from '@/lib/mail'

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
  const email = tekst(body.email)
  const telefoon = tekst(body.telefoon, 40)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || telefoon.replace(/\D/g, '').length < 6) {
    return NextResponse.json({ error: 'E-mailadres en telefoonnummer zijn verplicht' }, { status: 400 })
  }

  const naam = voornaam || '(geen naam opgegeven)'
  const uitkomst = await stuurMelding({
    replyTo: email,
    subject: `Nieuwe demo-aanvraag van ${naam}`,
    text: `Nieuwe demo-aanvraag\n\nNaam: ${naam}\nZakelijk e-mailadres: ${email}\nTelefoonnummer: ${telefoon}\n`,
  })
  if (uitkomst === 'niet-ingesteld') return NextResponse.json({ error: 'E-mail is niet ingesteld' }, { status: 500 })
  if (uitkomst === 'mislukt') return NextResponse.json({ error: 'Versturen mislukt' }, { status: 502 })
  return NextResponse.json({ ok: true })
}
