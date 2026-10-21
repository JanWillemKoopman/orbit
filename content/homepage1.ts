// Teksten van de testhomepage (/homepage1). Elke bewering hier staat in de productdocumentatie of in de
// code van ORBIT ENGINE. Getallen in de beelden (components/homepage1) zijn voorbeelddata van verzonnen bedrijven.
import type { FaqItem } from '@/content/home'

export const hero = {
  title: ['Verkoop AI-zichtbaarheid', 'als vaste dienst van je bureau.'],
  description: "Orbit meet hoe vaak ChatGPT, Gemini en Google je klanten aanraden, schrijft de pagina's die dat veranderen en laat zien wat ze opleverden.",
  // De link rechts in de hero opent de demo-popup, net als de knop in de header.
  link: { label: 'Gratis demo', titel: 'Plan 15 minuten met ons' },
}

export const voorbeeld = 'Alle schermen op deze pagina zijn voorbeelden met verzonnen bedrijven.'

export const probleem = {
  titel: 'Je klant wordt aanbevolen. Of zijn concurrent.',
  tekst: 'Steeds meer mensen vragen ChatGPT welk bedrijf ze moeten kiezen. Het antwoord noemt een handvol namen. Wie daar niet tussen staat, bestaat voor die klant niet, en geen dashboard van Google laat het zien.',
}

export const werkwijze = {
  titel: 'Eén kringloop, elke maand opnieuw',
  tekst: 'De meting voedt het plan, het plan voedt de teksten en de teksten worden weer gemeten.',
  stappen: [
    { titel: 'Meten', tekst: 'Hoe vaak noemen ChatGPT, Gemini en Google je klant, en wie wel?' },
    { titel: 'Plannen', tekst: 'Elke gemiste vraag wordt een pagina-idee in een plan voor twaalf maanden.' },
    { titel: 'Schrijven', tekst: 'Teksten in de stem van het merk, met een vangnet tegen verzonnen feiten.' },
    { titel: 'Publiceren', tekst: 'Plakklaar voor elk CMS. Orbit controleert of de pagina live staat.' },
    { titel: 'Hermeten', tekst: 'Na 14 en 28 dagen meet Orbit vanzelf opnieuw.' },
  ],
}

// De drie punten waarop een kritische klant doorvraagt, elk met één beeld.
export const pijlers = [
  {
    id: 'meten',
    titel: 'Een cijfer dat standhoudt',
    tekst: 'AI-antwoorden verschillen per keer. Orbit stelt elke maand dezelfde vragen langs de hele klantreis en zet bij elk cijfer een marge. Zo weet je of een verschil echt is, voordat je het aan je klant laat zien.',
    link: { label: 'Zo meet Orbit', href: '/werkwijze' },
  },
  {
    id: 'schrijven',
    titel: 'Teksten zonder verzonnen beloftes',
    tekst: 'Elk bedrag, elke termijn en elk keurmerk wordt gecontroleerd tegen wat over het bedrijf vaststaat. Zonder bron wordt de zin geel, en de pagina kan pas worden goedgekeurd als die zin bevestigd is.',
    link: { label: 'Zo bewaakt Orbit de kwaliteit', href: '/kwaliteit' },
  },
  {
    id: 'bewijzen',
    titel: 'Bewijs per pagina',
    tekst: "Na 14 en 28 dagen meet Orbit opnieuw op precies de vragen waarvoor een pagina geschreven is. Alleen pagina's die Orbit schreef tellen mee. Elke maand ligt er een verslag met de naam van je bureau erop.",
    link: { label: 'Bekijk de werkwijze', href: '/werkwijze' },
  },
]

