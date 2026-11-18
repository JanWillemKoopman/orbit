// Teksten van de pagina Over (/over): het verhaal van Jan-Willem Koopman, de oprichter en ontwikkelaar van
// Orbit. De pagina is opgemaakt als een blogartikel: een gecentreerde tekstkolom met een inleiding, een citaat
// en secties met een eigen kop. De teksten zijn vastgesteld; pas ze alleen aan als het verhaal zelf verandert.

// Titel en omschrijving in de zoekresultaten en bij een gedeelde link.
export const meta = {
  zoektitel: 'Over Orbit | Jan-Willem Koopman, oprichter en ontwikkelaar',
  description:
    'Maak kennis met Jan-Willem Koopman en lees waarom hij Orbit bouwde: één platform waarin bureaus de AI-zichtbaarheid van klanten meten en content maken.',
}

export const titel = 'Over Orbit'

// De inleiding, groter gezet dan de lopende tekst.
export const inleiding =
  'Je klant wil weten of ChatGPT zijn bedrijf aanbeveelt. Als bureau wil je kunnen laten zien waar hij in beeld komt, welke concurrenten vaker genoemd worden en wat je daaraan kunt doen. Daar heb ik Orbit voor gebouwd. In één platform meet je de AI-zichtbaarheid van je klanten, maak je een contentplan en werk je de beste kansen uit tot pagina’s die klaar zijn voor je eindredactie.'

export const citaat = {
  tekst:
    'Voor marketingbureaus ligt daar een kans die gepakt moet worden. Je kunt van GEO een eigen maandelijkse dienst maken, zonder dat je bij elke nieuwe klant op zoek moet naar een nieuwe collega.',
  naam: 'Jan-Willem Koopman',
  functie: 'oprichter van Orbit',
}

export type Sectie = { id: string; titel: string; alineas: string[] }

// De secties onder het citaat, in volgorde.
export const secties: Sectie[] = [
  {
    id: 'van-meting-naar-publicatie',
    titel: 'Van meting naar publicatie',
    alineas: [
      'Ik werk inmiddels tien jaar in data en analytics bij verschillende bedrijven. De interessantste vraag komt voor mij altijd ná de meting. Als je weet bij welke vragen je klant nauwelijks genoemd wordt, welke pagina zou je dan als eerste aanpakken?',
      'Orbit legt dat verband. Je ziet hoe vaak ChatGPT, Gemini en de AI-overzichten van Google je klant noemen en kunt de oorspronkelijke antwoorden teruglezen. Die antwoorden vormen de basis voor je contentplan. Bij een voorstel voor een artikel, vergelijking of productpagina kun je je klant dus precies laten zien welke vragen je daarmee wilt beantwoorden.',
      'Na publicatie stelt Orbit diezelfde vragen opnieuw. Na 14 en 28 dagen zie je of je klant vaker in de antwoorden voorkomt. De onzekerheidsmarge helpt je beoordelen hoeveel betekenis je aan zo’n verschil kunt geven.',
    ],
  },
  {
    id: 'de-expertise-van-je-klant',
    titel: 'De expertise van je klant op papier',
    alineas: [
      'Een tekst kan prima lezen en toch zo op de website van de concurrent passen. Daarom zoekt Orbit vóór het schrijven uit wat er op de pagina moet staan, welke vragen de lezer heeft en wat alleen je klant daarover kan vertellen. Ontbreekt er een belangrijk detail, dan krijgt je klant een gerichte vraag.',
      'Met die kennis schrijft Orbit een concept in de stijl van het bedrijf. Staat er een prijs, levertijd of garantie in zonder onderbouwing, dan houdt Orbit de goedkeuring tegen. Jij doet de eindredactie en beslist wat er namens je klant online komt.',
    ],
  },
  {
    id: 'onder-je-eigen-merk',
    titel: 'Onder je eigen merk',
    alineas: [
      'Waar ik trots op ben, is dat je Orbit echt als onderdeel van je eigen bureau kunt inzetten. De hele omgeving kan in jouw huisstijl. Je team houdt vanuit één overzicht zicht op alle klanten, terwijl iedere klant alleen bij zijn eigen bedrijf meekijkt. Ook de maandrapportage draagt de naam van je bureau.',
      'Je betaalt het AI-gebruik rechtstreeks tegen kostprijs en stelt zelf een maandlimiet in. Zo houd je grip op je marge én op je agenda. Orbit neemt een groot deel van het onderzoek, de planning en het schrijfwerk op zich. Jij houdt tijd voor het gesprek met je klant en bepaalt samen waar de volgende kans ligt.',
    ],
  },
]

// De afsluiter onderaan: het limegroene blok met de knop Gratis uitproberen.
export const afsluiting = {
  titel: 'Probeer het met een klant die je kent',
  tekst:
    'Maak gratis een account aan en voeg je eerste klant toe. Onderzoek één onderwerp, bekijk hoe vaak ChatGPT je klant noemt en laat Orbit vanuit de resultaten één artikel schrijven. Voor de proef heb je geen eigen API-sleutel nodig.',
}
