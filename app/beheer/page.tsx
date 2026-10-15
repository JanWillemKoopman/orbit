import type { Metadata } from 'next'
import { CtaGolf } from '@/components/CtaGolf'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { afsluiter, hero, meta, secties } from '@/content/beheer'
import { Beeld, Intro, PaginaHero, Raster, RasterCel, Sectie } from '@/components/product/Blokken'
import * as V from '@/components/agency/Visuals'
import '../werkwijze/werkwijze.css'
import '../pagina.css'
import './beheer.css'
import '../pagina-mobiel.css'

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/beheer' },
  openGraph: { title: `${meta.title} – ORBIT ENGINE`, description: meta.description, url: '/beheer', images: [{ url: '/images/product/og-beheer.png', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', images: ['/images/product/og-beheer.png'] },
}

// Opbouw naar linear.app/ai (components/product/Blokken.tsx, app/pagina.css), zoals Werkwijze en
// Kwaliteit: hero, vijf secties met een intro en een groot beeld of raster, de rij met de vier
// productpagina's en de afsluiter. Het verhaal: het werkoverzicht, klanten toevoegen, team en
// kijkers, kosten en sleutels, en gegevens die van het bureau blijven.

export default function BeheerPage() {
  const s = secties
  return (
    <div className="home lp">
      <PaginaHero eyebrow={hero.eyebrow} titel={hero.title} video="hero-beheer" />

      <div className="container">
        {/* 1. Overzicht */}
        <Sectie id={s.overzicht.id}>
          <Intro id={s.overzicht.id} label={s.overzicht.label} titel={s.overzicht.titel} tekst={s.overzicht.tekst} link={s.overzicht.link} />
          <Beeld b={s.overzicht.beeld} breedte={1180} hoogte={720} alt="Het werkoverzicht van Bureau Noordwind: zeven bedrijven met hun zichtbaarheid, maandmeting, wat er op het bureau wacht en de kosten van de afgelopen dertig dagen.">
            <V.HeroWerkoverzicht />
          </Beeld>
          <Raster>
            <RasterCel b={s.overzicht.cellen[0]} alt="Wacht op jou: Verbeek Bouw en Renovatie heeft twee teksten om na te kijken sinds zes dagen, Lindeman Warmte twee vragen bij de klant sinds vier dagen.">
              <V.LangstWacht />
            </RasterCel>
            <RasterCel b={s.overzicht.cellen[1]} stapel alt="De maand starten voor drie bedrijven, samen vijftien pagina's, voor ongeveer 18 euro. Van de maandlimiet is nog 204 euro over.">
              <V.MaandStarten />
            </RasterCel>
          </Raster>
        </Sectie>

        {/* 2. Klanten toevoegen */}
        <Sectie id={s.klanten.id}>
          <Intro id={s.klanten.id} label={s.klanten.label} titel={s.klanten.titel} tekst={s.klanten.tekst} link={s.klanten.link} />
          <Beeld b={s.klanten.beeld} breedte={1180} hoogte={640} alt="Beheer, Bedrijven: vijf bedrijven met hun kijkers en het aantal pagina's per maand, en de standaarden voor nieuwe bedrijven.">
            <V.BeheerBedrijven />
          </Beeld>
          <Raster>
            <RasterCel b={s.klanten.cellen[0]} alt="Het formulier Nieuw merk met bedrijfsnaam Bakkerij De Korenaar, de website en de knop Start het onderzoek, met een schatting van 1,90 euro.">
              <V.NieuwMerk />
            </RasterCel>
            <RasterCel b={s.klanten.cellen[1]} stapel alt="De rondleiding voor een beheerder, stap 3 van 6: voeg een bedrijf toe met alleen de naam en de website.">
              <V.ZoBeginJe />
            </RasterCel>
          </Raster>
        </Sectie>

        {/* 3. Team en kijkers */}
        <Sectie id={s.team.id}>
          <Intro id={s.team.id} label={s.team.label} titel={s.team.titel} tekst={s.team.tekst} />
          <Beeld b={s.team.beeld} breedte={1180} hoogte={600} alt="Beheer, Gebruikers: twee beheerders, een kijker die één bedrijf ziet, en een openstaande uitnodiging.">
            <V.Gebruikers />
          </Beeld>
          <Raster>
            <RasterCel b={s.team.cellen[0]} alt="Een collega uitnodigen als kijker, met Verbeek Bouw en Renovatie aangevinkt als het bedrijf dat ze mag zien.">
              <V.Uitnodigen />
            </RasterCel>
            <RasterCel b={s.team.cellen[1]} alt="Wat mogen kijkers: vragen beantwoorden, materiaal toevoegen en een pagina goedkeuren staan aan, een pagina zelf bewerken staat uit.">
              <V.KijkerRechten />
            </RasterCel>
            <RasterCel b={s.team.cellen[2]} stapel alt="Het scherm van een kijker: alleen Lindeman Warmte, een menu zonder Beheer en wat er op de kijker wacht.">
              <V.SchermVanDeKijker />
            </RasterCel>
            <RasterCel b={s.team.cellen[3]} alt="De systeemstatus: het achtergrondwerk is gekoppeld, één taak is niet gelukt en er staat waarom en wat je doet.">
              <V.AlsErIetsMisgaat />
            </RasterCel>
          </Raster>
        </Sectie>

        {/* 4. Kosten en sleutels */}
        <Sectie id={s.kosten.id}>
          <Intro id={s.kosten.id} label={s.kosten.label} titel={s.kosten.titel} tekst={s.kosten.tekst} link={s.kosten.link} />
          <Beeld b={s.kosten.beeld} breedte={1180} hoogte={600} alt="Beheer, Kosten: in oktober 46 euro van een limiet van 250 euro, ongeveer 51,80 euro die volgende maand vanzelf loopt, en het verbruik per soort werk.">
            <V.BeheerKosten />
          </Beeld>
          <Raster>
            <RasterCel b={s.kosten.cellen[0]} alt="De knop Schrijf deze pagina nu met de schatting van ongeveer 1,20 euro per pagina, en schattingen bij drie andere betaalde knoppen.">
              <V.PrijsBijKnop />
            </RasterCel>
            <RasterCel b={s.kosten.cellen[1]} alt="De kosten van oktober per bedrijf: Lindeman Warmte 12,40 euro, Tandartspraktijk Lunetten 9,60 euro, Verbeek Bouw en Renovatie 8,20 euro, samen 46 euro.">
              <V.KostenPerKlant />
            </RasterCel>
            <RasterCel b={s.kosten.cellen[2]} alt="De sleutels van Bureau Noordwind: OpenAI en Gemini zijn ingevuld en werken, DataForSEO is nog niet ingevuld.">
              <V.Sleutels />
            </RasterCel>
            <RasterCel b={s.kosten.cellen[3]} stapel alt="De melding dat de maandlimiet van het bureau bereikt is: nieuw werk dat geld kost start weer op 1 november.">
              <V.MaandlimietBereikt />
            </RasterCel>
          </Raster>
        </Sectie>

        {/* 5. Gegevens */}
        <Sectie id={s.gegevens.id}>
          <Intro id={s.gegevens.id} label={s.gegevens.label} titel={s.gegevens.titel} tekst={s.gegevens.tekst} />
          <Raster>
            <RasterCel b={s.gegevens.cellen[0]} alt="Twee gearchiveerde bedrijven met de knop Terughalen.">
              <V.Archief />
            </RasterCel>
            <RasterCel b={s.gegevens.cellen[1]} alt="Een bedrijf definitief verwijderen: eerst staat er wat weggaat, daarna typ je de naam over.">
              <V.Verwijderen />
            </RasterCel>
          </Raster>
        </Sectie>
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
