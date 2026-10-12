import Link from 'next/link'
import { Art } from '@/components/Art'
import { CopyLink } from '@/components/CopyLink'
import { formatDate } from '@/lib/format'
import { byline, type Post } from '@/lib/posts'

// Het artikel zelf, gedeeld door de blog (/blog/<slug>) en de kennisbank (/kennisbank/<slug>).
export function ArticleView({ post, crumbs }: { post: Post; crumbs: { href: string; label: string }[] }) {
  return (
    <article className="article">
      <nav className="breadcrumbs" aria-label="Kruimelpad">
        <ol>
          {crumbs.map((c) => (
            <li key={c.href}><Link href={c.href} className="dimmed">{c.label}</Link></li>
          ))}
        </ol>
      </nav>
      <h1 className="article-title">{post.title}</h1>
      <div className="article-hero">
        <Art src={post.cover} alt="" priority />
      </div>
      <div className="article-meta">
        <span>{post.author}</span>
        <span className="meta-dot">·</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </div>

      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />

      <footer className="article-end">
        <div className="article-end-line" />
        <div className="article-end-row">
          <span>{byline(post) === post.author ? post.author : `${post.author} · ${byline(post)}`}</span>
          <CopyLink />
        </div>
      </footer>
    </article>
  )
}
