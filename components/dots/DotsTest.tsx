import Link from 'next/link'
import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { afsluiter } from '@/content/werkwijze'
import { CtaDots } from './CtaDots'
import type { SceneNaam } from './scenes'
import '@/app/werkwijze/werkwijze.css'
import './dots.css'

export const VARIANTEN: { href: string; label: string; scene?: SceneNaam; uitleg: string }[] = [
  { href: '/dots', label: 'Nevel (nu)', uitleg: 'De huidige achtergrond: de nevelvideo.' },
  { href: '/dots1', label: '1 · Golfveld', scene: 'golfveld', uitleg: 'Een vast raster van stippen waar lichtende ruggen doorheen trekken.' },
  { href: '/dots2', label: '2 · Terrein', scene: 'terrein', uitleg: 'Een golvend landschap van stippen in perspectief, met een langzame vlucht naar voren.' },
  { href: '/dots3', label: '3 · Baan', scene: 'baan', uitleg: 'Een planeet van stippen aan de onderrand, met een ring die eromheen draait.' },
  { href: '/dots4', label: '4 · Stroming', scene: 'stroming', uitleg: 'Duizenden deeltjes die een stromingsveld volgen en vanzelf stromen vormen.' },
  { href: '/dots5', label: '5 · Raster', scene: 'raster', uitleg: 'Een halftoon-raster waarin de stipgrootte de gloed van drijvende wolken volgt.' },
]

// Testpagina voor de achtergrond van de afsluiter: dezelfde afsluiter als op /werkwijze6,
// met bovenaan een schakelaar tussen de huidige nevel en de vijf dot-varianten.
export function DotsTest({ actief }: { actief: string }) {
  const variant = VARIANTEN.find((v) => v.href === actief)!
  return (
    <div className="dots-test">
      <nav className="container dots-switch" aria-label="Varianten van de achtergrond">
        {VARIANTEN.map((v) => (
          <Link key={v.href} href={v.href} className="dots-switch-link" aria-current={v.href === actief ? 'page' : undefined}>
            {v.label}
          </Link>
        ))}
      </nav>
      <p className="container dots-uitleg">{variant.uitleg}</p>

      <section className="home-prefooter container pd-afsluiter" aria-labelledby="pd-afsluiter">
        {variant.scene ? <CtaDots key={variant.scene} scene={variant.scene} /> : <CtaAchtergrond />}
        <h2 id="pd-afsluiter">{afsluiter.title}</h2>
        <p>{afsluiter.description}</p>
        <div className="home-prefooter-actions">
          <PrefooterKnoppen />
        </div>
      </section>
    </div>
  )
}
