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

export const informatieMenu: NavMenuItem[] = [
  { href: '/kennisbank', label: 'Kennisbank', description: ['Antwoorden en achtergronden', 'van het team'] },
  { href: '/blog', label: 'Blog', description: ['Verhalen, nieuws en inzichten', 'van het Orbit-team'] },
  { href: '/product-updates', label: 'Product updates', description: ['Wat er nieuw is en wat we', 'hebben verbeterd'] },
]

export const overOnsMenu: NavMenuItem[] = [
  { href: '/over', label: 'Over Orbit', description: ['Wie we zijn en waar', 'we voor staan'] },
  { href: '/contact', label: 'Contact opnemen', description: ['Een vraag of een demo?', 'We reageren binnen één werkdag'] },
]

// "Product" in de header: hoe Orbit werkt en voor wie het is.
const workflow = { href: '/werkwijze', label: 'Zo werkt Orbit' }
const agencies = { href: '/agencies', label: 'Voor agencies' }
export const hoofdProductMenu: NavMenuItem[] = [
  { ...workflow, description: ['Van AI-vraag tot gepubliceerde', 'pagina, en het effect erna'] },
  { ...agencies, description: ['AI-zichtbaarheid als vaste dienst', 'voor al je klanten'] },
]

// Losse pagina vooraan in de header, zonder uitklapmenu.
const prijzen = { href: '/prijzen', label: 'Prijzen' }

export const mainNav: NavItem[] = [
  { label: 'Product', items: hoofdProductMenu },
  prijzen,
  { label: 'Informatie', items: informatieMenu },
  { label: 'Over ons', items: overOnsMenu },
]

// Mobiel menu, gegroepeerd zoals op linear.app: een grijs label boven grote witte links.
// Prijzen heeft geen uitklapmenu en staat los, in een groep zonder label.
const links = (items: NavMenuItem[]) => items.map(({ href, label }) => ({ href, label }))
export type NavGroep = { title?: string; links: NavLink[] }
const informatieEnMeer: NavGroep[] = [
  { title: 'Informatie', links: links(informatieMenu) },
  { title: 'Over ons', links: links(overOnsMenu) },
  { title: 'Account', links: [{ href: site.loginUrl, label: 'Inloggen' }] },
]
export const mobileNav: NavGroep[] = [
  { title: 'Product', links: links(hoofdProductMenu) },
  { links: [prijzen] },
  ...informatieEnMeer,
]

// Footer: volgt het hoofdmenu. Elke groep uit mainNav wordt een kolom, met dezelfde labels; Prijzen
// (een losse pagina) sluit de kolom Product af, zoals "Pricing" onder Product in de footer van linear.app.
const footerLabels: Record<string, string> = { '/contact': 'Contact' }
const footerLink = ({ href, label }: NavLink) => ({ href, label: footerLabels[href] ?? label })
export const footerNav = mainNav
  .filter((item): item is { label: string; items: NavMenuItem[] } => 'items' in item)
  .map((group) => ({
    title: group.label,
    links: [...group.items.map(footerLink), ...(group.label === 'Product' ? [prijzen] : [])],
  }))

export const footerContact = {
  company: 'Orbit',
  email: 'go@outerorbit.nl',
  address: ['Pastoor van Liesstraat 7', '5089 PN Haghorst'],
  phone: '+31-(0)6234567',
}
