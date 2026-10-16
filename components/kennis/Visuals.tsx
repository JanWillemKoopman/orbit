// De beelden van /kwaliteit: Feiten en kennis van de fictieve Lindeman Warmte. Elk beeld toont één
// idee: een tekst met de herkomst van elke harde bewering, een verzonnen tekst naast een
// gecontroleerde, de feiten met hun bron en de gele zin die op een besluit wacht.
import { Chip, Icon, Knop, Logo, Mono } from '@/components/product/ui'

/* ── Hero: een alinea met de herkomst van elke bewering ───────────────────── */

export function HeroHerkomst() {
  return (
    <div className="fv-surface kf-hero">
      <span className="fv-doc-h">Hybride warmtepomp laten installeren in Utrecht</span>
      <p>
        Een hybride warmtepomp van Lindeman Warmte staat er{' '}
        <span className="kf-claim" data-n="1">binnen één werkdag<sup>1</sup>
          <span className="fv-tip kf-tip"><Icon naam="check" size={12} />Bevestigd door Pieter Lindeman</span>
        </span>
        . Je betaalt{' '}
        <span className="kf-claim" data-n="2">vanaf € 4.500<sup>2</sup></span>
        {' '}inclusief montage, en op elke installatie krijg je{' '}
        <span className="kf-claim" data-n="3">5 jaar garantie<sup>3</sup></span>.
      </p>
      <div className="kf-bronnen">
        <span><b>1</b>Klant<em>Pieter Lindeman, 3 oktober</em></span>
        <span><b>2</b>Document<em>tarieven-2026.pdf</em></span>
        <span><b>3</b>Website<em>lindeman-warmte.example/garantie</em></span>
      </div>
    </div>
  )
}

/* ── Het probleem ─────────────────────────────────────────────────────────── */

export function GewoneAi() {
  return (
    <div className="fv-surface kf-vs">
      <div className="kf-vs-head"><span className="kf-bot">AI</span><Mono>Gewone AI-schrijver</Mono></div>
      <p>
        Lindeman Warmte installeert je warmtepomp <span className="kf-fout">binnen 48 uur</span>, met{' '}
        <span className="kf-fout">10 jaar garantie</span>. Als <span className="kf-fout">erkend Keurmerk-installateur</span> ben je bij ons in goede handen.
      </p>
      <span className="kf-vs-foot kf-rood"><Icon naam="vraag" size={13} />3 beweringen zonder bron. Je ziet het niet.</span>
    </div>
  )
}

export function OrbitTekst() {
  return (
    <div className="fv-surface kf-vs">
      <div className="kf-vs-head"><Logo size={18} /><Mono>Orbit</Mono></div>
      <p>
        Lindeman Warmte installeert je warmtepomp <span className="kf-goed">binnen één werkdag</span>, met{' '}
        <span className="kf-goed">5 jaar garantie</span>. <span className="fv-yellow">Na je akkoord plannen we binnen twee weken in.</span>
      </p>
      <span className="kf-vs-foot"><Icon naam="check" size={13} />2 met bron, 1 om na te lopen</span>
    </div>
  )
}

/* ── Het brein: twee bronnen, één plek ────────────────────────────────────── */

const BINNEN = [
  { i: 'wereld', t: 'Website', s: '148 pagina’s gelezen' },
  { i: 'mensen', t: 'Kennismakingsgesprek', s: 'Doelen en werkwijze' },
  { i: 'vraag', t: 'Antwoorden van de klant', s: '12 vragen beantwoord' },
  { i: 'pdf', t: 'Brochures en documenten', s: 'tarieven-2026.pdf' },
]
const BUITEN = [
  { i: 'boek', t: 'Vakkennis', s: 'Hoe een hybride warmtepomp werkt' },
  { i: 'feit', t: 'Regels en subsidies', s: 'Wat geldt in de branche' },
  { i: 'zoek', t: 'Concurrenten', s: 'Wat anderen beloven' },
]

function Bron({ i, t, s }: { i: string; t: string; s: string }) {
  return (
    <div className="kf-src">
      <span className="fv-task-icon"><Icon naam={i} /></span>
      <span className="kf-src-t"><strong>{t}</strong><em>{s}</em></span>
    </div>
  )
}

