import type { Metadata } from 'next'
import { CtaGolf } from '@/components/CtaGolf'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { afsluiter, hero, meta, quote, secties } from '@/content/ai'
import { Beeld, Intro, PaginaHero, Raster, RasterCel, Sectie } from '@/components/product/Blokken'
import * as P from '@/components/product/Visuals'
import * as A from '@/components/agency/Visuals'
import * as K from '@/components/kennis/Visuals'
import * as V from '@/components/ai/Visuals'
import '../werkwijze/werkwijze.css'
import '../beheer/beheer.css'
import '../kwaliteit/kwaliteit.css'
import '../pagina.css'
import './ai-pagina.css'
import '../pagina-mobiel.css'

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/ai' },
  openGraph: { title: `${meta.title} – Orbit`, description: meta.description, url: '/ai', images: [{ url: '/images/product/og-ai.png', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', images: ['/images/product/og-ai.png'] },
}

// Opbouw naar linear.app/ai (components/product/Blokken.tsx, app/pagina.css), zoals de andere drie
// productpagina's: hero, vijf secties met een intro en een groot beeld of raster, de rij met de vier
// productpagina's en de afsluiter. Het verhaal: wie doet wat, meten, schrijven, de achtergrond en de
// grenzen van AI.

export default function AiPage() {
  const s = secties
  return (
    <div className="home lp">
      <PaginaHero eyebrow={hero.eyebrow} titel={hero.title} video="hero-ai" />

      <div className="container">
        {/* 1. Wie doet wat */}
        <Sectie id={s.wie.id}>
          <Intro id={s.wie.id} label={s.wie.label} titel={s.wie.titel} tekst={s.wie.tekst} link={s.wie.link} />
          <Beeld b={s.wie.beeld} breedte={1120} hoogte={740} alt="Een tabel met negen stappen, van onderzoeken tot nameten, en drie kolommen: wat AI doet, wat code afdwingt en wat jij beslist. Bij publiceren doet AI niets.">
            <V.WieDoetWat />
          </Beeld>
          <Raster>
            <RasterCel b={s.wie.cellen[0]} alt="De voortgang van het onderzoek van Bakkerij De Korenaar: website, merk en aanbod zijn klaar, onderwerpen worden onderzocht.">
              <A.Onderzoek />
            </RasterCel>
            <RasterCel b={s.wie.cellen[1]} alt="De dertig AI-vragen van een onderwerp, verdeeld over oriëntatie, overweging en beslissing.">
              <P.VragenKlantreis />
            </RasterCel>
            <RasterCel b={s.wie.cellen[2]} alt="Per concurrent de eigenschappen die AI noemt, zoals prijs, snelheid en reputatie, elk met een letterlijk fragment als bewijs.">
              <V.WaaromConcurrentWint />
            </RasterCel>
            <RasterCel b={s.wie.cellen[3]} alt="Een brief voor de pagina Hybride warmtepomp in Houten met drie vragen aan de klant. Hooguit acht vragen per pagina.">
              <V.BriefVoorPagina />
            </RasterCel>
          </Raster>
        </Sectie>

        {/* 2. Meten */}
        <Sectie id={s.meten.id}>
          <Intro id={s.meten.id} label={s.meten.label} titel={s.meten.titel} tekst={s.meten.tekst} link={s.meten.link} />
          <Beeld b={s.meten.beeld} variant="schema" breedte={1120} hoogte={360} alt="Van AI-vraag naar een cijfer: AI beantwoordt de vraag met zoeken op het web, AI beoordeelt wie er genoemd wordt, code rekent de zichtbaarheid uit. Het cijfer is 47 procent met een marge van 10.">
            <V.MeetStroom />
          </Beeld>
          <Raster>
            <RasterCel b={s.meten.cellen[0]} alt="De kennistest: wat ChatGPT uit zichzelf weet over Lindeman Warmte. Twee uitspraken kloppen, de vestigingsplaats klopt niet.">
              <V.Kennistest />
            </RasterCel>
            <RasterCel b={s.meten.cellen[1]} alt="De kanalen: ChatGPT staat altijd aan, Gemini staat aan en Google AI Overview staat uit. Extra kanalen kosten extra per vraag.">
              <V.Kanalen />
            </RasterCel>
          </Raster>
        </Sectie>

        {/* 3. Schrijven */}
        <Sectie id={s.schrijven.id}>
          <Intro id={s.schrijven.id} label={s.schrijven.label} titel={s.schrijven.titel} tekst={s.schrijven.tekst} link={s.schrijven.link} />
          <Beeld b={s.schrijven.beeld} variant="schema" breedte={1120} hoogte={360} alt="De vijf stappen naar een pagina: brief door AI, vragen aan jou of je klant, schrijven door AI, eindredactie door AI en goedkeuren door jou. Code houdt verboden woorden eruit en weigert correcties met een nieuwe bewering.">
            <V.Schrijfstraat />
          </Beeld>
          <Beeld b={s.schrijven.tweede} variant="schema" breedte={1120} hoogte={460} alt="Feiten van binnen, zoals de website, het kennismakingsgesprek en antwoorden van de klant, en feiten van buiten, zoals vakkennis en concurrenten, komen samen in Feiten en kennis, waar elk feit een bron heeft.">
            <K.BreinSchema />
          </Beeld>
        </Sectie>

        {/* 4. Alles op de achtergrond */}
        <Sectie id={s.achtergrond.id}>
          <Intro id={s.achtergrond.id} label={s.achtergrond.label} titel={s.achtergrond.titel} tekst={s.achtergrond.tekst} link={s.achtergrond.link} />
          <Beeld b={s.achtergrond.beeld} breedte={920} hoogte={640} alt="De systeemstatus van Bureau Noordwind: het achtergrondwerk is gekoppeld, er loopt een onderzoek, een meting en een tekst, een hermeting is gepland en een pagina wacht op antwoorden van de klant.">
            <V.AchtergrondWerk />
          </Beeld>
        </Sectie>

        {/* 5. De grenzen */}
        <Sectie id={s.grenzen.id}>
          <Intro id={s.grenzen.id} label={s.grenzen.label} titel={s.grenzen.titel} tekst={s.grenzen.tekst} />
          <Raster>
            <RasterCel b={s.grenzen.cellen[0]} alt="Wat AI en code doen: onderzoeken en vragen bedenken, antwoorden beoordelen en een pagina schrijven en nalezen door AI, marges uitrekenen en het effect vergelijken door code.">
              <V.WatAiEnCodeDoen />
            </RasterCel>
            <RasterCel b={s.grenzen.cellen[1]} alt="Wat jij beslist: of een vermoeden een feit is, of een tekst bij het merk past, wanneer een pagina live gaat en wat je je klant vertelt als een verschil binnen de marge valt.">
              <V.WatJijBeslist />
            </RasterCel>
          </Raster>
        </Sectie>

        {/* De maker: een quote, voorlopig met Lorem ipsum (zie content/ai.ts) */}
        <figure className="home-quote lp-quote">
          <blockquote className="home-statement">
            <p>
              <strong><span className="home-quote-mark" aria-hidden="true">“</span>{quote.sterk}</strong> {quote.rest}<span aria-hidden="true">”</span>
            </p>
          </blockquote>
          <figcaption className="home-quote-author">
            {quote.auteur.foto && <img src={quote.auteur.foto} alt="" width={48} height={48} />}
            <span>{quote.auteur.naam}</span>
          </figcaption>
        </figure>
      </div>

      {/* Afsluiter */}
      <section className="home-prefooter container pd-afsluiter" aria-labelledby="pd-afsluiter">
        <CtaGolf />
        <h2 id="pd-afsluiter">{afsluiter.title}</h2>
        <p>{afsluiter.description}</p>
        <div className="home-prefooter-actions">
          <PrefooterKnoppen />
        </div>
      </section>
    </div>
  )
}
