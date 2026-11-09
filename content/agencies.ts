// Teksten van de pagina Agencies (/agencies): de verkooppagina voor de eigenaar van een marketingbureau.
// Waar /werkwijze laat zien hoe Orbit werkt, zegt deze pagina waarom een bureau ervoor kiest. Opbouw naar
// linear.app, met zo min mogelijk: de hero met achtergrondvideo, een tekstblok met vier voordelen zoals op de
// homepage, één groot beeld van het werkoverzicht met al je klanten, twee secties met een illustratie en
// tekst naast elkaar (grip op kosten en whitelabel) en de afsluiter.
// Elke belofte hier bestaat in de app (de kern: bedrijven, clusters, contentplan, schrijven, resultaten,
// kijkers en het design per bureau). De tools die in de wacht staan, komen op deze pagina niet voor.

import type { Usp } from './home'

export const meta = {
  title: 'Agencies',
  description:
    'Orbit is het platform voor marketingbureaus die AI-zichtbaarheid als vaste dienst verkopen: al je klanten bij elkaar, onbeperkt klanten, je klant kijkt mee en alles in de huisstijl van je bureau.',
}

export const hero = {
  eyebrow: 'Agencies',
  title: "AI-software voor marketing agency's met groeiambitie",
}

// Kop (links), uitleg (rechts) en vier voordelen met een vinkje, in de opbouw van het blok
// "Ontwikkeld voor marketingbureaus" op de homepage (uspIntro en usps in content/home.ts): op desktop een
// korte titel met een regel uitleg, op mobiel de lange titel zonder uitleg.
// Bron van de uitleg: docs/ORBIT_WAAROM.md (4.1) in orbit-engine.
export const usp: { titel: string; tekst: string; punten: Usp[] } = {
  titel: 'Eén platform voor je hele bureau',
  tekst:
    'Orbit helpt je bureau AI-zichtbaarheid als vaste dienst te verkopen, voor al je klanten tegelijk. Jullie bepalen met de klant de koers, Orbit doet het werk.',
  punten: [
    {
      kort: 'Alle klanten op één plek',
      titel: 'Beheer al je klanten vanuit één platform',
      uitleg: 'Het werkoverzicht toont al je klanten op één scherm. Start de maand voor allemaal tegelijk.',
    },
    {
      kort: 'Jouw huisstijl',
      titel: 'Volledig in de huisstijl van je bureau',
      uitleg: 'Je logo, je kleuren en je lettertypes op elk scherm. Je team en je klanten zien jouw platform.',
    },
    {
      kort: 'Je klant kijkt mee',
      titel: 'Laat je klant meekijken',
      uitleg: 'Als kijker ziet je klant alleen zijn eigen bedrijf, met uitleg in gewone taal op elk scherm.',
    },
    {
      kort: 'Werk uit handen',
      titel: 'Neem je specialisten werk uit handen',
      uitleg: 'Orbit meet, stelt het merkdossier op en schrijft de eerste versie. Je specialisten sturen bij.',
    },
  ],
}

export const beeld = {
  titel: 'Het werkoverzicht van je bureau',
  tekst: 'Wat het langst wacht, staat bovenaan. Vink klanten aan en start de maand voor allemaal tegelijk.',
}

// Grote tussenzin onder het werkoverzicht, in dezelfde vorm als op de homepage: het vetgedrukte deel staat
// in het wit, de rest in grijs, en de woorden lichten op tijdens het scrollen.
export const statement = {
  strong: 'Van klantstrategie tot groeikans in AI zichtbaarheid.',
  rest: 'Orbit brengt analyse, contentcreatie, publicatie en nameting samen in één doorlopende workflow. Jouw team bepaalt de koers. AI versnelt de uitvoering.',
}

// Twee secties onder het grote beeld, elk met een illustratie en tekst naast elkaar.
export const secties = [
  {
    id: 'kosten',
    label: 'Grip op kosten',
    titel: 'Hanteer je bureautarief. Jij betaalt kostprijs.',
    tekst:
      'Een pagina schrijven kost met Orbit minder dan een euro aan AI, onderzoek en eindredactie inbegrepen. Je betaalt de echte kostprijs, rechtstreeks bij OpenAI, zonder opslag en zonder prijs per klant. Wat je je klant rekent, bepaal je zelf. Het verschil is je marge, en je ziet per klant precies hoe groot die is.',
    punten: [
      'AI tegen kostprijs, zonder opslag of prijs per klant',
      'Per klant zien wat hij kost, en per maand exporteren',
      'Een maandlimiet en vooraf de kosten bij elke knop',
    ],
  },
  {
    id: 'whitelabel',
    label: 'Whitelabel',
    titel: 'Jouw bureau. Jouw huisstijl.',
    tekst:
      'Orbit draait volledig in de huisstijl van je bureau: je logo, je kleuren, je lettertypes en je vormen, op elk scherm. Je team en je klanten zien jouw platform. Het redesign van de interface doen wij, en dat is inbegrepen.',
    punten: [
      'Je logo linksboven in de app',
      'Je kleuren en lettertypes op elk scherm',
      'Een maandverslag met de naam van je bureau',
    ],
  },
]

export const afsluiter = {
  title: 'Laat je bureau groeien met Orbit.',
  description: 'Plan een demo. We laten je Orbit zien in de huisstijl van jouw bureau.',
}
