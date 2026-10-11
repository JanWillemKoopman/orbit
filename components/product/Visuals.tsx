// De productbeelden van /product. Elk beeld toont één functie van dichtbij, zonder de rest van het
// scherm eromheen: één kaart, één menu of één grafiek, met de fictieve case Lindeman Warmte.
import { Chip, Icon, Knop, Logo, Mono } from './ui'

/* ── Hero: de maand van één klant ─────────────────────────────────────────── */

const STAPPEN = [
  { l: 'Meten', s: '1 okt', st: 'done' },
  { l: 'Plannen', s: "5 pagina's", st: 'done' },
  { l: 'Schrijven', s: '3 van 5', st: 'now' },
  { l: 'Publiceren', s: '', st: 'todo' },
  { l: 'Hermeten', s: '', st: 'todo' },
]

export function HeroMaand() {
  return (
    <div className="fv-surface fv-hero">
      <div className="fv-hero-top">
        <span className="fv-hero-brand"><Logo size={20} />Lindeman Warmte</span>
        <span className="fv-muted">Oktober 2026</span>
      </div>
      <div className="fv-cycle">
        {STAPPEN.map((s) => (
          <div key={s.l} className="fv-cycle-step" data-state={s.st}>
            <span className="fv-cycle-dot">{s.st === 'done' && <Icon naam="check" size={12} />}</span>
            <span className="fv-cycle-l">{s.l}</span>
            <span className="fv-cycle-s">{s.s}</span>
          </div>
        ))}
      </div>
      <div className="fv-hero-task">
        <span className="fv-task-icon"><Icon naam="vraag" /></span>
        <span className="fv-hero-task-t">
          <strong>2 vragen over hybride warmtepompen</strong>
          <em>Daarna schrijft ORBIT ENGINE de pagina</em>
        </span>
        <Chip tone="oranje" dot>Wacht op klant</Chip>
        <Knop primair>Bekijk de vragen</Knop>
      </div>
    </div>
  )
}

/* ── Zichtbaarheid ────────────────────────────────────────────────────────── */

const MAANDEN = ['Jun', 'Jul', 'Aug', 'Sep', 'Okt']
const LIJNEN = [
  { w: [38, 42, 46, 54, 63], c: 'rgba(255,255,255,0.22)' },
  { w: [10, 15, 20, 25, 35], c: 'rgba(255,255,255,0.12)' },
  { w: [17, 23, 30, 37, 47], c: '#bcff2f', hoofd: true },
]

export function ZichtbaarheidGrafiek() {
  const W = 880, H = 300, x = (i: number) => (i / 4) * W, y = (v: number) => H - (v / 70) * H
  const hoofd = LIJNEN[2].w
  const pad = (w: number[]) => w.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ')
  const vlak = `${pad(hoofd)} L${W},${H} L0,${H} Z`
  return (
    <div className="fv-surface fv-vis">
      <div className="fv-vis-head">
        <span className="fv-muted">Hybride warmtepomp · zichtbaarheid in AI</span>
        <span className="fv-vis-num">47%<em>↑ 30 sinds juni</em></span>
      </div>
      <svg viewBox={`-12 -20 ${W + 24} ${H + 56}`} className="fv-vis-chart" aria-hidden="true">
        <defs>
          <linearGradient id="fv-vlak" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#bcff2f" stopOpacity="0.22" />
            <stop offset="1" stopColor="#bcff2f" stopOpacity="0" />
          </linearGradient>
        </defs>
        {MAANDEN.map((m, i) => <line key={m} x1={x(i)} x2={x(i)} y1={0} y2={H} stroke="rgba(255,255,255,0.05)" />)}
        <path d={vlak} fill="url(#fv-vlak)" />
        {LIJNEN.map((l, k) => <path key={k} d={pad(l.w)} fill="none" stroke={l.c} strokeWidth={l.hoofd ? 2.5 : 1.5} strokeLinecap="round" strokeLinejoin="round" />)}
        <circle cx={x(4)} cy={y(47)} r="5" fill="#bcff2f" />
        <circle cx={x(4)} cy={y(47)} r="11" fill="#bcff2f" opacity="0.15" />
        {MAANDEN.map((m, i) => <text key={m} x={x(i)} y={H + 30} fill="#62666d" fontSize="13" textAnchor="middle">{m}</text>)}
      </svg>
    </div>
  )
}

