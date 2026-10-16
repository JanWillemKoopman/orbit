// Teksten van de pagina Kwaliteit (/kwaliteit), in de opbouw van linear.app/ai: een hero, vijf
// secties met elk een intro (titel, tekst, link) en een groot beeld of een raster, een rij met de
// vier productpagina's en de afsluiter. De beelden staan in components/kennis/Visuals.tsx.

import type { Bijschrift, Verwijzing } from '@/components/product/Blokken'

export type { Bijschrift, Verwijzing }

export const meta = {
  title: 'Kwaliteit',
  description:
    'AI-teksten klinken overtuigend, ook als ze iets verzinnen. Orbit schrijft alleen met feiten die ergens vandaan komen, en laat je zien welke zin je moet nalopen.',
}

export const hero = {
  eyebrow: 'Kwaliteit',
  title: 'AI die schrijft wat klopt. Niet wat goed klinkt.',
}

export const secties = {
  probleem: {
    id: 'probleem',
    label: 'Het probleem',
    titel: 'AI verzint met dezelfde stelligheid als waarmee het feiten noemt.',
    tekst:
      'Een garantie die niet bestaat, een prijs van vorig jaar, een keurmerk dat je klant niet heeft. Het leest prima, tot de klant belt. Orbit schrijft alleen met feiten die ergens vandaan komen, zodat je AI-teksten kunt leveren zonder elke zin zelf na te pluizen.',
    link: { label: 'Zo ziet de werkwijze eruit', href: '/werkwijze' },
    beeld: {
      titel: 'Elke harde bewering heeft een bron',
      tekst: 'Een bedrag, termijn of garantie komt van de website, van de klant zelf of uit een document. Staat er geen bron bij, dan wordt de zin geel.',
    },
    cellen: [
      { titel: 'Klinkt goed, klopt niet', tekst: 'Een gewone AI-schrijver vult gaten op met wat aannemelijk klinkt. Je ziet niet welke zin verzonnen is.' },
      { titel: 'Je ziet meteen wat je moet nalopen', tekst: 'Bij Orbit rust de tekst op feiten met een bron. Een prijs, termijn of garantie zonder bron valt op.' },
    ] as Bijschrift[],
  },
  weten: {
    id: 'weten',
    label: 'Feiten',
    titel: 'Eerst weten. Dan pas schrijven.',
    tekst:
      'Voordat er één zin staat, verzamelt Orbit alles wat er over je klant bekend is: van binnen en van buiten. Elk feit heeft een bron en een zekerheid. Een vermoeden blijft een vermoeden.',
    link: { label: 'Wat Orbit onderzoekt', href: '/ai' },
    beeld: {
      titel: 'Feiten en kennis van één bedrijf',
      tekst: 'Elk feit met zijn bron en hoe zeker het is. Je team ziet in één oogopslag wat er in een tekst mag.',
    },
    cellen: [
      { titel: 'Van binnen: wat je klant weet', tekst: 'De website, het kennismakingsgesprek, antwoorden op vragen en brochures. Orbit leest het en legt vast wat erin staat.' },
      { titel: 'Van buiten: wat de markt laat zien', tekst: 'Vakkennis, regels en concurrenten, opgezocht op het web en gecontroleerd op de bron.' },
      { titel: 'Een vermoeden blijft een vermoeden', tekst: 'Pas als iemand van je team het bevestigt, mag het in een tekst.' },
      { titel: 'Geen bewijs, geen feit', tekst: 'Zegt de AI iets op de website te zien, dan moet die zin daar ook echt letterlijk staan.' },
    ] as Bijschrift[],
  },
  vangnet: {
    id: 'vangnet',
    label: 'Vangnet',
    titel: 'Twijfel? Dan wordt het geel.',
    tekst:
      'Noemt een tekst een bedrag, termijn, garantie of keurmerk zonder bron, dan wordt die zin geel. Je keurt een pagina pas goed als elke gele zin is nagelopen. Zo komt er nooit ongemerkt een verzonnen belofte op de site van je klant.',
    link: { label: 'Zo werkt de goedkeuring', href: '/werkwijze' },
    beeld: {
      titel: 'Je ziet waarom een zin geel is',
      tekst: 'Onder elke gele zin staat wat er ontbreekt. Klopt het, dan bevestig je het met één klik. Anders vraag je het je klant.',
    },
    cellen: [
      { titel: 'Een getal moet in de bron staan', tekst: 'De schrijver geeft bij elke zin aan waarop die rust. Code controleert dat voor bedragen, getallen, termijnen, garanties en keurmerken.' },
      { titel: 'In de stem van je klant', tekst: 'Aanspreekvorm, toon en woorden die nooit mogen vallen liggen vast. Verboden woorden en namen van concurrenten houdt code er altijd uit.' },
      { titel: 'Een eindredacteur die niets mag toevoegen', tekst: 'Een tweede ronde verbetert alleen wat nodig is. Code weigert een correctie met een nieuwe bewering, en een die meer dan 60 procent van de tekst verandert.' },
      { titel: 'Goedkeuren kan pas als alles is nagelopen', tekst: 'Zolang er een gele zin openstaat, blijft Keur goed uitgeschakeld. Na een bewerking controleert Orbit de tekst opnieuw.' },
    ] as Bijschrift[],
  },
  bijblijven: {
    id: 'bijblijven',
    label: 'Bijblijven',
    titel: 'Een feitenbestand dat bijblijft.',
    tekst:
      'Bedrijven veranderen. Prijzen gaan omhoog, diensten stoppen, de website zegt het ene en de brochure het andere. Orbit ziet het en vraagt je om een besluit.',
    cellen: [
      { titel: 'Tegenstrijdigheden vallen op', tekst: 'Staat er op de ene plek 3 jaar garantie en op de andere 5, dan hoor je dat voordat het in een tekst staat.' },
      { titel: 'Oude feiten gaan niet stilletjes mee', tekst: 'Een prijs kan een einddatum krijgen. Daarna moet iemand hem opnieuw bevestigen.' },
    ] as Bijschrift[],
  },
  eerlijk: {
    id: 'eerlijk',
    label: 'Grenzen',
    titel: 'Wat Orbit controleert. En wat jij beslist.',
    tekst: 'Geen tool kan alles controleren. Daarom staat hier precies wat er wel gecontroleerd wordt, zodat je weet waar je op moet letten.',
    cellen: [
      { titel: 'Orbit controleert', tekst: 'In code, bij elke pagina. Het is meer dan een instructie aan het model.' },
      { titel: 'Jij beslist', tekst: 'Dit blijft bij jou en je team, ook als een pagina er verzorgd uitziet.' },
    ] as Bijschrift[],
  },
}

export const afsluiter = {
  title: 'Laat AI schrijven. Zonder je reputatie op het spel te zetten.',
  description: 'Bekijk in een demo hoe de feiten van een van je klanten eruitzien.',
}
