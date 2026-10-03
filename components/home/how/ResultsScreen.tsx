'use client'
import { useRef } from 'react'
import { Calendar, Chart, Fingerprint, Grid, Search, Sparkle } from '../icons'
import { countTo, gsap, prefersReducedMotion, useIsoLayoutEffect } from '../gsap'
import type { ScreenProps } from './shared'

const nav: Array<[string, typeof Grid]> = [['Overzicht', Grid], ['Zichtbaarheid in AI', Sparkle], ['Zoekverkeer', Search], ['Contentplan', Calendar], ['Merkdossier', Fingerprint]]
const stats: Array<{ label: string; to: number; pre?: string; suf?: string; unit?: string; chip: string; up?: boolean }> = [
  { label: 'Organisch + AI-verkeer', to: 88, pre: '+', suf: '%', chip: '↗ vs. vorig kwartaal', up: true },
  { label: 'AI-vermeldingen', to: 415, chip: '↗ +62 deze maand', up: true },
  { label: 'Top-3 posities', to: 126, unit: 'zoekwoorden', chip: '↗ +19', up: true },
]
const journey: Array<[string, number, 'g' | 'y' | 'r']> = [['Oriëntatie', 92, 'g'], ['Vergelijken', 74, 'g'], ['Beslissen', 48, 'y'], ['Na aankoop', 22, 'r']]
const line = 'M0 170 C30 163.3 46 153.3 70 150 S112 140 136 126.7 S178 133.3 204 110 S246 83.3 272 86.7 S318 66.7 342 50 S392 30 440 16.7'

export default function ResultsScreen({ active }: ScreenProps) {
  const ref = useRef<HTMLDivElement>(null)

  useIsoLayoutEffect(() => {
    if (!active || prefersReducedMotion() || !ref.current) return
    const root = ref.current
    const ctx = gsap.context(() => {
      const path = root.querySelector<SVGPathElement>('.rg-line')
      const length = path?.getTotalLength() ?? 600
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
      gsap.set('.rg-area', { opacity: 0 }); gsap.set('.rg-dot', { opacity: 0 }); gsap.set('.rg-dot2', { opacity: 0, scale: 0, transformBox: 'fill-box', transformOrigin: 'center' })
      gsap.set('.nv-side', { opacity: 0, x: -12 }); gsap.set('.nv-top', { opacity: 0, y: -8 }); gsap.set('.nv-stat', { opacity: 0, y: 12 }); gsap.set('.nv-panel', { opacity: 0, y: 14 })
      gsap.set('.nv-insight', { opacity: 0 }); gsap.set('.nv-bar', { scaleX: 0, transformOrigin: 'left' })
      gsap.timeline()
        .to('.nv-side', { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' })
        .to('.nv-top', { opacity: 1, y: 0, duration: 0.34 }, '-=.2')
        .to('.nv-stat', { opacity: 1, y: 0, stagger: 0.09, duration: 0.34, ease: 'power2.out' }, '-=.15')
        .add(() => root.querySelectorAll<HTMLElement>('[data-to]').forEach(el => countTo(el, Number(el.dataset.to), { duration: 1.1, prefix: el.dataset.pre ?? '', suffix: el.dataset.suf ?? '' })), '-=.25')
        .to('.nv-panel', { opacity: 1, y: 0, stagger: 0.12, duration: 0.36, ease: 'power2.out' }, '-=.1')
        .to(path, { strokeDashoffset: 0, duration: 1, ease: 'power2.out' }, '-=.15')
        .to('.rg-area', { opacity: 1, duration: 0.5 }, '-=.6')
        .to('.rg-dot', { opacity: 1, duration: 0.3 }, '-=.2')
        .to('.rg-dot2', { opacity: 1, scale: 1, stagger: 0.1, duration: 0.3, ease: 'back.out(2)' }, '-=.12')
        .to('.nv-bar', { scaleX: 1, stagger: 0.08, duration: 0.55, ease: 'power2.out' }, '-=.75')
        .to('.nv-insight', { opacity: 1, duration: 0.4 }, '-=.3')
    }, ref)
    return () => ctx.revert()
  }, [active])

  return <div className={`scr scr5${active ? ' is-on' : ''}`} ref={ref}>
    <div className="nv">
      <aside className="nv-side">
        <div className="nv-logo"><span>◒</span>ORBIT</div>
        <span className="nv-mm">Jouwdomein.nl</span>
        <nav className="nv-nav">{nav.map(([text, Icon], i) => <span className={`nv-item${i === 0 ? ' on' : ''}`} key={text}><Icon />{text}</span>)}</nav>
        <div className="nv-user"><span className="nv-av">JD</span><span className="nv-un"><b>Jouw team</b><em>Always on</em></span></div>
      </aside>
      <div className="nv-main">
        <div className="nv-top"><div className="nv-h"><b>Resultaten</b><span>Afgelopen 90 dagen · Google + AI</span></div><div className="nv-acts"><span className="nv-btn">Exporteer</span><span className="nv-btn dark">Rapport</span></div></div>
        <div className="nv-stats">{stats.map(stat => <div className="nv-stat" key={stat.label}><em>{stat.label}</em><b><span data-to={stat.to} data-pre={stat.pre} data-suf={stat.suf}>{stat.pre}{stat.to}{stat.suf}</span>{stat.unit && <i> {stat.unit}</i>}</b><span className={`nv-chip${stat.up ? ' up' : ''}`}>{stat.chip}</span></div>)}</div>
        <div className="nv-low">
          <div className="nv-panel nv-chartp">
            <div className="nv-pt"><b>Zichtbaarheid</b><span className="nv-toggle"><i className="on">Google</i><i>AI</i><i>Samen</i></span></div>
            <svg className="r-graph" viewBox="0 0 440 200" aria-hidden="true">
              <defs>
                <linearGradient id="rgStroke" x1="0" x2="1"><stop stopColor="#b6ff18" /><stop offset="1" stopColor="#8b5cf6" /></linearGradient>
                <linearGradient id="rgFill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#b6ff18" stopOpacity=".2" /><stop offset="1" stopColor="#b6ff18" stopOpacity="0" /></linearGradient>
              </defs>
              {[50, 100, 150].map(y => <line className="rg-grid" key={y} x1="0" x2="440" y1={y} y2={y} />)}
              <path className="rg-area" d={`${line} L440 200 L0 200 Z`} />
              <path className="rg-line" d={line} />
              <circle className="rg-dot2 g" cx="136" cy="126.7" r="4" /><circle className="rg-dot2 p" cx="272" cy="86.7" r="4" /><circle className="rg-dot2 g" cx="342" cy="50" r="4" />
              <circle className="rg-dot" cx="440" cy="16.7" r="4.5" />
            </svg>
            <div className="nv-insight"><Chart />Vergelijkingspagina’s leveren deze maand 3× meer AI-vermeldingen op. ORBIT heeft er 4 nieuwe ingepland.</div>
          </div>
          <div className="nv-panel nv-funnels">
            <div className="nv-pt"><b>Klantreis-dekking</b><span>4 fases</span></div>
            {journey.map(([name, value, tone]) => <div className="nv-fn" key={name}><div className="nv-fl"><span>{name}</span><b>{value}%</b></div><div className="nv-track"><span className={`nv-bar ${tone}`} style={{ width: `${value}%` }} /></div></div>)}
            <div className="nv-ffoot">Volgende ronde: focus op ‘beslissen’</div>
          </div>
        </div>
      </div>
    </div>
  </div>
}
