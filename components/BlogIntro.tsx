import Link from 'next/link'
import { formatDate } from '@/lib/format'
import { byline, type BlogIntro } from '@/lib/posts'
import { Art } from './Art'

// Eén blogpost in het overzicht op /blog: titel, cover, de introductie en een knop naar het hele verhaal.
export function BlogIntroItem({ post, priority }: { post: BlogIntro; priority?: boolean }) {
  const href = `/blog/${post.slug}`
  return (
    <article className="blog-item">
      <p className="blog-item-meta">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span className="meta-dot">·</span>
        {byline(post)}
      </p>
      <h2 className="blog-item-title"><Link href={href}>{post.title}</Link></h2>
      <Link href={href} className="blog-item-image" data-opbouw tabIndex={-1} aria-hidden="true">
        <Art src={post.cover} priority={priority} />
      </Link>
      <div className="prose blog-item-intro" dangerouslySetInnerHTML={{ __html: post.intro || `<p>${post.description}</p>` }} />
      <div className="blog-item-actions">
        <Link href={href} className="btn btn-secondary" aria-label={`Lees het hele verhaal: ${post.title}`}>Lees het hele verhaal</Link>
      </div>
    </article>
  )
}
