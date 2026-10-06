import type { Metadata } from 'next'
import Link from 'next/link'
import { Fragment } from 'react'
import { changelog } from '@/content/changelog'
import { features, hero, prefooter, statement } from '@/content/home'
import { ChangelogTimeline } from '@/components/Changelog'
import { CardGrid } from '@/components/PostCard'
import { AppFrame } from '@/components/home/AppFrame'
import { FeatureVisual } from '@/components/home/FeatureVisual'
import { getPostMetas } from '@/lib/posts'

export const metadata: Metadata = {
  title: { absolute: 'ORBIT ENGINE – Open source SEO & GEO software voor marketeers' },
  description: hero.description,
  alternates: { canonical: '/' },
}

// Opbouw en maten volgen linear.app: hero met nagebouwde app, een grote tussenzin,
// drie blokken met titel links en tekst rechts, changelog, blog en een afsluiter.
export default function HomePage() {
  const latest = changelog[0]
  const posts = getPostMetas().slice(0, 3)

  return (
    <div className="home">
      <section className="container home-hero">
        <h1 className="home-title">
          {hero.title.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && <>{' '}<br /></>}
              <span className="blur-in" style={{ '--i': i } as React.CSSProperties}>{line}</span>
            </Fragment>
          ))}
        </h1>
        <div className="home-hero-row">
          <p className="home-hero-description blur-in" style={{ '--i': 2 } as React.CSSProperties}>{hero.description}</p>
          <Link href={`/changelog#${latest.slug}`} className="home-new-link">
            <span className="home-new blur-in" style={{ '--i': 3 } as React.CSSProperties}>
              <span className="home-new-label">Nieuw</span>
              <span className="home-new-title">{latest.title} →</span>
            </span>
          </Link>
        </div>
      </section>

      <div className="hero-stage">
        <div className="hero-backdrop" />
        <div className="hero-frame-wrapper">
          <AppFrame />
        </div>
      </div>

      <div className="container">
        <h2 className="home-statement">
          <strong>{statement.strong}</strong> {statement.rest}
        </h2>

        {features.map((f) => (
          <section className="feature" key={f.title}>
            <div className="keyline" />
            <div className="feature-header">
              <h2 className="feature-title">
                {f.title.split('\n').map((line, i) => <span key={i}>{i > 0 && <br />}{line}</span>)}
              </h2>
              <div className="feature-description">
                <p>{f.description}</p>
                <Link href={f.href} className="home-link">Lees meer <span aria-hidden="true">→</span></Link>
              </div>
            </div>
            <FeatureVisual type={f.visual} />
            <div className="feature-footer">
              <span className="feature-footer-label">Functies</span>
              <ul className="feature-links">
                {f.links.map((l) => (
                  <li key={l.label}><Link href={l.href}>{l.label} <span className="feature-plus" aria-hidden="true">→</span></Link></li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        <section className="home-block" aria-labelledby="home-changelog">
          <div className="keyline" />
          <h2 id="home-changelog" className="home-block-title">Changelog</h2>
          <ChangelogTimeline entries={changelog.slice(0, 4)} />
          <Link href="/changelog" className="home-link home-block-link">Bekijk alles <span aria-hidden="true">→</span></Link>
        </section>

        <section className="home-block" aria-labelledby="home-blog">
          <div className="keyline" />
          <h2 id="home-blog" className="home-block-title">Van de blog</h2>
          <CardGrid posts={posts} />
          <Link href="/blog" className="home-link home-block-link">Alle artikelen <span aria-hidden="true">→</span></Link>
        </section>
      </div>

      <section className="home-prefooter container">
        <h2>{prefooter.title}</h2>
        <div className="home-prefooter-actions">
          <Link href="/contact" className="btn btn-lg btn-invert">Neem contact op</Link>
          <Link href="/blog" className="btn btn-lg btn-secondary">Lees de blog</Link>
        </div>
      </section>
    </div>
  )
}
