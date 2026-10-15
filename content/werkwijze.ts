// Teksten van de pagina Werkwijze (/werkwijze), in de opbouw van linear.app/ai: een hero, vijf
// secties met elk een intro (titel, tekst, link) en een groot beeld of een raster, een rij met de
// vier productpagina's en de afsluiter. De beelden zijn nagebouwde schermen van ORBIT ENGINE
// (components/product/Visuals.tsx) met de fictieve voorbeeldcase Lindeman Warmte.

import type { Bijschrift, Verwijzing } from '@/components/product/Blokken'

export type { Bijschrift, Verwijzing }

export const meta = {
  title: 'Werkwijze',
  description:
    "Zie hoe ORBIT ENGINE werkt: AI-zichtbaarheid meten, contentkansen plannen, pagina's schrijven en beoordelen en het resultaat nameten. Voor online marketingbureaus met meerdere klanten.",
}

export const hero = {
  eyebrow: 'Werkwijze',
  title: 'Elke maand dezelfde ronde. Met bewijs aan het eind.',
}

export const secties = {
  start: {
    id: 'start',
    titel: 'Elke klant een vaste maand.',
    tekst:
      "Je klanten vragen ChatGPT al welke installateur ze moeten kiezen. ORBIT ENGINE laat zien of jouw klant genoemd wordt, schrijft de pagina's die dat veranderen en laat zien wat het opleverde. Voor al je klanten, onbeperkt.",
    link: { label: 'Wat AI voor je doet', href: '/ai' },
    beeld: {
      titel: 'Wat er deze maand speelt',
      tekst: 'Je ziet welke stap loopt, wat er op jou wacht en wanneer er een melding binnenkomt. Zo weet je elke ochtend waar je moet beginnen.',
      label: 'Voorbeeldgegevens',
    },
    cellen: [
      { titel: 'Een klant staat in tien minuten klaar', tekst: 'Naam en website zijn genoeg. De lijst Dit bedrijf inrichten loopt met je mee en vinkt zichzelf af, ook voor een nieuwe collega.' },
      { titel: 'Het kennismakingsgesprek stuurt alles', tekst: "Leg doelen, regio's en prioriteiten vast die een website niet vertelt. Kansen die het groeidoel van je klant raken, komen bovenaan." },
    ] as Bijschrift[],
  },
  meten: {
    id: 'meten',
    titel: 'Zie bij welke vragen je klant wordt genoemd.',
    tekst:
      'Dertig AI-vragen langs de klantreis, elke maand meten in ChatGPT, Gemini en Google AI Overview. Bij elk cijfer staat een marge, zodat je weet wanneer een verschil echt is. Zo verkoop je je klant geen toeval.',
    link: { label: 'Hoe AI meet', href: '/ai' },
    beeld: {
      titel: 'Zichtbaarheid die je kunt laten zien',
      tekst: 'Elke maand meten, steeds op dezelfde vragen, zodat je groei per onderwerp echt vergelijkt.',
      label: 'Voorbeeldgegevens',
    },
    cellen: [
      { titel: 'De vragen van jouw klanten, langs de hele klantreis', tekst: 'Van oriëntatie tot beslissing, met het aanbod en de plaatsnamen van het bedrijf. Zo zie je of je klant alleen meedoet in de uitlegfase, of ook als de koper kiest.' },
      { titel: 'Lees elk antwoord terug', tekst: 'Zie welke bedrijven de AI-assistent noemt, in welke volgorde en op welke bronnen dat leunt. Geen screenshot, maar een meting die je kunt nalezen.' },
      { titel: 'Een cijfer met een marge', tekst: 'Vaste vragen, de zwaarste vaker gemeten, en een marge erbij. Je weet wanneer een verschil echt is, ook voor een klant met een kritische analist.' },
      { titel: 'Weet wie je voor is', tekst: 'Per onderwerp zie je hoe vaak je klant genoemd wordt, naast de concurrenten die AI het vaakst aanbeveelt.' },
    ] as Bijschrift[],
  },
  plannen: {
    id: 'plannen',
    titel: 'Geef inzichten een plek in je contentplan.',
    tekst:
      "Elke gemiste vraag wordt een pagina-idee met bewijs. Je kiest het aantal pagina's per maand, van vijf tot vijftig, en het plan loopt een jaar vooruit. Zo sluit je werk aan op wat je met je klant hebt afgesproken.",
    beeld: {
      titel: 'Plan het werk per maand',
      tekst: 'Per maand zie je welke pagina op antwoorden, akkoord of publicatie wacht. Open maanden vullen zich met de sterkste kansen.',
      label: 'Voorbeeldgegevens',
    },
    cellen: [
      { titel: 'Van gemist antwoord naar pagina', tekst: "Een vraag waarbij AI concurrenten noemt, wordt een kans en daarna een pagina. Nooit twee pagina's over hetzelfde." },
      { titel: 'Klaar om in te plannen', tekst: 'Elk idee met zijn potentie en de vragen die het raakt. Eén klik en het staat in de maand.' },
    ] as Bijschrift[],
  },
  schrijven: {
    id: 'schrijven',
    titel: 'Schrijf vanuit bedrijfskennis. Plaats wat je goedkeurt.',
    tekst:
      'Wat alleen je klant weet, beantwoordt hij zelf, ook op zijn telefoon en zonder account. ORBIT ENGINE schrijft zodra alle antwoorden er zijn. Jij beoordeelt, kopieert en meldt het adres.',
    link: { label: 'Hoe de feiten bewaakt worden', href: '/kwaliteit' },
    beeld: {
      titel: 'Teksten die klinken als je klant',
      tekst: 'Het antwoord van de klant staat in de tekst. Een bewering zonder bron valt op.',
      label: 'Voorbeeldgegevens',
    },
    cellen: [
      { titel: 'Je klant antwoordt waar hij is', tekst: 'Via een link op zijn telefoon, zonder account. Het antwoord gaat direct mee naar het schrijven en jij belt niet meer na.' },
      { titel: 'Controleer wat ertoe doet', tekst: 'Een termijn, bedrag of garantie zonder vastgelegde bron wordt geel. Zo komt er nooit een verzonnen belofte op de site van je klant.' },
      { titel: 'Kopieer naar elk CMS', tekst: 'HTML, Markdown of platte tekst, met titel, omschrijving en veelgestelde vragen erbij. ORBIT ENGINE zet zelf niets op de site: jij houdt de regie.' },
      { titel: 'ORBIT ENGINE controleert of hij live staat', tekst: 'Meld het adres en de tekst wordt teruggezocht, met een tweede poging een uur later. Zo start de nameting pas als de pagina er echt staat.' },
    ] as Bijschrift[],
  },
  nameten: {
    id: 'nameten',
    titel: 'Zie wat de pagina deed. Laat het je klant zien.',
    tekst:
      'Na 14 en 28 dagen meet ORBIT ENGINE de doelvragen van elke pagina opnieuw en toont de klikken uit Google. Klanten die zien wat ze krijgen, blijven. Alles komt in een maandverslag met de naam van je bureau.',
    link: { label: 'Beheer van je klanten', href: '/beheer' },
    beeld: {
      titel: 'Een verslag dat het gesprek voert',
      tekst: 'Zichtbaarheid, wat er live ging en wat het deed, en wat volgende maand op de planning staat. Met de naam van je bureau erboven.',
      label: 'Voorbeeldgegevens',
    },
    cellen: [
      { titel: 'Eerlijk over het effect', tekst: 'Per pagina de stand vóór publicatie en na 14 en 28 dagen, op dezelfde vragen. Bij te weinig vragen zegt ORBIT ENGINE dat het nog niet te zeggen is.' },
      { titel: 'Klikken uit Google', tekst: 'Vertoningen, klikken en positie per gepubliceerde pagina, vanaf de dag dat hij live ging.' },
    ] as Bijschrift[],
  },
}

export const afsluiter = {
  title: 'Bekijk hoe ORBIT ENGINE in je bureau past.',
  description: 'Ontdek de werkwijze in een demo en bespreek welke klant geschikt is voor een eerste toepassing.',
}
