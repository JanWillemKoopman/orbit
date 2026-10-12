// Teksten van de pagina Kennis en feiten (/kennis). Voor een lezer die ORBIT ENGINE nog niet kent:
// het probleem (AI verzint), het brein (wat ORBIT ENGINE over een bedrijf weet, met de bron erbij) en
// het vangnet (een zin zonder bron wordt geel). De beelden staan in components/kennis/Visuals.tsx.

import type { Bijschrift } from '@/components/product/Blokken'

export const meta = {
  title: 'Kennis en feiten',
  description:
    'AI-teksten klinken overtuigend, ook als ze iets verzinnen. ORBIT ENGINE schrijft alleen met feiten die ergens vandaan komen, en laat je zien waarvandaan.',
}

export const demoHref = '/demo'

export const hero = {
  eyebrow: 'Kennis en feiten',
  title: 'AI die schrijft wat klopt. Niet wat goed klinkt.',
  description:
    'AI-teksten klinken overtuigend, ook als ze iets verzinnen. ORBIT ENGINE schrijft alleen met feiten over je klant die ergens vandaan komen, en laat je precies zien waarvandaan.',
  cta: 'Demo aanvragen',
  secondary: 'Zo werkt het',
  note: 'Productbeelden met fictieve voorbeeldgegevens',
  beeld: { titel: 'Elke bewering heeft een herkomst', tekst: 'Van de website, van de klant zelf of uit een document. Je ziet het bij elke zin.' },
}

export const ronde = [
  { label: 'Het probleem', href: '#probleem' },
  { label: 'Het brein', href: '#brein' },
  { label: 'Schrijven', href: '#schrijven' },
  { label: 'Het vangnet', href: '#vangnet' },
]

