import type { Metadata } from 'next'
import { BlogIntroItem } from '@/components/BlogIntro'
import { MeerLaden } from '@/components/MeerLaden'
import { Prefooter } from '@/components/Prefooter'
import { getBlogIntros } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'AI-gedreven tactieken, automatiseringsstrategieën en growth hacks.',
  alternates: { canonical: '/blog' },
}

export default function BlogPage() {
  const posts = getBlogIntros()

  return (
    <>
      <div className="container">
        <div className="kb-hero">
          <h1>Blog</h1>
          <p className="blog-subline">In de blog vind je AI-gedreven tactieken, automatiseringsstrategieën en growth hacks die zijn ontworpen om concurrenten te slim af te zijn.</p>
        </div>
        <div className="blog-overzicht">
          <MeerLaden className="blog-lijst">
            {posts.map((p, i) => <BlogIntroItem key={p.slug} post={p} priority={i === 0} />)}
          </MeerLaden>
        </div>
      </div>
      <Prefooter />
    </>
  )
}
