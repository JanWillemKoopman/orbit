'use client'

import { useState } from 'react'
import type { ChangelogEntry } from '@/content/changelog'
import { formatShortDate } from '@/lib/format'

const PAGE = 10

// Lijst met product updates: eerst 10, daarna laadt "Meer updates" er steeds 10 bij.
export function ProductUpdates({ entries }: { entries: ChangelogEntry[] }) {
  const [count, setCount] = useState(PAGE)
  return (
    <>
      <div className="changelog-list">
        {entries.slice(0, count).map((e) => (
          <section key={e.slug} id={e.slug} className="changelog-entry">
            <time className="changelog-date" dateTime={e.date}>{formatShortDate(e.date)}</time>
            <div>
              <h2>{e.title}</h2>
              <p>{e.description}</p>
            </div>
          </section>
        ))}
      </div>
      {count < entries.length && (
        <div className="load-more">
          <button type="button" className="btn btn-secondary" onClick={() => setCount((c) => c + PAGE)}>Meer updates</button>
        </div>
      )}
    </>
  )
}
