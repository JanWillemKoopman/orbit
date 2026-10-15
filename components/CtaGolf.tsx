'use client'

import { useEffect, useRef } from 'react'

// Achtergrond van de afsluiter onderaan de pagina's: een raster van donkere stipjes dat in golven
// oplicht naar het accent. Het canvas loopt over de volle breedte van het venster en de volle
// hoogte van de sectie. Het tekent alleen zolang de sectie in beeld is; met reduced motion staat
// er één stilstaand beeld.

const SPACING = 18 // afstand tussen de stipjes in px
const SPACING_SMALL = 15 // op smalle schermen
const LEVELS = 24 // aantal kleurstappen; per stap één path, zodat er weinig fill-calls zijn
const TAU = Math.PI * 2

function hexToRgb(value: string, fallback: [number, number, number]): [number, number, number] {
  const hex = value.trim().replace('#', '')
  if (!/^[0-9a-f]{6}$/i.test(hex)) return fallback
  return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)]
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

export function CtaGolf() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !section || !ctx) return

    const styles = getComputedStyle(document.documentElement)
    const rust = hexToRgb(styles.getPropertyValue('--border-primary'), [35, 37, 42])
    const licht = hexToRgb(styles.getPropertyValue('--accent'), [188, 255, 47])
    const kleuren = Array.from({ length: LEVELS }, (_, i) => {
      const t = i / (LEVELS - 1)
      const c = rust.map((r, j) => Math.round(r + (licht[j] - r) * t))
      return `rgb(${c[0]}, ${c[1]}, ${c[2]})`
    })

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let width = 0
    let height = 0
    let dots: { x: number; y: number; demp: number }[] = []
    let frame = 0
    let zichtbaar = false
    const start = performance.now()

    // Meet de sectie, rek het canvas op tot de volle vensterbreedte en leg het raster opnieuw neer.
    const meet = () => {
      const rect = section.getBoundingClientRect()
      const viewport = document.documentElement.clientWidth
      width = viewport
      height = Math.round(rect.height)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.style.left = `${-rect.left}px`
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const gap = width < 640 ? SPACING_SMALL : SPACING
      const cols = Math.floor(width / gap)
      const rows = Math.floor(height / gap)
      const offX = (width - (cols - 1) * gap) / 2
      const offY = (height - (rows - 1) * gap) / 2
      dots = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = offX + c * gap
          const y = offY + r * gap
          // Boven en onder vloeit het veld weg in de pagina; achter de tekst is de golf gedempt.
          const rand = smooth(0, 0.18, y / height) * smooth(0, 0.18, 1 - y / height)
          const dx = (x - width / 2) / (width < 640 ? width * 0.5 : Math.min(width * 0.32, 420))
          const dy = (y - height / 2) / (height * 0.28)
          const tekst = 1 - 0.7 * Math.exp(-(dx * dx + dy * dy))
          dots.push({ x, y, demp: rand * tekst })
        }
      }
    }

    const teken = (tijd: number) => {
      const t = tijd / 1000
      const k1 = TAU / Math.max(width * 0.55, 420)
      const k2 = TAU / Math.max(width * 0.9, 640)
      const paden = Array.from({ length: LEVELS }, () => new Path2D())
      const rBasis = width < 640 ? 1.1 : 1.25

      for (const d of dots) {
        // Twee lopende golven die over elkaar heen schuiven. De zachte kromming in y maakt van de
        // rechte banden een deining; de macht maakt de kammen smal, zodat de rest donker blijft.
        const p1 = d.x * k1 - t * 1.1 + 1.4 * Math.sin(d.y * 0.012 + t * 0.45) + 0.5 * Math.sin(d.x * 0.004 - t * 0.3)
        const p2 = d.x * k2 + d.y * 0.006 - t * 0.7 + 1.1 * Math.sin(d.y * 0.009 - t * 0.35 + 1.7)
        const a = Math.pow(0.5 + 0.5 * Math.sin(p1), 6)
        const b = Math.pow(0.5 + 0.5 * Math.sin(p2), 8) * 0.55
        const i = Math.min(1, (a + b) * d.demp)
        const level = Math.round(i * (LEVELS - 1))
        const r = rBasis + i * 0.6
        const pad = paden[level]
        pad.moveTo(d.x + r, d.y)
        pad.arc(d.x, d.y, r, 0, TAU)
      }

      ctx.clearRect(0, 0, width, height)
      for (let l = 0; l < LEVELS; l++) {
        ctx.fillStyle = kleuren[l]
        ctx.fill(paden[l])
      }
    }

    const loop = (nu: number) => {
      teken(nu - start)
      frame = requestAnimationFrame(loop)
    }

    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const update = () => {
      stop()
      if (reduceMotion.matches) {
        teken(2400)
      } else if (zichtbaar && !document.hidden) {
        frame = requestAnimationFrame(loop)
      }
    }

    meet()
    teken(0)
    canvas.dataset.klaar = ''

    const io = new IntersectionObserver(([entry]) => {
      zichtbaar = entry.isIntersecting
      update()
    })
    io.observe(section)

    const ro = new ResizeObserver(() => {
      meet()
      teken(performance.now() - start)
    })
    ro.observe(section)

    const onResize = () => {
      meet()
      teken(performance.now() - start)
    }
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', update)
    reduceMotion.addEventListener('change', update)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', update)
      reduceMotion.removeEventListener('change', update)
    }
  }, [])

  return <canvas ref={canvasRef} className="cta-golf" aria-hidden="true" />
}
