// Drie nagebouwde schermen van ORBIT ENGINE achter elkaar, naar het voorbeeld van linear.app/intake.
// Ze volgen de echte schermen in de app: Mijn clusters (strategie/clusters), Openstaande vragen
// (strategie/vragen) en de kalender van het Contentplan (strategie/plan). Statusnamen en knoppen
// zijn letterlijk die uit de app; namen en cijfers zijn voorbeelddata van het verzonnen merk uit de hero.
import { showcase } from '@/content/home'

type Tone = 'wacht' | 'loopt' | 'klaar'

function Chip({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return <span className="sc-chip" data-tone={tone}>{children}</span>
}

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3.5 8.5 3 3 6-7" />
    </svg>
  )
}

function Skeleton({ widths }: { widths: number[] }) {
  return (
    <div className="sc-skeleton">
      {widths.map((w, i) => <span key={i}><i /><b style={{ width: `${w}%` }} /></span>)}
    </div>
  )
}

const clusters: { name: string; updated: string; status: string; tone: Tone; metrics: [string, string][] | null }[] = [
  { name: 'Bakfiets leasen', updated: 'Vandaag bijgewerkt', status: 'Klaar voor jouw akkoord', tone: 'wacht', metrics: [['21%', 'zichtbaarheid'], ['18', 'zoekopdrachten'], ['4', 'voorgesteld']] },
  { name: 'E-bike onderhoud', updated: '2 dagen geleden', status: 'Gereed', tone: 'klaar', metrics: [['38%', 'zichtbaarheid'], ['24', 'zoekopdrachten'], ['6', 'voorgesteld']] },
  { name: 'Haal- en brengservice', updated: '3 dagen geleden', status: 'Meting loopt…', tone: 'loopt', metrics: null },
]

function Clusters() {
  return (
    <>
      <div className="sc-head">
        <span className="sc-eyebrow">Clusters</span>
        <span className="sc-title">Mijn clusters</span>
        <span className="sc-desc">Elk cluster is één onderwerp waarop ORBIT ENGINE je zichtbaarheid volgt.</span>
      </div>
      <div className="sc-list">
        {clusters.map((c) => (
          <div className="sc-row" key={c.name}>
            <div className="sc-row-top">
              <span className="sc-row-name">{c.name}</span>
              <Chip tone={c.tone}>{c.status}</Chip>
            </div>
            <span className="sc-mono">{c.updated}</span>
            {c.metrics ? (
              <span className="sc-metrics">
                {c.metrics.map(([v, l], i) => <span key={l}>{i > 0 && <em>·</em>}<strong>{v}</strong> {l}</span>)}
              </span>
            ) : (
              <span className="sc-metrics sc-muted">Nog geen metingen</span>
            )}
          </div>
        ))}
      </div>
      <Skeleton widths={[62, 40, 54]} />
    </>
  )
}

function Vragen() {
  return (
    <>
      <div className="sc-head">
        <span className="sc-eyebrow">Strategie</span>
        <span className="sc-title">Openstaande vragen</span>
      </div>
      <div className="sc-group">
        <span className="sc-mono">Pagina</span>
        <div className="sc-group-top">
          <span className="sc-group-name">Wat kost een onderhoudsbeurt voor een e-bike?</span>
          <span className="sc-caption">1 van 3 gedaan</span>
        </div>
        <span className="sc-caption">ORBIT ENGINE schrijft deze pagina zodra elke vraag beantwoord of overgeslagen is.</span>
      </div>
      <div className="sc-question" data-open>
        <span className="sc-q">Welke onderhoudsbeurten bied je aan, en wat kosten ze?</span>
        <span className="sc-caption">Zonder bedragen kan de pagina de vraag van je klant niet beantwoorden.</span>
        <span className="sc-field">Kleine beurt € 69, grote beurt € 119, accucheck gratis bij elke beurt.<i /></span>
        <span className="sc-buttons"><span className="sc-btn" data-primary>Antwoord opslaan</span><span className="sc-btn">Overslaan</span></span>
      </div>
      <div className="sc-question">
        <span className="sc-check"><Check /></span>
        <span className="sc-q-done">
          <span className="sc-q">Hoe lang duurt een beurt gemiddeld?</span>
          <span className="sc-caption">Meestal binnen één werkdag</span>
        </span>
      </div>
      <Skeleton widths={[58, 44]} />
    </>
  )
}

// November 2026: de 1e valt op een zondag. Per dag het aantal pagina's en de kleur van de
// status die in de app voorgaat (wachten op jou gaat voor klaar, klaar voor gepland).
const dagen: Record<number, { n: number; tone: Tone }> = {
  3: { n: 1, tone: 'klaar' },
  6: { n: 1, tone: 'klaar' },
  10: { n: 2, tone: 'wacht' },
  13: { n: 1, tone: 'loopt' },
  17: { n: 1, tone: 'loopt' },
  20: { n: 2, tone: 'loopt' },
  24: { n: 1, tone: 'loopt' },
  27: { n: 1, tone: 'loopt' },
}

const ingepland: { dag: string; title: string; status: string; tone: Tone }[] = [
  { dag: '10 nov', title: 'Wat kost een onderhoudsbeurt voor een e-bike?', status: 'Tekst klaar voor akkoord', tone: 'wacht' },
  { dag: '13 nov', title: 'Bakfiets leasen of kopen: wat past bij jou?', status: 'Gepland', tone: 'loopt' },
  { dag: '17 nov', title: 'Zo werkt onze haal- en brengservice', status: 'Gepland', tone: 'loopt' },
]

function Kalender() {
  const leeg = 6 // maandag tot en met zaterdag vóór zondag 1 november
  return (
    <>
      <div className="sc-head">
        <span className="sc-eyebrow">Strategie</span>
        <span className="sc-title">Contentplan</span>
      </div>
      <div className="sc-month">
        <div className="sc-month-top"><span>november 2026</span><span className="sc-mono">10</span></div>
        <div className="sc-weekdays">{['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'].map((d) => <span key={d}>{d}</span>)}</div>
        <div className="sc-days">
          {Array.from({ length: leeg }, (_, i) => <span key={`l${i}`} data-empty />)}
          {Array.from({ length: 30 }, (_, i) => {
            const dag = i + 1
            const d = dagen[dag]
            return (
              <span key={dag} data-tone={d?.tone}>
                {dag}
                {d && <b>{d.n}</b>}
              </span>
            )
          })}
        </div>
      </div>
      <div className="sc-planned">
        {ingepland.map((p) => (
          <div className="sc-planned-row" key={p.dag}>
            <span className="sc-mono">{p.dag}</span>
            <span className="sc-planned-title">{p.title}</span>
            <Chip tone={p.tone}>{p.status}</Chip>
          </div>
        ))}
      </div>
    </>
  )
}

export function Showcase() {
  return (
    <div className="sc-root">
      <div className="sc-stage" aria-hidden="true">
        <div className="sc-screen" data-pos="back"><Clusters /></div>
        <div className="sc-screen" data-pos="mid"><Vragen /></div>
        <div className="sc-screen" data-pos="front"><Kalender /></div>
      </div>
      <div className="sc-caption-block">
        <h3>{showcase.title}</h3>
        <p>{showcase.description}</p>
      </div>
    </div>
  )
}
