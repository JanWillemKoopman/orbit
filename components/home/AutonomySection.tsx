import { Floater, Galaxy } from './visuals'

const team: Array<[string, string]> = [['SV', 'is-lime'], ['MB', 'is-violet'], ['LK', 'is-sand']]

export default function AutonomySection() {
  return <>
    {/* a quiet brand moment between chapters, like inspace's "breath" band */}
    <div className="breath" aria-hidden="true">
      <Floater kind="orb" speed={0.5} size={36} rotate={-9} duration={9} style={{ left: '6%', top: '30%' }} className="fl-m" />
      <Floater kind="planet" speed={0.8} size={84} rotate={6} duration={7.5} style={{ left: '16%', top: '40%' }} className="fl-m" />
      <Floater kind="orb" speed={0.2} size={110} rotate={-6} duration={10} style={{ left: '40%', top: '50%' }} className="fl-m" />
      <Floater kind="spark" speed={0.7} size={30} rotate={10} duration={8} style={{ right: '30%', top: '24%' }} className="fl-m" />
      <Floater kind="planet" speed={-0.45} size={92} rotate={8} duration={8.5} style={{ right: '12%', top: '30%' }} className="fl-m" />
      <Floater kind="diamond" speed={0.35} size={40} rotate={-12} duration={7} style={{ right: '4%', top: '16%' }} className="fl-m" />
    </div>

    <section className="hs-section mix" id="autonoom">
      <span className="wm" aria-hidden="true">Autonoom</span>
      <span className="amb" style={{ ['--amb-c' as string]: 'rgba(182,255,24,.07)', top: '40%', ['--amb-t' as string]: '60s' }} aria-hidden="true" />
      <div className="hs-wrap">
        <div className="mix-grid">
          <div className="mix-copy">
            <div className="thead reveal" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Autonoom AI-platform + menselijke expertise</span>
              <h2>ORBIT draait volledig autonoom. Onze experts <span className="grad">houden het menselijk.</span></h2>
            </div>
            <div className="mixrows">
              <div className="mixrow reveal">
                <b className="mix-n"><span className="grad"><span data-count="100">100</span>%</span></b>
                <div className="mix-t"><b>Software</b><p>ORBIT draait de hele motor. Onderzoek, strategie, content, publicatie, optimalisatie en meting. Geen uren te boeken. Geen bureau te managen. Het draait gewoon, 24/7.</p></div>
              </div>
              <div className="mixrow reveal">
                <span className="mix-ppl" aria-hidden="true">{team.map(([initials, tone]) => <i className={tone} key={initials}>{initials}</i>)}<i className="mix-more" title="En 20+ andere specialisten">+20</i></span>
                <div className="mix-t"><b>Echte mensen als hulp</b><p>Regelmatig contact met je eigen Customer Success Manager, met een team van 20+ strategen en contentspecialisten erachter. Autonoom, met echte mensen als hulp.</p></div>
              </div>
            </div>
          </div>
          <div className="mix-vis reveal" aria-hidden="true"><Galaxy className="mv-gal" /></div>
        </div>
      </div>
    </section>
  </>
}
