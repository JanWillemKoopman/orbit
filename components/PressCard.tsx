import type { PressItem } from '@/content/press'
import { formatShortDate } from '@/lib/format'
import { Art } from './Art'

export function PressCard({ item }: { item: PressItem }) {
  return (
    <a href={item.href} className="press-card" target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
      <div className="press-image">
        <span className="press-icon" aria-hidden="true"><i style={{ background: item.accent }} /></span>
        <Art src={item.cover} />
      </div>
      <h3 className="press-title">{item.title}</h3>
      <span className="card-meta">
        {item.source}
        <span className="meta-dot">·</span>
        <time dateTime={item.date}>{formatShortDate(item.date)}</time>
        <span className="arrow" aria-hidden="true">↗</span>
      </span>
    </a>
  )
}
