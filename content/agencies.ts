// Teksten van de pagina Agencies (/agencies), de verkooppagina voor de eigenaar van een marketingbureau.
// De homepage vertelt wat Orbit is, /werkwijze hoe een maand verloopt; deze pagina vertelt waarom Orbit
// voor een bureau is gemaakt.
// Het verhaal in één lijn: je klanten vragen al naar AI-zichtbaarheid, maak er een vaste dienst van onder
// je eigen naam (white label), draai die voor al je klanten zonder extra mensen (werkoverzicht), laat je
// klant meekijken en aanleveren (kijker en deellink) en houd grip op de AI-kosten (AI tegen kostprijs,
// je tarief bepaal je zelf). De woordkeus sluit aan op het blogartikel van de oprichter
// (content/posts/ai-zichtbaarheid-als-maandelijkse-dienst.md): Orbit is geen tracker maar het hele traject,
// GEO als terugkerende dienst, de kennis van de ondernemer als basis, en tijd voor de relatie met de klant.
//
// Elke belofte hier bestaat in de app en is nagelopen in de code van orbit-engine: het design per bureau
// (lib/klantdesign), het werkoverzicht en de handelingen voor meerdere bedrijven (lib/portfolio,
// /api/beheer/bulk), kijkers en hun rechten (lib/kijker-rechten), de deellink, de kosten per bedrijf en de
// maandlimiet (lib/verbruik, lib/maandlimiet-regels) en de vakkennis per branche binnen één bureau
// (lib/kennis/marktkennis). De tools die in de wacht staan, komen niet voor. Het bedrag per klant komt uit
// hoofdstuk 19 van de procesdocumentatie (ongeveer 4 tot 5 euro per maand bij 3 clusters en 10 pagina's).

import type { Usp } from './home'

// `title` is de korte naam van de pagina; `zoektitel` en `description` staan in de zoekresultaten en bij een
// gedeelde link. Richtlijn: de titel hooguit 60 tekens, de omschrijving hooguit 158.
export const meta = {
  title: 'Agencies',
  zoektitel: 'Verkoop GEO als vaste dienst onder je eigen naam – Orbit',
  description:
    'Bied AI-zichtbaarheid aan als maandelijkse dienst. Orbit werkt in de huisstijl van je bureau, met al je klanten in één overzicht en AI tegen kostprijs.',
}

export const hero = {
  eyebrow: 'Agencies',
  title: 'Bied AI-zichtbaarheid aan als vaste dienst onder je eigen naam.',
}

// Het blok direct onder de hero: de kern van het aanbod in één alinea, met vier voordelen die elk
// terugkomen als sectie verderop. Op desktop de korte titel met een regel uitleg, op mobiel de lange titel.
export const usp: { titel: string; tekst: string; demo: string; punten: Usp[] } = {
  titel: 'Gemaakt voor het team dat je al hebt.',
  tekst:
    'Je klanten vragen al of ChatGPT hun bedrijf aanbeveelt. Een tracker laat alleen zien hoe het ervoor staat. Met Orbit werk je er ook aan en wordt GEO een dienst die elke maand terugkomt, voor al je klanten en in de huisstijl van je bureau.',
  demo: 'Plan een gratis demo',
  punten: [
    {
      kort: 'Je eigen huisstijl',
      titel: 'Volledig in de huisstijl van je bureau',
      uitleg: 'Je logo, kleuren en lettertypes staan op elk scherm. White label is standaard inbegrepen.',
    },
    {
      kort: 'Onbeperkt klanten',
      titel: 'Al je klanten in één overzicht',
      uitleg: 'In één werkoverzicht zie je wat er per klant wacht en start je de maand voor allemaal tegelijk.',
    },
    {
      kort: 'Je klant doet mee',
      titel: 'Je klant kijkt mee en levert aan',
      uitleg: 'Als kijker ziet je klant alleen zijn eigen bedrijf. Vragen beantwoorden kan via een link, zonder account.',
    },
    {
      kort: 'Grip op AI-kosten',
      titel: 'AI tegen kostprijs, je tarief bepaal je zelf',
      uitleg: 'Het AI-verbruik loopt via de API-sleutel van je bureau, zonder opslag. Je klanttarief stel je zelf vast.',
    },
  ],
}

