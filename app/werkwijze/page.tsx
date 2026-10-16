import type { Metadata } from 'next'
import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { afsluiter, hero, meta, secties } from '@/content/werkwijze'
import { Beeld, Intro, PaginaHero, Raster, RasterCel, Sectie } from '@/components/product/Blokken'
import * as V from '@/components/product/Visuals'
import '../pagina.css'
import './werkwijze.css'

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/werkwijze' },
  openGraph: { title: `${meta.title} – Orbit`, description: meta.description, url: '/werkwijze', images: [{ url: '/images/product/og-werkwijze.png', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', images: ['/images/product/og-werkwijze.png'] },
}

// Opbouw naar linear.app/ai (components/product/Blokken.tsx, app/pagina.css): hero, vijf secties met
// een intro en een groot beeld of raster, de rij met de vier productpagina's en de afsluiter. De
// beelden zijn nagebouwd (components/product/Visuals.tsx).

export default function WerkwijzePage() {
  const s = secties
  return (
    <div className="home lp">
      <PaginaHero eyebrow={hero.eyebrow} titel={hero.title} video="hero-werkwijze" />

      <div className="container">
        {/* 1. Start */}
        <Sectie id={s.start.id}>
          <Intro id={s.start.id} label={s.start.label} titel={s.start.titel} tekst={s.start.tekst} link={s.start.link} />
          <Beeld b={s.start.beeld} hoogte={800} alt="Het scherm Openstaande taken van Lindeman Warmte: twee vragen bij de klant, een tekst om na te kijken en een pagina om te plaatsen, met de balk van de vijf stappen van deze maand. Erachter het venster Meldingen.">
            <V.OpenstaandeTaken />
          </Beeld>
          <Raster>
            <RasterCel b={s.start.cellen[0]} alt="De lijst Dit bedrijf inrichten: vijf van acht stappen zijn afgevinkt, daarna volgen elke maand meten, Search Console en het contentplan.">
              <V.DitBedrijfInrichten />
            </RasterCel>
            <RasterCel b={s.start.cellen[1]} alt="Het kennismakingsgesprek: groeidoel meer aanvragen voor hybride warmtepompen, nieuwe regio Amersfoort en geen airco's meer.">
              <V.Kennismakingsgesprek />
            </RasterCel>
          </Raster>
        </Sectie>

        {/* 2. Meten */}
        <Sectie id={s.meten.id}>
          <Intro id={s.meten.id} label={s.meten.label} titel={s.meten.titel} tekst={s.meten.tekst} link={s.meten.link} />
          <Beeld b={s.meten.beeld} hoogte={720} alt="Grafiek van de zichtbaarheid in AI voor hybride warmtepompen: van 17 procent in juni naar 47 procent in oktober, met een marge van 10 procentpunt die smaller wordt.">
            <V.ZichtbaarheidGrafiek />
          </Beeld>
          <Raster>
            <RasterCel b={s.meten.cellen[0]} alt="Dertig AI-vragen over hybride warmtepompen in drie fasen: oriëntatie, overweging en beslissing, met per fase een voorbeeldvraag.">
              <V.VragenKlantreis />
            </RasterCel>
            <RasterCel b={s.meten.cellen[1]} alt="ChatGPT noemt bij de vraag welke installateur in Utrecht goed is in hybride warmtepompen drie concurrenten, en Lindeman Warmte niet.">
              <V.AiAntwoord />
            </RasterCel>
            <RasterCel b={s.meten.cellen[2]} alt="Zichtbaarheid 47 procent met een marge van 10 procentpunt. Er tellen 42 van 90 vragen mee, uit drie samengevoegde rondes.">
              <V.CijferMetMarge />
            </RasterCel>
            <RasterCel b={s.meten.cellen[3]} alt="Hoe vaak elk bedrijf genoemd wordt: Warmtewerk Utrecht 58 procent, Lindeman Warmte 47 procent, Domstad Installaties 41 procent, KlimaatPro 29 procent.">
              <V.AandeelGenoemd />
            </RasterCel>
          </Raster>
        </Sectie>

        {/* 3. Plannen */}
        <Sectie id={s.plannen.id}>
          <Intro id={s.plannen.id} label={s.plannen.label} titel={s.plannen.titel} tekst={s.plannen.tekst} />
          <Beeld b={s.plannen.beeld} hoogte={560} breedte={1240} alt="Het contentplan met een kolom per maand en per pagina een gekleurde stip voor de stand.">
            <V.ContentplanBord />
          </Beeld>
          <Raster>
            <RasterCel b={s.plannen.cellen[0]} alt="Een AI-vraag wordt een kans met potentie 78, en die kans wordt een pagina.">
              <V.VanVraagNaarPagina />
            </RasterCel>
            <RasterCel b={s.plannen.cellen[1]} alt="Het pagina-idee Hybride warmtepomp laten installeren in Utrecht met potentie 78 en de knop Plan in oktober.">
              <V.PaginaIdee />
            </RasterCel>
          </Raster>
        </Sectie>

        {/* 4. Schrijven en publiceren */}
        <Sectie id={s.schrijven.id}>
          <Intro id={s.schrijven.id} label={s.schrijven.label} titel={s.schrijven.titel} tekst={s.schrijven.tekst} link={s.schrijven.link} />
          <Beeld b={s.schrijven.beeld} hoogte={640} alt="Een geschreven pagina: het antwoord van de klant is groen gemarkeerd, een termijn zonder bron geel. Rechts wat er bij de pagina hoort: titel, metatitel, omschrijving, veelgestelde vragen, gestructureerde gegevens en interne links.">
            <V.PaginaScherm />
          </Beeld>
          <Raster>
            <RasterCel b={s.schrijven.cellen[0]} telefoon alt="Op een telefoon beantwoordt de klant de vraag over de prijsopbouw, zonder account.">
              <V.VragenKlant />
            </RasterCel>
            <RasterCel b={s.schrijven.cellen[1]} alt="Een gemarkeerde zin over een installatietermijn van twee weken met de knoppen Klopt en Vraag het bedrijf.">
              <V.ZinNalopen />
            </RasterCel>
            <RasterCel b={s.schrijven.cellen[2]} alt="Het kopieermenu van een goedgekeurde pagina: kopieer als HTML, Markdown of platte tekst, en meld dat hij live staat.">
              <V.Publiceren />
            </RasterCel>
            <RasterCel b={s.schrijven.cellen[3]} alt="De publicatiecontrole: de pagina en de tekst zijn gevonden en de nameting staat ingepland. Is hij niet gevonden, dan volgt na een uur een nieuwe poging.">
              <V.Publicatiecontrole />
            </RasterCel>
          </Raster>
        </Sectie>

        {/* 5. Nameten en laten zien */}
        <Sectie id={s.nameten.id}>
          <Intro id={s.nameten.id} label={s.nameten.label} titel={s.nameten.titel} tekst={s.nameten.tekst} link={s.nameten.link} />
          <Beeld b={s.nameten.beeld} hoogte={640} alt="Het verslag van september van Bureau Noordwind voor Lindeman Warmte: zichtbaarheid 39 procent, vijf pagina's live en 1.204 klikken uit Google.">
            <V.Maandverslag />
          </Beeld>
          <Raster>
            <RasterCel b={s.nameten.cellen[0]} alt="Van de acht doelvragen werd de klant vóór publicatie bij geen genoemd, na 14 dagen bij 3 en na 28 dagen bij 5. Het oordeel na 28 dagen is gestegen, buiten de marge.">
              <V.Hermeting />
            </RasterCel>
            <RasterCel b={s.nameten.cellen[1]} alt="Klikken per dag vanaf de dag dat de pagina live ging, oplopend tot 262 klikken.">
              <V.Zoekverkeer />
            </RasterCel>
          </Raster>
        </Sectie>
      </div>

      {/* Afsluiter */}
      <section className="home-prefooter container pd-afsluiter" aria-labelledby="pd-afsluiter">
        <CtaAchtergrond />
        <h2 id="pd-afsluiter">{afsluiter.title}</h2>
        <p>{afsluiter.description}</p>
        <div className="home-prefooter-actions">
          <PrefooterKnoppen />
        </div>
      </section>
    </div>
  )
}
