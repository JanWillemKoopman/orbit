import type { Metadata } from 'next'
import Link from 'next/link'
import { DemoKnop } from '@/components/homepagina6/Demo'
import { AntwoordBron, ClaimControle, HeroKans, Hermeting, Pitch, Werkoverzicht } from '@/components/homepagina6/Visuals'
import { afsluiter, diensten, faq, hero, klanten, meta, onderzoeken, pitch, praktisch, rapporteren, uitvoeren } from '@/content/homepagina6'
import './homepagina6.css'

// Testpagina: een alternatief voor de homepage, uitgewerkt volgens de ontwerpbriefing van 21 oktober 2026.
// Niet in het menu, niet in de sitemap en niet te indexeren, zodat hij niet als homepage gevonden wordt
// voordat hij is beoordeeld. noindex is geen beveiliging.
export const metadata: Metadata = {
  title: { absolute: meta.titel },
  description: meta.beschrijving,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  openGraph: { title: meta.titel, description: meta.beschrijving },
}

// Header en footer komen uit de layout en blijven zoals op de rest van de site. Daartussen het verhaal van
// de briefing: hero, drie diensten als brug, vier productverhalen (overtuigen, onderzoeken, uitvoeren,
// rapporteren), het werkoverzicht, de praktische vragen, veelgestelde vragen en een afsluiter.
export default function Homepagina6() {
  return (
    <div className="hg">
      <section className="container hg-hero" aria-labelledby="hg-hero-titel">
        <p className="hg-label">{hero.label}</p>
        <h1 id="hg-hero-titel">{hero.titel}</h1>
        <p className="hg-intro">{hero.intro}</p>
        <div className="hg-acties">
          <DemoKnop plek="hero" />
          <a href="#hoe-orbit-werkt" className="hg-knop hg-knop-secundair" data-meet="workflow_view_click" data-plek="hero">{hero.werkwijze}</a>
        </div>
        <p className="hg-kanalen">{hero.kanalen}</p>
        <div className="hg-hero-beeld"><HeroKans /></div>
      </section>

      <section id="hoe-orbit-werkt" className="container hg-sectie hg-diensten" aria-labelledby="hg-diensten-titel">
        <div className="hg-kop">
          <h2 id="hg-diensten-titel">{diensten.titel}</h2>
          <p className="hg-intro">{diensten.intro}</p>
        </div>
        <ol className="hg-dienstenlijst">
          {diensten.items.map((d, i) => (
            <li key={d.titel}>
              <span className="hg-nummer" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3>{d.titel}</h3>
              <p>{d.tekst}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container hg-sectie hg-duo" aria-labelledby="hg-pitch-titel">
        <TekstBlok id="hg-pitch-titel" {...pitch} />
        <div className="hg-duo-beeld"><Pitch /></div>
      </section>

      <section className="container hg-sectie hg-duo hg-duo-omgekeerd" aria-labelledby="hg-onderzoeken-titel">
        <TekstBlok id="hg-onderzoeken-titel" {...onderzoeken} />
        <div className="hg-duo-beeld"><AntwoordBron /></div>
      </section>

      <section className="container hg-sectie hg-uitvoeren" aria-labelledby="hg-uitvoeren-titel">
        <div className="hg-uitvoeren-kop">
          <div className="hg-kop">
            <p className="hg-label">{uitvoeren.label}</p>
            <h2 id="hg-uitvoeren-titel">{uitvoeren.titel}</h2>
            <p className="hg-intro">{uitvoeren.intro}</p>
          </div>
          <div>
            <ol className="hg-stappen">
              {uitvoeren.stappen.map((s, i) => (
                <li key={s.titel}>
                  <span className="hg-stap-nr" aria-hidden="true">{i + 1}</span>
                  <p><strong>{s.titel}</strong> {s.tekst}</p>
                </li>
              ))}
            </ol>
            <p className="hg-micro">{uitvoeren.micro}</p>
          </div>
        </div>
        <ClaimControle />
        <p className="hg-onderschrift">{uitvoeren.onderschrift}</p>
        <ol className="hg-opvolging" aria-label="Opvolging na de controle">
          {uitvoeren.opvolging.map((o) => (
            <li key={o.stap} className={o.wie === 'Orbit' ? 'hg-opvolging-orbit' : undefined}>
              <span className="hg-opvolging-stap">{o.stap}</span>
              <span className="hg-opvolging-wie">{o.wie}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="hg-podium" aria-labelledby="hg-rapporteren-titel">
        <div className="container hg-sectie">
          <div className="hg-podium-kop">
            <div className="hg-kop">
              <p className="hg-label">{rapporteren.label}</p>
              <h2 id="hg-rapporteren-titel">{rapporteren.titel}</h2>
              <p className="hg-intro">{rapporteren.intro}</p>
            </div>
            <Punten punten={rapporteren.punten} />
          </div>
          <Hermeting />
        </div>
      </section>

      <section className="container hg-sectie hg-duo" aria-labelledby="hg-klanten-titel">
        <TekstBlok id="hg-klanten-titel" {...klanten} />
        <div className="hg-duo-beeld"><Werkoverzicht /></div>
      </section>

      <section className="container hg-sectie hg-praktisch" aria-labelledby="hg-praktisch-titel">
        <h2 id="hg-praktisch-titel" className="sr-only">{praktisch.kop}</h2>
        <div className="hg-praktisch-grid">
          {praktisch.blokken.map((b) => (
            <div key={b.titel} className="hg-praktisch-blok">
              <h3>{b.titel}</h3>
              <p>{b.tekst}</p>
              {b.link && (
                <Link href={b.link.href} className="hg-link" data-meet={'meet' in b.link ? b.link.meet : undefined} data-plek="praktisch">
                  {b.link.label} <span className="pijl" aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="container hg-sectie hg-faq" aria-labelledby="hg-faq-titel">
        <h2 id="hg-faq-titel">{faq.titel}</h2>
        {/* details/summary: elke vraag opent los, meerdere tegelijk, met het toetsenbord, en de antwoorden staan altijd in de html */}
        <div className="hg-faq-lijst">
          {faq.items.map((f) => (
            <details key={f.vraag} className="hg-faq-item">
              <summary>
                <span className="hg-faq-vraag">{f.vraag}</span>
                <span className="hg-faq-plus" aria-hidden="true" />
              </summary>
              <p>{f.antwoord}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="hg-afsluiter" aria-labelledby="hg-afsluiter-titel">
        <div className="container">
          <h2 id="hg-afsluiter-titel">{afsluiter.titel}</h2>
          <p className="hg-intro">{afsluiter.intro}</p>
          <DemoKnop plek="footer_cta" />
          <p className="hg-afsluiter-regel">{afsluiter.regel}</p>
        </div>
      </section>
    </div>
  )
}

function TekstBlok({ id, label, titel, intro, punten }: { id: string; label: string; titel: string; intro: string; punten: string[] }) {
  return (
    <div className="hg-duo-tekst">
      <p className="hg-label">{label}</p>
      <h2 id={id}>{titel}</h2>
      <p className="hg-intro">{intro}</p>
      <Punten punten={punten} />
    </div>
  )
}

function Punten({ punten }: { punten: string[] }) {
  return (
    <ul className="hg-punten">
      {punten.map((p) => (
        <li key={p}>
          <svg className="hg-punt-vink" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3.75 8.25l2.75 2.75 5.75-6" /></svg>
          {p}
        </li>
      ))}
    </ul>
  )
}
