import type { Metadata } from 'next'
import Link from 'next/link'
import { afsluiter, demoHref, hero, meta, ronde, secties, usps } from '@/content/agency'
import { Cel, Kop, Paneel, Splitsing } from '@/components/product/Blokken'
import * as V from '@/components/agency/Visuals'
import '../product/product.css'
import './agency.css'

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/agency' },
  openGraph: { title: `${meta.title} – ORBIT ENGINE`, description: meta.description, url: '/agency', images: [{ url: '/images/product/og-agency.png', width: 1200, height: 630 }] },
}

// Zelfde opbouw en vormgeving als /product, met de nadruk op het account van het bureau: het
// werkoverzicht, klanten toevoegen, rollen, kosten, sleutels en gegevens. De grote panelen tonen een
// heel scherm, de cellen één onderdeel van dichtbij (components/agency/Visuals.tsx).

export default function AgencyPage() {
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
            <a href="#overzicht" className="btn btn-lg btn-secondary">{hero.secondary}</a>
          </div>
        </div>
      </section>

      <div className="container pd-hero-visual">
        <Paneel b={hero.beeld} variant="screen" alt="Het werkoverzicht van Bureau Noordwind: zeven bedrijven met hun zichtbaarheid, maandmeting, wat er op het bureau wacht en de kosten van de afgelopen dertig dagen.">
          <V.HeroWerkoverzicht />
        </Paneel>
        <p className="pd-note">{hero.note}</p>
        <nav className="pd-ronde" aria-label="Het account van je bureau">
          <ol>
            {ronde.map((stap, i) => (
              <li key={stap.label}>
                <a href={stap.href}><span className="pd-ronde-nr" aria-hidden="true">{i + 1}</span>{stap.label}</a>
              </li>
            ))}
          </ol>
        </nav>
        <ul className="ag-usps">
          {usps.map((u) => (
            <li key={u.titel}>
              <h2>{u.titel}</h2>
              <p>{u.tekst}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="container">
        {/* 2. Werkoverzicht */}
        <section id={s.overzicht.id} className="feature pd-section" aria-labelledby={`${s.overzicht.id}-titel`}>
          <div className="keyline" />
          <Kop {...s.overzicht} />
          <div className="pd-grid">
            <Cel b={s.overzicht.cellen[0]} alt="Wacht op jou: Verbeek Bouw en Renovatie heeft twee teksten om na te kijken sinds zes dagen, Lindeman Warmte twee vragen bij de klant sinds vier dagen.">
              <V.LangstWacht />
            </Cel>
            <Cel b={s.overzicht.cellen[1]} alt="De maand starten voor drie bedrijven, samen vijftien pagina's, voor ongeveer 18 euro. Van de maandlimiet is nog 204 euro over.">
              <V.MaandStarten />
            </Cel>
          </div>
        </section>

        {/* 3. Klanten toevoegen */}
        <section id={s.klanten.id} className="feature pd-section" aria-labelledby={`${s.klanten.id}-titel`}>
          <div className="keyline" />
          <Kop {...s.klanten} />
          <div className="pd-grid">
            <Cel b={s.klanten.cellen[0]} alt="Het formulier Nieuw merk met bedrijfsnaam Bakkerij De Korenaar, de website en de knop Start het onderzoek, met een schatting van 1,90 euro.">
              <V.NieuwMerk />
            </Cel>
            <Cel b={s.klanten.cellen[1]} alt="Het onderzoek van Bakkerij De Korenaar: website, merk en aanbod zijn klaar, onderwerpen worden onderzocht.">
              <V.Onderzoek />
            </Cel>
          </div>
          <Paneel b={s.klanten.paneel} variant="screen" alt="Beheer, Bedrijven: vijf bedrijven met hun kijkers en het aantal pagina's per maand, en de standaarden voor nieuwe bedrijven.">
            <V.BeheerBedrijven />
          </Paneel>
        </section>

        {/* 4. Team en kijkers */}
        <section id={s.team.id} className="feature pd-section" aria-labelledby={`${s.team.id}-titel`}>
          <div className="keyline" />
          <Kop {...s.team} />
          <Paneel b={s.team.paneel} variant="screen" alt="Beheer, Gebruikers: twee beheerders, twee kijkers die elk één bedrijf zien, en een openstaande uitnodiging.">
            <V.Gebruikers />
          </Paneel>
          <div className="pd-grid">
            <Cel b={s.team.cellen[0]} alt="Een collega uitnodigen als kijker, met Verbeek Bouw en Renovatie aangevinkt als het bedrijf dat ze mag zien.">
              <V.Uitnodigen />
            </Cel>
            <Cel b={s.team.cellen[1]} alt="Wat mogen kijkers: vragen beantwoorden, een link delen, materiaal toevoegen en een pagina goedkeuren staan aan, een pagina zelf bewerken staat uit.">
              <V.KijkerRechten />
            </Cel>
          </div>
        </section>

        {/* 5. Kosten */}
        <section id={s.kosten.id} className="feature pd-section" aria-labelledby={`${s.kosten.id}-titel`}>
          <div className="keyline" />
          <Kop {...s.kosten} />
          <Paneel b={s.kosten.paneel} variant="screen" alt="Beheer, Kosten: in oktober 46 euro van een limiet van 250 euro, ongeveer 51,80 euro die volgende maand vanzelf loopt, en het verbruik per soort werk en per maand.">
            <V.BeheerKosten />
          </Paneel>
          <div className="pd-grid">
            <Cel b={s.kosten.cellen[0]} alt="De knop Schrijf deze pagina nu met de schatting van ongeveer 1,20 euro per pagina, en schattingen bij drie andere betaalde knoppen.">
              <V.PrijsBijKnop />
            </Cel>
            <Cel b={s.kosten.cellen[1]} alt="De kosten van oktober per bedrijf: Lindeman Warmte 12,40 euro, Tandartspraktijk Lunetten 9,60 euro, Verbeek Bouw en Renovatie 8,20 euro, samen 46 euro.">
              <V.KostenPerKlant />
            </Cel>
          </div>
        </section>

        {/* 6. Sleutels */}
        <section id={s.sleutels.id} className="feature pd-section" aria-labelledby={`${s.sleutels.id}-titel`}>
          <div className="keyline" />
          <Splitsing {...s.sleutels} alt="De sleutels van Bureau Noordwind: OpenAI en Gemini zijn ingevuld en werken, DataForSEO is nog niet ingevuld.">
            <V.Sleutels />
          </Splitsing>
        </section>

        {/* 7. Gegevens */}
        <section id={s.gegevens.id} className="feature pd-section" aria-labelledby={`${s.gegevens.id}-titel`}>
          <div className="keyline" />
          <Kop {...s.gegevens} />
          <div className="pd-grid">
            <Cel b={s.gegevens.cellen[0]} alt="Twee gearchiveerde bedrijven met de knop Terughalen.">
              <V.Archief />
            </Cel>
            <Cel b={s.gegevens.cellen[1]} alt="Een bedrijf definitief verwijderen: eerst staat er wat weggaat, daarna typ je de naam over.">
              <V.Verwijderen />
            </Cel>
          </div>
        </section>
      </div>

      {/* 8. Afsluiter */}
      <section className="home-prefooter container pd-afsluiter" aria-labelledby="pd-afsluiter">
        <h2 id="pd-afsluiter">{afsluiter.title}</h2>
        <p>{afsluiter.description}</p>
        <div className="home-prefooter-actions">
          <Link href={demoHref} className="btn btn-lg btn-invert">{afsluiter.cta}</Link>
        </div>
      </section>
    </div>
  )
}
