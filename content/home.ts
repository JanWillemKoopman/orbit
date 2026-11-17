// Teksten van de homepage (/). Alles hieronder mag je vrij aanpassen; de opmaak volgt vanzelf.
import type { MaandStap } from '@/components/product/Visuals'

export const hero = {
  title: ['Schrijf meer content voor je klanten.', 'Werk aan hun vindbaarheid in AI\u00a0en\u00a0Google.'],
  description: 'Meten, plannen en schrijven in één platform voor marketingbureaus.',
  // Regel onder de knoppen: het eerste woord in het wit, de rest in grijs.
  link: { label: 'Bekijk', titel: 'hoe Orbit werkt', href: '/werkwijze' },
}

// Citaat onder de twee beelden, boven de drie nagebouwde schermen. De tekst staat tussen aanhalingstekens
// en licht woord voor woord op tijdens het scrollen. Daaronder de naam en functie van wie het zegt, met een
// rond portret. Zet `foto` op het pad van de foto in /public (bijvoorbeeld '/images/jan-willem-koopman.jpg');
// zolang dat leeg is, staan de initialen in de cirkel.
export const statement = {
  citaat: 'Ik bouw Orbit om bureaus te helpen meer voor hun klanten te doen. Onderzoek en schrijven kosten veel tijd. Een groot deel daarvan kan AI overnemen. Zo houd je als marketeer meer tijd over om met je klant mee te denken.',
  naam: 'Jan-Willem Koopman',
  functie: 'oprichter van Orbit',
  foto: '',
}

// Twee beelden direct onder het blok voor bureaus, elk met een titel, een korte uitleg en een link. Links het
// account van het bureau (/beheer), rechts de maand van één klant van meten tot hermeten (/werkwijze).
// De links wijzen direct naar de pagina en niet naar de oude adressen /agency en /product, die alleen
// nog doorsturen.
export type Uitgelicht = { titel: string; tekst: string; link: string; href: string; alt: string }

export const uitgelicht: Uitgelicht[] = [
  {
    titel: 'Al je klanten in één overzicht',
    tekst: 'Zie welke teksten klaarstaan, waar antwoorden ontbreken en wat je team moet oppakken. Voor al je klanten bij elkaar.',
    link: 'Bekijk het klantenoverzicht',
    href: '/werkwijze',
    alt: 'Het werkoverzicht van Bureau Noordwind: bedrijven onder elkaar met hun zichtbaarheid in AI, de maandmeting en wat er klaarstaat om te starten.',
  },
  {
    titel: 'Van eerste meting tot nieuwe content.',
    tekst: 'Orbit meet waar je klant wordt genoemd en stelt pagina\u2019s voor over gemiste onderwerpen. Die komen in een contentplan. Orbit schrijft de teksten, jij publiceert ze en daarna volgt een nieuwe meting.',
    link: 'Bekijk de werkwijze',
    href: '/werkwijze',
    alt: "De maand van een klant: meten is klaar, twintig pagina's zijn gepland, elf zijn geschreven en zeven gepubliceerd. Hermeten volgt. Er wachten twee vragen op de klant.",
  },
]

// De stappen in het rechterbeeld: hoe ver de maand van de klant is. Publiceren loopt al terwijl er
// nog geschreven wordt, daarom staan beide stappen op 'now'.
export const uitgelichtStappen: MaandStap[] = [
  { l: 'Meten', s: '1 okt', st: 'done' },
  { l: 'Plannen', s: "20 pagina's", st: 'done' },
  { l: 'Schrijven', s: '11 van 20', st: 'now' },
  { l: 'Publiceren', s: '7 van 20', st: 'now' },
  { l: 'Hermeten', s: '', st: 'todo' },
]

// Vier voordelen voor marketingbureaus, direct onder de AI-logo's en boven de twee beelden.
// Erboven een kop (links) en een korte uitleg (rechts); per voordeel een eigen icoon met titel.
export const uspIntro = {
  title: 'Meer werk verzetten voor je klanten',
  description: 'Orbit onderzoekt je klanten, meet hun zichtbaarheid in AI en schrijft content op basis van de gevonden kansen. Je team beoordeelt de teksten en houdt tijd over voor advies.',
}

// Per voordeel een titel met uitleg, op desktop en mobiel. Het type Usp (korte en lange titel) gebruikt /agencies nog.
export type Usp = { kort: string; titel: string; uitleg: string }

