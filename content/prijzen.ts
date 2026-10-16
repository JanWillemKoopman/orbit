// Teksten en prijzen van de pagina Prijzen (/prijzen). Alles hieronder mag je vrij aanpassen; de opmaak volgt vanzelf.
// Let op: de prijzen van Medium en Large en de functies per plan zijn voorlopig. Alleen Small (€100 per maand,
// 1 klant, 10 artikelen, extra klant €25) komt uit de uitgangspunten.
import type { FaqItem } from './home'

export const hero = {
  eyebrow: 'Prijzen',
  title: ['Kies het plan dat', 'bij jouw agency past.'],
  description: 'Transparante prijzen om je content te schalen en zichtbaar te worden in Google en AI-antwoordmachines zoals ChatGPT en Gemini.',
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

export type Plan = {
  id: 'small' | 'medium' | 'large'
  naam: string
  /** Voor wie het plan is, in één regel boven de prijs. */
  klanten: string
  /** Eerste en laatste aantal klanten waarvoor dit plan geldt (voor de klantenkiezer). */
  van: number
  tot: number | null
  prijs: string | null
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
    prijs: '€100',
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
    prijs: '€250',
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

// Waarde per plan in de volgorde Small, Medium, Large. `true` en `false` worden een vinkje of een streepje.
export type Waarde = string | boolean
export type Rij = { label: string; waarden: [Waarde, Waarde, Waarde] }
export type Groep = { titel: string; rijen: Rij[] }

export const vergelijking: { titel: string; groepen: Groep[] } = {
  titel: 'Vergelijk de plannen',
  groepen: [
    {
      titel: 'Capaciteit',
      rijen: [
        { label: 'Klanten', waarden: ['1', '3 tot 10', 'Meer dan 10'] },
        { label: 'Extra klant erbij', waarden: ['€25 per maand', 'Op aanvraag', 'Op aanvraag'] },
        { label: 'Artikelen per maand', waarden: ['Tot 10', 'Per klant', 'Op maat'] },
      ],
    },
    {
      titel: 'Meten en begrijpen',
      rijen: [
        { label: 'Zichtbaarheid in AI meten', waarden: [true, true, true] },
        { label: 'Zien welke concurrenten genoemd worden', waarden: [true, true, true] },
        { label: 'Merkdossier per klant', waarden: [true, true, true] },
      ],
    },
    {
      titel: 'Plannen en schrijven',
      rijen: [
        { label: 'Contentplan voor twaalf maanden', waarden: [true, true, true] },
        { label: 'Artikelen die kloppen met de feiten van je klant', waarden: [true, true, true] },
        { label: 'Alle klanten in één overzicht', waarden: [false, true, true] },
      ],
    },
    {
      titel: 'Bewijzen',
      rijen: [
        { label: 'Resultaat per pagina na 14 en 28 dagen', waarden: [true, true, true] },
        { label: 'Maandverslag met de naam van je bureau', waarden: [true, true, true] },
        { label: 'Klant kijkt zelf mee', waarden: [true, true, true] },
      ],
    },
    {
      titel: 'Begeleiding',
      rijen: [
        { label: 'Persoonlijke onboarding', waarden: [true, true, true] },
        { label: 'Maandelijks opzegbaar', waarden: [true, true, true] },
        { label: 'Vast aanspreekpunt', waarden: [false, false, true] },
      ],
    },
  ],
}

export const faq: { title: string; items: FaqItem[] } = {
  title: 'Veelgestelde vragen over prijzen',
  items: [
    {
      question: 'Zit er een looptijd aan?',
      answer: 'Nee. Je betaalt per maand en je kunt elke maand opzeggen. Je zit nergens aan vast.',
    },
    {
      question: 'Wat zit er in de persoonlijke onboarding?',
      answer: 'Bij elk plan zetten we samen met jou je eerste klant op. Je krijgt een persoon om mee te werken, geen handleiding om zelf uit te zoeken.',
    },
    {
      question: 'Hoe weet ik welk plan bij mijn bureau past?',
      answer: 'Het aantal klanten bepaalt het plan: één klant is Small, drie tot tien klanten is Medium en meer dan tien klanten is Large. Twijfel je, plan dan een demo; dan kijken we er samen naar.',
    },
    {
      question: 'Kan ik een extra klant toevoegen?',
      answer: 'Ja. Bij Small kost een extra klant €25 per maand. Voor Medium en Large bespreken we dat in het gesprek.',
    },
  ],
}
