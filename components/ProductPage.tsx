import HomeSections from './home/HomeSections'

/* the second, aria-hidden set only shows on mobile, where the logos run as a seamless marquee */
const logos = (dupe: boolean) => {
  const extra = dupe ? ' is-dupe' : ''
  const hidden = dupe ? { 'aria-hidden': true } : {}
  return <>
    <span className={`logo-porsche${extra}`} {...hidden}>PORSCHE</span>
    <span className={`logo-volkswagen${extra}`} {...hidden}><b>VW</b><em>VOLKSWAGEN</em></span>
    <span className={`logo-audi${extra}`} {...hidden}><b>○○○○</b><em>AUDI</em></span>
    <span className={`logo-bentley${extra}`} {...hidden}><b>— B —</b><em>BENTLEY</em></span>
    <span className={`logo-cupra${extra}`} {...hidden}><b>◇</b><em>CUPRA</em></span>
  </>
}

export default function ProductPage(){return <>
  <section className="social-proof"><div><span className="section-label">HET BEWIJS</span><p>Merken die we onmogelijk te negeren maakten</p></div><div className="client-logos" aria-label="Merken die ORBIT ENGINE gebruiken"><div className="client-logos__track">{logos(false)}{logos(true)}</div></div></section>

  <HomeSections />
</>}
