import Image, { getImageProps } from 'next/image'
import type { Shot as ShotData } from '@/content/product'

type Props = {
  shot: ShotData
  /** Hoe breed het beeld op het scherm staat, voor de juiste bestandsgrootte. */
  sizes: string
  /** Alleen het eerste beeld boven de vouw. */
  priority?: boolean
  /** Waar het beeld over gaat, voor de knop "Vergroot screenshot". */
  label: string
  className?: string
}

/**
 * Een productbeeld in een kader, met een knop die het op ware grootte opent (`Lightbox`).
 * Met een `mobiel` uitsnede kiest de browser op een telefoon die uitsnede, zodat de tekst in het
 * beeld leesbaar blijft. De verhouding staat per breekpunt vast in CSS, zodat er niets verspringt.
 */
export function Shot({ shot, sizes, priority = false, label, className }: Props) {
  const ratio = (s: ShotData['src']) => `${s.width} / ${s.height}`
  const style = {
    '--ar': ratio(shot.src),
    '--ar-mobiel': ratio(shot.mobiel ?? shot.src),
  } as React.CSSProperties

  let beeld: React.ReactNode
  if (shot.mobiel) {
    const gedeeld = { alt: shot.alt, sizes, priority, quality: 85 }
    const breed = getImageProps({ ...gedeeld, src: shot.src }).props
    const { srcSet: smal, ...img } = getImageProps({ ...gedeeld, src: shot.mobiel, sizes: '100vw' }).props
    beeld = (
      <picture>
        <source media="(min-width: 641px)" srcSet={breed.srcSet} sizes={sizes} />
        <source media="(max-width: 640px)" srcSet={smal} sizes="100vw" />
        <img {...img} alt={shot.alt} fetchPriority={priority ? 'high' : undefined} />
      </picture>
    )
  } else {
    beeld = <Image src={shot.src} alt={shot.alt} sizes={sizes} priority={priority} quality={85} />
  }

  return (
    <div className={`pd-frame${className ? ` ${className}` : ''}`} style={style}>
      {beeld}
      <button
        type="button"
        className="pd-zoom"
        data-zoom-src={shot.src.src}
        data-zoom-width={shot.src.width}
        data-zoom-height={shot.src.height}
        data-zoom-alt={shot.alt}
        aria-label={`Vergroot screenshot: ${label}`}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <path d="M9.5 2.5h4v4M6.5 13.5h-4v-4M13.5 2.5 9 7M2.5 13.5 7 9" />
        </svg>
        <span>Vergroot</span>
      </button>
    </div>
  )
}
