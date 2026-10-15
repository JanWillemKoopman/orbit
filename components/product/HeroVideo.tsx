'use client'

import { useEffect, useState } from 'react'

/**
 * De achtergrondvideo van een productpagina. Er zijn twee opnames per pagina, een liggende voor
 * desktop en een staande voor mobiel, elk met een eigen compositie. De keuze gebeurt in de browser,
 * zodat een telefoon alleen de staande video downloadt. Wie bewegende beelden uit heeft, krijgt
 * geen video maar alleen de poster (zie `.lp-hero-media` in pagina.css).
 */
export function HeroVideo({ naam }: { naam: string }) {
  const [formaat, setFormaat] = useState<'desktop' | 'mobiel' | null>(null)

  useEffect(() => {
    const smal = window.matchMedia('(max-width: 768px)')
    const stil = window.matchMedia('(prefers-reduced-motion: reduce)')
    const bepaal = () => setFormaat(stil.matches ? null : smal.matches ? 'mobiel' : 'desktop')
    bepaal()
    smal.addEventListener('change', bepaal)
    stil.addEventListener('change', bepaal)
    return () => {
      smal.removeEventListener('change', bepaal)
      stil.removeEventListener('change', bepaal)
    }
  }, [])

  if (!formaat) return null
  const basis = `/video/${naam}-${formaat}`
  return (
    <video
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
