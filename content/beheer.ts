// Teksten van de pagina Beheer (/beheer), in de opbouw van linear.app/ai: een hero, vijf secties met
// elk een intro (titel, tekst, link) en een groot beeld of een raster, een rij met de vier
// productpagina's en de afsluiter. Waar /werkwijze de werkwijze per klant laat zien, gaat deze pagina
// over het account van het bureau. De beelden zijn nagebouwde schermen (components/agency/Visuals.tsx)
// met het fictieve Bureau Noordwind.

import type { Bijschrift, Verwijzing } from '@/components/product/Blokken'

export type { Bijschrift, Verwijzing }

export const meta = {
  title: 'Beheer',
  description:
    'Orbit voor online marketingbureaus: al je klanten in één overzicht, collega’s en klanten met de juiste rol, en grip op wat de AI kost. Je gebruikt je eigen sleutels en betaalt alleen je eigen gebruik.',
}

export const hero = {
  eyebrow: 'Beheer',
  title: 'Al je klanten in één account. Jij houdt de regie.',
}

export const secties = {
  overzicht: {
    id: 'overzicht',
    label: 'Overzicht',
    titel: 'Zie in één oogopslag waar elke klant staat.',
    tekst:
      'Onbeperkt klanten in één werkoverzicht. Per klant de zichtbaarheid in AI, wat er op je wacht en sinds wanneer. Wat het langst wacht staat bovenaan, en je start de maand voor meerdere klanten tegelijk.',
    link: { label: 'Zo ziet een maand eruit', href: '/werkwijze' },
    beeld: {
      titel: 'Het werkoverzicht van je bureau',
      tekst: 'Per klant de zichtbaarheid, wat er op je wacht en wat het de afgelopen dertig dagen kostte. Zo weet je elke ochtend waar je moet beginnen.',
    },
    cellen: [
      { titel: 'Wat het langst wacht, staat bovenaan', tekst: 'Open vragen, teksten om na te kijken en pagina’s om te plaatsen, met het aantal dagen dat het al wacht.' },
      { titel: 'Start de maand voor meerdere klanten', tekst: 'Vink bedrijven aan en start hun maand in één keer. Vooraf zie je hoeveel pagina’s het samen zijn en ongeveer wat het kost.' },
    ] as Bijschrift[],
  },
  klanten: {
    id: 'klanten',
    label: 'Klanten',
    titel: 'Een nieuwe klant staat er in tien minuten.',
    tekst:
      'Naam en website zijn genoeg. Orbit leest de site, brengt aanbod, doelgroep en concurrenten in kaart en zet een merkdossier klaar. Per bureau leg je vast hoeveel pagina’s een nieuwe klant per maand krijgt.',
    link: { label: 'Wat het onderzoek doet', href: '/ai' },
    beeld: {
      titel: 'Elke klant zijn eigen dossier',
      tekst: 'Leg per bureau vast hoeveel pagina’s een nieuwe klant per maand krijgt en of nieuwe clusters elke maand gemeten worden. Pas het per klant aan wanneer je wilt.',
    },
    cellen: [
      { titel: 'Naam en website, meer niet', tekst: 'Bij de knop staat wat een onderzoek je bureau eerder gemiddeld kostte, en wat er van de maandlimiet over is.' },
      { titel: 'Een rondleiding voor je eerste dag', tekst: 'Bij de eerste keer inloggen loopt Orbit de beheerder langs de sleutel, een eerste klant en het werkoverzicht. De uitleg blijft achter het vraagteken op elk scherm.' },
    ] as Bijschrift[],
  },
  team: {
    id: 'team',
    label: 'Team',
    titel: 'Je team en je klant, elk met de juiste rol.',
    tekst:
      'Beheerders doen alles. Een kijker ziet alleen de bedrijven die jij toewijst en doet alleen wat jij toestaat. De uitnodiging gaat per mail. Alles wat een meting, een tekst of een onderzoek start, blijft bij een beheerder.',
    beeld: {
      titel: 'Iedereen in je bureau op één plek',
      tekst: 'Wie beheerder is, wie meekijkt, welk bedrijf een kijker ziet en wanneer iemand voor het laatst inlogde. Openstaande uitnodigingen staan erbij.',
    },
    cellen: [
      { titel: 'Uitnodigen met een rol', tekst: 'Kies beheerder of kijker, en bij een kijker meteen de bedrijven. De uitnodiging gaat per mail en werkt veertien dagen.' },
      { titel: 'Jij bepaalt wat een kijker mag', tekst: 'Vragen beantwoorden, materiaal toevoegen, teksten goedkeuren. Zet aan wat past bij de samenwerking.' },
      { titel: 'Je klant ziet alleen zijn eigen bedrijf', tekst: 'Geen Beheer en geen andere klanten. Wat hij mag doen, staat in zijn rondleiding en achter het vraagteken.' },
      { titel: 'Als er iets misgaat, zie je wat en wat je doet', tekst: 'Onder Systeemstatus staat per klant wat er niet lukte en wat je eraan doet, zoals een sleutel die wordt geweigerd. Geen foutcode, maar een zin.' },
    ] as Bijschrift[],
  },
  kosten: {
    id: 'kosten',
    label: 'Kosten',
    titel: 'Weet wat de AI kost, voordat je op de knop drukt.',
    tekst:
      'Je gebruikt je eigen sleutels en betaalt de AI rechtstreeks. Bij elke betaalde knop staat ongeveer wat het kost, en een maandlimiet stopt nieuw werk. Orbit rekent op wat je bureau eerder betaalde, en doet geen gok.',
    link: { label: 'Wat AI voor je doet', href: '/ai' },
    beeld: {
      titel: 'Eén scherm voor je kosten',
      tekst: 'Het verbruik van deze maand naast je maandlimiet, met een schatting van wat er volgende maand vanzelf loopt.',
    },
    cellen: [
      { titel: 'De prijs staat bij de knop', tekst: 'Een schatting uit wat je eigen bureau eerder betaalde. Zonder geschiedenis staat er geen verzonnen bedrag, maar “nog geen schatting”.' },
      { titel: 'Kosten per klant', tekst: 'Zie welke klant wat kost, zodat je je uren en je tarief op het echte verbruik afstemt.' },
      { titel: 'Jouw sleutels, jouw rekening', tekst: 'Je vult zelf de sleutel van OpenAI in. Extra meetkanalen en zoekdata werken met een eigen sleutel. Een testknop per sleutel, daarna zie je alleen de laatste vier tekens.' },
      { titel: 'De maandlimiet stopt nieuw werk', tekst: 'Is hij bereikt, dan krijgen de beheerders een melding. Nieuw werk dat geld kost start weer op de 1e van de volgende maand, of eerder als je de limiet verhoogt.' },
    ] as Bijschrift[],
  },
  gegevens: {
    id: 'gegevens',
    label: 'Gegevens',
    titel: 'Jouw klanten blijven van jou.',
    tekst:
      'Elk bureau werkt in een eigen omgeving en ziet van een ander bureau niets. Stopt een klant, dan archiveer je hem of verwijder je zijn gegevens definitief.',
    cellen: [
      { titel: 'Archiveren zonder iets kwijt te raken', tekst: 'Een gearchiveerde klant verdwijnt uit de lijsten en er start geen betaald werk meer. Terughalen zet alles terug zoals het was.' },
      { titel: 'Verwijderen als het moet', tekst: 'Vraagt een klant om verwijdering van zijn gegevens, dan zie je eerst wat er weggaat. Daarna typ je de naam over.' },
    ] as Bijschrift[],
  },
}

export const afsluiter = {
  title: 'Zet je bureau in Orbit.',
  description: 'Bekijk in een demo hoe het werkoverzicht, de rollen en de kosten werken voor een bureau met jouw aantal klanten.',
}
