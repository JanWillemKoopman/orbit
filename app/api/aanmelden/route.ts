import { NextResponse } from 'next/server'
import { stuurMelding, tekst } from '@/lib/mail'

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

// Aanmelding van een bureau voor een gratis account (AanmeldForm). Komt als e-mail binnen, op hetzelfde
// adres als de demo-aanvragen (lib/mail.ts).
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
  const bedrijf = tekst(body.bedrijf)
  const email = tekst(body.email)
  if (!voornaam || !achternaam || !bedrijf || !isEmail(email)) {
    return NextResponse.json({ error: 'Voornaam, achternaam, bedrijfsnaam en e-mailadres zijn verplicht' }, { status: 400 })
  }

  const uitkomst = await stuurMelding({
    replyTo: email,
    subject: `Nieuwe aanmelding: ${bedrijf} (${voornaam} ${achternaam})`,
    text: `Nieuwe aanmelding om Orbit gratis uit te proberen\n\nVoornaam: ${voornaam}\nAchternaam: ${achternaam}\nBedrijfsnaam: ${bedrijf}\nZakelijk e-mailadres: ${email}\n`,
  })
  if (uitkomst === 'niet-ingesteld') return NextResponse.json({ error: 'E-mail is niet ingesteld' }, { status: 500 })
  if (uitkomst === 'mislukt') return NextResponse.json({ error: 'Versturen mislukt' }, { status: 502 })
  return NextResponse.json({ ok: true })
}
