import type { Metadata } from 'next'
import Link from 'next/link'
import { DemoKnop } from '@/components/homepagina6/Demo'
import { IsoAudit, IsoMaanden, IsoPitch } from '@/components/homepagina6/Isometrie'
import { AntwoordBron, ClaimControle, DEMO, Figuur, HeroKans, Hermeting, Pitch, Werkoverzicht } from '@/components/homepagina6/Visuals'
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

const ISO = [IsoPitch, IsoAudit, IsoMaanden]

// Header en footer komen uit de layout en blijven zoals op de rest van de site. Daartussen het verhaal van
// de briefing, in de opbouw van linear.app: een hero met de app in één groot venster, een zin in twee
// tinten met drie FIG-tekeningen, en daarna per productverhaal kop links, uitleg rechts, één groot beeld
// met bijschrift en een rij met de punten. Secties worden gescheiden door lucht en een dunne lijn.
export default function Homepagina6() {
  return (
    <div className="hg">
      <section className="container hg-hero" aria-labelledby="hg-hero-titel">
        <p className="lf-label">{hero.label}</p>
        <h1 id="hg-hero-titel">{hero.titel}</h1>
        <p className="hg-hero-intro">{hero.intro}</p>
        <div className="hg-acties">
          <DemoKnop plek="hero" />
          <a href="#hoe-orbit-werkt" className="hg-knop hg-knop-secundair" data-meet="workflow_view_click" data-plek="hero">{hero.werkwijze}</a>
        </div>
        <p className="hg-kanalen">{hero.kanalen}</p>
      </section>

      <div className="container lf-hero-podium">
        <HeroKans />
        <p className="lf-mono">{DEMO}</p>
      </div>

      <section id="hoe-orbit-werkt" className="lf-sectie" aria-labelledby="hg-diensten-titel">
        <div className="container">
          <div className="lf-statement">
            <h2 id="hg-diensten-titel">{diensten.titel}</h2> <p>{diensten.intro}</p>
          </div>
          <ol className="lf-figs">
            {diensten.items.map((d, i) => {
              const Tekening = ISO[i]
              return (
                <li key={d.titel}>
                  <span className="lf-mono" aria-hidden="true">Fig 0.{i + 1}</span>
                  <Tekening />
                  <h3>{d.titel}</h3>
                  <p>{d.tekst}</p>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section className="lf-sectie" aria-labelledby="hg-pitch-titel">
        <div className="container">
          <Intro id="hg-pitch-titel" {...pitch} />
          <Figuur nr="1.1" titel={pitch.beeld.titel}><Pitch /></Figuur>
          <Punten punten={pitch.punten} />
        </div>
      </section>

      <section className="lf-sectie" aria-labelledby="hg-onderzoeken-titel">
        <div className="container">
          <Intro id="hg-onderzoeken-titel" {...onderzoeken} />
          <Figuur nr="2.1" titel={onderzoeken.beeld.titel}><AntwoordBron /></Figuur>
          <Punten punten={onderzoeken.punten} />
        </div>
      </section>

      <section className="lf-sectie" aria-labelledby="hg-uitvoeren-titel">
        <div className="container">
          <Intro id="hg-uitvoeren-titel" {...uitvoeren} />
          <Figuur nr="3.1" titel={uitvoeren.beeld.titel} tekst={uitvoeren.beeld.tekst} className="lf-met-lijst">
            {/* De stappen staan als echte tekst naast het venster, in de mono-opmaak die Linear daarvoor gebruikt */}
            <ol className="lf-stappen">
              {uitvoeren.stappen.map((s, i) => (
                <li key={s.titel}>
                  <span className="lf-stap-titel">{i + 1}. {s.titel.replace(/\.$/, '')}</span>
                  <span className="lf-stap-tekst">{s.tekst}</span>
                </li>
              ))}
            </ol>
            <ClaimControle />
          </Figuur>
          <div className="lf-opvolging">
            <ol aria-label="Opvolging na de controle">
              {uitvoeren.opvolging.map((o) => (
                <li key={o.stap} className={o.wie === 'Orbit' ? 'lf-opvolging-orbit' : undefined}>
                  <span className="lf-opvolging-stap">{o.stap}</span>
                  <span className="lf-opvolging-wie">{o.wie}</span>
                </li>
              ))}
            </ol>
            <p>{uitvoeren.micro}</p>
          </div>
        </div>
      </section>

      <section className="lf-sectie" aria-labelledby="hg-rapporteren-titel">
        <div className="container">
          <Intro id="hg-rapporteren-titel" {...rapporteren} />
          <Figuur nr="4.1" titel={rapporteren.beeld.titel} tekst={rapporteren.beeld.tekst} className="lf-podium-breed"><Hermeting /></Figuur>
          <Punten punten={rapporteren.punten} />
        </div>
      </section>

      <section className="lf-sectie" aria-labelledby="hg-klanten-titel">
        <div className="container">
          <Intro id="hg-klanten-titel" {...klanten} />
          <Figuur nr="5.1" titel={klanten.beeld.titel}><Werkoverzicht /></Figuur>
          <Punten punten={klanten.punten} />
        </div>
      </section>

      <section className="lf-sectie" aria-labelledby="hg-praktisch-titel">
        <div className="container">
          <h2 id="hg-praktisch-titel" className="sr-only">{praktisch.kop}</h2>
          <div className="lf-linkrij">
            {praktisch.blokken.map((b) => (
              <div key={b.titel}>
                <h3>{b.titel}</h3>
                <p>{b.tekst}</p>
                {b.link && (
                  <Link href={b.link.href} className="lf-link" data-meet={'meet' in b.link ? b.link.meet : undefined} data-plek="praktisch">
                    {b.link.label} <span className="pijl" aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lf-sectie" aria-labelledby="hg-faq-titel">
        <div className="container lf-faq">
          <h2 id="hg-faq-titel">{faq.titel}</h2>
          {/* details/summary: elke vraag opent los, meerdere tegelijk, met het toetsenbord, en de antwoorden staan altijd in de html */}
          <div className="lf-faq-lijst">
            {faq.items.map((f) => (
              <details key={f.vraag}>
                <summary>
                  <span>{f.vraag}</span>
                  <span className="lf-faq-plus" aria-hidden="true" />
                </summary>
                <p>{f.antwoord}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="lf-sectie hg-afsluiter" aria-labelledby="hg-afsluiter-titel">
        <div className="container">
          <h2 id="hg-afsluiter-titel">{afsluiter.titel}</h2>
          <p className="hg-afsluiter-intro">{afsluiter.intro}</p>
          <DemoKnop plek="footer_cta" />
          <p className="lf-mono hg-afsluiter-regel">{afsluiter.regel}</p>
        </div>
      </section>
    </div>
  )
}

// Kop links, uitleg rechts, zoals elke sectie op linear.app begint.
function Intro({ id, label, titel, intro }: { id: string; label: string; titel: string; intro: string }) {
  return (
    <div className="lf-intro">
      <div>
        <p className="lf-label">{label}</p>
        <h2 id={id}>{titel}</h2>
      </div>
      <p className="lf-intro-tekst">{intro}</p>
    </div>
  )
}

// De rij onder een beeld: drie kolommen met dunne lijnen ertussen.
function Punten({ punten }: { punten: string[] }) {
  return (
    <ul className="lf-punten">
      {punten.map((p) => (
        <li key={p}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3.75 8.25l2.75 2.75 5.75-6" /></svg>
          {p}
        </li>
      ))}
    </ul>
  )
}
