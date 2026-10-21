// Teksten van de testhomepage (/homepage1). Elke bewering hier staat in de productdocumentatie of in de
// code van ORBIT ENGINE. Getallen in de beelden (components/homepage1) zijn voorbeelddata van verzonnen bedrijven.
import type { FaqItem } from '@/content/home'

export const hero = {
  title: ['Verkoop AI-zichtbaarheid', 'als vaste dienst van je bureau.'],
  description: "Orbit meet hoe vaak ChatGPT, Gemini en Google je klanten aanraden, schrijft de pagina's die dat veranderen en laat zien wat ze opleverden.",
  // De link rechts in de hero opent de demo-popup, net als de knop in de header.
  link: { label: 'Gratis demo', titel: 'Plan 15 minuten met ons' },
}

export const kanalen = {
  label: 'Orbit meet in',
  voorbeeld: 'Alle schermen op deze pagina zijn voorbeelden met verzonnen bedrijven.',
}

export const probleem = {
  titel: 'Je klant wordt aanbevolen. Of zijn concurrent.',
  tekst: 'De klanten van je klanten vragen ChatGPT welke installateur, advocaat of webshop ze moeten kiezen. Het antwoord noemt een handvol namen. Wie daar niet tussen staat, doet niet mee.',
  punten: [
    { titel: 'Er is geen pagina twee', tekst: 'Een AI-assistent geeft één antwoord met een paar namen. Niet genoemd is niet gezien.' },
    { titel: 'Onzichtbaar in je vertrouwde cijfers', tekst: 'Analytics en Search Console laten niet zien hoe vaak ChatGPT een merk aanraadt. Orbit wel.' },
    { titel: 'Je klanten vragen er al naar', tekst: '"Worden wij door ChatGPT aanbevolen?" Met Orbit geef je een onderbouwd antwoord, en een plan.' },
  ],
}

export type Dienst = { naam: string; ritme: 'Eenmalig' | 'Elke maand' | 'Doorlopend'; krijgt: string; onderdelen: string[] }

export const diensten = {
  titel: 'Eén app, een complete dienstenlijn',
  tekst: 'Orbit stopt niet bij een cijfer. Je bureau meet, adviseert, schrijft en bewijst, en verkoopt dat als los product of als vaste maandelijkse dienst.',
  lijst: [
    { naam: 'AI-zichtbaarheidsscan', ritme: 'Eenmalig', krijgt: 'Wie ChatGPT aanraadt in plaats van je prospect, met het letterlijke antwoord als bewijs.', onderdelen: ['Pitch'] },
    { naam: 'GEO-audit', ritme: 'Eenmalig', krijgt: 'Een rapport in de huisstijl van je bureau, met een actieplan op volgorde van ernst.', onderdelen: ['GEO-audit', 'Bronnen', 'Technische controle'] },
    { naam: 'AI-monitoring', ritme: 'Elke maand', krijgt: 'Een cijfer met marge, de trend, de concurrenten en een verslag om door te sturen.', onderdelen: ['Meten', 'Maandverslag'] },
    { naam: 'GEO-content', ritme: 'Elke maand', krijgt: "Een vast aantal nieuwe of verbeterde pagina's, gecontroleerd en klaar om te plaatsen.", onderdelen: ['Contentplan', 'Schrijven', 'Hermeten'] },
    { naam: 'Vermeldingen en digitale PR', ritme: 'Doorlopend', krijgt: 'Zichtbaar worden op de websites die AI leest en aanhaalt.', onderdelen: ['Bronnen', 'Vermeldingen'] },
    { naam: 'Merkbewaking', ritme: 'Doorlopend', krijgt: 'Zien wat AI verkeerd zegt over het bedrijf, en het laten herstellen.', onderdelen: ['Feitencontrole', 'Reputatie'] },
  ] satisfies Dienst[],
}

