import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { ArticleView } from '@/components/ArticleView'
import { Prefooter } from '@/components/Prefooter'
import { getAllPosts, getPost } from '@/lib/posts'
import { coverAlsDeelbeeld, paginaMeta } from '@/lib/seo'
import { site } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => getAllPosts().map((p) => ({ slug: p.slug }))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug)
  if (!post || post.category === 'kennisbank') return {}
  return paginaMeta({
    titel: post.metaTitle ?? `${post.title} – ${site.name}`,
    omschrijving: post.description,
    pad: `/blog/${post.slug}`,
    beeld: coverAlsDeelbeeld(post.cover),
    artikel: { gepubliceerd: post.date, auteur: post.author },
  })
}

export default async function ArticlePage({ params }: Props) {
  const post = getPost((await params).slug)
  if (!post) notFound()
  // Kennisbankartikelen horen onder /kennisbank; oude blog-links sturen we daarheen door.
  if (post.category === 'kennisbank') permanentRedirect(`/kennisbank/${post.slug}`)

  return (
    <>
      <ArticleView post={post} kruimel={{ href: '/blog', label: 'Blog' }} />
      <Prefooter />
    </>
  )
}
