'use client'

import { useEffect, useRef, useState } from 'react'

type Verbinding = { saveData?: boolean; effectiveType?: string }
type Formaat = 'desktop' | 'mobiel'

/** Zuinig met data: wie data wil besparen of een 2G-verbinding heeft, krijgt alleen de poster. */
function zuinig(): boolean {
  const v = (navigator as Navigator & { connection?: Verbinding }).connection
  return Boolean(v?.saveData) || v?.effectiveType === 'slow-2g' || v?.effectiveType === '2g'
}

// Bewegende achtergrond van de afsluiter onderaan de pagina's: de Cosmic Cliffs als naadloze loop.
// Het gas is een video die de grafische chip afspeelt (opgenomen met tools/cta-video/render.mjs). Hij
// loopt over de volle breedte van het venster en de volle hoogte van de sectie, en speelt alleen zolang
// de sectie in beeld is. Met reduced motion of zuinig met data staat er één stilstaand beeld: de poster.

export function CtaAchtergrond() {
  const lagenRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const updateRef = useRef<() => void>(() => {})
  const [formaat, setFormaat] = useState<Formaat | null>(null)
  const [beweeg, setBeweeg] = useState(false)

  useEffect(() => {
    const lagen = lagenRef.current
    const section = lagen?.parentElement
    if (!lagen || !section) return

    const smal = window.matchMedia('(max-width: 768px)')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let zichtbaar = false

    // Meet de sectie en rek de laag op tot de volle vensterbreedte.
    const meet = () => {
      const rect = section.getBoundingClientRect()
      lagen.style.left = `${-rect.left}px`
      lagen.style.width = `${document.documentElement.clientWidth}px`
    }

    const update = () => {
      const video = videoRef.current
      const stil = reduceMotion.matches || zuinig()
      setFormaat(smal.matches ? 'mobiel' : 'desktop')
      setBeweeg(!stil)
      if (!stil && zichtbaar && !document.hidden) void video?.play().catch(() => {})
      else video?.pause()
    }
    updateRef.current = update

    meet()
    update()
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
    smal.addEventListener('change', update)

    return () => {
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('resize', meet)
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
    </div>
  )
}
