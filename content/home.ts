// Teksten van de homepage (/). Alles hieronder mag je vrij aanpassen; de opmaak volgt vanzelf.

export const hero = {
  title: ['Open source SEO & GEO software', 'voor marketeers.'],
  description: 'ORBIT ENGINE is gratis te gebruiken voor marketeers die voorop willen lopen met AI.',
}

// Grote quote onder het dashboard. Het vetgedrukte deel staat in het wit, de rest in grijs.
export const statement = {
  strong: 'Een nieuw soort marketingsoftware.',
  rest: 'Gemaakt voor een tijd waarin klanten hun antwoord aan AI vragen. ORBIT ENGINE laat zien of je merk genoemd wordt en wat je eraan kunt doen.',
  // Staat als quote met foto en naam eronder. Foto in public/images/, vierkant werkt het best.
  author: { name: 'Jan-Willem Koopman', photo: '/images/jan-willem-koopman.jpg' },
}

// Het procesblok direct onder de quote: titel en uitleg, daarna de stappen naast elkaar.
// De stappen met `number` zijn het stappenplan; de laatste stap zonder nummer sluit de loop.
// Alle links wijzen voorlopig naar dezelfde blogpost die nog geschreven wordt. Zolang die er
// niet is, geeft de link een 404. Maak hem aan als content/posts/zo-werkt-orbit-engine.md.
export type ProcessStep = { number?: number; title: string; description: string; link: FeatureLink }

const processPost = '/blog/zo-werkt-orbit-engine'

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
  caption: 'De bedragen op deze pagina komen uit het antwoord dat je bij Openstaande vragen gaf. Na publicatie meet ORBIT ENGINE of AI-assistenten je merk vaker noemen.',
}

export type FeatureLink = { label: string; href: string }
export const prefooter = {
  title: 'Built for the future. Available today.',
}
