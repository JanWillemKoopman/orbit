'use client'

import { useEffect, useRef, useState } from 'react'
import { Batch, ROTATIE, SCENES, type SceneNaam } from './dots/scenes'

// Bewegende achtergrond van de afsluiter onderaan de pagina's: een canvas met duizenden stippen in een blok
// op de contentbreedte, over de volle hoogte van de sectie (de vorm staat in globals.css). Er zijn vier scènes (terrein,
// baan, stroming, rimpeling, zie ./dots/scenes.ts) die elkaar per bezoeker afwisselen: wie de afsluiter met de ene scène
// in beeld heeft gehad, krijgt de volgende keer de volgende. Welke het laatst gezien is, staat in
// localStorage; zonder opslag begint de bezoeker bij een willekeurige scène.
//
// Het canvas tekent alleen zolang de sectie in beeld is, op hooguit 30 beelden per seconde. Kost een beeld
// het apparaat te veel tijd, dan zakt de beeldsnelheid stapsgewijs. Met reduced motion staat er één
// stilstaand beeld.

const SLEUTEL = 'orbit-cta-achtergrond'
const MAX_FPS = 30
const MIN_FPS = 10
const BUDGET_MS = 8 // gemiddelde tekentijd per beeld waarboven de beeldsnelheid omlaag gaat

function laatstGezien(): number | null {
  try {
    const i = ROTATIE.indexOf(window.localStorage.getItem(SLEUTEL) as SceneNaam)
    return i >= 0 ? i : null
  } catch {
    return null
  }
}

function volgendeScene(): SceneNaam {
  const i = laatstGezien()
  if (i === null) {
    // Nog nooit gezien: begin bij de eerste, of willekeurig als er geen opslag is.
    let opslag = true
    try {
      window.localStorage.getItem(SLEUTEL)
    } catch {
      opslag = false
    }
    return ROTATIE[opslag ? 0 : Math.floor(Math.random() * ROTATIE.length)]
  }
  return ROTATIE[(i + 1) % ROTATIE.length]
}

function markeerGezien(scene: SceneNaam) {
  try {
    window.localStorage.setItem(SLEUTEL, scene)
  } catch {}
}

/** Zonder `scene` wisselt de achtergrond per bezoeker; met `scene` staat hij vast (voor de testpagina's).
 *  Met `lime` is het blok limegroen en zijn de stippen donkergroen; met `lime="mobiel"` alleen op een
 *  telefoon (tot 640 px breed). De kleuren van kop en knoppen volgen in globals.css. */
export function CtaAchtergrond({ scene: vast, lime: limeProp = false }: { scene?: SceneNaam; lime?: boolean | 'mobiel' } = {}) {
  const lagenRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scene, setScene] = useState<SceneNaam | null>(vast ?? null)

  // De keuze kan pas in de browser (localStorage), dus na het eerste renderen.
  useEffect(() => setScene(vast ?? volgendeScene()), [vast])

  // De schermbreedte is pas in de browser bekend; bij draaien of verkleinen wisselt de kleur mee.
  const [lime, setLime] = useState(limeProp === true)
  useEffect(() => {
    if (limeProp !== 'mobiel') return setLime(limeProp)
    const mq = window.matchMedia('(max-width: 640px)')
    const zet = () => setLime(mq.matches)
    zet()
    mq.addEventListener('change', zet)
    return () => mq.removeEventListener('change', zet)
  }, [limeProp])

  useEffect(() => {
    const lagen = lagenRef.current
    const canvas = canvasRef.current
    const section = lagen?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!scene || !lagen || !canvas || !section || !ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sc = SCENES[scene]()
    const batch = new Batch(lime ? 'lime' : 'standaard')
    let w = 0, h = 0
    let zichtbaar = false
    let gezien = false
    let raf = 0
    let t = 12 // niet op nul beginnen: dan is het eerste beeld al op gang
    let vorige = 0
    let fps = MAX_FPS
    let kosten = 0, beelden = 0

    const teken = (dt: number) => {
      const start = performance.now()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const dpr = canvas.width / Math.max(1, w)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      sc.frame(batch, w, h, t, dt)
      batch.teken(ctx)
      return performance.now() - start
    }

    // Meet het blok en zet het canvas op de juiste resolutie.
    const meet = () => {
      const nw = lagen.clientWidth, nh = lagen.clientHeight
      if (nw === w && nh === h) return
      w = nw
      h = nh
      const dpr = Math.min(window.devicePixelRatio || 1, w < 768 ? 1.5 : 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      sc.init(w, h)
      teken(0)
    }

    const lus = (nu: number) => {
      raf = requestAnimationFrame(lus)
      if (nu - vorige < 1000 / fps - 2) return
      const dt = vorige ? Math.min((nu - vorige) / 1000, 0.1) : 1 / fps
      vorige = nu
      t += dt
      kosten += teken(dt)
      // Elke 30 beelden: te zwaar voor dit apparaat? Dan een stap omlaag in beeldsnelheid.
      if (++beelden === 30) {
        if (kosten / beelden > BUDGET_MS && fps > MIN_FPS) fps = Math.max(MIN_FPS, Math.round(fps * 0.66))
        kosten = 0
        beelden = 0
      }
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
      // Pas als de afsluiter echt in beeld is geweest, telt deze scène als gezien.
      if (zichtbaar && !gezien && !vast) {
        gezien = true
        markeerGezien(scene)
      }
      update()
    })
    io.observe(section)
    const ro = new ResizeObserver(meet)
    ro.observe(lagen)
    document.addEventListener('visibilitychange', update)
    reduceMotion.addEventListener('change', update)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', update)
      reduceMotion.removeEventListener('change', update)
    }
  }, [scene, vast, lime])

  return (
    <div ref={lagenRef} className={lime ? 'cta-achtergrond cta-achtergrond-lime' : 'cta-achtergrond'} aria-hidden="true">
      <canvas ref={canvasRef} className="cta-canvas" />
    </div>
  )
}
