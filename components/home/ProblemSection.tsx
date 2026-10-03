'use client'
import { useRef } from 'react'
import { markets } from './data'
import { aiEngines, ArrowRight, ChatGPT, ChevronDown, GoogleColor, LinkIcon, Mic, Search, searchEngines, User } from './icons'
import { gsap, prefersReducedMotion, ScrollTrigger, useIsoLayoutEffect } from './gsap'

const Lines = ({ kind }: { kind: 'google' | 'answer' | 'answer-short' }) => <div className="c2-ln">
  {kind === 'google' ? <><i className="b" /><i className="g" /><i /><i className="s" /></> : <><i className={`rec${kind === 'answer-short' ? ' sh' : ''}`} /><i /><i /><i /><i className="s" /></>}
</div>

export default function ProblemSection({ market }: { market: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const m = markets[market]

  /* skeleton bars draw in whenever the comparison comes into view (either direction)
     and reset only once it is fully off-screen, never while visible */
  useIsoLayoutEffect(() => {
    if (prefersReducedMotion() || !ref.current) return
    const ctx = gsap.context(() => {
      const bars = gsap.utils.toArray<HTMLElement>('.c2-ln i')
      gsap.set(bars, { scaleX: 0 })
      const draw = () => gsap.fromTo(bars, { scaleX: 0 }, { scaleX: 1, stagger: 0.05, duration: 0.55, ease: 'power2.out', overwrite: 'auto' })
      const hide = () => gsap.set(bars, { scaleX: 0 })
      ScrollTrigger.create({ trigger: ref.current, start: 'top 82%', end: 'bottom 30%', onEnter: draw, onEnterBack: draw })
      ScrollTrigger.create({ trigger: ref.current, start: 'top bottom', end: 'bottom top', onLeave: hide, onLeaveBack: hide })
    }, ref)
    return () => ctx.revert()
  }, [])

  /* a different market redraws the answers, so the swap reads as a new conversation */
  const first = useRef(true)
  useIsoLayoutEffect(() => {
    if (first.current) { first.current = false; return }
    if (prefersReducedMotion() || !ref.current) return
    gsap.fromTo(ref.current.querySelectorAll('.c2-ln i'), { scaleX: 0 }, { scaleX: 1, stagger: 0.04, duration: 0.5, ease: 'power2.out', overwrite: 'auto' })
  }, [market])

  return <section className="hs-section shift" id="probleem">
    <div className="hs-wrap">
      <div className="thead reveal" style={{ maxWidth: 900 }}>
        <span className="eyebrow">Het probleem · de nieuwe realiteit</span>
        <h2>Zoeken is veranderd. <span className="tone">Niet genoemd worden kost klanten.</span></h2>
        <p>Google en AI-platforms geven direct antwoord. ORBIT zorgt dat jouw merk in dat antwoord staat.</p>
      </div>

      <div className="cmp2 reveal" ref={ref}>
        <div className="cmp2-col">
          <div className="cmp2-head"><b>Oude situatie</b><span>Ranken met zoekwoorden</span></div>
          <div className="cmp2-panel">
            <div className="c2-bar"><GoogleColor className="c2-g" /><b key={market} className="swap">{m.query}</b><Search className="c2-mag" /></div>
            {[1, 2, 3, 4, 5].map(n => <div className="c2-res" key={n}><span className="c2-num">{n}</span><Lines kind="google" /></div>)}
            <div className="c2-erow">{searchEngines.map(([name, Logo]) => <span className="c2-eng" key={name} title={name}><Logo aria-label={name} /></span>)}</div>
            <div className="c2-foot"><span className="ic blue"><LinkIcon /></span>Draait om posities &amp; links</div>
          </div>
        </div>

        <span className="cmp2-arrow" aria-hidden="true"><ArrowRight /></span>

        <div className="cmp2-col">
          <div className="cmp2-head"><b>Nieuwe situatie</b><span>Het relevante antwoord zijn</span></div>
          <div className="cmp2-panel">
            <div className="c2-chat"><span className="c2-gpt"><ChatGPT /></span><b>ChatGPT</b><ChevronDown /></div>
            <div className="c2-user"><b key={`q0-${market}`} className="swap">{m.chat[0]}</b><span className="c2-ava"><User /></span></div>
            <div className="c2-ai"><span className="c2-gpt av"><ChatGPT /></span><Lines kind="answer" /></div>
            <div className="c2-user"><b key={`q1-${market}`} className="swap">{m.chat[1]}</b><span className="c2-ava"><User /></span></div>
            <div className="c2-ai bub"><span className="c2-gpt av"><ChatGPT /></span><Lines kind="answer-short" /></div>
            <div className="c2-user"><b key={`q2-${market}`} className="swap">{m.chat[2]}</b><span className="c2-ava"><User /></span></div>
            <div className="c2-erow">{aiEngines.slice(0, 4).map(([name, Logo]) => <span className="c2-eng" key={name} title={name}><Logo aria-label={name} /></span>)}</div>
            <div className="c2-foot"><span className="ic"><Mic /></span>Draait om genoemd én aanbevolen worden</div>
          </div>
        </div>
      </div>

      <div className="shift-note reveal"><span className="bar" />Vroeger was het doel hoog ranken. Nu is het aanbevolen worden, en onderdeel zijn van het gesprek.<span className="bar" /></div>
    </div>
  </section>
}
