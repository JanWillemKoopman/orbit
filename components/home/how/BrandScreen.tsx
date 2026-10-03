'use client'
import { useRef } from 'react'
import { Doc, ImageIcon, Route, Target, User, Wave } from '../icons'
import { OrbitCore } from '../visuals'
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from '../gsap'
import { center, useScreenLoop, type ScreenProps } from './shared'

type Kind = 'tone' | 'prods' | 'comp' | 'pers' | 'jour'
const tint: Record<Kind, 'l' | 'v' | 'w'> = { tone: 'v', prods: 'l', comp: 'w', pers: 'v', jour: 'l' }
const miniSvg: Record<Kind, string> = {
  tone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 10v4M9 7v10M13 9v6M17 5v14M21 10v4"/></svg>',
  prods: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
  comp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/></svg>',
  pers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="8.4" r="3.4"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/></svg>',
  jour: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="6" r="2.2"/><circle cx="19" cy="18" r="2.2"/><path d="M7 6h8a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h8"/></svg>',
}
const order: Kind[] = ['tone', 'prods', 'comp', 'pers', 'jour']

export default function BrandScreen({ active }: ScreenProps) {
  const ref = useRef<HTMLDivElement>(null)
  const layer = useRef<HTMLDivElement>(null)
  const next = useRef(0)
  const flying = useRef(0)

  useIsoLayoutEffect(() => {
    if (!active || prefersReducedMotion() || !ref.current) return
    const ctx = gsap.context(() => {
      gsap.timeline()
        .fromTo('.bi-core', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.6)' })
        .fromTo('.bi-src', { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.09, duration: 0.42, ease: 'power2.out' }, '-=.3')
    }, ref)
    return () => ctx.revert()
  }, [active])

  /* sources continuously feed the core: a mini chip leaves a card, curves along a
     random quadratic arc, shrinks as it arrives and the core answers with a pulse */
  useScreenLoop(active, () => {
    const box = ref.current, host = layer.current
    if (!box || !host || flying.current > 4) return
    const kind = order[next.current++ % order.length]
    const src = box.querySelector(`.bi-src.${kind}`), orb = box.querySelector('.bi-orb')
    if (!src || !orb) return
    flying.current++
    const chip = document.createElement('span')
    chip.className = `bi-fly ${tint[kind]}`
    chip.innerHTML = miniSvg[kind]
    host.appendChild(chip)
    const s = center(src, box), e = center(orb, box)
    const dx = e.x - s.x, dy = e.y - s.y, dist = Math.hypot(dx, dy) || 1
    const arc = (Math.random() * 0.5 + 0.2) * (Math.random() < 0.5 ? -1 : 1) * dist * 0.3
    const cx = s.x + dx * 0.5 - dy / dist * arc, cy = s.y + dy * 0.5 + dx / dist * arc
    gsap.set(chip, { left: s.x, top: s.y, xPercent: -50, yPercent: -50, scale: 0.5, opacity: 0 })
    gsap.to(chip, { opacity: 1, scale: 1, duration: 0.25, ease: 'power1.out' })
    const p = { t: 0 }
    gsap.to(p, {
      t: 1, duration: 1.25 + Math.random() * 0.4, ease: 'power1.in',
      onUpdate: () => {
        const t = p.t, u = 1 - t
        gsap.set(chip, { left: u * u * s.x + 2 * u * t * cx + t * t * e.x, top: u * u * s.y + 2 * u * t * cy + t * t * e.y, scale: 1 - 0.68 * t, opacity: t > 0.82 ? 1 - (t - 0.82) / 0.18 : 1 })
      },
      onComplete: () => { chip.remove(); flying.current--; gsap.to(orb, { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1, ease: 'power1.inOut' }) },
    })
  }, 1050)

  return <div className={`scr scr0${active ? ' is-on' : ''}`} ref={ref}>
    <div className="bi">
      <div className="bi-core"><OrbitCore className="bi-orb" /><em>ORBIT</em></div>
      <div className="bi-src tone"><b><Wave />Tone of voice</b><span className="bi-wave">{Array.from({ length: 22 }, (_, i) => <i key={i} />)}</span></div>
      <div className="bi-src prods"><b><Doc />Producten &amp; diensten</b><span className="bi-docs"><em><Doc /></em><em><ImageIcon /></em><em><Doc /></em></span></div>
      <div className="bi-src comp"><b><Target />Concurrenten</b><span className="bi-avs"><i>A</i><i>B</i><i>C</i><u>+12</u></span></div>
      <div className="bi-src pers"><b><User />Doelgroepen</b><span className="bi-people"><em className="p1"><User /></em><em className="p2"><User /></em><em className="p3"><User /></em><u>3 persona’s</u></span></div>
      <div className="bi-src jour"><b><Route />Klantreis</b>
        <svg className="bi-jpath" viewBox="0 0 200 30" aria-hidden="true"><path d="M8 22 C40 4 70 4 100 15 S160 28 192 8" /><circle className="j1" cx="8" cy="22" r="4" /><circle className="j2" cx="70" cy="8" r="4" /><circle className="j3" cx="130" cy="22" r="4" /><circle className="j4" cx="192" cy="8" r="4" /></svg>
      </div>
      <div className="fx-layer" ref={layer} />
    </div>
  </div>
}
