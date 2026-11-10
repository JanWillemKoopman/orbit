// Teksten van de homepage (/). Alles hieronder mag je vrij aanpassen; de opmaak volgt vanzelf.
import type { MaandStap } from '@/components/product/Visuals'

export const hero = {
  title: ['Automatiseer content productie.', 'Maak je klanten zichtbaar in AI\u00a0&\u00a0Search.'],
  description: 'AI-software voor marketingbureaus met groeiambitie.',
  // Regel onder de knoppen: het eerste woord in het wit, de rest in grijs.
  link: { label: 'Lees', titel: 'Ons verhaal', href: '/over' },
}

// Grote tussenzin onder de twee beelden, boven de drie nagebouwde schermen. Het vetgedrukte deel staat in het wit, de rest in grijs.
export const statement = {
  strong: 'Van klantstrategie tot groeikans in AI zichtbaarheid.',
  rest: 'Orbit brengt analyse, contentcreatie, publicatie en nameting samen in één doorlopende workflow. Jouw team bepaalt de koers. AI versnelt de uitvoering.',
}

// Twee beelden direct onder het blok voor bureaus, elk met een titel, een korte uitleg en een link. Links het
// account van het bureau (/beheer), rechts de maand van één klant van meten tot hermeten (/werkwijze).
// De links wijzen direct naar de pagina en niet naar de oude adressen /agency en /product, die alleen
// nog doorsturen.
export type Uitgelicht = { titel: string; tekst: string; href: string; alt: string }

export const uitgelicht: Uitgelicht[] = [
  {
    titel: 'Al je klanten in één platform',
    tekst: 'Beheer merken, metingen en content vanuit één centrale omgeving. Houd overzicht terwijl je bureau groeit.',
    href: '/beheer',
    alt: 'Het werkoverzicht van Bureau Noordwind: bedrijven onder elkaar met hun zichtbaarheid in AI, de maandmeting en wat er klaarstaat om te starten.',
  },
  {
    titel: 'De hele workflow. Van meten tot nameten.',
    tekst: 'Meet de zichtbaarheid, ontdek kansen en werk ze uit tot een contentplan en nieuwe teksten. Volg de publicatie en meet daarna opnieuw hoe je klant ervoor staat. Alles in één platform.',
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
// Erboven een kop (links) en een korte uitleg (rechts); per voordeel een vinkje met titel.
export const uspIntro = {
  title: 'Ontwikkeld voor marketingbureaus',
  description: 'Orbit helpt je bureau AI-zichtbaarheid als vaste dienst aan te bieden, laat je klanten zien wat het oplevert en geeft je specialisten de ruimte voor het werk dat ertoe doet.',
}

// Per voordeel een titel met uitleg, op desktop en mobiel. Het type Usp (korte en lange titel) gebruikt /agencies nog.
export type Usp = { kort: string; titel: string; uitleg: string }

export const usps: { titel: string; uitleg: string }[] = [
  {
    titel: 'GEO/SEO als vaste dienst',
    uitleg: 'Maak van vindbaarheid terugkerende omzet. Verkoop GEO en SEO onder je eigen naam, met standaard een 100% white-label platform in de huisstijl van jouw bureau.',
  },
  {
    titel: 'Verhoog productie',
    uitleg: 'Lever meer content met het team dat je al hebt. Orbit versnelt het onderzoek en schrijfwerk, zodat je specialisten meer tijd hebben voor strategie en creatie.',
  },
  {
    titel: 'Inzicht in impact',
    uitleg: 'Maak je waarde zichtbaar in elk klantgesprek. Met een nulmeting en nametingen laat je zien hoe het verkeer en de zichtbaarheid van je klant in AI-antwoorden zich ontwikkelen.',
  },
  {
    titel: 'Copywriterniveau',
    uitleg: 'Lever teksten die klinken als het merk van je klant, zijn aanbod overtuigend neerzetten en zijn onderbouwd met bronnen. Content waar je graag je bureaunaam onder zet.',
  },
]

// Sectie over de kwaliteit van de content, onder de drie nagebouwde schermen: kop (links) en uitleg
// (rechts), daaronder twee beelden van de pagina Kwaliteit naast elkaar. De bijschriften van de beelden
// komen uit content/kwaliteit.ts, zodat ze op beide pagina's hetzelfde zijn.
export const kwaliteit = {
  title: 'AI-teksten die kloppen',
  description: 'Orbit schrijft alleen met feiten die ergens vandaan komen: van de website, van je klant of uit een document. Wat niet te onderbouwen is, valt meteen op. Zo lever je AI-teksten zonder elke zin zelf na te lopen.',
  link: { label: 'Zo bewaakt Orbit de kwaliteit', href: '/kwaliteit' },
}

// Het blok met drie nagebouwde schermen onder de tussenzin: alleen het bijschrift linksonder.
export const showcase = {
  title: 'Van kans tot ingeplande pagina',
  description: 'Je clusters, de vragen die de schrijver nog aan je heeft en de planning van je content staan bij elkaar. Zo zie je in één oogopslag wat er loopt en wat er van jou nodig is.',
}

// Sectie over resultaten, direct boven de veelgestelde vragen: kop (links) en uitleg (rechts) en twee
// beelden naast elkaar. Links het maandverslag met de nadruk op wat er gepubliceerd is, rechts de
// resultaten: zichtbaarheid in AI en klikken uit Search Console, per pagina vanaf zijn eigen
// publicatiedag. Alles wat hier staat, doet Orbit nu al. Verkeer betekent hier klikken uit Google;
// conversie en omzet meet Orbit niet en staan er daarom niet in.
export const resultaat = {
  title: 'Laat elke maand zien wat je werk oplevert',
  description: 'Je klant betaalt niet voor teksten, maar voor resultaat. Orbit volgt elke pagina die je publiceert, in AI-assistenten én in Google. Zo gaat het maandgesprek over wat je bereikt hebt, niet over wat je gedaan hebt.',
  beelden: [
    {
      titel: 'Het klantgesprek is voorbereid voordat je het plant',
      tekst: 'Elke maand staat per klant klaar welke pagina\'s er live gingen en wat er volgende maand op de planning staat. Je klant ziet in één oogopslag dat het afgesproken werk geleverd is. Met de naam van je bureau erop, als pdf te versturen.',
      alt: 'De maandrapportage van september: twintig pagina\'s gepubliceerd, alle twintig uit het contentplan, elk met de datum waarop hij live ging. Volgende maand staan twintig pagina\'s gepland.',
    },
    {
      titel: 'Eerder werk blijft meetellen',
      tekst: 'AI-assistenten noemen je klant vaker, en pagina\'s van maanden geleden leveren nog steeds bezoekers op. Orbit telt per pagina de klikken vanaf zijn eigen publicatiedag, alleen voor pagina\'s die met Orbit geschreven zijn. Zo zie je wat deze maand toevoegt bovenop alles wat er al staat.',
      alt: 'De resultaten: zichtbaarheid in AI 41 procent, de ronde ervoor 32 procent. 24.694 klikken uit Google in september, 110 procent meer dan in januari. Een grafiek met een stip per maand laat de klikken met kleine dipjes stijgen van 11.740 in januari naar 24.694 in september.',
    },
  ],
}

export type FeatureLink = { label: string; href: string }
export const prefooter = {
  title: 'Built for the future. Available today.',
}

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
