import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { Marked, type Tokens } from 'marked'
import { renderArt } from './art'
import { categories, type CategorySlug } from './site'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

export type PostMeta = {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: CategorySlug
  categoryLabel: string
  /** Vervangt de auteursnaam in kaarten en het archief, bijv. "Klantverhaal". */
  label?: string
  /** Cover: een pad naar een afbeelding in /public, of "art:<variant>:<seed>". */
  cover: string
  /** Toon de post als kaart op de homepage (anders alleen in het archief). */
  featured: boolean
}

export type Post = PostMeta & { html: string }

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const escapeAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/** Rendert een afbeelding: "art:<variant>:<seed>" wordt gegenereerde SVG, de rest een gewone <img>. */
export function imageHtml(src: string, alt: string) {
  if (src.startsWith('art:')) {
    const [, variant, seed] = src.split(':')
    return `<div class="art" role="img" aria-label="${escapeAttr(alt)}">${renderArt(variant, Number(seed) || 1)}</div>`
  }
  return `<img src="${escapeAttr(src)}" alt="${escapeAttr(alt)}" loading="lazy" />`
}

function createMarkdown() {
  const md = new Marked({ gfm: true })
  md.use({
    renderer: {
      heading(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, token: Tokens.Heading) {
        const text = this.parser.parseInline(token.tokens)
        // h1/h2 in markdown worden op de pagina h2; artikelkoppen beginnen dus bij ##.
        const level = Math.min(Math.max(token.depth, 2), 4)
        const id = slugify(text)
        return `<h${level} id="${id}"><span class="heading-text">${text}</span><a class="heading-anchor" href="#${id}" aria-label="Link naar deze sectie"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M7.1 3.5a3.25 3.25 0 0 1 4.6 4.6l-1.4 1.4a.75.75 0 1 1-1.06-1.06l1.4-1.4a1.75 1.75 0 0 0-2.48-2.48l-1.4 1.4A.75.75 0 1 1 5.7 4.9l1.4-1.4Zm-.8 6.2a.75.75 0 0 1 0 1.06l-1.4 1.4a3.25 3.25 0 1 1-4.6-4.6l1.4-1.4a.75.75 0 1 1 1.06 1.06l-1.4 1.4a1.75 1.75 0 1 0 2.48 2.48l1.4-1.4a.75.75 0 0 1 1.06 0Zm3.73-4.79a.75.75 0 0 1 0 1.06l-3.06 3.06a.75.75 0 1 1-1.06-1.06l3.06-3.06a.75.75 0 0 1 1.06 0Z"/></svg></a></h${level}>\n`
      },
      paragraph(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, token: Tokens.Paragraph) {
        // Een alinea met alleen een afbeelding wordt een <figure>; de title wordt het bijschrift.
        if (token.tokens.length === 1 && token.tokens[0].type === 'image') {
          const img = token.tokens[0] as Tokens.Image
          const wide = img.title?.startsWith('wide|')
          const caption = wide ? img.title!.slice(5) : img.title
          return `<figure${wide ? ' data-wide="true"' : ''}>${imageHtml(img.href, img.text)}${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>\n`
        }
        return `<p>${this.parser.parseInline(token.tokens)}</p>\n`
      },
      link(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, token: Tokens.Link) {
        const text = this.parser.parseInline(token.tokens)
        const external = /^https?:\/\//.test(token.href)
        return `<a href="${escapeAttr(token.href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${text}</a>`
      },
      table(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, token: Tokens.Table) {
        const cell = (c: Tokens.TableCell, tag: string) => `<${tag}${c.align ? ` style="text-align:${c.align}"` : ''}>${this.parser.parseInline(c.tokens)}</${tag}>`
        const head = `<tr>${token.header.map((c) => cell(c, 'th')).join('')}</tr>`
        const rows = token.rows.map((r) => `<tr>${r.map((c) => cell(c, 'td')).join('')}</tr>`).join('')
        return `<div class="table-wrap"><table><thead>${head}</thead><tbody>${rows}</tbody></table></div>\n`
      },
    },
  })
  return md
}

const markdown = createMarkdown()
const categoryLabel = (slug: string) => categories.find((c) => c.slug === slug)?.label ?? slug

function readPost(file: string): Post {
  const slug = file.replace(/\.md$/, '')
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8')
  const { data, content } = matter(raw)
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date)
  return {
    slug,
    title: String(data.title),
    description: String(data.description ?? ''),
    date,
    author: String(data.author ?? ''),
    category: data.category as CategorySlug,
    categoryLabel: categoryLabel(String(data.category)),
    label: data.label ? String(data.label) : undefined,
    cover: String(data.cover ?? `art:lines:${slug.length}`),
    featured: Boolean(data.featured),
    html: markdown.parse(content) as string,
  }
}

let cache: Post[] | null = null

export function getAllPosts(): Post[] {
  if (cache && process.env.NODE_ENV === 'production') return cache
  const posts = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .map(readPost)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
  cache = posts
  return posts
}

export const toMeta = ({ html: _html, ...meta }: Post): PostMeta => meta

export const getPostMetas = () => getAllPosts().map(toMeta)

export const getPost = (slug: string) => getAllPosts().find((p) => p.slug === slug)

export const getPostsByCategory = (category: string) => getPostMetas().filter((p) => p.category === category)

/** Verdeelt posts over de homepage: drie kaartrijen van zes en daarna het archief. */
export function getHomepageSections() {
  const all = getPostMetas()
  const featured = all.filter((p) => p.featured)
  const used = new Set(featured.slice(0, 18).map((p) => p.slug))
  return {
    first: featured.slice(0, 6),
    second: featured.slice(6, 12),
    third: featured.slice(12, 18),
    archive: all.filter((p) => !used.has(p.slug)),
  }
}

export const byline = (p: PostMeta) => p.label ?? p.author
