import type { Metadata } from 'next'
import { changelog } from '@/content/changelog'
import { BlogHero } from '@/components/BlogHero'
import { Prefooter } from '@/components/Prefooter'
import { formatShortDate } from '@/lib/format'

export const metadata: Metadata = { title: 'Changelog' }

export default function ChangelogPage() {
  return (
    <>
      <div className="container">
        <BlogHero active="/changelog" />
        <div className="changelog-list">
          {changelog.map((e) => (
            <section key={e.slug} id={e.slug} className="changelog-entry">
              <time className="changelog-date" dateTime={e.date}>{formatShortDate(e.date)}</time>
              <div>
                <h2>{e.title}</h2>
                <p>{e.description}</p>
              </div>
            </section>
          ))}
        </div>
      </div>
      <Prefooter />
    </>
  )
}
