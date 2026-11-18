// Teksten van de pagina Over (/over): het verhaal van Jan-Willem Koopman, de oprichter en ontwikkelaar van
// Orbit. De teksten zijn vastgesteld; pas ze alleen aan als het verhaal zelf verandert. De opmaak volgt vanzelf.

// Titel en omschrijving in de zoekresultaten en bij een gedeelde link.
export const meta = {
  zoektitel: 'Over Orbit | Jan-Willem Koopman, oprichter en ontwikkelaar',
  description:
    'Maak kennis met Jan-Willem Koopman en lees waarom hij Orbit ontwikkelde: software voor marketingbureaus om AI-zichtbaarheid te meten en content te maken.',
}

// De introductie bovenaan, met het portret ernaast (op mobiel eronder).
export const intro = {
  titel: 'Met een klein team kun je meer dan ooit',
  alineas: [
    'Een goed marketingbureau hoeft geen groot team te hebben. Met de juiste technologie kun je veel werk verzetten dat tot voor kort simpelweg te veel tijd kostte. Onderzoek waarvoor je dagen nodig had, een contentplan uitwerken, de eerste versies van teksten schrijven: AI neemt je steeds meer uit handen.',
    'Ik zie daarin een mooie kans voor bureaus. Je kunt meer voor je klanten doen en diensten aanbieden waar je eerder de capaciteit niet voor had. Als je dat goed organiseert, houd je er ook een gezonde marge aan over.',
    'Dat is waarom ik Orbit bouw. Mijn naam is Jan-Willem Koopman. Ik werk inmiddels tien jaar in het analyticswerkveld bij verschillende bedrijven en ben de oprichter en ontwikkelaar van het platform.',
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

export type Verwijzing = { label: string; href: string }
export type Sectie = { id: string; titel: string; alineas: string[]; link?: Verwijzing }

// De secties onder de introductie, in volgorde.
export const klant: Sectie = {
  id: 'ov-klant',
  titel: 'Je klant wil weten of hij wordt gevonden',
  alineas: [
    'Stel dat iemand een AI-assistent vraagt om een goede leverancier, een vergelijking of advies over een aankoop. Dan wil je als ondernemer weten: staat mijn bedrijf ertussen? En hoe zorg ik dat mijn aanbod goed naar voren komt?',
    'Als marketingbureau wil je daar een bruikbaar antwoord op geven. Ook als je zelfstandig werkt of maar een paar collega’s hebt. Je zou daarvoor niet zelf software hoeven bouwen of bij iedere klant het hele onderzoek opnieuw moeten doen.',
    'Met Orbit wil ik dat werk makkelijker maken, zodat je AI-zichtbaarheid als een volwaardige dienst kunt aanbieden.',
  ],
}

// Met één productbeeld: de maand van een klant, van meten tot hermeten.
export const meten: Sectie & { beeldAlt: string } = {
  id: 'ov-meten',
  titel: 'Weten waar je staat is het begin',
  alineas: [
    'Wat mij interesseert, is wat je vervolgens met een meting doet. Als een bedrijf nauwelijks voorkomt in AI-antwoorden, waar begin je dan? Mist er informatie op de website? Welke vragen van potentiële klanten worden nog niet goed beantwoord?',
    'Orbit helpt om dat uit te zoeken en er werk van te maken. Het onderzoek en de metingen vormen de basis voor een contentplan. Vervolgens schrijft het platform teksten met informatie over het bedrijf en de kennis die je klant zelf toevoegt. Je team beoordeelt de inhoud, publiceert de pagina’s en volgt daarna hoe de zichtbaarheid verandert.',
    'Ik vind het belangrijk dat je daarbij zorgvuldig met de cijfers omgaat. AI geeft niet iedere keer hetzelfde antwoord. En als de zichtbaarheid na een publicatie stijgt, weet je nog niet zeker of dat door die pagina komt. Je moet je klant kunnen laten zien wat je hebt gedaan, wat je terugziet in de metingen en waarom je een bepaalde vervolgstap adviseert.',
  ],
  link: { label: 'Bekijk hoe Orbit werkt', href: '/werkwijze' },
  beeldAlt:
    'Voorbeeld uit Orbit: de maand van een klant in vijf stappen, van meten en plannen tot schrijven, publiceren en hermeten, met vragen die nog bij de klant liggen.',
}

// In een iets lichter vlak: de rol van de marketeer.
export const vakkennis: Sectie = {
  id: 'ov-vakkennis',
  titel: 'Je vakkennis wordt belangrijker',
  alineas: [
    'Je kent het vast: een tekst leest prima, maar zou net zo goed over de concurrent kunnen gaan. Het verhaal klopt in grote lijnen, alleen ontbreekt precies datgene wat dit bedrijf bijzonder maakt.',
    'Daar blijft een goede marketeer nodig. Iemand die doorvraagt bij de ondernemer, begrijpt welke klanten hij wil bereiken en kan beoordelen of de inhoud overtuigt. Hoe meer uitvoerend werk je aan AI kunt overlaten, hoe meer aandacht je daaraan kunt besteden.',
    'Zo zie ik de rol van Orbit binnen een bureau. Het platform doet veel van het voorbereidende werk. Jij bepaalt de richting en wat goed genoeg is om namens je klant te publiceren.',
    'Mijn ambitie is dat je daardoor meer klanten kunt helpen zonder voor iedere nieuwe opdracht evenveel extra uren nodig te hebben. Met een dienst die je onder je eigen merk aanbiedt, waar je achter staat en waar je aan verdient.',
  ],
}

// De afsluiter onderaan: het limegroene blok met de knoppen Gratis uitproberen en Contact opnemen.
export const afsluiting = {
  titel: 'Probeer het met een klant die je kent',
  tekst: 'Gratis, met één klant. Zo zie je zelf wat Orbit je uit handen neemt.',
}
