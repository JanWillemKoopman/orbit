// Bouwblokken van de productpagina's (/product en /agency). Opbouw naar linear.app: per sectie een
// kop met uitleg, daarna een groot paneel waarin een beeld over de rand loopt, of een raster van
// cellen die elk één onderdeel van dichtbij tonen, met het bijschrift in het vlak zelf.

export type Bijschrift = { titel: string; tekst: string; label?: string }

export function Kop({ id, title, description }: { id: string; title: string; description: string }) {
  return (
    <div className="feature-header pd-header">
      <h2 id={`${id}-titel`} className="feature-title">{title}</h2>
      <div className="feature-description"><p>{description}</p></div>
    </div>
  )
}

function Tekst({ b }: { b: Bijschrift }) {
  return (
    <figcaption className="pd-caption">
      <h3>{b.titel}{b.label && <span className="pd-label">{b.label}</span>}</h3>
      <p>{b.tekst}</p>
    </figcaption>
  )
}

/** Een groot vlak met lichtval van boven; het beeld loopt rechts en onder uit beeld. */
export function Paneel({ b, alt, children, variant }: { b: Bijschrift; alt: string; children: React.ReactNode; variant?: string }) {
  return (
    <figure className={`pd-panel${variant ? ` pd-panel-${variant}` : ''}`}>
      <div className="pd-panel-stage" role="img" aria-label={alt}>
        <div className="pd-panel-inner" aria-hidden="true">{children}</div>
      </div>
      <Tekst b={b} />
    </figure>
  )
}

/** Een cel uit een raster: één onderdeel van dichtbij, met het bijschrift eronder. */
export function Cel({ b, alt, children, variant }: { b: Bijschrift; alt: string; children: React.ReactNode; variant?: string }) {
  return (
    <figure className={`pd-cell${variant ? ` pd-cell-${variant}` : ''}`}>
      <div className="pd-cell-stage" role="img" aria-label={alt}>
        <div className="pd-cell-inner" aria-hidden="true">{children}</div>
      </div>
      <Tekst b={b} />
    </figure>
  )
}

/** Tekst met een lijst vinkjes naast één beeld. */
export function Splitsing({ id, title, description, punten, alt, children }: { id: string; title: string; description: string; punten: string[]; alt: string; children: React.ReactNode }) {
  return (
    <div className="pd-split">
      <div className="pd-split-text">
        <h2 id={`${id}-titel`} className="feature-title">{title}</h2>
        <p className="pd-lead">{description}</p>
        <ul className="pd-checks">
          {punten.map((p) => (
            <li key={p}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7" /></svg>
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div className="pd-cell pd-cell-solo">
        <div className="pd-cell-stage" role="img" aria-label={alt}>
          <div className="pd-cell-inner" aria-hidden="true">{children}</div>
        </div>
      </div>
    </div>
  )
}