export const werkwijze = {
  titel: 'Eén kringloop, elke maand opnieuw',
  tekst: 'De meting voedt het plan, het plan voedt de teksten en de teksten worden weer gemeten. Per bedrijf zie je wat er deze maand gebeurde en wie aan zet is.',
  stappen: [
    { titel: 'Meten', tekst: 'Hoe vaak noemen ChatGPT, Gemini en het AI-overzicht van Google je klant? En wie wel?' },
    { titel: 'Plannen', tekst: 'Elke gemiste vraag wordt een pagina-idee met bewijs, in een contentplan voor twaalf maanden.' },
    { titel: 'Schrijven', tekst: 'Teksten in de stem van het merk, met een vangnet tegen verzonnen feiten.' },
    { titel: 'Publiceren', tekst: 'Plakklaar voor elk CMS. Orbit controleert of de pagina echt live staat.' },
    { titel: 'Hermeten', tekst: 'Na 14 en 28 dagen meet Orbit vanzelf opnieuw, in AI en in Google Search Console.' },
  ],
  start: {
    titel: 'Zo begin je met een nieuwe klant',
    stappen: [
      { tijd: '1 minuut', titel: 'Naam en website', tekst: 'Meer heeft Orbit niet nodig om te beginnen.' },
      { tijd: 'ongeveer 10 minuten', titel: 'Onderzoek', tekst: 'Orbit leest tot 1000 pagina\'s en onderzoekt aanbod, concurrenten en markt.' },
      { tijd: 'op de achtergrond', titel: 'Eerste meting', tekst: 'Een zichtbaarheidscijfer, een rapport en concrete pagina-ideeën.' },
    ],
  },
  cta: { titel: 'Zie de kringloop in een demo van 15 minuten.', link: { label: 'Bekijk de werkwijze', href: '/werkwijze' } },
}

export const meten = {
  titel: 'Een cijfer dat standhoudt bij een kritische klant',
  tekst: 'AI-antwoorden verschillen per keer. Wie één vraag stelt en een screenshot maakt, meet toeval. Orbit stelt elke maand dezelfde vragen langs de klantreis, meet de zwaarste vaker en zet bij elk cijfer een marge.',
  link: { label: 'Zo meet Orbit', href: '/werkwijze' },
  beeld: { titel: 'Je ziet of een verschil echt is', tekst: 'Rustige maanden worden samengevoegd, zodat het hoofdcijfer steeds zekerder wordt. Elk antwoord is terug te lezen.' },
}

export const schrijven = {
  titel: 'AI-teksten zonder risico voor je reputatie',
  tekst: 'Er komt nooit ongemerkt een verzonnen prijs, garantie of keurmerk op de site van je klant. Staat er geen bron voor een harde bewering, dan wordt de zin geel en kan de pagina pas worden goedgekeurd als die zin bevestigd is.',
  link: { label: 'Zo bewaakt Orbit de kwaliteit', href: '/kwaliteit' },
  beeld: { titel: 'Twijfel? Leg de zin aan je klant voor', tekst: 'Met Vraag het bedrijf gaat de zin met één klik naar je klant. Die antwoordt via een link, zonder account.' },
}

export const bewijzen = {
  titel: 'Laat zien wat je werk oplevert',
  tekst: "Orbit meet elke pagina na 14 en 28 dagen opnieuw, op precies de vragen waarvoor hij geschreven is, en haalt de klikken uit Google Search Console. Alleen pagina's die Orbit schreef tellen mee als opbrengst.",
  beeld: { titel: 'Een verslag met de naam van je bureau', tekst: 'Elke maand per klant: de zichtbaarheid met marge, welke pagina\'s live gingen en wat ze deden, en wat er volgende maand gepland staat.' },
}

