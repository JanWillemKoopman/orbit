import type { Metadata } from 'next'
import { BlogKaart } from '@/components/BlogKaart'
import { MeerLaden } from '@/components/MeerLaden'
import { getBlogMetas } from '@/lib/posts'
import { paginaMeta } from '@/lib/seo'

export const metadata: Metadata = paginaMeta({
  titel: 'Blog over GEO, AI-zichtbaarheid en content – Orbit',
  omschrijving:
    'Productnieuws, inzichten en praktijkverhalen over zichtbaar worden in ChatGPT en Google. Voor marketeers die GEO als vak serieus nemen.',
  pad: '/blog',
})

export default function BlogPage() {
  const posts = getBlogMetas()

  return (
    <>
      <div className="container">
        <div className="kb-hero blog-kop">
          <h1>Blog</h1>
          <p className="blog-subline">De toekomst van online zichtbaarheid.{' '}<br className="blog-subline-break" />Lees de laatste ontwikkelingen op het blog.</p>
        </div>
        <div className="blog-overzicht">
          <MeerLaden className="blog-raster">
            {posts.map((p, i) => <BlogKaart key={p.slug} post={p} priority={i < 2} />)}
          </MeerLaden>
        </div>
      </div>
    </>
  )
}
