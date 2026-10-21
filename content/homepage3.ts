// Teksten van de derde testhomepage (/homepage3), in de opbouw van linear.app. Elke sectie begint bij wat
// het bureau ermee wint; de functies staan pas onder de knopjes met een plus. Elke bewering staat in de
// productdocumentatie of in de code van ORBIT ENGINE; getallen in de beelden zijn voorbeelddata.

export type Onderdeel = { naam: string; tekst: string }
export type Sectie = { id: string; titel: string; tekst: string; link?: { label: string; href: string }; onderdelen: Onderdeel[] }

export const hero = {
  title: ['Het complete GEO‑pakket', 'voor marketingbureaus'],
  description: "Meet hoe vaak ChatGPT, Gemini en Google je klanten aanraden, laat Orbit de pagina's schrijven die dat veranderen en laat elke maand zien wat er veranderde.",
  knop: 'Plan een gratis demo',
  link: { label: 'Zo werkt het', href: '#verkopen' },
}

export const kanalen = {
  label: 'Orbit meet in',
  namen: ['ChatGPT', 'Gemini', 'AI-overzicht van Google'],
  extra: 'en haalt de klikken uit Google Search Console',
}

export const pakket = {
  sterk: 'Eén platform voor je hele GEO-dienst.',
  rest: "Van de eerste scan bij een prospect tot de pagina's van deze maand en het verslag waarmee je klant blijft. Orbit doet het zware werk, je bureau houdt de regie en de klantrelatie.",
  diensten: [
    { naam: 'Scan en audit', ritme: 'Eenmalig', tekst: 'Win een nieuwe klant met zijn eigen cijfers, in de huisstijl van je bureau.', href: '#verkopen' },
    { naam: 'GEO-content', ritme: 'Elke maand', tekst: "Een vast aantal pagina's per klant, geschreven en gecontroleerd door Orbit.", href: '#content' },
    { naam: 'Monitoring en effect', ritme: 'Elke maand', tekst: 'Een cijfer met marge, en per pagina wat er na publicatie veranderde.', href: '#effect' },
  ],
}

export const verkopen: Sectie = {
  id: 'verkopen',
  titel: 'Win klanten met hun eigen cijfers',
  tekst: 'Een prospect koopt GEO pas als hij ziet dat hij ontbreekt. Met Pitch meet je eenmalig hoe ChatGPT over hem praat en deel je de uitkomst op een pagina in de huisstijl van je bureau. Zodra hij hem opent, weet jij dat het tijd is om te bellen.',
  onderdelen: [
    { naam: 'Pitch in je huisstijl', tekst: 'Met het logo, de kleur en de contactgegevens van je bureau, en het letterlijke antwoord van ChatGPT als bewijs.' },
    { naam: 'Melding bij openen', tekst: 'Je krijgt een melding zodra de prospect de pitch voor het eerst opent.' },
    { naam: 'Van pitch naar klant', tekst: 'Gaat de prospect met je in zee, dan zet je de pitch met één knop om naar een klant.' },
    { naam: 'GEO-audit', tekst: 'De vervolgstap: zichtbaarheid, concurrentie, bronnen, techniek en een actieplan op volgorde van ernst, ook in je huisstijl.' },
  ],
}

export const content: Sectie = {
  id: 'content',
  titel: 'Van gemiste vraag naar geschreven pagina',
  tekst: "Orbit blijft niet bij advies: het schrijft de pagina's. Elke gemiste vraag wordt een pagina-idee met het bewijs erbij, en elke maand levert Orbit het aantal pagina's uit je contract, in de stem van het merk en klaar om goed te keuren.",
  link: { label: 'Bekijk de werkwijze', href: '/werkwijze' },
  onderdelen: [
    { naam: "5 tot 50 pagina's per maand", tekst: 'Per klant precies het volume dat je hebt afgesproken. Jij bepaalt het tempo.' },
    { naam: 'Een brief per pagina', tekst: "Wat er op de pagina moet, welke vragen de lezer heeft en wat concurrerende pagina's doen." },
    { naam: 'Eindredactie', tekst: 'Na het schrijven loopt een eindredacteur de pagina na, en typische AI-tekens worden gerepareerd.' },
    { naam: 'Plakklaar voor elk CMS', tekst: 'Kopieer als HTML, Markdown of platte tekst, met metadata, veelgestelde vragen en gestructureerde gegevens.' },
  ],
}

export const contentCellen = [
  { titel: 'Precies het volume uit je contract', tekst: 'Het plan van de maand toont per pagina wie aan zet is: jij, je klant of Orbit.' },
  { titel: 'Je klant antwoordt via een link', tekst: 'Wat alleen de ondernemer weet, vraagt Orbit gericht. Zijn antwoord wordt de bron van de zin op de pagina.' },
]