export type UspIcoon = 'terugkerend' | 'productie' | 'impact' | 'copy'

export const usps: { titel: string; uitleg: string; icoon: UspIcoon }[] = [
  {
    titel: 'Een maandelijkse dienst erbij',
    icoon: 'terugkerend',
    uitleg: 'Bied AI-zichtbaarheid aan onder je eigen naam, met elke maand metingen, nieuwe content en een rapportage voor je klant.',
  },
  {
    titel: 'Meer content met hetzelfde team',
    icoon: 'productie',
    uitleg: 'Orbit neemt onderzoek en schrijfwerk uit handen. Je team bepaalt de richting, beoordeelt de teksten en adviseert de klant.',
  },
  {
    titel: 'Resultaten om te bespreken',
    icoon: 'impact',
    uitleg: 'Laat zien hoe de AI-zichtbaarheid verandert en hoeveel Google-verkeer je gepubliceerde pagina\u2019s krijgen. Handig voor je volgende klantgesprek.',
  },
  {
    titel: 'Teksten die bij je klant passen',
    icoon: 'copy',
    uitleg: 'Orbit schrijft met de kennis, voorbeelden en schrijfstijl van je klant. Zo krijgt elke tekst de inhoud die het bedrijf onderscheidt.',
  },
]

// Eigen regel onder de vier voordelen: een smal limegroen blok over white label, dat alle vier ondersteunt.
// Rechts een tekstlink naar /agencies, zoals de link onder de hero: het eerste woord in het wit, de rest in grijs.
export const whiteLabel = {
  titel: 'In de huisstijl van je bureau',
  tekst: 'Je klanten werken in een omgeving met jouw logo, kleuren en lettertypes. White label is standaard inbegrepen.',
  link: { label: 'Bekijk', titel: 'Orbit voor bureaus', href: '/agencies' },
}

// Sectie over de kwaliteit van de content, onder de drie nagebouwde schermen: kop (links) en uitleg
// (rechts), daaronder twee beelden van de pagina Kwaliteit naast elkaar. De bijschriften van de beelden
// komen uit content/kwaliteit.ts, zodat ze op beide pagina's hetzelfde zijn.
export const kwaliteit = {
  title: 'AI-teksten op basis van klantkennis',
  description: 'Orbit gebruikt informatie van de website, documenten en antwoorden van je klant. Bedragen, termijnen en garanties worden op onderbouwing gecontroleerd. Zinnen die aandacht nodig hebben, worden gemarkeerd voordat je de tekst goedkeurt.',
  link: { label: 'Bekijk hoe Orbit teksten controleert', href: '/kwaliteit' },
}

// Het blok met drie nagebouwde schermen onder de tussenzin: alleen het bijschrift linksonder.
export const showcase = {
  title: 'Weet wat er klaarstaat en wat nog nodig is',
  description: 'Welke onderwerpen pak je op? Welke informatie ontbreekt nog? En wanneer verschijnt de volgende pagina? Orbit houdt de planning en openstaande vragen bij, zodat je team verder kan.',
}

// Sectie over resultaten, direct boven de veelgestelde vragen: kop (links) en uitleg (rechts) en twee
// beelden naast elkaar. Links het maandverslag met de nadruk op wat er gepubliceerd is, rechts de
// resultaten: zichtbaarheid in AI en klikken uit Search Console, per pagina vanaf zijn eigen
// publicatiedag. Alles wat hier staat, doet Orbit nu al. Verkeer betekent hier klikken uit Google;
// conversie en omzet meet Orbit niet en staan er daarom niet in.
export const resultaat = {
  title: 'Laat zien hoe je klant ervoor staat',
  description: 'Bespreek welke pagina\u2019s zijn gepubliceerd en hoe de zichtbaarheid zich ontwikkelt. Orbit vergelijkt AI-metingen voor en na publicatie. Koppel Google Search Console om ook het zoekverkeer naar je Orbit-pagina\u2019s te volgen.',
  beelden: [
    {
      titel: 'Je maandrapport staat klaar',
      tekst: 'Per klant zie je wat er is gepubliceerd, hoe de AI-zichtbaarheid zich ontwikkelt en wat er volgende maand gepland staat. Het verslag draagt de naam van je bureau. Sla het op als pdf en stuur het naar je klant.',
      alt: 'De maandrapportage van september: twintig pagina\'s gepubliceerd, alle twintig uit het contentplan, elk met de datum waarop hij live ging. Volgende maand staan twintig pagina\'s gepland.',
    },
    {
      titel: 'Volg ook je eerdere pagina\u2019s',
      tekst: 'Ook na de publicatiemaand blijf je zien hoeveel Google-verkeer je Orbit-pagina\u2019s krijgen. De telling begint voor elke pagina op de publicatiedag. Zo ontdek je welke onderwerpen bezoekers blijven trekken en welke pagina\u2019s aandacht nodig hebben.',
      alt: 'De resultaten: zichtbaarheid in AI 41 procent, de ronde ervoor 32 procent. 24.694 klikken uit Google in september, 110 procent meer dan in januari. Een grafiek met een stip per maand laat de klikken met kleine dipjes stijgen van 11.740 in januari naar 24.694 in september.',
    },
  ],
}

