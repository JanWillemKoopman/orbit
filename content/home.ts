// Teksten van de homepage (/). Alles hieronder mag je vrij aanpassen; de opmaak volgt vanzelf.
import type { MaandStap } from '@/components/product/Visuals'

export const hero = {
  title: ['Verhoog de zichtbaarheid in Google', 'en AI-assistenten van je klanten.'],
  description: 'AI-software voor marketingbureaus met groeiambitie.',
  // Regel onder de knoppen: het eerste woord in het wit, de rest in grijs.
  link: { label: 'Lees', titel: 'Ons verhaal', href: '/over' },
}

// Grote quote onder het dashboard. Het vetgedrukte deel staat in het wit, de rest in grijs.
export const statement = {
  strong: 'Van klantstrategie tot groeikans in AI zichtbaarheid.',
  rest: 'Orbit brengt analyse, contentcreatie, publicatie en nameting samen in één doorlopende workflow. Jouw team bepaalt de koers. AI versnelt de uitvoering.',
  // Staat als quote met foto en naam eronder. Foto in public/images/, vierkant werkt het best.
  author: { name: 'Jan-Willem Koopman - AI engineer', photo: '/images/jan-willem-koopman.jpg' },
}

// Twee beelden direct onder de quote, elk met een titel, een korte uitleg en een link. Links het
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

// Drie voordelen voor marketingbureaus, onder de twee beelden en boven de drie nagebouwde schermen.
// Erboven een kop (links) en een korte uitleg (rechts).
export type Usp = { title: string; description: string }

export const uspIntro = {
  title: 'Gebouwd voor marketingbureaus',
  description: 'Orbit helpt je bureau AI-zichtbaarheid als vaste dienst aan te bieden, laat je klanten zien wat het oplevert en geeft je specialisten de ruimte voor het werk dat ertoe doet.',
}

export const usps: Usp[] = [
  {
    title: 'Maak AI-zichtbaarheid een vaste dienst',
    description: 'Breid je aanbod uit met een maandelijkse dienst voor zichtbaarheid in Google en AI-assistenten.',
  },
  {
    title: 'Maak vooruitgang zichtbaar voor je klant',
    description: 'Volg hoe de zichtbaarheid zich ontwikkelt en geef klanten inzicht met overzichtelijke rapportages en een eigen kijkomgeving.',
  },
  {
    title: 'Geef je specialisten tijd voor strategie',
    description: 'Besteed minder uren aan repetitief uitvoerend werk en meer aan keuzes, kwaliteit en klantadvies.',
  },
]

// Het blok met drie nagebouwde schermen onder het procesblok: alleen het bijschrift linksonder.
export const showcase = {
  title: 'Van kans tot ingeplande pagina',
  description: 'Je clusters, de vragen die de schrijver nog aan je heeft en de planning van je content staan bij elkaar. Zo zie je in één oogopslag wat er loopt en wat er van jou nodig is.',
}

// Het blok met het eindresultaat onder de drie schermen: kop en uitleg, daaronder één pagina uit de
// Bibliotheek met een bijschrift linksonder.
export const result = {
  title: 'Het eindresultaat',
  description: 'Een complete pagina in jouw toon, gebouwd op de antwoorden die je gaf. Jij keurt hem goed en zet hem op je site.',
  captionTitle: 'Klaar voor je site',
  caption: 'De bedragen op deze pagina komen uit het antwoord dat je bij Openstaande vragen gaf. Na publicatie meet Orbit of AI-assistenten je merk vaker noemen.',
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
      question: 'Wat doet Orbit?',
      answer: 'Orbit meet hoe vaak AI-assistenten zoals ChatGPT je merk noemen. Het laat zien waar je ontbreekt, schrijft de pagina\'s die daar verandering in brengen en meet daarna of het gewerkt heeft.',
    },
    {
      question: 'Wat is GEO, en wat is het verschil met SEO?',
      answer: 'SEO zorgt dat je gevonden wordt in de zoekresultaten van Google. GEO, Generative Engine Optimization, zorgt dat je merk genoemd wordt in het antwoord dat een AI-assistent geeft. Wie zijn vraag aan ChatGPT stelt, ziet geen tien links maar één antwoord met een paar namen erin.',
    },
    {
      question: 'Welke AI-assistenten meet Orbit?',
      answer: 'ChatGPT is de basis. Per onderwerp kun je Gemini en het AI-overzicht bovenaan Google erbij zetten. Bij elk cijfer staat een onzekerheidsmarge, zodat je ziet hoe zeker een uitkomst is.',
    },
    {
      question: 'Zet Orbit zelf pagina\'s op mijn website?',
      answer: 'Nee. Orbit schrijft de pagina in jouw toon, op basis van de feiten die jij aanlevert. Jij leest hem, past aan wat nodig is en beslist zelf wat er live gaat op je site.',
    },
    {
      question: 'Hoe weet ik of het werkt?',
      answer: 'Na publicatie meet Orbit opnieuw of AI-assistenten je merk vaker noemen. Elke meting voedt de volgende ronde kansen, zodat je ziet wat werkt en daarop verder bouwt.',
    },
    {
      question: 'Voor wie is Orbit bedoeld?',
      answer: 'Voor marketeers en bureaus die willen weten hoe hun merk of dat van hun opdrachtgevers in AI-antwoorden staat. Juist ook voor een MKB-bedrijf dat geen eigen team heeft om dit bij te houden.',
    },
  ],
}
