import Link from 'next/link'
import { Art } from '@/components/Art'
import { formatDate } from '@/lib/format'
import { byline, type Post } from '@/lib/posts'

type Verwijzing = { href: string; label: string }

// Het artikel zelf, gedeeld door de blog (/blog/<slug>) en de kennisbank (/kennisbank/<slug>).
// De blog volgt de opbouw van een artikel op linear.app/now (`kruimel`): een grijze link naar het overzicht,
// de titel, een brede cover met ronde hoeken, auteur en datum, en daaronder de smallere tekstkolom.
// De kennisbank heeft een terugknop en geen cover, auteur of datum (`terug`, hero={false}).
export function ArticleView({ post, terug, kruimel, hero = true }: { post: Post; terug?: Verwijzing; kruimel?: Verwijzing; hero?: boolean }) {
  return (
    <article className={kruimel ? 'article article-blog' : 'article'}>
      {kruimel && (
        <nav className="breadcrumbs" aria-label="Kruimelpad">
          <ol>
            <li><Link href={kruimel.href} className="breadcrumbs-link">{kruimel.label}</Link></li>
          </ol>
        </nav>
      )}
      {terug && (
        <Link href={terug.href} className="article-back" aria-label={`Terug naar ${terug.label}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>
      )}
      <h1 className="article-title">{post.title}</h1>
      {hero && (
        <div className="article-hero" data-opbouw>
          <Art src={post.cover} alt="" priority />
        </div>
      )}
      {kruimel && (
        <p className="article-meta">
          <span>{byline(post)}</span>
          <span className="meta-dot" aria-hidden="true">·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
      )}
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  )
}
