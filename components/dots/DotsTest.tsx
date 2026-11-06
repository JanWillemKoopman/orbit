import Link from 'next/link'
import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { afsluiter } from '@/content/werkwijze'
import type { SceneNaam } from './scenes'
import '@/app/werkwijze/werkwijze.css'
import './dots.css'

const VARIANTEN: { href: string; label: string; scene: SceneNaam; uitleg: string }[] = [
  { href: '/dots2', label: 'Terrein', scene: 'terrein', uitleg: 'Een golvend landschap van stippen in perspectief; de heuvels rollen langzaam naar de kijker toe.' },
  { href: '/dots3', label: 'Baan', scene: 'baan', uitleg: 'Een planeet van stippen aan de onderrand, met een ring die eromheen draait.' },
  { href: '/dots4', label: 'Stroming', scene: 'stroming', uitleg: 'Duizenden deeltjes die een stromingsveld volgen en vanzelf stromen vormen.' },
  { href: '/dots5', label: 'Banen', scene: 'banen', uitleg: 'Stippen die in gekantelde ellipsen rond de tekst draaien, met lime satellieten. Alternatief, niet in de rotatie.' },
  { href: '/dots6', label: 'Rimpeling', scene: 'rimpeling', uitleg: 'Een stippenraster waarin golven vanuit het midden uitdijen, als een signaal. Alternatief, niet in de rotatie.' },
  { href: '/dots7', label: 'Tunnel', scene: 'tunnel', uitleg: 'Ringen van stippen die vanuit de diepte op je afkomen, met een lime spiraal. Alternatief, niet in de rotatie.' },
]

// Testpagina's voor de achtergrond van de afsluiter. Op de site wisselen terrein, baan en stroming elkaar per
// bezoeker af; hier staat er telkens één vast, zodat je ze los kunt bekijken, plus de alternatieven.
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
        <CtaAchtergrond key={variant.scene} scene={variant.scene} />
        <h2 id="pd-afsluiter">{afsluiter.title}</h2>
        <p>{afsluiter.description}</p>
        <div className="home-prefooter-actions">
          <PrefooterKnoppen />
        </div>
      </section>
    </div>
  )
}
