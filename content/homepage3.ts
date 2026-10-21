// Teksten van de derde testhomepage (/homepage3), in de opbouw van linear.app. Elke sectie begint bij wat
// het bureau ermee wint; de functies staan pas onder de knopjes met een plus. Elke bewering staat in de
// productdocumentatie of in de code van ORBIT ENGINE; getallen in de beelden zijn voorbeelddata.

export type Onderdeel = { naam: string; tekst: string }
export type Sectie = { id: string; titel: string; tekst: string; link?: { label: string; href: string }; onderdelen: Onderdeel[] }

export const hero = {
  title: ['Het complete GEO-pakket', 'voor marketingbureaus'],
  description: "Meet hoe vaak AI je klanten aanraadt, laat de pagina's schrijven die dat veranderen en bewijs wat het opleverde. Eén platform voor je hele GEO-dienst.",
  link: { label: 'Demo', titel: 'Plan 15 minuten met ons' },
}

export const kanalen = {
  onderschrift: 'Gemeten waar de klanten van je klanten nu zoeken',
  noot: 'Alle schermen op deze pagina zijn voorbeelden met verzonnen bedrijven.',
}

export const pakket = {
  sterk: 'Eén platform voor je hele GEO-dienst.',
  rest: "Van de eerste scan bij een prospect tot de pagina's van deze maand en het verslag waarmee je klant blijft. Orbit doet het zware werk, je bureau houdt de regie en de klantrelatie.",
  diensten: [
    { fig: 'FIG 0.1', naam: 'Scan en audit', ritme: 'Eenmalig', tekst: 'Win een nieuwe klant met zijn eigen cijfers, in de huisstijl van je bureau.', href: '#verkopen' },
    { fig: 'FIG 0.2', naam: 'GEO-content', ritme: 'Elke maand', tekst: "Een vast aantal pagina's per klant, geschreven en gecontroleerd door Orbit.", href: '#content' },
    { fig: 'FIG 0.3', naam: 'Monitoring en effect', ritme: 'Elke maand', tekst: 'Een cijfer met marge en het effect van elke pagina, maand na maand.', href: '#bewijzen' },
  ],
}

export const verkopen: Sectie = {
  id: 'verkopen',
  titel: 'Win klanten met hun eigen cijfers',
  tekst: 'Een prospect koopt GEO pas als hij ziet dat hij ontbreekt. Met Pitch meet je eenmalig hoe ChatGPT over hem praat en deel je de uitkomst op een pagina in de huisstijl van je bureau.',
  onderdelen: [
    { naam: 'Pitch in je huisstijl', tekst: 'Met het logo, de kleur en de contactgegevens van je bureau, en het letterlijke AI-antwoord als bewijs.' },
    { naam: 'Melding bij openen', tekst: 'Je krijgt een melding zodra de prospect de pitch voor het eerst opent. Dan weet je wanneer je belt.' },
    { naam: 'Van pitch naar klant', tekst: 'Gaat de prospect met je in zee, dan zet je de pitch met één knop om naar een klant.' },
    { naam: 'GEO-audit', tekst: 'De vervolgstap: zichtbaarheid, concurrentie, bronnen, techniek en een actieplan op volgorde van ernst, ook in je huisstijl.' },
  ],
}

export const content: Sectie = {
  id: 'content',
  titel: 'Van gemiste vraag naar geschreven pagina',
  tekst: "Orbit blijft niet bij advies: het schrijft de pagina's. Elke gemiste vraag wordt een pagina-idee in een plan voor twaalf maanden, en elke maand levert Orbit het aantal pagina's uit je contract, in de stem van het merk.",
  link: { label: 'Bekijk de werkwijze', href: '/werkwijze' },
  onderdelen: [
    { naam: "5 tot 50 pagina's per maand", tekst: 'Per klant precies het volume dat je hebt afgesproken. Jij bepaalt het tempo.' },
    { naam: 'Een brief per pagina', tekst: 'Wat er op de pagina moet, welke vragen de lezer heeft en wat concurrerende pagina\'s doen.' },
    { naam: 'Eindredactie', tekst: 'Na het schrijven loopt een eindredacteur de pagina na, en typische AI-tekens worden gerepareerd.' },
    { naam: 'Plakklaar voor elk CMS', tekst: 'Kopieer als HTML, Markdown of platte tekst, met metadata, veelgestelde vragen en gestructureerde gegevens.' },
  ],
}

