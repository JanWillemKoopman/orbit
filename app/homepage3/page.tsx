import type { Metadata } from 'next'
import Link from 'next/link'
import { Fragment } from 'react'
import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { LogoMark } from '@/components/Logo'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { AppFrame } from '@/components/home/AppFrame'
import { DemoKnop } from '@/components/homepage1/DemoKnop'
import { MerkIcoon } from '@/components/homepage1/Visuals'
import { BewijzenCompositie, ContentCompositie, Deellink, Figuur, GeleZin, SchalenCompositie, VerkopenCompositie } from '@/components/homepage3/Visuals'
import { afsluiter, bewijzen, content, contentCellen, hero, kanalen, kostenNoot, pakket, schalen, tussenCta, verkopen, vertrouwen, type Onderdeel, type Sectie as SectieTekst } from '@/content/homepage3'
import './homepage3.css'

// Testpagina: niet in het menu, niet in de sitemap en niet te indexeren. noindex is geen beveiliging.
export const metadata: Metadata = {
  title: { absolute: 'Orbit – Het complete GEO-pakket voor marketingbureaus (test 3)' },
  description: hero.description,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

// Negen delen in de opbouw van linear.app: hero, de kanalen als logorij, het pakket als statement met drie
// figuren, vier secties die elk beginnen bij wat het bureau wint (verkopen, content, bewijzen, schalen),
// twee kaarten met de principes van de maker en de afsluiter. De functies staan onder de plusjes.
export default function Homepage3() {
  return (
    <div className="home hp3">
      {/* 1. Hero */}
      <section className="container home-hero">
        <h1 className="home-title">
          {hero.title.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && <>{' '}<br /></>}
              <span className="blur-in" style={{ '--i': i } as React.CSSProperties}>{line}</span>
            </Fragment>
          ))}
        </h1>
        <div className="home-hero-row">
          <p className="home-hero-description blur-in" style={{ '--i': 2 } as React.CSSProperties}>{hero.description}</p>
          <DemoKnop className="home-new-link">
            <span className="home-new blur-in" style={{ '--i': 3 } as React.CSSProperties}>
              <span className="home-new-label">{hero.link.label}</span>
              <span className="home-new-title">{hero.link.titel} <span className="pijl" aria-hidden="true">→</span></span>
            </span>
          </DemoKnop>
        </div>
      </section>

      <div className="hero-stage">
        <div className="hero-backdrop" />
        <div className="hero-frame-wrapper">
          <AppFrame />
        </div>
      </div>

      <div className="container">
        {/* 2. Waar Orbit meet */}
        <div className="hp3-kanalen">
          <ul aria-label="Waar Orbit meet">
            <li><MerkIcoon merk="chatgpt" size={22} />ChatGPT</li>
            <li><MerkIcoon merk="gemini" size={22} />Gemini</li>
            <li><MerkIcoon merk="google" size={22} />AI-overzicht</li>
            <li><MerkIcoon merk="google" size={22} />Search Console</li>
          </ul>
          <p className="hp3-mono">{kanalen.onderschrift}</p>
        </div>

        {/* 3. Het pakket */}
        <section className="hp3-pakket" aria-labelledby="hp3-pakket">
          <h2 id="hp3-pakket" className="hp3-statement"><strong>{pakket.sterk}</strong> {pakket.rest}</h2>
          <ul className="hp3-figuren">
            {pakket.diensten.map((d, i) => (
              <li key={d.naam}>
                <a href={d.href} className="hp3-figuur">
                  <span className="hp3-mono">{d.fig}</span>
                  <Figuur nummer={i as 0 | 1 | 2} />
                  <span className="hp3-figuur-tekst">
                    <span className="hp3-figuur-naam">{d.naam}<em>{d.ritme}</em></span>
                    <span>{d.tekst}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="hp3-noot">{kanalen.noot}</p>
        </section>

        {/* 4. Verkopen */}
        <Sectie s={verkopen} alt="Voorbeeld: ChatGPT noemt bij de vraag naar kunststof kozijnen in Haarlem drie andere bedrijven. Daarnaast de pitch van Bureau Kade voor Brouwer Kozijnen: bij 7 van de 10 vragen raadt ChatGPT een ander bedrijf aan. Een melding zegt dat de pitch zojuist geopend is.">
          <VerkopenCompositie />
        </Sectie>

        {/* 5. Content maken */}
        <Sectie
          s={content}
          alt="Voorbeeld: het contentplan van november met tien pagina's voor Brouwer Kozijnen, en een geschreven dienstpagina over kunststof kozijnen met metatitel, metabeschrijving, veelgestelde vragen, gestructureerde gegevens en interne links."
          extra={
            <div className="hp3-cellen">
              <figure className="hp3-cel">
                <div className="hp3-cel-stage" role="img" aria-label="Voorbeeld: de zin over vijftien jaar garantie is geel, omdat er geen bron voor is. Je kunt hem aanpassen of het bedrijf vragen."><div aria-hidden="true"><GeleZin /></div></div>
                <figcaption><h3>{contentCellen[0].titel}</h3><p>{contentCellen[0].tekst}</p></figcaption>
              </figure>
              <figure className="hp3-cel">
                <div className="hp3-cel-stage" role="img" aria-label="Voorbeeld: drie open vragen voor Brouwer Kozijnen en de knop Deellink kopiëren. De klant heeft geen account nodig."><div aria-hidden="true"><Deellink /></div></div>
                <figcaption><h3>{contentCellen[1].titel}</h3><p>{contentCellen[1].tekst}</p></figcaption>
              </figure>
            </div>
          }
        >
          <ContentCompositie />
        </Sectie>

        <div className="hp3-tussen">
          <p>{tussenCta}</p>
          <DemoKnop className="btn btn-invert">Plan een gratis demo</DemoKnop>
        </div>

        {/* 6. Bewijzen */}
        <Sectie s={bewijzen} alt="Voorbeeld: de zichtbaarheid van Brouwer Kozijnen steeg van 12 procent in juni naar 31 procent in november, met een marge van 6. De pagina over kunststof kozijnen werd vóór publicatie bij 1 van 8 vragen genoemd en na 28 dagen bij 5, met 214 klikken uit Google. Daarnaast het verslag van november van Bureau Kade.">
          <BewijzenCompositie />
        </Sectie>

        {/* 7. Schalen */}
        <Sectie s={schalen} noot={kostenNoot} alt="Voorbeeld: het werkoverzicht van Bureau Kade met zeven klanten, waarvan er zes zijn aangevinkt. Het venster Start de maand toont 42 pagina's, de maandmeting aan en geschatte AI-kosten van ongeveer 35 euro.">
          <SchalenCompositie />
        </Sectie>

        {/* 8. Vertrouwen */}
        <section className="hp3-vertrouwen" aria-label="Waarom je Orbit kunt vertrouwen">
          <div className="hp3-kaarten">
            {vertrouwen.kaarten.map((k, i) => (
              <figure className="hp3-kaart" data-variant={i} key={k.citaat}>
                <blockquote>&ldquo;{k.citaat}&rdquo;</blockquote>
                <figcaption>
                  <span className="hp3-kaart-logo"><LogoMark size={22} /></span>
                  <span><b>{k.naam}</b><em>{k.rol}</em></span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="hp3-regel">
            <p>{vertrouwen.regel.tekst}</p>
            <Link href={vertrouwen.regel.link.href} className="home-link">{vertrouwen.regel.link.label} <span className="pijl" aria-hidden="true">→</span></Link>
          </div>
        </section>
      </div>

      {/* 9. Afsluiter */}
      <section className="home-prefooter container hp3-afsluiter" aria-labelledby="hp3-afsluiter">
        <CtaAchtergrond />
        <h2 id="hp3-afsluiter">{afsluiter.title[0]}<br />{afsluiter.title[1]}</h2>
        <div className="home-prefooter-actions">
          <PrefooterKnoppen />
        </div>
        <ul className="hp3-start-lijst">
          {afsluiter.start.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </section>
    </div>
  )
}

/** Een sectie zoals op linear.app: titel links, uitleg rechts, één brede compositie en de onderdelen eronder. */
function Sectie({ s, alt, noot, extra, children }: { s: SectieTekst; alt: string; noot?: string; extra?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={s.id} className="hp3-sectie" aria-labelledby={`${s.id}-titel`}>
      <div className="keyline" />
      <div className="feature-header hp3-intro">
        <h2 id={`${s.id}-titel`} className="feature-title">{s.titel}</h2>
        <div className="feature-description">
          <p>{s.tekst}</p>
          {s.link && <Link href={s.link.href} className="home-link">{s.link.label} <span className="pijl" aria-hidden="true">→</span></Link>}
        </div>
      </div>
      <figure className="hp3-podium">
        <div className="hp3-podium-stage" role="img" aria-label={alt}>
          <div className="hp3-podium-inner" aria-hidden="true">{children}</div>
        </div>
        <figcaption className="hp3-podium-noot">Voorbeeld</figcaption>
      </figure>
      {extra}
      <Onderdelen items={s.onderdelen} />
      {noot && <p className="hp3-sectie-noot">{noot}</p>}
    </section>
  )
}

/** De onderdelen onder een sectie: een naam met een plus die openklapt tot één zin uitleg. */
function Onderdelen({ items }: { items: Onderdeel[] }) {
  const helft = Math.ceil(items.length / 2)
  return (
    <div className="hp3-onderdelen">
      <p className="hp3-onderdelen-label">Zo doet Orbit het</p>
      <div className="hp3-onderdelen-kolommen">
        {[items.slice(0, helft), items.slice(helft)].map((kolom, i) => (
          <ul key={i}>
            {kolom.map((o) => (
              <li key={o.naam}>
                <details className="hp3-onderdeel">
                  <summary>{o.naam}<span className="hp3-plus" aria-hidden="true">+</span></summary>
                  <p>{o.tekst}</p>
                </details>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
