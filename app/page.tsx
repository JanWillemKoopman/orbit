import type { Metadata } from 'next'
import Link from 'next/link'
import { Fragment } from 'react'
import { changelog } from '@/content/changelog'
import { faq, hero, loop, prefooter, result, statement, story } from '@/content/home'
import { AppFrame } from '@/components/home/AppFrame'
import { Showcase } from '@/components/home/Showcase'
import { ResultFrame } from '@/components/home/ResultFrame'
import { Faq } from '@/components/home/Faq'

export const metadata: Metadata = {
  title: { absolute: 'ORBIT ENGINE – Open source SEO & GEO software voor marketeers' },
  description: hero.description,
  alternates: { canonical: '/' },
}

// Opbouw en maten volgen linear.app: hero met nagebouwde app, een grote tussenzin,
// het procesblok met de stappen naast elkaar, drie nagebouwde schermen, het eindresultaat, een persoonlijke introductie, veelgestelde vragen en een afsluiter.
export default function HomePage() {
  const latest = changelog[0]

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
        <figure className="home-quote">
          <blockquote className="home-statement">
            <p>
              <strong><span className="home-quote-mark" aria-hidden="true">“</span>{statement.strong}</strong> {statement.rest}<span aria-hidden="true">”</span>
            </p>
          </blockquote>
          <figcaption className="home-quote-author">
            <img src={statement.author.photo} alt="" width={48} height={48} />
            <span>{statement.author.name}</span>
          </figcaption>
        </figure>

        <section className="feature process" aria-labelledby="home-process">
          <div className="keyline" />
          <div className="feature-header">
            <h2 id="home-process" className="feature-title">{loop.title}</h2>
            <div className="feature-description">
              <p>{loop.description}</p>
            </div>
          </div>
          <ol className="process-steps">
            {loop.steps.map((step) => (
              <li className="process-step" key={step.title}>
                <span className="process-number" aria-hidden="true">
                  {step.number ?? <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9" /><path d="M13.5 2.5v3h-3" /></svg>}
                </span>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-description">{step.description}</p>
                <Link href={step.link.href} className="process-link">{step.link.label} <span className="feature-plus" aria-hidden="true">→</span></Link>
              </li>
            ))}
          </ol>
          <Showcase />
        </section>

        <section className="feature result" aria-labelledby="home-result">
          <div className="keyline" />
          <div className="feature-header">
            <h2 id="home-result" className="feature-title">{result.title}</h2>
            <div className="feature-description">
              <p>{result.description}</p>
            </div>
          </div>
          <div className="sc-root rs-root">
            <div className="rs-stage"><ResultFrame /></div>
            <div className="sc-caption-block">
              <h3>{result.captionTitle}</h3>
              <p>{result.caption}</p>
            </div>
          </div>
        </section>

        <section className="feature story" aria-labelledby="home-story">
          <div className="keyline" />
          <div className="story-header">
            <h2 id="home-story" className="feature-title story-title">{story.title}</h2>
            <div className="story-columns">
              <div className="feature-description story-column">
                <p>{story.paragraphs[0]}</p>
              </div>
              <div className="feature-description story-column">
                <p>{story.paragraphs[1]}</p>
                <Link href={story.link.href} className="home-link story-link">{story.link.label} <span aria-hidden="true">→</span></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="home-block" aria-labelledby="home-faq">
          <div className="keyline" />
          <h2 id="home-faq" className="home-block-title">{faq.title}</h2>
          <Faq items={faq.items} />
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
