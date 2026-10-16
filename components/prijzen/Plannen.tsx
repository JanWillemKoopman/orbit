'use client'

import Link from 'next/link'
import { useState } from 'react'
import { DemoDialog } from '@/components/DemoDialog'
import type { Plan } from '@/content/prijzen'

// De klantenkiezer en de drie plannen. Met de schuif kies je hoeveel klanten je bureau heeft; het plan
// dat daarbij past licht op, zoals de geselecteerde rij in een lijst op linear.app. Zonder JavaScript
// staan de drie plannen er gewoon, met Medium als uitgangspunt.

const MAX = 15
const START = 5

function planVoor(plannen: Plan[], aantal: number) {
  return plannen.find((p) => aantal >= p.van && (p.tot === null || aantal <= p.tot)) ?? plannen[plannen.length - 1]
}

export function Vinkje() {
  return (
    <svg className="pr-vink" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Plannen({ plannen, onboarding }: { plannen: Plan[]; onboarding: string }) {
  const [aantal, setAantal] = useState(START)
  const [demoOpen, setDemoOpen] = useState(false)
  const actief = planVoor(plannen, aantal)
  const procent = ((aantal - 1) / (MAX - 1)) * 100
  const label = aantal >= MAX ? `${MAX}+` : String(aantal)

  // Indicatie bij Small: €100 voor de eerste klant en €25 per extra klant.
  const indicatie = actief.id === 'small' ? `€${100 + (aantal - 1) * 25}` : actief.prijs
  const indicatieTekst = actief.id === 'small' && aantal > 1 ? 'per maand, met 1 extra klant' : 'per maand'

  return (
    <>
      <div className="pr-kiezer">
        <div className="pr-kiezer-kop">
          <label htmlFor="pr-klanten" className="pr-kiezer-label">Hoeveel klanten heeft je bureau?</label>
          <output htmlFor="pr-klanten" className="pr-kiezer-aantal" aria-live="polite">
            <span className="pr-kiezer-getal">{label}</span> {aantal === 1 ? 'klant' : 'klanten'}
          </output>
        </div>
        <input
          id="pr-klanten"
          className="pr-schuif"
          type="range"
          min={1}
          max={MAX}
          step={1}
          value={aantal}
          onChange={(e) => setAantal(Number(e.target.value))}
          style={{ '--vul': `${procent}%` } as React.CSSProperties}
          aria-valuetext={`${label} ${aantal === 1 ? 'klant' : 'klanten'}, plan ${actief.naam}`}
        />
        <div className="pr-schaal" aria-hidden="true">
          {plannen.map((p) => (
            <span
              key={p.id}
              data-actief={p.id === actief.id || undefined}
              style={{ '--van': (p.van - 1) / (MAX - 1) } as React.CSSProperties}
            >
              {p.naam.replace(' agency', '')}
            </span>
          ))}
        </div>
        <div className="pr-kiezer-uitkomst">
          <span className="pr-kiezer-plan">{actief.naam}</span>
          <span className="pr-kiezer-prijs">
            {indicatie && actief.voorPrijs && <span>{actief.voorPrijs} </span>}
            {indicatie ? <strong>{indicatie}</strong> : <strong>Op maat</strong>}
            {indicatie && <span> {indicatieTekst}</span>}
          </span>
        </div>
      </div>

      <ul className="pr-plannen" role="list">
        {plannen.map((p) => (
          <li key={p.id} className="pr-plan" data-actief={p.id === actief.id || undefined}>
            <div className="pr-plan-kop">
              <h3 className="pr-plan-naam">{p.naam}</h3>
              <span className="pr-plan-klanten">{p.klanten}</span>
            </div>
            <p className="pr-plan-prijs">
              {p.prijs ? (
                <>
                  {p.voorPrijs && <span className="pr-plan-voor">{p.voorPrijs}</span>}
                  <span className="pr-plan-bedrag">{p.prijs}</span>
                  <span className="pr-plan-periode">{p.perPeriode}</span>
                </>
              ) : (
                <span className="pr-plan-bedrag">Op maat</span>
              )}
            </p>
            <p className="pr-plan-beschrijving">{p.beschrijving}</p>

            <div className="pr-plan-actie">
              {p.knop.type === 'demo' ? (
                <button type="button" className={`btn ${p.id === actief.id ? 'btn-invert' : 'btn-secondary'} pr-plan-knop`} onClick={() => setDemoOpen(true)}>
                  {p.knop.label}
                </button>
              ) : (
                <Link href="/contact" className={`btn ${p.id === actief.id ? 'btn-invert' : 'btn-secondary'} pr-plan-knop`}>
                  {p.knop.label}
                </Link>
              )}
              <p className="pr-plan-onboarding">
                <Vinkje />
                {onboarding}
              </p>
            </div>

            <p className="pr-plan-lijstkop">{p.kop}</p>
            <ul className="pr-plan-punten" role="list">
              {p.punten.map((punt) => (
                <li key={punt}><Vinkje />{punt}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <DemoDialog open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  )
}
