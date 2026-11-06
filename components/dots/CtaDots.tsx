'use client'

import { useEffect, useRef } from 'react'
import { Batch, SCENES, type SceneNaam } from './scenes'

// Dot-achtergrond voor de afsluiter onderaan de pagina's: een alternatief voor de nevelvideo van
// CtaAchtergrond. Een canvas over de volle vensterbreedte en de volle hoogte van de sectie, waarop een
// van de vijf scènes uit ./scenes.ts duizenden stippen tekent. Hij tekent alleen zolang de sectie in
// beeld is, op 30 beelden per seconde. Met reduced motion staat er één stilstaand beeld.

const FPS = 30

export function CtaDots({ scene }: { scene: SceneNaam }) {
  const lagenRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const lagen = lagenRef.current
    const canvas = canvasRef.current
    const section = lagen?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!lagen || !canvas || !section || !ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sc = SCENES[scene]()
    const batch = new Batch()
    let w = 0, h = 0
    let zichtbaar = false
    let raf = 0
    let t = 12 // start niet op nul: dan is het eerste beeld al op gang
    let vorige = 0

    const teken = (dt: number) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const dpr = canvas.width / Math.max(1, w)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      sc.frame(batch, w, h, t, dt)
      batch.teken(ctx)
    }

    // Meet de sectie, rek de laag op tot de volle vensterbreedte en zet het canvas op de juiste resolutie.
    const meet = () => {
      const rect = section.getBoundingClientRect()
      const breed = document.documentElement.clientWidth
      lagen.style.left = `${-rect.left}px`
      lagen.style.width = `${breed}px`
      const nw = breed, nh = Math.round(rect.height)
      if (nw === w && nh === h) return
      w = nw
      h = nh
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      sc.init(w, h)
      teken(0)
    }

    const lus = (nu: number) => {
      raf = requestAnimationFrame(lus)
      if (nu - vorige < 1000 / FPS - 2) return
      const dt = vorige ? Math.min((nu - vorige) / 1000, 0.1) : 1 / FPS
      vorige = nu
      t += dt
      teken(dt)
    }

    const update = () => {
      const speel = zichtbaar && !document.hidden && !reduceMotion.matches
      if (speel && !raf) {
        vorige = 0
        raf = requestAnimationFrame(lus)
      } else if (!speel && raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }

    meet()
    lagen.dataset.klaar = ''

    const io = new IntersectionObserver(([entry]) => {
      zichtbaar = entry.isIntersecting
      update()
    })
    io.observe(section)
    const ro = new ResizeObserver(meet)
    ro.observe(section)
    window.addEventListener('resize', meet)
    document.addEventListener('visibilitychange', update)
    reduceMotion.addEventListener('change', update)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('resize', meet)
      document.removeEventListener('visibilitychange', update)
      reduceMotion.removeEventListener('change', update)
    }
  }, [scene])

  return (
    <div ref={lagenRef} className="cta-achtergrond" aria-hidden="true">
      <canvas ref={canvasRef} className="cta-video" />
    </div>
  )
}