export const secties = {
  probleem: {
    id: 'probleem',
    title: 'AI verzint met dezelfde stelligheid als waarmee het feiten noemt.',
    description:
      'Een garantie die niet bestaat, een prijs van vorig jaar, een keurmerk dat je klant niet heeft. Het leest prima, tot de klant belt. Wie dat wil voorkomen, moet elke zin zelf nalopen. Dan ben je de tijdwinst van AI meteen weer kwijt.',
    cellen: [
      { titel: 'Klinkt goed, klopt niet', tekst: 'Een gewone AI-schrijver vult gaten op met wat aannemelijk klinkt. Je ziet niet welke zin verzonnen is.', label: 'Gewone AI' },
      { titel: 'Je ziet meteen wat je moet nalopen', tekst: 'Bij ORBIT ENGINE rust de tekst op feiten met een bron. Een prijs, termijn of garantie zonder bron valt meteen op.', label: 'ORBIT ENGINE' },
    ] as Bijschrift[],
  },
  brein: {
    id: 'brein',
    title: 'Eerst weten. Dan pas schrijven.',
    description:
      'Voordat er één zin geschreven wordt, verzamelt ORBIT ENGINE alles wat er over je klant bekend is: van binnen en van buiten. Dat komt samen in één brein, met bij elk feit waar het vandaan komt.',
    paneel: { titel: 'Twee bronnen, één brein', tekst: 'Wat je klant zelf vertelt en wat de markt laat zien, op één plek. Alles wat later op een pagina komt, komt hier vandaan.' },
    cellen: [
      { titel: 'Van binnen: wat je klant weet', tekst: 'De website, het kennismakingsgesprek, antwoorden op vragen en brochures. ORBIT ENGINE leest het en legt vast wat erin staat.', label: 'Merk' },
      { titel: 'Van buiten: wat de markt laat zien', tekst: 'Vakkennis, regels en concurrenten, opgezocht op het web en gecontroleerd op de bron.', label: 'Markt' },
    ] as Bijschrift[],
  },
  register: {
    id: 'register',
    title: 'Feiten apart. Vermoedens apart.',
    description:
      'In het brein staat bij elk feit hoe zeker het is. Gevonden met bewijs, gezegd door de klant of bevestigd door je team. Wat de AI alleen vermoedt, staat er ook, maar komt nooit zomaar in een tekst.',
    paneel: { titel: 'Het brein van één bedrijf', tekst: 'Elk feit met zijn bron en hoe zeker het is. Je team ziet in één oogopslag wat er gebruikt mag worden.', label: 'Voorbeeldgegevens' },
    cellen: [
      { titel: 'Een vermoeden blijft een vermoeden', tekst: 'Pas als iemand van je team het bevestigt, mag het in een tekst.' },
      { titel: 'Geen bewijs, geen feit', tekst: 'Zegt de AI iets op de website te zien, dan moet die zin daar ook echt letterlijk staan.' },
    ] as Bijschrift[],
  },
  schrijven: {
    id: 'schrijven',
    title: 'De schrijver krijgt alleen wat klopt.',
    description:
      'De AI die de pagina schrijft, krijgt alleen de feiten die mogen. Bij elke bewering moet hij aangeven op welk feit die rust, en ORBIT ENGINE controleert of dat ook echt zo is.',
    punten: [
      'Alleen feiten met een bron gaan mee',
      'Elke bewering wijst naar een feit in het brein',
      'Een getal moet ook echt in de bron staan',
      'Namen van concurrenten en verboden woorden blijven eruit',
    ],
  },
  vangnet: {
    id: 'vangnet',
    title: 'Twijfel? Dan wordt het geel.',
    description:
      'Noemt een tekst een bedrag, termijn, garantie of keurmerk zonder bron, dan wordt die zin geel. Je keurt een pagina pas goed als elke gele zin is nagelopen. Zo komt er nooit ongemerkt een verzonnen belofte op de site van je klant.',
    cellen: [
      { titel: 'Je ziet waarom', tekst: 'Onder elke gele zin staat wat er ontbreekt. Klopt het, dan bevestig je het met één klik.' },
      { titel: 'Of je vraagt het de klant', tekst: 'De zin wordt een vraag aan je klant. Het antwoord gaat het brein in, voor deze tekst en alle teksten erna.', label: 'Zonder mailtjes' },
    ] as Bijschrift[],
  },
  bijblijven: {
    id: 'bijblijven',
    title: 'Een brein dat bijblijft.',
    description:
      'Bedrijven veranderen. Prijzen gaan omhoog, diensten stoppen, de website zegt het ene en de brochure het andere. ORBIT ENGINE ziet het en vraagt je om een besluit.',
    cellen: [
      { titel: 'Tegenstrijdigheden vallen op', tekst: 'Staat er op de ene plek 3 jaar garantie en op de andere 5, dan hoor je dat voordat het in een tekst staat.' },
      { titel: 'Oude feiten gaan niet stilletjes mee', tekst: 'Een prijs kan een einddatum krijgen. Daarna moet iemand hem opnieuw bevestigen.' },
    ] as Bijschrift[],
  },
  eerlijk: {
    id: 'eerlijk',
    title: 'Wat ORBIT ENGINE controleert. En wat jij beslist.',
    description: 'Geen tool kan alles controleren. Daarom zeggen we precies wat er wel gecontroleerd wordt, zodat jij weet waar je op moet letten.',
    systeem: ['Bedragen en prijzen', 'Termijnen en levertijden', 'Garanties en keurmerken', 'Getallen die niet in de bron staan', 'Namen van concurrenten', 'Woorden die je klant niet wil'],
    mens: ['Of de toon past bij het merk', 'Of een tekst overtuigt', 'Algemene uitspraken, zoals “specialist in”', 'Wanneer een pagina live gaat'],
  },
}

export const afsluiter = {
  title: 'Laat AI schrijven. Zonder je reputatie op het spel te zetten.',
  description: 'Bekijk in een demo hoe het brein van een van je klanten eruit zou zien.',
  cta: 'Demo aanvragen',
}
