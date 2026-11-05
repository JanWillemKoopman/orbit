import type { Metadata } from 'next'
import Link from 'next/link'
import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { CitaatScroll } from '@/components/home/CitaatScroll'
import { Faq } from '@/components/home/Faq'
import { Beeld, Intro, PaginaHero, Raster, RasterCel, Sectie } from '@/components/product/Blokken'
import { Icon } from '@/components/product/ui'
import * as A from '@/components/agency/Visuals'
import * as P from '@/components/product/Visuals'
import * as K from '@/components/kennis/Visuals'
import * as G from '@/components/agencies/Visuals'
import { afsluiter, faq, hero, meta, redenen, secties, start, statement } from '@/content/agencies'
import '../werkwijze/werkwijze.css'
import '../beheer/beheer.css'
import '../kwaliteit/kwaliteit.css'
import '../pagina.css'
import './agencies.css'

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/agencies' },
  openGraph: { title: `${meta.title} – Orbit`, description: meta.description, url: '/agencies' },
}

// De verkooppagina voor bureaus, in de opbouw van linear.app (components/product/Blokken.tsx,
// app/pagina.css): de hero met de achtergrondvideo, een raster met de acht redenen, zes secties met een
// intro en een groot beeld of raster, een tussenzin, de start in drie stappen, vragen en de afsluiter.
// Waar /werkwijze de werkwijze vertelt, gaat het hier om waarom een bureau voor Orbit kiest.

