'use client'
import { useEffect, useRef } from 'react'
import { markets } from '../data'
import { countTo, gsap, prefersReducedMotion, useIsoLayoutEffect } from '../gsap'
import type { ScreenProps } from './shared'

const SUBS = ['gidsen', 'vergelijkingen', 'prijzen', 'how-to', 'reviews', 'lokaal', 'alternatieven', 'vragen']
const NODE = '245,245,245', SOFT = '150,150,150'
const cells: Array<[number, string]> = [[238, 'Zoekvragen'], [14, 'Clusters'], [46, 'Pagina’s gepland'], [9, 'Snelle kansen']]

type Node = { tx: number; ty: number; px?: number; py?: number; ring: number; delay: number; r: number; ph: number; label?: string; violet?: boolean }

export default function StrategyScreen({ active, market }: ScreenProps) {
  const ref = useRef<HTMLDivElement>(null)
  const web = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const capN = useRef<HTMLSpanElement>(null)
  const topic = markets[market].topic

  useIsoLayoutEffect(() => {
    if (!active || prefersReducedMotion() || !ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.s-cell', { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.4 })
      const count = ref.current?.querySelector('.s-count b')
      if (count) countTo(count, 238, { duration: 1.1, delay: 0.1 })
      ref.current?.querySelectorAll<HTMLElement>('.s-cell b').forEach((el, k) => countTo(el, cells[k][0], { duration: 0.9, delay: 0.15 + k * 0.08 }))
    }, ref)
    return () => ctx.revert()
  }, [active])

  /* topic bloom, ported from inspace's strategy canvas and re-inked for a dark surface:
     root → 8 intent branches → 4-6 searches each → 1-2 long-tail leaves, all easing out
     from their parent with organic drift once alive */
  useEffect(() => {
    const panel = web.current, el = canvas.current
    if (!active || !panel || !el) return
    const ctx = el.getContext('2d')
    if (!ctx) return
    const reduced = prefersReducedMotion()
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    const mono = getComputedStyle(document.body).getPropertyValue('--font-geist-mono').trim() || 'monospace'
    let W = 0, H = 0, CX = 0, CY = 0, nodes: Node[] = [], links: Array<[Node, Node]> = [], T0 = performance.now(), raf = 0
    const rnd = (a: number, b: number) => a + Math.random() * (b - a)
    const clamp = (n: Node, pad: number) => { n.tx = Math.max(pad, Math.min(W - pad, n.tx)); n.ty = Math.max(pad, Math.min(H - pad, n.ty)) }
    const build = () => {
      nodes = []; links = []
      const R1 = Math.min(W * 0.24, H * 0.34), EX = 1.35
      const root: Node = { tx: CX, ty: CY, ring: 0, delay: 0.05, r: 7, ph: rnd(0, 6) }
      nodes.push(root)
      SUBS.forEach((label, i) => {
        const a = -Math.PI / 2 + i * (Math.PI * 2 / SUBS.length) + rnd(-0.12, 0.12)
        const n: Node = { tx: CX + Math.cos(a) * R1 * EX, ty: CY + Math.sin(a) * R1, ring: 1, delay: 0.55 + i * 0.13, r: 4.6, label, ph: rnd(0, 6), px: CX, py: CY }
        clamp(n, 26); nodes.push(n); links.push([root, n])
        const kids = 4 + Math.floor(Math.random() * 3)
        for (let k = 0; k < kids; k++) {
          const a2 = a + rnd(-0.55, 0.55), R2 = R1 + rnd(H * 0.14, H * 0.26)
          const c: Node = { tx: CX + Math.cos(a2) * R2 * EX, ty: CY + Math.sin(a2) * R2, ring: 2, delay: 1.7 + i * 0.1 + k * 0.09, r: 2.6, ph: rnd(0, 6), px: n.tx, py: n.ty, violet: (i + k) % 4 === 0 }
          clamp(c, 14); nodes.push(c); links.push([n, c])
          for (let g = 0; g < 1 + Math.floor(Math.random() * 2); g++) {
            const a3 = a2 + rnd(-0.4, 0.4), R3 = R2 + rnd(H * 0.1, H * 0.2)
            const d: Node = { tx: CX + Math.cos(a3) * R3 * EX, ty: CY + Math.sin(a3) * R3, ring: 3, delay: 2.7 + Math.random() * 1.5, r: 1.5, ph: rnd(0, 6), px: c.tx, py: c.ty }
            clamp(d, 8); nodes.push(d); links.push([c, d])
          }
        }
      })
    }
    const resize = () => {
      W = panel.clientWidth; H = panel.clientHeight
      if (W < 10) return
      CX = W * 0.5; CY = H * 0.47
      el.width = Math.round(W * dpr); el.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }
    const ease = (p: number) => 1 - Math.pow(1 - p, 3)
    const back = (p: number) => 1 + 2.7 * Math.pow(p - 1, 3) + 1.7 * Math.pow(p - 1, 2)
    const pos = (n: Node, t: number) => {
      const p = Math.max(0, Math.min(1, (t - n.delay) / 0.7)), e = ease(p)
      const x = n.px === undefined ? n.tx : n.px + (n.tx - n.px) * e
      const y = n.py === undefined ? n.ty : n.py + (n.ty - n.py) * e
      const drift = p * 2.6
      return { x: x + Math.sin(t * 0.5 + n.ph) * drift, y: y + Math.cos(t * 0.42 + n.ph * 1.3) * drift, p }
    }
    const draw = (now: number) => {
      const t = reduced ? 10 : (now - T0) / 1000
      ctx.clearRect(0, 0, W, H)
      for (const [A, B] of links) {
        const pa = pos(A, t), pb = pos(B, t)
        if (pb.p <= 0) continue
        const alpha = (B.ring === 1 ? 0.2 : B.ring === 2 ? 0.13 : 0.08) * Math.min(1, pb.p * 1.4)
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`; ctx.lineWidth = B.ring === 1 ? 1.1 : 0.8
        const mx = (pa.x + pb.x) / 2 + (pb.y - pa.y) * 0.08, my = (pa.y + pb.y) / 2 - (pb.x - pa.x) * 0.08
        ctx.beginPath(); ctx.moveTo(pa.x, pa.y)
        ctx.quadraticCurveTo(pa.x + (mx - pa.x) * pb.p, pa.y + (my - pa.y) * pb.p, mx + (pb.x - mx) * pb.p, my + (pb.y - my) * pb.p)
        ctx.stroke()
      }
      for (const n of nodes) {
        const pt = pos(n, t)
        if (pt.p <= 0) continue
        const s = pt.p >= 1 ? 1 : back(pt.p)
        if (n.ring === 0) {
          const glow = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 60)
          glow.addColorStop(0, 'rgba(255,255,255,.08)'); glow.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(pt.x, pt.y, 60, 0, 7); ctx.fill()
          const R = 26 * s * (1 + Math.sin(t * 1.6) * 0.07)
          const body = ctx.createRadialGradient(pt.x - R * 0.36, pt.y - R * 0.42, R * 0.05, pt.x, pt.y, R)
          body.addColorStop(0, '#fafafa'); body.addColorStop(0.2, '#cfcfcf'); body.addColorStop(0.55, '#6e6e6e'); body.addColorStop(0.85, '#262626'); body.addColorStop(1, '#111')
          ctx.fillStyle = body; ctx.beginPath(); ctx.arc(pt.x, pt.y, R, 0, 7); ctx.fill()
          ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.lineWidth = 1
          ctx.beginPath(); ctx.ellipse(pt.x, pt.y, R * 1.65, R * 0.46, -0.28, 0, 7); ctx.stroke()
          ctx.font = `600 10px ${mono}`
          const label = topic.toUpperCase(), bw = ctx.measureText(label).width + 22, bh = 22, bx = pt.x - bw / 2, by = pt.y + R + 12
          ctx.fillStyle = 'rgba(14,14,14,.95)'; ctx.strokeStyle = 'rgba(255,255,255,.16)'; ctx.lineWidth = 1
          ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 11); ctx.fill(); ctx.stroke()
          ctx.fillStyle = '#f5f5f5'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
          ctx.fillText(label, pt.x, by + bh / 2 + 0.5)
        } else if (n.ring === 1) {
          ctx.fillStyle = `rgb(${NODE})`; ctx.beginPath(); ctx.arc(pt.x, pt.y, n.r * s, 0, 7); ctx.fill()
          ctx.strokeStyle = 'rgba(255,255,255,.14)'; ctx.lineWidth = 1
          ctx.beginPath(); ctx.arc(pt.x, pt.y, n.r * s + 3.5, 0, 7); ctx.stroke()
          if (pt.p > 0.5 && n.label) {
            ctx.font = `600 9px ${mono}`; ctx.fillStyle = `rgba(245,245,245,${0.66 * Math.min(1, (pt.p - 0.5) * 2)})`
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
            ctx.fillText(n.label.toUpperCase(), pt.x, pt.y + (n.ty > CY ? 16 : -14))
          }
        } else if (n.ring === 2) {
          ctx.fillStyle = n.violet ? `rgba(${SOFT},.8)` : `rgba(${NODE},.7)`
          ctx.beginPath(); ctx.arc(pt.x, pt.y, n.r * s, 0, 7); ctx.fill()
        } else {
          ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.beginPath(); ctx.arc(pt.x, pt.y, n.r * s, 0, 7); ctx.fill()
        }
      }
      if (capN.current) capN.current.textContent = String(Math.round(238 * ease(Math.max(0, Math.min(1, (t - 1.2) / 2.4)))))
      if (!reduced) raf = requestAnimationFrame(draw)
    }
    resize()
    raf = requestAnimationFrame(draw)
    let observed = false
    const ro = new ResizeObserver(() => {
      if (!observed) { observed = true; return }
      resize(); T0 = performance.now() - 6000
      if (reduced) requestAnimationFrame(draw)
    })
    ro.observe(panel)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [active, topic])

  return <div className={`scr scr1${active ? ' is-on' : ''}`} ref={ref}>
    <div className="s-head"><span className="s-label">Kansenkaart</span><span className="s-count"><b>238</b> kansen gevonden</span></div>
    <div className="cg-web" ref={web}>
      <canvas className="cg-canvas" ref={canvas} aria-hidden="true" />
      <div className="cg-cap"><span className="cg-cap-n" ref={capN}>238</span> zoekvragen rond <span className="cg-cap-data">{topic}</span></div>
    </div>
    <div className="s-cells">{cells.map(([value, label]) => <div className="s-cell" key={label}><b>{value}</b><span>{label}</span></div>)}</div>
  </div>
}
