// Bouwblokken van de productpagina's. Opbouw naar linear.app: per sectie een kop met uitleg, daarna
// een groot paneel waarin een beeld over de rand loopt, of een raster van cellen die elk één
// onderdeel van dichtbij tonen, met het bijschrift in het vlak zelf.
//
// Twee families. `Kop`, `Paneel`, `Cel` en `Splitsing` zijn de oude blokken (stijl in werkwijze.css,
// nog in gebruik op Kwaliteit en Beheer). `PaginaHero`, `Sectie`, `Intro`, `Beeld`, `Raster`
// en `RasterCel` zijn de blokken naar de opbouw van linear.app/ai (stijl in pagina.css).
import Link from 'next/link'
import { preload } from 'react-dom'
import { HeroVideo } from './HeroVideo'

export type Bijschrift = { titel: string; tekst: string; label?: string }

export function Kop({ id, title, description }: { id: string; title: string; description: string }) {
  return (
    <div className="feature-header pd-header">
      <h2 id={`${id}-titel`} className="feature-title">{title}</h2>
      <div className="feature-description"><p>{description}</p></div>
    </div>
  )
}

function Tekst({ b }: { b: Bijschrift }) {
  return (
    <figcaption className="pd-caption">
      <h3>{b.titel}{b.label && <span className="pd-label">{b.label}</span>}</h3>
      <p>{b.tekst}</p>
    </figcaption>
  )
}

/** Een groot vlak met lichtval van boven; het beeld loopt rechts en onder uit beeld. */
export function Paneel({ b, alt, children, variant }: { b: Bijschrift; alt: string; children: React.ReactNode; variant?: string }) {
  return (
    <figure className={`pd-panel${variant ? ` pd-panel-${variant}` : ''}`}>
      <div className="pd-panel-stage" role="img" aria-label={alt}>
        <div className="pd-panel-inner" aria-hidden="true">{children}</div>
      </div>
      <Tekst b={b} />
    </figure>
  )
}

/** Een cel uit een raster: één onderdeel van dichtbij, met het bijschrift eronder. */
export function Cel({ b, alt, children, variant }: { b: Bijschrift; alt: string; children: React.ReactNode; variant?: string }) {
  return (
    <figure className={`pd-cell${variant ? ` pd-cell-${variant}` : ''}`}>
      <div className="pd-cell-stage" role="img" aria-label={alt}>
        <div className="pd-cell-inner" aria-hidden="true">{children}</div>
      </div>
      <Tekst b={b} />
    </figure>
  )
}

