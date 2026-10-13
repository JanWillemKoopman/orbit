import Link from 'next/link'
import { Art } from '@/components/Art'
import type { Post } from '@/lib/posts'

// Het artikel zelf (zonder auteur of datum), gedeeld door de blog (/blog/<slug>) en de kennisbank (/kennisbank/<slug>).
// Kennisbankartikelen hebben geen headerafbeelding (hero={false}).
export function ArticleView({ post, terug, hero = true }: { post: Post; terug: { href: string; label: string }; hero?: boolean }) {
  return (
    <article className="article">
      <Link href={terug.href} className="article-back" aria-label={`Terug naar ${terug.label}`}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </Link>
      <h1 className="article-title">{post.title}</h1>
      {hero && (
        <div className="article-hero">
          <Art src={post.cover} alt="" priority />
        </div>
      )}
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  )
}
