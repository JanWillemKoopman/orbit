// Teksten en prijzen van de pagina Prijzen (/prijzen). Alles hieronder mag je vrij aanpassen; de opmaak volgt vanzelf.
// Let op: de prijzen van Medium en Large en de functies per plan zijn voorlopig. Alleen Small (€100 per maand,
// 1 klant, 10 artikelen, extra klant €25) komt uit de uitgangspunten.

export const hero = {
  eyebrow: 'Prijzen',
  title: ['Kies het plan dat', 'bij jouw agency past.'],
  description: 'Transparante prijzen om je content te schalen en zichtbaar te worden in Google en AI-antwoordmachines zoals ChatGPT en Gemini.',
}

// De afsluiter onderaan de pagina: één knop naar /contact.
export const afsluiter = {
  titel: 'Lanceer je missie in Orbit',
  knop: 'Neem vandaag nog contact op',
}

// Wat bij elk plan hoort. Eerste punt is het belangrijkste: de onboarding.
export const inbegrepen = {
  onboarding: 'Inclusief persoonlijke onboarding',
  punten: [
    { titel: 'Persoonlijke onboarding', tekst: 'We zetten je eerste klant samen met je op, zodat je meteen weet hoe het werkt.' },
    { titel: 'Maandelijks opzegbaar', tekst: 'Geen looptijd en geen opzegtermijn van een jaar. Stop wanneer het niet meer past.' },
    { titel: 'Alle onderdelen van Orbit', tekst: 'Meten, begrijpen, plannen, schrijven en bewijzen zit in elk plan.' },
  ],
}

// Label bij een plan met korting.
export const kortingLabel = 'Tijdelijk'

// Prijs van een extra klant bij Small, zonder korting.
export const extraKlant = 25

export type Plan = {
  id: 'small' | 'medium' | 'large'
  naam: string
  /** Voor wie het plan is, in één regel boven de prijs. */
  klanten: string
  /** Eerste en laatste aantal klanten waarvoor dit plan geldt (voor de klantenkiezer). */
  van: number
  tot: number | null
  /** Bedrag per maand in euro's, of null voor een prijs op maat. */
  prijs: number | null
  /** Tijdelijke korting in procenten. Haal de regel weg om de actie te stoppen. */
  korting?: number
  /** Klein woordje vóór het bedrag, bijvoorbeeld "Vanaf". */
  voorPrijs?: string
  /** Wat er na het bedrag staat. */
  perPeriode: string
  beschrijving: string
  /** Eerste regel boven de lijst, zoals "Alles uit Small, plus:". */
  kop: string
  punten: string[]
  knop: { label: string; type: 'demo' | 'contact' }
}

export const plannen: Plan[] = [
  {
    id: 'small',
    naam: 'Small agency',
    klanten: '1 klant',
    van: 1,
    tot: 2,
    prijs: 100,
    korting: 50,
    perPeriode: 'per maand',
    beschrijving: 'Voor een klein bureau dat begint met AI-zichtbaarheid voor de eerste klant.',
    kop: 'Wat je krijgt',
    punten: [
      '1 klant inbegrepen',
      'Tot 10 artikelen per maand',
      'Extra klant voor €25 per maand',
      'Alle onderdelen van Orbit',
    ],
    knop: { label: 'Plan een gratis demo', type: 'demo' },
  },
  {
    id: 'medium',
    naam: 'Medium agency',
    klanten: '3 tot 10 klanten',
    van: 3,
    tot: 10,
    prijs: 250,
    korting: 50,
    voorPrijs: 'Vanaf',
    perPeriode: 'per maand',
    beschrijving: 'Voor een bureau dat AI-zichtbaarheid als vaste maandelijkse dienst verkoopt aan meerdere klanten.',
    kop: 'Alles uit Small, plus:',
    punten: [
      '3 tot 10 klanten',
      'Artikelen per klant per maand',
      'Alle klanten in één overzicht',
      'Maandverslag met jouw naam erop',
    ],
    knop: { label: 'Plan een gratis demo', type: 'demo' },
  },
  {
    id: 'large',
    naam: 'Large agency',
    klanten: 'Meer dan 10 klanten',
    van: 11,
    tot: null,
    prijs: null,
    perPeriode: 'op maat',
    beschrijving: 'Voor een bureau met een grote klantenportefeuille. We stemmen het pakket af op jouw volume.',
    kop: 'Alles uit Medium, plus:',
    punten: [
      'Meer dan 10 klanten',
      'Prijs op maat naar volume',
      'Vaste aanspreekpunt bij Orbit',
      'Begeleiding bij het uitrollen over je team',
    ],
    knop: { label: 'Plan een gesprek', type: 'contact' },
  },
]
