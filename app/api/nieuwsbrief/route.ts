import { NextResponse } from 'next/server'
import { stuurMelding, tekst } from '@/lib/mail'

// Aanmelding voor de maandelijkse nieuwsbrief vanuit de popup op de homepage.
export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ongeldig verzoek' }, { status: 400 })
  }

  // Honeypot: bots vullen dit veld in. Doe alsof het gelukt is.
  if (tekst(body.website)) return NextResponse.json({ ok: true })

  const email = tekst(body.email)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Vul een geldig e-mailadres in' }, { status: 400 })
  }

  const uitkomst = await stuurMelding({
    replyTo: email,
    subject: `Nieuwe aanmelding nieuwsbrief: ${email}`,
    text: `Nieuwe aanmelding voor de nieuwsbrief via de popup op de homepage\n\nZakelijk e-mailadres: ${email}\n`,
  })
  if (uitkomst === 'niet-ingesteld') return NextResponse.json({ error: 'E-mail is niet ingesteld' }, { status: 500 })
  if (uitkomst === 'mislukt') return NextResponse.json({ error: 'Versturen mislukt' }, { status: 502 })
  return NextResponse.json({ ok: true })
}