export function BreinSchema() {
  return (
    <div className="kf-schema">
      <div className="kf-col">
        <Mono>Van binnen</Mono>
        {BINNEN.map((b) => <Bron key={b.t} {...b} />)}
      </div>
      <svg className="kf-lines" viewBox="0 0 120 360" preserveAspectRatio="none" aria-hidden="true">
        {[82, 158, 234, 310].map((y) => <path key={y} d={`M0 ${y} C 60 ${y}, 60 180, 120 180`} fill="none" stroke="rgba(188,255,47,0.45)" strokeWidth="1.5" />)}
      </svg>
      <div className="kf-brain">
        <span className="kf-brain-ring"><Logo size={34} /></span>
        <strong>Feiten en kennis</strong>
        <span className="fv-muted">Lindeman Warmte</span>
        <span className="kf-brain-n">Elk feit met een bron</span>
      </div>
      <svg className="kf-lines" viewBox="0 0 120 360" preserveAspectRatio="none" aria-hidden="true">
        {[120, 196, 272].map((y) => <path key={y} d={`M120 ${y} C 60 ${y}, 60 180, 0 180`} fill="none" stroke="rgba(163,173,255,0.45)" strokeWidth="1.5" />)}
      </svg>
      <div className="kf-col">
        <Mono>Van buiten</Mono>
        {BUITEN.map((b) => <Bron key={b.t} {...b} />)}
      </div>
    </div>
  )
}

export function VanBinnen() {
  return (
    <div className="fv-surface kf-quote">
      <Mono>Uit het kennismakingsgesprek</Mono>
      <blockquote>“We werken alleen met eigen monteurs, nooit met onderaannemers.”</blockquote>
      <div className="kf-arrow"><Icon naam="pijl" size={14} />Nieuw feit in Feiten en kennis</div>
      <div className="kf-fact"><span>Alleen eigen monteurs</span><Chip tone="blauw">Gezegd door de klant</Chip></div>
    </div>
  )
}

export function VanBuiten() {
  const rijen = [
    ['Een hybride warmtepomp werkt samen met de cv-ketel', 'Vakkennis'],
    ['Voor subsidie moet de installateur erkend zijn', 'Regels'],
    ['Drie concurrenten noemen installatie binnen een dag', 'Concurrenten'],
  ]
  return (
    <div className="fv-surface kf-market">
      {rijen.map(([t, s]) => (
        <div key={t} className="kf-market-row">
          <span className="kf-market-t">{t}</span>
          <span className="kf-market-s"><Icon naam="link" size={11} />{s} · gecontroleerd op de bron</span>
        </div>
      ))}
    </div>
  )
}

/* ── Het brein als tabel ──────────────────────────────────────────────────── */

const FEITEN = [
  { b: '5 jaar garantie op elke installatie', bron: 'Website', w: '/garantie', st: 'Gevonden met bewijs', tone: 'groen', mag: true },
  { b: 'Installatie binnen één werkdag', bron: 'Klant', w: 'Pieter Lindeman', st: 'Bevestigd', tone: 'lime', mag: true },
  { b: 'Hybride warmtepomp vanaf € 4.500', bron: 'Document', w: 'tarieven-2026.pdf', st: 'Gevonden met bewijs', tone: 'groen', mag: true },
  { b: 'Alleen eigen monteurs', bron: 'Gesprek', w: '3 oktober', st: 'Gezegd door de klant', tone: 'blauw', mag: true },
  { b: 'Grootste installateur van Utrecht', bron: 'AI', w: 'afgeleid uit de website', st: 'Vermoeden', tone: 'grijs', mag: false },
  { b: 'Nooit “goedkoopste” zeggen', bron: 'Gesprek', w: '3 oktober', st: 'Verboden woord', tone: 'rood', mag: false },
] as const

