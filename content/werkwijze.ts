// Teksten van de pagina Werkwijze (/werkwijze): een hero, een introductie, een overzicht van de tien stappen
// en per stap een titel, een pakkende regel (aanloop, groot) en een korte toelichting (tekst, klein).
//
// Elke stap zegt drie dingen: wat er gebeurt, wie het doet (jij, je klant of Orbit) en wat het je bureau
// oplevert. Wat hier staat, doet de app nu al en is nagelopen in de procesdocumentatie en de code van
// orbit-engine: het onderzoek van ongeveer tien minuten, Klant onboarding, dertig vragen per onderwerp met
// herhalingen en een marge, het contentplan met contentmix, hooguit acht vragen per pagina, de deellink
// zonder account, de controles in code, kopiëren en live melden, de hermeting na 14 en 28 dagen en het
// maandverslag. Er staan geen verzonnen cijfers of tijdwinst in.

export type Stap = { nr: number; id: string; titel: string; aanloop: string; tekst: string }

// `title` is de korte naam van de pagina; `zoektitel` en `description` staan in de zoekresultaten en bij een
// gedeelde link. Richtlijn: de titel hooguit 60 tekens, de omschrijving hooguit 158.
export const meta = {
  title: 'Werkwijze',
  zoektitel: 'Zo werkt Orbit: van AI-meting tot maandverslag in 10 stappen',
  description:
    'Eén werkproces voor al je klanten. Merkdossier in tien minuten, nulmeting in ChatGPT, contentplan, pagina’s en elke maand een verslag met je bureaunaam.',
}

export const hero = {
  eyebrow: 'Werkwijze',
  title: 'Tien vaste stappen. Van nieuwe klant tot maandverslag.',
}

// Introductie tussen de hero en het overzicht: het vetgedrukte deel in het wit, de rest in grijs.
export const intro = {
  strong: 'Eén werkproces voor al je klanten.',
  rest: 'Orbit doet het onderzoek, het meetwerk en het schrijfwerk. Jouw team bepaalt de koers, keurt goed en voert het gesprek met de klant.',
}

// Kop boven het overzicht van de tien stappen, direct onder de introductie.
export const overzicht = { titel: 'De tien stappen' }

