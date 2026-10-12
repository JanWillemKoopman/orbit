// Teksten van de productpagina (/product). De beelden zijn nagebouwde schermen van ORBIT ENGINE
// (components/product/Visuals.tsx) met de fictieve voorbeeldcase Lindeman Warmte.

export const meta = {
  title: 'Fases en werkwijze',
  description:
    "Zie hoe ORBIT ENGINE werkt: AI-zichtbaarheid meten, contentkansen plannen, klantkennis ophalen, pagina's schrijven en beoordelen, en het resultaat volgen. Voor marketingbureaus met meerdere klanten.",
}

export const demoHref = '/contact?onderwerp=demo'

import type { Bijschrift } from '@/components/product/Blokken'

export type { Bijschrift }

export const hero = {
  eyebrow: 'ORBIT ENGINE voor bureaus',
  title: 'Van AI-zichtbaarheid naar content die je kunt publiceren.',
  description:
    'Onderzoek waar je klanten worden genoemd, vertaal inzichten naar een contentplan en schrijf met hun bedrijfskennis als basis. ORBIT ENGINE brengt onderzoek, klantinput, beoordeling en opvolging samen voor jouw bureau.',
  cta: 'Demo aanvragen',
  secondary: 'Bekijk hoe het werkt',
  note: 'Productbeelden met fictieve voorbeeldgegevens',
  beeld: { titel: 'Elke klant een vaste maand', tekst: 'Meten, plannen, schrijven, publiceren en hermeten. Je ziet welke stap loopt en wat er nu op jou wacht.' },
}

export const ronde = [
  { label: 'Meten', href: '#zichtbaarheid' },
  { label: 'Plannen', href: '#planning' },
  { label: 'Schrijven', href: '#schrijven' },
  { label: 'Publiceren', href: '#publiceren' },
  { label: 'Hermeten', href: '#opvolging' },
]

