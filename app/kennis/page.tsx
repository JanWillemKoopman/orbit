import type { Metadata } from 'next'
import Link from 'next/link'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { afsluiter, demoHref, hero, meta, ronde, secties } from '@/content/kennis'
import { Cel, Kop, Paneel, Splitsing } from '@/components/product/Blokken'
import * as V from '@/components/kennis/Visuals'
import '../product/product.css'
import '../agency/agency.css'
import './kennis.css'

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/kennis' },
  openGraph: { title: `${meta.title} – ORBIT ENGINE`, description: meta.description, url: '/kennis', images: [{ url: '/images/product/og-kennis.png', width: 1200, height: 630 }] },
}

// Zelfde opbouw en vormgeving als /product en /agency. Het verhaal in vier stappen: AI verzint, het
// brein weet wat klopt, de schrijver krijgt alleen dat, en een zin zonder bron wordt geel.

function Vink() {
  return <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7" /></svg>
}

export default function KennisPage() {
  const s = secties
  return (
    <div className="home pd">
      {/* 1. Hero */}
      <section className="container pd-hero" aria-labelledby="pd-titel">
        <p className="pd-eyebrow">{hero.eyebrow}</p>
        <h1 id="pd-titel" className="home-title pd-title">{hero.title}</h1>
        <div className="pd-hero-row">
          <p className="pd-hero-description">{hero.description}</p>
          <div className="pd-actions">
            <Link href={demoHref} className="btn btn-lg btn-invert">{hero.cta}</Link>
            <a href="#probleem" className="btn btn-lg btn-secondary">{hero.secondary}</a>
          </div>
        </div>
      </section>

      <div className="container pd-hero-visual">
        <Paneel b={hero.beeld} variant="kf-hero" alt="Een alinea over een hybride warmtepomp. Elke bewering heeft een nummer met de bron: bevestigd door de klant, uit de tarievenlijst en van de garantiepagina.">
          <V.HeroHerkomst />
        </Paneel>
        <p className="pd-note">{hero.note}</p>
        <nav className="pd-ronde" aria-label="Kennis en feiten">
          <ol>
            {ronde.map((stap, i) => (
              <li key={stap.label}>
                <a href={stap.href}><span className="pd-ronde-nr" aria-hidden="true">{i + 1}</span>{stap.label}</a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div className="container">
        {/* 2. Het probleem */}
        <section id={s.probleem.id} className="feature pd-section" aria-labelledby={`${s.probleem.id}-titel`}>
          <div className="keyline" />
          <Kop {...s.probleem} />
          <div className="pd-grid">
            <Cel b={s.probleem.cellen[0]} alt="Een tekst van een gewone AI-schrijver met drie verzonnen beweringen: installatie binnen 48 uur, 10 jaar garantie en een keurmerk.">
              <V.GewoneAi />
            </Cel>
            <Cel b={s.probleem.cellen[1]} alt="Dezelfde tekst in ORBIT ENGINE: twee beweringen met een bron en één gele zin om na te lopen.">
              <V.OrbitTekst />
            </Cel>
          </div>
        </section>

        {/* 3. Het brein */}
        <section id={s.brein.id} className="feature pd-section" aria-labelledby={`${s.brein.id}-titel`}>
          <div className="keyline" />
          <Kop {...s.brein} />
          <Paneel b={s.brein.paneel} variant="kf-schema" alt="Links de bronnen van binnen: website, kennismakingsgesprek, antwoorden van de klant en documenten. Rechts de bronnen van buiten: vakkennis, regels en concurrenten. Alles komt samen in het brein.">
            <V.BreinSchema />
          </Paneel>
          <div className="pd-grid">
            <Cel b={s.brein.cellen[0]} alt="Een uitspraak uit het kennismakingsgesprek wordt een nieuw feit in het brein: alleen eigen monteurs, gezegd door de klant.">
              <V.VanBinnen />
            </Cel>
            <Cel b={s.brein.cellen[1]} alt="Drie punten uit de markt: vakkennis, regels en concurrenten, elk gecontroleerd op de bron.">
              <V.VanBuiten />
            </Cel>
          </div>
        </section>

        {/* 4. Het brein als tabel */}
        <section id={s.register.id} className="feature pd-section" aria-labelledby={`${s.register.id}-titel`}>
          <div className="keyline" />
          <Kop {...s.register} />
          <Paneel b={s.register.paneel} variant="screen" alt="Het brein van Lindeman Warmte als tabel: per feit de bron, hoe zeker het is en of het in een tekst mag. Een vermoeden en een verboden woord mogen nooit.">
            <V.BreinTabel />
          </Paneel>
          <div className="pd-grid">
            <Cel b={s.register.cellen[0]} alt="Het vermoeden grootste installateur van Utrecht komt niet in een tekst tot iemand het bevestigt.">
              <V.Vermoeden />
            </Cel>
            <Cel b={s.register.cellen[1]} alt="De zin over 5 jaar garantie is letterlijk teruggevonden op de garantiepagina van de website.">
              <V.Bewijs />
            </Cel>
          </div>
        </section>

        {/* 5. Schrijven */}
        <section id={s.schrijven.id} className="feature pd-section" aria-labelledby={`${s.schrijven.id}-titel`}>
          <div className="keyline" />
          <Splitsing {...s.schrijven} alt="Een zin in de tekst noemt 5 jaar garantie. Hetzelfde getal staat in het feit in het brein, en dat is gecontroleerd.">
            <V.FeitNaarZin />
          </Splitsing>
        </section>

        {/* 6. Het vangnet */}
        <section id={s.vangnet.id} className="feature pd-section" aria-labelledby={`${s.vangnet.id}-titel`}>
          <div className="keyline" />
          <Kop {...s.vangnet} />
          <div className="pd-grid">
            <Cel b={s.vangnet.cellen[0]} alt="Een gele zin over een termijn van twee weken, met de reden dat de termijn nergens in het brein staat, en de knoppen Klopt en Vraag het bedrijf.">
              <V.GeleZin />
            </Cel>
            <Cel b={s.vangnet.cellen[1]} alt="De klant antwoordt via de deellink: meestal binnen drie weken. Het antwoord gaat het brein in.">
              <V.AntwoordKlant />
            </Cel>
          </div>
        </section>

        {/* 7. Bijblijven */}
        <section id={s.bijblijven.id} className="feature pd-section" aria-labelledby={`${s.bijblijven.id}-titel`}>
          <div className="keyline" />
          <Kop {...s.bijblijven} />
          <div className="pd-grid">
            <Cel b={s.bijblijven.cellen[0]} alt="Twee bronnen zeggen iets anders over de garantie: 3 jaar in een oude brochure, 5 jaar op de website.">
              <V.Tegenstrijdig />
            </Cel>
            <Cel b={s.bijblijven.cellen[1]} alt="De prijs vanaf 4.500 euro verloopt op 1 januari en moet daarna opnieuw bevestigd worden.">
              <V.Verloopt />
            </Cel>
          </div>
        </section>

        {/* 8. Eerlijk */}
        <section id={s.eerlijk.id} className="feature pd-section" aria-labelledby={`${s.eerlijk.id}-titel`}>
          <div className="keyline" />
          <Kop {...s.eerlijk} />
          <div className="kf-honest">
            <div className="kf-honest-col">
              <h3>ORBIT ENGINE controleert</h3>
              <ul>{s.eerlijk.systeem.map((p) => <li key={p}><Vink />{p}</li>)}</ul>
            </div>
            <div className="kf-honest-col">
              <h3>Jij beslist</h3>
              <ul>{s.eerlijk.mens.map((p) => <li key={p}><span className="kf-dot" aria-hidden="true" />{p}</li>)}</ul>
            </div>
          </div>
        </section>
      </div>

      {/* 9. Afsluiter */}
      <section className="home-prefooter container pd-afsluiter" aria-labelledby="pd-afsluiter">
        <h2 id="pd-afsluiter">{afsluiter.title}</h2>
        <p>{afsluiter.description}</p>
        <div className="home-prefooter-actions">
          <PrefooterKnoppen />
        </div>
      </section>
    </div>
  )
}
