// Centrale configuratie van de blog. Pas hier naam, navigatie en contactgegevens aan.
export const site = {
  name: 'Orbit',
  blogTitle: 'Nu',
  description: 'Verhalen, productnieuws en inzichten van het Orbit-team.',
  url: 'https://orbit.example.com',
  contactEmail: 'hallo@orbit.example.com',
  locale: 'nl-NL',
}

export const categories = [
  { slug: 'productlanceringen', label: 'Productlanceringen' },
  { slug: 'van-het-team', label: 'Van het team' },
  { slug: 'community', label: 'Uit de community' },
] as const

export type CategorySlug = (typeof categories)[number]['slug']

// Tabs boven het overzicht. "Changelog" en "Pers" hebben een eigen pagina.
export const tabs = [
  { href: '/', label: 'Alles' },
  { href: '/changelog', label: 'Changelog' },
  ...categories.map((c) => ({ href: `/categorie/${c.slug}`, label: c.label })),
  { href: '/pers', label: 'Pers' },
]

export const mainNav = [
  { href: '/categorie/productlanceringen', label: 'Product' },
  { href: '/categorie/community', label: 'Klanten' },
  { href: '/changelog', label: 'Changelog' },
  { href: '/pers', label: 'Pers' },
  { href: '/', label: 'Nu' },
]

export const footerNav = [
  {
    title: 'Blog',
    links: [
      { href: '/', label: 'Alles' },
      { href: '/categorie/productlanceringen', label: 'Productlanceringen' },
      { href: '/categorie/van-het-team', label: 'Van het team' },
      { href: '/categorie/community', label: 'Uit de community' },
    ],
  },
  {
    title: 'Updates',
    links: [
      { href: '/changelog', label: 'Changelog' },
      { href: '/pers', label: 'Pers' },
      { href: '/#archief', label: 'Archief' },
      { href: '/rss.xml', label: 'RSS-feed' },
    ],
  },
  {
    title: 'Bedrijf',
    links: [
      { href: '/contact', label: 'Contact' },
      { href: '/categorie/van-het-team', label: 'Team' },
      { href: '/contact', label: 'Werken bij' },
    ],
  },
  {
    title: 'Volg ons',
    links: [
      { href: 'https://www.linkedin.com', label: 'LinkedIn' },
      { href: 'https://x.com', label: 'X (Twitter)' },
      { href: 'https://github.com', label: 'GitHub' },
      { href: 'https://www.youtube.com', label: 'YouTube' },
    ],
  },
]

export const legalNav = [
  { href: '/contact', label: 'Privacy' },
  { href: '/contact', label: 'Voorwaarden' },
  { href: '/contact', label: 'Cookies' },
]