export const contentCellen = [
  { titel: 'Nooit een verzonnen belofte', tekst: 'Bedragen, termijnen, garanties en keurmerken zonder bron worden geel. Goedkeuren kan pas als elke gele zin bevestigd is.' },
  { titel: 'Je klant levert aan via een link', tekst: 'Wat alleen de ondernemer weet, vraagt Orbit gericht. Hij antwoordt zonder account, ook op zijn telefoon.' },
]

export const tussenCta = 'Zie in 15 minuten hoe Orbit van meting tot geschreven pagina werkt.'

export const bewijzen: Sectie = {
  id: 'bewijzen',
  titel: 'Bewijs wat je werk oplevert',
  tekst: 'Een klant die ziet wat hij krijgt, blijft. Orbit meet elke pagina na 14 en 28 dagen opnieuw in AI, haalt de klikken uit Google Search Console en zet alles in een verslag met de naam van je bureau.',
  link: { label: 'Zo meet Orbit', href: '/werkwijze' },
  onderdelen: [
    { naam: 'Een marge bij elk cijfer', tekst: 'Vaste vragen langs de klantreis, vaker gemeten waar het zwaarst weegt. Je ziet of een verschil echt is.' },
    { naam: 'Hermeten na 14 en 28 dagen', tekst: 'Op precies de vragen waarvoor de pagina geschreven is, en Orbit kijkt of de pagina zelf als bron wordt aangehaald.' },
    { naam: "Alleen jouw pagina's tellen", tekst: "De opbrengst telt alleen de klikken van pagina's die Orbit schreef, elk vanaf zijn eigen publicatiedatum." },
    { naam: 'Je klant kijkt mee', tekst: 'Als kijker, alleen bij zijn eigen bedrijf. Het maandverslag sla je op als pdf.' },
  ],
}

export const schalen: Sectie = {
  id: 'schalen',
  titel: 'Gebouwd voor al je klanten tegelijk',
  tekst: 'Op het werkoverzicht zie je per klant wat er wacht en wat het kost, en start je de maand voor al je klanten in één keer. Het AI-gebruik loopt via de eigen sleutel van je bureau, tegen kostprijs.',
  link: { label: 'Zo werkt beheer', href: '/beheer' },
  onderdelen: [
    { naam: 'Eén omgeving voor je bureau', tekst: "Collega's als beheerder, klanten als kijker. Andere bureaus zien niets van jou." },
    { naam: 'Een maand in één klik', tekst: "Vink klanten aan en start de maand, de maandmeting of het aantal pagina's voor allemaal tegelijk." },
    { naam: 'Kosten vooraf', tekst: 'Bij elke betaalde knop staat wat het ongeveer kost en wat er van je maandlimiet over is.' },
    { naam: 'Een maandlimiet', tekst: 'Is hij bereikt, dan stopt al het betaalde werk, ook het automatische. Geen verrassing op de rekening.' },
  ],
}

// De indicatie komt uit docs/ORBIT_WAAROM.md (5.2): ongeveer $0,024 per vraag per meetronde
// (lib/prompt-mix.ts) en van een paar tientjes centen tot ongeveer een dollar per pagina.
export const kostenNoot = "Meten en tien pagina's kosten aan AI doorgaans een paar dollar per klant per maand. De app toont vooraf een schatting uit de geschiedenis van je eigen bureau."

export const vertrouwen = {
  kaarten: [
    { citaat: 'Geen cijfer zonder onzekerheidsmarge, en geen effect dat niet boven de meetruis uitkomt.', naam: 'Jan-Willem Koopman', rol: 'Maker van Orbit' },
    { citaat: 'Een pagina mag alleen beweren wat over het bedrijf vaststaat.', naam: 'De regel achter elke tekst', rol: 'In de code, niet in een belofte' },
  ],
  regel: { tekst: 'Orbit is gemaakt door Jan-Willem Koopman, tien jaar marketing data analist.', link: { label: 'Ons verhaal', href: '/over' } },
}

export const afsluiter = {
  title: ['Het complete GEO-pakket.', 'Klaar voor je eerste klant.'],
  start: ['Niets te installeren', 'Een uitnodiging per mail', 'Je eerste klant in ongeveer tien minuten onderzocht'],
}
