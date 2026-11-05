// Teksten van de pagina Agencies (/agencies): de verkooppagina voor de eigenaar van een marketingbureau.
// Waar /werkwijze laat zien hoe Orbit werkt, zegt deze pagina waarom een bureau ervoor kiest. Opbouw naar
// linear.app: de hero met achtergrondvideo, een raster met de acht redenen, zes secties met een intro en
// een groot beeld of raster, een tussenzin, de start in drie stappen, vragen van bureaus en de afsluiter.
// Elke belofte hier bestaat in de app (de kern: bedrijven, clusters, contentplan, schrijven, resultaten,
// kijkers en het design per bureau). De tools die in de wacht staan, komen op deze pagina niet voor.

import type { Bijschrift, Verwijzing } from '@/components/product/Blokken'
import type { FaqItem } from '@/content/home'

export type { Bijschrift, Verwijzing }

export const meta = {
  title: 'Agencies',
  description:
    'Orbit is het platform voor marketingbureaus die AI-zichtbaarheid als vaste dienst verkopen: al je klanten bij elkaar, onbeperkt klanten, je klant kijkt mee en alles in de huisstijl van je bureau.',
}

export const hero = {
  eyebrow: 'Agencies',
  title: "AI-software voor marketing agency's met groeiambitie",
}

// Het raster direct onder de hero: de acht redenen in één oogopslag, voor wie maar één blok leest.
export type Reden = { icoon: string; titel: string; tekst: string; href: string }

export const redenen = {
  titel: 'Gebouwd voor bureaus. Niet achteraf aangepast.',
  tekst:
    'De meeste tools zijn gemaakt voor één merk, met een bureau-account erbij geplakt. Orbit is vanaf de eerste regel gebouwd voor bureaus die voor tientallen klanten tegelijk werken.',
  items: [
    { icoon: 'merk', titel: 'Al je klanten bij elkaar', tekst: 'Eén werkoverzicht voor je hele portefeuille. Je ziet meteen waar iets op je wacht.', href: '#klanten' },
    { icoon: 'grafiek', titel: 'Zoveel klanten als je wilt', tekst: 'Geen limiet op het aantal klanten. Orbit groeit mee, van je eerste klant tot je honderdste.', href: '#klanten' },
    { icoon: 'sparkle', titel: 'Volledig in jouw huisstijl', tekst: 'Je logo, je kleuren, je lettertype. Het redesign van de interface is inbegrepen.', href: '#huisstijl' },
    { icoon: 'mensen', titel: 'Je klant kijkt mee', tekst: 'Je klant ziet zijn eigen resultaten, in gewone taal. Jij bepaalt wat hij mag.', href: '#meekijken' },
    { icoon: 'taken', titel: 'Je team op strategie', tekst: 'Orbit neemt het grootste deel van het SEO- en GEO-werk uit handen.', href: '#team' },
    { icoon: 'feit', titel: 'Teksten die kloppen', tekst: 'Geen verzonnen prijs of garantie op de site van je klant. De software houdt ze tegen.', href: '#team' },
    { icoon: 'check', titel: 'Bewijs dat klanten houdt', tekst: 'Elke pagina wordt na twee en vier weken opnieuw gemeten. Resultaat, zwart op wit.', href: '#resultaat' },
    { icoon: 'euro', titel: 'Een marge die van jou is', tekst: 'De AI draait op de sleutels van je bureau, tegen kostprijs en zonder opslag.', href: '#marge' },
  ] as Reden[],
}

