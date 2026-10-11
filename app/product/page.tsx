import type { Metadata } from 'next'
import Link from 'next/link'
import { afsluiter, demoHref, hero, meta, ronde, secties, type Bijschrift } from '@/content/product'
import * as V from '@/components/product/Visuals'
import './product.css'

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/product' },
  openGraph: { title: `${meta.title} – ORBIT ENGINE`, description: meta.description, url: '/product', images: [{ url: '/images/product/og-product.png', width: 1200, height: 630 }] },
}

// Opbouw naar linear.app: per sectie een kop met uitleg, daarna een groot paneel waarin een appvenster
// over de rand loopt, of een raster van cellen die elk één functie van dichtbij tonen, met het
// bijschrift in het vlak zelf. De beelden zijn nagebouwd (components/product/Visuals.tsx).

function Kop({ id, title, description }: { id: string; title: string; description: string }) {
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

/** Een groot vlak met lichtval van boven; het venster loopt rechts en onder uit beeld. */
function Paneel({ b, alt, children, variant }: { b: Bijschrift; alt: string; children: React.ReactNode; variant?: string }) {
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
function Cel({ b, alt, children, variant }: { b: Bijschrift; alt: string; children: React.ReactNode; variant?: string }) {
  return (
    <figure className={`pd-cell${variant ? ` pd-cell-${variant}` : ''}`}>
      <div className="pd-cell-stage" role="img" aria-label={alt}>
        <div className="pd-cell-inner" aria-hidden="true">{children}</div>
      </div>
      <Tekst b={b} />
    </figure>
  )
}

export default function ProductPage() {
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
            <a href="#zichtbaarheid" className="btn btn-lg btn-secondary">{hero.secondary}</a>
          </div>
        </div>
      </section>

      <div className="container pd-hero-visual">
        <Paneel b={hero.beeld} variant="hero" alt="Het scherm Openstaande taken van Lindeman Warmte: oktober met de stappen meten, plannen, schrijven, publiceren en hermeten, en vier taken die op het bureau wachten.">
          <V.HeroTaken />
        </Paneel>
        <p className="pd-note">{hero.note}</p>
        <nav className="pd-ronde" aria-label="Een maand in ORBIT ENGINE">
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
        {/* 2. AI-zichtbaarheid */}
        <section id={s.zichtbaarheid.id} className="feature pd-section" aria-labelledby={`${s.zichtbaarheid.id}-titel`}>
          <div className="keyline" />
          <Kop {...s.zichtbaarheid} />
          <Paneel b={s.zichtbaarheid.paneel} alt="Zichtbaarheid in AI: 49 procent over alle clusters, 17 punten hoger dan in juni, met een lijn per cluster en een tabel met verandering en de kolom Telt mee.">
            <V.ZichtbaarheidVenster />
          </Paneel>
          <div className="pd-grid">
            <Cel b={s.zichtbaarheid.cellen[0]} alt="Een AI-antwoord op de vraag welke installateur in Utrecht goed is in hybride warmtepompen, met drie genoemde concurrenten en de bronnen.">
              <V.AiAntwoord />
            </Cel>
            <Cel b={s.zichtbaarheid.cellen[1]} alt="Hoe vaak elk bedrijf genoemd wordt bij hybride warmtepompen: Lindeman Warmte steeg van 17 naar 47 procent.">
              <V.AandeelGenoemd />
            </Cel>
          </div>
        </section>

        {/* 3. Bedrijfskennis */}
        <section id={s.kennis.id} className="feature pd-section" aria-labelledby={`${s.kennis.id}-titel`}>
          <div className="keyline" />
          <Kop {...s.kennis} />
          <div className="pd-grid pd-grid-tall">
            <Cel b={s.kennis.cellen[0]} alt="Het merkdossier met doelgroep, positionering, aanspreekvorm je en jij, merkstem en woorden die nooit gebruikt worden.">
              <V.Merkdossier />
            </Cel>
            <Cel b={s.kennis.cellen[1]} alt="Feiten en kennis: vijf bedrijfsfeiten, elk met de bron waar ze vandaan komen.">
              <V.FeitenKennis />
            </Cel>
          </div>
        </section>

        {/* 4. Planning */}
        <section id={s.planning.id} className="feature pd-section" aria-labelledby={`${s.planning.id}-titel`}>
          <div className="keyline" />
          <Kop {...s.planning} />
          <div className="pd-grid pd-grid-tall">
            <Cel b={s.planning.cellen[0]} variant="flow" alt="Een AI-vraag en een Google-zoekopdracht komen samen in een kans met potentie 78, die de pagina Hybride warmtepomp laten installeren in Utrecht wordt.">
              <V.VanVraagNaarPagina />
            </Cel>
            <Cel b={s.planning.cellen[1]} alt="Het pagina-idee met potentie 78, de onderbouwing, drie doelvragen en de knop Plan in oktober.">
              <V.PaginaIdee />
            </Cel>
          </div>
          <Paneel b={s.planning.paneel} alt="Het contentplan met oktober, november en december als kolommen en per pagina de stand.">
            <V.ContentplanBord />
          </Paneel>
        </section>

        {/* 5. Klantinput */}
        <section id={s.klantinput.id} className="feature pd-section" aria-labelledby={`${s.klantinput.id}-titel`}>
          <div className="keyline" />
          <Kop {...s.klantinput} />
          <div className="pd-grid pd-grid-tall">
            <Cel b={s.klantinput.cellen[0]} alt="Openstaande vragen voor de pagina over hybride warmtepompen: twee van vier beantwoord, met de knop Deel deze vragen.">
              <V.VragenTeam />
            </Cel>
            <Cel b={s.klantinput.cellen[1]} variant="phone" alt="De klant beantwoordt op zijn telefoon de vraag over de prijsopbouw, zonder account.">
              <V.VragenKlant />
            </Cel>
          </div>
        </section>

        {/* 6. Schrijven en controleren */}
        <section id={s.schrijven.id} className="feature pd-section" aria-labelledby={`${s.schrijven.id}-titel`}>
          <div className="keyline" />
          <Kop {...s.schrijven} />
          <Paneel b={s.schrijven.paneel} alt="De geschreven pagina met het antwoord van de klant gemarkeerd, één geel gemarkeerde zin, en rechts waar de tekst op gebouwd is.">
            <V.TekstEditor />
          </Paneel>
          <div className="pd-grid">
            <Cel b={s.schrijven.cellen[0]} alt="Een gemarkeerde zin over een installatietermijn van twee weken met de knoppen Klopt, Pas aan en Vraag het bedrijf.">
              <V.ZinNalopen />
            </Cel>
            <Cel b={s.schrijven.cellen[1]} alt="De eindredactie: vier controles geslaagd en één zin om na te lopen.">
              <V.Eindredactie />
            </Cel>
          </div>
        </section>

        {/* 7. Goedkeuren en publiceren */}
        <section id={s.publiceren.id} className="feature pd-section" aria-labelledby={`${s.publiceren.id}-titel`}>
          <div className="keyline" />
          <div className="pd-split">
            <div className="pd-split-text">
              <h2 id={`${s.publiceren.id}-titel`} className="feature-title">{s.publiceren.title}</h2>
              <p className="pd-lead">{s.publiceren.description}</p>
              <ul className="pd-checks">
                {s.publiceren.punten.map((p) => (
                  <li key={p}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7" /></svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pd-cell pd-cell-solo">
              <div className="pd-cell-stage" role="img" aria-label="Een goedgekeurde pagina met de knop Meld dat hij live staat en een menu om de tekst te kopiëren als HTML, Markdown of platte tekst.">
                <div className="pd-cell-inner" aria-hidden="true"><V.Publiceren /></div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Opvolging */}
        <section id={s.opvolging.id} className="feature pd-section" aria-labelledby={`${s.opvolging.id}-titel`}>
          <div className="keyline" />
          <Kop {...s.opvolging} />
          <div className="pd-grid">
            <Cel b={s.opvolging.cellen[0]} alt="Hermeting van de acht doelvragen: vóór publicatie 0, na 14 dagen 3 en na 28 dagen 5 keer genoemd.">
              <V.Hermeting />
            </Cel>
            <Cel b={s.opvolging.cellen[1]} alt="Zoekverkeer van de pagina sinds publicatie op 3 september: 262 klikken en 3.940 vertoningen.">
              <V.Zoekverkeer />
            </Cel>
          </div>
          <p className="pd-note pd-note-left">Voorbeeldgegevens. Per pagina zie je de stand vóór en na publicatie, met de aantallen erbij.</p>
        </section>

        {/* 9. Rapportage */}
        <section id={s.rapportage.id} className="feature pd-section" aria-labelledby={`${s.rapportage.id}-titel`}>
          <div className="keyline" />
          <Kop {...s.rapportage} />
          <Paneel b={s.rapportage.paneel} variant="report" alt="Het verslag van september 2026 van Bureau Noordwind voor Lindeman Warmte: zichtbaarheid 39 procent, vijf pagina's live, 1.204 klikken, wat er live ging en de planning voor volgende maand.">
            <V.Maandverslag />
          </Paneel>
        </section>

        {/* 10. Bureauoverzicht en beheer */}
        <section id={s.bureau.id} className="feature pd-section" aria-labelledby={`${s.bureau.id}-titel`}>
          <div className="keyline" />
          <Kop {...s.bureau} />
          <Paneel b={s.bureau.paneel} alt="Het werkoverzicht Merken met zes bedrijven, hun zichtbaarheid, waar ze op wachten en de kosten, met drie bedrijven geselecteerd om de maand te starten.">
            <V.Werkoverzicht />
          </Paneel>
          <div className="pd-grid">
            <Cel b={s.bureau.cellen[0]} alt="Wie er toegang heeft: twee beheerders en twee kijkers, en de rechten van kijker Pieter Lindeman.">
              <V.Toegang />
            </Cel>
            <Cel b={s.bureau.cellen[1]} alt="Kosten van oktober: 46,39 euro van een limiet van 250 euro, met het verbruik per bedrijf.">
              <V.Kosten />
            </Cel>
          </div>
        </section>
      </div>

      {/* 11. Afsluiter */}
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
