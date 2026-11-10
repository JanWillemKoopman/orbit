import type { Metadata } from 'next'
import Link from 'next/link'
import { Fragment } from 'react'
import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { faq, hero, kwaliteit, prefooter, resultaat, showcase, statement, uitgelicht, uitgelichtStappen, uspIntro, usps } from '@/content/home'
import { AppFrame } from '@/components/home/AppFrame'
import { Showcase } from '@/components/home/Showcase'
import { CitaatScroll } from '@/components/home/CitaatScroll'
import { Faq } from '@/components/home/Faq'
import { DuoSlider } from '@/components/home/DuoSlider'
import { OpbrengstOpgebouwd, VerslagMaand } from '@/components/home/Resultaat'
import { AiLogos } from '@/components/home/AiLogos'
import { WhiteLabel } from '@/components/home/WhiteLabel'
import { HeroWerkoverzicht } from '@/components/agency/Visuals'
import { HeroMaand } from '@/components/product/Visuals'
import { BreinTabel, HerkomstCompositie } from '@/components/kennis/Visuals'
import { secties as kwaliteitSecties } from '@/content/kwaliteit'
import './werkwijze/werkwijze.css'
import './beheer/beheer.css'
import './pagina.css'
import './kwaliteit/kwaliteit.css'

export const metadata: Metadata = {
  title: { absolute: 'Orbit – Open source SEO & GEO software voor marketeers' },
  description: hero.description,
  alternates: { canonical: '/' },
}

