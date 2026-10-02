'use client'
import { useEffect, useRef, useState } from 'react'
import GrowthChart from './GrowthChart'

type AppScreenshotSlotProps = { label: string }
const metrics = [{label:'PAGINA’S LIVE',base:801,prefix:'',suffix:'',note:'+12 deze week'}, {label:'ZOEKMACHINE + AI VERKEER',base:88,prefix:'+',suffix:'%',note:'en stijgend'}, {label:'AI-VERMELDINGEN',base:415,prefix:'',suffix:'',note:'+ groeiend'}]
const pages=[['Gids: complete tuin aanleggen met bestrating','GEPUBLICEERD'],['Warmtepomp of hybride warmtepomp vergelijken','VERBETERD'],['Wat kost een nieuwe cv-ketel inclusief montage?','GEPUBLICEERD']]

export default function AppScreenshotSlot({ label }: AppScreenshotSlotProps) {
 const [ticks,setTicks]=useState(0)
 const [visible,setVisible]=useState(false)
 const ref=useRef<HTMLElement>(null)
 useEffect(()=>{const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setVisible(true);observer.disconnect()}},{threshold:.35});if(ref.current)observer.observe(ref.current);return()=>observer.disconnect()},[])
 useEffect(()=>{if(!visible)return;const id=window.setInterval(()=>setTicks(value=>value+1),3750);return()=>window.clearInterval(id)},[visible])
 const value=(metric:(typeof metrics)[number])=>metric.base+(metric.label==='ZOEKMACHINE + AI VERKEER'?Math.min(ticks,4):ticks)
 return <figure className="app-shot" ref={ref} aria-label={label}><div className="growth-preview"><aside className="growth-sidebar" aria-label="Ingeklapte navigatie"><span className="sidebar-orbit">◒</span><p className="is-active" title="Resultaten">⌂</p><p title="Zichtbaarheid">⌁</p><p title="Pagina's">▤</p><p title="Contentplan">□</p><p title="Openstaande vragen">◌</p><p title="Bibliotheek">▤</p><p title="Merkdossier">◉</p></aside><section className="growth-main"><p className="preview-eyebrow">RESULTATEN</p><h3>Gegenereerde groei met ORBIT ENGINE</h3><p className="growth-subtitle">JOUWDOMEIN.NL <b>·</b> ALWAYS ON</p><div className="growth-metrics">{metrics.map(metric=><div className="growth-metric" key={metric.label}><small>{metric.label}</small><strong>{metric.prefix}{value(metric).toLocaleString('nl-NL')}{metric.suffix}</strong><span>↗ &nbsp;{metric.note}</span></div>)}</div><div className={`growth-chart ${visible ? 'is-visible' : ''}`}><p>ORGANISCH + AI ZICHTBAARHEID, DIT KWARTAAL</p><GrowthChart active={visible}/></div><div className="publishing-head"><span>GEPUBLICEERDE PAGINA&apos;S</span><b>Deze maand · 7 pagina&apos;s</b></div><div className="published-pages">{pages.map(([title,status])=><div className="published-page" key={title}><i>▤</i><div><strong>{title}</strong><span><em/> </span></div><b>{status==='GEPUBLICEERD'?'✓ ': '↗ '}{status}</b></div>)}</div></section></div></figure>
}
