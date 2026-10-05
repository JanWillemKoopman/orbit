import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogHero } from '@/components/BlogHero'
import { CardGrid } from '@/components/PostCard'
import { Prefooter } from '@/components/Prefooter'
import { getPostsByCategory } from '@/lib/posts'
import { categories } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => categories.map((c) => ({ slug: c.slug }))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return { title: categories.find((c) => c.slug === slug)?.label }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)
  if (!category) notFound()
  const posts = getPostsByCategory(slug)

  return (
    <>
      <div className="container">
        <BlogHero active={`/categorie/${slug}`} />
        <div style={{ marginTop: 40 }}>
          <CardGrid posts={posts} priority />
        </div>
      </div>
      <Prefooter />
    </>
  )
}
