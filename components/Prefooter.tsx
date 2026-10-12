import { PrefooterKnoppen } from './PrefooterKnoppen'

export function Prefooter() {
  return (
    <section className="prefooter container">
      <h2>Gevonden worden begint hier.</h2>
      <div className="prefooter-actions">
        <PrefooterKnoppen />
      </div>
    </section>
  )
}
