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
// (lib/kennis/marktkennis). De tools die in de wacht staan, komen niet voor. Er staat bewust geen bedrag per klant
// in: dat hangt af van hoeveel er gemeten en geschreven wordt.

import type { Usp } from './home'

// `title` is de korte naam van de pagina; `zoektitel` en `description` staan in de zoekresultaten en bij een
// gedeelde link. Richtlijn: de titel hooguit 60 tekens, de omschrijving hooguit 158.
export const meta = {
  title: 'Voor bureaus',
  zoektitel: 'Verkoop GEO als vaste dienst onder je eigen naam – Orbit',
  description:
    'Bied AI-zichtbaarheid aan als maandelijkse dienst. Orbit werkt in de huisstijl van je bureau, met al je klanten in één overzicht en AI tegen kostprijs.',
}

export const hero = {
  eyebrow: 'Voor bureaus',
  title: 'Maak AI-zichtbaarheid een vaste dienst van je bureau.',
}

// Het blok direct onder de hero: de kern van het aanbod in één alinea, met vier voordelen die elk
// terugkomen als sectie verderop. Op desktop de korte titel met een regel uitleg, op mobiel de lange titel.
export const usp: { titel: string; tekst: string; demo: string; punten: Usp[] } = {
  titel: 'Orbit helpt je team met onderzoek, metingen en content.',
  tekst:
    'Wil je klanten helpen om vaker genoemd te worden in ChatGPT en andere AI-assistenten? Met Orbit meet je hun zichtbaarheid, plan je content en laat je teksten schrijven. Je biedt dit aan als maandelijkse dienst, met een platform in de huisstijl van je bureau.',
  demo: 'Probeer Orbit gratis',
  punten: [
    {
      kort: 'Je eigen huisstijl',
      titel: 'Een platform met jouw uitstraling',
      uitleg: 'Je team en klanten zien jouw logo, kleuren en lettertypes. De vormgeving is inbegrepen.',
    },
    {
      kort: 'Onbeperkt klanten',
      titel: 'Overzicht over al je klantwerk',
      uitleg: 'Zie wat er per klant moet gebeuren en zet het schrijfwerk voor meerdere klanten tegelijk in gang.',
    },
    {
      kort: 'Samen met je klant',
      titel: 'Haal de kennis bij je klant op',
      uitleg: 'Laat je klant informatie aanvullen via een link. Geef desgewenst toegang tot de eigen bedrijfsomgeving.',
    },
    {
      kort: 'Kosten en tarieven',
      titel: 'Jij bepaalt wat je klant betaalt',
      uitleg: 'Je betaalt het AI-gebruik zonder opslag van Orbit. Het tarief voor jouw dienstverlening bepaal je zelf.',
    },
  ],
}

// White label: de sectie die het verschil maakt voor een bureau en daarom vooraan staat. Een intro en het
// grote beeld met drie huisstijlen.
export const whitelabel = {
  id: 'whitelabel',
  label: 'Jouw huisstijl',
  titel: 'Laat je klanten werken in een herkenbare omgeving.',
  tekst:
    'We richten Orbit in met het logo, de kleuren en de lettertypes van je bureau. Ook de knoppen en andere onderdelen krijgen een passende vormgeving. Zo sluit het platform aan op de uitstraling die je klanten al kennen. Wij verzorgen dit voor je; het is inbegrepen.',
  beeld: {
    titel: 'Zo kan Orbit eruitzien voor jouw bureau',
    tekst: 'Deze drie voorbeelden laten zien hoe hetzelfde scherm eruitziet met een ander logo, andere kleuren en andere lettertypes.',
    alt: 'Hetzelfde werkoverzicht drie keer, in de huisstijl van drie bureaus: warm donker met een schreefletter, wit met fel oranje en marineblauw met geel.',
  },
}

// Het werkoverzicht: een intro met een link naar /werkwijze en het grote scherm met twaalf klanten.
export const overzicht = {
  id: 'overzicht',
  label: 'Overzicht',
  titel: 'Zie welk klantwerk aandacht nodig heeft.',
  tekst:
    'Welke klant moet nog informatie aanleveren? Welke teksten kun je nakijken en wat is klaar voor publicatie? Je ziet het voor al je klanten bij elkaar. Je kunt onbeperkt bedrijven toevoegen en het geplande schrijfwerk voor meerdere klanten tegelijk starten. Dat scheelt steeds wisselen tussen afzonderlijke klantomgevingen.',
  link: { label: 'Bekijk hoe je met Orbit werkt', href: '/werkwijze' },
  beeld: {
    titel: 'Dit staat er voor je team klaar',
    tekst: 'Het werk dat het langst wacht, staat bovenaan. Voordat je nieuwe teksten laat schrijven, zie je het aantal pagina’s en de geschatte kosten.',
    alt: 'Het scherm Alle bedrijven van een bureau: twaalf klanten onder elkaar met hun zichtbaarheid in AI, de maandmeting, wat er te starten is, wat er wacht en sinds wanneer, en de kosten van de afgelopen dertig dagen. Vier klanten zijn aangevinkt om de maand tegelijk te starten.',
  },
}

