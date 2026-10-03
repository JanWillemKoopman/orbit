'use client'
import { useEffect, useRef, useState } from 'react'
import { markets } from '../data'
import { OrbitCore } from '../visuals'
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from '../gsap'
import type { ScreenProps } from './shared'

/* [angle°, radius%] of every watched page on the radar */
const POS: Array<[number, number]> = [[18, 42], [52, 30], [84, 44], [118, 34], [147, 45], [176, 28], [205, 41], [236, 33], [262, 45], [290, 30], [318, 43], [344, 34], [70, 20], [250, 20]]
const GAINS = ['+18%', '+11%', '+24%', '+9%']
const CK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
const PERIOD = 3100

export default function RadarScreen({ active, market }: ScreenProps) {
  const ref = useRef<HTMLDivElement>(null)
  const layer = useRef<HTMLDivElement>(null)
  const sweep = useRef<HTMLSpanElement>(null)
  const [fixes, setFixes] = useState(3)
  const titles = useRef(markets[market].pages)
  titles.current = markets[market].pages

  /* dots are created once, imperatively, inside a layer React never re-renders */
  useEffect(() => {
    const host = layer.current
    if (!host || host.childElementCount) return
    POS.forEach(([angle, radius]) => {
      const dot = document.createElement('span')
      dot.className = 'rad-dot'
      dot.innerHTML = CK
      const a = angle * Math.PI / 180
      dot.style.left = `${50 + Math.sin(a) * radius}%`
      dot.style.top = `${50 - Math.cos(a) * radius}%`
      dot.dataset.a = String(angle)
      host.appendChild(dot)
    })
  }, [])

  useIsoLayoutEffect(() => {
    if (!active || prefersReducedMotion() || !ref.current) return
    const ctx = gsap.context(() => {
      gsap.timeline()
        .fromTo('.rad-orb', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' })
        .fromTo('.rad-ring', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, stagger: 0.12, duration: 0.5, ease: 'power2.out' }, '-=.3')
        .fromTo('.rad-dot', { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, stagger: 0.03, duration: 0.3, ease: 'back.out(2)' }, '-=.3')
        .fromTo('.rad-hud', { opacity: 0, y: 6 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.3 }, '-=.2')
    }, ref)
    return () => ctx.revert()
  }, [active])

  /* the sweep turns at a fixed period; a page dips, waits until the beam actually
     reaches its angle, then heals: card with shimmer → ✓ → ripple and a floating gain */
  useEffect(() => {
    const field = layer.current, beam = sweep.current
    if (!active || prefersReducedMotion() || !field || !beam) return
    const start = performance.now()
    const spin = gsap.fromTo(beam, { rotation: 0 }, { rotation: 360, duration: PERIOD / 1000, ease: 'none', repeat: -1, transformOrigin: '50% 50%' })
    const dots = Array.from(field.querySelectorAll<HTMLElement>('.rad-dot'))
    const timers: number[] = []
    const later = (fn: () => void, ms: number) => { timers.push(window.setTimeout(fn, ms)) }
    let active_ = 0, titleIdx = 0, gainIdx = 0, busy: HTMLElement[] = []
    const beamAngle = () => ((performance.now() - start) / PERIOD * 360) % 360
    const angDist = (a: number, b: number) => { const d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d }
    const waitFor = (a: number) => { let w = ((((a - beamAngle()) % 360) + 360) % 360) / 360 * PERIOD; if (w < 220) w += PERIOD; return w }
    const pick = () => {
      let best: HTMLElement | null = null, bestWait = Infinity
      for (const d of dots) {
        if (d.classList.contains('dip') || d.classList.contains('fx') || d.classList.contains('done')) continue
        const a = Number(d.dataset.a)
        if (busy.some(b => angDist(a, Number(b.dataset.a)) < 95)) continue
        const w = waitFor(a)
        if (w < bestWait) { bestWait = w; best = d }
      }
      return best ? { dot: best, wait: bestWait } : null
    }
    const heal = (dot: HTMLElement) => {
      dot.classList.remove('dip'); dot.classList.add('fx')
      const dx = parseFloat(dot.style.left), dy = parseFloat(dot.style.top)
      const card = document.createElement('div')
      card.className = 'rad-card'
      card.innerHTML = '<b></b><i></i><i></i><em>Optimaliseren…</em><span class="shine"></span>'
      card.querySelector('b')!.textContent = titles.current[titleIdx++ % titles.current.length]
      card.style.left = dot.style.left; card.style.top = dot.style.top
      card.style.transform = `translate(${dx > 50 ? '8%' : '-108%'},${dy > 55 ? '-105%' : '-20%'})`
      field.appendChild(card)
      /* measured before the pop-in scale starts, so the card is kept fully inside the screen */
      const bounds = (field.closest('.scr') ?? field).getBoundingClientRect(), cr = card.getBoundingClientRect(), pad = 10
      if (cr.left < bounds.left + pad) card.style.marginLeft = `${bounds.left + pad - cr.left}px`
      else if (cr.right > bounds.right - pad) card.style.marginLeft = `${-(cr.right - bounds.right + pad)}px`
      gsap.fromTo(card, { scale: 0.15, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.38, ease: 'back.out(1.5)', transformOrigin: `${dx > 50 ? 'left' : 'right'} ${dy > 55 ? 'bottom' : 'top'}` })
      later(() => { card.classList.add('okc'); card.querySelector('em')!.textContent = '✓ Geoptimaliseerd' }, 1150)
      later(() => {
        gsap.to(card, { scale: 0.15, opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => card.remove() })
        dot.classList.remove('fx'); dot.classList.add('done')
        const rip = document.createElement('span')
        rip.className = 'rad-rip'; rip.style.left = dot.style.left; rip.style.top = dot.style.top
        field.appendChild(rip)
        gsap.fromTo(rip, { scale: 0.4, opacity: 0.9 }, { scale: 4.4, opacity: 0, duration: 0.9, ease: 'power2.out', onComplete: () => rip.remove() })
        const plus = document.createElement('span')
        plus.className = 'rad-plus'; plus.textContent = GAINS[gainIdx++ % GAINS.length]
        plus.style.left = dot.style.left; plus.style.top = dot.style.top
        field.appendChild(plus)
        gsap.fromTo(plus, { y: 0, opacity: 0 }, { y: -26, opacity: 1, duration: 0.5, ease: 'power2.out', onComplete: () => { gsap.to(plus, { opacity: 0, y: -40, duration: 0.45, delay: 0.3, onComplete: () => plus.remove() }) } })
        setFixes(value => value + 1)
        later(() => dot.classList.remove('done'), 2300)
        active_--; busy = busy.filter(b => b !== dot)
      }, 1700)
    }
    const tick = () => {
      if (document.hidden || active_ >= 3) return
      const choice = pick()
      if (!choice) return
      active_++; busy.push(choice.dot)
      choice.dot.classList.add('dip')
      later(() => heal(choice.dot), choice.wait)
    }
    later(tick, 150); later(tick, 800)
    const id = window.setInterval(tick, 1400)
    return () => {
      spin.kill(); window.clearInterval(id); timers.forEach(window.clearTimeout)
      field.querySelectorAll('.rad-card, .rad-rip, .rad-plus').forEach(el => el.remove())
      dots.forEach(d => d.classList.remove('dip', 'fx', 'done'))
    }
  }, [active])

  useIsoLayoutEffect(() => {
    const el = ref.current?.querySelector('[data-rad-fixes]')
    if (el && fixes > 3) gsap.fromTo(el, { scale: 1.3 }, { scale: 1, duration: 0.3 })
  }, [fixes])

  return <div className={`scr scr4${active ? ' is-on' : ''}`} ref={ref}>
    <div className="rad">
      <span className="rad-hud tl">Bewaakt <b>1.248</b> pagina’s</span>
      <span className="rad-hud bl">Fixes vandaag <b data-rad-fixes="">{fixes}</b></span>
      <span className="rad-hud br"><b>●</b> Live</span>
      <div className="rad-field">
        <span className="rad-ring r1" /><span className="rad-ring r2" /><span className="rad-ring r3" />
        <span className="rad-sweep" ref={sweep} />
        <OrbitCore className="rad-orb" ring={false} />
        <div className="fx-layer" ref={layer} />
      </div>
    </div>
  </div>
}
