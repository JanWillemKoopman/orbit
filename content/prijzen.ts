import type { FaqItem } from './home'

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

// Veelgestelde vragen over de prijzen, onder 'Bij elk plan inbegrepen'. De eerste drie staan links,
// de laatste drie rechts. Houd de antwoorden gelijk met de plannen hieronder.
export const faq: { title: string; items: FaqItem[] } = {
  title: 'Veelgestelde vragen over de prijzen',
  items: [
    {
      question: 'Welk plan past bij mijn bureau?',
      answer: 'Dat hangt af van het aantal klanten waarvoor je Orbit inzet. Small is voor 1 klant, en voor een tweede klant betaal je €25 per maand extra. Medium is voor 3 tot 10 klanten. Werk je voor meer dan 10 klanten, dan past Large, met een prijs op maat. Met de klantenkiezer boven de plannen zie je direct welk plan bij jouw aantal hoort.',
    },
    {
      question: 'Wat gebeurt er als mijn bureau groeit?',
      answer: 'Dan groeit je plan mee. Bij Small voeg je een extra klant toe voor €25 per maand. Kom je op 3 klanten of meer, dan stap je over naar Medium, en boven de 10 klanten stemmen we Large af op jouw volume. Je hoeft niet vooraf te kiezen voor een groter plan dan je nu nodig hebt.',
    },
    {
      question: 'Hoeveel artikelen zitten er in een plan?',
      answer: 'Bij Small schrijf je tot 10 artikelen per maand. Bij Medium krijg je een aantal artikelen per klant per maand, zodat het volume meegroeit met je klantenbestand. Bij Large spreken we het aantal af op basis van wat je bureau nodig heeft.',
    },
    {
      question: 'Zit ik ergens aan vast?',
      answer: 'Nee. Elk plan is maandelijks opzegbaar, zonder looptijd en zonder opzegtermijn van een jaar. Past Orbit niet meer bij je bureau, dan stop je aan het eind van de maand.',
    },
    {
      question: 'Krijg ik bij een goedkoper plan minder functies?',
      answer: 'Nee. Meten, begrijpen, plannen, schrijven en bewijzen zit in elk plan. Medium voegt daar een overzicht van al je klanten en een maandverslag met de naam van je bureau aan toe. Large geeft je daarnaast een vast aanspreekpunt bij Orbit en begeleiding bij het uitrollen over je team.',
    },
    {
      question: 'Kan ik Orbit eerst zien voordat ik kies?',
      answer: 'Ja. Plan een gratis demo, dan laten we zien hoe Orbit werkt voor een bureau als het jouwe. Kies je daarna een plan, dan zetten we je eerste klant samen met je op tijdens de persoonlijke onboarding. Die zit in elk plan.',
    },
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