export function BreinTabel() {
  return (
    <div className="ag-window kf-window">
      <div className="ag-bar">
        <span className="ag-crumbs"><span>Lindeman Warmte</span><span className="ag-crumb-current"><span className="ag-sep">›</span>Feiten en kennis</span></span>
        <span className="kf-count">86 feiten</span>
      </div>
      <div className="ag-view">
        <div className="ag-table kf-table">
          <div className="ag-tr ag-th"><span>Feit</span><span>Bron</span><span>Hoe zeker</span><span className="ag-r">In een tekst</span></div>
          {FEITEN.map((f) => (
            <div key={f.b} className="ag-tr" data-uit={!f.mag || undefined}>
              <strong>{f.b}</strong>
              <span className="ag-li-t"><span>{f.bron}</span><em>{f.w}</em></span>
              <span><Chip tone={f.tone as 'lime'} dot>{f.st}</Chip></span>
              <span className="ag-r">{f.mag ? <span className="kf-mag"><Icon naam="check" size={12} />Mag</span> : <span className="kf-niet"><Icon naam="slot" size={12} />Nooit</span>}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Vermoeden() {
  return (
    <div className="fv-surface kf-guess">
      <div className="kf-fact"><span>Grootste installateur van Utrecht</span><Chip tone="grijs" dot>Vermoeden</Chip></div>
      <span className="ag-lock"><Icon naam="slot" size={12} />Komt niet in een tekst tot iemand het bevestigt</span>
      <div className="fv-row"><Knop klein><Icon naam="check" size={12} />Bevestig</Knop><span className="ag-ghost">Keur af</span></div>
    </div>
  )
}

export function Bewijs() {
  return (
    <div className="fv-surface kf-proof">
      <span className="kf-url"><Icon naam="wereld" size={12} />lindeman-warmte.example/garantie</span>
      <p>Wij staan achter ons werk. <mark>Op elke installatie geven wij 5 jaar garantie.</mark> Dat geldt ook voor onderdelen.</p>
      <span className="kf-found"><Icon naam="check" size={12} />Letterlijk teruggevonden op de pagina</span>
    </div>
  )
}

/* ── Schrijven: van feit naar zin ─────────────────────────────────────────── */

export function FeitNaarZin() {
  return (
    <div className="kf-link">
      <div className="fv-surface kf-link-zin">
        <Mono>In de tekst</Mono>
        <p>Op elke installatie krijg je <mark>5 jaar</mark> garantie, ook op de onderdelen.</p>
      </div>
      <div className="kf-link-mid"><span /><Chip tone="lime"><Icon naam="check" size={11} />Getal staat in de bron</Chip><span /></div>
      <div className="fv-surface kf-link-feit">
        <Mono>In Feiten en kennis</Mono>
        <div className="kf-fact"><span><mark>5 jaar</mark> garantie op elke installatie</span><Chip tone="groen" dot>Met bewijs</Chip></div>
        <span className="fv-small fv-muted">Website · /garantie</span>
      </div>
    </div>
  )
}

/* ── Bijblijven ───────────────────────────────────────────────────────────── */

export function Tegenstrijdig() {
  return (
    <div className="fv-surface kf-conflict">
      <span className="kf-conflict-h"><Icon naam="vraag" size={14} />Twee bronnen zeggen iets anders</span>
      <div className="kf-fact"><span>3 jaar garantie</span><span className="fv-muted fv-small">brochure-2024.pdf</span></div>
      <div className="kf-fact"><span>5 jaar garantie</span><span className="fv-muted fv-small">Website · /garantie</span></div>
      <div className="fv-row"><Knop klein>Los op</Knop></div>
    </div>
  )
}

export function Verloopt() {
  return (
    <div className="fv-surface kf-expire">
      <div className="kf-fact"><span>Hybride warmtepomp vanaf € 4.500</span><Chip tone="geel" dot>Verloopt 1 januari</Chip></div>
      <span className="fv-muted fv-small">Daarna gaat deze prijs pas weer mee als iemand hem opnieuw bevestigt.</span>
      <div className="fv-row"><Knop klein><Icon naam="check" size={12} />Bevestig opnieuw</Knop></div>
    </div>
  )
}


/* ── Nieuw voor de pagina Kwaliteit ───────────────────────────────────────── */

/** De tekst met herkomst, met het document tarieven-2026.pdf als venster erachter. */
export function HerkomstCompositie() {
  return (
    <div className="kc-comp">
      <div className="ag-window kc-back">
        <div className="ag-bar">
          <span className="ag-crumbs"><Icon naam="pdf" size={14} /><span className="ag-crumb-current">tarieven-2026.pdf</span></span>
          <span className="fv-muted">Document</span>
        </div>
        <div className="kc-pdf">
          <span className="kc-pdf-h">Tarieven 2026</span>
          <span className="kc-pdf-l" /><span className="kc-pdf-l kc-pdf-s" />
          <span className="kc-pdf-r"><mark>Hybride warmtepomp vanaf € 4.500, inclusief montage</mark></span>
          <span className="kc-pdf-l" /><span className="kc-pdf-l kc-pdf-s" /><span className="kc-pdf-l" />
          <span className="kc-pdf-h2">Optioneel</span>
          <span className="kc-pdf-l" /><span className="kc-pdf-l kc-pdf-s" />
        </div>
      </div>
      <div className="kc-front"><HeroHerkomst /></div>
    </div>
  )
}

/** Een pagina met gele zinnen en de reden eronder, zoals het scherm waar je ze nakijkt. */
export function WatWordtGeel() {
  const zinnen = [
    ['Termijn', 'Na je akkoord plannen we de installatie binnen twee weken in.', 'Deze termijn staat nergens vastgelegd.'],
    ['Bedrag', 'Je betaalt vanaf € 3.900, inclusief montage.', 'Het bedrag € 3.900 staat niet in de bron.'],
    ['Garantie', 'Op elke installatie geven wij 10 jaar garantie.', 'Het getal 10 staat niet in de bron.'],
    ['Keurmerk', 'Wij zijn een erkend Keurmerk-installateur.', 'Dit keurmerk staat nergens vastgelegd.'],
  ] as const
  return (
    <div className="ag-window wg-win">
      <div className="ag-bar">
        <span className="ag-crumbs"><Logo size={18} /><span>Lindeman Warmte</span><span><span className="ag-sep">›</span>Bibliotheek</span><span className="ag-crumb-current"><span className="ag-sep">›</span>Hybride warmtepomp laten installeren</span></span>
        <Chip tone="geel" dot>4 gele zinnen</Chip>
      </div>
      <div className="wg-body">
        <article className="wg-doc">
          <span className="wg-h1">Hybride warmtepomp laten installeren in Utrecht</span>
          <p>
            Een hybride warmtepomp van Lindeman Warmte staat er snel. <span className="fv-yellow">{zinnen[0][1]}</span> <span className="fv-yellow">{zinnen[1][1]}</span>
          </p>
          <p>
            <span className="fv-yellow">{zinnen[2][1]}</span> <span className="fv-yellow">{zinnen[3][1]}</span> Twee eigen monteurs plaatsen de buitenunit en sluiten hem aan op je bestaande ketel.
          </p>
        </article>
        <aside className="wg-side">
          <Mono>Loop deze zinnen na</Mono>
          {zinnen.map(([soort, zin, reden]) => (
            <div key={soort} className="wg-item">
              <span className="wg-item-k"><Chip tone="geel">{soort}</Chip></span>
              <span className="wg-item-z">{zin}</span>
              <span className="wg-item-r">{reden}</span>
            </div>
          ))}
        </aside>
      </div>
    </div>
  )
}

/** Keur goed is uitgeschakeld zolang er een gele zin openstaat. */
export function GoedkeurenGeblokkeerd() {
  return (
    <div className="fv-surface gg-card">
      <div className="kf-fact"><span>Hybride warmtepomp laten installeren</span><Chip tone="geel" dot>2 gele zinnen open</Chip></div>
      <div className="fv-progress"><i style={{ width: '50%' }} /></div>
      <span className="fv-muted fv-small">2 van 4 gele zinnen nagelopen.</span>
      <div className="fv-row"><span className="gg-off"><Icon naam="slot" size={12} />Keur goed</span><Knop klein>Vraag een aanpassing</Knop></div>
    </div>
  )
}

/** Wat Orbit in code controleert. */
export function ControleLijst() {
  const punten = ['Bedragen en prijzen', 'Termijnen en levertijden', 'Garanties en keurmerken', 'Getallen die niet in de bron staan', 'Namen van concurrenten', 'Woorden die je klant niet wil']
  return (
    <div className="fv-surface cl-lijst">
      {punten.map((p) => (
        <div key={p} className="cl-rij"><span className="cl-vink"><Icon naam="check" size={12} /></span>{p}</div>
      ))}
    </div>
  )
}

/** Wat bij jou en je team blijft. */
export function JijBeslist() {
  const punten = ['Of de toon past bij het merk', 'Of een tekst overtuigt', 'Algemene uitspraken, zoals "specialist in"', 'Wanneer een pagina live gaat']
  return (
    <div className="fv-surface cl-lijst">
      {punten.map((p) => (
        <div key={p} className="cl-rij"><span className="cl-stip" />{p}</div>
      ))}
    </div>
  )
}
