// Het contentplan van Lindeman Warmte: pagina's, vragen aan het bedrijf en de voorbeeldtekst.
// Alles is verzonnen.

export const SITE = 'https://www.lindemanwarmte.example'

export type PaginaStatus = 'live' | 'nakijken' | 'goedgekeurd' | 'vragen' | 'schrijven' | 'gepland'

export interface Pagina {
  key: string
  titel: string
  cluster: 'hybride' | 'cv' | 'subsidie'
  maand: number // maand in het plan, 1 = juli 2026
  dag: string // publicatiedatum in het plan
  type: 'landing' | 'article' | 'gids' | 'faq' | 'comparison'
  paginaType: 'dienst' | 'informatief' | 'categorie'
  status: PaginaStatus
  live?: string // publicatiedatum
  pad: string
  waarom: string
}

// De voorbeeldpagina die door alle beelden loopt.
export const VOORBEELD = 'hybride-utrecht'

export const PAGINAS: Pagina[] = [
  { key: 'cv-onderhoud', titel: 'Cv-ketel onderhoud in Utrecht: wat het kost en wat je krijgt', cluster: 'cv', maand: 1, dag: '2026-07-21', type: 'landing', paginaType: 'dienst', status: 'live', live: '2026-07-21T10:12:00Z', pad: '/cv-ketel-onderhoud-utrecht', waarom: 'Prijsvragen over onderhoud worden vaak gesteld, en de site had nog geen pagina met de tarieven.' },
  { key: 'storingsdienst', titel: 'Storingsdienst cv-ketel in Utrecht en omgeving', cluster: 'cv', maand: 1, dag: '2026-07-28', type: 'landing', paginaType: 'dienst', status: 'live', live: '2026-07-28T09:40:00Z', pad: '/storingsdienst-cv-utrecht', waarom: 'Bij vragen over een snelle monteur noemen AI-assistenten drie concurrenten en Lindeman Warmte niet.' },
  { key: 'abonnement', titel: 'Onderhoudsabonnement voor je cv-ketel', cluster: 'cv', maand: 2, dag: '2026-08-14', type: 'article', paginaType: 'dienst', status: 'live', live: '2026-08-14T08:55:00Z', pad: '/onderhoudsabonnement', waarom: 'Het abonnement staat alleen in een pdf. Een eigen pagina maakt het vindbaar.' },
  { key: 'hybride-vs-elektrisch', titel: 'Hybride of volledig elektrische warmtepomp: wat past bij jouw huis?', cluster: 'hybride', maand: 2, dag: '2026-08-25', type: 'comparison', paginaType: 'informatief', status: 'live', live: '2026-08-25T11:02:00Z', pad: '/hybride-of-elektrische-warmtepomp', waarom: 'Een vergelijkingsvraag waar AI-assistenten vooral landelijke sites aanhalen.' },
  { key: VOORBEELD, titel: 'Hybride warmtepomp laten installeren in Utrecht', cluster: 'hybride', maand: 3, dag: '2026-09-03', type: 'landing', paginaType: 'dienst', status: 'live', live: '2026-09-03T09:30:00Z', pad: '/hybride-warmtepomp-utrecht', waarom: 'Bij de vraag welke installateur in Utrecht goed is in hybride warmtepompen, noemt ChatGPT drie andere bedrijven. Lindeman Warmte heeft nog geen pagina die deze vraag beantwoordt.' },
  { key: 'subsidie-aanvragen', titel: 'Subsidie voor een hybride warmtepomp aanvragen: zo werkt het', cluster: 'subsidie', maand: 3, dag: '2026-09-24', type: 'gids', paginaType: 'informatief', status: 'live', live: '2026-09-24T10:20:00Z', pad: '/warmtepomp-subsidie-aanvragen', waarom: 'Bijna elke subsidievraag eindigt bij een installateur die de aanvraag regelt. Daar ontbreekt Lindeman Warmte nog.' },
  { key: 'jaren-30', titel: 'Warmtepomp in een jaren-30-woning: waar let je op?', cluster: 'hybride', maand: 4, dag: '2026-10-15', type: 'article', paginaType: 'informatief', status: 'nakijken', pad: '/warmtepomp-jaren-30-woning', waarom: 'Veel klanten in Utrecht wonen in een jaren-30-woning. AI-assistenten geven daar nu algemene antwoorden zonder lokale installateur.' },
  { key: 'houten', titel: 'Hybride warmtepomp in Houten en Nieuwegein', cluster: 'hybride', maand: 4, dag: '2026-10-20', type: 'landing', paginaType: 'dienst', status: 'goedgekeurd', pad: '/hybride-warmtepomp-houten-nieuwegein', waarom: 'Vragen met een plaatsnaam buiten Utrecht leveren nog geen vermelding op.' },
  { key: 'kosten', titel: 'Wat kost een hybride warmtepomp in 2026?', cluster: 'hybride', maand: 4, dag: '2026-10-27', type: 'article', paginaType: 'informatief', status: 'vragen', pad: '/kosten-hybride-warmtepomp', waarom: 'De prijsvraag heeft het hoogste gewicht in het cluster en wordt nu beantwoord met cijfers van landelijke sites.' },
  { key: 'cv-vervangen', titel: 'Cv-ketel vervangen in Nieuwegein', cluster: 'cv', maand: 4, dag: '2026-10-30', type: 'landing', paginaType: 'dienst', status: 'schrijven', pad: '/cv-ketel-vervangen-nieuwegein', waarom: 'Vervangvragen met een plaatsnaam noemen nu vooral grote ketelmerken.' },
  { key: 'isde', titel: 'ISDE of energiebespaarlening: wat past bij jou?', cluster: 'subsidie', maand: 5, dag: '2026-11-05', type: 'comparison', paginaType: 'informatief', status: 'gepland', pad: '/isde-of-lening', waarom: 'Een vergelijkingsvraag die vaak gesteld wordt, zonder lokale aanbieder in het antwoord.' },
  { key: 'buitenunit', titel: 'Waar plaats je de buitenunit van een warmtepomp?', cluster: 'hybride', maand: 5, dag: '2026-11-12', type: 'article', paginaType: 'informatief', status: 'gepland', pad: '/buitenunit-warmtepomp', waarom: 'Een praktische vraag die klanten vóór de offerte stellen.' },
  { key: 'zeist', titel: 'Hybride warmtepomp laten installeren in Zeist', cluster: 'hybride', maand: 5, dag: '2026-11-19', type: 'landing', paginaType: 'dienst', status: 'gepland', pad: '/hybride-warmtepomp-zeist', waarom: 'Dezelfde vraag als in Utrecht, nu voor Zeist.' },
  { key: 'storingscodes', titel: 'Storingscodes van je cv-ketel uitgelegd', cluster: 'cv', maand: 5, dag: '2026-11-26', type: 'faq', paginaType: 'informatief', status: 'gepland', pad: '/storingscodes-cv-ketel', waarom: 'Veel gestelde vraag met een duidelijke vervolgstap naar de storingsdienst.' },
]

