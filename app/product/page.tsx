import type { Metadata } from 'next'
import Link from 'next/link'
import {
  afsluiter,
  bureauSectie,
  demoHref,
  hero,
  inputSectie,
  kennisSectie,
  meta,
  opvolgingSectie,
  planningSectie,
  publicerenSectie,
  ronde,
  schrijfSectie,
  verslagSectie,
  zichtbaarheidSectie,
} from '@/content/product'
import { Shot } from '@/components/product/Shot'
import { Lightbox } from '@/components/product/Lightbox'
import './product.css'

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/product' },
  openGraph: { title: `${meta.title} – ORBIT ENGINE`, description: meta.description, url: '/product', images: [{ url: '/images/product/product-01-openstaande-taken.webp' }] },
}

// Opbouw naar linear.app: korte koppen, grote productbeelden op een rustig vlak, en afwisseling
// tussen één breed beeld, twee naast elkaar en tekst naast een beeld. Alle beelden zijn echte
// schermen van de app met voorbeeldgegevens (scripts/product-screenshots).

const BREED = '(max-width: 640px) 100vw, (max-width: 1352px) calc(100vw - 72px), 1280px'
const HELFT = '(max-width: 900px) 100vw, 640px'

function Kop({ id, title, description, children }: { id: string; title: string; description: string; children?: React.ReactNode }) {
  return (
    <div className="feature-header pd-header">
      <h2 id={`${id}-titel`} className="feature-title">{title}</h2>
      <div className="feature-description">
        <p>{description}</p>
        {children}
      </div>
    </div>
  )
}

function Label({ children, voorbeeld = false }: { children: React.ReactNode; voorbeeld?: boolean }) {
  return (
    <span className="pd-labels">
      <span className="pd-label">{children}</span>
      {voorbeeld && <span className="pd-label pd-label-muted">Voorbeeldgegevens</span>}
    </span>
  )
}

