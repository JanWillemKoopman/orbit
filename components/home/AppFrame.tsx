// Het "screenshot" in de hero. Net als op linear.app is dit geen afbeelding maar nagebouwde
// interface in HTML: scherp op elk scherm, licht om te laden en makkelijk aan te passen.
// Alle cijfers en namen hieronder zijn voorbeelddata van een verzonnen merk.
import { LogoMark } from '@/components/Logo'

export type IconName = 'inbox' | 'chart' | 'search' | 'compass' | 'stack' | 'doc' | 'question' | 'book' | 'brand' | 'facts' | 'chevron' | 'plus' | 'sliders' | 'sparkle'

export function Icon({ name }: { name: IconName }) {
  const p = { stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' }
  const paths: Record<IconName, React.ReactNode> = {
    inbox: <><path {...p} d="M2.5 9.5h3l1 2h3l1-2h3" /><path {...p} d="M3.5 4h9l1 5.5v3a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-3Z" /></>,
    chart: <><path {...p} d="M2.5 13.5h11" /><path {...p} d="M4.5 11V8M8 11V4.5M11.5 11V6.5" /></>,
    search: <><circle {...p} cx="7" cy="7" r="4" /><path {...p} d="m10 10 3.5 3.5" /></>,
    compass: <><circle {...p} cx="8" cy="8" r="5.5" /><path {...p} d="m10.2 5.8-1.3 3.1-3.1 1.3 1.3-3.1Z" /></>,
    stack: <><path {...p} d="m8 2.5 5.5 3L8 8.5l-5.5-3Z" /><path {...p} d="m2.5 8.5 5.5 3 5.5-3" /><path {...p} d="m2.5 11 5.5 3 5.5-3" /></>,
    doc: <><path {...p} d="M4 2.5h5l3 3v8H4Z" /><path {...p} d="M6 8.5h4M6 11h3" /></>,
    question: <><circle {...p} cx="8" cy="8" r="5.5" /><path {...p} d="M6.6 6.4a1.5 1.5 0 1 1 2 1.4c-.4.2-.6.5-.6.9v.4" /><circle cx="8" cy="11.2" r=".7" fill="currentColor" /></>,
    book: <><path {...p} d="M3 3.5h4a1 1 0 0 1 1 1v9a1 1 0 0 0-1-1H3ZM13 3.5H9a1 1 0 0 0-1 1v9a1 1 0 0 1 1-1h4Z" /></>,
    brand: <><rect {...p} x="2.5" y="3" width="11" height="10" rx="2" /><path {...p} d="M5 6.5h6M5 9.5h3.5" /></>,
    facts: <><path {...p} d="M3 4h10M3 8h10M3 12h6" /></>,
    chevron: <path {...p} d="m5.5 6.5 2.5 2.5 2.5-2.5" />,
    plus: <path {...p} d="M8 3.5v9M3.5 8h9" />,
    sliders: <><path {...p} d="M3 5h6M12 5h1M3 11h1M7 11h6" /><circle {...p} cx="10.5" cy="5" r="1.5" /><circle {...p} cx="5.5" cy="11" r="1.5" /></>,
    sparkle: <path {...p} d="M8 2.5c.4 2.9 1.6 4.1 4.5 4.5-2.9.4-4.1 1.6-4.5 4.5-.4-2.9-1.6-4.1-4.5-4.5 2.9-.4 4.1-1.6 4.5-4.5Z" />,
  }
  return <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">{paths[name]}</svg>
}

const nav: { group?: string; items: { icon: IconName; label: string; active?: boolean; badge?: string }[] }[] = [
  { items: [{ icon: 'inbox', label: 'Openstaande taken', badge: '3' }, { icon: 'chart', label: 'Zichtbaarheid in AI', active: true }, { icon: 'search', label: 'Zoekverkeer' }] },
  { group: 'Clusters', items: [{ icon: 'compass', label: 'Clusters ontdekken' }, { icon: 'stack', label: 'Mijn clusters' }] },
  { group: 'Strategie', items: [{ icon: 'doc', label: 'Contentplan' }, { icon: 'question', label: 'Openstaande vragen' }, { icon: 'book', label: 'Bibliotheek' }] },
  { group: 'Mijn bedrijf', items: [{ icon: 'brand', label: 'Merkdossier' }, { icon: 'facts', label: 'Feiten en kennis' }] },
]

const kpis = [
  { label: 'Genoemd in antwoorden', value: '38%', delta: '+6' },
  { label: 'Gemiddelde positie', value: '2,4', delta: '+0,3' },
  { label: 'Bronvermeldingen', value: '112', delta: '+21' },
]

// Twaalf weken zichtbaarheid (procent), eigen merk en twee concurrenten.
const series = {
  own: [14, 15, 15, 19, 21, 20, 24, 27, 29, 31, 35, 38],
  a: [31, 30, 32, 31, 33, 32, 31, 32, 30, 31, 30, 29],
  b: [22, 23, 21, 22, 20, 21, 22, 20, 21, 19, 20, 19],
}

const rows = [
  { q: 'Welke fietsenmaker in Utrecht repareert e-bikes?', m: [true, true, false], trend: '+12' },
  { q: 'Wat kost een onderhoudsbeurt voor een elektrische fiets?', m: [true, false, true], trend: '+8' },
  { q: 'Beste plek om een bakfiets te leasen', m: [false, false, false], trend: '0' },
  { q: 'Hoe vaak moet je een e-bike laten nakijken?', m: [true, true, true], trend: '+4' },
  { q: 'Fietsenmaker met haal- en brengservice', m: [false, true, false], trend: '+2' },
]

function linePath(values: number[], w: number, h: number, max = 45) {
  const step = w / (values.length - 1)
  return values.map((v, i) => `${i ? 'L' : 'M'}${(i * step).toFixed(1)} ${(h - (v / max) * h).toFixed(1)}`).join(' ')
}

function Chart() {
  const w = 620
  const h = 150
  const own = linePath(series.own, w, h)
  return (
    <svg className="af-chart" viewBox={`0 0 ${w} ${h + 22}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="af-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#bcff2f" stopOpacity=".22" />
          <stop offset="1" stopColor="#bcff2f" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((i) => <line key={i} x1="0" x2={w} y1={(h / 3) * i} y2={(h / 3) * i} stroke="#ffffff0d" />)}
      <path d={`${own} L${w} ${h} L0 ${h} Z`} fill="url(#af-fill)" />
      <path d={linePath(series.a, w, h)} stroke="#62666d" strokeWidth="1.25" fill="none" strokeDasharray="3 3" />
      <path d={linePath(series.b, w, h)} stroke="#3e4147" strokeWidth="1.25" fill="none" strokeDasharray="3 3" />
      <path d={own} stroke="#bcff2f" strokeWidth="1.75" fill="none" />
      <circle cx={w} cy={h - (38 / 45) * h} r="3.5" fill="#bcff2f" />
      {['jul', 'aug', 'sep', 'okt'].map((m, i) => (
        <text key={m} x={(w / 3) * i + (i === 0 ? 0 : i === 3 ? -18 : -8)} y={h + 18} fill="#62666d" fontSize="11" fontFamily="inherit">{m}</text>
      ))}
    </svg>
  )
}

const engines = ['ChatGPT', 'Gemini', 'AI Overview']

export function AppFrame() {
  return (
    <div className="af-frame" aria-hidden="true">
      <div className="af-frame-bg" />

      <nav className="af-sidebar">
        <div className="af-sidebar-top">
          <span className="af-workspace">
            <span className="af-workspace-logo"><LogoMark size={12} /></span>
            <span>Fietsen Jansen</span>
            <Icon name="chevron" />
          </span>
          <span className="af-sidebar-icons"><Icon name="search" /><Icon name="plus" /></span>
        </div>
        {nav.map((g, gi) => (
          <div className="af-nav-group" key={gi}>
            {g.group && <span className="af-nav-item af-nav-heading">{g.group} <Icon name="chevron" /></span>}
            {g.items.map((it) => (
              <span key={it.label} className="af-nav-item" data-active={it.active || undefined}>
                <Icon name={it.icon} />
                <span>{it.label}</span>
                {it.badge && <span className="af-badge">{it.badge}</span>}
              </span>
            ))}
          </div>
        ))}
      </nav>

      <div className="af-view">
        <div className="af-glow" />
        <header className="af-bar">
          <span className="af-crumbs"><span>Resultaten</span><span className="af-sep">›</span><span className="af-crumb-current">Zichtbaarheid in AI</span></span>
          <span className="af-bar-right">
            <span className="af-pill"><Icon name="sliders" /> Laatste 12 weken</span>
          </span>
        </header>

        <div className="af-body">
          <div className="af-content">
            <h3 className="af-title">Zichtbaarheid in AI</h3>
            <p className="af-desc">Hoe vaak AI-assistenten Fietsen Jansen noemen bij de vragen die jouw klanten stellen.</p>

            <div className="af-kpis">
              {kpis.map((k) => (
                <div className="af-kpi" key={k.label}>
                  <span className="af-kpi-label">{k.label}</span>
                  <span className="af-kpi-value">{k.value}<span className="af-delta">{k.delta}</span></span>
                </div>
              ))}
            </div>

            <div className="af-card">
              <div className="af-card-head">
                <span>Genoemd in antwoorden</span>
                <span className="af-legend">
                  <span><i style={{ background: '#bcff2f' }} />Jij</span>
                  <span><i style={{ background: '#62666d' }} />Stella</span>
                  <span><i style={{ background: '#3e4147' }} />Fietsdokter</span>
                </span>
              </div>
              <Chart />
            </div>

            <div className="af-table">
              <div className="af-tr af-th">
                <span>Vraag van je klant</span>
                {engines.map((e) => <span key={e}>{e}</span>)}
                <span>Trend</span>
              </div>
              {rows.map((r) => (
                <div className="af-tr" key={r.q}>
                  <span className="af-q">{r.q}</span>
                  {r.m.map((hit, i) => <span key={i}><i className="af-dot" data-hit={hit} /></span>)}
                  <span className="af-trend" data-up={r.trend !== '0'}>{r.trend === '0' ? '0' : r.trend}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="af-panel">
            <div className="af-panel-head">
              <span className="af-panel-title"><span className="af-engine-logo"><LogoMark size={11} /></span>ORBIT ENGINE</span>
              <span className="af-panel-sub">Advies</span>
            </div>
            <div className="af-panel-card">
              <span className="af-panel-q">Bakfiets leasen: je wordt in 0 van 10 antwoorden genoemd</span>
              <span className="af-status"><Icon name="sparkle" /> Kans gevonden</span>
            </div>
            <div className="af-panel-log">
              <span className="af-muted">Bekeken in 3 minuten</span>
              <p>Stella staat in 7 van de 10 antwoorden, vooral door hun pagina over leasevoorwaarden. Een eigen pagina met prijzen, looptijd en onderhoud vult dat gat.</p>
            </div>
            <div className="af-panel-draft">
              <div className="af-draft-row">
                <span className="af-draft-title">Concept klaar: 1.240 woorden</span>
                <span className="af-muted">Bekijken</span>
              </div>
              <span className="af-draft-name"><Icon name="doc" /> Bakfiets leasen bij Fietsen Jansen</span>
              <span className="af-draft-meta"><span className="af-plus">+6 feiten</span> uit je merkdossier</span>
            </div>
            <div className="af-actions">
              <span className="af-btn">Later</span>
              <span className="af-btn af-btn-primary">Zet op contentplan</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