// De vragen bij de voorbeeldpagina, met het antwoord dat Pieter Lindeman gaf.
export const VRAGEN_VOORBEELD = [
  {
    key: 'duur',
    vraag: 'Hoe lang duurt het plaatsen van een hybride warmtepomp bij jullie, vanaf het eerste bezoek?',
    reden: 'Klanten willen weten hoeveel dagen ze zonder verwarming zitten. Een concrete duur maakt de pagina bruikbaar.',
    soort: 'praktisch', type: 'tekst_kort',
    antwoord: 'Eerst een opname bij de klant thuis met een warmteverliesberekening. De installatie zelf duurt één werkdag, met twee eigen monteurs.',
  },
  {
    key: 'prijs',
    vraag: 'Uit welke onderdelen bestaat jullie prijs voor een hybride warmtepomp?',
    reden: 'De vraag naar kosten heeft het hoogste gewicht. Zonder prijsopbouw blijft de pagina algemeen.',
    soort: 'aanvulling', type: 'tekst_lang',
    antwoord: 'Toestel, buitenunit, montage en het aansluiten op de bestaande ketel. De opname en de subsidieaanvraag zitten bij de prijs in.',
  },
  {
    key: 'planning',
    vraag: 'Hoe ver vooruit kunnen klanten in de regio Utrecht nu een installatie inplannen?',
    reden: 'Een wachttijd is een harde belofte. ORBIT ENGINE noemt hem alleen als jullie hem bevestigen.',
    soort: 'verificatie', type: 'tekst_kort',
    antwoord: null,
  },
  {
    key: 'garantie',
    vraag: 'Welke garantie geven jullie op de installatie, los van de fabrieksgarantie?',
    reden: 'Garantie is een vraag die AI-assistenten bij installateurs vaak noemen. Dit mag alleen op de pagina als het klopt.',
    soort: 'bewijs', type: 'tekst_kort',
    antwoord: 'Vijf jaar op het installatiewerk, naast de fabrieksgarantie van het toestel.',
  },
]

export const GELE_ZIN = 'Na je akkoord op de offerte plannen we de installatie meestal binnen twee weken in.'
export const GELE_REDEN = 'Een concrete termijn die nergens in het merkdossier staat en die het bedrijf nog niet heeft bevestigd.'

export const TEKST_VOORBEELD = `Een hybride warmtepomp verwarmt je huis grotendeels met buitenlucht en laat je cv-ketel alleen bijspringen als het echt koud is. Bij Lindeman Warmte begint dat altijd met een bezoek bij je thuis: we kijken naar je woning, je radiatoren en je verbruik, en maken een warmteverliesberekening. Pas daarna adviseren we welk toestel past.

## Hoe de installatie verloopt

De installatie zelf duurt bij ons één werkdag. Twee eigen monteurs plaatsen de buitenunit, sluiten de warmtepomp aan op je bestaande cv-ketel en stellen de thermostaat in. Je hoeft dus maar één dag rekening te houden met werk in huis.

${GELE_ZIN} Aan het eind van de dag lopen we samen door hoe het systeem werkt en wat je op de thermostaat ziet.

## Wat er in de prijs zit

Je krijgt één prijs voor het toestel, de buitenunit, de montage en het aansluiten op je ketel. De opname bij je thuis en de aanvraag van de ISDE-subsidie zitten daar al in, zodat je achteraf niet voor verrassingen staat.

## Voor welke woningen het werkt

Een hybride warmtepomp past goed in de meeste woningen in Utrecht en omgeving, van een tussenwoning in Lunetten tot een jaren-30-woning in Oog in Al. Is je huis matig geïsoleerd, dan vertellen we dat eerlijk en kijken we eerst naar isolatie.

## Garantie en service

Op het installatiewerk krijg je vijf jaar garantie, naast de fabrieksgarantie op het toestel. Combineer je de warmtepomp met een onderhoudsabonnement, dan komt een monteur één keer per jaar langs voor beide toestellen.

## Werkgebied

We installeren in Utrecht, Nieuwegein, Houten, Zeist, De Bilt en IJsselstein.`

export const FAQ_VOORBEELD = [
  { q: 'Kan ik mijn huidige cv-ketel houden?', a: 'Ja. Een hybride warmtepomp werkt samen met je bestaande ketel, zolang die nog in goede staat is. Dat controleren we tijdens de opname.' },
  { q: 'Regelen jullie de subsidie?', a: 'Ja, de aanvraag van de ISDE-subsidie zit in de prijs.' },
]
