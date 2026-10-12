import type { MetadataRoute } from 'next'
import { getPostMetas } from '@/lib/posts'
import { categories, site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/product', '/kennis', '/agency', '/installatiegids', '/documentatie', '/over', '/blog', '/changelog', '/kennisbank', '/product-updates', '/prijzen', '/pers', '/contact', ...categories.map((c) => `/categorie/${c.slug}`)]
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...getPostMetas().map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.date })),
  ]
}
