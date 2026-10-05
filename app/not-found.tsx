import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="not-found">
      <h1 className="page-title">Niet gevonden</h1>
      <p>Deze pagina bestaat niet (meer).</p>
      <Link href="/" className="btn btn-secondary">Terug naar het overzicht</Link>
    </div>
  )
}
