import { renderArt } from '@/lib/art'

/** Toont een cover: gegenereerde SVG ("art:variant:seed") of een gewone afbeelding uit /public. */
export function Art({ src, alt = '', priority = false }: { src: string; alt?: string; priority?: boolean }) {
  if (src.startsWith('art:')) {
    const [, variant, seed] = src.split(':')
    return <div className="art" role={alt ? 'img' : undefined} aria-label={alt || undefined} dangerouslySetInnerHTML={{ __html: renderArt(variant, Number(seed) || 1) }} />
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} />
}
