import Link from 'next/link'
import { formatShortDate } from '@/lib/format'
import { byline, type PostMeta } from '@/lib/posts'
import { Art } from './Art'

export function PostCard({ post, priority }: { post: PostMeta; priority?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="post-card">
      <div className="card-image">
        <Art src={post.cover} priority={priority} />
      </div>
      <h3 className="card-title">{post.title}</h3>
      <span className="card-description">{post.description}</span>
      <span className="card-meta">
        {byline(post)}
        <span className="meta-dot">·</span>
        <time dateTime={post.date}>{formatShortDate(post.date)}</time>
        <span className="arrow" aria-hidden="true">→</span>
      </span>
    </Link>
  )
}

export function CardGrid({ posts, className = '', priority = false }: { posts: PostMeta[]; className?: string; priority?: boolean }) {
  if (!posts.length) return null
  return (
    <div className={`card-grid ${className}`}>
      {posts.map((p, i) => (
        <PostCard key={p.slug} post={p} priority={priority && i < 3} />
      ))}
    </div>
  )
}
