import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { whiteLabel } from '@/content/home'

// Smal limegroen blok onder de vier voordelen, in de vorm van de afsluiter onderaan de pagina (zelfde
// stippen, zelfde radius), maar veel kleiner. Links titel en uitleg, rechts een klein scherm dat om de
// paar seconden een andere huisstijl aanneemt: logo, naam en merkkleur wisselen. De wissel is pure CSS
// (home.css); met reduced motion staat het eerste merk stil.
export function WhiteLabel() {
  return (
    <aside className="wl" aria-labelledby="home-white-label">
      <CtaAchtergrond scene="golven" />
      <div className="wl-tekst">
        <h3 id="home-white-label" className="wl-titel">{whiteLabel.titel}</h3>
        <p className="wl-uitleg">{whiteLabel.tekst}</p>
      </div>
      <div className="wl-scherm" aria-hidden="true">
        <div className="wl-balk"><i /><i /><i /></div>
        <div className="wl-merken">
          {whiteLabel.merken.map((naam, i) => (
            <div className={`wl-merk wl-merk-${i + 1}`} key={naam}>
              <div className="wl-kop">
                <span className="wl-logo">{naam[0]}</span>
                <span className="wl-naam">{naam}</span>
              </div>
              <div className="wl-rij">
                <span>Zichtbaarheid in AI</span>
                <span className="wl-getal">47%</span>
              </div>
              <div className="wl-meter"><span /></div>
              <div className="wl-voet">
                <span className="wl-lijn" />
                <span className="wl-knop">Bekijk verslag</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
