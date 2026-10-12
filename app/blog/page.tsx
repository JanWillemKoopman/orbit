import type { Metadata } from 'next'
import { MeerLaden } from '@/components/MeerLaden'
import { PostCard } from '@/components/PostCard'
import { Prefooter } from '@/components/Prefooter'
import { getBlogMetas } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'AI-gedreven tactieken, automatiseringsstrategieën en growth hacks.',
  alternates: { canonical: '/blog' },
}

export default function BlogPage() {
  const posts = getBlogMetas()

  return (
    <>
      <div className="container">
        <div className="kb-hero">
          <h1>Blog</h1>
          <p className="blog-subline">In de blog vind je AI-gedreven tactieken, automatiseringsstrategieën en growth hacks die zijn ontworpen om concurrenten te slim af te zijn.</p>
        </div>
        <div className="blog-overzicht">
          <MeerLaden>
            {posts.map((p, i) => <PostCard key={p.slug} post={p} priority={i < 3} />)}
          </MeerLaden>
        </div>
      </div>
      <Prefooter />
    </>
  )
}
