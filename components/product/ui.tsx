// Bouwstenen voor de productbeelden op /product: een appvenster, chips, iconen en knoppen in de
// vormgeving van Orbit. De beelden zijn nagebouwd in HTML, zodat ze op elk scherm scherp zijn.
import { LogoMark } from '@/components/Logo'

type Tone = 'lime' | 'groen' | 'oranje' | 'geel' | 'rood' | 'grijs' | 'blauw'

export function Chip({ tone = 'grijs', children, dot = false }: { tone?: Tone; children: React.ReactNode; dot?: boolean }) {
  return (
    <span className="fv-chip" data-tone={tone}>
      {dot && <i />}
      {children}
    </span>
  )
}

export function Knop({ children, primair = false, klein = false }: { children: React.ReactNode; primair?: boolean; klein?: boolean }) {
  return <span className={`fv-btn${primair ? ' fv-btn-primary' : ''}${klein ? ' fv-btn-sm' : ''}`}>{children}</span>
}

export function Mono({ children }: { children: React.ReactNode }) {
  return <span className="fv-mono">{children}</span>
}

const PADEN: Record<string, React.ReactNode> = {
  taken: <><path d="M3 4.5h10M3 8h10M3 11.5h6" /></>,
  plan: <><rect x="2.5" y="3" width="11" height="10.5" rx="2" /><path d="M2.5 6.5h11M5.5 1.5v3M10.5 1.5v3" /></>,
  vraag: <><circle cx="8" cy="8" r="5.75" /><path d="M6.4 6.3a1.7 1.7 0 0 1 3.3.5c0 1.2-1.7 1.4-1.7 2.4M8 11.2v.05" /></>,
  boek: <><path d="M3 3.5c1.7-.6 3.4-.6 5 .5 1.6-1.1 3.3-1.1 5-.5v9c-1.7-.6-3.4-.6-5 .5-1.6-1.1-3.3-1.1-5-.5z" /><path d="M8 4v9" /></>,
  grafiek: <><path d="M2.5 13.5h11" /><path d="m3.5 10.5 3-3 2.5 2 4-5" /></>,
  zoek: <><circle cx="7" cy="7" r="4.25" /><path d="m10.2 10.2 3.3 3.3" /></>,
  merk: <><circle cx="8" cy="8" r="5.75" /><path d="M8 5v6M5 8h6" /></>,
  feit: <><path d="m4 8.5 2.5 2.5 5.5-6" /></>,
  check: <><path d="m3.5 8.5 3 3 6-7" /></>,
  link: <><path d="M6.5 9.5 9.5 6.5" /><path d="M7.5 4.5 9 3a2.5 2.5 0 0 1 3.5 3.5L11 8M8.5 11.5 7 13a2.5 2.5 0 0 1-3.5-3.5L5 8" /></>,
  kopie: <><rect x="5.5" y="5.5" width="8" height="8" rx="1.5" /><path d="M10.5 5.5v-2a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" /></>,
  code: <><path d="m5.5 5-3 3 3 3M10.5 5l3 3-3 3" /></>,
  tekst: <><path d="M3 4h10M3 7h10M3 10h7M3 13h5" /></>,
  download: <><path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10" /></>,
  pijl: <><path d="M3.5 8h9M9 4.5 12.5 8 9 11.5" /></>,
  wereld: <><circle cx="8" cy="8" r="5.75" /><path d="M2.5 8h11M8 2.25c1.6 1.7 2.4 3.6 2.4 5.75S9.6 12.05 8 13.75C6.4 12.05 5.6 10.15 5.6 8S6.4 3.95 8 2.25z" /></>,
  sparkle: <><path d="M8 2v3M8 11v3M2 8h3M11 8h3M3.8 3.8l2 2M10.2 10.2l2 2M12.2 3.8l-2 2M5.8 10.2l-2 2" /></>,
  slot: <><rect x="3.5" y="7" width="9" height="6.5" rx="1.5" /><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" /></>,
  mensen: <><circle cx="6" cy="6" r="2.25" /><path d="M2 13c.4-2.2 2-3.5 4-3.5s3.6 1.3 4 3.5" /><path d="M10.5 3.9a2.25 2.25 0 0 1 0 4.2M12 9.8c1 .6 1.7 1.7 2 3.2" /></>,
  euro: <><path d="M11.5 4.5a4.5 4.5 0 1 0 0 7" /><path d="M3 7h6M3 9h6" /></>,
  pdf: <><path d="M4 2.5h5.5L12.5 5.5v8H4z" /><path d="M9.5 2.5v3h3" /></>,
  ster: <><path d="m8 2.5 1.7 3.5 3.8.5-2.8 2.6.7 3.8L8 11.1l-3.4 1.8.7-3.8-2.8-2.6 3.8-.5z" /></>,
}

