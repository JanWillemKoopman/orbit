// Teksten van de homepage (/). Alles hieronder mag je vrij aanpassen; de opmaak volgt vanzelf.
// De drie blokken in `features` zijn placeholders: vervang titel, tekst en links door je eigen verhaal.

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

export type FeatureLink = { label: string; href: string }
export type Feature = {
  /** Titel links; gebruik \n voor een regelafbreking zoals op linear.app. */
  title: string
  description: string
  href: string
  visual: 'measure' | 'plan' | 'write'
  links: FeatureLink[]
}

export const features: Feature[] = [
  {
    title: 'Meten\nin AI-antwoorden',
    description: 'Placeholder: zie per vraag of ChatGPT, Gemini en Google AI Overview jouw merk noemen, en welke concurrent de plek inneemt als dat niet zo is.',
    href: '/blog/zichtbaarheid-meten',
    visual: 'measure',
    links: [
      { label: 'Zichtbaarheid meten', href: '/blog/zichtbaarheid-meten' },
      { label: 'Concurrentieradar', href: '/blog/concurrentieradar' },
      { label: 'Bronvermeldingen', href: '/blog/wat-betekent-een-bronvermelding-eigenlijk' },
      { label: 'Meerdere markten', href: '/blog/meerdere-markten' },
    ],
  },
  {
    title: 'Plannen\nen prioriteren',
    description: 'Placeholder: ORBIT ENGINE bundelt de vragen van je klanten in onderwerpen en zet de kansen op volgorde, zodat je weet waar je eerste pagina over moet gaan.',
    href: '/blog/een-prompt-is-geen-zoekwoord',
    visual: 'plan',
    links: [
      { label: 'Onderwerpen', href: '/blog/een-prompt-is-geen-zoekwoord' },
      { label: 'Contentplan', href: '/blog/briefings-uit-klantvragen' },
      { label: 'Briefings', href: '/blog/wat-een-goede-briefing-bevat' },
      { label: 'Woordenlijst', href: '/blog/woordenlijst-geo' },
    ],
  },
  {
    title: 'Schrijven\nen publiceren',
    description: 'Placeholder: van briefing tot concept in je eigen tone of voice, met de feiten uit je merkdossier. Jij leest mee en beslist wat er live gaat.',
    href: '/blog/schrijven-voor-modellen',
    visual: 'write',
    links: [
      { label: 'Schrijven voor modellen', href: '/blog/schrijven-voor-modellen' },
      { label: 'Gestructureerde data', href: '/blog/gestructureerde-data-in-vijf-minuten' },
      { label: 'CMS-koppelingen', href: '/blog/cms-integraties' },
    ],
  },
]

export const prefooter = {
  title: 'Built for the future. Available today.',
}