export const oplevert = {
  titel: 'Wat het oplevert',
  bureau: {
    kop: 'Voor je bureau',
    punten: [
      'Een nieuwe, terugkerende dienst: maandelijkse monitoring en GEO-content',
      'Nieuwe klanten winnen met een pitch en een GEO-audit in je eigen huisstijl',
      'Klanten die blijven, omdat ze per pagina zien wat het deed',
      'Meer content leveren zonder elke zin zelf na te lopen',
    ],
  },
  klant: {
    kop: 'Voor je klant',
    punten: [
      'Weten of AI zijn bedrijf aanraadt, en wie in zijn plaats',
      "Pagina's in zijn eigen stem, zonder verzonnen beloftes",
      'Vragen beantwoorden via een link, zonder account',
      'Elke maand een verslag van wat er gebeurde',
    ],
  },
}

export const bureau = {
  titel: 'Al je klanten op één scherm',
  tekst: 'Zie per klant de zichtbaarheid, wat er wacht en wat het kost. Je collega\'s werken als beheerder, je klanten kijken mee als kijker, en andere bureaus zien niets van jou.',
  link: { label: 'Zo werkt beheer', href: '/beheer' },
  tegels: [
    { titel: 'AI tegen kostprijs', tekst: 'Op de eigen sleutel van je bureau, zonder opslag.' },
    { titel: 'Een maandlimiet', tekst: 'Is hij bereikt, dan stopt al het betaalde werk.' },
    { titel: 'Jouw naam vooraan', tekst: 'Verslagen en meldingen komen van je bureau.' },
    { titel: 'Niets te installeren', tekst: 'Orbit wordt gehost en is volledig Nederlands.' },
  ],
}

export const maker = {
  titel: 'Gemaakt door een analist',
  tekst: 'Orbit is gemaakt door Jan-Willem Koopman, tien jaar marketing data analist. Daarom staat er geen cijfer zonder marge in Orbit, en zit elke controle in de code in plaats van in een belofte.',
  eerlijk: 'Je ziet hier geen klantlogo\'s of beoordelingen, wel precies hoe Orbit werkt.',
  link: { label: 'Lees ons verhaal', href: '/over' },
}

// De bezwaren in de volgorde waarin ze opkomen.
export const faq: { title: string; items: FaqItem[] } = {
  title: 'Veelgestelde vragen',
  items: [
    {
      question: 'Moet mijn team verstand hebben van GEO?',
      answer: 'Nee. Orbit stelt de vragen op, meet, wijst de kansen aan en schrijft de pagina\'s. Je team beoordeelt en beslist. Achter elk vraagteken in de app staat wat je ziet en waarom het zo werkt.',
    },
    {
      question: 'Welke AI-assistenten meet Orbit?',
      answer: 'ChatGPT, Gemini en het AI-overzicht van Google, elk met een eigen cijfer. ChatGPT is de basis; de andere twee zet je er per onderwerp bij.',
    },
    {
      question: "Zet Orbit zelf pagina's op de website van mijn klant?",
      answer: 'Nee. Orbit levert de pagina plakklaar aan, met titel, metabeschrijving, veelgestelde vragen en gestructureerde gegevens. Jij of je klant keurt goed en plaatst hem. Daarna controleert Orbit of hij echt live staat.',
    },
    {
      question: 'Hoe snel zie ik resultaat?',
      answer: 'Je voegt een klant toe met naam en website. Het onderzoek duurt ongeveer tien minuten, daarna volgen de eerste meting, een rapport en pagina-ideeën op de achtergrond. Het effect van een pagina meet Orbit na 14 en 28 dagen.',
    },
    {
      question: 'Wat kost het?',
      answer: 'Twee delen: het gebruik van Orbit, en het AI-gebruik op de eigen sleutel van je bureau, tegen kostprijs. Dat begrens je met een maandlimiet, en bij elke betaalde knop zie je vooraf wat het ongeveer kost.',
    },
    {
      question: 'Wie ziet de gegevens van mijn klanten?',
      answer: 'Alleen je bureau, en de klanten die je als kijker toegang geeft, ieder alleen tot zijn eigen bedrijf. Andere bureaus zien niets van je bureau.',
    },
  ],
}

export const afsluiter = {
  title: 'Maak van AI-zichtbaarheid je volgende dienst.',
  description: 'In een demo van 15 of 45 minuten laten we zien hoe je bureau met Orbit meet, schrijft en bewijst.',
}
