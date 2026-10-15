// Teksten van de pagina AI (/ai), in de opbouw van linear.app/ai: een hero, vijf secties met elk een
// intro (titel, tekst, link) en een groot beeld of een raster, een rij met de vier productpagina's
// en de afsluiter. Elke uitspraak over wie wat doet volgt de code van Orbit: AI onderzoekt,
// meet en schrijft, code controleert en rekent, de mens beslist. De beelden staan in
// components/ai/Visuals.tsx met de fictieve voorbeeldcase Lindeman Warmte.

import type { Bijschrift, Verwijzing } from '@/components/product/Blokken'

export type { Bijschrift, Verwijzing }

export const meta = {
  title: 'AI',
  description:
    'AI onderzoekt, meet en schrijft. Code controleert wat een model niet mag beloven. Jij beslist wat er live gaat. Zo zet Orbit AI in voor online marketingbureaus.',
}

export const hero = {
  eyebrow: 'AI in Orbit',
  title: 'AI doet het werk. Jij beslist wat er live gaat.',
}

export const secties = {
  wie: {
    id: 'wie',
    label: 'Wie doet wat',
    titel: 'De snelheid van AI. Zonder het risico.',
    tekst:
      'AI onderzoekt, meet en schrijft. Code controleert wat een model niet mag beloven. Jij beslist wat er waar is en wat er live gaat.',
    link: { label: 'Hoe de kwaliteit bewaakt wordt', href: '/kwaliteit' },
    beeld: {
      titel: 'Drie partijen, elk met een eigen taak',
      tekst: 'Bij elke stap staat wat AI doet, wat code afdwingt en wat jij beslist.',
    },
    cellen: [
      { titel: 'AI leert je klant kennen in ongeveer tien minuten', tekst: 'Naam en website zijn genoeg. Orbit leest de website en legt aanbod, doelgroep, concurrenten en markt vast. Het onderzoek loopt op de achtergrond.', label: 'Onderzoek' },
      { titel: 'Dertig AI-vragen langs de klantreis', tekst: 'Per onderwerp stelt Orbit standaard dertig AI-vragen op, verdeeld over oriëntatie, overweging en beslissing. Je past ze aan of zet ze uit.' },
      { titel: 'Zie waarom een concurrent wordt genoemd', tekst: 'Per concurrent haalt Orbit de eigenschappen uit de antwoorden, met een letterlijk fragment als bewijs. Dat is het startpunt voor een pagina.' },
      { titel: 'Een brief per pagina, met gerichte vragen', tekst: 'Voor elke pagina zoekt Orbit uit wat erop moet en stelt het hooguit acht vragen aan jou of je klant.' },
    ] as Bijschrift[],
  },
  meten: {
    id: 'meten',
    label: 'Meten',
    titel: 'AI stelt de vragen die jouw klanten stellen.',
    tekst:
      'Orbit stelt elke vraag aan ChatGPT, met zoeken op het web. Per onderwerp zet je Gemini en Google AI Overview erbij. Een tweede AI-stap beoordeelt wie er genoemd wordt. De rekensom is van code, met een marge bij elk cijfer.',
    link: { label: 'Zo zie je het resultaat', href: '/werkwijze' },
    beeld: {
      titel: 'Van vraag tot cijfer met marge',
      tekst: 'AI beantwoordt en beoordeelt, code rekent. Een antwoord dat niet te beoordelen is, telt niet mee.',
    },
    cellen: [
      { titel: 'Wat weet ChatGPT al over je klant?', tekst: 'Orbit vraagt de assistent wat hij over het bedrijf weet, met en zonder zoeken. Code oordeelt of het klopt, zodat je klant ziet waar AI hem verkeerd kent.', label: 'Kennistest' },
      { titel: 'Meet waar je klant gevonden wordt', tekst: 'ChatGPT staat altijd aan en is de basis van het cijfer. Gemini en Google AI Overview zet je per onderwerp erbij. Ze kosten extra per vraag en werken met eigen sleutels.', label: 'Kanalen' },
    ] as Bijschrift[],
  },
  schrijven: {
    id: 'schrijven',
    label: 'Schrijven',
    titel: 'AI schrijft de eerste versie. Een tweede AI leest mee.',
    tekst:
      'Eerst onderzoek, dan gerichte vragen, dan pas schrijven. De eindredacteur verbetert alleen wat nodig is en mag niets nieuws beweren.',
    link: { label: 'Hoe de feiten bewaakt worden', href: '/kwaliteit' },
    beeld: {
      titel: 'Vijf stappen naar een pagina',
      tekst: 'Orbit schrijft pas als alle vragen beantwoord zijn. Daarna volgen de eindredactie en jouw goedkeuring.',
    },
    tweede: {
      titel: 'Schrijven op wat je klant weet',
      tekst: 'De schrijver krijgt alleen feiten met een bron, van binnen en van buiten. Een vermoeden gaat nooit mee als bewering.',
    },
  },
  achtergrond: {
    id: 'achtergrond',
    label: 'Achtergrond',
    titel: 'Alles loopt door als jij je laptop dichtdoet.',
    tekst:
      'Onderzoek, metingen en schrijfwerk draaien op de achtergrond. Elke stap kijkt eerst of zijn resultaat al bestaat, zodat je niet dubbel betaalt. Bij elke betaalde knop staat vooraf ongeveer wat het kost.',
    link: { label: 'Wat het kost', href: '/beheer' },
    beeld: {
      titel: 'Het werk van al je klanten, vanzelf',
      tekst: 'Je ziet wat er loopt, wat wacht en wat niet lukte. Gaat er iets mis, dan staat er in gewone taal wat je doet.',
      label: 'Voorbeeldgegevens',
    },
  },
  grenzen: {
    id: 'grenzen',
    label: 'Grenzen',
    titel: 'Wat AI niet beslist.',
    tekst:
      'Een AI-oordeel is een aanwijzing, geen bewijs. Daarom staat er precies wat AI en code doen, en wat bij jou blijft.',
    cellen: [
      { titel: 'Wat AI en code doen', tekst: 'Onderzoeken, vragen bedenken, antwoorden beoordelen, een pagina schrijven en nalezen. Code rekent marges uit en vergelijkt het effect na 14 en 28 dagen.' },
      { titel: 'Wat jij beslist', tekst: 'Of een vermoeden een feit is, of een tekst bij het merk past en wanneer een pagina live gaat. Orbit zet niets op een website.' },
    ] as Bijschrift[],
  },
}

// PLACEHOLDER: de quote van de maker is nog niet aangeleverd. Vervang de Lorem ipsum-tekst en de naam
// door de echte tekst, en zet een foto bij `foto` (zoals `statement.author` in content/home.ts).
export const quote = {
  sterk: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  rest: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  auteur: { naam: 'Lorem Ipsum', foto: '' },
}

export const afsluiter = {
  title: 'Zie hoe AI jouw klant meet.',
  description: 'Bekijk in een demo hoe een onderzoek, een meting en een pagina eruitzien voor een van je eigen klanten.',
}
