// Teksten van de pagina Over (/over): het verhaal van Jan-Willem Koopman, de oprichter en ontwikkelaar van
// Orbit. De teksten zijn vastgesteld; pas ze alleen aan als het verhaal zelf verandert. De opmaak volgt vanzelf.

// Titel en omschrijving in de zoekresultaten en bij een gedeelde link.
export const meta = {
  zoektitel: 'Over Orbit | Jan-Willem Koopman, oprichter en ontwikkelaar',
  description:
    'Maak kennis met Jan-Willem Koopman en lees waarom hij Orbit ontwikkelde: software voor marketingbureaus om AI-zichtbaarheid te meten en content te maken.',
}

// Sectie 1: de introductie, met het portret ernaast (op mobiel eronder).
export const intro = {
  label: 'Over Orbit',
  titel: 'Ik ben Jan-Willem, de maker van Orbit.',
  alineas: [
    'Ik werk ruim tien jaar als data-analist in de marketing, onder andere bij Randstad Groep Nederland en tegenwoordig bij Van den Udenhout. In die jaren heb ik me verdiept in marketingdata, SEO en het meten van wat marketing oplevert.',
    'Met de komst van AI ben ik steeds meer zelf software gaan bouwen. Die ervaring komt samen in Orbit: een platform waarmee marketingbureaus de AI-zichtbaarheid van hun klanten meten, content maken en de resultaten volgen.',
  ],
}

// Het portret naast de introductie. Staat `src` leeg, dan verdwijnt het beeld met onderschrift en staat
// de introductie alleen. `breedte` en `hoogte` zijn de afmetingen van het bestand; zo blijven de verhoudingen gelijk.
export const foto = {
  src: '/images/cover-jan-willem-koopman.webp',
  breedte: 1774,
  hoogte: 887,
  alt: 'Jan-Willem Koopman, oprichter en ontwikkelaar van Orbit',
  onderschrift: 'Jan-Willem Koopman — oprichter en ontwikkelaar van Orbit',
}

// Sectie 2: de aanleiding.
export const aanleiding = {
  titel: 'Ik wilde verder kunnen dan alleen meten.',
  alineas: [
    'Als data-analist wil ik weten wat je met een uitkomst kunt doen. Dat geldt ook voor AI-zichtbaarheid. Je kunt meten of ChatGPT een bedrijf noemt, maar daarmee weet een marketeer nog niet welke pagina hij moet verbeteren of wat hij moet schrijven.',
    'Daar begon het idee voor Orbit. Ik wilde de stap van meting naar uitvoering makkelijker maken: onderzoeken waar kansen liggen, bepalen welke content nodig is en die vervolgens ook kunnen maken.',
    'Wat begon als een idee voor een meettool, groeide zo uit tot een platform waarin onderzoek, planning, schrijven en opnieuw meten met elkaar verbonden zijn. Daar ben ik behoorlijk trots op.',
  ],
}

// Sectie 3: wat Orbit doet, met één productbeeld (de maand van een klant, van meten tot hermeten).
export const watOrbitDoet = {
  titel: 'Van een bedrijfswebsite naar een plan en nieuwe content.',
  alineas: [
    'Je begint met de naam en website van een klant. Orbit onderzoekt het bedrijf, het aanbod en de concurrenten. Daarna meet het hoe vaak het bedrijf wordt genoemd bij vragen die potentiële klanten aan AI zouden kunnen stellen.',
    'Uit die meting volgen voorstellen voor nieuwe of verbeterde pagina’s. Orbit maakt een contentplan en schrijft de teksten met informatie over het bedrijf. Ontbreken bijvoorbeeld prijzen of praktijkvoorbeelden, dan zet het vragen klaar die je aan je klant kunt voorleggen.',
    'Je team beoordeelt de teksten en publiceert ze op de website. Daarna meet Orbit opnieuw hoe de AI-zichtbaarheid zich ontwikkelt. Met Google Search Console kun je ook volgen hoeveel zoekverkeer de gepubliceerde pagina’s krijgen.',
  ],
  link: { label: 'Bekijk de werkwijze in tien stappen', href: '/werkwijze' },
  beeldAlt:
    'Voorbeeld uit Orbit: de maand van een klant in vijf stappen, van meten en plannen tot schrijven, publiceren en hermeten, met vragen die nog bij de klant liggen.',
}

// Sectie 4: waarom voor marketingbureaus.
export const bureaus = {
  titel: 'Speciaal gebouwd voor marketingbureaus.',
  alineas: [
    'Een bureau werkt voor meerdere klanten tegelijk. Dan heb je overzicht nodig: welke teksten zijn klaar, waar ontbreekt nog informatie en wat moet er deze maand gebeuren? Daarom kun je in Orbit al je klanten vanuit één omgeving beheren.',
    'Je kunt het platform in de huisstijl van je bureau gebruiken, klanten toegang geven tot hun eigen omgeving en rapportages delen met je bureaunaam erop. Zo past Orbit binnen de dienstverlening die je al aanbiedt.',
    'Mijn doel is dat je team meer klanten kan helpen doordat een groot deel van het onderzoek en schrijfwerk al wordt gedaan. Je kunt AI-zichtbaarheid als nieuwe maandelijkse dienst aanbieden of opnemen in je bestaande SEO- en contentwerk.',
  ],
  link: { label: 'Lees wat Orbit voor je bureau kan doen', href: '/agencies' },
}

// Sectie 5: de keuzes van de oprichter.
export const keuzes = {
  titel: 'Waar ik bij het bouwen op let.',
  onderdelen: [
    {
      titel: 'Cijfers die je kunt uitleggen',
      tekst: 'Mijn achtergrond als analist zie je terug in de metingen. Orbit gebruikt vaste vragen, herhaalt belangrijke vragen en toont onzekerheidsmarges. Een kleine schommeling is niet meteen een resultaat. Ook een stijging na publicatie bewijst op zichzelf niet dat de nieuwe pagina de oorzaak is.',
    },
    {
      titel: 'Teksten met kennis van het bedrijf',
      tekst: 'Een goede tekst heeft informatie nodig die bij je klant hoort. Daarom gebruikt Orbit bedrijfsinformatie, documenten en antwoorden van de ondernemer. Ik heb controles ingebouwd op onder meer bedragen, termijnen en garanties. Je team beoordeelt de tekst voordat die wordt gepubliceerd.',
    },
    {
      titel: 'Duidelijke kosten',
      tekst: 'Voor het platform vraag ik een kleine vergoeding, waarover we vooraf afspraken maken. Het gebruik van AI en zoekdata betaal je rechtstreeks aan de aanbieders, zonder opslag van Orbit. Je ziet wat je uitgeeft en bepaalt zelf wat je voor jouw dienstverlening rekent.',
    },
  ],
}

// Sectie 6: de persoonlijke afsluiting. De knop opent hetzelfde aanmeldformulier als "Gratis uitproberen".
export const afsluiting = {
  titel: 'Benieuwd of Orbit bij jouw bureau past?',
  alineas: [
    'Probeer het met een klant die je goed kent. Je laat gratis één bedrijf onderzoeken, meet één onderwerp in ChatGPT en laat een eerste tekst schrijven. Zo kun je zelf beoordelen of de aanpak en de teksten aansluiten op jouw werk.',
    'Wil je eerst iets vragen of bespreken hoe je Orbit zou gebruiken? Mail me gerust. Je hebt rechtstreeks contact met degene die het platform bouwt.',
  ],
  knop: 'Probeer Orbit gratis',
  mail: { label: 'Mail Jan-Willem', href: 'mailto:go@outerorbit.nl' },
}