export function AiAntwoord() {
  const namen = ['Warmtewerk Utrecht', 'Domstad Installaties', 'KlimaatPro']
  return (
    <div className="fv-surface fv-answer">
      <div className="fv-bubble">Welke installateur in Utrecht is goed in hybride warmtepompen?</div>
      <div className="fv-answer-src"><Mono>ChatGPT noemt</Mono></div>
      {namen.map((n, i) => (
        <div key={n} className="fv-rank"><span className="fv-rank-n">{i + 1}</span>{n}</div>
      ))}
      <div className="fv-rank fv-rank-mis"><span className="fv-rank-n">–</span>Lindeman Warmte<Chip tone="oranje">Niet genoemd</Chip></div>
    </div>
  )
}

export function AandeelGenoemd() {
  const rijen = [
    { n: 'Warmtewerk Utrecht', v: 58 },
    { n: 'Lindeman Warmte', v: 47, eigen: true },
    { n: 'Domstad Installaties', v: 41 },
    { n: 'KlimaatPro', v: 29 },
  ]
  return (
    <div className="fv-surface fv-share">
      {rijen.map((r) => (
        <div key={r.n} className="fv-share-row" data-eigen={r.eigen || undefined}>
          <span className="fv-share-name">{r.n}</span>
          <span className="fv-share-bar"><i style={{ width: `${r.v}%` }} /></span>
          <span className="fv-share-val">{r.v}%</span>
        </div>
      ))}
    </div>
  )
}

/* ── Kennis ───────────────────────────────────────────────────────────────── */

export function Merkstem() {
  return (
    <div className="fv-surface fv-voice">
      <div className="fv-voice-row"><span>Aanspreekvorm</span><span className="fv-seg"><span data-on>je en jij</span><span>u en uw</span></span></div>
      <div className="fv-voice-row"><span>Toon</span><span className="fv-tags">{['Nuchter', 'Vakkundig', 'Persoonlijk'].map((t) => <Chip key={t}>{t}</Chip>)}</span></div>
      <div className="fv-voice-row"><span>Nooit</span><span className="fv-tags">{['goedkoopste', 'revolutionair'].map((t) => <span key={t} className="fv-chip fv-strike">{t}</span>)}</span></div>
    </div>
  )
}

export function Feiten() {
  const rijen = [
    ['Installatie in één werkdag', 'Klant', 'lime'],
    ['Vijf jaar garantie op het werk', 'Klant', 'lime'],
    ['Erkend door InstallQ', 'Document', 'blauw'],
  ] as const
  return (
    <div className="fv-surface fv-facts">
      {rijen.map(([t, b, tone]) => (
        <div key={t} className="fv-fact">
          <span className="fv-fact-check"><Icon naam="check" size={12} /></span>
          <span className="fv-fact-t">{t}</span>
          <Chip tone={tone}>{b}</Chip>
        </div>
      ))}
    </div>
  )
}

/* ── Planning ─────────────────────────────────────────────────────────────── */

export function VanVraagNaarPagina() {
  return (
    <div className="fv-flow">
      <div className="fv-node fv-node-q"><Mono>AI-vraag</Mono><span>Welke installateur in Utrecht…</span></div>
      <svg className="fv-flow-line" viewBox="0 0 80 2" aria-hidden="true"><line x1="0" y1="1" x2="80" y2="1" stroke="rgba(255,255,255,0.25)" strokeDasharray="3 4" /></svg>
      <div className="fv-node fv-node-kans"><Mono>Kans</Mono><span><strong className="fv-lime">78</strong> potentie</span></div>
      <svg className="fv-flow-line" viewBox="0 0 80 2" aria-hidden="true"><line x1="0" y1="1" x2="80" y2="1" stroke="#bcff2f" /></svg>
      <div className="fv-node fv-node-page"><Mono>Pagina</Mono><span>Hybride warmtepomp in Utrecht</span></div>
    </div>
  )
}

export function PaginaIdee() {
  return (
    <div className="fv-surface fv-idea">
      <div className="fv-idea-top">
        <span className="fv-idea-title">Hybride warmtepomp laten installeren in Utrecht</span>
        <span className="fv-ring" style={{ '--p': 78 } as React.CSSProperties}><span>78</span></span>
      </div>
      <span className="fv-muted">Raakt 8 van de 30 gemeten vragen</span>
      <div className="fv-row"><Knop primair klein>Plan in oktober</Knop></div>
    </div>
  )
}

const KOLOMMEN = [
  { maand: 'Oktober', n: 5, kaarten: [['Hybride warmtepomp in Utrecht', 'oranje'], ['Warmtepomp in een jaren-30-woning', 'geel'], ['Hybride warmtepomp in Houten', 'lime']] },
  { maand: 'November', n: 5, kaarten: [['ISDE of energiebespaarlening?', 'blauw'], ['Waar plaats je de buitenunit?', 'blauw'], ['Hybride warmtepomp in Zeist', 'blauw']] },
  { maand: 'December', n: 4, kaarten: [['Warmtepomp en thuisbatterij', 'grijs'], ['Hoeveel geluid maakt een warmtepomp?', 'grijs']] },
  { maand: 'Januari', n: 2, kaarten: [['Cv-onderhoud in IJsselstein', 'grijs']] },
] as const