export const effect: Sectie = {
  id: 'effect',
  titel: 'Laat zien wat er verandert',
  tekst: 'Orbit meet elke maand met dezelfde vragen, en elke pagina opnieuw na 14 en 28 dagen. Bij elk cijfer staat een marge, zodat je je klant eerlijk vertelt of een verschil groter is dan toeval.',
  link: { label: 'Zo meet Orbit', href: '/werkwijze' },
  onderdelen: [
    { naam: 'Een marge bij elk cijfer', tekst: 'Vaste vragen langs de klantreis, vaker gemeten waar het zwaarst weegt.' },
    { naam: 'Hermeten na 14 en 28 dagen', tekst: 'Op precies de vragen waarvoor de pagina geschreven is, en Orbit kijkt of de pagina zelf als bron wordt aangehaald.' },
    { naam: 'Klikken uit Search Console', tekst: "Per pagina vanaf zijn publicatiedatum. Alleen pagina's die Orbit schreef tellen mee." },
    { naam: 'Maandverslag met je naam', tekst: 'Per klant, met de naam van je bureau erop, af te drukken of op te slaan als pdf.' },
  ],
}

export const effectCijfer = {
  titel: 'Zichtbaarheid in AI',
  sub: 'Brouwer Kozijnen, kunststof kozijnen, juni tot november',
}

export const schalen: Sectie = {
  id: 'schalen',
  titel: 'Al je klanten, op volgorde van wat wacht',
  tekst: 'Het werkoverzicht zet bovenaan waar het langst iets op je bureau wacht, met per klant de zichtbaarheid en wat hij de laatste dertig dagen kostte. Zo weet je elke ochtend waar je begint.',
  link: { label: 'Zo werkt beheer', href: '/beheer' },
  onderdelen: [
    { naam: 'Een maand in één klik', tekst: "Vink klanten aan en start de maand, de maandmeting of het aantal pagina's voor allemaal tegelijk." },
    { naam: 'AI tegen kostprijs', tekst: 'Het AI-gebruik loopt via de eigen sleutel van je bureau, zonder opslag.' },
    { naam: 'Kosten vooraf', tekst: 'Bij elke betaalde knop staat wat het ongeveer kost en wat er van je maandlimiet over is.' },
    { naam: 'Eén omgeving voor je bureau', tekst: "Collega's als beheerder, klanten als kijker. Andere bureaus zien niets van jou." },
  ],
}

// De indicatie komt uit docs/ORBIT_WAAROM.md (5.2): ongeveer $0,024 per vraag per meetronde
// (lib/prompt-mix.ts) en van een paar tientjes centen tot ongeveer een dollar per pagina.
export const kostenNoot = "Meten en tien pagina's kosten aan AI doorgaans een paar dollar per klant per maand. De app toont vooraf een schatting uit de geschiedenis van je eigen bureau."

// Geen citaten of klantvalidatie: de spelregels die de app zelf handhaaft.
export const spelregels = {
  titel: 'Zo gaat Orbit met cijfers en teksten om',
  tekst: 'Wat je aan je klant laat zien, moet je kunnen uitleggen. Daarom zijn dit regels in de code, geen beloftes.',
  regels: [
    { naam: 'Elk cijfer met een marge', tekst: 'AI-antwoorden wisselen. Orbit meet de zwaarste vragen vaker en zegt wanneer een verschil binnen het toeval valt.' },
    { naam: 'Geen harde bewering zonder bron', tekst: 'Bedragen, termijnen, garanties en keurmerken zonder bron worden geel. Goedkeuren kan pas als ze bevestigd zijn.' },
    { naam: 'Elk antwoord terug te lezen', tekst: 'Elke AI-aanroep wordt met zijn volledige antwoord bewaard, zodat je kunt nagaan waar een cijfer vandaan komt.' },
    { naam: 'Jouw bureau blijft het gezicht', tekst: 'Pitch, audit en maandverslag dragen de naam van je bureau. Je klant ziet alleen zijn eigen bedrijf.' },
  ],
  maker: { tekst: 'Orbit is gemaakt door Jan-Willem Koopman, tien jaar marketing data analist.', link: { label: 'Ons verhaal', href: '/over' } },
}

export const afsluiter = {
  title: ['Het complete GEO‑pakket.', 'Klaar voor je eerste klant.'],
  tekst: 'In een demo van 15 of 45 minuten zie je hoe je bureau met Orbit pitcht, schrijft en laat zien wat er verandert.',
  start: ['Niets te installeren', 'Je bureau krijgt een uitnodiging per mail', 'Een nieuwe klant is in ongeveer tien minuten onderzocht'],
}

export const voorbeelddata = 'Voorbeelddata'
