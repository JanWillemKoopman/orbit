// Teksten van de bureaupagina (/agency). Waar /product de werkwijze per bedrijf laat zien, gaat deze
// pagina over het account van het bureau: al je klanten in één overzicht, klanten toevoegen, je team
// en je klanten met de juiste rol, en grip op wat de AI kost. De beelden zijn nagebouwde schermen
// (components/agency/Visuals.tsx) met het fictieve Bureau Noordwind.

import type { Bijschrift } from '@/components/product/Blokken'

export const meta = {
  title: 'Voor bureaus',
  description:
    'ORBIT ENGINE voor marketingbureaus: al je klanten in één overzicht, collega’s en klanten met de juiste rol, en grip op wat de AI kost. Je betaalt alleen je eigen gebruik, met je eigen sleutels.',
}

export const demoHref = '/contact?onderwerp=demo'

export const hero = {
  eyebrow: 'ORBIT ENGINE voor marketingbureaus',
  title: 'Al je klanten in één account. Jij houdt de regie.',
  description:
    'Eén werkoverzicht voor al je klanten, collega’s en klanten die precies zien wat ze moeten zien, en kosten die je vooraf kent. Je bureau betaalt alleen voor het eigen gebruik van de AI, met je eigen sleutels.',
  cta: 'Demo aanvragen',
  secondary: 'Bekijk het overzicht',
  note: 'Productbeelden met fictieve voorbeeldgegevens',
  beeld: { titel: 'Het werkoverzicht van je bureau', tekst: 'Per klant de zichtbaarheid, wat er op je wacht en wat het de afgelopen dertig dagen kostte. Wat het langst wacht, staat bovenaan.' },
}

export const ronde = [
  { label: 'Overzicht', href: '#overzicht' },
  { label: 'Klanten', href: '#klanten' },
  { label: 'Team', href: '#team' },
  { label: 'Kosten', href: '#kosten' },
  { label: 'Sleutels', href: '#sleutels' },
  { label: 'Gegevens', href: '#gegevens' },
]

export const usps = [
  { titel: 'Onbeperkt klanten', tekst: 'Voeg zoveel bedrijven toe als je bureau bedient. Elk bedrijf krijgt zijn eigen dossier, metingen en contentplan.' },
  { titel: 'Rollen per persoon', tekst: 'Beheerders doen alles. Kijkers zien alleen hun eigen bedrijf, en doen alleen wat jij toestaat.' },
  { titel: 'Eigen sleutels', tekst: 'Je bureau betaalt OpenAI, Gemini en DataForSEO rechtstreeks. Geen gedeelde rekening, geen verborgen verbruik.' },
  { titel: 'Een harde maandlimiet', tekst: 'Stel een bovengrens in. Is die bereikt, dan start er geen nieuw betaald werk meer tot de volgende maand.' },
]

