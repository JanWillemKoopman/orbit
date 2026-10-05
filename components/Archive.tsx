'use client'

import Link from 'next/link'
import { useState } from 'react'
import { formatShortDate } from '@/lib/format'
import type { PostMeta } from '@/lib/posts'

const PAGE = 15

export function Archive({ posts }: { posts: PostMeta[] }) {
  const [count, setCount] = useState(PAGE)
  return (
    <>
      <div className="archive">
        {posts.slice(0, count).map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="archive-row">
            <span className="archive-title">{p.title}</span>
            <span className="archive-meta">
              {p.label ?? p.author}
              <span className="meta-dot">·</span>
              <time dateTime={p.date}>{formatShortDate(p.date)}</time>
            </span>
            <span className="archive-arrow" aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
      {count < posts.length && (
        <div className="load-more">
          <button className="btn btn-secondary" onClick={() => setCount((c) => c + PAGE)}>Meer laden</button>
        </div>
      )}
    </>
  )
}
