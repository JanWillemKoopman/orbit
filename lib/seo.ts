import type { Metadata } from 'next'
import { site } from './site'

// Wat een zoekmachine en een gedeelde link van een pagina laten zien: titel, omschrijving, adres en beeld.
// Elke pagina die in Google mag staan, bouwt zijn metadata hiermee op, zodat de titel in de zoekresultaten,
// de titel bij het delen en het vaste adres altijd hetzelfde zeggen. Een pagina die zelf `openGraph` zet,
// vervangt het blok uit de layout helemaal; daarom staan de naam van de site en de taal hier nog eens.

export type Deelbeeld = { url: string; width?: number; height?: number }

/** De deelbeelden in public/images/product zijn allemaal 1200 bij 630. */
export const ogBeeld = (naam: string): Deelbeeld => ({ url: `/images/product/og-${naam}.png`, width: 1200, height: 630 })

/** Beeld voor een pagina zonder eigen deelbeeld: het werkoverzicht van een bureau. */
export const STANDAARD_DEELBEELD = ogBeeld('agency')

/** Standaardtitel en -omschrijving van de site, ook voor een pagina die zelf niets opgeeft. */
export const standaard = {
  titel: `${site.name} – White label GEO-software voor marketingbureaus`,
  omschrijving:
    'Maak je klanten zichtbaar in ChatGPT en Google. Orbit meet de AI-zichtbaarheid, schrijft de pagina’s en bewijst het resultaat. Plan een gratis demo.',
}

/**
 * De cover van een artikel als deelbeeld. Een getekende cover ("art:...") is geen bestand en een bewegende gif
 * is te zwaar voor een voorvertoning: de eerste krijgt het standaardbeeld, de tweede zijn stilstaande versie
 * (<naam>-stil.webp, dezelfde afspraak als in components/Art.tsx).
 */
export function coverAlsDeelbeeld(cover: string): Deelbeeld | undefined {
  if (cover.startsWith('art:')) return undefined
  return { url: cover.replace(/\.gif$/, '-stil.webp') }
}

type Invoer = {
  /** De volledige titel zoals hij in de zoekresultaten staat, met de naam Orbit erin. Richtlijn: hooguit 60 tekens. */
  titel: string
  /** De tekst onder de titel in de zoekresultaten. Richtlijn: 120 tot 158 tekens. */
  omschrijving: string
  /** Het vaste adres van de pagina, beginnend met een slash. */
  pad: string
  beeld?: Deelbeeld
  /** `article` voor een blogartikel; anders een gewone pagina. */
  artikel?: { gepubliceerd: string; auteur: string }
}

export function paginaMeta({ titel, omschrijving, pad, beeld = STANDAARD_DEELBEELD, artikel }: Invoer): Metadata {
  return {
    title: { absolute: titel },
    description: omschrijving,
    alternates: { canonical: pad },
    openGraph: {
      siteName: site.name,
      locale: 'nl_NL',
      title: titel,
      description: omschrijving,
      url: pad,
      images: [beeld],
      ...(artikel
        ? { type: 'article' as const, publishedTime: artikel.gepubliceerd, authors: [artikel.auteur] }
        : { type: 'website' as const }),
    },
    twitter: { card: 'summary_large_image', title: titel, description: omschrijving, images: [beeld.url] },
  }
}
