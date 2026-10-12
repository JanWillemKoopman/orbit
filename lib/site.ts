// Centrale configuratie van de blog. Pas hier naam, navigatie en contactgegevens aan.
export const site = {
  name: 'Orbit',
  blogTitle: 'Nu',
  description: 'Verhalen, productnieuws en inzichten van het Orbit-team.',
  url: 'https://orbit.example.com',
  contactEmail: 'hallo@orbit.example.com',
  // Rechtsboven in de header: de link "Inloggen". Tijdelijke URL, vervang door de definitieve.
  loginUrl: 'https://www.nogoptegevenurl.nl',
  locale: 'nl-NL',
}

export const categories = [
  { slug: 'productlanceringen', label: 'Productlanceringen' },
  { slug: 'community', label: 'Uit de community' },
] as const

export type CategorySlug = (typeof categories)[number]['slug']

// De kennisbank staat los van de blog: eigen pagina (/kennisbank) en eigen artikelen (/kennisbank/<slug>).
export const KENNISBANK = 'kennisbank'

// Tabs boven het blogoverzicht (/blog). "Changelog" en "Pers" hebben een eigen pagina.
export const tabs = [
  { href: '/blog', label: 'Alles' },
  { href: '/product-updates', label: 'Product updates' },
  ...categories.map((c) => ({ href: `/categorie/${c.slug}`, label: c.label })),
  { href: '/pers', label: 'Pers' },
]

// Hoofdmenu. Een item met `items` is een uitklapmenu zonder eigen pagina, zoals "Product" op
// linear.app: de knop opent het menu, de pagina's staan erin met een korte omschrijving.
export type NavLink = { href: string; label: string }
export type NavMenuItem = { href: string; label: string; description: string[] }
export type NavItem = NavLink | { label: string; items: NavMenuItem[] }

export const productMenu: NavMenuItem[] = [
  { href: '/product', label: 'Fases en werkwijze', description: ['Van AI-vraag tot gepubliceerde', 'pagina, en het effect erna'] },
  { href: '/kennis', label: 'Kennis en feiten', description: ['Alleen feiten met een bron,', 'nooit een verzonnen belofte'] },
  { href: '/agency', label: 'Account en beheer', description: ['Je klanten, je team en je kosten', 'samen in één account'] },
]

export const informatieMenu: NavMenuItem[] = [
  { href: '/kennisbank', label: 'Kennisbank', description: ['Antwoorden en achtergronden', 'van het team'] },
  { href: '/blog', label: 'Blog', description: ['Verhalen, nieuws en inzichten', 'van het Orbit-team'] },
  { href: '/product-updates', label: 'Product updates', description: ['Wat er nieuw is en wat we', 'hebben verbeterd'] },
]

export const overOnsMenu: NavMenuItem[] = [
  { href: '/over', label: 'Over Orbit Engine', description: ['Wie we zijn en waar', 'we voor staan'] },
  { href: '/contact', label: 'Contact opnemen', description: ['Een vraag of een demo?', 'We reageren binnen één werkdag'] },
]

export const mainNav: NavItem[] = [
  { label: 'Product', items: productMenu },
  { href: '/prijzen', label: 'Prijzen' },
  { label: 'Informatie', items: informatieMenu },
  { label: 'Over ons', items: overOnsMenu },
]

// Mobiel menu, gegroepeerd zoals op linear.app: een grijs label boven grote witte links.
const links = (items: NavMenuItem[]) => items.map(({ href, label }) => ({ href, label }))
export const mobileNav = [
  { title: 'Product', links: links(productMenu) },
  { title: 'Prijzen', links: [{ href: '/prijzen', label: 'Prijzen' }] },
  { title: 'Informatie', links: links(informatieMenu) },
  { title: 'Over ons', links: links(overOnsMenu) },
  { title: 'Account', links: [{ href: site.loginUrl, label: 'Inloggen' }] },
]

export const footerNav = [
  {
    title: 'Blog',
    links: [
      { href: '/blog', label: 'Alles' },
      { href: '/categorie/productlanceringen', label: 'Productlanceringen' },
      { href: '/kennisbank', label: 'Kennisbank' },
      { href: '/categorie/community', label: 'Uit de community' },
      { href: '/blog#archief', label: 'Archief' },
    ],
  },
  {
    title: 'Onderwerpen',
    links: [
      { href: '/kennisbank/zichtbaarheid-meten', label: 'Meten' },
      { href: '/kennisbank/schrijven-voor-modellen', label: 'Schrijven' },
      { href: '/kennisbank/postgres-keuze', label: 'Techniek' },
      { href: '/kennisbank/toegankelijkheid', label: 'Ontwerp' },
      { href: '/blog/woordenlijst-geo', label: 'Woordenlijst' },
      { href: '/categorie/community', label: 'Klantverhalen' },
    ],
  },
  {
    title: 'Updates',
    links: [
      { href: '/product-updates', label: 'Product updates' },
      { href: '/pers', label: 'Pers' },
      { href: '/rss.xml', label: 'RSS-feed' },
    ],
  },
  {
    title: 'Bedrijf',
    links: [
      { href: '/contact', label: 'Contact' },
      { href: '/over', label: 'Team' },
      { href: '/kennisbank/onboarding', label: 'Werken bij' },
      { href: '/pers', label: 'Persmap' },
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
  {
    title: 'Juridisch',
    links: [
      { href: '/contact', label: 'Privacy' },
      { href: '/contact', label: 'Voorwaarden' },
      { href: '/contact', label: 'Cookies' },
    ],
  },
]

export const legalNav = [
  { href: '/contact', label: 'Privacy' },
  { href: '/contact', label: 'Voorwaarden' },
  { href: '/contact', label: 'Cookies' },
]
