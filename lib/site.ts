// Centrale configuratie van de blog. Pas hier naam, navigatie en contactgegevens aan.
export const site = {
  name: 'Orbit',
  blogTitle: 'Nu',
  description: 'Verhalen, productnieuws en inzichten van het Orbit-team.',
  // Het adres waarop de site nu live staat. Hier hangen het vaste adres van elke pagina (canonical), de
  // sitemap en de deelbeelden aan. Komt er een eigen domein, vervang dit dan door dat adres.
  url: 'https://orbit-eight-flax.vercel.app',
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
  ...categories.map((c) => ({ href: `/categorie/${c.slug}`, label: c.label })),
  { href: '/pers', label: 'Pers' },
]

// Hoofdmenu. Een item met `items` is een uitklapmenu zonder eigen pagina, zoals "Product" op
// linear.app: de knop opent het menu, de pagina's staan erin met een korte omschrijving.
export type NavLink = { href: string; label: string }
export type NavMenuItem = { href: string; label: string; description: string[] }
export type NavItem = NavLink | { label: string; items: NavMenuItem[] }

export const overOnsMenu: NavMenuItem[] = [
  { href: '/over', label: 'Over Orbit', description: ['Wie we zijn en waar', 'we voor staan'] },
  { href: '/contact', label: 'Contact opnemen', description: ['Een vraag of een demo?', 'We reageren binnen één werkdag'] },
]

// Losse pagina's in de header, zonder uitklapmenu. Workflow en Agencies stonden eerder in een
// uitklapmenu "Product"; ze staan nu zelf in de balk. De kennisbank en product updates staan
// (voorlopig) nergens in het menu; hun pagina's bestaan nog wel, maar worden niet geïndexeerd.
const workflow = { href: '/werkwijze', label: 'Workflow' }
const agencies = { href: '/agencies', label: 'Agencies' }
const blog = { href: '/blog', label: 'Blog' }

export const mainNav: NavItem[] = [
  workflow,
  agencies,
  blog,
  { label: 'Over ons', items: overOnsMenu },
]

// Mobiel menu, gegroepeerd zoals op linear.app: een grijs label boven grote witte links.
// Workflow, Agencies en Blog hebben geen uitklapmenu en staan los, in een groep zonder label.
const links = (items: NavMenuItem[]) => items.map(({ href, label }) => ({ href, label }))
export type NavGroep = { title?: string; links: NavLink[] }
const informatieEnMeer: NavGroep[] = [
  { title: 'Over ons', links: links(overOnsMenu) },
  { title: 'Account', links: [{ href: site.loginUrl, label: 'Inloggen' }] },
]
export const mobileNav: NavGroep[] = [
  { links: [workflow, agencies, blog] },
  ...informatieEnMeer,
]

// Footer: volgt het hoofdmenu. Workflow en Agencies staan los in de header en vormen in de footer
// samen de kolom Product, zoals linear.app zijn productpagina's onder één kop zet. Elke groep uit
// mainNav wordt een kolom met hetzelfde label; Blog staat onder Over ons, zoals "Blog" onder Company
// op linear.app. Contact staat niet onder Over ons; daarna volgen de kolom Demo en de kolom Contact
// met e-mail, telefoon en adres (Footer.tsx).
const nietInFooterGroep = new Set(['/contact'])
const footerLinks = (items: NavMenuItem[]): NavLink[] => links(items).filter((l) => !nietInFooterGroep.has(l.href))
export const footerNav: { title: string; links: NavLink[] }[] = [
  { title: 'Product', links: [workflow, agencies] },
  ...mainNav
    .filter((item): item is { label: string; items: NavMenuItem[] } => 'items' in item)
    .map((group) => ({
      title: group.label,
      links: [
        ...footerLinks(group.items),
        ...(group.label === 'Over ons' ? [blog] : []),
      ],
    })),
  { title: 'Demo', links: [{ href: '/demo', label: 'Demo aanvragen' }] },
]

export const footerContact = {
  company: 'Orbit',
  email: 'go@outerorbit.nl',
  address: ['Pastoor van Liesstraat 7', '5089 PN Haghorst'],
  phone: '+31-(0)6234567',
}
