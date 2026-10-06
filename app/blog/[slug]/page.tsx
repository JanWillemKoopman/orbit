import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Art } from '@/components/Art'
import { CopyLink } from '@/components/CopyLink'
import { formatDate } from '@/lib/format'
import { byline, getAllPosts, getPost } from '@/lib/posts'
import { site } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => getAllPosts().map((p) => ({ slug: p.slug }))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: 'article', title: post.title, description: post.description, publishedTime: post.date, authors: [post.author] },
  }
}

export default async function ArticlePage({ params }: Props) {
  const post = getPost((await params).slug)
  if (!post) notFound()

  return (
    <article className="article">
      <nav className="breadcrumbs" aria-label="Kruimelpad">
        <ol>
          <li><Link href="/blog" className="dimmed">{site.blogTitle}</Link></li>
          <li><Link href={`/categorie/${post.category}`} className="dimmed">{post.categoryLabel}</Link></li>
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
