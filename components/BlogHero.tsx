import Link from 'next/link'
import { getPostMetas, byline } from '@/lib/posts'
import { site, tabs } from '@/lib/site'
import { SearchButton } from './Search'

export function BlogHero({ active, title = site.blogTitle }: { active: string; title?: string }) {
  const items = getPostMetas().map((p) => ({ slug: p.slug, title: p.title, description: p.description, byline: byline(p), date: p.date, category: p.categoryLabel }))
  return (
    <div className="blog-hero">
      <h1 className="page-title"><Link href="/blog">{title}</Link></h1>
      <div className="tab-row">
        <nav className="tabs" aria-label="Categorieën">
          {tabs.map((t) => (
            <Link key={t.href} href={t.href} className="tab" aria-current={t.href === active ? 'page' : undefined}>
              {t.label}
            </Link>
          ))}
        </nav>
        <div className="tab-tools">
          <SearchButton items={items} />
          <a href="/rss.xml" className="btn btn-ghost btn-icon rss-button" aria-label="RSS-feed">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 3.75a9.25 9.25 0 0 1 9.25 9.25M3 7.75A5.25 5.25 0 0 1 8.25 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="3.75" cy="12.25" r="1.25" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
