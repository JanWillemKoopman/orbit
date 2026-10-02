import React, { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const navItems = [['Product', '/product'], ['Prijs', '/prijs'], ['Nieuws', '/nieuws'], ['Over ons', '/over-ons']]

function OrbitMark() {
  return <span className="orbit-mark" aria-hidden="true"><i /><b /></span>
}

function CalendarIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 2v3M15 2v3M3 7h14M4 4h12a1 1 0 0 1 1 1v12H3V5a1 1 0 0 1 1-1Z" /></svg>
}

function Arrow({ up = false }) {
  return <svg viewBox="0 0 16 16" aria-hidden="true"><path d={up ? 'M4 12 12 4M6 4h6v6' : 'M3 8h10M9 4l4 4-4 4'} /></svg>
}

function Header() {
  return <header className="site-header">
    <div className="site-header__inner">
      <a className="brand" href="/" aria-label="Outer Orbit home"><OrbitMark /><span>OUTER ORBIT</span></a>
      <nav className="site-nav" aria-label="Hoofdnavigatie">
        {navItems.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
      </nav>
      <a href="#demo" className="demo-button"><CalendarIcon /><span>Plan een gratis demo</span></a>
    </div>
  </header>
}

function GrowthChart() {
  const pathRef = useRef(null)
  const dotRef = useRef(null)
  const fillRef = useRef(null)
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const path = pathRef.current
    const dot = dotRef.current
    const fill = fillRef.current
    const length = path.getTotalLength()
    const start = length * .78
    let frame
    const began = performance.now()
    const render = now => {
      const progress = reduced ? .86 : Math.min(.98, .78 + (now - began) / 65000)
      const shown = length * progress
      path.style.strokeDasharray = `${shown} ${length}`
      path.style.strokeDashoffset = '0'
      fill.style.opacity = Math.min(1, (progress - .72) * 8)
      const point = path.getPointAtLength(shown)
      dot.setAttribute('transform', `translate(${point.x} ${point.y})`)
      if (!reduced && progress < .98) frame = requestAnimationFrame(render)
    }
    path.style.strokeDasharray = `${start} ${length}`
    frame = requestAnimationFrame(render)
    return () => cancelAnimationFrame(frame)
  }, [])
  return <svg className="growth-chart" viewBox="0 0 900 190" role="img" aria-label="Continu stijgende organische en AI-zichtbaarheid">
    <defs><linearGradient id="line" x1="0" x2="1"><stop stopColor="#49d488"/><stop offset=".58" stopColor="#8070ff"/><stop offset="1" stopColor="#cf4cff"/></linearGradient><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#9f56ff" stopOpacity=".22"/><stop offset="1" stopColor="#9f56ff" stopOpacity="0"/></linearGradient></defs>
    <path ref={fillRef} className="chart-fill" d="M0 160 C35 158 40 140 76 148 S112 178 140 126 S190 124 220 104 S260 130 292 109 S340 111 372 84 S420 113 448 67 S500 61 530 90 S584 89 608 47 S660 58 694 35 S738 59 770 24 S820 40 852 17 S880 20 900 11 L900 190 L0 190Z" />
    <path ref={pathRef} className="chart-line" d="M0 160 C35 158 40 140 76 148 S112 178 140 126 S190 124 220 104 S260 130 292 109 S340 111 372 84 S420 113 448 67 S500 61 530 90 S584 89 608 47 S660 58 694 35 S738 59 770 24 S820 40 852 17 S880 20 900 11" />
    <g ref={dotRef}><circle className="chart-dot-halo" r="11"/><circle className="chart-dot" r="5"><animate attributeName="r" values="4;6;4" dur="2.4s" repeatCount="indefinite" /></circle></g>
  </svg>
}

const published = ['AI-marketingstrategie voor 2026', 'SEO voor groeiende merken', 'Vindbaar in AI-antwoorden']
function EngineVisual() {
  return <div className="engine-window">
    <aside className="engine-sidebar"><OrbitMark/><span>⌂</span><span>⌁</span><span>◎</span><span>▣</span></aside>
    <div className="engine-main">
      <div className="engine-heading"><div><small>ORBIT ENGINE</small><h2>Zichtbaarheid groeit</h2></div><b><i/> AUTONOOM · LIVE</b></div>
      <div className="metrics"><div><small>PAGINA'S LIVE</small><strong>1.248</strong><em>+12 deze week</em></div><div><small>ORGANISCH + AI-VERKEER</small><strong>+48%</strong><em>en stijgend</em></div><div><small>AI-VERMELDINGEN</small><strong>312</strong><em>+ groeiend</em></div></div>
      <div className="chart-card"><small>ORGANISCHE + AI-ZICHTBAARHEID, DIT KWARTAAL</small><GrowthChart /></div>
      <div className="published-head"><small>GEPUBLICEERDE PAGINA'S</small><span>3 DEZE WEEK</span></div>
      <div className="published-grid">{published.map((title, i) => <article key={title}><span className="doc-icon">▧</span><div><h3>{title}</h3><div className="publish-progress"><i style={{'--delay': `${i * .15}s`}} /></div><small>GEPUBLICEERD</small></div></article>)}</div>
    </div>
  </div>
}

function Home() {
  return <main><section className="hero"><div className="aurora"/><Header/><div className="hero__inner">
    <div className="hero-copy"><p className="eyebrow"><span/> ORBIT ENGINE · ALTIJD AAN</p><h1>Word onmogelijk<br/><em>te negeren.</em></h1><p>ORBIT ENGINE onderzoekt waar je kansen liggen, bepaalt welke content nodig is en creëert en optimaliseert die continu. Zo werkt het <mark>autonoom</mark> aan je zichtbaarheid in Google én AI-antwoorden.</p><div className="hero-actions"><a className="primary" id="demo" href="mailto:demo@outerorbit.nl">Plan een gratis demo <Arrow up/></a><a className="secondary" href="/product">Bekijk hoe ORBIT werkt <Arrow/></a></div></div>
    <EngineVisual />
  </div></section><Proof/><ExistingSections/></main>
}

function Proof() { return <section className="proof"><div><p className="section-label">HET BEWIJS</p><p className="proof-lead">Merken die we onmogelijk<br/>te negeren maakten</p></div><div className="logos"><span>nexeye</span><span>POLITIEK</span><span>LOYALS</span><span>natuurhuisje</span><span>FLOORIFY</span></div></section> }

function ExistingSections() { return <><section className="intro"><p className="section-label">01 — EEN NIEUWE CADANS</p><div className="intro-grid"><h2>Werk beweegt<br/>in <em>cycli.</em></h2><div className="intro-copy"><p>Het beste werk ontstaat niet in een rechte lijn. Het volgt een ritme: focus, voortgang, reflectie en weer opnieuw.</p><p>Loops brengt die natuurlijke beweging naar je team. Plan wat belangrijk is, maak ruimte voor het onverwachte en houd de vaart erin.</p></div></div></section><section className="feature"><p className="section-label">02 — ZIE HET GROTE PLAATJE</p><h2>Elke week,<br/>in <em>orbit.</em></h2></section></> }

function SimplePage({ title }) { return <div className="simple-page"><Header/><main><h1>{title}</h1></main><footer><a className="brand" href="/"><OrbitMark/> OUTER ORBIT</a><span>© 2026 OUTER ORBIT</span></footer></div> }

const page = navItems.find(([, path]) => path === window.location.pathname)
createRoot(document.getElementById('root')).render(page ? <SimplePage title={page[0]}/> : <Home />)