export const secties = {
  zichtbaarheid: {
    id: 'zichtbaarheid',
    title: 'Zie bij welke vragen je klant wordt genoemd.',
    description:
      'Stel per onderwerp een meetplan samen met relevante AI-vragen. Bekijk in de gemeten antwoorden welke bedrijven worden genoemd, welke bronnen worden aangehaald en waar je klant ontbreekt.',
    paneel: { titel: 'Zichtbaarheid die je kunt laten zien', tekst: 'Elke maand gemeten op dezelfde vragen, zodat je groei per onderwerp echt vergelijkt.', label: 'Voorbeeldgegevens' },
    cellen: [
      { titel: 'Lees elk antwoord terug', tekst: 'Zie welke bedrijven de AI-assistent noemt, in welke volgorde, en op welke bronnen dat leunt.' },
      { titel: 'Weet wie je voor is', tekst: 'Per onderwerp zie je hoe vaak je klant genoemd wordt, naast de concurrenten die AI het vaakst aanbeveelt.', label: 'Voorbeeldgegevens' },
    ] as Bijschrift[],
  },
  kennis: {
    id: 'kennis',
    title: 'Elke klant een eigen kennisbasis.',
    description:
      'Breng aanbod, doelgroep, merkstem en bedrijfsfeiten samen in een merkdossier. Vul het aan met klantkennis en documenten, zodat volgende schrijfopdrachten voortbouwen op wat al is vastgelegd.',
    cellen: [
      { titel: 'Merkdossier', tekst: 'Aanbod, doelgroep en merkstem op één plek. Elke tekst begint hier.' },
      { titel: 'Feiten en kennis', tekst: 'Zie waar bedrijfsinformatie vandaan komt: website, gesprek, document of de klant zelf.' },
    ] as Bijschrift[],
  },
  planning: {
    id: 'planning',
    title: 'Geef inzichten een plek in je contentplan.',
    description:
      "Bekijk voorstellen voor nieuwe pagina's en verbeteringen aan bestaande content, met de vragen die ze moeten helpen beantwoorden. Bepaal de prioriteit, voeg eigen ideeën toe en plan het werk per maand.",
    cellen: [
      { titel: 'Van gemist antwoord naar pagina', tekst: 'Een vraag waarbij AI concurrenten noemt, wordt een kans en daarna een pagina.' },
      { titel: 'Klaar om in te plannen', tekst: 'Elk idee met zijn potentie en de vragen die het raakt. Eén klik en het staat in de maand.' },
    ] as Bijschrift[],
    paneel: { titel: 'Plan het werk per maand', tekst: 'Per maand zie je welke pagina op antwoorden, akkoord of publicatie wacht. Open maanden vullen zich met de sterkste kansen.' },
  },
  klantinput: {
    id: 'klantinput',
    title: 'Haal de kennis op die alleen je klant heeft.',
    description:
      "ORBIT ENGINE bereidt pagina's voor en stelt gerichte vragen over ontbrekende informatie. Je klant beantwoordt die in de app of via een deellink, zonder account. De antwoorden worden vastgelegd voor het schrijven.",
    cellen: [
      { titel: 'Gerichte vragen per pagina', tekst: 'Alle open vragen op één plek, met de reden erbij en een link om te delen.', label: 'Voor je team' },
      { titel: 'Antwoorden zonder account', tekst: 'Je klant opent de link op zijn telefoon en antwoordt. Het antwoord gaat direct mee naar de schrijver.', label: 'Voor je klant' },
    ] as Bijschrift[],
  },
  schrijven: {
    id: 'schrijven',
    title: 'Schrijf vanuit bedrijfskennis. Beoordeel met context.',
    description:
      'Laat pagina\'s voorbereiden, schrijven en redigeren op basis van het merkdossier en de aangeleverde antwoorden. Harde beweringen zonder voldoende onderbouwing worden gemarkeerd, zodat je team gericht kan controleren.',
    paneel: { titel: 'Teksten die klinken als je klant', tekst: 'Het antwoord van de klant staat in de tekst. Een bewering zonder bron valt op.' },
    cellen: [
      { titel: 'Controleer wat ertoe doet', tekst: 'Een termijn, bedrag of garantie zonder vastgelegde bron wordt gemarkeerd. Bevestig hem, pas hem aan of leg hem aan de klant voor.' },
      { titel: 'Eindredactie voor je akkoord', tekst: 'Bronnen, merkstem, verboden woorden en zoekmachinegegevens worden gecontroleerd voordat je de tekst leest.' },
    ] as Bijschrift[],
  },
  publiceren: {
    id: 'publiceren',
    title: 'Jullie geven het akkoord.',
    description:
      'Pas teksten aan, vraag een nieuwe versie aan en keur de inhoud goed. Kopieer de goedgekeurde tekst als HTML, Markdown of platte tekst en plaats die in het CMS van je klant. Meld daarna het live-adres voor de opvolging.',
    punten: ['Zelf bewerken of een aanpassing vragen', 'Kopiëren als HTML, Markdown of platte tekst', 'Titel, omschrijving en veelgestelde vragen erbij', 'Live melden start de opvolging'],
  },
  opvolging: {
    id: 'opvolging',
    title: 'Volg wat er na publicatie verandert.',
    description:
      "Laat de doelvragen van een pagina na 14 en 28 dagen opnieuw meten. Bekijk daarnaast met Google Search Console de vertoningen en klikken van gepubliceerde ORBIT ENGINE-pagina's.",
    cellen: [
      { titel: 'Hermeting van de doelvragen', tekst: 'Per pagina de stand vóór publicatie en na 14 en 28 dagen, op dezelfde vragen.', label: 'AI-vermeldingen' },
      { titel: 'Klikken uit Google', tekst: 'Vertoningen, klikken en positie per gepubliceerde pagina, vanaf de dag dat hij live ging.', label: 'Google-zoekverkeer' },
    ] as Bijschrift[],
  },
  rapportage: {
    id: 'rapportage',
    title: 'Maak je werk bespreekbaar.',
    description:
      'Bundel de gemeten zichtbaarheid, gepubliceerde pagina\'s en planning in een maandverslag met jullie bureaunaam. Gebruik het in het klantgesprek of bewaar het als pdf om te delen.',
    paneel: { titel: 'Een verslag dat het gesprek voert', tekst: 'Zichtbaarheid, wat er live ging en wat het deed, en wat volgende maand op de planning staat. Met jullie naam erboven.' },
  },
  bureau: {
    id: 'bureau',
    title: 'Houd het werk voor al je klanten bij.',
    description:
      'Zie waar antwoorden, beoordeling of publicatie op wachten. Start werkzaamheden voor meerdere bedrijven tegelijk, bepaal wie mag meekijken en volg het geregistreerde gebruik per klant.',
    paneel: { titel: 'Al je klanten in één overzicht', tekst: 'Per klant de zichtbaarheid en wat er nu op je wacht. Start de maand voor meerdere klanten tegelijk.' },
    cellen: [
      { titel: 'Bepaal wie meekijkt', tekst: 'Beheerders zien alles. Een kijker ziet alleen zijn eigen bedrijf, en doet alleen wat jij toestaat.', label: 'Toegang' },
      { titel: 'Grip op de kosten', tekst: 'Inzicht in gebruikskosten en een instelbare rem op nieuw betaald werk.', label: 'Kosten' },
    ] as Bijschrift[],
  },
}

export const afsluiter = {
  title: 'Bekijk hoe ORBIT ENGINE in jullie bureau past.',
  description: 'Ontdek de werkwijze in een demo en bespreek welke klant geschikt is voor een eerste toepassing.',
  cta: 'Demo aanvragen',
}
