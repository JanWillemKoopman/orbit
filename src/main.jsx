import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const navItems = ['Overzicht', 'Product', 'Resources', 'Over ons']

function OrbitMark() {
  return <span className="orbit-mark" aria-hidden="true"><i /><b /></span>
}

function App() {
  return (
    <main>
      <section className="hero">
        <div className="aurora" aria-hidden="true" />
        <div className="orbital-field" aria-hidden="true">
          <span className="orbital orbital-one" />
          <span className="orbital orbital-two" />
          <span className="orbital orbital-three" />
          <span className="glow glow-a" />
          <span className="glow glow-b" />
        </div>

        <header className="site-header">
          <a className="brand" href="#top" aria-label="Outer Orbit home">
            <OrbitMark />
            <span>OUTER ORBIT</span>
          </a>
          <nav aria-label="Hoofdnavigatie">
            {navItems.map((item) => <a href="#verhaal" key={item}>{item}</a>)}
          </nav>
          <a href="#demo" className="demo-button">Demo aanvragen <span>↗</span></a>
        </header>

        <div className="hero-content" id="top">
          <p className="eyebrow"><span className="eyebrow-dot" /> NU BESCHIKBAAR</p>
          <h1>Introducing<br /><em>Loops</em></h1>
          <p className="hero-copy">Een nieuwe manier om de ritmes van je werk te organiseren.</p>
          <a className="scroll-cue" href="#verhaal"><span className="scroll-line" /> Ontdek Loops</a>
        </div>
        <div className="hero-footer">
          <span>OUTER ORBIT / 2026</span>
          <span>SCROLL TO EXPLORE <b>↓</b></span>
        </div>
      </section>

      <section className="intro" id="verhaal">
        <p className="section-label">01 — EEN NIEUWE CADANS</p>
        <div className="intro-grid">
          <h2>Werk beweegt<br />in <em>cycli.</em></h2>
          <div className="intro-copy">
            <p>Het beste werk ontstaat niet in een rechte lijn. Het volgt een ritme: focus, voortgang, reflectie en weer opnieuw.</p>
            <p>Loops brengt die natuurlijke beweging naar je team. Plan wat belangrijk is, maak ruimte voor het onverwachte en houd de vaart erin.</p>
            <a href="#demo" className="text-link">Meer over Loops <span>→</span></a>
          </div>
        </div>
      </section>

      <section className="feature" id="demo">
        <div className="feature-heading">
          <p className="section-label">02 — ZIE HET GROTE PLAATJE</p>
          <h2>Elke week,<br />in <em>orbit.</em></h2>
        </div>
        <div className="app-window">
          <div className="window-bar"><span /><span /><span /><p>outer orbit / loops</p><b>•••</b></div>
          <div className="window-body">
            <aside><div className="mini-logo"><OrbitMark /></div><i /><i /><i /><i /><i /></aside>
            <div className="workspace">
              <div className="workspace-top"><p>Product cycles</p><span>September 2026</span></div>
              <div className="cycle-card"><small>HUIDIGE LOOP</small><h3>Shape the future</h3><div className="progress"><b /></div><p>7 van 12 projecten voltooid</p></div>
              <div className="task-row"><span className="pink" />Nieuwe onboarding-flow <i>Ontwerp</i></div>
              <div className="task-row"><span className="yellow" />Voorbereiding launch <i>Marketing</i></div>
              <div className="task-row"><span className="blue" />Feedback synthesizen <i>Research</i></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