export default function ProductPage() {
  return (
    <div className="home pd">
      {/* 1. Hero */}
      <section className="container pd-hero" aria-labelledby="pd-titel">
        <p className="pd-eyebrow">{hero.eyebrow}</p>
        <h1 id="pd-titel" className="home-title pd-title">{hero.title}</h1>
        <p className="pd-hero-description">{hero.description}</p>
        <div className="pd-actions">
          <Link href={demoHref} className="btn btn-lg btn-invert">{hero.cta}</Link>
          <a href="#zichtbaarheid" className="btn btn-lg btn-secondary">{hero.secondary}</a>
        </div>
      </section>

      <div className="hero-stage pd-stage">
        <div className="hero-backdrop" />
        <div className="container pd-hero-figure">
          <Shot shot={hero.shot} sizes={BREED} priority label="Openstaande taken" />
        </div>
      </div>

      <div className="container">
        <p className="pd-note">{hero.note}</p>
        <nav className="pd-ronde" aria-label="Een maand in ORBIT ENGINE">
          <ol>
            {ronde.map((stap, i) => (
              <li key={stap.label}>
                <a href={stap.href}>
                  <span className="pd-ronde-nr" aria-hidden="true">{i + 1}</span>
                  {stap.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* 2. AI-zichtbaarheid: groot overzicht met een leesbaar detail */}
        <section id={zichtbaarheidSectie.id} className="feature pd-section" aria-labelledby={`${zichtbaarheidSectie.id}-titel`}>
          <div className="keyline" />
          <Kop id={zichtbaarheidSectie.id} title={zichtbaarheidSectie.title} description={zichtbaarheidSectie.description} />
          <div className="pd-panel pd-panel-wide">
            <Shot shot={zichtbaarheidSectie.overzicht} sizes={BREED} label="Zichtbaarheid in AI" />
          </div>
          <div className="pd-split pd-split-detail">
            <div className="pd-text">
              <h3>{zichtbaarheidSectie.detailTitle}</h3>
              <p>{zichtbaarheidSectie.detailText}</p>
              <p className="pd-note pd-note-left">{zichtbaarheidSectie.note}</p>
            </div>
            <div className="pd-panel pd-panel-tight">
              <Shot shot={zichtbaarheidSectie.detail} sizes={HELFT} label="Een AI-antwoord met de genoemde bedrijven" />
            </div>
          </div>
        </section>

        {/* 3. Bedrijfskennis: twee gelijkwaardige panelen */}
        <section id={kennisSectie.id} className="feature pd-section" aria-labelledby={`${kennisSectie.id}-titel`}>
          <div className="keyline" />
          <Kop id={kennisSectie.id} title={kennisSectie.title} description={kennisSectie.description} />
          <div className="pd-pair">
            {kennisSectie.shots.map((s) => (
              <figure key={s.title} className="pd-card">
                <div className="pd-panel pd-panel-card">
                  <Shot shot={s} sizes={HELFT} label={s.title} />
                </div>
                <figcaption>
                  <h3>{s.title}</h3>
                  <p>{s.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 4. Contentkansen en planning: eerst het voorstel, dan het plan */}
        <section id={planningSectie.id} className="feature pd-section" aria-labelledby={`${planningSectie.id}-titel`}>
          <div className="keyline" />
          <Kop id={planningSectie.id} title={planningSectie.title} description={planningSectie.description} />
          <div className="pd-split pd-split-idee">
            <div className="pd-panel pd-panel-idee">
              <Shot shot={planningSectie.idee} sizes="(max-width: 900px) 100vw, 420px" label="Een pagina-idee met onderbouwing" />
            </div>
            <div className="pd-text">
              <h3>{planningSectie.ideeTitle}</h3>
              <p>{planningSectie.ideeText}</p>
            </div>
          </div>
          <figure className="pd-card pd-card-wide">
            <div className="pd-panel pd-panel-wide">
              <Shot shot={planningSectie.plan} sizes={BREED} label="Het contentplan" />
            </div>
            <figcaption>
              <p>{planningSectie.planCaption}</p>
            </figcaption>
          </figure>
        </section>

        {/* 5. Klantinput: team en klant naast elkaar */}
        <section id={inputSectie.id} className="feature pd-section" aria-labelledby={`${inputSectie.id}-titel`}>
          <div className="keyline" />
          <Kop id={inputSectie.id} title={inputSectie.title} description={inputSectie.description} />
          <div className="pd-pair pd-pair-input">
            {[inputSectie.team, inputSectie.klant].map((s, i) => (
              <figure key={s.label} className="pd-card">
                <div className={`pd-panel pd-panel-card${i === 1 ? ' pd-panel-phone' : ''}`}>
                  <Shot shot={s} sizes={i === 1 ? '(max-width: 900px) 80vw, 340px' : HELFT} label={s.label} className={i === 1 ? 'pd-frame-phone' : undefined} />
                </div>
                <figcaption>
                  <Label>{s.label}</Label>
                  <p>{s.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 6. Schrijven en controleren: een groot tekstbeeld met een leesbaar detail */}
        <section id={schrijfSectie.id} className="feature pd-section" aria-labelledby={`${schrijfSectie.id}-titel`}>
          <div className="keyline" />
          <Kop id={schrijfSectie.id} title={schrijfSectie.title} description={schrijfSectie.description} />
          <div className="pd-panel pd-panel-wide pd-panel-fade">
            <Shot shot={schrijfSectie.tekst} sizes={BREED} label="De geschreven pagina" />
          </div>
          <div className="pd-split pd-split-detail">
            <div className="pd-text">
              <h3>{schrijfSectie.zinnenTitle}</h3>
              <p>{schrijfSectie.zinnenText}</p>
            </div>
            <div className="pd-panel pd-panel-tight">
              <Shot shot={schrijfSectie.zinnen} sizes={HELFT} label="Loop deze zinnen na" />
            </div>
          </div>
        </section>

        {/* 7. Goedkeuren en publiceren: tekst naast het beeld */}
        <section id={publicerenSectie.id} className="feature pd-section" aria-labelledby={`${publicerenSectie.id}-titel`}>
          <div className="keyline" />
          <div className="pd-split pd-split-publiceren">
            <div className="pd-text pd-text-large">
              <h2 id={`${publicerenSectie.id}-titel`} className="feature-title">{publicerenSectie.title}</h2>
              <p className="pd-lead">{publicerenSectie.description}</p>
              <ul className="pd-checks">
                {publicerenSectie.punten.map((p) => (
                  <li key={p}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7" /></svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pd-panel pd-panel-card">
              <Shot shot={publicerenSectie.shot} sizes={HELFT} label="Een goedgekeurde pagina" />
            </div>
          </div>
        </section>

        {/* 8. Opvolging: AI-vermeldingen en Google naast elkaar */}
        <section id={opvolgingSectie.id} className="feature pd-section" aria-labelledby={`${opvolgingSectie.id}-titel`}>
          <div className="keyline" />
          <Kop id={opvolgingSectie.id} title={opvolgingSectie.title} description={opvolgingSectie.description} />
          <div className="pd-pair pd-pair-opvolging">
            {[opvolgingSectie.ai, opvolgingSectie.google].map((s, i) => (
              <figure key={s.label} className="pd-card">
                <div className={`pd-panel pd-panel-card${i === 0 ? ' pd-panel-drawer' : ''}`}>
                  <Shot shot={s} sizes={i === 0 ? '(max-width: 900px) 90vw, 420px' : HELFT} label={s.label} />
                </div>
                <figcaption>
                  <Label voorbeeld>{s.label}</Label>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="pd-note pd-note-left">{opvolgingSectie.note}</p>
        </section>

        {/* 9. Rapportage: één rapport met veel ruimte */}
        <section id={verslagSectie.id} className="feature pd-section" aria-labelledby={`${verslagSectie.id}-titel`}>
          <div className="keyline" />
          <Kop id={verslagSectie.id} title={verslagSectie.title} description={verslagSectie.description} />
          <figure className="pd-card">
            <div className="pd-panel pd-panel-report">
              <Shot shot={verslagSectie.shot} sizes="(max-width: 1024px) 100vw, 920px" label="Het maandverslag" />
            </div>
            <figcaption>
              <Label voorbeeld>Maandverslag september</Label>
            </figcaption>
          </figure>
        </section>

        {/* 10. Bureauoverzicht en beheer: eerst breed, daaronder twee kleinere */}
        <section id={bureauSectie.id} className="feature pd-section" aria-labelledby={`${bureauSectie.id}-titel`}>
          <div className="keyline" />
          <Kop id={bureauSectie.id} title={bureauSectie.title} description={bureauSectie.description} />
          <div className="pd-panel pd-panel-wide">
            <Shot shot={bureauSectie.overzicht} sizes={BREED} label="Het werkoverzicht Merken" />
          </div>
          <div className="pd-pair pd-pair-beheer">
            {[bureauSectie.toegang, bureauSectie.kosten].map((s) => (
              <figure key={s.label} className="pd-card">
                <div className="pd-panel pd-panel-card">
                  <Shot shot={s} sizes={HELFT} label={s.label} />
                </div>
                <figcaption>
                  <Label voorbeeld={s.label === 'Kosten'}>{s.label}</Label>
                  <p>{s.caption}</p>
                </figcaption>
              </figure>
            ))}
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

      <Lightbox />
    </div>
  )
}
