export type Market = {
  label: string
  goal: string
  query: string
  volume: number
  related: Array<[string, number]>
  topic: string
  article: string
  chat: [string, string, string]
  pages: string[]
}

/* Eén bron voor de hele pagina: de gekozen markt kleurt het probleem,
   de strategie, de creatie en de publicatie mee (zoals inspace dat doet). */
export const markets: Market[] = [
  {
    label: 'Webwinkel, hardloopschoenen',
    goal: 'Doel · meer online verkoop',
    query: 'beste hardloopschoenen',
    volume: 215000,
    related: [['beste hardloopschoenen heren', 97000], ['beste hardloopschoenen dames', 60000], ['beste trailschoenen', 53000]],
    topic: 'Hardloopschoenen',
    article: 'Beste hardloopschoenen voor beginners: de gids voor 2026',
    chat: [
      'Ik ben net begonnen met hardlopen en wil mijn eerste echte hardloopschoenen kopen. Ik loop meestal 5 km op asfalt, twee à drie keer per week. Wat zijn de beste hardloopschoenen voor beginners in 2026?',
      'Ik denk dat ik platvoeten heb en mijn enkels kantelen wat naar binnen als ik loop. Heb ik daar andere schoenen voor nodig?',
      'En waar kan ik ze het beste online kopen?',
    ],
    pages: ['Hardloopschoenen voor platvoeten', 'Nike Pegasus vs Asics Nimbus', 'Trailschoenen: de koopgids', 'Carbonplaat-schoenen uitgelegd', 'Wanneer vervang je hardloopschoenen?', 'Beste hardloopschoenen onder €100', 'Hardloopschoenen voor brede voeten'],
  },
  {
    label: 'Lokale dienst, hovenier',
    goal: 'Doel · gebeld worden',
    query: 'tuin laten aanleggen',
    volume: 144000,
    related: [['hovenier in de buurt', 119000], ['tuinonderhoud hovenier', 28000], ['zakelijk groenonderhoud', 13000]],
    topic: 'Tuinaanleg',
    article: 'Tuin laten aanleggen: wat het kost en waar je begint',
    chat: [
      'We hebben net een huis gekocht met een grote, verwilderde achtertuin van zo’n 300 m², met een oud terras en veel onkruid. Wat komt er kijken bij een tuin laten aanleggen en wat kost dat?',
      'Ik twijfel tussen een compleet nieuw ontwerp of alleen de beplanting en het gazon opknappen. Waar beginnen de meeste mensen?',
      'En hoe vind ik een goede hovenier bij mij in de buurt?',
    ],
    pages: ['Wat kost een hovenier per uur?', 'Tuinontwerp voor een kleine tuin', 'Hovenier in Utrecht', 'Bestrating of grind: wat past?', 'Onderhoudsvriendelijke tuin aanleggen', 'Tuin laten aanleggen in het voorjaar', 'Hovenier in Amersfoort'],
  },
  {
    label: 'B2B, mkb-verzekering',
    goal: 'Doel · gekwalificeerde leads',
    query: 'zakelijke aansprakelijkheidsverzekering',
    volume: 41000,
    related: [['aansprakelijkheidsverzekering zzp', 18000], ['bedrijfsverzekering offerte', 12000], ['verzekering voor mkb', 8300]],
    topic: 'Mkb-verzekering',
    article: 'Zakelijke verzekeringen: de complete gids voor het mkb',
    chat: [
      'Ik ben net een klein bedrijf gestart en klanten vragen steeds of we verzekerd zijn. We doen met een klein team werk op locatie bij andere bedrijven. Welke verzekeringen heeft een mkb’er echt nodig?',
      'Ik zie steeds aansprakelijkheid en beroepsaansprakelijkheid voorbijkomen. Wat is het verschil en wat dekt welke?',
      'En wat kost een zakelijke verzekering ongeveer per maand?',
    ],
    pages: ['Aansprakelijkheid vs beroepsaansprakelijkheid', 'Bedrijfsverzekering voor zzp’ers', 'Wat kost een AVB per maand?', 'Verzekeringen voor bouwbedrijven', 'Checklist: verzekeringen voor starters', 'Rechtsbijstand voor ondernemers', 'Cyberverzekering voor het mkb'],
  },
]

export const steps: Array<{ title: string; kicker: string; copy: string }> = [
  { title: 'Merkintelligentie', kicker: 'ORBIT leert jouw bedrijf eerst kennen', copy: 'Het onderzoekt je merk, aanbod, tone of voice, klanten en concurrenten, zodat alles herkenbaar van jou blijft.' },
  { title: 'Strategie & kansanalyse', kicker: 'Eén onderwerp, honderden kansen', copy: 'ORBIT brengt elke zoekvraag rond je markt in kaart en vertaalt de grootste kansen naar een gericht contentplan.' },
  { title: 'Creatie', kicker: 'Content vanuit bewezen bedrijfskennis', copy: 'Pagina’s worden geschreven in jouw merkstem en gecontroleerd op feiten, SEO en AI-leesbaarheid. Jij keurt goed met één klik.' },
  { title: 'Geautomatiseerd publiceren', kicker: 'Rechtstreeks in je CMS', copy: 'Goedgekeurde pagina’s gaan zelfstandig live in WordPress, Shopify, Webflow of je eigen CMS, inclusief structuur en interne links.' },
  { title: 'Continu optimaliseren', kicker: 'Elke pagina, elke dag bewaakt', copy: 'ORBIT ziet direct wanneer een pagina terugzakt en verbetert content, structuur en links voordat het je klanten kost.' },
  { title: 'Meetbare groei', kicker: 'Eerlijk gemeten, ronde na ronde', copy: 'Posities, verkeer en AI-vermeldingen in één overzicht. De resultaten sturen iedere volgende ronde aan.' },
]

export const nl = (value: number) => Math.round(value).toLocaleString('nl-NL')