export const stappen: Stap[] = [
  {
    nr: 1,
    id: 'klant-toevoegen',
    titel: 'Klant toevoegen',
    aanloop: 'Een naam en een website. Tien minuten later ligt er een compleet merkdossier.',
    tekst:
      'Orbit leest de website, brengt het hele aanbod in kaart, zoekt de concurrenten op en test wat AI-assistenten nu al over het merk weten. Werk waar een strateeg normaal dagen mee bezig is, loopt op de achtergrond terwijl jij iets anders doet. Je begint elk nieuw klanttraject dus met een voorsprong, en je eerste gesprek gaat meteen over de inhoud.',
  },
  {
    nr: 2,
    id: 'klant-onboarden',
    titel: 'Onboarding met je klant',
    aanloop: 'Met het dossier op tafel wordt je kennismaking een strategiesessie.',
    tekst:
      'Samen met je klant leg je vast wat geen website vertelt: op welke diensten hij wil groeien, welke vragen en bezwaren hij in verkoopgesprekken hoort en hoe het merk moet klinken. Brochures en prijslijsten voeg je toe als document. Zo ontstaat één kennisbank per klant, waarin elk feit zijn bron heeft. Aan het eind van het gesprek liggen de onderwerpen vast waarop jullie gaan winnen.',
  },
  {
    nr: 3,
    id: 'nulmeting',
    titel: 'De nulmeting',
    aanloop: 'Dertig vragen per onderwerp, gesteld zoals een echte klant ze aan AI stelt.',
    tekst:
      'Van de eerste oriëntatie tot het moment van kiezen: Orbit leest elk antwoord na. Wordt je klant genoemd, op welke plek, en welke concurrent krijgt de aanbeveling? De vragen die commercieel het zwaarst wegen, stelt Orbit meerdere keren, en elk cijfer krijgt een marge. Je presenteert dus geen screenshot, maar een meting die standhoudt bij een kritische klant.',
  },
  {
    nr: 4,
    id: 'contentplan',
    titel: 'Het contentplan',
    aanloop: 'Elke vraag waarop je klant ontbreekt, wordt een pagina-idee met het bewijs erbij.',
    tekst:
      'Orbit kiest de vorm die past: een dienstpagina, een artikel, een gids, veelgestelde vragen of een vergelijking. Jij bepaalt de prioriteiten, het aantal pagina’s per maand en de verhouding tussen nieuwe en verbeterde pagina’s, zoals je het met je klant hebt afgesproken. Werk je voor tien klanten? Dan start je de maand voor allemaal tegelijk. Zo groeit je klantenportefeuille zonder dat je team mee hoeft te groeien.',
  },
  {
    nr: 5,
    id: 'voorbereiding',
    titel: 'De voorbereiding',
    aanloop: 'Andere tools beginnen meteen te schrijven. Orbit doet eerst onderzoek.',
    tekst:
      'Per pagina legt Orbit de kennisbank van je klant naast actuele bronnen, en zet in een briefing wat erop moet om de vraag beter te beantwoorden dan de concurrent. Orbit weet ook wat het niet weet. Prijzen, garanties en praktijkvoorbeelden verzint het niet: dat worden gerichte vragen aan je klant, hooguit acht per pagina. Zo wordt elke pagina uniek, en voorkom je fouten waar jouw bureau op wordt aangekeken.',
  },
  {
    nr: 6,
    id: 'klant-vult-aan',
    titel: 'Je klant vult aan',
    aanloop: 'Je klant beantwoordt de vragen via een link. Zonder account, gewoon op zijn telefoon.',
    tekst:
      'Je stuurt de link door naar wie het weet: de ondernemer, de verkoper of de planner. Geef je een datum mee, dan staat er een herinnering voor je klaar. Wat eenmaal beantwoord is, bewaart Orbit en vraagt het nooit opnieuw. Zo komt de kennis uit het bedrijf zelf op de pagina’s, en juist die kennis maakt het verschil bij AI-assistenten. Nabellen hoeft niet meer.',
  },
  {
    nr: 7,
    id: 'orbit-schrijft',
    titel: 'Orbit schrijft',
    aanloop: 'Op het juiste moment schrijft Orbit de pagina. In de stem van het merk, op basis van feiten.',
    tekst:
      'Elke pagina rust op de kennisbank, de antwoorden van je klant en de briefing, in de toon en de aanspreekvorm die jullie hebben vastgelegd. Na een automatische eindredactie wordt elk bedrag, elke termijn en elk keurmerk gecontroleerd tegen wat je klant heeft bevestigd. Je krijgt een complete pagina: tekst, titel, omschrijving voor Google, veelgestelde vragen en voorstellen voor interne links. Content waar je de naam van je bureau onder zet.',
  },
  {
    nr: 8,
    id: 'goedkeuren-en-live',
    titel: 'Goedkeuren en publiceren',
    aanloop: 'Jij houdt de regie. Orbit wijst aan waar je moet kijken.',
    tekst:
      'Zinnen die nog een blik verdienen zijn gemarkeerd, met de reden erbij. Twijfel je, dan leg je de zin met één klik aan je klant voor. Na je akkoord kopieer je de tekst in het formaat van elk CMS en zet je de pagina live. Je geeft het adres door en Orbit controleert of de tekst er echt staat. Er gaat dus niets online zonder jouw goedkeuring, en vanaf dat moment loopt de meting.',
  },
  {
    nr: 9,
    id: 'effect-meting',
    titel: 'De effectmeting',
    aanloop: 'Twee en vier weken na publicatie stelt Orbit dezelfde vragen opnieuw.',
    tekst:
      'Het resultaat staat naast de stand van vóór de pagina. Wordt je klant vaker genoemd? Haalt de AI de nieuwe pagina aan als bron? Je ziet het per pagina, met de marge erbij, zodat je weet of een verschil echt is. Met Google Search Console gekoppeld volg je daarnaast de klikken en vertoningen vanaf de publicatiedag. Zo onderbouw je wat je werk oplevert, in AI en in Google.',
  },
  {
    nr: 10,
    id: 'maandverslag',
    titel: 'Het maandverslag',
    aanloop: 'Elke maand ligt er per klant een verslag klaar. Met de naam van je bureau erop.',
    tekst:
      'Daarin staat hoe de zichtbaarheid in AI zich ontwikkelt, welke pagina’s live gingen met hun effect en wat er volgende maand gepland staat. Je slaat het op als pdf en stuurt het door. Geen spreadsheets en geen avonden rapporteren. Je klant ziet elke maand wat hij voor zijn geld krijgt, en jij hebt het gesprek over de verlenging al voorbereid. Daarna begint de ronde opnieuw, met de kansen uit de laatste meting.',
  },
]

export const afsluiter = {
  title: 'Bekijk het werkproces in een demo.',
  description: 'We lopen de tien stappen met je door en bespreken welke klant geschikt is om mee te beginnen.',
}
