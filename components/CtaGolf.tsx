'use client'

import { useEffect, useRef } from 'react'

// Achtergrond van de afsluiter onderaan de pagina's: een raster van donkere stipjes dat in golven
// oplicht naar het accent. Het canvas loopt over de volle breedte van het venster en de volle
// hoogte van de sectie. Het tekent alleen zolang de sectie in beeld is; met reduced motion staat
// er één stilstaand beeld.
//
// De golven zijn bewust onvoorspelbaar: richting, snelheid, kromming en sterkte worden gestuurd
// door vloeiende ruis met een willekeurige seed per bezoek, zodat er geen herhalend patroon is.

const SPACING = 18 // afstand tussen de stipjes in px
const SPACING_SMALL = 15 // op smalle schermen
const LEVELS = 24 // aantal kleurstappen; per stap één path, zodat er weinig fill-calls zijn
const TAU = Math.PI * 2
const TEMPO = 2 // tempo van de hele animatie: golven, draaiing en aanzwellen

function hexToRgb(value: string, fallback: [number, number, number]): [number, number, number] {
  const hex = value.trim().replace('#', '')
  if (!/^[0-9a-f]{6}$/i.test(hex)) return fallback
  return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)]
}

// Vloeiende 3D-ruis (value noise) tussen -1 en 1, met een eigen seed.
function maakRuis(seed: number) {
  let a = seed >>> 0
  const rnd = () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const perm = new Uint8Array(512)
  const waarden = new Float32Array(256)
  for (let i = 0; i < 256; i++) {
    perm[i] = i
    waarden[i] = rnd() * 2 - 1
  }
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    const tmp = perm[i]
    perm[i] = perm[j]
    perm[j] = tmp
  }
  for (let i = 0; i < 256; i++) perm[i + 256] = perm[i]
  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t
  const v = (x: number, y: number, z: number) => waarden[perm[perm[perm[x] + y] + z]]

  return (x: number, y: number, z: number) => {
    const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z)
    const u = fade(x - xi), w = fade(y - yi), q = fade(z - zi)
    const X = xi & 255, Y = yi & 255, Z = zi & 255
    const X1 = (X + 1) & 255, Y1 = (Y + 1) & 255, Z1 = (Z + 1) & 255
    return lerp(
      lerp(lerp(v(X, Y, Z), v(X1, Y, Z), u), lerp(v(X, Y1, Z), v(X1, Y1, Z), u), w),
      lerp(lerp(v(X, Y, Z1), v(X1, Y, Z1), u), lerp(v(X, Y1, Z1), v(X1, Y1, Z1), u), w),
      q,
    )
  }
}

// Twee golftreinen die elkaar kruisen. Elk heeft een basisrichting, golflengte en snelheid; de ruis
// laat die rond die basis zwerven.
const GOLVEN = [
  { hoek: 0.12, lengte: 0.5, snelheid: 1.15, scherpte: 6, sterkte: 1 },
  { hoek: -0.55, lengte: 0.8, snelheid: 0.75, scherpte: 8, sterkte: 0.6 },
]

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
    const ruis = maakRuis(Math.floor(Math.random() * 2 ** 32))
    // Fase per golf. Die wordt per frame opgeteld in plaats van berekend uit de tijd, zodat de
    // snelheid kan variëren zonder dat de golf verspringt.
    const fasen = GOLVEN.map(() => Math.random() * TAU)
    let vorige = -1

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
      const t = (tijd / 1000) * TEMPO
      const dt = vorige < 0 ? 0 : Math.min(0.1 * TEMPO, Math.max(0, t - vorige))
      vorige = t
      const cx = width / 2
      const cy = height / 2
      const paden = Array.from({ length: LEVELS }, () => new Path2D())
      const rBasis = width < 640 ? 1.1 : 1.25

      // Per golf voor dit frame: richting en snelheid zwerven langzaam rond hun basiswaarde.
      const golven = GOLVEN.map((g, n) => {
        const hoek = g.hoek + 0.55 * ruis(t * 0.025, n * 13.7, 1.3)
        const snelheid = g.snelheid * (0.95 + 0.6 * ruis(t * 0.04, n * 7.1, 5.9))
        fasen[n] += snelheid * dt
        return {
          cos: Math.cos(hoek),
          sin: Math.sin(hoek),
          k: TAU / Math.max(width * g.lengte, 380),
          fase: fasen[n],
          scherpte: g.scherpte,
          sterkte: g.sterkte,
          z: t * 0.06 + n * 31.4,
        }
      })

      for (const d of dots) {
        const px = d.x - cx
        const py = d.y - cy
        let som = 0
        for (let n = 0; n < golven.length; n++) {
          const g = golven[n]
          // Ruis buigt de kammen (kromming) en bepaalt waar een golf sterk is en waar hij uitdooft,
          // zodat er sets ontstaan die aanzwellen en weer verdwijnen.
          const buig = 2.6 * ruis(d.x / 420, d.y / 300, g.z)
          const env = smooth(-0.35, 0.55, ruis(d.x / 650 + 40, d.y / 650, g.z * 0.8 + 9))
          const p = (px * g.cos + py * g.sin) * g.k - g.fase + buig
          som += Math.pow(0.5 + 0.5 * Math.sin(p), g.scherpte) * g.sterkte * (0.35 + 0.65 * env)
        }
        const i = Math.min(1, som * 1.15 * d.demp)
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
