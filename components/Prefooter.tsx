import { CtaAchtergrond } from './CtaAchtergrond'
import { PrefooterKnoppen } from './PrefooterKnoppen'

export function Prefooter() {
  return (
    <section className="prefooter container">
      <CtaAchtergrond />
      <h2>Gevonden worden begint hier.</h2>
      <div className="prefooter-actions">
        <PrefooterKnoppen />
      </div>
    </section>
  )
}
