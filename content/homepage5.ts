// Teksten van de vijfde testhomepage (/homepage5): vijftien visualisaties bij de grote behoeften van een
// marketingbureau en de USP's van Orbit, van belangrijk naar minder belangrijk. Namen en getallen in de
// beelden zijn voorbeelddata van verzonnen bedrijven.

export type Sectie = {
  id: string
  label: string
  titel: string
  tekst: string
  /** Wat er in het beeld staat, voor wie het niet ziet. */
  alt: string
}

export const hero = {
  titel: 'Orbit maakt van GEO een dienst die je kunt verkopen, uitvoeren en bewijzen',
  tekst: 'Je verkoopt strategie, websites, SEO en SEA, en alles draait om één vraag: wordt je klant gevonden? Steeds vaker gebeurt dat in een AI-assistent. Orbit geeft je bureau daar grip op.',
}

export const behoeften: Sectie[] = [
  {
    id: 'antwoord',
    label: 'Behoefte 1',
    titel: 'Een antwoord op "Hoe staan wij in ChatGPT?"',
    tekst: 'Je klanten lezen erover en vragen het jou. Zonder antwoord zoeken ze een specialist, en dan gaat de SEO-opdracht op termijn mee. Orbit geeft een cijfer per onderwerp, met een marge en het verloop over de maanden.',
    alt: 'Een klant vraagt: hoe staan wij in ChatGPT? Het antwoord: kunststof kozijnen 31 procent, plus of min 6, met een stijgende lijn van juni tot november.',
  },
  {
    id: 'dienst',
    label: 'Behoefte 2',
    titel: 'GEO als dienst die je kunt factureren',
    tekst: 'Een paar vragen in ChatGPT typen en screenshots maken is niet herhaalbaar en lastig te verkopen als retainer. Orbit maakt er een vaste maandcyclus van, met een maandverslag in je eigen huisstijl.',
    alt: 'Een cirkel met vijf stappen: meten, plannen, schrijven, publiceren en opnieuw meten. Ernaast het maandverslag van november van Bureau Kade.',
  },
  {
    id: 'effect',
    label: 'Behoefte 3',
    titel: 'Aantonen dat je werk effect heeft',
    tekst: 'Bij SEA en SEO laat je resultaat zien, bij AI-zichtbaarheid nog niet. Orbit meet elke pagina vóór publicatie en na 14 en 28 dagen opnieuw, op precies de vragen waarvoor hij geschreven is. Zo onderbouw je een verlenging met cijfers.',
    alt: 'Drie staven voor één pagina: vóór publicatie bij 1 van 8 vragen genoemd, na 14 dagen bij 3, na 28 dagen bij 5.',
  },
  {
    id: 'maken',
    label: 'Behoefte 4',
    titel: 'Weten wat je moet maken',
    tekst: '"Doe iets met GEO" is geen opdracht. Orbit laat per gemiste vraag zien welke pagina ontbreekt en zet die in een contentplan per maand. Het sluit aan op het content- en websitewerk dat je al doet.',
    alt: 'Drie gemiste vragen, elk met een pijl naar een pagina in het contentplan van november of december.',
  },
  {
    id: 'schaal',
    label: 'Behoefte 5',
    titel: 'Content op schaal, zonder verzonnen feiten',
    tekst: 'Een verkeerd bedrag of een keurmerk dat het bedrijf niet heeft, kost je je reputatie. In Orbit komen harde feiten alleen uit bevestigde kennis, controleert de code dat en gaat er niets live zonder goedkeuring van een mens.',
    alt: 'Een stapel pagina’s gaat door drie controles: bevestigde kennis, controle in code en goedkeuring door een mens. Daarna staat hij live.',
  },
  {
    id: 'pitch',
    label: 'Behoefte 6',
    titel: 'Nieuwe klanten binnenhalen',
    tekst: 'Met een pitch meet je een prospect eenmalig en deel je de uitkomst op een pagina in de huisstijl van je bureau. Het eerste gesprek begint dan met "je concurrent wordt genoemd en jij niet".',
    alt: 'Een pitchpagina van Bureau Kade: Kozijnwerk Noord wordt bij 7 van de 10 vragen genoemd, Brouwer Kozijnen bij geen enkele.',
  },
  {
    id: 'grip',
    label: 'Behoefte 7',
    titel: 'Grip op wat AI over je klant vertelt',
    tekst: 'De feitencontrole legt AI-antwoorden naast de bevestigde kennis en wijst fouten aan, zoals een oud adres. Bronnen en Vermeldingen laten zien welke websites AI aanhaalt en waar het bedrijf nog ontbreekt.',
    alt: 'ChatGPT noemt een oud adres, de bevestigde kennis een ander adres: de fout is gemarkeerd. Daaronder drie bronnen, op één staat het bedrijf nog niet.',
  },
  {
    id: 'klanten',
    label: 'Behoefte 8',
    titel: 'Al je klanten efficiënt bedienen',
    tekst: 'Het werkoverzicht toont al je merken met hun status. Je start een maand of een meting voor meerdere bedrijven tegelijk, en standaarden stel je één keer per bureau in. Zo wordt GEO rendabel in plaats van een tijdvreter.',
    alt: 'Een raster van acht merken met een status. Zes zijn geselecteerd, met een knop om de maand voor alle zes te starten.',
  },
  {
    id: 'samenwerken',
    label: 'Behoefte 9',
    titel: 'Samenwerken zonder extra overleg',
    tekst: 'Je klant kijkt mee en ziet alleen wat jij openzet. Openstaande vragen beantwoordt hij zelf, ook via een link zonder account. Dat scheelt mailverkeer, en de kennis komt op de juiste plek.',
    alt: 'Bureau Kade en de klant, verbonden door een lijn. Bij de klant staan drie rechten: meekijken en vragen beantwoorden staan aan, goedkeuren staat uit.',
  },
  {
    id: 'kosten',
    label: 'Behoefte 10',
    titel: 'Kosten in de hand',
    tekst: 'Je bureau gebruikt zijn eigen sleutels en stelt een maandlimiet in. Bij elke betaalde knop staat vooraf een schatting. Geen verrassingen op de rekening, en je kunt de kosten doorrekenen.',
    alt: 'Een knop Meting starten met de schatting ongeveer 1 euro, de eigen sleutel van het bureau en een maandlimiet van 150 euro waarvan 38 verbruikt.',
  },
]

