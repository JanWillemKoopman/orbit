import Link from 'next/link'
import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { whiteLabel } from '@/content/home'

// Smal limegroen blok onder de vier voordelen, in de vorm van de afsluiter onderaan de pagina (zelfde
// stippen, zelfde radius), maar veel kleiner en rustiger. Links titel en uitleg, rechts een link naar /agencies.
export function WhiteLabel() {
  return (
    <aside className="wl" aria-labelledby="home-white-label">
      <CtaAchtergrond scene="golven" />
      <div>
        <h3 id="home-white-label" className="wl-titel">{whiteLabel.titel}</h3>
        <p className="wl-uitleg">{whiteLabel.tekst}</p>
      </div>
      <Link href={whiteLabel.link.href} className="wl-link">
        {whiteLabel.link.label} <span className="feature-plus" aria-hidden="true">→</span>
      </Link>
    </aside>
  )
}
