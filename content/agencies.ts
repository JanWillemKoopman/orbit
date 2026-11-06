// Teksten van de pagina Agencies (/agencies): de verkooppagina voor de eigenaar van een marketingbureau.
// Waar /werkwijze laat zien hoe Orbit werkt, zegt deze pagina waarom een bureau ervoor kiest. Opbouw naar
// linear.app, met zo min mogelijk: de hero met achtergrondvideo, een tekstblok met vier voordelen zoals op de
// homepage, één groot beeld van het werkoverzicht met al je klanten, twee secties met een illustratie en
// tekst naast elkaar (grip op kosten en whitelabel) en de afsluiter.
// Elke belofte hier bestaat in de app (de kern: bedrijven, clusters, contentplan, schrijven, resultaten,
// kijkers en het design per bureau). De tools die in de wacht staan, komen op deze pagina niet voor.

export const meta = {
  title: 'Agencies',
  description:
    'Orbit is het platform voor marketingbureaus die AI-zichtbaarheid als vaste dienst verkopen: al je klanten bij elkaar, onbeperkt klanten, je klant kijkt mee en alles in de huisstijl van je bureau.',
}

export const hero = {
  eyebrow: 'Agencies',
  title: "AI-software voor marketing agency's met groeiambitie",
}

// Kop (links), uitleg (rechts) en vier voordelen met een vinkje, in de opbouw van het blok
// "Gebouwd voor marketingbureaus" op de homepage (uspIntro en usps in content/home.ts).
export const usp = {
  titel: 'Eén platform voor je hele bureau',
  tekst:
    'Orbit helpt je bureau AI-zichtbaarheid als vaste dienst te verkopen, voor al je klanten tegelijk. Jullie bepalen met de klant de koers, Orbit doet het werk.',
  punten: [
    'Beheer al je klanten vanuit één platform',
    'Volledig in de huisstijl van je bureau',
    'Laat je klant meekijken',
    'Neem je specialisten werk uit handen',
  ],
}

export const beeld = {
  titel: 'Het werkoverzicht van je bureau',
  tekst: 'Wat het langst wacht, staat bovenaan. Vink klanten aan en start de maand voor allemaal tegelijk.',
}

// Twee secties onder het grote beeld, elk met een illustratie en tekst naast elkaar.
export const secties = [
  {
    id: 'kosten',
    label: 'Grip op kosten',
    titel: 'Hanteer je bureautarief. Jij betaalt kostprijs.',
    tekst:
      'Een pagina schrijven kost met Orbit minder dan een euro aan AI, onderzoek en eindredactie inbegrepen. Je betaalt de echte kostprijs, rechtstreeks bij OpenAI, zonder opslag en zonder prijs per klant. Wat je je klant rekent, bepaal je zelf. Het verschil is je marge, en je ziet per klant precies hoe groot die is.',
    punten: [
      'AI tegen kostprijs, zonder opslag of prijs per klant',
      'Per klant zien wat hij kost, en per maand exporteren',
      'Een maandlimiet en vooraf de kosten bij elke knop',
    ],
  },
  {
    id: 'whitelabel',
    label: 'Whitelabel',
    titel: 'Jouw bureau. Jouw huisstijl.',
    tekst:
      'Orbit draait volledig in de huisstijl van je bureau: je logo, je kleuren, je lettertypes en je vormen, op elk scherm. Je team en je klanten zien jouw platform. Het redesign van de interface doen wij, en dat is inbegrepen.',
    punten: [
      'Je logo linksboven in de app',
      'Je kleuren en lettertypes op elk scherm',
      'Een maandverslag met de naam van je bureau',
    ],
  },
]

export const afsluiter = {
  title: 'Laat je bureau groeien met Orbit.',
  description: 'Plan een demo. We laten je Orbit zien in de huisstijl van jouw bureau.',
}