export const secties = {
  overzicht: {
    id: 'overzicht',
    title: 'Zie in één oogopslag waar elke klant staat.',
    description:
      'Het werkoverzicht zet al je klanten onder elkaar: de zichtbaarheid in AI met de verandering, welke clusters elke maand gemeten worden, wat er op je wacht en sinds wanneer. Zo weet je elke ochtend waar je moet beginnen.',
    cellen: [
      { titel: 'Wat het langst wacht, staat bovenaan', tekst: 'Open vragen, teksten om na te kijken en pagina’s om te plaatsen, met het aantal dagen dat het al wacht.' },
      { titel: 'Start de maand voor meerdere klanten', tekst: 'Vink bedrijven aan en start hun maand in één keer. Vooraf zie je hoeveel pagina’s het samen zijn en ongeveer wat het kost.', label: 'Bulk' },
    ] as Bijschrift[],
  },
  klanten: {
    id: 'klanten',
    title: 'Een nieuwe klant staat er in tien minuten.',
    description:
      'Vul de naam en de website in. ORBIT ENGINE leest de site, brengt aanbod, doelgroep en concurrenten in kaart en zet een merkdossier klaar. Het onderzoek loopt door als je het scherm sluit.',
    cellen: [
      { titel: 'Naam en website, meer niet', tekst: 'Bij de knop staat wat een onderzoek je bureau eerder gemiddeld kostte, en wat er van de maandlimiet over is.' },
      { titel: 'Het onderzoek doet de rest', tekst: 'Website, merk, aanbod, onderwerpen en markt. Je ziet welke stap loopt en wanneer het dossier klaarstaat.' },
    ] as Bijschrift[],
    paneel: { titel: 'Elke klant zijn eigen standaard', tekst: 'Leg per bureau vast hoeveel pagina’s een nieuwe klant per maand krijgt en of nieuwe clusters elke maand gemeten worden. Pas het per klant aan wanneer je wilt.' },
  },
  team: {
    id: 'team',
    title: 'Je team en je klant, elk met de juiste rol.',
    description:
      'Nodig collega’s uit als beheerder en laat je klant meekijken als kijker. Een kijker ziet alleen de bedrijven die jij toewijst, en doet daar alleen wat jij aanzet. Wat geld kost, blijft altijd bij een beheerder.',
    paneel: { titel: 'Iedereen in je bureau op één plek', tekst: 'Wie beheerder is, wie meekijkt, welk bedrijf een kijker ziet en wanneer iemand voor het laatst inlogde. Openstaande uitnodigingen staan erbij.' },
    cellen: [
      { titel: 'Uitnodigen met een rol', tekst: 'Kies beheerder of kijker, en bij een kijker meteen de bedrijven. De uitnodiging gaat per mail en werkt veertien dagen.', label: 'Toegang' },
      { titel: 'Jij bepaalt wat een kijker mag', tekst: 'Vragen beantwoorden, materiaal toevoegen, teksten goedkeuren. Zet aan wat past bij de samenwerking.', label: 'Kijkers' },
    ] as Bijschrift[],
  },
  kosten: {
    id: 'kosten',
    title: 'Weet wat de AI kost, voordat je op de knop drukt.',
    description:
      'Elke aanroep naar een AI-dienst wordt vastgelegd met het bedrag. Je ziet het verbruik per maand, per soort werk en per klant, wat volgende maand vanzelf loopt, en bij elke betaalde knop wat het ongeveer kost.',
    paneel: { titel: 'Eén scherm voor je kosten', tekst: 'Het verbruik van deze maand naast je maandlimiet, met een schatting van wat er volgende maand vanzelf loopt.', label: 'Voorbeeldgegevens' },
    cellen: [
      { titel: 'De prijs staat bij de knop', tekst: 'Een schatting uit wat je eigen bureau eerder betaalde. Zonder geschiedenis staat er geen verzonnen bedrag, maar “nog geen schatting”.' },
      { titel: 'Kosten per klant', tekst: 'Zie welke klant wat kost, zodat je je uren en je tarief op het echte verbruik afstemt.', label: 'Voorbeeldgegevens' },
    ] as Bijschrift[],
  },
  sleutels: {
    id: 'sleutels',
    title: 'Jouw sleutels, jouw rekening.',
    description:
      'Je bureau vult zijn eigen sleutels van OpenAI, Gemini en DataForSEO in. De kosten komen rechtstreeks bij jouw bureau terecht, en je betaalt alleen wat je zelf gebruikt.',
    punten: [
      'Versleuteld opgeslagen, daarna alleen de laatste vier tekens zichtbaar',
      'Een testknop per sleutel',
      'Nooit een uitwijk naar de sleutel van een ander bureau',
      'Maandlimiet geldt ook voor de automatische maandmeting',
    ],
  },
  gegevens: {
    id: 'gegevens',
    title: 'Jouw klanten blijven van jou.',
    description:
      'Elk bureau werkt in een eigen omgeving en ziet van een ander bureau niets, ook niet dat het bestaat. Stopt een klant, dan archiveer je hem of verwijder je zijn gegevens definitief.',
    cellen: [
      { titel: 'Archiveren zonder iets kwijt te raken', tekst: 'Een gearchiveerde klant verdwijnt uit de lijsten en er start geen betaald werk meer. Terughalen zet alles terug zoals het was.' },
      { titel: 'Verwijderen als het moet', tekst: 'Vraagt een klant om verwijdering van zijn gegevens, dan zie je eerst wat er weggaat. Daarna typ je de naam over.', label: 'AVG' },
    ] as Bijschrift[],
  },
}

export const afsluiter = {
  title: 'Zet je bureau in ORBIT ENGINE.',
  description: 'Bekijk in een demo hoe het werkoverzicht, de rollen en de kosten werken voor een bureau met jouw aantal klanten.',
  cta: 'Demo aanvragen',
}
