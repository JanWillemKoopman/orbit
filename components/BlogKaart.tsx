import Link from 'next/link'
import { formatShortDate } from '@/lib/format'
import { byline, type PostMeta } from '@/lib/posts'
import { Art } from './Art'

// Eén blogpost in het overzicht op /blog, zoals de kaarten op linear.app/now: cover, titel, korte tekst
// en onderaan naam en datum. De cover staat hier in zwart-wit (article.css); in het artikel zelf in kleur.
// Geen data-opbouw: de covers verschijnen direct, zonder animatie bij het laden.
export function BlogKaart({ post, priority }: { post: PostMeta; priority?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog-kaart">
      <div className="blog-kaart-beeld">
        <Art src={post.cover} priority={priority} />
      </div>
      <h2 className="blog-kaart-titel">{post.title}</h2>
      <p className="blog-kaart-tekst">{post.description}</p>
      <p className="blog-kaart-meta">
        {byline(post)}
        <span className="meta-dot">·</span>
        <time dateTime={post.date}>{formatShortDate(post.date)}</time>
        <span className="arrow" aria-hidden="true">→</span>
      </p>
    </Link>
  )
}
