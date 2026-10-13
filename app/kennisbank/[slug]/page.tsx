import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleView } from '@/components/ArticleView'
import { Prefooter } from '@/components/Prefooter'
import { getKennisbankMetas, getPost } from '@/lib/posts'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => getKennisbankMetas().map((p) => ({ slug: p.slug }))

const kennisbankPost = async (params: Props['params']) => {
  const post = getPost((await params).slug)
  return post?.category === 'kennisbank' ? post : undefined
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await kennisbankPost(params)
  if (!post) return {}
  return { title: post.title, description: post.description, alternates: { canonical: `/kennisbank/${post.slug}` } }
}

export default async function KennisbankArtikelPage({ params }: Props) {
  const post = await kennisbankPost(params)
  if (!post) notFound()
  return (
    <>
      <ArticleView post={post} terug={{ href: '/kennisbank', label: 'de kennisbank' }} hero={false} />
      <Prefooter />
    </>
  )
}
