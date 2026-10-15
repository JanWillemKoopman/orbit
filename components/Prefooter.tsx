import { CtaGolf } from './CtaGolf'
import { PrefooterKnoppen } from './PrefooterKnoppen'

export function Prefooter() {
  return (
    <section className="prefooter container">
      <CtaGolf />
      <h2>Gevonden worden begint hier.</h2>
      <div className="prefooter-actions">
        <PrefooterKnoppen />
      </div>
    </section>
  )
}
