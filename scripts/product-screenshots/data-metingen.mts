// De AI-vragen per cluster van Lindeman Warmte, met de bedrijven die in de antwoorden voorkomen.
// Alle namen en domeinen zijn verzonnen.

export type Fase = 'Oriëntatie' | 'Overweging' | 'Beslissing'
export interface Vraag { tekst: string; fase: Fase; gewicht: number }

export const CONCURRENTEN = [
  'Warmtewerk Utrecht',
  'Domstad Installaties',
  'KlimaatPro',
  'Van Dijk Installatietechniek',
  'Vechtstreek Klimaat',
  'Hollandse Warmte',
]

export const BRONNEN = [
  'warmtepompweb.example',
  'vakmanvinden.example',
  'duurzaamwonen.example',
  'verbouwgids.example',
  'energieloket-utrecht.example',
]

export const CLUSTERS = [
  {
    key: 'hybride',
    naam: 'Hybride warmtepomp',
    topic: 'Hybride warmtepompen laten installeren in Utrecht en omgeving',
    // Zichtbaarheid per meetronde, in procenten van het aantal vragen. Rustige groei.
    reeks: [17, 20, 23, 30, 33],
    vragen: [
      { tekst: 'Welke installateur in Utrecht is goed in hybride warmtepompen?', fase: 'Beslissing', gewicht: 0.62 },
      { tekst: 'Wat kost een hybride warmtepomp inclusief installatie?', fase: 'Overweging', gewicht: 0.55 },
      { tekst: 'Is een hybride warmtepomp geschikt voor een jaren-30-woning?', fase: 'Overweging', gewicht: 0.41 },
      { tekst: 'Hoe lang duurt het installeren van een hybride warmtepomp?', fase: 'Overweging', gewicht: 0.36 },
      { tekst: 'Wat is het verschil tussen een hybride en een volledig elektrische warmtepomp?', fase: 'Oriëntatie', gewicht: 0.38 },
      { tekst: 'Hoeveel gas bespaar je met een hybride warmtepomp?', fase: 'Oriëntatie', gewicht: 0.33 },
      { tekst: 'Kan ik mijn huidige cv-ketel houden met een hybride warmtepomp?', fase: 'Oriëntatie', gewicht: 0.31 },
      { tekst: 'Welke hybride warmtepomp is het stilst voor een rijtjeshuis?', fase: 'Overweging', gewicht: 0.29 },
      { tekst: 'Hybride warmtepomp laten plaatsen in Nieuwegein of Houten, wie doet dat?', fase: 'Beslissing', gewicht: 0.48 },
      { tekst: 'Wat moet ik regelen voordat een hybride warmtepomp geplaatst wordt?', fase: 'Overweging', gewicht: 0.27 },
      { tekst: 'Hoe vind ik een betrouwbare warmtepompinstallateur in de regio Utrecht?', fase: 'Beslissing', gewicht: 0.52 },
      { tekst: 'Is een hybride warmtepomp nog verstandig met de huidige energieprijzen?', fase: 'Oriëntatie', gewicht: 0.34 },
      { tekst: 'Welke merken hybride warmtepomp raden installateurs aan?', fase: 'Overweging', gewicht: 0.32 },
      { tekst: 'Hoe groot moet een hybride warmtepomp zijn voor een tussenwoning?', fase: 'Overweging', gewicht: 0.26 },
      { tekst: 'Wat zijn de nadelen van een hybride warmtepomp?', fase: 'Oriëntatie', gewicht: 0.3 },
      { tekst: 'Hoe werkt een hybride warmtepomp samen met een thermostaat?', fase: 'Oriëntatie', gewicht: 0.22 },
      { tekst: 'Installateur gezocht voor hybride warmtepomp in Zeist', fase: 'Beslissing', gewicht: 0.45 },
      { tekst: 'Wat gebeurt er bij een storing aan een hybride warmtepomp?', fase: 'Oriëntatie', gewicht: 0.24 },
      { tekst: 'Heb ik vloerverwarming nodig voor een hybride warmtepomp?', fase: 'Oriëntatie', gewicht: 0.29 },
      { tekst: 'Wat is een goede prijs voor onderhoud aan een hybride warmtepomp?', fase: 'Overweging', gewicht: 0.27 },
      { tekst: 'Welke installateurs in Utrecht geven garantie op een hybride warmtepomp?', fase: 'Beslissing', gewicht: 0.47 },
      { tekst: 'Hoe snel verdien ik een hybride warmtepomp terug?', fase: 'Overweging', gewicht: 0.37 },
      { tekst: 'Kan een hybride warmtepomp ook koelen in de zomer?', fase: 'Oriëntatie', gewicht: 0.21 },
      { tekst: 'Waar plaats je de buitenunit van een hybride warmtepomp?', fase: 'Overweging', gewicht: 0.23 },
      { tekst: 'Hybride warmtepomp met zonnepanelen combineren, hoe pak ik dat aan?', fase: 'Overweging', gewicht: 0.28 },
      { tekst: 'Welk bedrijf in De Bilt installeert hybride warmtepompen?', fase: 'Beslissing', gewicht: 0.4 },
      { tekst: 'Heb ik een vergunning nodig voor een warmtepomp in Utrecht?', fase: 'Oriëntatie', gewicht: 0.25 },
      { tekst: 'Hoeveel stroom verbruikt een hybride warmtepomp per jaar?', fase: 'Oriëntatie', gewicht: 0.26 },
      { tekst: 'Wat is beter voor mijn huis: isoleren of eerst een hybride warmtepomp?', fase: 'Oriëntatie', gewicht: 0.3 },
      { tekst: 'Snel een hybride warmtepomp laten installeren, wie heeft er plek?', fase: 'Beslissing', gewicht: 0.43 },
    ] as Vraag[],
  },
  {
    key: 'cv',
    naam: 'Cv-ketel onderhoud en storing',
    topic: 'Onderhoud en storingsdienst voor cv-ketels in Utrecht',
    reeks: [42, 42, 46, 46, 50],
    vragen: [
      { tekst: 'Hoe vaak moet een cv-ketel onderhouden worden?', fase: 'Oriëntatie', gewicht: 0.3 },
      { tekst: 'Wat kost een onderhoudsbeurt voor een cv-ketel in Utrecht?', fase: 'Overweging', gewicht: 0.48 },
      { tekst: 'Welk bedrijf in Utrecht heeft een snelle storingsdienst voor cv-ketels?', fase: 'Beslissing', gewicht: 0.58 },
      { tekst: 'Mijn cv-ketel geeft een storingscode, wat nu?', fase: 'Oriëntatie', gewicht: 0.33 },
      { tekst: 'Is een onderhoudscontract voor de cv-ketel de moeite waard?', fase: 'Overweging', gewicht: 0.4 },
      { tekst: 'Cv-ketel vervangen of repareren na twaalf jaar?', fase: 'Overweging', gewicht: 0.39 },
      { tekst: 'Wie doet cv-onderhoud in Nieuwegein?', fase: 'Beslissing', gewicht: 0.44 },
      { tekst: 'Hoe ontlucht ik mijn radiatoren?', fase: 'Oriëntatie', gewicht: 0.18 },
      { tekst: 'Wat zit er in een onderhoudsabonnement voor een cv-ketel?', fase: 'Overweging', gewicht: 0.34 },
      { tekst: 'Betrouwbare cv-monteur in Utrecht-Oost gezocht', fase: 'Beslissing', gewicht: 0.47 },
      { tekst: 'Waarom valt de druk van mijn cv-ketel steeds weg?', fase: 'Oriëntatie', gewicht: 0.25 },
      { tekst: 'Hoe snel kan een monteur komen bij een kapotte cv-ketel?', fase: 'Beslissing', gewicht: 0.45 },
      { tekst: 'Wat kost een nieuwe cv-ketel inclusief montage?', fase: 'Overweging', gewicht: 0.42 },
      { tekst: 'Welke cv-installateur in Houten heeft goede reviews?', fase: 'Beslissing', gewicht: 0.43 },
      { tekst: 'Moet ik mijn cv-ketel laten keuren voor de winter?', fase: 'Oriëntatie', gewicht: 0.22 },
      { tekst: 'Hoe lang gaat een cv-ketel gemiddeld mee?', fase: 'Oriëntatie', gewicht: 0.24 },
      { tekst: 'Cv-ketel maakt een tikkend geluid, is dat gevaarlijk?', fase: 'Oriëntatie', gewicht: 0.2 },
      { tekst: 'Storingsdienst cv in het weekend in de regio Utrecht', fase: 'Beslissing', gewicht: 0.5 },
      { tekst: 'Wat is het verschil tussen een HR-ketel en een combiketel?', fase: 'Oriëntatie', gewicht: 0.19 },
      { tekst: 'Welke cv-ketel past bij een kleine bovenwoning?', fase: 'Overweging', gewicht: 0.27 },
      { tekst: 'Hoeveel kost een koolmonoxidemelder plaatsen bij de cv?', fase: 'Overweging', gewicht: 0.2 },
      { tekst: 'Cv-onderhoud combineren met een warmtepompcheck, kan dat?', fase: 'Overweging', gewicht: 0.31 },
      { tekst: 'Wie vervangt binnen een week een cv-ketel in Zeist?', fase: 'Beslissing', gewicht: 0.41 },
      { tekst: 'Wat moet een monteur controleren bij cv-onderhoud?', fase: 'Oriëntatie', gewicht: 0.23 },
    ] as Vraag[],
  },
  {
    key: 'subsidie',
    naam: 'Warmtepomp en subsidie',
    topic: 'Subsidie en financiering bij een warmtepomp',
    reeks: [10, 15, 15, 20, 20],
    vragen: [
      { tekst: 'Hoeveel subsidie krijg ik voor een hybride warmtepomp?', fase: 'Oriëntatie', gewicht: 0.46 },
      { tekst: 'Hoe vraag ik ISDE-subsidie aan voor een warmtepomp?', fase: 'Oriëntatie', gewicht: 0.42 },
      { tekst: 'Helpt de installateur bij het aanvragen van warmtepompsubsidie?', fase: 'Beslissing', gewicht: 0.44 },
      { tekst: 'Kan ik een warmtepomp financieren met een duurzaamheidslening in Utrecht?', fase: 'Overweging', gewicht: 0.36 },
      { tekst: 'Krijg ik subsidie als de warmtepomp al geplaatst is?', fase: 'Oriëntatie', gewicht: 0.3 },
      { tekst: 'Welke warmtepompen staan op de subsidielijst?', fase: 'Overweging', gewicht: 0.33 },
      { tekst: 'Wat kost een warmtepomp na aftrek van subsidie?', fase: 'Overweging', gewicht: 0.45 },
      { tekst: 'Is er gemeentelijke subsidie voor verduurzamen in Utrecht?', fase: 'Oriëntatie', gewicht: 0.32 },
      { tekst: 'Welke installateur regelt de subsidieaanvraag voor mij?', fase: 'Beslissing', gewicht: 0.47 },
      { tekst: 'Hoe lang duurt het voordat warmtepompsubsidie wordt uitbetaald?', fase: 'Oriëntatie', gewicht: 0.26 },
      { tekst: 'Subsidie voor isolatie en warmtepomp tegelijk aanvragen', fase: 'Overweging', gewicht: 0.31 },
      { tekst: 'Welke papieren heb ik nodig voor warmtepompsubsidie?', fase: 'Oriëntatie', gewicht: 0.24 },
      { tekst: 'Is een warmtepomp aftrekbaar of fiscaal voordelig?', fase: 'Oriëntatie', gewicht: 0.21 },
      { tekst: 'Wat is het verschil tussen ISDE en een energiebespaarlening?', fase: 'Oriëntatie', gewicht: 0.23 },
      { tekst: 'Installateur in Utrecht die helpt met subsidie en offerte', fase: 'Beslissing', gewicht: 0.43 },
      { tekst: 'Geldt de warmtepompsubsidie ook voor huurwoningen?', fase: 'Oriëntatie', gewicht: 0.2 },
      { tekst: 'Krijg ik meer subsidie als ik ook isoleer?', fase: 'Oriëntatie', gewicht: 0.27 },
      { tekst: 'Hoeveel subsidie voor een volledig elektrische warmtepomp?', fase: 'Oriëntatie', gewicht: 0.35 },
      { tekst: 'Wanneer moet ik warmtepompsubsidie aanvragen, voor of na installatie?', fase: 'Oriëntatie', gewicht: 0.29 },
      { tekst: 'Wat als mijn subsidieaanvraag wordt afgewezen?', fase: 'Oriëntatie', gewicht: 0.19 },
    ] as Vraag[],
  },
] as const

