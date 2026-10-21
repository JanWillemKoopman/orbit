// Teksten van de vierde testhomepage (/homepage4): twintig visualisaties, elk bij één functie van ORBIT ENGINE
// en wat een bureau daaraan heeft. Elke bewering staat in de productdocumentatie of in de code van ORBIT
// ENGINE; namen en getallen in de beelden zijn voorbeelddata van verzonnen bedrijven.

export type Fase = 'Meten' | 'Begrijpen' | 'Plannen' | 'Schrijven' | 'Bewijzen' | 'Schalen'

export type Visualisatie = {
  id: string
  fase: Fase
  titel: string
  tekst: string
  /** Wat er in het beeld staat, voor wie het niet ziet. */
  alt: string
}

export const hero = {
  titel: 'Twintig redenen in één oogopslag',
  tekst: 'Elk beeld laat één ding zien dat Orbit voor je bureau doet, van de eerste meting tot de maand voor al je klanten.',
}

export const visualisaties: Visualisatie[] = [
  {
    id: 'assistenten',
    fase: 'Meten',
    titel: 'Elke assistent een eigen cijfer',
    tekst: 'Je meet in ChatGPT, Gemini en het AI-overzicht van Google, elk apart. Zo zie je waar je klant goed scoort en waar hij nog ontbreekt.',
    alt: 'Drie balken: ChatGPT 31 procent, Gemini 24 procent, AI-overzicht 18 procent.',
  },
  {
    id: 'klantreis',
    fase: 'Meten',
    titel: 'Zichtbaar op het moment dat de koper kiest',
    tekst: 'Dertig vragen per onderwerp, verdeeld over oriëntatie, overweging en beslissing. Je ziet of het merk alleen in de uitlegfase meedoet of ook als er gekocht wordt.',
    alt: 'Drie kolommen van tien stippen. Bij oriëntatie zijn er zes gevuld, bij overweging vier en bij beslissing één.',
  },
  {
    id: 'marge',
    fase: 'Meten',
    titel: 'Een cijfer met marge',
    tekst: 'Elk cijfer krijgt een onzekerheidsmarge. Je ziet dus wanneer een stijging echt is en wanneer het toeval is, en dat houdt stand bij een kritische klant.',
    alt: 'Twee metingen met een marge: juni 12 procent en november 31 procent. De marges overlappen niet, het verschil is echt.',
  },
  {
    id: 'positie',
    fase: 'Meten',
    titel: 'Niet alleen óf, ook hoe',
    tekst: 'Als eerste aanbevolen, als een van meerdere of alleen zijdelings genoemd. Orbit laat zien op welke plek het merk in het antwoord staat.',
    alt: 'Een AI-antwoord met vier genoemde bedrijven. Brouwer Kozijnen staat op plek twee.',
  },
  {
    id: 'concurrenten',
    fase: 'Meten',
    titel: 'Een eerlijke vergelijking',
    tekst: 'Orbit deelt elk genoemd merk in: echte concurrent, vergelijkingssite, brancheorganisatie of het eigen merk in een andere schrijfwijze. Alleen echte concurrenten tellen mee.',
    alt: 'Vijf genoemde namen, ingedeeld in concurrent, vergelijkingssite, branche en eigen merk.',
  },
  {
    id: 'bronnen',
    fase: 'Meten',
    titel: 'Weten welke bronnen de AI gelooft',
    tekst: 'Na elke meting zie je welke websites en reviewsites de AI in deze markt aanhaalt. Een direct startpunt voor content, PR en vermeldingen.',
    alt: 'Vier bronnen met een balk voor hoe vaak ze worden aangehaald. De eigen site van het bedrijf staat onderaan.',
  },
  {
    id: 'kennistest',
    fase: 'Begrijpen',
    titel: 'Wat AI denkt te weten',
    tekst: 'De kennistest laat zien wat AI al over het merk weet en of dat klopt. Een zin als "ChatGPT denkt dat jullie in Eindhoven zitten" opent elk gesprek.',
    alt: 'Drie uitspraken van ChatGPT over het bedrijf. Twee kloppen, één niet: de vestiging staat in Haarlem, niet in Eindhoven.',
  },
  {
    id: 'dossier',
    fase: 'Begrijpen',
    titel: 'Een merkdossier uit alleen een adres',
    tekst: "Naam en website zijn genoeg. Orbit leest tot 1000 pagina's en onderzoekt aanbod, concurrenten en markt, terwijl jij iets anders doet.",
    alt: 'Een webadres waaruit vijf onderdelen van het dossier voortkomen: aanbod, concurrenten, markt, toon en kennis.',
  },
  {
    id: 'aanbod',
    fase: 'Begrijpen',
    titel: 'De snelste winst ligt in het aanbod',
    tekst: 'De aanbodboom toont elke dienst met de pagina waar hij gevonden is. Je ziet meteen welke diensten nog geen eigen pagina hebben.',
    alt: 'Een boom met zes diensten. Twee hebben nog geen eigen pagina en zijn gestippeld.',
  },
  {
    id: 'techniek',
    fase: 'Begrijpen',
    titel: 'Kan ChatGPT de site wel lezen?',
    tekst: 'Orbit kijkt of AI-crawlers worden tegengehouden, of er een llms.txt is, of de tekst zonder JavaScript leesbaar is en of de site in Bing staat. Bij elke maandmeting opnieuw.',
    alt: 'Een technische check met zes regels. Vijf zijn in orde, bij één wordt een AI-crawler tegengehouden.',
  },
  {
    id: 'kans',
    fase: 'Plannen',
    titel: 'Elke kans komt met bewijs',
    tekst: 'Elke gemiste vraag wordt een pagina-idee, met hoe vaak het merk genoemd werd en welke concurrenten wel. Daarmee overtuig je je klant zonder discussie.',
    alt: 'Een pagina-idee over kunststof kozijnen: bij 1 van 8 vragen genoemd, drie concurrenten wel.',
  },
  {
    id: 'jaarplan',
    fase: 'Plannen',
    titel: 'Een jaarplan in één klik',
    tekst: "Orbit vult twaalf maanden met de sterkste kansen, in het volume uit je contract: 5 tot 50 pagina's per maand. Elke maand heeft een reservepagina.",
    alt: "Een raster van twaalf maanden met per maand tien pagina's en één reservepagina.",
  },
  {
    id: 'gele-zin',
    fase: 'Schrijven',
    titel: 'Nooit een verzonnen garantie',
    tekst: 'Bedragen, termijnen, garanties en keurmerken worden in code nagelopen. Zonder bron wordt de zin geel, en goedkeuren kan pas als elke gele zin bevestigd is.',
    alt: 'Een tekst van vijf regels. De zin over vijftien jaar garantie is geel gemarkeerd omdat er geen bron voor is.',
  },
  {
    id: 'deellink',
    fase: 'Schrijven',
    titel: 'Je klant levert aan zonder account',
    tekst: 'Wat alleen de ondernemer weet, vraagt Orbit gericht, hooguit acht vragen per pagina. Hij beantwoordt ze via een link op zijn telefoon.',
    alt: 'Een telefoon met drie vragen voor Brouwer Kozijnen. Eén is beantwoord.',
  },
  {
    id: 'plakklaar',
    fase: 'Schrijven',
    titel: 'Plakklaar voor elk CMS',
    tekst: 'Kopieer de tekst als HTML, platte tekst of Markdown, en titel, omschrijving, veelgestelde vragen en gestructureerde gegevens los.',
    alt: 'Een pagina met tabbladen HTML, Tekst en Markdown, en losse onderdelen om te kopiëren.',
  },
  {
    id: 'hermeten',
    fase: 'Bewijzen',
    titel: 'Hermeten na 14 en 28 dagen',
    tekst: 'Staat een pagina live, dan meet Orbit vanzelf opnieuw op precies de vragen waarvoor hij geschreven is. Jij hoeft niets te doen.',
    alt: 'Een tijdlijn: bij publicatie 1 van 8 vragen genoemd, na 14 dagen 3, na 28 dagen 5.',
  },
  {
    id: 'ladder',
    fase: 'Bewijzen',
    titel: 'De bewijsladder per pagina',
    tekst: 'Zeven tredes, van gepubliceerd tot omzet. Je klant ziet stap voor stap wat zijn pagina doet, en waar het bewijs nog ontbreekt.',
    alt: 'Een trap van zeven tredes. De eerste vier zijn bewezen, de laatste drie nog niet.',
  },
  {
    id: 'zoekverkeer',
    fase: 'Bewijzen',
    titel: 'Opbrengst die echt van jou is',
    tekst: "Uit Search Console komen per pagina de klikken, met een markering op de publicatiedag. Alleen pagina's die Orbit schreef tellen mee.",
    alt: 'Een lijn met klikken per dag die na de publicatiedag stijgt.',
  },
  {
    id: 'maand',
    fase: 'Schalen',
    titel: 'De maand voor al je klanten in één klik',
    tekst: "Vink klanten aan en start de maand voor allemaal tegelijk. Vooraf zie je hoeveel pagina's het samen zijn en ongeveer wat het kost.",
    alt: "Een lijst van zes klanten, vijf aangevinkt, met samen 50 pagina's en een knop Start de maand.",
  },
  {
    id: 'kosten',
    fase: 'Schalen',
    titel: 'Je marge blijft van jou',
    tekst: 'Onbeperkt klanten en AI tegen kostprijs, op de eigen sleutels van je bureau. Met een maandlimiet kom je nooit voor een verrassing te staan.',
    alt: 'Een maandlimiet als balk: 38 van de 150 euro verbruikt.',
  },
]
