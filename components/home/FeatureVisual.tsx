// Illustraties bij de drie blokken op de homepage, in dezelfde stijl als de panelen op linear.app:
// donkere kaarten met een dunne rand die naar de onderkant uitfaden. Voorbeelddata, geen echte meting.
import type { Feature } from '@/content/home'

function Measure() {
  const engines = [
    { name: 'ChatGPT', rows: [['Fietsenmaker e-bike Utrecht', true], ['Onderhoud elektrische fiets', true], ['Bakfiets leasen', false]] },
    { name: 'Gemini', rows: [['Fietsenmaker e-bike Utrecht', true], ['Haal- en brengservice', true], ['Bakfiets leasen', false]] },
    { name: 'AI Overview', rows: [['Onderhoud elektrische fiets', true], ['Fietsenmaker e-bike Utrecht', false], ['Bakfiets leasen', false]] },
  ] as const
  return (
    <div className="fv-columns">
      {engines.map((e) => (
        <div className="fv-column" key={e.name}>
          <div className="fv-column-head"><span className="fv-ring" />{e.name}<span className="fv-count">{e.rows.filter((r) => r[1]).length}/3</span></div>
          {e.rows.map(([q, hit]) => (
            <div className="fv-card" key={q}>
              <span className="fv-card-id">VRAAG</span>
              <span className="fv-card-title">{q}</span>
              <span className="fv-tag" data-hit={hit}><i />{hit ? 'Genoemd' : 'Niet genoemd'}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function Plan() {
  const months = ['okt', 'nov', 'dec', 'jan']
  const bars = [
    { label: 'E-bike onderhoud', start: 4, len: 30, tone: 'accent' },
    { label: 'Bakfiets leasen', start: 22, len: 34, tone: 'accent' },
    { label: 'Haal- en brengservice', start: 46, len: 26, tone: 'muted' },
    { label: 'Fietsverzekering', start: 64, len: 30, tone: 'muted' },
  ]
  return (
    <div className="fv-timeline">
      <div className="fv-months">{months.map((m) => <span key={m}>{m}</span>)}</div>
      <div className="fv-today" style={{ left: '18%' }}><span>vandaag</span></div>
      {bars.map((b) => (
        <div className="fv-lane" key={b.label}>
          <div className="fv-bar" data-tone={b.tone} style={{ left: `${b.start}%`, width: `${b.len}%` }}>
            <span className="fv-bar-dot" />{b.label}
          </div>
        </div>
      ))}
    </div>
  )
}

function Write() {
  const steps = [
    { who: 'Briefing', text: 'Doel, vragen van klanten en de feiten die erin moeten.', state: 'Klaar' },
    { who: 'Concept', text: 'Eerste versie in jouw tone of voice, met bronnen erbij.', state: 'Klaar' },
    { who: 'Controle', text: 'Bedragen en termijnen nagelopen tegen je merkdossier.', state: 'Bezig' },
    { who: 'Publiceren', text: 'Jij keurt goed, daarna gaat de pagina live.', state: 'Wacht op jou' },
  ]
  return (
    <div className="fv-agents">
      {steps.map((s, i) => (
        <div className="fv-agent" key={s.who} data-dim={i === 3 || undefined}>
          <span className="fv-agent-head"><span className="fv-ring" />{s.who}</span>
          <p>{s.text}</p>
          <span className="fv-agent-state" data-state={s.state === 'Klaar' ? 'done' : s.state === 'Bezig' ? 'busy' : 'wait'}>{s.state}</span>
        </div>
      ))}
    </div>
  )
}

export function FeatureVisual({ type }: { type: Feature['visual'] }) {
  return (
    <div className="fv-root" aria-hidden="true">
      {type === 'measure' ? <Measure /> : type === 'plan' ? <Plan /> : <Write />}
    </div>
  )
}
