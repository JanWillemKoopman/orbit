// Teksten van de zesde testhomepage (/homepage6): tien rijke beelden, elk gebaseerd op een echt scherm van
// ORBIT ENGINE. Elke bewering staat in de productdocumentatie of in de code; namen en getallen in de beelden
// zijn voorbeelddata van verzonnen bedrijven.

export type Sectie = {
  id: string
  label: string
  titel: string
  tekst: string
  /** Wat er in het beeld staat, voor wie het niet ziet. */
  alt: string
}

export const hero = {
  titel: 'Worden je klanten aanbevolen door AI? Meet het, verbeter het, bewijs het.',
  tekst: "Orbit is de app waarmee je bureau AI-zichtbaarheid verkoopt als vaste maandelijkse dienst: meten hoe vaak ChatGPT, Gemini en Google een merk aanraden, de pagina's schrijven die daar verandering in brengen en laten zien wat het heeft opgeleverd.",
}

export const secties: Sectie[] = [
  {
    id: 'meten',
    label: 'Meten',
    titel: 'Een cijfer dat standhoudt bij een kritische klant',
    tekst: 'Dertig vaste vragen langs de klantreis, in ChatGPT, Gemini en het AI-overzicht van Google. Elk cijfer heeft een marge, en elk AI-antwoord lees je terug. Je verkoopt een meetmethode, geen screenshot.',
    alt: 'Het scherm Zichtbaarheid in AI van Brouwer Kozijnen: 31 procent met een marge van 6, een lijn van juni tot november en een cijfer per AI-assistent. Daarboven een AI-antwoord waarin Brouwer Kozijnen als tweede wordt genoemd.',
  },
  {
    id: 'begrijpen',
    label: 'Begrijpen',
    titel: 'Een volledig merkdossier uit naam en website',
    tekst: "Orbit leest tot 1000 pagina's en onderzoekt aanbod, concurrenten en markt in ongeveer tien minuten. Elke regel kennis heeft een bron, en de aanbodboom laat zien welke diensten nog geen eigen pagina hebben.",
    alt: 'Het bedrijfsprofiel van Brouwer Kozijnen met de aanbodboom: twee diensten zonder eigen pagina. Daarboven de checklist Dit bedrijf inrichten, met drie stappen afgevinkt.',
  },
  {
    id: 'plannen',
    label: 'Plannen',
    titel: 'Elke gemiste vraag wordt een pagina met bewijs',
    tekst: "Orbit vult een contentplan voor twaalf maanden met de sterkste kansen, in het volume uit je contract. Bij elke kans staat waarom: hoe vaak het merk genoemd werd, welke concurrenten wel, en wat er in Google aan hangt.",
    alt: 'Het contentplan met drie maandkolommen en pagina’s per maand. Daarboven een kans: kunststof kozijnen in Haarlem, bij 1 van 8 vragen genoemd, potentie 82 van 100.',
  },
  {
    id: 'schrijven',
    label: 'Schrijven',
    titel: 'AI-content zonder je reputatie op het spel te zetten',
    tekst: 'Elke pagina mag alleen beweren wat in de bevestigde kennis staat. Een garantie of bedrag zonder bron wordt geel, met de reden erbij, en goedkeuren kan pas als elke gele zin bevestigd is. Twijfel je, dan vraag je het bedrijf met één klik.',
    alt: 'Een geschreven dienstpagina over kunststof kozijnen. Eén zin over vijftien jaar garantie is geel, met de reden en de knoppen Bevestig en Vraag het bedrijf. De knop Keur goed is nog uit.',
  },
  {
    id: 'aanleveren',
    label: 'Samenwerken',
    titel: 'Je klant levert aan, zonder account',
    tekst: 'Wat alleen de ondernemer weet, vraagt Orbit gericht, hooguit acht vragen per pagina. Je stuurt een deellink en hij antwoordt op zijn telefoon. Zodra de laatste vraag binnen is, begint het schrijven vanzelf.',
    alt: 'Het scherm Openstaande vragen met de knop Deellink kopiëren. Daarvoor een telefoon met drie vragen voor Brouwer Kozijnen, waarvan één beantwoord.',
  },
  {
    id: 'bewijzen',
    label: 'Bewijzen',
    titel: 'Per pagina zien wat hij oplevert',
    tekst: 'Na 14 en 28 dagen meet Orbit vanzelf opnieuw, op precies de vragen waarvoor de pagina geschreven is. De bewijsladder en de klikken uit Search Console laten zien wat het werk deed. Alleen pagina’s van Orbit tellen mee.',
    alt: 'Het effect van de pagina over kunststof kozijnen: na 28 dagen bij 5 van 8 vragen genoemd, oordeel gestegen. Een grafiek met klikken uit Google die stijgt na de publicatiedag, en de bewijsladder met vier van zeven tredes bewezen.',
  },
  {
    id: 'verslag',
    label: 'Rapporteren',
    titel: 'Een maandverslag met de naam van je bureau',
    tekst: "Per klant de zichtbaarheid met marge, de pagina's die live gingen met hun effect, de nieuwe vermeldingen en wat er volgende maand gepland staat. Klaar om door te sturen of op te slaan als pdf.",
    alt: 'Het maandverslag van november van Bureau Kade voor Brouwer Kozijnen, met zichtbaarheid, pagina’s live en vermeldingen. Erachter de verslagen van eerdere maanden.',
  },
  {
    id: 'pitch',
    label: 'Verkopen',
    titel: 'Win nieuwe klanten met hun eigen cijfers',
    tekst: 'Met Pitch meet je een prospect eenmalig en deel je de uitkomst in de huisstijl van je bureau, met het letterlijke antwoord van ChatGPT als bewijs. Je krijgt een melding zodra de pitch geopend wordt.',
    alt: 'Een pitchpagina van Bureau Kade: wie ChatGPT wel aanraadt, met Kozijnwerk Noord bij 7 van de 10 vragen, en het letterlijke antwoord. Een melding zegt dat de pitch zojuist is geopend.',
  },
  {
    id: 'merkbewaking',
    label: 'Merkbewaking',
    titel: 'Zien wat AI verkeerd zegt, en het herstellen',
    tekst: 'De feitencontrole legt elk AI-antwoord naast wat Orbit weet en wijst een oud adres of een vergeten dienst aan. Met Bronnen en Vermeldingen werk je aan de websites die AI leest, met een conceptbericht dat klaarstaat.',
    alt: 'De feitencontrole: ChatGPT noemt een oud adres, de kennis van het bedrijf een ander. Daarboven de lijst Vermeldingen met drie websites en hun status, en een conceptbericht aan een redactie.',
  },
  {
    id: 'werkoverzicht',
    label: 'Schalen',
    titel: 'Al je klanten in één overzicht',
    tekst: 'Het werkoverzicht toont per bedrijf de zichtbaarheid, wat er wacht en sinds wanneer, en wat het de laatste dertig dagen kostte. Start de maand voor al je klanten tegelijk, met vooraf de kosten en wat er van je maandlimiet over is.',
    alt: 'Het werkoverzicht van Bureau Kade met zes bedrijven, hun zichtbaarheid, wat er wacht en de kosten. Daarboven het venster Start de maand met 45 pagina’s, ongeveer 32 euro en de resterende maandlimiet.',
  },
]
