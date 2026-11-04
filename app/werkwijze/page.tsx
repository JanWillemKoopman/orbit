import type { Metadata } from 'next'
import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { afsluiter, hero, meta, stappen, type Stap } from '@/content/werkwijze'
import { PaginaHero } from '@/components/product/Blokken'
import * as V from '@/components/product/Visuals'
import * as W from '@/components/werkwijze/Visuals'
import { StappenBalk } from '@/components/werkwijze/StappenBalk'
import '../pagina.css'
import './werkwijze.css'
import './stappen.css'

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/werkwijze' },
  openGraph: { title: `${meta.title} – Orbit`, description: meta.description, url: '/werkwijze', images: [{ url: '/images/product/og-werkwijze.png', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', images: ['/images/product/og-werkwijze.png'] },
}

// Opbouw naar linear.app: de hero van de productpagina's, een overzicht van de tien stappen als raster
// met dunne lijnen, en per stap een genummerde kop met de tekst rechts en daaronder een beeld. Een balk
// onder de header laat zien bij welke stap je bent. De beelden zijn nagebouwde schermen van Orbit.

const nr = (n: number) => String(n).padStart(2, '0')

/** Een groot beeld over de volle breedte, zonder bijschrift: de tekst van de stap staat erboven. */
function Groot({ alt, hoogte, breedte = 1120, children }: { alt: string; hoogte: number; breedte?: number; children: React.ReactNode }) {
  return (
    <figure className="lp-beeld lp-beeld-scherm ww-beeld" style={{ '--stage-h': `${hoogte}px`, '--comp-w': `${breedte}px` } as React.CSSProperties}>
      <div className="lp-beeld-stage" role="img" aria-label={alt}>
        <div className="lp-beeld-inner" aria-hidden="true">{children}</div>
      </div>
    </figure>
  )
}

/** Twee of vier cellen met gedeelde randen, elk met één onderdeel van dichtbij. */
function Cellen({ cellen }: { cellen: { alt: string; telefoon?: boolean; beeld: React.ReactNode }[] }) {
  return (
    <div className="lp-raster ww-beeld">
      {cellen.map((c) => (
        <figure key={c.alt} className={`lp-cel ww-cel${c.telefoon ? ' lp-cel-telefoon' : ''}`}>
          <div className="lp-cel-stage" role="img" aria-label={c.alt}>
            <div className="lp-cel-inner" aria-hidden="true">{c.beeld}</div>
          </div>
        </figure>
      ))}
    </div>
  )
}

const BEELDEN: Record<string, React.ReactNode> = {
  'klant-toevoegen': (
    <Cellen cellen={[
      { alt: 'Het formulier Nieuw bedrijf met alleen een naam, Lindeman Warmte, en een website.', beeld: <W.NieuwBedrijf /> },
      { alt: "Het onderzoek dat daarna loopt: 64 pagina's van de website gelezen, 9 diensten in kaart, 5 concurrenten gevonden, en de test van wat AI al weet is bezig.", beeld: <W.Merkdossier /> },
    ]} />
  ),
  'klant-onboarden': (
    <Cellen cellen={[
      { alt: "Het kennismakingsgesprek: groeidoel meer aanvragen voor hybride warmtepompen, nieuwe regio Amersfoort en geen airco's meer.", beeld: <V.Kennismakingsgesprek /> },
      { alt: 'De kennisbank met vier feiten, elk met zijn bron: de klant, de prijslijst, de website of de brochure.', beeld: <W.Kennisbank /> },
    ]} />
  ),
  nulmeting: (
    <Cellen cellen={[
      { alt: 'Dertig AI-vragen over hybride warmtepompen in drie fasen: oriëntatie, overweging en beslissing, met per fase een voorbeeldvraag.', beeld: <V.VragenKlantreis /> },
      { alt: 'ChatGPT noemt bij de vraag welke installateur in Utrecht goed is in hybride warmtepompen drie concurrenten, en Lindeman Warmte niet.', beeld: <V.AiAntwoord /> },
    ]} />
  ),
  contentplan: (
    <Groot hoogte={560} breedte={1240} alt="Het contentplan met een kolom per maand, van oktober tot januari, en per pagina een gekleurde stip voor de stand.">
      <V.ContentplanBord />
    </Groot>
  ),
  voorbereiding: (
    <Cellen cellen={[
      { alt: 'De briefing van de pagina Hybride warmtepomp laten installeren in Utrecht: 14 feiten uit de kennisbank, 6 bronnen van internet en drie punten die erop moeten.', beeld: <W.Briefing /> },
      { alt: 'Drie dingen die Orbit niet weet, prijs, garantie en ervaring, staan als vraag klaar voor de klant.', beeld: <W.NietVerzinnen /> },
    ]} />
  ),
  'klant-vult-aan': (
    <Cellen cellen={[
      { alt: 'De vragen voor Lindeman Warmte per pagina, met de deadline 18 oktober en een link om door te sturen.', beeld: <W.VragenMetDeadline /> },
      { alt: 'Op een telefoon beantwoordt de klant de vraag over de prijsopbouw, zonder account.', telefoon: true, beeld: <V.VragenKlant /> },
    ]} />
  ),
  'orbit-schrijft': (
    <Groot hoogte={640} alt="Een geschreven pagina: het antwoord van de klant is groen gemarkeerd, een termijn zonder bron geel. Rechts wat er bij de pagina hoort: titel, metatitel, omschrijving, veelgestelde vragen, gestructureerde gegevens en interne links.">
      <V.PaginaScherm />
    </Groot>
  ),
  'goedkeuren-en-live': (
    <Cellen cellen={[
      { alt: 'De eindredactie: elke harde bewering heeft een bron, de merkstem klopt, geen verboden woorden, en één zin om na te lopen.', beeld: <V.Eindredactie /> },
      { alt: 'Een gemarkeerde zin over een installatietermijn van twee weken met de knoppen Klopt en Vraag het bedrijf.', beeld: <V.ZinNalopen /> },
      { alt: 'Het kopieermenu van een goedgekeurde pagina: kopieer als HTML, Markdown of platte tekst, en meld dat hij live staat.', beeld: <V.Publiceren /> },
      { alt: 'De publicatiecontrole: de pagina en de tekst zijn gevonden en de nameting staat ingepland.', beeld: <V.Publicatiecontrole /> },
    ]} />
  ),
  'effect-meting': (
    <Cellen cellen={[
      { alt: 'Van de acht doelvragen werd de klant vóór publicatie bij geen genoemd, na 14 dagen bij 3 en na 28 dagen bij 5.', beeld: <V.Hermeting /> },
      { alt: 'Klikken uit Google per dag vanaf de dag dat de pagina live ging, oplopend tot 262 klikken.', beeld: <V.Zoekverkeer /> },
    ]} />
  ),
  maandverslag: (
    <Groot hoogte={640} alt="Het verslag van september van Bureau Noordwind voor Lindeman Warmte: zichtbaarheid 39 procent, vijf pagina's live en 1.204 klikken uit Google.">
      <V.Maandverslag />
    </Groot>
  ),
}

function StapSectie({ s }: { s: Stap }) {
  return (
    <section id={s.id} className="ww-stap" aria-labelledby={`${s.id}-titel`}>
      <div className="ww-kop">
        <p className="ww-nr" aria-hidden="true">{nr(s.nr)}<span> / {stappen.length}</span></p>
        <h2 id={`${s.id}-titel`} className="ww-titel">
          <span className="sr-only">Stap {s.nr}: </span>{s.titel}
        </h2>
        <div className="ww-tekst">
          <p className="ww-aanloop">{s.aanloop}</p>
          <p>{s.tekst}</p>
        </div>
      </div>
      {BEELDEN[s.id]}
    </section>
  )
}

export default function WerkwijzePage() {
  return (
    <div className="home lp ww">
      <PaginaHero eyebrow={hero.eyebrow} titel={hero.title} video="hero-werkwijze" />

      {/* Overzicht: alle tien stappen in één oogopslag */}
      <nav className="container ww-overzicht" aria-label="De tien stappen">
        <ol className="ww-index">
          {stappen.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`}>
                <span className="ww-index-nr">{nr(s.nr)}</span>
                <span className="ww-index-titel">{s.titel}</span>
                <span className="ww-index-pijl" aria-hidden="true">↓</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="ww-stappen">
        <StappenBalk stappen={stappen.map(({ id, nr, titel }) => ({ id, nr, titel }))} />
        <div className="container">
          {stappen.map((s) => <StapSectie key={s.id} s={s} />)}
        </div>
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