// Grote tussenzin tussen het werkoverzicht en de twee secties: het vetgedrukte deel in het wit, de rest in
// grijs, en de woorden lichten op tijdens het scrollen.
export const statement = {
  strong: 'Je wilt meer klanten kunnen helpen, maar onderzoek en schrijven kosten tijd.',
  rest: 'Orbit neemt een groot deel van dat werk over. Je team bespreekt de wensen met de klant, beoordeelt de teksten en geeft advies over de volgende stap.',
}

// Twee secties met een illustratie en tekst naast elkaar; de tweede is gespiegeld.
export const secties = [
  {
    id: 'samenwerken',
    label: 'Samenwerken met je klant',
    titel: 'Gebruik wat je klant over zijn bedrijf weet.',
    tekst:
      'Een goede tekst vertelt ook wat je niet op de website vindt. Daarom vraagt Orbit je klant bijvoorbeeld naar prijzen, de werkwijze of een recente opdracht. Je stuurt de vragen via een link en de antwoorden worden gebruikt bij het schrijven. Wil je klant ook de voortgang bekijken? Dan geef je toegang tot de eigen bedrijfsomgeving.',
    punten: [
      'Je klant heeft alleen toegang tot het eigen bedrijf',
      'Jij bepaalt of je klant informatie mag aanvullen en teksten mag goedkeuren',
      'Vragen beantwoorden kan zonder account, via een link',
      'Alleen je team kan betaald werk starten',
    ],
    alt: 'Het onderdeel Wat mogen kijkers van een bureau: vragen beantwoorden, materiaal toevoegen, gele zinnen bevestigen en een pagina goedkeuren staan aan, een pagina zelf bewerken staat uit. Ervoor een telefoon waarop de klant zonder account een vraag over zijn prijs beantwoordt.',
  },
  {
    id: 'kosten',
    label: 'Kosten',
    titel: 'Je bepaalt zelf de prijs van je dienst.',
    tekst:
      'Het AI-gebruik betaal je rechtstreeks aan de aanbieders, zonder opslag van Orbit. De kosten hangen af van hoeveel je meet en laat schrijven. Daarnaast maak je met ons een afspraak over het gebruik van het platform. Jij bepaalt wat je klanten betalen voor het complete pakket van content, metingen en advies.',
    punten: [
      'Geen opslag van Orbit op je AI-gebruik',
      'Inzicht in de AI-kosten per klant, met een maandelijks kostenoverzicht',
      'Zelf een maandlimiet instellen en vooraf de geschatte kosten bekijken',
    ],
    alt: 'Het tabblad Kosten van een bureau: deze maand € 158,60 van een limiet van € 250, volgende maand ongeveer € 164, en de kosten per bedrijf, van € 24,60 voor Lindeman Warmte tot € 13,10 voor Kringloop De Ruil. Ervoor de schatting bij Start de maand: 20 pagina’s voor 4 bedrijven, ongeveer € 11,80.',
  },
]

// Raster met zes korte punten onderaan: wat er verder voor een bureau geregeld is. `icoon` is een naam uit
// components/product/ui.tsx.
export const verder = {
  id: 'verder',
  titel: 'Gebouwd voor teams met meerdere klanten.',
  tekst: 'Van toegang voor collega’s tot rapportages voor klanten: Orbit helpt je om het werk voor verschillende bedrijven naast elkaar te organiseren.',
  punten: [
    {
      icoon: 'slot',
      titel: 'Een eigen omgeving voor je bureau',
      tekst: 'Je klantgegevens, teksten en resultaten zijn afgeschermd van andere bureaus die Orbit gebruiken.',
    },
    {
      icoon: 'mensen',
      titel: 'Toegang voor je team en klanten',
      tekst: 'Nodig collega’s uit om mee te werken. Klanten krijgen alleen toegang tot de bedrijven die je aan hen toewijst.',
    },
    {
      icoon: 'merk',
      titel: 'Snel ingelezen in een nieuwe klant',
      tekst: 'Vul de bedrijfsnaam en website in. Na ongeveer tien minuten staat het eerste onderzoek naar aanbod, werkgebied en concurrenten klaar.',
    },
    {
      icoon: 'pdf',
      titel: 'Rapportages met je bureaunaam',
      tekst: 'Deel maandelijks de metingen, gepubliceerde pagina’s en planning met je klant. Het verslag kun je opslaan als pdf.',
    },
    {
      icoon: 'boek',
      titel: 'Bouw kennis op van een branche',
      tekst: 'Werk je voor meerdere bedrijven in dezelfde branche? Orbit kan gecontroleerde branchekennis opnieuw gebruiken. Die kennis wordt niet gedeeld met andere bureaus.',
    },
    {
      icoon: 'wereld',
      titel: 'Gemaakt voor de Nederlandse markt',
      tekst: 'Je werkt in het Nederlands en krijgt Nederlandse teksten. Orbit houdt bij onderzoek en metingen rekening met de plaatsen en regio’s waar je klant actief is.',
    },
  ],
}

// De afsluiter van deze pagina: een eigen kop en zin, met daaronder de knop Gratis uitproberen.
export const afsluiter = {
  title: 'Ontdek wat Orbit voor jouw bureau kan doen',
  description: 'Begin gratis met één klant. Laat het bedrijf onderzoeken, meet de zichtbaarheid voor één onderwerp in ChatGPT en laat een eerste tekst schrijven.',
}