/** Tekst met een lijst vinkjes naast één beeld. */
export function Splitsing({ id, title, description, punten, alt, children }: { id: string; title: string; description: string; punten: string[]; alt: string; children: React.ReactNode }) {
  return (
    <div className="pd-split">
      <div className="pd-split-text">
        <h2 id={`${id}-titel`} className="feature-title">{title}</h2>
        <p className="pd-lead">{description}</p>
        <ul className="pd-checks">
          {punten.map((p) => (
            <li key={p}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7" /></svg>
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div className="pd-cell pd-cell-solo">
        <div className="pd-cell-stage" role="img" aria-label={alt}>
          <div className="pd-cell-inner" aria-hidden="true">{children}</div>
        </div>
      </div>
    </div>
  )
}


/* ── De opbouw van linear.app/ai ──────────────────────────────────────────── */

export type Verwijzing = { label: string; href: string }

/**
 * Hero zoals op linear.app/ai: een kleine regel en een grote titel, links uitgelijnd, zonder
 * beschrijving en zonder knoppen, met een rustige achtergrondvideo die over de volle breedte en achter
 * de header loopt. `video` is de naam van de opnames in public/video, zonder formaat en extensie
 * (`hero-werkwijze` voor hero-werkwijze-desktop.* en hero-werkwijze-mobiel.*).
 */
export function PaginaHero({ eyebrow, titel, video }: { eyebrow: string; titel: string; video: string }) {
  const desktop = `/video/${video}-desktop-poster.webp`
  const mobiel = `/video/${video}-mobiel-poster.webp`
  // Het eerste beeld komt als eerste binnen en alleen in het formaat dat de bezoeker nodig heeft
  preload(mobiel, { as: 'image', media: '(max-width: 768px)', fetchPriority: 'high' })
  preload(desktop, { as: 'image', media: '(min-width: 769px)', fetchPriority: 'high' })
  const poster = { '--poster-desktop': `url(${desktop})`, '--poster-mobiel': `url(${mobiel})` } as React.CSSProperties
  return (
    <section className="lp-hero" aria-labelledby="lp-titel">
      <div className="lp-hero-media" aria-hidden="true" style={poster}>
        <HeroVideo naam={video} />
      </div>
      <div className="container lp-hero-inner">
        <p className="lp-eyebrow">{eyebrow}</p>
        <h1 id="lp-titel" className="lp-title">{titel}</h1>
      </div>
    </section>
  )
}

/** Een sectie: een intro, daarna een of meer beelden of rasters, met veel lucht ertussen. */
export function Sectie({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="lp-sectie" aria-labelledby={`${id}-titel`}>
      {children}
    </section>
  )
}

/**
 * Titel links, tekst rechts met een tekstlink eronder. Bouwt op `.feature-header` uit home.css. Het label
 * staat alleen op mobiel boven de titel, zoals het kopje boven elke sectie op linear.app/ai.
 */
export function Intro({ id, titel, tekst, link, label }: { id: string; titel: string; tekst: string; link?: Verwijzing; label?: string }) {
  return (
    <div className="feature-header lp-intro">
      {label && <p className="lp-intro-label">{label}</p>}
      <h2 id={`${id}-titel`} className="feature-title">{titel}</h2>
      <div className="feature-description">
        <p>{tekst}</p>
        {link && (
          <Link href={link.href} className="home-link">
            {link.label}
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </div>
  )
}

function BijschriftTekst({ b }: { b: Bijschrift }) {
  return (
    <figcaption className="lp-caption">
      <h3>{b.titel}{b.label && <span className="lp-label">{b.label}</span>}</h3>
      <p>{b.tekst}</p>
    </figcaption>
  )
}

/**
 * Een groot beeld over de volle breedte. `scherm` heeft een grijs verloop van boven en toont een of
 * twee appvensters die onderaan vervagen. `schema` is een omlijnd vlak zonder verloop, voor
 * diagrammen. `hoogte` is de hoogte van het vlak, `breedte` de breedte van de compositie (px).
 */
export function Beeld({ b, alt, variant = 'scherm', hoogte = 640, breedte = 1120, children }: {
  b: Bijschrift
  alt: string
  variant?: 'scherm' | 'schema'
  hoogte?: number
  breedte?: number
  children: React.ReactNode
}) {
  return (
    <figure className={`lp-beeld lp-beeld-${variant}`} style={{ '--stage-h': `${hoogte}px`, '--comp-w': `${breedte}px` } as React.CSSProperties}>
      <div className="lp-beeld-stage" role="img" aria-label={alt}>
        <div className="lp-beeld-inner" aria-hidden="true">{children}</div>
      </div>
      <BijschriftTekst b={b} />
    </figure>
  )
}

/** Een raster van twee of vier cellen met gedeelde randen, zoals op linear.app. */
export function Raster({ children }: { children: React.ReactNode }) {
  return <div className="lp-raster">{children}</div>
}

/**
 * Een cel in een raster: een uitsnede van het scherm die naar de randen en naar onderen vervaagt, met
 * daaronder titel en tekst. `stapel` legt twee kaarten schuin achter de voorste, `telefoon` houdt
 * de ruimte boven een telefoon kleiner.
 */
export function RasterCel({ b, alt, stapel = false, telefoon = false, children }: {
  b: Bijschrift
  alt: string
  stapel?: boolean
  telefoon?: boolean
  children: React.ReactNode
}) {
  return (
    <figure className={`lp-cel${telefoon ? ' lp-cel-telefoon' : ''}`}>
      <div className="lp-cel-stage" role="img" aria-label={alt}>
        <div className={`lp-cel-inner${stapel ? ' lp-stapel' : ''}`} aria-hidden="true">{children}</div>
      </div>
      <BijschriftTekst b={b} />
    </figure>
  )
}
