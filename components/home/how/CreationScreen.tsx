'use client'
import { useRef, useState } from 'react'
import { markets } from '../data'
import { Chart, Doc, ImageIcon, Sparkle } from '../icons'
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from '../gsap'
import type { ScreenProps } from './shared'

const checks = ['✓ Merkstem', '✓ Feiten gecheckt', '✓ SEO-structuur', '✓ AI-leesbaar']

export default function CreationScreen({ active, market, onApprove }: ScreenProps & { onApprove: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tag, setTag] = useState('ingepland')

  useIsoLayoutEffect(() => {
    if (!active || prefersReducedMotion() || !ref.current) return
    setTag('concurrenten scannen…')
    const ctx = gsap.context(() => {
      gsap.set('.cw-lines i', { width: 0 }); gsap.set('.cw-media', { opacity: 0, y: 8 }); gsap.set('.cw-sub i', { scaleX: 0, transformOrigin: 'left', opacity: 0 })
      gsap.set('.cw-bullets li', { opacity: 0, x: -6 }); gsap.set('.cw-thumbs span', { opacity: 0, scale: 0.85 }); gsap.set('.cw-checks span', { opacity: 0, y: 6 }); gsap.set('.cw-ok, .cw-sch', { opacity: 0 })
      gsap.timeline({ delay: 0.25 })
        .to('.cw-lines i', { width: '100%', stagger: 0.1, duration: 0.4, ease: 'power1.inOut' })
        .add(() => setTag('schrijven…'), '-=.5')
        .to('.cw-media', { opacity: 1, y: 0, duration: 0.32 }, '-=.05')
        .to('.cw-sub i', { scaleX: 1, opacity: 1, duration: 0.3 }, '-=.1')
        .to('.cw-bullets li', { opacity: 1, x: 0, stagger: 0.08, duration: 0.28 }, '-=.05')
        .to('.cw-thumbs span', { opacity: 1, scale: 1, stagger: 0.08, duration: 0.3, ease: 'back.out(1.7)' }, '-=.05')
        .add(() => setTag('controleren…'))
        .to('.cw-checks span', { opacity: 1, y: 0, stagger: 0.12, duration: 0.3 }, '-=.02')
        .to('.cw-ok, .cw-sch', { opacity: 1, stagger: 0.1, duration: 0.3 })
        .add(() => setTag('klaar voor review'))
    }, ref)
    return () => { ctx.revert(); setTag('ingepland') }
  }, [active])

  return <div className={`scr scr2${active ? ' is-on' : ''}`} ref={ref}>
    <div className="c-write">
      <div className="cw-top"><span className="cw-badge"><Sparkle /></span><b>ORBIT schrijft</b><span className="cw-tag">{tag}</span></div>
      <div className="cw-title" key={market}>{markets[market].article}</div>
      <div className="cw-lines"><i /><i /><i /><i /></div>
      <div className="cw-media"><ImageIcon /></div>
      <div className="cw-sub"><i /></div>
      <ul className="cw-bullets"><li><i /></li><li><i /></li><li><i /></li></ul>
      <div className="cw-thumbs"><span><ImageIcon /></span><span><Chart /></span><span><Doc /></span></div>
      <div className="cw-checks">{checks.map(check => <span key={check}>{check}</span>)}</div>
      <div className="cw-appr"><button type="button" className="cw-ok" onClick={onApprove}>Goedkeuren</button><span className="cw-sch">of automatisch live · di 09:00</span></div>
    </div>
  </div>
}
