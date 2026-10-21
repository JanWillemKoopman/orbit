'use client'

import { useEffect, useRef, useState } from 'react'
import { maakSterren } from './cta/sterren'
import { hexToRgb } from './cta/util'

type Verbinding = { saveData?: boolean; effectiveType?: string }
type Formaat = 'desktop' | 'mobiel'

/** Zuinig met data: wie data wil besparen of een 2G-verbinding heeft, krijgt alleen de poster. */
function zuinig(): boolean {
  const v = (navigator as Navigator & { connection?: Verbinding }).connection
  return Boolean(v?.saveData) || v?.effectiveType === 'slow-2g' || v?.effectiveType === '2g'
}

// Bewegende achtergrond van de afsluiter onderaan de pagina's: de Cosmic Cliffs als naadloze loop.
// Het gas is een video die de grafische chip afspeelt (opgenomen met tools/cta-video/render.mjs); de
// sterren tekent een canvas er scherp overheen (components/cta/sterren.ts). Beide lopen over de volle
// breedte van het venster en de volle hoogte van de sectie, en bewegen alleen zolang de sectie in beeld
// is. Met reduced motion of zuinig met data staat er één stilstaand beeld: de poster met stilstaande sterren.

export function CtaAchtergrond() {
  const lagenRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const updateRef = useRef<() => void>(() => {})
  const [formaat, setFormaat] = useState<Formaat | null>(null)
  const [beweeg, setBeweeg] = useState(false)

  useEffect(() => {
    const lagen = lagenRef.current
    const canvas = canvasRef.current
    const section = lagen?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!lagen || !canvas || !section || !ctx) return

    const styles = getComputedStyle(document.documentElement)
    const sterren = maakSterren(ctx, {
      helder: hexToRgb(styles.getPropertyValue('--text-primary'), [247, 248, 248]),
      grijs: hexToRgb(styles.getPropertyValue('--text-tertiary'), [138, 143, 152]),
      licht: hexToRgb(styles.getPropertyValue('--accent'), [188, 255, 47]),
    })

    const smal = window.matchMedia('(max-width: 768px)')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const start = performance.now()
    let frame = 0
    let zichtbaar = false

    // Meet de sectie en rek de lagen op tot de volle vensterbreedte.
    const meet = () => {
      const rect = section.getBoundingClientRect()
      const width = document.documentElement.clientWidth
      const height = Math.round(rect.height)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      lagen.style.left = `${-rect.left}px`
      lagen.style.width = `${width}px`
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      sterren.meet(width, height)
    }

    const loop = () => {
      sterren.teken(performance.now() - start)
      frame = requestAnimationFrame(loop)
    }

    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const update = () => {
      stop()
      const video = videoRef.current
      const stil = reduceMotion.matches || zuinig()
      setFormaat(smal.matches ? 'mobiel' : 'desktop')
      setBeweeg(!stil)
      if (stil) {
        video?.pause()
        sterren.teken(2400)
      } else if (zichtbaar && !document.hidden) {
        void video?.play().catch(() => {})
        frame = requestAnimationFrame(loop)
      } else {
        video?.pause()
      }
    }
    updateRef.current = update

    const herteken = () => {
      meet()
      sterren.teken(performance.now() - start)
    }

    meet()
    sterren.teken(0)
    update()
    lagen.dataset.klaar = ''

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
    smal.addEventListener('change', update)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('resize', herteken)
      document.removeEventListener('visibilitychange', update)
      reduceMotion.removeEventListener('change', update)
      smal.removeEventListener('change', update)
    }
  }, [])

  // Een nieuwe video (ander formaat) of een andere stand moet weer meteen spelen of stilstaan.
  useEffect(() => updateRef.current(), [formaat, beweeg])

  const basis = formaat && `/video/cta-nevel-${formaat}`
  return (
    <div ref={lagenRef} className="cta-achtergrond" aria-hidden="true">
      {basis && (
        <video
          ref={videoRef}
          key={basis}
          className="cta-video"
          poster={`${basis}-poster.webp`}
          muted
          loop
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          preload={beweeg ? 'auto' : 'none'}
          tabIndex={-1}
          {...{ inert: true }}
        >
          <source src={`${basis}.av1.mp4`} type="video/mp4; codecs=av01.0.05M.08" />
          <source src={`${basis}.vp9.webm`} type="video/webm; codecs=vp9" />
          <source src={`${basis}.h264.mp4`} type="video/mp4" />
        </video>
      )}
      <canvas ref={canvasRef} className="cta-sterren" />
    </div>
  )
}
