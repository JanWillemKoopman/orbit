import Link from 'next/link'
import type { ChangelogEntry } from '@/content/changelog'
import { formatShortDate } from '@/lib/format'

export function ChangelogTimeline({ entries }: { entries: ChangelogEntry[] }) {
  return (
    <div className="changelog">
      {entries.map((e) => (
        <div className="changelog-item" key={e.slug}>
          <div className="changelog-indicator" aria-hidden="true" />
          <Link href={`/changelog#${e.slug}`}>
            <span className="changelog-title">{e.title}</span>
            <span className="changelog-text">{e.description}</span>
            <span className="changelog-date">{formatShortDate(e.date)}</span>
          </Link>
        </div>
      ))}
    </div>
  )
}
