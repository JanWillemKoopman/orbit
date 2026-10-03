'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { steps } from './data'
import { Floater } from './visuals'
import { gsap, prefersReducedMotion } from './gsap'
import BrandScreen from './how/BrandScreen'
import StrategyScreen from './how/StrategyScreen'
import CreationScreen from './how/CreationScreen'
import PublishScreen from './how/PublishScreen'
import RadarScreen from './how/RadarScreen'
import ResultsScreen from './how/ResultsScreen'

const DURATION = 7

/* SaaS stepper, as on inspace: auto-advancing with a progress bar under the active step,
   clickable (a click hands control to the visitor), paused while off-screen. */
export default function HowSection({ market }: { market: number }) {
  const ref = useRef<HTMLElement>(null)
  const nav = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [auto, setAuto] = useState(true)
  const [inView, setInView] = useState(false)
  const progress = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  /* progress bar of the active step drives the auto-advance */
  useEffect(() => {
    const bars = ref.current?.querySelectorAll<HTMLElement>('.h4-prog u')
    if (!bars) return
    bars.forEach((bar, index) => { if (index !== current) bar.style.width = '0%' })
    const bar = bars[current]
    progress.current?.kill()
    if (!auto || !inView || prefersReducedMotion()) { bar.style.width = '0%'; return }
    progress.current = gsap.fromTo(bar, { width: '0%' }, { width: '100%', duration: DURATION, ease: 'none', onComplete: () => setCurrent(value => (value + 1) % steps.length) })
    return () => { progress.current?.kill() }
  }, [current, auto, inView])

  /* on narrow screens the steps become a horizontal rail: keep the active one centred */
  useEffect(() => {
    const rail = nav.current, button = rail?.children[current] as HTMLElement | undefined
    if (!rail || !button || rail.scrollWidth <= rail.clientWidth + 4) return
    rail.scrollTo({ left: Math.max(0, button.offsetLeft - rail.offsetLeft - (rail.clientWidth - button.offsetWidth) / 2), behavior: 'smooth' })
  }, [current])

  const choose = useCallback((index: number) => { setAuto(false); setCurrent(index) }, [])

  return <section className="hs-section how4" id="werking" ref={ref}>
    <span className="wm" aria-hidden="true">Engine</span>
    <span className="amb" style={{ ['--amb-c' as string]: 'rgba(139,92,246,.10)', top: '18%' }} aria-hidden="true" />
    <Floater kind="orb" speed={0.12} size={42} rotate={-8} duration={10} style={{ right: '7%', top: '9%' }} className="fl-acc" />
    <Floater kind="diamond" speed={0.16} size={32} rotate={10} duration={9} style={{ left: '4.5%', bottom: '10%' }} className="fl-acc" />

    <div className="hs-wrap">
      <div className="thead reveal">
        <span className="eyebrow">Hoe het werkt</span>
        <h2>Van jouw bedrijfskennis naar zichtbaar resultaat. <span className="grad">Volledig verbonden.</span></h2>
        <p>Zes stappen, één doorlopende motor. Kijk hoe ORBIT ze zelfstandig doorloopt, of klik op een stap om zelf te kijken.</p>
      </div>

      <div className="how4-grid reveal">
        <div className="how4-nav" role="tablist" aria-label="Stappen van ORBIT ENGINE" ref={nav}>
          {steps.map((step, index) => <button type="button" role="tab" id={`h4-tab-${index}`} aria-controls="h4-panel" aria-selected={index === current} className={`h4-step${index === current ? ' on' : ''}`} key={step.title} onClick={() => choose(index)}>
            <span className="h4-num">{String(index + 1).padStart(2, '0')}</span>
            <span className="h4-tx"><b>{step.title}</b><span className="h4-body"><span className="h4-in"><em>{step.kicker}</em><p>{step.copy}</p></span></span></span>
            <i className="h4-prog" aria-hidden="true"><u /></i>
          </button>)}
        </div>

        <div className="how4-stage">
          <div className="hz-panel" id="h4-panel" role="tabpanel" aria-labelledby={`h4-tab-${current}`}>
            <div className="hz-bar"><span /><span /><span /><em>ORBIT ENGINE</em><i><b />Autonoom<span className="hz-long">&nbsp;· always on</span></i></div>
            <div className="hz-body">
              <BrandScreen active={current === 0} market={market} />
              <StrategyScreen active={current === 1} market={market} />
              <CreationScreen active={current === 2} market={market} onApprove={() => choose(3)} />
              <PublishScreen active={current === 3} market={market} />
              <RadarScreen active={current === 4} market={market} />
              <ResultsScreen active={current === 5} market={market} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
}
