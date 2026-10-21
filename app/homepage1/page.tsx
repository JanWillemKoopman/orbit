import type { Metadata } from 'next'
import Link from 'next/link'
import { Fragment } from 'react'
import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { AppFrame } from '@/components/home/AppFrame'
import { Faq } from '@/components/home/Faq'
import { DemoKnop } from '@/components/homepage1/DemoKnop'
import { FotoPlek } from '@/components/homepage1/FotoPlek'
import { DrieAntwoorden, Effect, Kringloop, Meting, Vangnet, Vink, Werkoverzicht } from '@/components/homepage1/Visuals'
import { afsluiter, bureau, faq, hero, maker, oplevert, pijlers, probleem, voorbeeld, werkwijze } from '@/content/homepage1'
import './homepage1.css'

// Testpagina: niet in het menu, niet in de sitemap en niet te indexeren. noindex is geen beveiliging.
export const metadata: Metadata = {
  title: { absolute: 'Orbit – AI-zichtbaarheid als dienst voor marketingbureaus (test)' },
  description: hero.description,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

const PIJLER_BEELDEN = {
  meten: { beeld: <Meting />, alt: 'Voorbeeld: de zichtbaarheid van Hofstede Zonnepanelen steeg van 16 procent in mei naar 34 procent in oktober, met een marge van 6 procentpunt.' },
  schrijven: { beeld: <Vangnet />, alt: 'Voorbeeld: in een tekst over thuisbatterijen is de zin over tien jaar garantie geel, omdat er geen bron voor is. Je kunt de zin aanpassen of het bedrijf vragen.' },
  bewijzen: { beeld: <Effect />, alt: 'Voorbeeld: vóór publicatie werd het bedrijf bij 1 van 8 vragen genoemd, na 14 dagen bij 3 en na 28 dagen bij 5. Gestegen, buiten de marge.' },
} as const

// Zes delen, elk met één vraag van een bureau: wat is er aan de hand, hoe werkt het, kan ik het
// vertrouwen, wat levert het op, werkt het voor al mijn klanten, wie zit erachter. Daarna de bezwaren
// en de afsluiter. Elk deel heeft hooguit één beeld, en kleur staat alleen op wat ertoe doet.
export default function Homepage1() {
  return (
    <div className="home hp1">
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
        <p className="hp1-noot">{voorbeeld}</p>

        {/* 1. Wat er aan de hand is */}
        <Sectie id="probleem" titel={probleem.titel} tekst={probleem.tekst}>
          <Podium alt="Voorbeeld: op de vraag welk bedrijf in Amersfoort betrouwbaar zonnepanelen installeert, noemen ChatGPT en het AI-overzicht van Google Hofstede Zonnepanelen niet. Gemini noemt het als tweede.">
            <DrieAntwoorden />
          </Podium>
        </Sectie>

        {/* 2. Hoe het werkt */}
        <Sectie id="werkwijze" titel={werkwijze.titel} tekst={werkwijze.tekst}>
          <Kringloop stappen={werkwijze.stappen} />
        </Sectie>

        {/* 3. Waarom je het kunt vertrouwen: drie rijen met elk één beeld */}
        <section className="hp1-pijlers" aria-label="Meten, schrijven en bewijzen">
          <div className="keyline" />
          {pijlers.map((p, i) => {
            const b = PIJLER_BEELDEN[p.id as keyof typeof PIJLER_BEELDEN]
            return (
              <div className="hp1-pijler" key={p.id} id={p.id} data-omgekeerd={i % 2 === 1 || undefined}>
                <div className="hp1-pijler-tekst">
                  <h2 className="hp1-pijler-titel">{p.titel}</h2>
                  <p>{p.tekst}</p>
                  <Link href={p.link.href} className="home-link">{p.link.label} <span className="pijl" aria-hidden="true">→</span></Link>
                </div>
                <Podium alt={b.alt} klein>{b.beeld}</Podium>
              </div>
            )
          })}
          <div className="hp1-cta">
            <p>Zie hoe het werkt, in een demo van 15 minuten.</p>
            <DemoKnop className="btn btn-invert">Plan een gratis demo</DemoKnop>
          </div>
        </section>

        {/* 4. Wat het oplevert, voor het bureau en voor de klant */}
        <section className="hp1-sectie" aria-labelledby="oplevert-titel">
          <div className="keyline" />
          <h2 id="oplevert-titel" className="home-block-title">{oplevert.titel}</h2>
          <div className="hp1-oplevert">
            {[oplevert.bureau, oplevert.klant].map((kant) => (
              <div className="hp1-kant" key={kant.kop}>
                <h3>{kant.kop}</h3>
                <ul>
                  {kant.punten.map((p) => <li key={p}><span className="hp1-vink"><Vink /></span>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Werken voor al je klanten */}
        <Sectie id="bureau" titel={bureau.titel} tekst={bureau.tekst} link={bureau.link}>
          <Podium alt="Voorbeeld: het werkoverzicht van Bureau Meridiaan met vier klanten, hun zichtbaarheid en waar ze op wachten.">
            <Werkoverzicht />
          </Podium>
          <ul className="hp1-tegels">
            {bureau.tegels.map((t) => <li key={t.titel}><h3>{t.titel}</h3><p>{t.tekst}</p></li>)}
          </ul>
        </Sectie>

        {/* 6. Wie erachter zit */}
        <section className="hp1-sectie hp1-maker" aria-labelledby="maker-titel">
          <div className="keyline" />
          <div className="hp1-maker-rij">
            <FotoPlek
              wat="Portret van Jan-Willem Koopman"
              maat="Staand, 4:5, minimaal 1000 × 1250 px, natuurlijk licht."
              verhouding="4 / 5"
              referentie="de portretten bij What people say about Temso op temso.ai"
            />
            <div className="hp1-maker-tekst">
              <h2 id="maker-titel" className="hp1-pijler-titel">{maker.titel}</h2>
              <p>{maker.tekst}</p>
              <p className="hp1-eerlijk">{maker.eerlijk}</p>
              <Link href={maker.link.href} className="home-link">{maker.link.label} <span className="pijl" aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>

        <section className="home-block" aria-labelledby="hp1-faq">
          <div className="keyline" />
          <h2 id="hp1-faq" className="home-block-title">{faq.title}</h2>
          <Faq items={faq.items} />
        </section>
      </div>

      <section className="home-prefooter container hp1-afsluiter" aria-labelledby="hp1-afsluiter">
        <CtaAchtergrond />
        <h2 id="hp1-afsluiter">{afsluiter.title}</h2>
        <p>{afsluiter.description}</p>
        <div className="home-prefooter-actions">
          <PrefooterKnoppen />
        </div>
      </section>
    </div>
  )
}

function Sectie({ id, titel, tekst, link, children }: { id: string; titel: string; tekst: string; link?: { label: string; href: string }; children: React.ReactNode }) {
  return (
    <section id={id} className="hp1-sectie" aria-labelledby={`${id}-titel`}>
      <div className="keyline" />
      <div className="feature-header hp1-intro">
        <h2 id={`${id}-titel`} className="feature-title">{titel}</h2>
        <div className="feature-description">
          <p>{tekst}</p>
          {link && <Link href={link.href} className="home-link">{link.label} <span className="pijl" aria-hidden="true">→</span></Link>}
        </div>
      </div>
      {children}
    </section>
  )
}

// Het vlak waarin een beeld staat, met lichtval van boven. Rechtsonder staat klein dat het een voorbeeld is.
function Podium({ alt, klein = false, children }: { alt: string; klein?: boolean; children: React.ReactNode }) {
  return (
    <figure className={`hp1-podium${klein ? ' hp1-podium-klein' : ''}`}>
      <div className="hp1-podium-stage" role="img" aria-label={alt}>
        <div className="hp1-podium-inner" aria-hidden="true">{children}</div>
      </div>
      <figcaption className="hp1-podium-noot">Voorbeeld</figcaption>
    </figure>
  )
}
