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
  { href: '/ai', label: 'AI', description: ['Hoe ORBIT ENGINE AI inzet', 'in elke stap van het werk'] },
  { href: '/product', label: 'Werkwijze', description: ['Van AI-vraag tot gepubliceerde', 'pagina, en het effect erna'] },
  { href: '/kennis', label: 'Kwaliteit', description: ['Alleen feiten met een bron,', 'nooit een verzonnen belofte'] },
  { href: '/agency', label: 'Beheer', description: ['Je klanten, je team en je kosten', 'samen in één account'] },
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
// Op mobiel valt Prijzen onder Product; op desktop staat het los in de header.
const links = (items: NavMenuItem[]) => items.map(({ href, label }) => ({ href, label }))
const prijzen = { href: '/prijzen', label: 'Prijzen' }
export const mobileNav = [
  { title: 'Product', links: [...links(productMenu), prijzen] },
  { title: 'Informatie', links: links(informatieMenu) },
  { title: 'Over ons', links: links(overOnsMenu) },
  { title: 'Account', links: [{ href: site.loginUrl, label: 'Inloggen' }] },
]

// Footer: dezelfde groepen als het hoofdmenu, met Prijzen als eigen kolom en rechts een kolom met
// contactgegevens. De labels in de footer wijken af van het hoofdmenu: korter, en met extra links naar /contact.
const footerLabels: Record<string, string> = { '/contact': 'Contact' }
const footerGroepen = [
  { title: 'Product', links: links(productMenu) },
  { title: 'Prijzen', links: [prijzen] },
  ...mobileNav.slice(1),
]
export const footerNav = footerGroepen.map((group) => {
  const renamed = group.links.map((l) => ({ href: l.href, label: footerLabels[l.href] ?? l.label }))
  if (group.title === 'Over ons') return { ...group, links: [...renamed, { href: '/contact', label: 'Samenwerking' }, { href: '/contact', label: 'Plan gesprek' }] }
  if (group.title === 'Account') return { ...group, links: [...renamed, { href: '/demo', label: 'Demo aanvragen' }] }
  return { ...group, links: renamed }
})

export const footerContact = {
  company: 'Outer Orbit',
  email: 'go@outerorbit.nl',
  address: ['Pastoor van Liesstraat 7', '5089PN, Haghorst', 'Noord-Brabant, Nederland'],
  phone: '+31-(0)6234567',
}
