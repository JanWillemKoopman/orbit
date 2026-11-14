// Teksten van de tweede versie van de pagina Agencies (/agencies2). Het origineel staat in
// content/agencies.ts en blijft ongewijzigd.
//
// De pagina is de verkooppagina voor de eigenaar van een marketingbureau. De homepage vertelt wat Orbit
// is, /werkwijze hoe een maand verloopt; deze pagina vertelt waarom Orbit voor een bureau is gemaakt.
// Het verhaal in één lijn: je klanten vragen al naar AI-zichtbaarheid, maak er een vaste dienst van onder
// je eigen naam (white label), draai die voor al je klanten zonder extra mensen (werkoverzicht), laat je
// klant meedoen zonder dat het je tijd kost (kijker en deellink) en houd de marge zelf (AI tegen
// kostprijs).
//
// Elke belofte hier bestaat in de app en is nagelopen in de code van orbit-engine: het design per bureau
// (lib/klantdesign), het werkoverzicht en de handelingen voor meerdere bedrijven (lib/portfolio,
// /api/beheer/bulk), kijkers en hun rechten (lib/kijker-rechten), de deellink, de kosten per bedrijf en de
// maandlimiet (lib/verbruik, lib/maandlimiet-regels) en de vakkennis per branche binnen één bureau
// (lib/kennis/marktkennis). De tools die in de wacht staan, komen niet voor. Het bedrag per klant komt uit
// hoofdstuk 19 van de procesdocumentatie (ongeveer 4 tot 5 euro per maand bij 3 clusters en 10 pagina's).

import type { Usp } from './home'

export const meta = {
  title: 'Agencies',
  description:
    'Orbit is gemaakt voor marketingbureaus: verkoop AI-zichtbaarheid als vaste dienst onder je eigen naam, met al je klanten in één overzicht, een klant die meekijkt en AI tegen kostprijs.',
}

export const hero = {
  eyebrow: 'Agencies',
  title: 'Verkoop AI-zichtbaarheid als vaste dienst. Onder je eigen naam.',
}

// Het blok direct onder de hero: de kern van het aanbod in één alinea, met vier voordelen die elk
// terugkomen als sectie verderop. Op desktop de korte titel met een regel uitleg, op mobiel de lange titel.
export const usp: { titel: string; tekst: string; demo: string; punten: Usp[] } = {
  titel: 'Een nieuwe dienst. Zonder nieuw team.',
  tekst:
    'Je klanten vragen het al: worden wij aanbevolen door ChatGPT? Met Orbit maak je van dat antwoord een dienst die elke maand terugkomt. Voor al je klanten, in de huisstijl van je bureau en met een marge die je zelf bepaalt.',
  demo: 'Plan een gratis demo',
  punten: [
    {
      kort: 'Jouw merk voorop',
      titel: 'Volledig in de huisstijl van je bureau',
      uitleg: 'Je logo, je kleuren en je lettertypes op elk scherm. White label is standaard inbegrepen.',
    },
    {
      kort: 'Onbeperkt klanten',
      titel: 'Al je klanten in één overzicht',
      uitleg: 'Eén werkoverzicht voor al je klanten. Je start de maand voor allemaal tegelijk.',
    },
    {
      kort: 'Je klant doet mee',
      titel: 'Je klant kijkt mee en levert aan',
      uitleg: 'Je klant kijkt mee bij zijn eigen bedrijf en beantwoordt vragen via een link, zonder account.',
    },
    {
      kort: 'Je marge blijft van jou',
      titel: 'AI tegen kostprijs, je tarief bepaal je zelf',
      uitleg: 'AI tegen kostprijs, op de sleutel van je bureau. Wat je je klant rekent, bepaal je zelf.',
    },
  ],
}

// White label: de sectie die het verschil maakt voor een bureau en daarom vooraan staat. Een intro, het
// grote beeld met drie huisstijlen en twee cellen: hoe de huisstijl tot stand komt en wat de klant ziet.
export const whitelabel = {
  id: 'whitelabel',
  label: 'White label',
  titel: 'Jouw platform. Niet het onze.',
  tekst:
    'Orbit draait volledig in de huisstijl van je bureau: je logo, je kleuren, je lettertypes en je vormen, op elk scherm. Je team en je klanten werken in jouw platform. Het ontwerp maken wij, en dat is inbegrepen.',
  beeld: {
    titel: 'Eén platform, elk bureau zijn eigen gezicht',
    tekst: 'Hetzelfde werkscherm in de huisstijl van drie bureaus. De interface gaat mee in elke stijl.',
    alt: 'Hetzelfde werkoverzicht drie keer, in de huisstijl van drie bureaus: warm donker met een schreefletter, wit met fel oranje en marineblauw met geel.',
  },
  cellen: [
    {
      titel: 'Wij vertalen je huisstijl',
      tekst: 'We nemen het logo, de kleuren, de lettertypes en de vormen van je website over en rekenen na of elke tekst leesbaar blijft.',
      alt: 'De huisstijl van bureau zonnig, overgenomen van de website: het logo, vier kleuren, het lettertype Montserrat en ronde vormen. De huisstijl staat aan en elke tekst is op leesbaarheid nagerekend.',
    },
    {
      titel: 'Je klant ziet jouw merk',
      tekst: 'Kijkt je klant mee, dan werkt hij in de huisstijl van je bureau, met je logo boven in het menu.',
      alt: 'Het scherm van een klant die meekijkt, in de huisstijl van bureau zonnig: het logo van het bureau boven het menu, de zichtbaarheid in AI van Lindeman Warmte en twee taken die op de klant wachten.',
    },
  ],
}