export function Icon({ naam, size = 14 }: { naam: keyof typeof PADEN | string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PADEN[naam]}
    </svg>
  )
}

export function Logo({ size = 18 }: { size?: number }) {
  return (
    <span className="fv-logo" style={{ width: size, height: size }} aria-hidden="true">
      <LogoMark size={size * 0.62} />
    </span>
  )
}

const MENU = [
  { kop: 'Overzicht', items: [{ i: 'taken', l: 'Openstaande taken', n: 4 }] },
  { kop: 'Strategie', items: [{ i: 'plan', l: 'Contentplan' }, { i: 'vraag', l: 'Openstaande vragen', n: 2 }, { i: 'boek', l: 'Bibliotheek' }] },
  { kop: 'Resultaten', items: [{ i: 'grafiek', l: 'Zichtbaarheid in AI' }, { i: 'zoek', l: 'Zoekverkeer' }] },
  { kop: 'Mijn bedrijf', items: [{ i: 'merk', l: 'Merkdossier' }, { i: 'feit', l: 'Feiten en kennis' }] },
]

/** De zijbalk van de app, met het bedrijf bovenaan. */
export function Zijbalk({ actief, bedrijf = 'Lindeman Warmte', compact = false }: { actief: string; bedrijf?: string; compact?: boolean }) {
  return (
    <div className="fv-side">
      <div className="fv-side-top">
        <Logo />
        <span className="fv-side-brand">{bedrijf}</span>
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
      </div>
      {MENU.slice(0, compact ? 2 : 4).map((g) => (
        <div className="fv-side-group" key={g.kop}>
          <span className="fv-side-kop">{g.kop}</span>
          {g.items.map((it) => (
            <span className="fv-side-item" data-active={it.l === actief || undefined} key={it.l}>
              <Icon naam={it.i} />
              {it.l}
              {'n' in it && it.n ? <em>{it.n}</em> : null}
            </span>
          ))}
        </div>
      ))}
      <div className="fv-side-foot">
        <span className="fv-avatar" data-kleur="1">SV</span>
        Sanne de Vries
      </div>
    </div>
  )
}

/** Een appvenster: optioneel met zijbalk, een kruimelpad en inhoud. */
export function Venster({
  pad,
  actief,
  zijbalk = true,
  rechts,
  children,
  className,
}: {
  pad: string[]
  actief?: string
  zijbalk?: boolean
  rechts?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`fv-window${zijbalk ? '' : ' fv-window-bare'}${className ? ` ${className}` : ''}`}>
      {zijbalk && <Zijbalk actief={actief ?? ''} />}
      <div className="fv-main">
        <div className="fv-bar">
          <span className="fv-crumbs">
            {pad.map((p, i) => (
              <span key={p} className={i === pad.length - 1 ? 'fv-crumb-current' : undefined}>
                {i > 0 && <span className="fv-sep">›</span>}
                {p}
              </span>
            ))}
          </span>
          {rechts}
        </div>
        <div className="fv-body">{children}</div>
      </div>
    </div>
  )
}

/** De vijf stappen van een pagina: vragen, schrijven, goedkeuren, live, effect. */
export function Stappen({ nu, labels = ['Vragen', 'Schrijven', 'Goedkeuren', 'Live', 'Effect'] }: { nu: number; labels?: string[] }) {
  return (
    <div className="fv-steps">
      {labels.map((l, i) => (
        <span key={l} className="fv-step" data-state={i < nu ? 'done' : i === nu ? 'now' : 'todo'}>
          <span className="fv-step-dot">{i < nu && <Icon naam="check" size={10} />}</span>
          <span className="fv-step-label">{l}</span>
        </span>
      ))}
    </div>
  )
}
