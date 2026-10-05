import Link from 'next/link'

export function Prefooter() {
  return (
    <section className="prefooter container">
      <h2>Gevonden worden begint hier.</h2>
      <div className="prefooter-actions">
        <Link href="/contact" className="btn btn-lg btn-invert">Neem contact op</Link>
        <a href="/rss.xml" className="btn btn-lg btn-secondary">Volg via RSS</a>
      </div>
    </section>
  )
}