export function ContentplanBord() {
  return (
    <div className="fv-board">
      {KOLOMMEN.map((k) => (
        <div key={k.maand} className="fv-col">
          <div className="fv-col-head">{k.maand}<em>{k.n}</em></div>
          {k.kaarten.map(([t, tone]) => (
            <div key={t} className="fv-kaart"><span className="fv-stip" data-tone={tone} />{t}</div>
          ))}
        </div>
      ))}
    </div>
  )
}

/* ── Klantinput ───────────────────────────────────────────────────────────── */

export function VragenTeam() {
  return (
    <div className="fv-surface fv-questions">
      <div className="fv-q-head"><span>2 van 4 beantwoord</span><span className="fv-pill"><Icon naam="link" size={12} />Deel</span></div>
      <div className="fv-progress"><i style={{ width: '50%' }} /></div>
      <div className="fv-q" data-done><Icon naam="check" size={13} />Hoe lang duurt het plaatsen?</div>
      <div className="fv-q" data-done><Icon naam="check" size={13} />Welke garantie geven jullie?</div>
      <div className="fv-q"><span className="fv-q-open" />Uit welke onderdelen bestaat de prijs?</div>
    </div>
  )
}

export function VragenKlant() {
  return (
    <div className="fv-phone">
      <div className="fv-phone-notch" />
      <div className="fv-phone-screen">
        <div className="fv-phone-brand"><Logo size={16} /><span>Lindeman Warmte</span></div>
        <span className="fv-phone-h">Uit welke onderdelen bestaat jullie prijs?</span>
        <span className="fv-phone-field">Toestel, buitenunit, montage en aansluiten op de ketel. De subsidieaanvraag zit erbij in.<i /></span>
        <Knop primair>Opslaan</Knop>
        <span className="fv-phone-foot"><Icon naam="slot" size={11} />Geen account nodig</span>
      </div>
    </div>
  )
}

/* ── Schrijven ────────────────────────────────────────────────────────────── */

export function TekstFragment() {
  return (
    <div className="fv-surface fv-doc">
      <span className="fv-doc-h">Hoe de installatie verloopt</span>
      <p>
        De installatie zelf duurt bij ons{' '}
        <span className="fv-answer-mark">één werkdag<span className="fv-tip"><Icon naam="vraag" size={12} />Antwoord van Pieter Lindeman</span></span>. Twee eigen monteurs plaatsen de buitenunit en sluiten hem aan op je bestaande ketel.{' '}
        <span className="fv-yellow">Na je akkoord plannen we de installatie binnen twee weken in.</span>
      </p>
    </div>
  )
}

export function ZinNalopen() {
  return (
    <div className="fv-surface fv-check">
      <blockquote>Na je akkoord plannen we de installatie binnen twee weken in.</blockquote>
      <span className="fv-muted fv-small">Deze termijn staat nergens vastgelegd.</span>
      <div className="fv-row"><Knop klein><Icon naam="check" size={12} />Klopt</Knop><Knop primair klein>Vraag het bedrijf</Knop></div>
    </div>
  )
}

export function Eindredactie() {
  const regels = [['Elke bewering heeft een bron', true], ['Merkstem klopt', true], ['Geen verboden woorden', true], ['1 zin om na te lopen', false]] as const
  return (
    <div className="fv-surface fv-review">
      {regels.map(([t, ok]) => (
        <div key={t} className="fv-review-row" data-ok={ok || undefined}>
          <span className="fv-review-dot">{ok ? <Icon naam="check" size={11} /> : '!'}</span>{t}
        </div>
      ))}
    </div>
  )
}

/* ── Publiceren: het kopieermenu ──────────────────────────────────────────── */

export function Publiceren() {
  return (
    <div className="fv-publish">
      <div className="fv-publish-bar">
        <span className="fv-icon-btn"><Icon naam="link" /></span>
        <span className="fv-split-btn"><span><Icon naam="kopie" />Kopieer</span><span><svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg></span></span>
      </div>
      <div className="fv-menu">
        <span className="fv-menu-item" data-on><Icon naam="code" />Kopieer als HTML</span>
        <span className="fv-menu-item"><Icon naam="tekst" />Kopieer als Markdown</span>
        <span className="fv-menu-item"><Icon naam="tekst" />Kopieer als platte tekst</span>
        <span className="fv-menu-sep" />
        <span className="fv-menu-item fv-menu-live"><Icon naam="wereld" />Meld dat hij live staat</span>
      </div>
    </div>
  )
}