export const oplevert = {
  titel: 'Wat het oplevert',
  tekst: 'Je bureau krijgt een dienst die het elke maand kan leveren. Je klant krijgt antwoord op een vraag die hij nu niet beantwoord krijgt.',
  bureau: {
    kop: 'Voor je bureau',
    punten: [
      'Een nieuwe, terugkerende dienst naast SEO en content',
      'Nieuwe klanten winnen met een pitch en een audit in je huisstijl',
      'Klanten die blijven, omdat ze per pagina zien wat het deed',
      'Meer content leveren zonder elke zin zelf na te lopen',
      'De kosten per klant en per maand in eigen hand',
    ],
  },
  klant: {
    kop: 'Voor je klant',
    punten: [
      'Weten of AI zijn bedrijf aanraadt, en wie in zijn plaats',
      "Pagina's in zijn eigen stem, zonder verzonnen beloftes",
      'Vragen beantwoorden wanneer het hem uitkomt, ook op zijn telefoon',
      'Meekijken bij zijn eigen bedrijf, met uitleg in gewone taal',
      'Elke maand een verslag van wat er gebeurde en wat het opleverde',
    ],
  },
}

export const pitch = {
  titel: 'Win nieuwe klanten met hun eigen cijfers',
  tekst: 'Leg het vak niet uit, laat het zien. Met Pitch meet je eenmalig hoe ChatGPT over een prospect praat en deel je de uitkomst op een pagina in de huisstijl van je bureau.',
  punten: [
    'Wie ChatGPT in plaats van de prospect aanraadt, met het letterlijke antwoord',
    'Een melding zodra de prospect de pitch opent',
    'Gaat hij met je in zee, dan wordt de pitch met één knop een klant',
  ],
  vervolg: 'De logische volgende stap is de GEO-audit: een compleet rapport met actieplan, ook in je huisstijl.',
}

export const bureau = {
  titel: 'Gebouwd voor bureaus, niet voor één merk',
  tekst: 'Al je klanten op één scherm, je collega\'s als beheerder en je klanten als kijker. Je bureau werkt in een eigen, afgeschermde omgeving: andere bureaus zien niets van jou.',
  link: { label: 'Zo werkt beheer', href: '/beheer' },
  beeld: { titel: 'In vijf seconden weet je waar aandacht nodig is', tekst: 'Per klant de zichtbaarheid en hoe die veranderde, wat er wacht en sinds wanneer, en wat de klant de laatste dertig dagen kostte.' },
  tegels: [
    { icoon: 'plan', titel: 'De maand voor al je klanten', tekst: "Vink klanten aan en start de maand, de maandmeting of het aantal pagina's in één keer." },
    { icoon: 'mensen', titel: 'Je klant kijkt mee', tekst: 'Als kijker, alleen bij zijn eigen bedrijf. Jij bepaalt wat hij verder mag.' },
    { icoon: 'link', titel: 'Antwoorden zonder account', tekst: 'Stuur een deellink. Je klant beantwoordt de openstaande vragen, ook op zijn telefoon.' },
    { icoon: 'ster', titel: 'Jouw naam vooraan', tekst: 'Uitnodigingen, verslagen en meldingen komen van je bureau via Orbit.' },
    { icoon: 'euro', titel: 'AI tegen kostprijs', tekst: 'Je gebruikt de eigen sleutel van je bureau bij OpenAI, zonder opslag op het AI-gebruik.' },
    { icoon: 'slot', titel: 'Een maandlimiet', tekst: 'Is hij bereikt, dan stopt al het betaalde werk, ook het automatische. Geen verrassing op de rekening.' },
    { icoon: 'zoek', titel: 'Vooraf weten wat iets kost', tekst: 'Bij elke betaalde knop staat wat het ongeveer kost en wat er van de limiet over is.' },
    { icoon: 'wereld', titel: 'Nederlands van begin tot eind', tekst: 'De app, de vragen aan AI, het onderzoek en de teksten.' },
  ],
  prijzen: { label: 'Bekijk de prijzen', href: '/prijzen' },
}