// Opbouw en maten volgen linear.app: hero met nagebouwde app, vier voordelen voor bureaus naast elkaar, twee beelden met een link naar /beheer en /werkwijze, een grote tussenzin, drie nagebouwde schermen, de kwaliteit van de content, wat het werk oplevert, veelgestelde vragen en een afsluiter.
export default function HomePage() {

  return (
    <div className="home">
      <section className="container home-hero">
        <h1 className="home-title">
          {hero.title.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && <>{' '}<br className="home-title-break" /></>}
              <span className="hero-in" style={{ '--delay': `${0.4 + i * 0.1}s` } as React.CSSProperties}>{line}</span>
            </Fragment>
          ))}
        </h1>
        <div className="home-hero-row">
          <p className="home-hero-description hero-in" style={{ '--delay': '0.6s' } as React.CSSProperties}>{hero.description}</p>
          <Link href={hero.link.href} className="home-new-link">
            <span className="home-new hero-in hero-in-link">
              <span className="home-new-label">{hero.link.label}</span>
              <span className="home-new-title">{hero.link.titel} <span className="pijl" aria-hidden="true">→</span></span>
            </span>
          </Link>
        </div>
      </section>

      <div className="hero-stage">
        <div className="hero-backdrop" />
        <div className="hero-frame-wrapper">
          <AppFrame />
        </div>
      </div>

      <div className="container">
        <AiLogos />

        <section className="feature process usp" aria-labelledby="home-usp">
          <div className="keyline" />
          <div className="usp-blok usp-blok-breed">
            <UspBlok id="home-usp" />
          </div>
          <WhiteLabel />
        </section>

        <section className="home-uitgelicht" aria-label="Orbit voor bureaus">
          <div className="pd-grid">
            {uitgelicht.map((u, i) => (
              <figure className="pd-cell hu-cell" key={u.href}>
                <div className={`pd-cell-stage hu-stage hu-stage-${i === 0 ? 'account' : 'ronde'}`} role="img" aria-label={u.alt}>
                  <div className="hu-inner" aria-hidden="true">{i === 0 ? <HeroWerkoverzicht /> : <HeroMaand stappen={uitgelichtStappen} />}</div>
                </div>
                <figcaption className="pd-caption hu-caption">
                  <div>
                    <h3>{u.titel}</h3>
                    <p>{u.tekst}</p>
                  </div>
                  <Link href={u.href} className="home-link hu-link">
                    Leer meer<span className="sr-only"> over {u.titel.toLowerCase()}</span> <span className="feature-plus" aria-hidden="true">→</span>
                  </Link>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <div className="home-statement">
          <CitaatScroll strong={statement.strong} rest={statement.rest} />
        </div>

        <section aria-label={showcase.title}>
          <Showcase />
        </section>

        <section className="feature hk" aria-labelledby="home-kwaliteit">
          <div className="keyline" />
          <div className="feature-header">
            <h2 id="home-kwaliteit" className="feature-title">{kwaliteit.title}</h2>
            <div className="feature-description">
              <p>{kwaliteit.description}</p>
              <Link href={kwaliteit.link.href} className="home-link">{kwaliteit.link.label} <span className="pijl" aria-hidden="true">→</span></Link>
            </div>
          </div>
          <DuoSlider bijschriften={[kwaliteitSecties.weten.beeld, kwaliteitSecties.probleem.beeld]}>
            <figure className="lp-beeld lp-beeld-scherm">
              <div className="lp-beeld-stage" role="img" aria-label="Feiten en kennis van Lindeman Warmte als tabel: per feit de bron en of het in een tekst mag. Een vermoeden en een verboden woord mogen nooit.">
                <div className="lp-beeld-inner" aria-hidden="true"><BreinTabel /></div>
              </div>
              <figcaption className="lp-caption">
                <h3>{kwaliteitSecties.weten.beeld.titel}</h3>
                <p>{kwaliteitSecties.weten.beeld.tekst}</p>
              </figcaption>
            </figure>
            <figure className="lp-beeld lp-beeld-scherm">
              <div className="lp-beeld-stage" role="img" aria-label="Een alinea over een hybride warmtepomp. Elke harde bewering heeft een nummer met de bron: bevestigd door de klant, uit de tarievenlijst en van de garantiepagina.">
                <div className="lp-beeld-inner" aria-hidden="true"><HerkomstCompositie /></div>
              </div>
              <figcaption className="lp-caption">
                <h3>{kwaliteitSecties.probleem.beeld.titel}</h3>
                <p>{kwaliteitSecties.probleem.beeld.tekst}</p>
              </figcaption>
            </figure>
          </DuoSlider>
        </section>

        <section className="feature hk hr" aria-labelledby="home-resultaat">
          <div className="keyline" />
          <div className="feature-header">
            <h2 id="home-resultaat" className="feature-title">{resultaat.title}</h2>
            <div className="feature-description">
              <p>{resultaat.description}</p>
            </div>
          </div>
          <DuoSlider bijschriften={resultaat.beelden}>
            {resultaat.beelden.map((b, i) => (
              <figure className="lp-beeld lp-beeld-scherm" key={b.titel}>
                <div className="lp-beeld-stage" role="img" aria-label={b.alt}>
                  <div className="lp-beeld-inner" aria-hidden="true">{i === 0 ? <VerslagMaand /> : <OpbrengstOpgebouwd />}</div>
                </div>
                <figcaption className="lp-caption">
                  <h3>{b.titel}</h3>
                  <p>{b.tekst}</p>
                </figcaption>
              </figure>
            ))}
          </DuoSlider>
        </section>

        <section className="home-block" aria-labelledby="home-faq">
          <div className="keyline" />
          <h2 id="home-faq" className="home-block-title">{faq.title}</h2>
          <Faq items={faq.items} />
        </section>
      </div>

      <section className="home-prefooter container">
        <CtaAchtergrond />
        <h2>{prefooter.title}</h2>
        <div className="home-prefooter-actions">
          <PrefooterKnoppen />
        </div>
      </section>
    </div>
  )
}

// Kop, uitleg en de vier voordelen voor bureaus: per voordeel een titel met uitleg, op elke breedte.
function UspBlok({ id }: { id: string }) {
  return (
    <>
      <div className="feature-header">
        <h2 id={id} className="feature-title">{uspIntro.title}</h2>
        <div className="feature-description">
          <p>{uspIntro.description}</p>
        </div>
      </div>
      <ul className="process-steps usp-steps usp-tekst">
        {usps.map((usp) => (
          <li className="process-step" key={usp.titel}>
            <span className="process-number usp-vink" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M3.75 8.25l2.75 2.75 5.75-6" /></svg>
            </span>
            <h3 className="process-title">{usp.titel}</h3>
            <p className="process-description usp-uitleg">{usp.uitleg}</p>
          </li>
        ))}
      </ul>
    </>
  )
}