// De meetrondes: de nulmeting en daarna elke maand.
export const RONDES = ['2026-06-03T07:12:00Z', '2026-07-01T06:20:00Z', '2026-08-03T06:18:00Z', '2026-09-01T06:21:00Z', '2026-10-01T06:19:00Z']

// Het antwoord bij de commerciële vraag die het voorbeeld draagt (beeld 3).
export const HOOFDANTWOORD = `Voor een hybride warmtepomp in Utrecht zijn dit installateurs die vaak worden aanbevolen:

1. Warmtewerk Utrecht is gespecialiseerd in hybride systemen voor bestaande woningen en geeft vooraf een warmteverliesberekening. Klanten noemen de duidelijke offertes.
2. Domstad Installaties plaatst hybride warmtepompen in Utrecht, Nieuwegein en Houten en verzorgt ook de subsidieaanvraag.
3. KlimaatPro heeft een vast installatieteam voor de regio Midden-Nederland en biedt onderhoudscontracten aan.

Vraag bij elke installateur naar een berekening van het warmteverlies, de plek van de buitenunit en de garantie op het toestel én de installatie. Vergelijk ten minste twee offertes.`

const NAMEN_PER_VRAAG = [
  ['Warmtewerk Utrecht', 'Domstad Installaties', 'KlimaatPro'],
  ['Domstad Installaties', 'Van Dijk Installatietechniek', 'Warmtewerk Utrecht'],
  ['KlimaatPro', 'Hollandse Warmte', 'Vechtstreek Klimaat'],
  ['Van Dijk Installatietechniek', 'Warmtewerk Utrecht'],
]

/** Een kort, consistent antwoord voor de overige vragen. */
export function antwoordVoor(vraag: string, i: number, eigenGenoemd: boolean): { tekst: string; namen: string[]; bronnen: string[] } {
  const namen = [...NAMEN_PER_VRAAG[i % NAMEN_PER_VRAAG.length]]
  if (eigenGenoemd) namen.splice(i % 2 === 0 ? 1 : 2, 0, 'Lindeman Warmte')
  const bronnen = [BRONNEN[i % BRONNEN.length], BRONNEN[(i + 2) % BRONNEN.length]]
  const regels = namen.map((n, k) => `${k + 1}. ${n}${k === 0 ? ' wordt in vergelijkingen het vaakst genoemd voor deze vraag.' : n === 'Lindeman Warmte' ? ' is een installateur uit de regio Utrecht met eigen monteurs en een vaste planning per wijk.' : ' werkt in de regio Utrecht en geeft vooraf een advies op maat.'}`)
  const tekst = `Op de vraag "${vraag}" komen deze aanbieders naar voren:\n\n${regels.join('\n')}\n\nVergelijk altijd meerdere offertes en vraag naar garantie en planning.`
  return { tekst, namen, bronnen }
}
