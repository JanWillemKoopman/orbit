// Oude kennisbankartikelen (vervangen in oktober 2026): naar het nieuwe artikel over hetzelfde onderwerp, anders naar de kennisbank.
const vervangenKennisbank = {
  'de-allereerste-versie-van-orbit': '/kennisbank',
  'een-dag-in-de-week-zonder-vergaderingen': '/kennisbank',
  'een-jaar-orbit-wat-we-anders-zouden-doen': '/kennisbank',
  'een-prompt-is-geen-zoekwoord': '/kennisbank/wat-is-conversational-search',
  'feedback-verzamelen-zonder-enquetes': '/kennisbank',
  'gestructureerde-data-in-vijf-minuten': '/kennisbank/wat-is-structured-data',
  'hallo-wij-zijn-orbit': '/kennisbank',
  'handleiding-je-eerste-set-vragen-opzetten': '/kennisbank',
  'hoe-we-onze-prijzen-bepaalden': '/kennisbank',
  'meelopen-klantsucces': '/kennisbank',
  'misverstanden': '/kennisbank',
  'onboarding': '/kennisbank',
  'onze-principes-voor-verantwoord-gebruik-van-ai': '/kennisbank',
  'onze-techniek-in-2026': '/kennisbank',
  'postgres-keuze': '/kennisbank',
  'schrijven-voor-modellen': '/kennisbank/hoe-maak-je-content-begrijpelijk-voor-ai',
  'toegankelijkheid': '/kennisbank',
  'waarom-we-een-kantoor-aanhouden': '/kennisbank',
  'wat-betekent-een-bronvermelding-eigenlijk': '/kennisbank/wat-is-een-ai-citatie',
  'wat-een-goede-briefing-bevat': '/kennisbank',
  'woordenlijst-geo': '/kennisbank/wat-is-geo',
  'zichtbaarheid-meten': '/kennisbank/hoe-meet-je-ai-zichtbaarheid',
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // De productbeelden (/werkwijze) bevatten kleine schermtekst; 85 houdt die scherp.
  images: { qualities: [75, 85], formats: ['image/avif', 'image/webp'] },
  async redirects() {
    return [
      { source: '/categorie/van-het-team', destination: '/kennisbank', permanent: true },
      { source: '/changelog', destination: '/product-updates', permanent: true },
      // De vier productpagina's hebben nieuwe adressen: Werkwijze, Kwaliteit en Beheer.
      { source: '/product', destination: '/werkwijze', permanent: true },
      { source: '/kennis', destination: '/kwaliteit', permanent: true },
      { source: '/agency', destination: '/beheer', permanent: true },
      ...Object.entries(vervangenKennisbank).flatMap(([slug, destination]) => [
        { source: `/kennisbank/${slug}`, destination, permanent: true },
        { source: `/blog/${slug}`, destination, permanent: true },
      ]),
    ]
  },
}
export default nextConfig
