import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { ArticleView } from '@/components/ArticleView'
import { Prefooter } from '@/components/Prefooter'
import { getAllPosts, getPost } from '@/lib/posts'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => getAllPosts().map((p) => ({ slug: p.slug }))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug)
  if (!post || post.category === 'kennisbank') return {}
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
  // Kennisbankartikelen horen onder /kennisbank; oude blog-links sturen we daarheen door.
  if (post.category === 'kennisbank') permanentRedirect(`/kennisbank/${post.slug}`)

  return (
    <>
      <ArticleView post={post} terug={{ href: '/blog', label: 'de blog' }} />
      <Prefooter />
    </>
  )
}
