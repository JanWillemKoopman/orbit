import { NextResponse } from 'next/server'
import { stuurMelding, tekst } from '@/lib/mail'

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ongeldig verzoek' }, { status: 400 })
  }

  // Honeypot: bots vullen dit veld in. Doe alsof het gelukt is.
  if (tekst(body.website)) return NextResponse.json({ ok: true })

  // Het formulier van /homepagina6 vraagt naam, e-mailadres, bureau en een optionele vraag, en geen telefoonnummer.
  if (body.formulier === 'homepagina6') {
    const naam = tekst(body.naam)
    const email = tekst(body.email)
    const bureau = tekst(body.bureau)
    const vraag = tekst(body.vraag, 2000)
    if (!naam || !bureau || !isEmail(email)) {
      return NextResponse.json({ error: 'Naam, e-mailadres en bureau zijn verplicht' }, { status: 400 })
    }
    return antwoord(await stuurMelding({
      replyTo: email,
      subject: `Nieuwe demo-aanvraag van ${naam} (${bureau})`,
      text: `Nieuwe demo-aanvraag via /homepagina6\n\nNaam: ${naam}\nZakelijk e-mailadres: ${email}\nBureau of bedrijfsnaam: ${bureau}\nWat wil je met Orbit onderzoeken: ${vraag || '(niet ingevuld)'}\n`,
    }))
  }

  const voornaam = tekst(body.voornaam)
  const email = tekst(body.email)
  const telefoon = tekst(body.telefoon, 40)
  if (!isEmail(email) || telefoon.replace(/\D/g, '').length < 6) {
    return NextResponse.json({ error: 'E-mailadres en telefoonnummer zijn verplicht' }, { status: 400 })
  }

  const naam = voornaam || '(geen naam opgegeven)'
  return antwoord(await stuurMelding({
    replyTo: email,
    subject: `Nieuwe demo-aanvraag van ${naam}`,
    text: `Nieuwe demo-aanvraag\n\nNaam: ${naam}\nZakelijk e-mailadres: ${email}\nTelefoonnummer: ${telefoon}\n`,
  }))
}

function antwoord(uitkomst: Awaited<ReturnType<typeof stuurMelding>>) {
  if (uitkomst === 'niet-ingesteld') return NextResponse.json({ error: 'E-mail is niet ingesteld' }, { status: 500 })
  if (uitkomst === 'mislukt') return NextResponse.json({ error: 'Versturen mislukt' }, { status: 502 })
  return NextResponse.json({ ok: true })
}
