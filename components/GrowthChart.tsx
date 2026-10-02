'use client'
import { useEffect, useRef } from 'react'

const line = 'M0 174 C30 148 58 141 92 151 S154 163 202 139 S278 145 324 134 C350 113 377 101 412 94 S467 79 495 84 C507 88 504 113 522 121 S574 132 603 126 C621 122 620 93 642 72 S687 48 716 52 S764 72 798 59 C819 50 831 29 855 29 S890 46 921 46 L978 46 C997 45 1004 25 1027 22 C1050 20 1057 7 1081 12 S1108 41 1133 29 S1151 9 1182 8 C1204 8 1221 -3 1244 0 S1270 -12 1292 -8 S1316 -20 1340 -13 S1361 -27 1380 -22'

export default function GrowthChart({ active }: { active: boolean }) {
  const svgRef=useRef<SVGSVGElement>(null), pathRef=useRef<SVGPathElement>(null), dotRef=useRef<SVGCircleElement>(null), haloRef=useRef<SVGCircleElement>(null), maskRef=useRef<SVGRectElement>(null)
  useEffect(()=>{if(!active||!pathRef.current||!svgRef.current)return
    const path=pathRef.current, svg=svgRef.current, dot=dotRef.current, halo=haloRef.current, mask=maskRef.current
    const length=path.getTotalLength(), reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame=0, start=0
    const render=(time:number)=>{if(!start)start=time;const progress=reduced?1:Math.min((time-start)/17333,1);const visible=.76+progress*.24;const point=path.getPointAtLength(length*visible);const windowX=Math.max(0,point.x-690)
      svg.setAttribute('viewBox',`${windowX} 0 760 180`);for(const marker of [dot,halo]){marker?.setAttribute('cx',String(point.x));marker?.setAttribute('cy',String(point.y))}mask?.setAttribute('width',String(point.x+8));path.style.strokeDasharray=String(length);path.style.strokeDashoffset=String(length*(1-visible));if(progress<1&&!reduced)frame=requestAnimationFrame(render)}
    frame=requestAnimationFrame(render);return()=>cancelAnimationFrame(frame)
  },[active])
  return <svg ref={svgRef} viewBox="0 0 760 180" preserveAspectRatio="none" role="img" aria-label="Continu stijgende organische en AI-zichtbaarheid"><defs><linearGradient id="growth-fill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#bcff2f" stopOpacity=".2"/><stop offset="1" stopColor="#bcff2f" stopOpacity="0"/></linearGradient><clipPath id="growth-reveal"><rect ref={maskRef} x="0" y="-35" width="1040" height="235"/></clipPath></defs><g clipPath="url(#growth-reveal)"><path className="chart-area" d={`${line} L1380 180 H0Z`}/><path ref={pathRef} className="chart-line" d={line}/></g><circle ref={haloRef} className="chart-dot-halo" cx="1018" cy="12" r="11"/><circle ref={dotRef} className="chart-dot" cx="1018" cy="12" r="4"/></svg>
}