export default function AgenciesPage() {
  const s = secties
  return (
    <div className="home lp agc">
      <PaginaHero eyebrow={hero.eyebrow} titel={hero.title} video="hero-agencies" vierkantMobiel />

      <div className="container">
        {/* De acht redenen in één oogopslag */}
        <section className="agc-redenen" aria-labelledby="agc-redenen-titel">
          <div className="feature-header lp-intro">
            <h2 id="agc-redenen-titel" className="feature-title">{redenen.titel}</h2>
            <div className="feature-description"><p>{redenen.tekst}</p></div>
          </div>
          <ul className="agc-grid">
            {redenen.items.map((r) => (
              <li key={r.titel}>
                <Link href={r.href} className="agc-reden">
                  <span className="agc-reden-ico" aria-hidden="true"><Icon naam={r.icoon} size={16} /></span>
                  <h3>{r.titel}</h3>
                  <p>{r.tekst}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 1. Al je klanten */}
        <Sectie id={s.klanten.id}>
          <Intro id={s.klanten.id} label={s.klanten.label} titel={s.klanten.titel} tekst={s.klanten.tekst} link={s.klanten.link} />
          <Beeld b={s.klanten.beeld} breedte={1180} hoogte={720} alt="Het werkoverzicht van een bureau: zeven klanten onder elkaar met hun zichtbaarheid in AI, de maandmeting, wat er wacht en sinds wanneer, en de kosten van de afgelopen dertig dagen.">
            <A.HeroWerkoverzicht />
          </Beeld>
          <Raster>
            <RasterCel b={s.klanten.cellen[0]} alt="Het formulier voor een nieuwe klant: alleen de bedrijfsnaam en de website, en de knop Start het onderzoek.">
              <A.NieuwMerk />
            </RasterCel>
            <RasterCel b={s.klanten.cellen[1]} alt="De maand starten voor drie klanten tegelijk, samen vijftien pagina's, met vooraf wat het ongeveer kost.">
              <A.MaandStarten />
            </RasterCel>
          </Raster>
        </Sectie>

        {/* 2. Whitelabel */}
        <Sectie id={s.huisstijl.id}>
          <Intro id={s.huisstijl.id} label={s.huisstijl.label} titel={s.huisstijl.titel} tekst={s.huisstijl.tekst} />
          <Beeld b={s.huisstijl.beeld} breedte={1120} hoogte={640} alt="Hetzelfde werkoverzicht drie keer, in de huisstijl van drie bureaus: donker met blauw en strakke hoeken, donker met turquoise en ronde hoeken, en licht met oranje knoppen.">
            <G.Huisstijlen />
          </Beeld>
          <Raster>
            <RasterCel b={s.huisstijl.cellen[0]} alt="De huisstijl van Studio Kade in de app: het logo linksboven, vier kleuren, een monospace lettertype voor koppen, strakke hoeken en een blauwe knop.">
              <G.HuisstijlKaart />
            </RasterCel>
            <RasterCel b={s.huisstijl.cellen[1]} alt="Het maandverslag van september voor Lindeman Warmte, met de naam van het bureau erop: de zichtbaarheid, de pagina's die live gingen en hun effect.">
              <P.Maandverslag />
            </RasterCel>
          </Raster>
        </Sectie>

        {/* 3. Meekijken */}
        <Sectie id={s.meekijken.id}>
          <Intro id={s.meekijken.id} label={s.meekijken.label} titel={s.meekijken.titel} tekst={s.meekijken.tekst} />
          <Raster>
            <RasterCel b={s.meekijken.cellen[0]} alt="Het scherm van een klant die meekijkt: alleen zijn eigen bedrijf, een menu zonder beheer en wat er op hem wacht.">
              <A.SchermVanDeKijker />
            </RasterCel>
            <RasterCel b={s.meekijken.cellen[1]} alt="Wat mag een klant die meekijkt: vragen beantwoorden, materiaal toevoegen en een pagina goedkeuren staan aan, een pagina zelf bewerken staat uit.">
              <A.KijkerRechten />
            </RasterCel>
            <RasterCel b={s.meekijken.cellen[2]} telefoon alt="Een telefoon met een vraag aan de klant over de opbouw van de prijs, het antwoord en de knop Opslaan. Er is geen account nodig.">
              <P.VragenKlant />
            </RasterCel>
            <RasterCel b={s.meekijken.cellen[3]} alt="Iemand uitnodigen als kijker, met het bedrijf aangevinkt dat hij mag zien.">
              <A.Uitnodigen />
            </RasterCel>
          </Raster>
        </Sectie>
      </div>

      {/* Tussenzin */}
      <div className="container">
        <div className="home-statement agc-statement">
          <CitaatScroll strong={statement.strong} rest={statement.rest} />
        </div>
      </div>

      <div className="container">
        {/* 4. Je team */}
        <Sectie id={s.team.id}>
          <Intro id={s.team.id} label={s.team.label} titel={s.team.titel} tekst={s.team.tekst} link={s.team.link} />
          <Beeld b={s.team.beeld} variant="schema" breedte={960} hoogte={400} alt="Twee kolommen. Jouw team: het gesprek met de klant, de strategie, teksten goedkeuren en advies. Orbit: tien taken, van onderzoek en meten tot schrijven, controleren, hermeten en het maandverslag.">
            <G.TaakVerdeling />
          </Beeld>
          <Raster>
            <RasterCel b={s.team.cellen[0]} alt="Wat Orbit in elke tekst controleert: bedragen en prijzen, termijnen, garanties en keurmerken, getallen zonder bron, namen van concurrenten en woorden die de klant niet wil.">
              <K.ControleLijst />
            </RasterCel>
            <RasterCel b={s.team.cellen[1]} alt="Een contentplan met de pagina's verdeeld over de komende maanden.">
              <P.ContentplanBord />
            </RasterCel>
          </Raster>
        </Sectie>

        {/* 5. Resultaat */}
        <Sectie id={s.resultaat.id}>
          <Intro id={s.resultaat.id} label={s.resultaat.label} titel={s.resultaat.titel} tekst={s.resultaat.tekst} link={s.resultaat.link} />
          <Beeld b={s.resultaat.beeld} variant="schema" breedte={960} hoogte={600} alt="Een grafiek van de zichtbaarheid in AI over vijf maanden: de klant stijgt van 17 naar 47 procent, met een marge die smaller wordt.">
            <P.ZichtbaarheidGrafiek />
          </Beeld>
          <Raster>
            <RasterCel b={s.resultaat.cellen[0]} alt="Het effect van een pagina: vóór publicatie 0 van 8 vragen, na 14 dagen 3 en na 28 dagen 5. Oordeel: gestegen, buiten de marge.">
              <P.Hermeting />
            </RasterCel>
            <RasterCel b={s.resultaat.cellen[1]} alt="De klikken uit Google per dag sinds de pagina live ging, samen 262.">
              <P.Zoekverkeer />
            </RasterCel>
          </Raster>
        </Sectie>

        {/* 6. Marge */}
        <Sectie id={s.marge.id}>
          <Intro id={s.marge.id} label={s.marge.label} titel={s.marge.titel} tekst={s.marge.tekst} link={s.marge.link} />
          <Raster>
            <RasterCel b={s.marge.cellen[0]} alt="De kosten van oktober per klant: Lindeman Warmte 12,40 euro, Tandartspraktijk Lunetten 9,60 euro, Verbeek Bouw en Renovatie 8,20 euro.">
              <A.KostenPerKlant />
            </RasterCel>
            <RasterCel b={s.marge.cellen[1]} alt="De knop Schrijf deze pagina nu met de schatting van ongeveer 1,20 euro per pagina, en schattingen bij drie andere knoppen.">
              <A.PrijsBijKnop />
            </RasterCel>
          </Raster>
        </Sectie>

        {/* Zo begin je */}
        <section className="feature process agc-start" aria-labelledby="agc-start-titel">
          <div className="keyline" />
          <div className="feature-header">
            <h2 id="agc-start-titel" className="feature-title">{start.titel}</h2>
            <div className="feature-description"><p>{start.tekst}</p></div>
          </div>
          <ol className="process-steps agc-stappen">
            {start.stappen.map((st, i) => (
              <li className="process-step" key={st.titel}>
                <span className="process-number" aria-hidden="true">{i + 1}</span>
                <h3 className="process-title">{st.titel}</h3>
                <p className="process-description">{st.tekst}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Vragen van bureaus */}
        <section className="home-block" aria-labelledby="agc-faq">
          <div className="keyline" />
          <h2 id="agc-faq" className="home-block-title">{faq.title}</h2>
          <Faq items={faq.items} />
        </section>
      </div>

      {/* Afsluiter */}
      <section className="home-prefooter container pd-afsluiter" aria-labelledby="agc-afsluiter">
        <CtaAchtergrond />
        <h2 id="agc-afsluiter">{afsluiter.title}</h2>
        <p>{afsluiter.description}</p>
        <div className="home-prefooter-actions">
          <PrefooterKnoppen />
        </div>
      </section>
    </div>
  )
}
