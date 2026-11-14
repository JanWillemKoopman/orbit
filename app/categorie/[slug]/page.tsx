import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogHero } from '@/components/BlogHero'
import { CardGrid } from '@/components/PostCard'
import { Prefooter } from '@/components/Prefooter'
import { getPostsByCategory } from '@/lib/posts'
import { paginaMeta } from '@/lib/seo'
import { categories } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => categories.map((c) => ({ slug: c.slug }))

// Titel en omschrijving per categorie in de zoekresultaten. Richtlijn: de titel hooguit 60 tekens, de
// omschrijving hooguit 158. Een categorie zonder eigen tekst krijgt zijn naam als titel.
const zoektekst: Record<string, { titel: string; omschrijving: string }> = {
  productlanceringen: {
    titel: 'Productlanceringen: het laatste nieuws over Orbit',
    omschrijving:
      'Nieuwe functies, lanceringen en verhalen van de oprichter. Lees als eerste wat Orbit kan betekenen voor je bureau en je klanten.',
  },
  community: {
    titel: 'Uit de community: bureaus over zichtbaarheid in AI – Orbit',
    omschrijving:
      'Ervaringen, werkwijzen en lessen van marketingbureaus die hun klanten zichtbaar maken in ChatGPT en Google.',
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tekst = zoektekst[slug]
  if (!tekst) return { title: categories.find((c) => c.slug === slug)?.label }
  return paginaMeta({ ...tekst, pad: `/categorie/${slug}` })
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
