import type { Metadata } from 'next'
import { CtaGolf } from '@/components/CtaGolf'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { afsluiter, hero, meta, secties } from '@/content/kwaliteit'
import { Beeld, Intro, Linkrij, PaginaHero, Raster, RasterCel, Sectie } from '@/components/product/Blokken'
import * as P from '@/components/product/Visuals'
import * as V from '@/components/kennis/Visuals'
import '../werkwijze/werkwijze.css'
import '../beheer/beheer.css'
import '../pagina.css'
import './kwaliteit.css'
import '../pagina-mobiel.css'

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/kwaliteit' },
  openGraph: { title: `${meta.title} – ORBIT ENGINE`, description: meta.description, url: '/kwaliteit', images: [{ url: '/images/product/og-kwaliteit.png', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', images: ['/images/product/og-kwaliteit.png'] },
}

// Opbouw naar linear.app/ai (components/product/Blokken.tsx, app/pagina.css), zoals Werkwijze: hero,
// vijf secties met een intro en een groot beeld of raster, de rij met de vier productpagina's en de
// afsluiter. Het verhaal: AI verzint, eerst weten, twijfel wordt geel, het feitenbestand blijft bij,
// en wat gecontroleerd wordt tegenover wat jij beslist.

export default function KwaliteitPage() {
  const s = secties
  return (
    <div className="home lp">
      <PaginaHero eyebrow={hero.eyebrow} titel={hero.title} video="hero-kwaliteit" />

      <div className="container">
        {/* 1. Het probleem */}
        <Sectie id={s.probleem.id}>
          <Intro id={s.probleem.id} label={s.probleem.label} titel={s.probleem.titel} tekst={s.probleem.tekst} link={s.probleem.link} />
          <Beeld b={s.probleem.beeld} hoogte={640} alt="Een alinea over een hybride warmtepomp. Elke harde bewering heeft een nummer met de bron: bevestigd door de klant, uit de tarievenlijst en van de garantiepagina. Achter de tekst het document tarieven-2026.pdf met het bedrag gemarkeerd.">
            <V.HerkomstCompositie />
          </Beeld>
          <Raster>
            <RasterCel b={s.probleem.cellen[0]} alt="Een tekst van een gewone AI-schrijver met drie verzonnen beweringen: installatie binnen 48 uur, 10 jaar garantie en een keurmerk.">
              <V.GewoneAi />
            </RasterCel>
            <RasterCel b={s.probleem.cellen[1]} stapel alt="Dezelfde tekst in ORBIT ENGINE: twee beweringen met een bron en één gele zin om na te lopen.">
              <V.OrbitTekst />
            </RasterCel>
          </Raster>
        </Sectie>

        {/* 2. Eerst weten */}
        <Sectie id={s.weten.id}>
          <Intro id={s.weten.id} label={s.weten.label} titel={s.weten.titel} tekst={s.weten.tekst} link={s.weten.link} />
          <Beeld b={s.weten.beeld} breedte={1040} hoogte={640} alt="Feiten en kennis van Lindeman Warmte als tabel: per feit de bron, hoe zeker het is en of het in een tekst mag. Een vermoeden en een verboden woord mogen nooit.">
            <V.BreinTabel />
          </Beeld>
          <Raster>
            <RasterCel b={s.weten.cellen[0]} alt="Een uitspraak uit het kennismakingsgesprek wordt een nieuw feit: alleen eigen monteurs, gezegd door de klant.">
              <V.VanBinnen />
            </RasterCel>
            <RasterCel b={s.weten.cellen[1]} alt="Drie punten uit de markt: vakkennis, regels en concurrenten, elk gecontroleerd op de bron.">
              <V.VanBuiten />
            </RasterCel>
            <RasterCel b={s.weten.cellen[2]} stapel alt="Het vermoeden grootste installateur van Utrecht komt niet in een tekst tot iemand het bevestigt.">
              <V.Vermoeden />
            </RasterCel>
            <RasterCel b={s.weten.cellen[3]} alt="De zin over 5 jaar garantie is letterlijk teruggevonden op de garantiepagina van de website.">
              <V.Bewijs />
            </RasterCel>
          </Raster>
        </Sectie>

        {/* 3. Twijfel? Dan wordt het geel. */}
        <Sectie id={s.vangnet.id}>
          <Intro id={s.vangnet.id} label={s.vangnet.label} titel={s.vangnet.titel} tekst={s.vangnet.tekst} link={s.vangnet.link} />
          <Beeld b={s.vangnet.beeld} hoogte={640} alt="Een pagina met vier gele zinnen: een termijn, een bedrag, een garantie en een keurmerk. Rechts staat onder elke zin waarom hij geel is.">
            <V.WatWordtGeel />
          </Beeld>
          <Raster>
            <RasterCel b={s.vangnet.cellen[0]} alt="Een zin in de tekst noemt 5 jaar garantie. Hetzelfde getal staat in het feit, en dat is gecontroleerd.">
              <V.FeitNaarZin />
            </RasterCel>
            <RasterCel b={s.vangnet.cellen[1]} alt="De merkstem: aanspreekvorm je en jij, toon nuchter, vakkundig en persoonlijk, en woorden die nooit gebruikt worden.">
              <P.Merkstem />
            </RasterCel>
            <RasterCel b={s.vangnet.cellen[2]} stapel alt="De eindredactie: drie controles geslaagd en één zin om na te lopen.">
              <P.Eindredactie />
            </RasterCel>
            <RasterCel b={s.vangnet.cellen[3]} stapel alt="Een pagina met twee gele zinnen open: Keur goed is uitgeschakeld tot alles is nagelopen.">
              <V.GoedkeurenGeblokkeerd />
            </RasterCel>
          </Raster>
        </Sectie>

        {/* 4. Een feitenbestand dat bijblijft */}
        <Sectie id={s.bijblijven.id}>
          <Intro id={s.bijblijven.id} label={s.bijblijven.label} titel={s.bijblijven.titel} tekst={s.bijblijven.tekst} />
          <Raster>
            <RasterCel b={s.bijblijven.cellen[0]} alt="Twee bronnen zeggen iets anders over de garantie: 3 jaar in een oude brochure, 5 jaar op de website.">
              <V.Tegenstrijdig />
            </RasterCel>
            <RasterCel b={s.bijblijven.cellen[1]} stapel alt="De prijs vanaf 4.500 euro verloopt op 1 januari en moet daarna opnieuw bevestigd worden.">
              <V.Verloopt />
            </RasterCel>
          </Raster>
        </Sectie>

        {/* 5. Wat gecontroleerd wordt en wat jij beslist */}
        <Sectie id={s.eerlijk.id}>
          <Intro id={s.eerlijk.id} label={s.eerlijk.label} titel={s.eerlijk.titel} tekst={s.eerlijk.tekst} />
          <Raster>
            <RasterCel b={s.eerlijk.cellen[0]} alt="Wat ORBIT ENGINE controleert: bedragen en prijzen, termijnen en levertijden, garanties en keurmerken, getallen die niet in de bron staan, namen van concurrenten en woorden die je klant niet wil.">
              <V.ControleLijst />
            </RasterCel>
            <RasterCel b={s.eerlijk.cellen[1]} alt="Wat jij beslist: of de toon past bij het merk, of een tekst overtuigt, algemene uitspraken en wanneer een pagina live gaat.">
              <V.JijBeslist />
            </RasterCel>
          </Raster>
        </Sectie>
      </div>

      <Linkrij huidig="/kwaliteit" />

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
