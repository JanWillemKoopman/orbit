'use client'
import { useRef, useState } from 'react'
import { markets, nl } from './data'
import { marketIcons } from './icons'
import { Floater } from './visuals'
import { countTo, gsap, prefersReducedMotion, ScrollTrigger, useIsoLayoutEffect } from './gsap'

/* Big faint orbit arcs in the lower corners: our stand-in for inspace's tentacle renders. */
const OrbitArc = ({ flip = false }: { flip?: boolean }) => <svg className={`opp-arc${flip ? ' is-flip' : ''}`} viewBox="0 0 640 360" aria-hidden="true">
  <ellipse cx="320" cy="300" rx="300" ry="120" /><ellipse cx="320" cy="300" rx="220" ry="84" /><ellipse cx="320" cy="300" rx="140" ry="52" />
  <circle className="p1" cx="62" cy="244" r="7" /><circle className="p2" cx="470" cy="226" r="4.5" /><circle className="p3" cx="190" cy="342" r="3.5" />
</svg>

export default function MarketsSection({ market, onSelect }: { market: number; onSelect: (index: number) => void }) {
  const ref = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<number | null>(null)
  const armed = useRef<boolean[]>([])

  /* cards stagger in and the headline volumes count up the first time the strip is seen */
  useIsoLayoutEffect(() => {
    if (prefersReducedMotion() || !ref.current) return
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.opp-mini')
      gsap.set(cards, { opacity: 0, y: 26 })
      ScrollTrigger.create({
        trigger: ref.current, start: 'top 78%', once: true, onEnter: () => {
          gsap.to(cards, { opacity: 1, y: 0, stagger: 0.11, duration: 0.6, ease: 'power2.out', clearProps: 'transform' })
          gsap.utils.toArray<HTMLElement>('[data-om-v]').forEach((el, k) => countTo(el, Number(el.dataset.omV), { duration: 1.1, delay: 0.15 + k * 0.12 }))
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  /* "mensen vragen ook" volumes count up the first time a card opens */
  const arm = (index: number, card: HTMLElement) => {
    if (armed.current[index] || prefersReducedMotion()) return
    armed.current[index] = true
    card.querySelectorAll<HTMLElement>('[data-om-s]').forEach((el, k) => countTo(el, Number(el.dataset.omS), { duration: 0.9, delay: 0.12 + k * 0.1 }))
  }

  return <section className="hs-section opp" id="markten" ref={ref}>
    <span className="wm" aria-hidden="true">Vraag</span>
    <span className="fl fl-arc" data-speed="0.12" style={{ left: -60, bottom: 40, width: 600 }} aria-hidden="true"><OrbitArc /></span>
    <span className="fl fl-arc" data-speed="0.1" style={{ right: -60, bottom: 30, width: 680 }} aria-hidden="true"><OrbitArc flip /></span>
    <Floater kind="orb" speed={0.4} size={34} duration={7.5} style={{ right: '6%', top: '10%' }} className="fl-acc" />
    <Floater kind="diamond" speed={0.65} size={56} rotate={-13} duration={7} style={{ left: '7%', top: '16%' }} className="fl-acc" />

    <div className="hs-wrap">
      <div className="thead center reveal">
        <span className="eyebrow">Elke markt · elke niche</span>
        <h2>ORBIT vindt vragen die jouw klanten <span className="grad">vandaag al stellen.</span></h2>
        <p>Drie echte vragen. Drie verschillende markten. Stel je voor dat ORBIT dit soort vragen ook voor jouw bedrijf blootlegt.</p>
      </div>

      <div className="opp-strip">
        {markets.map((item, index) => {
          const Icon = marketIcons[index]
          return <button type="button" key={item.label} className={`opp-mini${index === market ? ' on' : ''}${open === index ? ' open' : ''}`} aria-pressed={index === market} aria-expanded={open === index}
            onMouseEnter={event => arm(index, event.currentTarget)} onFocus={event => arm(index, event.currentTarget)}
            onClick={event => { arm(index, event.currentTarget); onSelect(index); setOpen(current => current === index ? null : index) }}>
            <span className="om-top"><span className="om-ic"><Icon /></span><span className="om-tx"><b>{item.label}</b><em>{item.goal}</em></span></span>
            <span className="om-q">“{item.query}”</span>
            <span className="om-v"><b data-om-v={item.volume}>{nl(item.volume)}</b><em><span className="lm">zoekopdrachten / mnd</span><span className="ln">alleen al deze zoekopdracht</span></em></span>
            <span className="om-hint">+ 3 andere vragen</span>
            <span className="om-sub"><span className="om-subin"><em>Mensen vragen ook</em>
              {item.related.map(([question, volume]) => <span className="om-s" key={question}><i>“{question}”</i><b data-om-s={volume}>{nl(volume)}</b></span>)}
            </span></span>
          </button>
        })}
      </div>
      <p className="opp-hint">Elke markt heeft er duizenden zoals deze. ORBIT vindt ze allemaal, ook die van jou.</p>
    </div>
  </section>
}