// White label: de sectie die het verschil maakt voor een bureau en daarom vooraan staat. Een intro, het
// grote beeld met drie huisstijlen en twee cellen: hoe de huisstijl tot stand komt en wat de klant ziet.
export const whitelabel = {
  id: 'whitelabel',
  label: 'White label',
  titel: 'Je eigen huisstijl op elk scherm.',
  tekst:
    'Orbit neemt de huisstijl van je bureau over, van logo en kleuren tot lettertypes en vormen. Je team en je klanten werken daardoor in een omgeving die eruitziet als die van je bureau. Wij maken het ontwerp en dat is inbegrepen.',
  beeld: {
    titel: 'Eén platform, per bureau een ander uiterlijk',
    tekst: 'Hier zie je hetzelfde werkscherm in de huisstijl van drie bureaus. De indeling blijft gelijk, de vormgeving past zich aan.',
    alt: 'Hetzelfde werkoverzicht drie keer, in de huisstijl van drie bureaus: warm donker met een schreefletter, wit met fel oranje en marineblauw met geel.',
  },
  cellen: [
    {
      titel: 'Wij richten je huisstijl in',
      tekst: 'Logo, kleuren, lettertypes en vormen halen we van je website. Daarna controleren we of alle tekst goed leesbaar blijft.',
      alt: 'De huisstijl van bureau zonnig, overgenomen van de website: het logo, vier kleuren, het lettertype Montserrat en ronde vormen. De huisstijl staat aan en elke tekst is op leesbaarheid nagerekend.',
    },
    {
      titel: 'Je klant ziet jouw merk',
      tekst: 'Een klant die meekijkt, ziet Orbit in de huisstijl van je bureau, met je logo bovenaan het menu.',
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
    'In het werkoverzicht staan al je klanten op één scherm, zonder limiet op het aantal. Je ziet wie nog vragen moet beantwoorden, welke teksten op je wachten en welke pagina’s klaarstaan. De maand start je voor al je klanten tegelijk, zodat je niet elk bedrijf apart hoeft te openen.',
  link: { label: 'Zo ziet een maand eruit', href: '/werkwijze' },
  beeld: {
    titel: 'Het werkoverzicht van je bureau',
    tekst: 'Wat het langst wacht, staat bovenaan. Voordat je de maand start, zie je om hoeveel pagina’s het gaat en wat dat ongeveer kost.',
    alt: 'Het scherm Alle bedrijven van een bureau: twaalf klanten onder elkaar met hun zichtbaarheid in AI, de maandmeting, wat er te starten is, wat er wacht en sinds wanneer, en de kosten van de afgelopen dertig dagen. Vier klanten zijn aangevinkt om de maand tegelijk te starten.',
  },
}

// Grote tussenzin tussen het werkoverzicht en de twee secties: het vetgedrukte deel in het wit, de rest in
// grijs, en de woorden lichten op tijdens het scrollen.
export const statement = {
  strong: 'Je bureau kent de klant en levert onder eigen naam.',
  rest: 'Orbit neemt het onderzoek en het schrijfwerk over, voor al je klanten tegelijk. Je team houdt de regie en heeft meer ruimte voor het contact met de klant.',
}

// Twee secties met een illustratie en tekst naast elkaar; de tweede is gespiegeld.
export const secties = [
  {
    id: 'samenwerken',
    label: 'Samenwerken met je klant',
    titel: 'Je klant kijkt mee en levert zijn eigen kennis aan.',
    tekst:
      'Nodig je klant uit als kijker, dan ziet hij alleen zijn eigen bedrijf. Orbit stelt daarnaast gerichte vragen over wat niet op de website staat, zoals prijzen, werkwijze en praktijkvoorbeelden. Die vragen stuur je als link naar je klant door. Zo komt de kennis van de ondernemer in de teksten terecht.',
    punten: [
      'Kijkers zien alleen hun eigen bedrijf',
      'Je stelt zelf in wat een kijker mag: aanleveren, bevestigen of goedkeuren',
      'Vragen beantwoorden via een link, zonder account',
      'Handelingen die geld kosten, blijven bij je bureau',
    ],
    alt: 'Het onderdeel Wat mogen kijkers van een bureau: vragen beantwoorden, materiaal toevoegen, gele zinnen bevestigen en een pagina goedkeuren staan aan, een pagina zelf bewerken staat uit. Ervoor een telefoon waarop de klant zonder account een vraag over zijn prijs beantwoordt.',
  },
  {
    id: 'kosten',
    label: 'Kosten',
    titel: 'Je eigen tarief, met AI tegen kostprijs.',
    tekst:
      'Het AI-verbruik loopt via de eigen API-sleutel van je bureau, tegen kostprijs en zonder opslag. Voor de maandmeting en tien pagina’s is dat een paar euro per klant per maand. Dat bedrag gaat alleen over het AI-verbruik. Wat je je klant voor de dienst rekent, bepaal je zelf.',
    punten: [
      'AI-verbruik tegen kostprijs, zonder opslag',
      'De AI-kosten per klant inzien en per maand downloaden',
      'Een maandlimiet en bij elke actie vooraf een kostenschatting',
    ],
    alt: 'Het tabblad Kosten van een bureau: deze maand € 158,60 van een limiet van € 250, volgende maand ongeveer € 164, en de kosten per bedrijf, van € 24,60 voor Lindeman Warmte tot € 13,10 voor Kringloop De Ruil. Ervoor de schatting bij Start de maand: 20 pagina’s voor 4 bedrijven, ongeveer € 11,80.',
  },
]

// Raster met zes korte punten onderaan: wat er verder voor een bureau geregeld is. `icoon` is een naam uit
// components/product/ui.tsx.
export const verder = {
  id: 'verder',
  titel: 'Ingericht op hoe een bureau werkt.',
  tekst: 'Orbit is gebouwd voor een team dat meerdere klanten bedient en hun wil laten zien wat er voor ze gebeurt.',
  punten: [
    {
      icoon: 'slot',
      titel: 'Een eigen, afgeschermde omgeving',
      tekst: 'Andere bureaus zien niets van jouw omgeving, ook niet dat die bestaat.',
    },
    {
      icoon: 'mensen',
      titel: 'Beheerders en kijkers',
      tekst: 'Collega’s nodig je per mail uit als beheerder, klanten als kijker.',
    },
    {
      icoon: 'merk',
      titel: 'Een nieuwe klant in tien minuten',
      tekst: 'Je vult de naam en de website in. Orbit onderzoekt het bedrijf en zet een merkdossier voor je klaar.',
    },
    {
      icoon: 'pdf',
      titel: 'Een maandverslag per klant',
      tekst: 'Voor elke klant is er maandelijks een verslag met de naam van je bureau erop, als pdf te versturen.',
    },
    {
      icoon: 'boek',
      titel: 'Vakkennis per branche',
      tekst: 'Gecontroleerde vakkennis over een branche gebruikt Orbit opnieuw bij je andere klanten in die branche. Die kennis blijft binnen je eigen bureau.',
    },
    {
      icoon: 'wereld',
      titel: 'Nederlands van begin tot eind',
      tekst: 'De app, de AI-vragen en de teksten zijn in het Nederlands, met aandacht voor lokale bedrijven, werkgebieden en plaatsnamen.',
    },
  ],
}

export const afsluiter = {
  title: 'Bekijk Orbit in de huisstijl van je bureau.',
  description: 'Plan een demo en we laten zien hoe je klanten beheert, met ze samenwerkt en je AI-kosten bewaakt.',
}