// Het werkoverzicht: een intro met een link naar /werkwijze en het grote scherm met twaalf klanten.
export const overzicht = {
  id: 'overzicht',
  label: 'Overzicht',
  titel: 'Al je klanten in één overzicht.',
  tekst:
    'Onbeperkt klanten op één scherm. Per klant zie je de zichtbaarheid in AI, wat er op je wacht en wat het kostte. Je vinkt klanten aan en start de maand voor allemaal tegelijk. Zo groeit je klantenbestand en niet je werkdruk.',
  link: { label: 'Zo ziet een maand eruit', href: '/werkwijze' },
  beeld: {
    titel: 'Het werkoverzicht van je bureau',
    tekst: 'Wat het langst wacht, staat bovenaan. Vooraf zie je hoeveel pagina’s je start en ongeveer wat het kost.',
    alt: 'Het scherm Alle bedrijven van een bureau: twaalf klanten onder elkaar met hun zichtbaarheid in AI, de maandmeting, wat er te starten is, wat er wacht en sinds wanneer, en de kosten van de afgelopen dertig dagen. Vier klanten zijn aangevinkt om de maand tegelijk te starten.',
  },
}

// Grote tussenzin tussen het werkoverzicht en de twee secties: het vetgedrukte deel in het wit, de rest in
// grijs, en de woorden lichten op tijdens het scrollen.
export const statement = {
  strong: 'Jouw kennis. Jouw klanten. Jouw naam.',
  rest: 'Orbit is de motor erachter: het meet, plant en schrijft voor al je klanten tegelijk. Je specialisten houden de regie en je klant ziet jouw bureau.',
}

// Twee secties met een illustratie en tekst naast elkaar; de tweede is gespiegeld.
export const secties = [
  {
    id: 'samenwerken',
    label: 'Samenwerken met je klant',
    titel: 'Je klant doet mee. Zonder dat jij erachteraan moet.',
    tekst:
      'Nodig je klant uit als kijker: hij ziet alleen zijn eigen bedrijf. Vragen die alleen het bedrijf kan beantwoorden, stuur je als link naar de ondernemer, de verkoper of de planner. Zo komt echte kennis in de teksten en blijft je klant betrokken.',
    punten: [
      'Je klant ziet alleen zijn eigen bedrijf',
      'Jij bepaalt wat hij mag: aanleveren, bevestigen of goedkeuren',
      'Vragen beantwoorden via een link, zonder account',
      'Alles wat geld kost, blijft bij je bureau',
    ],
    alt: 'Het onderdeel Wat mogen kijkers van een bureau: vragen beantwoorden, materiaal toevoegen, gele zinnen bevestigen en een pagina goedkeuren staan aan, een pagina zelf bewerken staat uit. Ervoor een telefoon waarop de klant zonder account een vraag over zijn prijs beantwoordt.',
  },
  {
    id: 'kosten',
    label: 'Marge',
    titel: 'Hanteer je bureautarief. Jij betaalt kostprijs.',
    tekst:
      'Het AI-gebruik loopt via de eigen sleutel van je bureau, tegen kostprijs en zonder opslag. Meten en tien pagina’s schrijven kost je aan AI een paar euro per klant per maand. Wat je je klant rekent, bepaal je zelf. Het verschil is je marge.',
    punten: [
      'AI tegen kostprijs, zonder opslag',
      'Per klant zien wat hij kost, per maand te downloaden',
      'Een maandlimiet en vooraf de kosten bij elke knop',
    ],
    alt: 'Het tabblad Kosten van een bureau: deze maand € 158,60 van een limiet van € 250, volgende maand ongeveer € 164, en de kosten per bedrijf, van € 24,60 voor Lindeman Warmte tot € 13,10 voor Kringloop De Ruil. Ervoor de schatting bij Start de maand: 20 pagina’s voor 4 bedrijven, ongeveer € 11,80.',
  },
]

// Raster met zes korte punten onderaan: wat er verder voor een bureau geregeld is. `icoon` is een naam uit
// components/product/ui.tsx.
export const verder = {
  id: 'verder',
  titel: 'Ingericht op hoe een bureau werkt.',
  tekst: 'Orbit gaat uit van een team, een klantenbestand en klanten die willen zien wat je voor ze doet.',
  punten: [
    {
      icoon: 'slot',
      titel: 'Een eigen, afgeschermde omgeving',
      tekst: 'Andere bureaus zien niets van jouw bureau, ook niet dat het bestaat.',
    },
    {
      icoon: 'mensen',
      titel: 'Je team met de juiste rol',
      tekst: 'Collega’s nodig je uit als beheerder, klanten als kijker. De uitnodiging gaat per mail.',
    },
    {
      icoon: 'merk',
      titel: 'Een nieuwe klant in tien minuten',
      tekst: 'Naam en website zijn genoeg. Orbit onderzoekt het bedrijf en zet het merkdossier klaar.',
    },
    {
      icoon: 'pdf',
      titel: 'Een maandverslag per klant',
      tekst: 'Elke maand een verslag met de naam van je bureau erop, als pdf te versturen.',
    },
    {
      icoon: 'boek',
      titel: 'Vakkennis die meegroeit',
      tekst: 'Gecontroleerde vakkennis uit een branche gebruikt Orbit opnieuw bij je andere klanten in die branche. Alleen binnen je eigen bureau.',
    },
    {
      icoon: 'wereld',
      titel: 'Nederlands van begin tot eind',
      tekst: 'De app, de AI-vragen en de teksten zijn Nederlands, met oog voor lokale bedrijven, werkgebieden en plaatsnamen.',
    },
  ],
}

export const afsluiter = {
  title: 'Zie Orbit in de huisstijl van jouw bureau.',
  description: 'Plan een demo. We laten zien hoe je klanten, je team en je marge in Orbit passen.',
}