/* ── Opvolging ────────────────────────────────────────────────────────────── */

export function Hermeting() {
  const rijen = [['Vóór', 0], ['14 dagen', 3], ['28 dagen', 5]] as const
  return (
    <div className="fv-remeasure">
      {rijen.map(([l, n]) => (
        <div key={l} className="fv-re-row">
          <span className="fv-re-l">{l}</span>
          <span className="fv-dots">{Array.from({ length: 8 }, (_, i) => <i key={i} data-on={i < n || undefined} />)}</span>
          <strong>{n}/8</strong>
        </div>
      ))}
    </div>
  )
}

export function Zoekverkeer() {
  const dagen = Array.from({ length: 34 }, (_, i) => 2 + i * 0.36 + 2.2 * Math.sin(i * 1.3) + (i > 18 ? 2 : 0))
  const max = Math.max(...dagen)
  return (
    <div className="fv-traffic">
      <div className="fv-bars">
        <span className="fv-bars-live"><Mono>Live</Mono></span>
        {dagen.map((v, i) => <i key={i} style={{ height: `${Math.max(4, (v / max) * 100)}%` }} />)}
      </div>
      <div className="fv-traffic-n"><strong>262</strong> klikken sinds publicatie</div>
    </div>
  )
}

/* ── Rapportage ───────────────────────────────────────────────────────────── */

export function Maandverslag() {
  return (
    <div className="fv-surface fv-report">
      <div className="fv-report-head">
        <span className="fv-report-logo">N</span>
        <span><span className="fv-muted">Bureau Noordwind · Lindeman Warmte</span><strong>Verslag van september</strong></span>
      </div>
      <div className="fv-report-kpis">
        <span><em>Zichtbaarheid in AI</em><strong>39%</strong><i className="fv-up">↑ 7</i></span>
        <span><em>Pagina&apos;s live</em><strong>5</strong></span>
        <span><em>Klikken uit Google</em><strong>1.204</strong><i className="fv-up">↑ 68%</i></span>
      </div>
    </div>
  )
}

/* ── Bureau ───────────────────────────────────────────────────────────────── */

const BEDRIJVEN = [
  { n: 'Lindeman Warmte', z: [17, 23, 30, 37, 47], w: <Chip tone="oranje" dot>2 vragen</Chip> },
  { n: 'Tandartspraktijk Lunetten', z: [35, 40, 45, 55], w: <Chip tone="lime" dot>Publiceren</Chip> },
  { n: 'Verbeek Bouw & Renovatie', z: [19, 27, 35, 42], w: <Chip tone="geel" dot>Nakijken</Chip> },
  { n: 'Fysio Oudwijk', z: [44, 50, 61], w: <Chip tone="blauw" dot>Wordt geschreven</Chip> },
]

function Spark({ v }: { v: number[] }) {
  const pts = v.map((x, i) => `${(i / Math.max(1, v.length - 1)) * 64},${24 - (x / 70) * 24}`).join(' ')
  return <svg width="64" height="24" viewBox="-2 -2 68 28" aria-hidden="true"><polyline points={pts} fill="none" stroke="#bcff2f" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" /></svg>
}

export function Werkoverzicht() {
  return (
    <div className="fv-surface fv-portfolio">
      {BEDRIJVEN.map((b) => (
        <div key={b.n} className="fv-ptr">
          <strong>{b.n}</strong>
          <span className="fv-pvis"><Spark v={b.z} />{b.z[b.z.length - 1]}%</span>
          {b.w}
        </div>
      ))}
    </div>
  )
}

export function Toegang() {
  return (
    <div className="fv-surface fv-people">
      <div className="fv-person"><span className="fv-avatar" data-kleur="3">PL</span><span className="fv-person-n"><strong>Pieter Lindeman</strong><em>Kijker · Lindeman Warmte</em></span></div>
      {['Vragen beantwoorden', 'Teksten goedkeuren', 'Teksten bewerken'].map((r, i) => (
        <div key={r} className="fv-right"><span>{r}</span><span className="fv-toggle" data-on={i < 2 || undefined} /></div>
      ))}
    </div>
  )
}

export function Kosten() {
  return (
    <div className="fv-surface fv-costs">
      <span className="fv-muted">Oktober</span>
      <span className="fv-cost-top"><strong>€ 46</strong><span className="fv-muted">van € 250</span></span>
      <div className="fv-cost-bar"><i style={{ width: '19%' }} /><b style={{ left: '100%' }} /></div>
    </div>
  )
}
