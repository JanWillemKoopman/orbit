'use client'

import { useEffect, useRef } from 'react'
import { maakGolf } from './cta/golf'
import { maakNevel } from './cta/nevel'
import { maakStof } from './cta/stof'
import { maakStrepen } from './cta/strepen'
import { hexToRgb, type MaakVariant } from './cta/util'

// Bewegende achtergrond van de afsluiter onderaan de pagina's. Het canvas loopt over de volle
// breedte van het venster en de volle hoogte van de sectie. Het tekent alleen zolang de sectie in
// beeld is; met reduced motion staat er één stilstaand beeld.
//
// Er zijn vier varianten (components/cta/). Standaard is 'golf'; met ?cta=stof, ?cta=strepen of
// ?cta=nevel in de URL is een andere te bekijken.

const VARIANTEN: Record<string, MaakVariant> = { golf: maakGolf, stof: maakStof, strepen: maakStrepen, nevel: maakNevel }
const STANDAARD = 'golf'

export function CtaAchtergrond() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !section || !ctx) return

    const gekozen = new URLSearchParams(window.location.search).get('cta') ?? ''
    const maak = VARIANTEN[gekozen] ?? VARIANTEN[STANDAARD]
    const styles = getComputedStyle(document.documentElement)
    const variant = maak(ctx, {
      achtergrond: hexToRgb(styles.getPropertyValue('--bg-primary'), [8, 9, 10]),
      helder: hexToRgb(styles.getPropertyValue('--text-primary'), [247, 248, 248]),
      rust: hexToRgb(styles.getPropertyValue('--border-primary'), [35, 37, 42]),
      grijs: hexToRgb(styles.getPropertyValue('--text-tertiary'), [138, 143, 152]),
      licht: hexToRgb(styles.getPropertyValue('--accent'), [188, 255, 47]),
    })

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const start = performance.now()
    let frame = 0
    let zichtbaar = false

    // Meet de sectie en rek het canvas op tot de volle vensterbreedte.
    const meet = () => {
      const rect = section.getBoundingClientRect()
      const width = document.documentElement.clientWidth
      const height = Math.round(rect.height)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.style.left = `${-rect.left}px`
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      variant.meet(width, height)
    }

    const loop = (nu: number) => {
      variant.teken(nu - start)
      frame = requestAnimationFrame(loop)
    }

    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const update = () => {
      stop()
      if (reduceMotion.matches) {
        variant.teken(2400)
      } else if (zichtbaar && !document.hidden) {
        frame = requestAnimationFrame(loop)
      }
    }

    const herteken = () => {
      meet()
      variant.teken(performance.now() - start)
    }

    meet()
    variant.teken(0)
    canvas.dataset.klaar = ''

    const io = new IntersectionObserver(([entry]) => {
      zichtbaar = entry.isIntersecting
      update()
    })
    io.observe(section)

    const ro = new ResizeObserver(herteken)
    ro.observe(section)

    window.addEventListener('resize', herteken)
    document.addEventListener('visibilitychange', update)
    reduceMotion.addEventListener('change', update)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('resize', herteken)
      document.removeEventListener('visibilitychange', update)
      reduceMotion.removeEventListener('change', update)
    }
  }, [])

  return <canvas ref={canvasRef} className="cta-achtergrond" aria-hidden="true" />
}
