import type { MetadataRoute } from 'next'
import { getBlogMetas } from '@/lib/posts'
import { categories, site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/werkwijze', '/agencies', '/over', '/blog', '/pers', '/contact', ...categories.map((c) => `/categorie/${c.slug}`)]
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...getBlogMetas().map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.date })),
  ]
}
