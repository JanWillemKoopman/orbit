import type { Metadata } from 'next'
import Link from 'next/link'
import { changelog } from '@/content/changelog'
import { press } from '@/content/press'
import { Archive } from '@/components/Archive'
import { BlogHero } from '@/components/BlogHero'
import { ChangelogTimeline } from '@/components/Changelog'
import { CardGrid } from '@/components/PostCard'
import { Prefooter } from '@/components/Prefooter'
import { PressCard } from '@/components/PressCard'
import { getHomepageSections } from '@/lib/posts'

export const metadata: Metadata = { title: 'Nu', alternates: { canonical: '/blog' } }

export default function BlogPage() {
  const { first, second, third, archive } = getHomepageSections()

  return (
    <>
      <div className="container">
        <BlogHero active="/blog" />
        <div style={{ marginTop: 40 }}>
          <CardGrid posts={first} priority />
        </div>

        <section className="home-section section-changelog" aria-labelledby="changelog-title">
          <div className="section-header"><h2 id="changelog-title" className="section-title">Changelog</h2></div>
          <ChangelogTimeline entries={changelog.slice(0, 4)} />
          <Link href="/changelog" className="view-all">Bekijk alles <span aria-hidden="true">→</span></Link>
          <CardGrid posts={second} className="after-block" />
        </section>

        <section className="home-section section-press" aria-labelledby="press-title">
          <div className="section-header"><h2 id="press-title" className="section-title">Pers</h2></div>
          <div className="press-row">
            {press.slice(0, 4).map((item) => <PressCard key={item.title} item={item} />)}
          </div>
          <Link href="/pers" className="view-all">Bekijk alles <span aria-hidden="true">→</span></Link>
          <CardGrid posts={third} className="after-block" />
        </section>

        <section className="home-section section-archive" id="archief" aria-labelledby="archive-title">
          <div className="section-header"><h2 id="archive-title" className="section-title section-title-fixed">Archief</h2></div>
          <Archive posts={archive} />
        </section>
      </div>
      <Prefooter />
    </>
  )
}