export type FeatureLink = { label: string; href: string }
// De afsluiter onderaan de homepage: dezelfde als op /werkwijze en /agencies (content/aanmelden.ts).
export { afsluiter as prefooter } from './aanmelden'

// Het vragenblok onderaan de homepage. Elke vraag klapt open; de volgorde hier is de volgorde op
// de pagina. De antwoorden noemen alleen wat Orbit nu al doet.
export type FaqItem = { question: string; answer: string }
export const faq: { title: string; items: FaqItem[] } = {
  title: 'Veelgestelde vragen',
  items: [
    {
      question: 'Wat doet Orbit voor mijn bureau?',
      answer: 'Orbit meet hoe vaak ChatGPT, Gemini en het AI-overzicht van Google de merken van je klanten aanraden, en wie er in plaats van hen genoemd wordt. Elke vraag waarbij je klant ontbreekt, wordt een pagina-idee in een contentplan. Orbit schrijft die pagina’s en meet daarna wat ze hebben opgeleverd. Zo verkoop je AI-zichtbaarheid als vaste maandelijkse dienst.',
    },
    {
      question: 'AI-antwoorden verschillen per keer. Hoe betrouwbaar is de meting?',
      answer: 'Orbit stelt geen losse vraag om er een screenshot van te maken. Per onderwerp stelt hij 30 vaste vragen, verdeeld over de hele klantreis, en de vragen die het zwaarst wegen meet hij vaker. Elk cijfer krijgt een marge, dus je ziet of een verschil echt is of toeval. Elk AI-antwoord kun je teruglezen.',
    },
    {
      question: 'Hoe weet ik zeker dat er geen verzonnen feiten op de site van mijn klant komen?',
      answer: 'Een pagina mag alleen beweren wat in de gecontroleerde kennis over het bedrijf staat. Orbit controleert bedragen, termijnen, garanties en keurmerken. Staat er geen bron bij, dan wordt de zin geel gemarkeerd, met de reden erbij, en kun je de pagina pas goedkeuren als elke gele zin bevestigd is. Twijfel je, dan leg je de zin met één klik aan je klant voor.',
    },
    {
      question: 'Hoe laat ik mijn klant zien wat ons werk oplevert?',
      answer: 'Na 14 en 28 dagen meet Orbit vanzelf opnieuw, op precies de vragen waarvoor een pagina is geschreven. Met Google Search Console zie je per pagina de klikken en vertoningen. Elke maand krijg je per klant een verslag met de naam van je bureau erop, dat je als pdf doorstuurt.',
    },
    {
      question: 'Wat kost Orbit?',
      answer: 'De kosten bestaan uit twee delen. Over het gebruik van Orbit maak je een afspraak bij de aanmelding. Het AI-gebruik loopt via de eigen sleutel van je bureau, tegen kostprijs en zonder opslag. Het aantal klanten is onbeperkt. Je stelt zelf een maandlimiet in, en bij elke knop die geld kost zie je vooraf ongeveer wat het kost.',
    },
    {
      question: 'Hoe snel kan ik beginnen, en wat moet mijn klant doen?',
      answer: 'Je installeert niets: je bureau krijgt een uitnodiging per mail. Voor een nieuwe klant vul je de naam en de website in, en binnen ongeveer tien minuten heeft Orbit het bedrijf onderzocht. Je klant kan meekijken, maar alleen bij zijn eigen bedrijf. Vragen die alleen hij kan beantwoorden, beantwoordt hij via een link, zonder account en ook op zijn telefoon.',
    },
  ],
}