export const maker = {
  titel: 'Elk cijfer te verantwoorden',
  tekst: 'Orbit is gemaakt door Jan-Willem Koopman, tien jaar marketing data analist. Het werk draaide al die jaren om één vraag: wat levert marketing echt op, en hoe toon je dat eerlijk aan?',
  eerlijk: 'Je ziet op deze pagina geen klantlogo\'s of beoordelingen. Wel precies hoe Orbit werkt, zodat je het zelf kunt beoordelen.',
  link: { label: 'Lees ons verhaal', href: '/over' },
  principes: [
    { titel: 'Het oog van een analist', tekst: 'Geen cijfer zonder onzekerheidsmarge en geen effect dat niet boven de meetruis uitkomt.' },
    { titel: 'Het vak van marketing', tekst: 'Vragen langs de klantreis, weging naar commerciële waarde en teksten die moeten verkopen.' },
    { titel: 'De discipline van AI-engineering', tekst: 'Controles in code waar een model iets belooft, en elke AI-aanroep met zijn volledige antwoord bewaard.' },
  ],
}

// De bezwaren in de volgorde waarin ze opkomen: kan ik dit, heeft het zin, wat meet het, wat doet het,
// wanneer zie ik iets, wat kost het, is het veilig, wat moet ik doen.
export const faq: { title: string; items: FaqItem[] } = {
  title: 'Veelgestelde vragen',
  items: [
    {
      question: 'Moet mijn team verstand hebben van GEO?',
      answer: 'Nee. Orbit stelt de vragen op, meet, wijst de kansen aan en schrijft de pagina\'s. Je team beoordeelt en beslist. Achter elk vraagteken in de app staat wat je ziet en waarom het zo werkt.',
    },
    {
      question: 'Wat als mijn klant nu nergens genoemd wordt?',
      answer: 'Dan weet je precies waar je begint. Orbit laat zien wie wel genoemd wordt en bij welke vragen, en elke gemiste vraag wordt een pagina-idee met het bewijs erbij.',
    },
    {
      question: 'Welke AI-assistenten meet Orbit?',
      answer: 'ChatGPT, Gemini en het AI-overzicht van Google, elk met een eigen cijfer. ChatGPT is de basis; de andere twee zet je er per onderwerp bij.',
    },
    {
      question: "Zet Orbit zelf pagina's op de website van mijn klant?",
      answer: 'Nee. Orbit levert de pagina plakklaar aan, met titel, metabeschrijving, veelgestelde vragen en gestructureerde gegevens. Jij of je klant keurt goed en plaatst hem. Daarna controleert Orbit of hij echt live staat.',
    },
    {
      question: 'Hoe snel zie ik resultaat?',
      answer: 'Het onderzoek naar een nieuw bedrijf duurt ongeveer tien minuten. Daarna volgen de eerste meting, een rapport en pagina-ideeën op de achtergrond. Het effect van een gepubliceerde pagina meet Orbit na 14 en 28 dagen.',
    },
    {
      question: 'Wat kost het?',
      answer: 'Twee delen: het gebruik van Orbit, en het AI-gebruik op de eigen sleutel van je bureau, tegen kostprijs. Dat begrens je met een maandlimiet, en bij elke betaalde knop zie je vooraf wat het ongeveer kost.',
    },
    {
      question: 'Wie ziet de gegevens van mijn klanten?',
      answer: 'Alleen je bureau, en de klanten die je als kijker toegang geeft, ieder alleen tot zijn eigen bedrijf. Andere bureaus zien niets van je bureau.',
    },
    {
      question: 'Moet ik iets installeren?',
      answer: 'Nee. Orbit wordt gehost. Je bureau krijgt een uitnodiging per mail en begint met het invullen van zijn sleutel van OpenAI.',
    },
  ],
}

export const afsluiter = {
  title: 'Maak van AI-zichtbaarheid je volgende dienst.',
  description: 'In een demo van 15 of 45 minuten laten we zien hoe je bureau met Orbit meet, schrijft en bewijst.',
}
