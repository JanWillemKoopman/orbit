'use client'
import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { countTo, gsap, prefersReducedMotion, ScrollTrigger, useIsoLayoutEffect } from './gsap'
import ProblemSection from './ProblemSection'
import MarketsSection from './MarketsSection'
import HowSection from './HowSection'
import AutonomySection from './AutonomySection'
import ClosingCta from './ClosingCta'
import './home.css'

export default function HomeSections() {
  const ref = useRef<HTMLDivElement>(null)
  const [market, setMarket] = useState(0)

  /* Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync */
  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, anchors: { offset: -72 } })
    ;(window as unknown as { lenis?: Lenis }).lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(raf); lenis.destroy(); delete (window as unknown as { lenis?: Lenis }).lenis }
  }, [])

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion() || !ref.current) return
    const ctx = gsap.context(() => {
      /* reveals: one short, soft fade-up when an element enters, then it stays still */
      gsap.utils.toArray<HTMLElement>('.reveal').forEach(el => {
        gsap.set(el, { opacity: 0, y: 16 })
        gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%' } })
      })
      /* count-ups */
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach(el => {
        ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => countTo(el, Number(el.dataset.count), { duration: 1.6 }) })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return <div className="hs" ref={ref}>
    <ProblemSection market={market} />
    <MarketsSection market={market} onSelect={setMarket} />
    <HowSection market={market} />
    <AutonomySection />
    <ClosingCta />
  </div>
}
