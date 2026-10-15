import type { MetadataRoute } from 'next'
import { getPostMetas } from '@/lib/posts'
import { categories, site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/ai', '/werkwijze', '/kwaliteit', '/beheer', '/installatiegids', '/documentatie', '/over', '/blog', '/kennisbank', '/product-updates', '/prijzen', '/pers', '/contact', ...categories.map((c) => `/categorie/${c.slug}`)]
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...getPostMetas().map((p) => ({ url: `${site.url}/${p.category === 'kennisbank' ? 'kennisbank' : 'blog'}/${p.slug}`, lastModified: p.date })),
  ]
}
