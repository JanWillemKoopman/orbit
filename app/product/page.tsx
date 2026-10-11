import type { Metadata } from 'next'
import Link from 'next/link'
import { afsluiter, demoHref, hero, meta, ronde, secties } from '@/content/product'
import { Cel, Kop, Paneel, Splitsing } from '@/components/product/Blokken'
import * as V from '@/components/product/Visuals'
import './product.css'

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/product' },
  openGraph: { title: `${meta.title} – ORBIT ENGINE`, description: meta.description, url: '/product', images: [{ url: '/images/product/og-product.png', width: 1200, height: 630 }] },
}

// Opbouw naar linear.app met de bouwblokken uit components/product/Blokken.tsx. De beelden zijn
// nagebouwd (components/product/Visuals.tsx).

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
        <Paneel b={hero.beeld} variant="hero" alt="De maand van Lindeman Warmte: meten en plannen zijn klaar, schrijven loopt, en er wachten twee vragen op de klant.">
          <V.HeroMaand />
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
          <Paneel b={s.zichtbaarheid.paneel} variant="chart" alt="Grafiek van de zichtbaarheid in AI voor hybride warmtepompen: van 17 procent in juni naar 47 procent in oktober.">
            <V.ZichtbaarheidGrafiek />
          </Paneel>
          <div className="pd-grid">
            <Cel b={s.zichtbaarheid.cellen[0]} alt="ChatGPT noemt bij de vraag welke installateur in Utrecht goed is in hybride warmtepompen drie concurrenten, en Lindeman Warmte niet.">
              <V.AiAntwoord />
            </Cel>
            <Cel b={s.zichtbaarheid.cellen[1]} alt="Hoe vaak elk bedrijf genoemd wordt: Warmtewerk Utrecht 58 procent, Lindeman Warmte 47 procent, Domstad Installaties 41 procent, KlimaatPro 29 procent.">
              <V.AandeelGenoemd />
            </Cel>
          </div>
        </section>

        {/* 3. Bedrijfskennis */}
        <section id={s.kennis.id} className="feature pd-section" aria-labelledby={`${s.kennis.id}-titel`}>
          <div className="keyline" />
          <Kop {...s.kennis} />
          <div className="pd-grid">
            <Cel b={s.kennis.cellen[0]} alt="De merkstem: aanspreekvorm je en jij, toon nuchter, vakkundig en persoonlijk, en woorden die nooit gebruikt worden.">
              <V.Merkstem />
            </Cel>
            <Cel b={s.kennis.cellen[1]} alt="Drie bedrijfsfeiten, elk met de bron: twee van de klant en één uit een document.">
              <V.Feiten />
            </Cel>
          </div>
        </section>

        {/* 4. Planning */}
        <section id={s.planning.id} className="feature pd-section" aria-labelledby={`${s.planning.id}-titel`}>
          <div className="keyline" />
          <Kop {...s.planning} />
          <div className="pd-grid">
            <Cel b={s.planning.cellen[0]} variant="flow" alt="Een AI-vraag wordt een kans met potentie 78, en die kans wordt een pagina.">
              <V.VanVraagNaarPagina />
            </Cel>
            <Cel b={s.planning.cellen[1]} alt="Het pagina-idee Hybride warmtepomp laten installeren in Utrecht met potentie 78 en de knop Plan in oktober.">
              <V.PaginaIdee />
            </Cel>
          </div>
          <Paneel b={s.planning.paneel} variant="board" alt="Het contentplan met een kolom per maand en per pagina een gekleurde stip voor de stand.">
            <V.ContentplanBord />
          </Paneel>
        </section>

        {/* 5. Klantinput */}
        <section id={s.klantinput.id} className="feature pd-section" aria-labelledby={`${s.klantinput.id}-titel`}>
          <div className="keyline" />
          <Kop {...s.klantinput} />
          <div className="pd-grid">
            <Cel b={s.klantinput.cellen[0]} alt="Twee van vier vragen beantwoord, met een knop om de vragen te delen.">
              <V.VragenTeam />
            </Cel>
            <Cel b={s.klantinput.cellen[1]} variant="phone" alt="Op een telefoon beantwoordt de klant de vraag over de prijsopbouw, zonder account.">
              <V.VragenKlant />
            </Cel>
          </div>
        </section>

        {/* 6. Schrijven en controleren */}
        <section id={s.schrijven.id} className="feature pd-section" aria-labelledby={`${s.schrijven.id}-titel`}>
          <div className="keyline" />
          <Kop {...s.schrijven} />
          <Paneel b={s.schrijven.paneel} variant="doc" alt="Een alinea uit de geschreven pagina: het antwoord van de klant is groen gemarkeerd, een termijn zonder bron geel.">
            <V.TekstFragment />
          </Paneel>
          <div className="pd-grid">
            <Cel b={s.schrijven.cellen[0]} alt="Een gemarkeerde zin over een installatietermijn van twee weken met de knoppen Klopt en Vraag het bedrijf.">
              <V.ZinNalopen />
            </Cel>
            <Cel b={s.schrijven.cellen[1]} alt="De eindredactie: drie controles geslaagd en één zin om na te lopen.">
              <V.Eindredactie />
            </Cel>
          </div>
        </section>

        {/* 7. Goedkeuren en publiceren */}
        <section id={s.publiceren.id} className="feature pd-section" aria-labelledby={`${s.publiceren.id}-titel`}>
          <div className="keyline" />
          <Splitsing {...s.publiceren} alt="Het kopieermenu van een goedgekeurde pagina: kopieer als HTML, Markdown of platte tekst, en meld dat hij live staat.">
            <V.Publiceren />
          </Splitsing>
        </section>

        {/* 8. Opvolging */}
        <section id={s.opvolging.id} className="feature pd-section" aria-labelledby={`${s.opvolging.id}-titel`}>
          <div className="keyline" />
          <Kop {...s.opvolging} />
          <div className="pd-grid">
            <Cel b={s.opvolging.cellen[0]} alt="Van de acht doelvragen werd de klant vóór publicatie bij geen genoemd, na 14 dagen bij 3 en na 28 dagen bij 5.">
              <V.Hermeting />
            </Cel>
            <Cel b={s.opvolging.cellen[1]} alt="Klikken per dag vanaf de dag dat de pagina live ging, oplopend tot 262 klikken.">
              <V.Zoekverkeer />
            </Cel>
          </div>
          <p className="pd-note pd-note-left">Voorbeeldgegevens. Per pagina zie je de stand vóór en na publicatie, met de aantallen erbij.</p>
        </section>

        {/* 9. Rapportage */}
        <section id={s.rapportage.id} className="feature pd-section" aria-labelledby={`${s.rapportage.id}-titel`}>
          <div className="keyline" />
          <Kop {...s.rapportage} />
          <Paneel b={s.rapportage.paneel} variant="report" alt="Het verslag van september van Bureau Noordwind voor Lindeman Warmte: zichtbaarheid 39 procent, vijf pagina's live en 1.204 klikken uit Google.">
            <V.Maandverslag />
          </Paneel>
        </section>

        {/* 10. Bureauoverzicht en beheer */}
        <section id={s.bureau.id} className="feature pd-section" aria-labelledby={`${s.bureau.id}-titel`}>
          <div className="keyline" />
          <Kop {...s.bureau} />
          <Paneel b={s.bureau.paneel} variant="list" alt="Vier bedrijven met hun zichtbaarheid en waar ze op wachten.">
            <V.Werkoverzicht />
          </Paneel>
          <div className="pd-grid">
            <Cel b={s.bureau.cellen[0]} alt="Kijker Pieter Lindeman mag vragen beantwoorden en teksten goedkeuren, maar geen teksten bewerken.">
              <V.Toegang />
            </Cel>
            <Cel b={s.bureau.cellen[1]} alt="Kosten van oktober: 46 euro van een limiet van 250 euro.">
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