export const gat: Sectie = {
  id: 'gat',
  label: 'Het gat',
  titel: 'Er was geen tool die de cirkel sluit',
  tekst: 'SEO-tools meten Google, analysetools meten bezoekers en schrijftools maken tekst. Geen ervan meet of een merk in AI-antwoorden voorkomt, zegt wat eraan te doen is, dat werk betrouwbaar uitvoert en het effect laat zien. Orbit doet dat, en is gebouwd voor bureaus.',
  alt: 'Drie losse cirkels voor SEO-tools, analysetools en schrijftools. In het midden, waar ze niet komen, staat Orbit.',
}

export const usps: Sectie[] = [
  {
    id: 'cirkel',
    label: 'USP 1',
    titel: 'Meten, maken en bewijzen in één cirkel',
    tekst: 'Geen losse meting en geen losse tekstgenerator, maar de hele cyclus tot en met het effect per pagina.',
    alt: 'Een gesloten cirkel in drie delen: meten, maken en bewijzen.',
  },
  {
    id: 'eerlijk',
    label: 'USP 2',
    titel: 'Eerlijke cijfers',
    tekst: 'Een zichtbaarheidscijfer met een marge, en een leeg vak als iets onbekend is in plaats van een gok.',
    alt: 'Drie vakken: ChatGPT 31 procent plus of min 6, Gemini 24 procent plus of min 7, en een leeg vak met het woord onbekend.',
  },
  {
    id: 'feiten',
    label: 'USP 3',
    titel: 'Feiten die kloppen',
    tekst: 'Bedragen, termijnen en keurmerken komen alleen uit bevestigde kennis, en de code controleert dat. Er gaat niets live zonder dat een mens het goedkeurt.',
    alt: 'Een zin met drie feiten, elk met een lijntje naar een bevestigde bron. Onderaan: goedgekeurd door een beheerder.',
  },
  {
    id: 'bureaus',
    label: 'USP 4',
    titel: 'Gemaakt voor bureaus',
    tekst: 'Al je merken in één overzicht, rapporten in je eigen huisstijl, klanten die meekijken, en je eigen sleutels met een maandlimiet.',
    alt: 'De omgeving van Bureau Kade met vier vakken: merken, rapport in huisstijl, klant kijkt mee, eigen sleutel met limiet.',
  },
]
