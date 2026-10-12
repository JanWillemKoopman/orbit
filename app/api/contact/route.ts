import { NextResponse } from 'next/server'
import { stuurMelding, tekst } from '@/lib/mail'

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ongeldig verzoek' }, { status: 400 })
  }

  if (tekst(body.website)) return NextResponse.json({ ok: true })

  const naam = tekst(body.naam)
  const email = tekst(body.email)
  const grootte = tekst(body.grootte, 40)
  const bericht = tekst(body.bericht, 5000)
  if (!naam || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !bericht) {
    return NextResponse.json({ error: 'Vul alle velden in' }, { status: 400 })
  }

  const uitkomst = await stuurMelding({
    replyTo: email,
    subject: `Contactaanvraag van ${naam}`,
    text: `Nieuw bericht via /contact\n\nNaam: ${naam}\nZakelijk e-mailadres: ${email}\nBedrijfsgrootte: ${grootte || '-'}\n\n${bericht}\n`,
  })
  if (uitkomst === 'niet-ingesteld') return NextResponse.json({ error: 'E-mail is niet ingesteld' }, { status: 500 })
  if (uitkomst === 'mislukt') return NextResponse.json({ error: 'Versturen mislukt' }, { status: 502 })
  return NextResponse.json({ ok: true })
}
