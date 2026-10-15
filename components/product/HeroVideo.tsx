'use client'

import { useEffect, useRef, useState } from 'react'

type Verbinding = { saveData?: boolean; effectiveType?: string }

/** Zuinig met data: wie data wil besparen of een 2G-verbinding heeft, krijgt alleen de poster. */
function zuinig(): boolean {
  const v = (navigator as Navigator & { connection?: Verbinding }).connection
  return Boolean(v?.saveData) || v?.effectiveType === 'slow-2g' || v?.effectiveType === '2g'
}

/**
 * De achtergrondvideo van een productpagina. Er zijn twee opnames per pagina, een liggende voor
 * desktop en een staande voor mobiel, elk met een eigen compositie. De keuze gebeurt in de browser,
 * zodat een telefoon alleen de staande video downloadt (ongeveer 100 tot 200 KB, desktop 200 tot 450 KB).
 *
 * De poster staat als achtergrond onder de video (zie `.lp-hero-media` in pagina.css) en is hetzelfde
 * beeld als het eerste frame. Daardoor ziet de bezoeker nooit een leeg vlak: laadt de video niet, mag
 * hij niet autoplayen (bijvoorbeeld in de energiebesparing van iOS) of kan de browser hem niet
 * afspelen, dan blijft het stilstaande beeld staan. Geen video voor wie bewegende beelden uit heeft of
 * data wil besparen, en de video pauzeert zodra hij uit beeld is.
 */
export function HeroVideo({ naam }: { naam: string }) {
  const [formaat, setFormaat] = useState<'desktop' | 'mobiel' | null>(null)
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const smal = window.matchMedia('(max-width: 768px)')
    const stil = window.matchMedia('(prefers-reduced-motion: reduce)')
    const bepaal = () => setFormaat(stil.matches || zuinig() ? null : smal.matches ? 'mobiel' : 'desktop')
    bepaal()
    smal.addEventListener('change', bepaal)
    stil.addEventListener('change', bepaal)
    return () => {
      smal.removeEventListener('change', bepaal)
      stil.removeEventListener('change', bepaal)
    }
  }, [])

  // Uit beeld pauzeren: geen processorgebruik en geen batterij voor iets wat niemand ziet
  useEffect(() => {
    const el = video.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const waarnemer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) void el.play().catch(() => {})
      else el.pause()
    })
    waarnemer.observe(el)
    return () => waarnemer.disconnect()
  }, [formaat])

  if (!formaat) return null
  const basis = `/video/${naam}-${formaat}`
  return (
    <video
      ref={video}
      key={formaat}
      className="lp-hero-video"
      autoPlay
      muted
      loop
      playsInline
      disablePictureInPicture
      disableRemotePlayback
      preload="auto"
      tabIndex={-1}
      {...{ inert: true }}
    >
      <source src={`${basis}.av1.mp4`} type="video/mp4; codecs=av01.0.05M.08" />
      <source src={`${basis}.vp9.webm`} type="video/webm; codecs=vp9" />
      <source src={`${basis}.h264.mp4`} type="video/mp4" />
    </video>
  )
}
