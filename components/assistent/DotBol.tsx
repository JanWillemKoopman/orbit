'use client'

import { useEffect, useRef } from 'react'

// Een kleine bol van stippen die heel langzaam om zijn as draait: het beeldmerk van de assistent
// rechtsonder. De stippen liggen gelijkmatig over de bol (Fibonacci-verdeling); de voorkant is helder,
// de achterkant flauw, en een paar stippen zijn lime. Tekent alleen als de pagina zichtbaar is; met
// reduced motion staat er één stilstaand beeld.

const DOTS = 150
const SNELHEID = 0.22 // radialen per seconde
const KANTELING = 0.42

const punten = (() => {
  const uit: { x: number; y: number; z: number; lime: boolean }[] = []
  const gulden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < DOTS; i++) {
    const y = 1 - (i / (DOTS - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    uit.push({ x: Math.cos(i * gulden) * r, y, z: Math.sin(i * gulden) * r, lime: i % 9 === 4 })
  }
  return uit
})()

export function DotBol({ maat }: { maat: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const dpr = Math.min(window.devicePixelRatio || 1, 3)
    canvas.width = Math.round(maat * dpr)
    canvas.height = Math.round(maat * dpr)
    const R = maat * 0.36
    const c = maat / 2
    const stip = Math.max(0.55, maat / 64)
    const ck = Math.cos(KANTELING), sk = Math.sin(KANTELING)

    const teken = (t: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, maat, maat)
      const rot = t * SNELHEID
      const cr = Math.cos(rot), sr = Math.sin(rot)
      for (const p of punten) {
        const x1 = p.x * cr + p.z * sr
        const z1 = -p.x * sr + p.z * cr
        const y2 = p.y * ck - z1 * sk
        const z2 = p.y * sk + z1 * ck
        const voor = (z2 + 1) / 2 // 0 achter, 1 voor
        const alpha = 0.12 + 0.88 * voor * voor
        ctx.fillStyle = p.lime ? `rgba(188,255,47,${alpha})` : `rgba(208,214,224,${alpha * 0.9})`
        ctx.beginPath()
        ctx.arc(c + x1 * R, c + y2 * R, stip * (0.55 + 0.6 * voor) * (p.lime ? 1.25 : 1), 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let raf = 0
    let vorige = 0
    let t = 2
    const lus = (nu: number) => {
      raf = requestAnimationFrame(lus)
      if (nu - vorige < 33) return // hooguit 30 beelden per seconde
      t += vorige ? Math.min((nu - vorige) / 1000, 0.1) : 0
      vorige = nu
      teken(t)
    }
    const update = () => {
      const speel = !document.hidden && !reduce.matches
      if (speel && !raf) {
        vorige = 0
        raf = requestAnimationFrame(lus)
      } else if (!speel && raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }
    teken(t)
    update()
    document.addEventListener('visibilitychange', update)
    reduce.addEventListener('change', update)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', update)
      reduce.removeEventListener('change', update)
    }
  }, [maat])

  return <canvas ref={ref} className="dotbol" style={{ width: maat, height: maat }} aria-hidden="true" />
}
