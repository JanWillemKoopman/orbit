// Teksten van de homepage (/). Alles hieronder mag je vrij aanpassen; de opmaak volgt vanzelf.
import type { MaandStap } from '@/components/product/Visuals'

export const hero = {
  title: ['Open source SEO & GEO software', 'voor marketeers.'],
  description: 'Orbit is gratis te gebruiken voor marketeers die voorop willen lopen met AI.',
}

// Grote quote onder het dashboard. Het vetgedrukte deel staat in het wit, de rest in grijs.
export const statement = {
  strong: 'Een nieuw soort marketingsoftware.',
  rest: 'Gemaakt voor een tijd waarin klanten hun antwoord aan AI vragen. Orbit laat zien of je merk genoemd wordt en wat je eraan kunt doen.',
  // Staat als quote met foto en naam eronder. Foto in public/images/, vierkant werkt het best.
  author: { name: 'Jan-Willem Koopman', photo: '/images/jan-willem-koopman.jpg' },
}

// Twee beelden direct onder de quote, elk met een titel, een korte uitleg en een link. Links het
// account van het bureau (/agency), rechts de maand van één klant van meten tot hermeten (/product).
export type Uitgelicht = { titel: string; tekst: string; href: string; alt: string }

export const uitgelicht: Uitgelicht[] = [
  {
    titel: 'Al je klanten in één account',
    tekst: 'Per klant de zichtbaarheid, wat er op je wacht en wat het kost. Start de maand voor meerdere klanten tegelijk.',
    href: '/agency',
    alt: 'Het werkoverzicht van Bureau Noordwind: bedrijven onder elkaar met hun zichtbaarheid in AI, de maandmeting en wat er klaarstaat om te starten.',
  },
  {
    titel: 'Van meten tot hermeten',
    tekst: 'Meten, plannen, schrijven, publiceren en hermeten. Elke klant doorloopt elke maand dezelfde ronde, en je ziet welke stap loopt.',
    href: '/product',
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

// Het procesblok direct onder de quote: titel en uitleg, daarna de stappen naast elkaar.
// De stappen met `number` zijn het stappenplan; de laatste stap zonder nummer sluit de loop.
// Alle links wijzen voorlopig naar dezelfde blogpost die nog geschreven wordt. Zolang die er
// niet is, geeft de link een 404. Maak hem aan als content/posts/zo-werkt-orbit.md.
export type ProcessStep = { number?: number; title: string; description: string; link: FeatureLink }

const processPost = '/blog/zo-werkt-orbit'

export const loop: { title: string; description: string; steps: ProcessStep[] } = {
  title: 'Jouw Brand Intelligence Brain',
  description: 'Het combineert wat jij het vertelt met wat het online vindt, en gaat vervolgens aan de slag, meet de resultaten en wordt steeds slimmer, in één doorlopende loop.',
  steps: [
    {
      number: 1,
      title: 'Ontdek kansen',
      description: 'Welke vragen stellen je klanten aan AI, en waar ontbreekt jouw merk nog in het antwoord?',
      link: { label: 'Kansen vinden', href: processPost },
    },
    {
      number: 2,
      title: 'Genereer content',
      description: 'Pagina\'s in je eigen toon, gebouwd op de feiten die jij aanlevert.',
      link: { label: 'Content maken', href: processPost },
    },
    {
      number: 3,
      title: 'Publiceren',
      description: 'Jij leest mee en beslist wat er live gaat op je eigen site.',
      link: { label: 'Publiceren', href: processPost },
    },
    {
      number: 4,
      title: 'Impact meten',
      description: 'Zie of AI-assistenten je merk na publicatie vaker noemen.',
      link: { label: 'Resultaten meten', href: processPost },
    },
    {
      title: 'Steeds slimmer',
      description: 'Elke meting voedt de volgende ronde kansen. Zo begint de loop opnieuw, met meer kennis.',
      link: { label: 'De loop', href: processPost },
    },
  ],
}

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

// Het persoonlijke blok onder het eindresultaat: een korte introductie met een link naar het
// volledige blogartikel. Concepttekst, vervang hem door je eigen woorden. Het artikel staat als
// concept in content/posts/_waarom-ik-orbit-bouw.md; zolang de bestandsnaam met _ begint,
// is het niet online en geeft de link een 404. Haal de _ weg zodra het artikel af is.
export const story = {
  title: 'Waarom ik Orbit bouw',
  paragraphs: [
    'Steeds meer mensen stellen hun vraag niet meer aan Google, maar aan ChatGPT of Gemini. Ze krijgen één antwoord, met een paar namen erin. Een bedrijf dat daar niet tussen staat, bestaat voor die klant niet.',
    'Grote merken hebben teams die dat bijhouden. Een MKB-bedrijf heeft die meestal niet. Daarom bouw ik Orbit: software die laat zien waar je merk ontbreekt, de pagina schrijft die daar verandering in brengt en meet of het werkt.',
  ],
  link: { label: 'Lees het hele verhaal', href: '/blog/waarom-ik-orbit-bouw' },
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
