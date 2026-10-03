'use client'
import { useEffect, useRef, useState } from 'react'
import { markets, nl } from '../data'
import { Lock } from '../icons'
import { OrbitCore } from '../visuals'
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from '../gsap'
import { useScreenLoop, type ScreenProps } from './shared'

type Status = 'p' | 'x' | 'l'
type Tile = { id: number; title: string; status: Status }
const label: Record<Status, string> = { p: 'Gepubliceerd', x: 'Geïndexeerd', l: 'Live' }
const cycle: Status[] = ['p', 'x', 'l']
const DOC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>'

const seed = (market: number): Tile[] => {
  const m = markets[market]
  return [{ id: 0, title: `“${m.article}”`, status: 'p' }, ...m.pages.slice(0, 5).map((title, i) => ({ id: i + 1, title, status: cycle[(i + 1) % 3] }))]
}

export default function PublishScreen({ active, market }: ScreenProps) {
  const ref = useRef<HTMLDivElement>(null)
  const layer = useRef<HTMLDivElement>(null)
  const [tiles, setTiles] = useState<Tile[]>(() => seed(market))
  const [live, setLive] = useState(1248)
  const fresh = useRef<number | null>(null)
  const counter = useRef(0)
  const busy = useRef(false)

  useEffect(() => { setTiles(seed(market)) }, [market])

  useIsoLayoutEffect(() => {
    if (!active || prefersReducedMotion() || !ref.current) return
    const ctx = gsap.context(() => {
      gsap.timeline()
        .fromTo('.pub2-src', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.8)' })
        .fromTo('.pub2-pipe', { opacity: 0, scaleX: 0, transformOrigin: 'left center' }, { opacity: 1, scaleX: 1, duration: 0.5, ease: 'power2.out' }, '-=.2')
        .fromTo('.pub2-site', { opacity: 0, x: 26 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, '-=.3')
        .fromTo('.ps-tile', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, stagger: 0.08, duration: 0.35, ease: 'back.out(1.7)' }, '-=.15')
        .fromTo('.pub2-foot', { opacity: 0 }, { opacity: 1, duration: 0.35 }, '-=.1')
    }, ref)
    return () => ctx.revert()
  }, [active])

  /* a freshly shipped tile pops in with a little overshoot */
  useIsoLayoutEffect(() => {
    if (fresh.current === null || !ref.current) return
    const el = ref.current.querySelector(`[data-tile="${fresh.current}"]`)
    fresh.current = null
    if (el) gsap.from(el, { opacity: 0, scale: 0.6, duration: 0.4, ease: 'back.out(2)', clearProps: 'all' })
    const n = ref.current.querySelector('.pf-count span')
    if (n) gsap.fromTo(n, { scale: 1.18 }, { scale: 1, duration: 0.3, transformOrigin: 'right center' })
  }, [tiles])

  /* pages fly from ORBIT into the CMS along a slightly wavy path, the site nudges on arrival */
  useScreenLoop(active, () => {
    const stage = ref.current?.querySelector('.pub2-stage'), host = layer.current
    const orb = stage?.querySelector('.pub2-orb'), site = stage?.querySelector('.pub2-site')
    if (!stage || !host || !orb || !site || busy.current) return
    busy.current = true
    const pages = markets[market].pages
    const title = pages[(counter.current + 5) % pages.length]
    const fly = document.createElement('span')
    fly.className = 'pub2-fly'
    fly.innerHTML = `${DOC}<b></b>`
    fly.querySelector('b')!.textContent = title.length > 24 ? `${title.slice(0, 23)}…` : title
    host.appendChild(fly)
    const o = orb.getBoundingClientRect(), s = site.getBoundingClientRect(), g = stage.getBoundingClientRect()
    const vertical = s.top - g.top > o.height * 0.6
    const sx = vertical ? g.width * 0.5 : o.left - g.left + o.width / 2, ex = vertical ? g.width * 0.5 : s.left - g.left + 14
    const sy = vertical ? o.top - g.top + o.height / 2 : g.height * 0.5, ey = vertical ? s.top - g.top + 16 : g.height * 0.5
    gsap.set(fly, { left: sx, top: sy, xPercent: -50, yPercent: -50, scale: 0.4, opacity: 0, rotation: -6 })
    gsap.to(fly, { opacity: 1, scale: 1, duration: 0.22, ease: 'power1.out' })
    gsap.to(orb, { scale: 1.1, duration: 0.16, yoyo: true, repeat: 1, ease: 'power1.inOut' })
    const p = { t: 0 }
    gsap.to(p, {
      t: 1, duration: 1.35, ease: 'power1.inOut',
      onUpdate: () => gsap.set(fly, { left: sx + (ex - sx) * p.t, top: sy + (ey - sy) * p.t + Math.sin(p.t * Math.PI * 2) * 3, rotation: -6 + 12 * p.t, scale: 1 - 0.3 * p.t }),
      onComplete: () => {
        fly.remove()
        gsap.fromTo(site, { x: 0 }, { x: 3, duration: 0.08, yoyo: true, repeat: 1, ease: 'power1.inOut' })
        const id = Date.now()
        const status = cycle[counter.current++ % 3]
        fresh.current = id
        setTiles(current => [{ id, title, status }, ...current].slice(0, 6))
        setLive(value => value + 1)
        busy.current = false
      },
    })
  }, 2100)

  return <div className={`scr scr3${active ? ' is-on' : ''}`} ref={ref}>
    <div className="pub2">
      <div className="pub2-head"><b>Publiceert rechtstreeks in jouw CMS</b><span>Structuur, interne links en schema inbegrepen</span></div>
      <div className="pub2-stage">
        <div className="pub2-src"><OrbitCore className="pub2-orb" /><em>ORBIT</em></div>
        <span className="pub2-pipe" aria-hidden="true" />
        <div className="pub2-site">
          <div className="ps-bar"><span /><span /><span /><em>jouwdomein.nl</em><i className="ps-lock"><Lock /></i></div>
          <div className="ps-grid">{tiles.map(tile => <div className="ps-tile" data-tile={tile.id} key={tile.id}><b>{tile.title}</b><i /><i /><span className={`ps-st ${tile.status}`}>{label[tile.status]}</span></div>)}</div>
        </div>
        <div className="fx-layer" ref={layer} />
      </div>
      <div className="pub2-foot"><div className="pf-chips"><i>WordPress</i><i>Shopify</i><i>Webflow</i><i>Eigen CMS</i></div><div className="pf-count"><span>{nl(live)}</span> pagina’s live</div></div>
    </div>
  </div>
}