export const secties = {
  klanten: {
    id: 'klanten',
    label: 'Al je klanten',
    titel: 'Al je klanten bij elkaar. Hoeveel het er ook worden.',
    tekst:
      'Eén werkoverzicht voor je hele portefeuille. Per klant de zichtbaarheid in AI, wat er wacht en sinds wanneer. Of je nu vijf klanten hebt of vijftig: elke ochtend zie je in één oogopslag waar je moet beginnen.',
    link: { label: 'Zo loopt een maand in Orbit', href: '/werkwijze' } as Verwijzing,
    beeld: {
      titel: 'Je hele portefeuille op één scherm',
      tekst: 'Wat het langst wacht, staat bovenaan. Zo valt er nooit meer een klant tussen wal en schip.',
    },
    cellen: [
      { titel: 'Een nieuwe klant staat er in tien minuten', tekst: 'Naam en website zijn genoeg. Orbit leest de site, brengt aanbod en concurrenten in kaart en zet een compleet merkdossier klaar.' },
      { titel: 'De maand starten voor al je klanten', tekst: 'Vink je klanten aan en start met één klik de maand voor allemaal. Tien klanten zijn geen tien keer zoveel werk.' },
    ] as Bijschrift[],
  },
  huisstijl: {
    id: 'huisstijl',
    label: 'Whitelabel',
    titel: 'Jouw merk. Jouw platform.',
    tekst:
      'Je klant ziet jouw bureau, niet onze software. Orbit draait in jouw huisstijl: je logo, je kleuren, je lettertype en je vormen, op elk scherm. Het redesign van de interface doen wij voor je, en dat is inbegrepen.',
    beeld: {
      titel: 'Eén platform, in de huisstijl van elk bureau',
      tekst: 'We vertalen de huisstijl van je website naar de hele interface. Het blijft een rustig werkscherm waar je team de hele dag prettig in werkt.',
    },
    cellen: [
      { titel: 'Je huisstijl, tot in de details', tekst: 'Kleuren, lettertypes, hoeken, schaduwen en je logo linksboven. Wij meten je website op en zetten alles om naar elk scherm.' },
      { titel: 'Een maandverslag met jouw naam erop', tekst: 'Elke maand per klant een verslag van je bureau, klaar om door te sturen. Jouw werk, jouw naam.' },
    ] as Bijschrift[],
  },
  meekijken: {
    id: 'meekijken',
    label: 'Meekijken',
    titel: 'Laat je klant meekijken. Op jouw voorwaarden.',
    tekst:
      'Nodig je klant uit en hij ziet zijn eigen resultaten, met uitleg in gewone taal op elk scherm. Hij beantwoordt vragen, levert materiaal aan en keurt teksten goed als jij dat wilt. Een klant die meekijkt, voelt zich betrokken. En blijft.',
    cellen: [
      { titel: 'Je klant ziet alleen zijn eigen bedrijf', tekst: 'Geen andere klanten, geen beheer, geen kosten. Alleen zijn resultaten en wat er op hem wacht.' },
      { titel: 'Jij bepaalt wat je klant mag', tekst: 'Vragen beantwoorden, materiaal aanleveren, teksten goedkeuren. Zet aan wat past bij de samenwerking. Wat geld kost, blijft altijd bij jou.' },
      { titel: 'Antwoorden zonder account', tekst: 'Stuur een link en je klant beantwoordt de vragen op zijn telefoon, zonder in te loggen. Nooit meer achter input aan bellen.' },
      { titel: 'Uitnodigen in een minuut', tekst: 'Kies de rol en het bedrijf, en de uitnodiging gaat per mail. Collega’s nodig je op dezelfde manier uit als beheerder.' },
    ] as Bijschrift[],
  },
  team: {
    id: 'team',
    label: 'Je team',
    titel: 'Je specialisten doen het denkwerk. Orbit doet de rest.',
    tekst:
      'Orbit neemt het grootste deel van het SEO- en GEO-werk uit handen. Je marketeers zitten met de klant aan tafel, bepalen de strategie en keuren goed. Orbit onderzoekt, meet, plant, schrijft en meet opnieuw. Zo bedien je meer klanten met hetzelfde team.',
    link: { label: 'Wat AI voor je bureau doet', href: '/ai' } as Verwijzing,
    beeld: {
      titel: 'Wie doet wat',
      tekst: 'Je team doet waar het goed in is: de klant kennen en de koers bepalen. Al het uitvoerende werk eromheen loopt in Orbit vanzelf door.',
    },
    cellen: [
      { titel: 'Teksten die je zonder zorgen levert', tekst: 'Elke prijs, garantie en termijn wordt gecontroleerd tegen wat je klant bevestigde. Wat niet klopt, wordt geel. Zo zet je nooit je reputatie op het spel.' },
      { titel: 'Een contentplan voor een heel jaar', tekst: 'Elke gemiste kans wordt een pagina-idee met bewijs. Orbit vult de maanden, jij kiest het tempo dat bij het contract van je klant past.' },
    ] as Bijschrift[],
  },
  resultaat: {
    id: 'resultaat',
    label: 'Resultaat',
    titel: 'Klanten die resultaat zien, blijven klant.',
    tekst:
      'Na publicatie meet Orbit elke pagina opnieuw, na twee en na vier weken, op precies de vragen waarvoor hij geschreven is. Met Search Console gekoppeld zie je ook de klikken uit Google. Elk klantgesprek gaat voortaan over resultaat, niet over uren.',
    link: { label: 'Zo meet Orbit het effect', href: '/werkwijze#effect-meting' } as Verwijzing,
    beeld: {
      titel: 'Zichtbaarheid in AI, maand na maand',
      tekst: 'Bij elk cijfer een onzekerheidsmarge, zodat je weet dat een stijging echt is. Een cijfer dat overeind blijft bij elke kritische klant.',
    },
    cellen: [
      { titel: 'Het effect van elke pagina', tekst: 'Vóór publicatie, na 14 dagen en na 28 dagen. Gestegen betekent hier echt gestegen, buiten de marge.' },
      { titel: 'Klikken uit Google, per pagina', tekst: 'Met Search Console gekoppeld zie je per pagina hoe het verkeer groeit vanaf de dag dat hij live ging.' },
    ] as Bijschrift[],
  },
  marge: {
    id: 'marge',
    label: 'Marge',
    titel: 'Een nieuwe dienst. Met een marge die van jou is.',
    tekst:
      'Je klanten vragen het al: worden wij door ChatGPT aanbevolen? Met Orbit maak je daar een vaste maanddienst van. De AI draait op de sleutels van je bureau, tegen kostprijs en zonder opslag. Wat je daarbovenop rekent, is jouw marge.',
    link: { label: 'Bekijk de plannen', href: '/prijzen' } as Verwijzing,
    cellen: [
      { titel: 'Kosten per klant, tot op de cent', tekst: 'Je ziet precies wat elke klant aan AI kost. Meten en tien nieuwe pagina’s per maand kosten minder dan een zakenlunch.' },
      { titel: 'De prijs staat bij de knop', tekst: 'Voordat je iets start, zie je wat het kost. Met een maandlimiet die je zelf instelt, krijg je nooit een verrassing achteraf.' },
    ] as Bijschrift[],
  },
}

