'use client'
import { useEffect, useId, useRef, type CSSProperties } from 'react'

/* ORBIT core: our answer to inspace's NOVA blob. A lit sphere (lime highlight,
   violet shadow) with a tilted orbit ring; the satellite passes behind the sphere
   on the back half of the ring and in front of it on the front half. */
export function OrbitCore({ className = '', ring = true, style }: { className?: string; ring?: boolean; style?: CSSProperties }) {
  const id = useId().replace(/:/g, '')
  const orbit = 'M8 100a92 26 0 1 0 184 0a92 26 0 1 0-184 0'
  const layer = (half: 'back' | 'front') => (
    <svg className={`oc-ring oc-ring--${half}`} viewBox="0 0 200 200" aria-hidden="true">
      <defs><clipPath id={`${id}-${half}`} clipPathUnits="userSpaceOnUse"><rect x="-20" y={half === 'back' ? -20 : 100} width="240" height="120" /></clipPath></defs>
      <g transform="rotate(-16 100 100)"><g clipPath={`url(#${id}-${half})`}>
        <ellipse cx="100" cy="100" rx="92" ry="26" />
        <circle className="oc-sat" r="4.2"><animateMotion dur="7s" repeatCount="indefinite" path={orbit} /></circle>
      </g></g>
    </svg>
  )
  return <span className={`orbit-core ${className}`} style={style} aria-hidden="true">
    <span className="oc-aura" />
    {ring && layer('back')}
    <span className="oc-sphere" />
    {ring && layer('front')}
  </span>
}

/* Floating brand asset with scroll parallax (data-speed is read by the page's GSAP setup). */
export type FloaterKind = 'orb' | 'planet' | 'spark' | 'diamond'
export function Floater({ kind, speed, size, style, duration = 8, rotate = 0, className = '' }: { kind: FloaterKind; speed: number; size: number; style: CSSProperties; duration?: number; rotate?: number; className?: string }) {
  return <span className={`fl ${className}`} data-speed={speed} style={{ width: size, ...style }} aria-hidden="true">
    <span className="fl-bob" style={{ animationDuration: `${duration}s`, rotate: `${rotate}deg` }}>
      {kind === 'orb' && <span className="fl-orb" />}
      {kind === 'planet' && <span className="fl-planet"><span className="fl-orb" /><i /></span>}
      {kind === 'spark' && <svg className="fl-spark" viewBox="0 0 24 24"><path d="M12 1c.7 6 4.9 10.3 11 11-6.1.7-10.3 5-11 11-.7-6-4.9-10.3-11-11 6.1-.7 10.3-5 11-11Z" /></svg>}
      {kind === 'diamond' && <span className="fl-diamond" />}
    </span>
  </span>
}

/* Particle galaxy on canvas: our version of inspace's slowly turning galaxy render.
   Three logarithmic arms plus a soft bulge, lime core fading to violet rim, soft dust
   clouds along the arms, differential rotation (the core turns faster than the rim). */
type Star = { r: number; a: number; size: number; hue: number; tw: number; light: number; dust: boolean }
const lerpColor = (t: number) => [Math.round(182 + (139 - 182) * t), Math.round(255 + (92 - 255) * t), Math.round(24 + (246 - 24) * t)]
export function Galaxy({ className = '', density = 1, speed = 1 }: { className?: string; density?: number; speed?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    /* pre-rendered soft sprites (6 hue steps) keep the dust clouds cheap to draw */
    const sprites = Array.from({ length: 6 }, (_, i) => {
      const sprite = document.createElement('canvas'), size = 64
      sprite.width = sprite.height = size
      const sctx = sprite.getContext('2d')!
      const [r, g, b] = lerpColor(i / 5)
      const grad = sctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
      grad.addColorStop(0, `rgba(${r},${g},${b},1)`); grad.addColorStop(0.4, `rgba(${r},${g},${b},.35)`); grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
      sctx.fillStyle = grad; sctx.fillRect(0, 0, size, size)
      return sprite
    })
    const stars: Star[] = []
    const arms = 3, count = Math.round(2400 * density)
    for (let i = 0; i < count; i++) {
      const bulge = Math.random() < 0.22
      const t = bulge ? Math.pow(Math.random(), 1.8) * 0.45 : Math.pow(Math.random(), 0.9)
      const arm = i % arms
      const spread = bulge ? Math.random() * Math.PI * 2 : (Math.random() - 0.5) * (0.62 - t * 0.3) * (1 + Math.random())
      stars.push({ r: t, a: (bulge ? 0 : arm * (Math.PI * 2 / arms) + t * 5.2) + spread, size: Math.random() * (1.6 - t * 0.8) + 0.35, hue: Math.min(1, t * 1.15), tw: Math.random() * Math.PI * 2, light: 0.4 + Math.random() * 0.6, dust: false })
    }
    for (let i = 0; i < 110 * density; i++) {
      const t = 0.12 + Math.random() * 0.8, arm = i % arms
      stars.push({ r: t, a: arm * (Math.PI * 2 / arms) + t * 5.2 + (Math.random() - 0.5) * 0.5, size: 10 + Math.random() * 26 * (1 - t * 0.4), hue: Math.min(1, t * 1.2), tw: Math.random() * Math.PI * 2, light: 0.05 + Math.random() * 0.08, dust: true })
    }
    let w = 0, h = 0, raf = 0, visible = true
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr)
    }
    const draw = (time: number) => {
      const s = time / 1000 * speed
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const R = Math.min(w, h * 1.5) * 0.48
      ctx.translate(w / 2, h / 2); ctx.rotate(-0.32)
      /* core glow, drawn in a squashed space so the falloff stays soft */
      ctx.save(); ctx.scale(1, 0.58)
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.55)
      glow.addColorStop(0, 'rgba(236,255,190,.55)'); glow.addColorStop(0.18, 'rgba(182,255,24,.22)'); glow.addColorStop(0.55, 'rgba(139,92,246,.07)'); glow.addColorStop(1, 'rgba(139,92,246,0)')
      ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(0, 0, R * 0.55, 0, Math.PI * 2); ctx.fill()
      ctx.restore()
      ctx.globalCompositeOperation = 'lighter'
      for (const st of stars) {
        const a = st.a + s * (0.05 / (0.22 + st.r))
        const x = Math.cos(a) * st.r * R, y = Math.sin(a) * st.r * R * 0.58
        if (st.dust) {
          ctx.globalAlpha = st.light
          ctx.drawImage(sprites[Math.round(st.hue * 5)], x - st.size, y - st.size * 0.7, st.size * 2, st.size * 1.4)
          continue
        }
        const [r, g, b] = lerpColor(st.hue)
        ctx.globalAlpha = 1
        ctx.fillStyle = `rgba(${r},${g},${b},${st.light * (0.65 + Math.sin(s * 1.7 + st.tw) * 0.35) * (1 - st.r * 0.4)})`
        ctx.beginPath(); ctx.arc(x, y, st.size, 0, Math.PI * 2); ctx.fill()
      }
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
    }
    const loop = (time: number) => { raf = requestAnimationFrame(loop); if (visible) draw(time) }
    resize()
    if (reduced) draw(0)
    else raf = requestAnimationFrame(loop)
    const ro = new ResizeObserver(() => { resize(); if (reduced) draw(0) })
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting }, { threshold: 0 })
    io.observe(canvas)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect() }
  }, [density, speed])
  return <canvas ref={ref} className={`galaxy ${className}`} aria-hidden="true" />
}
