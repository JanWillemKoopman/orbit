import type { Metadata } from 'next'
import Link from 'next/link'
import { DemoKnop } from '@/components/homepagina6/Demo'
import { Pagina2 } from '@/components/homepagina6/Pagina2'
import { Pagina3 } from '@/components/homepagina6/Pagina3'
import { IsoAudit, IsoMaanden, IsoPitch } from '@/components/homepagina6/Isometrie'
import { Aanbod, Bibliotheek, Brief, Clusters, Concurrenten, Contentplan, FeitenKennis, Feitencontrole, Kalender, KansBewijs, Meetplan, NieuwBedrijf, Onboarding, Ontdekken, Overzicht, Planbord, Publiceren, VragenTelefoon, Zichtbaarheid, Zoekverkeer } from '@/components/homepagina6/Schermen'
import { AntwoordBron, ClaimControle, DEMO, Figuur, HeroKans, Hermeting, Pitch, Werkoverzicht } from '@/components/homepagina6/Visuals'
import { afsluiter, diensten, faq, hero, hoofdstukken, klanten, meta, onderzoeken, pitch, praktisch, rapporteren, schermen, uitvoeren, type Scherm } from '@/content/homepagina6'
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
// de briefing, in de opbouw van linear.app: een hero met de app in één groot venster en een zin in twee
// tinten met drie FIG-tekeningen. Daarna een rondleiding door de app in zes hoofdstukken, in de volgorde
// van het werk. Een sectie is groot (kop links, uitleg rechts, een breed beeld en een rij punten) of
// half (tekst naast een beeld, om en om links en rechts), zodat het ritme niet eentonig wordt.
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
          <Figuur nr="0.4" titel={pitch.beeld.titel}><Pitch /></Figuur>
          <Punten punten={pitch.punten} />
        </div>
      </section>

      <Hoofdstuk {...hoofdstukken.inrichten} />
      <Half id="nieuw-bedrijf" nr="1.1" s={schermen.nieuwBedrijf}><NieuwBedrijf /></Half>
      <Groot id="feiten" nr="1.2" s={schermen.feiten}><FeitenKennis /></Groot>
      <Half id="aanbod" nr="1.3" s={schermen.aanbod} omgekeerd><Aanbod /></Half>
      <Groot id="onboarding" nr="1.4" s={schermen.onboarding}><Onboarding /></Groot>

      <Hoofdstuk {...hoofdstukken.meten} />
      <Half id="clusters" nr="2.1" s={schermen.clusters}><Clusters /></Half>
      <Half id="ontdekken" nr="2.2" s={schermen.ontdekken} omgekeerd><Ontdekken /></Half>
      <Half id="meetplan" nr="2.3" s={schermen.meetplan}><Meetplan /></Half>
      <Groot id="zichtbaarheid" nr="2.4" s={schermen.zichtbaarheid}><Zichtbaarheid /></Groot>
      <section className="lf-sectie" aria-labelledby="hg-onderzoeken-titel">
        <div className="container">
          <Intro id="hg-onderzoeken-titel" {...onderzoeken} />
          <Figuur nr="2.5" titel={onderzoeken.beeld.titel}><AntwoordBron /></Figuur>
          <Punten punten={onderzoeken.punten} />
        </div>
      </section>
      <Half id="concurrenten" nr="2.6" s={schermen.concurrenten} omgekeerd><Concurrenten /></Half>
      <Half id="kansen" nr="2.7" s={schermen.kansen}><KansBewijs /></Half>

      <Hoofdstuk {...hoofdstukken.plannen} />
      <Groot id="contentplan" nr="3.1" s={schermen.contentplan}><Contentplan /></Groot>
      <Half id="plannen" nr="3.2" s={schermen.plannen}><Planbord /></Half>
      <Groot id="kalender" nr="3.3" s={schermen.kalender}><Kalender /></Groot>
      <Half id="vragen" nr="3.4" s={schermen.vragen} omgekeerd><VragenTelefoon /></Half>

      <Hoofdstuk {...hoofdstukken.schrijven} />
      <Half id="brief" nr="4.1" s={schermen.brief}><Brief /></Half>
      <section className="lf-sectie" aria-labelledby="hg-uitvoeren-titel">
        <div className="container">
          <Intro id="hg-uitvoeren-titel" {...uitvoeren} />
          <Figuur nr="4.2" titel={uitvoeren.beeld.titel} tekst={uitvoeren.beeld.tekst} className="lf-met-lijst">
            {/* De stappen staan als echte tekst naast het venster, in de mono-opmaak die Linear daarvoor gebruikt */}
            <ol className="lf-stappen">
              {uitvoeren.stappen.map((st, i) => (
                <li key={st.titel}>
                  <span className="lf-stap-titel">{i + 1}. {st.titel.replace(/\.$/, '')}</span>
                  <span className="lf-stap-tekst">{st.tekst}</span>
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
      <Groot id="bibliotheek" nr="4.3" s={schermen.bibliotheek}><Bibliotheek /></Groot>
      <Half id="publiceren" nr="4.4" s={schermen.publiceren} omgekeerd><Publiceren /></Half>

      <Hoofdstuk {...hoofdstukken.bewijzen} />
      <section className="lf-sectie" aria-labelledby="hg-rapporteren-titel">
        <div className="container">
          <Intro id="hg-rapporteren-titel" {...rapporteren} />
          <Figuur nr="5.1" titel={rapporteren.beeld.titel} tekst={rapporteren.beeld.tekst} className="lf-podium-breed"><Hermeting /></Figuur>
          <Punten punten={rapporteren.punten} />
        </div>
      </section>
      <Groot id="zoekverkeer" nr="5.2" s={schermen.zoekverkeer}><Zoekverkeer /></Groot>
      <Half id="feitencontrole" nr="5.3" s={schermen.feitencontrole}><Feitencontrole /></Half>

      <Hoofdstuk {...hoofdstukken.maand} />
      <Groot id="overzicht" nr="6.1" s={schermen.overzicht}><Overzicht /></Groot>
      <section className="lf-sectie" aria-labelledby="hg-klanten-titel">
        <div className="container">
          <Intro id="hg-klanten-titel" {...klanten} />
          <Figuur nr="6.2" titel={klanten.beeld.titel}><Werkoverzicht /></Figuur>
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

      {/* Een tweede pagina met tien beelden in drie formaten, als alternatief voor de rondleiding hierboven */}
      <Pagina2 />

      {/* Een derde pagina: tien voordelen voor bureaus, elk met twee beelden in het raster van linear.app */}
      <Pagina3 />
    </div>
  )
}

// Het begin van een hoofdstuk: een nummer, de naam van het hoofdstuk en een zin.
function Hoofdstuk({ nr, titel, tekst }: { nr: string; titel: string; tekst: string }) {
  return (
    <div className="lf-hoofdstuk">
      <div className="container">
        <p className="lf-mono">Hoofdstuk {nr}</p>
        <h2 className="lf-hoofdstuk-titel">{titel}</h2>
        <p className="lf-hoofdstuk-tekst">{tekst}</p>
      </div>
    </div>
  )
}

// Een grote sectie: kop links, uitleg rechts, een breed beeld en de punten eronder.
function Groot({ id, nr, s, children }: { id: string; nr: string; s: Scherm; children: React.ReactNode }) {
  return (
    <section id={id} className="lf-sectie" aria-labelledby={`${id}-titel`}>
      <div className="container">
        <Intro id={`${id}-titel`} {...s} />
        <Figuur nr={nr} titel={s.beeld.titel} tekst={s.beeld.tekst}>{children}</Figuur>
        <Punten punten={s.punten} />
      </div>
    </section>
  )
}

// Een halve sectie: de tekst naast een kleiner beeld. Met `omgekeerd` staat het beeld links.
function Half({ id, nr, s, omgekeerd = false, children }: { id: string; nr: string; s: Scherm; omgekeerd?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} className={omgekeerd ? 'lf-sectie lf-half lf-half-omgekeerd' : 'lf-sectie lf-half'} aria-labelledby={`${id}-titel`}>
      <div className="container lf-half-raster">
        <div className="lf-half-tekst">
          <p className="lf-label">{s.label}</p>
          <h2 id={`${id}-titel`}>{s.titel}</h2>
          <p className="lf-intro-tekst">{s.intro}</p>
          <ul className="lf-half-punten">
            {s.punten.map((p) => <li key={p}><Vink />{p}</li>)}
          </ul>
        </div>
        <Figuur nr={nr} titel={s.beeld.titel} tekst={s.beeld.tekst} className="lf-klein">{children}</Figuur>
      </div>
    </section>
  )
}

const Vink = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3.75 8.25l2.75 2.75 5.75-6" /></svg>

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