// Grote tussenzin tussen Meekijken en Je team. Het eerste deel staat in het wit, de rest in grijs.
export const statement = {
  strong: 'Jullie bepalen de strategie. Orbit voert hem uit.',
  rest: 'Onderzoek, metingen, contentplannen, briefings, teksten, eindredactie, nametingen en maandverslagen. Het werk dat je specialisten nu weken kost, loopt in Orbit vanzelf door. Zij houden tijd over voor waar klanten echt voor betalen: advies.',
}

// De start in drie stappen, boven de vragen.
export const start = {
  titel: 'Niets te installeren. Je begint meteen.',
  tekst: 'We zetten je eerste klant samen met je op, zodat je vanaf de eerste dag weet hoe het werkt.',
  stappen: [
    { titel: 'We zetten je bureau klaar', tekst: 'In jouw huisstijl, met je logo. Je krijgt een uitnodiging per mail.' },
    { titel: 'Je voegt je klanten toe', tekst: 'Naam en website per klant. Orbit onderzoekt ze terwijl jij verder werkt.' },
    { titel: 'Je eerste meting', tekst: 'Kies een onderwerp en zie hoe zichtbaar je klant is in AI, met de kansen erbij.' },
  ],
}

export const faq: { title: string; items: FaqItem[] } = {
  title: 'Vragen van bureaus',
  items: [
    {
      question: 'Hoeveel klanten kan ik in Orbit beheren?',
      answer: 'Zoveel als je wilt. Er zit geen limiet op het aantal klanten: Orbit groeit mee met je portefeuille, van je eerste klant tot je honderdste. Welk plan bij jouw aantal past, zie je op de pagina Prijzen.',
    },
    {
      question: 'Kan Orbit echt in de huisstijl van mijn bureau?',
      answer: 'Ja. We vertalen de huisstijl van je website naar de hele interface: je logo, kleuren, lettertypes en vormen. Je team en je klanten zien op elk scherm jouw bureau. Het redesign is inbegrepen.',
    },
    {
      question: 'Wat ziet mijn klant als hij meekijkt?',
      answer: 'Alleen zijn eigen bedrijf: zijn zichtbaarheid, zijn pagina’s en wat er op hem wacht, met uitleg in gewone taal. Andere klanten, kosten en beheer ziet hij nooit. Wat hij mag doen, bepaal jij.',
    },
    {
      question: 'Moet mijn klant een account hebben om vragen te beantwoorden?',
      answer: 'Nee. Je stuurt een link, en iedereen bij je klant beantwoordt de openstaande vragen zonder in te loggen, ook op de telefoon.',
    },
    {
      question: 'Vervangt Orbit mijn SEO- en GEO-specialisten?',
      answer: 'Nee, het maakt ze waardevoller. Orbit neemt het uitvoerende werk over: onderzoek, metingen, planning, briefings en teksten. Je specialisten houden tijd over voor strategie en klantgesprekken, en bedienen meer klanten tegelijk.',
    },
    {
      question: 'Wat kost de AI?',
      answer: 'De AI draait op de eigen sleutels van je bureau, tegen kostprijs en zonder opslag van ons. Bij elke knop zie je vooraf wat het kost, en met een maandlimiet houd je alles in de hand.',
    },
    {
      question: 'Moet ik iets installeren?',
      answer: 'Nee. Orbit draait online. Je bureau krijgt een uitnodiging, je vult de sleutel van je bureau in en je voegt je eerste klant toe. Nieuwe versies verschijnen vanzelf.',
    },
    {
      question: 'Zijn de gegevens van mijn klanten veilig?',
      answer: 'Ja. Elk bureau werkt in een eigen, afgeschermde omgeving. Andere bureaus zien niets van jouw klanten, en jij niets van die van hen.',
    },
  ],
}

export const afsluiter = {
  title: 'Laat je bureau groeien met Orbit.',
  description: 'Plan een demo. We laten je Orbit zien in de huisstijl van jouw bureau.',
}
