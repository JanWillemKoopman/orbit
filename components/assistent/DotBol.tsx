'use client'

import { useEffect, useRef } from 'react'
import { BOLLEN, type BolNaam } from './bollen'

// De bol van stippen van de assistent rechtsonder. Hoe hij eruitziet en beweegt staat per variant in
// ./bollen.ts. Tekent alleen als de pagina zichtbaar is, op hooguit 30 beelden per seconde; met reduced
// motion staat er één stilstaand beeld.
export function DotBol({ maat, variant = 'stippen' }: { maat: number; variant?: BolNaam }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const dpr = Math.min(window.devicePixelRatio || 1, 3)
    canvas.width = Math.round(maat * dpr)
    canvas.height = Math.round(maat * dpr)
    const bol = BOLLEN[variant]

    const teken = (t: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, maat, maat)
      bol.teken(ctx, maat, t)
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let raf = 0
    let vorige = 0
    let t = 2
    const lus = (nu: number) => {
      raf = requestAnimationFrame(lus)
      if (nu - vorige < 33) return
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
  }, [maat, variant])

  return <canvas ref={ref} className="dotbol" style={{ width: maat, height: maat }} aria-hidden="true" />
}
