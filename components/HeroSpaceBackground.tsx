'use client'
import { useEffect, useRef } from 'react'

type Star={x:number;y:number;r:number;alpha:number;tint:number;twinkle:boolean;phase:number;speed:number;layer:0|1|2}

function random(seed:{value:number}){seed.value=(seed.value*1664525+1013904223)>>>0;return seed.value/4294967296}

export default function HeroSpaceBackground(){
 const rootRef=useRef<HTMLDivElement>(null),backRef=useRef<HTMLCanvasElement>(null),frontRef=useRef<HTMLCanvasElement>(null)
 useEffect(()=>{const root=rootRef.current,back=backRef.current,front=frontRef.current;if(!root||!back||!front)return
  const backContext=back.getContext('2d'),frontContext=front.getContext('2d');if(!backContext||!frontContext)return
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const finePointer=window.matchMedia('(hover: hover) and (pointer: fine)').matches
  let width=0,height=0,stars:Star[]=[],frame=0,last=0,visible=true
  let targetX=0,targetY=0,currentX=0,currentY=0
  const makeStars=()=>{const seed={value:0x0b17c0de};const count=width<600?190:width<1000?380:560;stars=[]
   for(let index=0;index<count;index++){const layer=(index<count*.28?0:index<count*.86?1:2) as 0|1|2;const clustered=random(seed)<.72;let x=random(seed),y=random(seed)
    if(clustered){x=Math.min(1,Math.max(0,.62+(random(seed)+random(seed)-1)*.43));y=Math.min(1,Math.max(0,.03+(random(seed)+random(seed))*.43))}
    const sizeRoll=random(seed);const r=sizeRoll<.7?.2+random(seed)*.25:sizeRoll<.9?.45+random(seed)*.25:sizeRoll<.98?.7+random(seed)*.3:1+random(seed)*.5
    stars.push({x,y,r,alpha:.09+random(seed)*(layer===0?.16:layer===1?.27:.34),tint:random(seed),twinkle:index%37===0,phase:random(seed)*Math.PI*2,speed:8+random(seed)*17,layer})
   }}
  const resize=()=>{const rect=root.getBoundingClientRect();width=Math.max(1,rect.width);height=Math.max(1,rect.height);const dpr=Math.min(window.devicePixelRatio||1,1.5);for(const [canvas,context] of [[back,backContext],[front,frontContext]] as const){canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);canvas.style.width=`${width}px`;canvas.style.height=`${height}px`;context.setTransform(dpr,0,0,dpr,0,0)}makeStars()}
  const draw=(time:number)=>{if(!visible){frame=0;return}if(time-last<32){frame=requestAnimationFrame(draw);return}last=time
   currentX+=((reduced?0:targetX)-currentX)*.018;currentY+=((reduced?0:targetY)-currentY)*.018;root.style.setProperty('--nebula-x',`${currentX*.45}px`);root.style.setProperty('--nebula-y',`${currentY*.45}px`)
   backContext.clearRect(0,0,width,height);frontContext.clearRect(0,0,width,height);const seconds=time/1000
   for(const star of stars){const context=star.layer===0?backContext:frontContext;const factor=star.layer===0?.25:star.layer===1?.58:1;const drift=reduced?0:Math.sin(seconds/(star.layer===0?38:star.layer===1?31:27)+star.phase)*(star.layer+1)*.7;const x=star.x*width+currentX*factor+drift;const y=star.y*height+currentY*factor+drift*.35;let alpha=star.alpha
    if(star.twinkle&&!reduced)alpha*=.72+.28*Math.sin(seconds/star.speed*Math.PI*2+star.phase)
    context.beginPath();context.arc(x,y,star.r,0,Math.PI*2);context.fillStyle=star.tint>.985?`rgba(205,255,143,${alpha})`:star.tint>.78?`rgba(220,211,255,${alpha})`:`rgba(245,245,245,${alpha})`;context.fill()
   }frame=requestAnimationFrame(draw)}
  const pointer=(event:PointerEvent)=>{if(!finePointer||reduced)return;const rect=root.getBoundingClientRect();const nx=(event.clientX-rect.left)/rect.width-.5,ny=(event.clientY-rect.top)/rect.height-.5;targetX=nx*22;targetY=ny*12}
  const leave=()=>{targetX=0;targetY=0}
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible&&!frame)frame=requestAnimationFrame(draw)},{rootMargin:'100px'})
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(root);observer.observe(root);root.addEventListener('pointermove',pointer);root.addEventListener('pointerleave',leave);resize();frame=requestAnimationFrame(draw)
  return()=>{cancelAnimationFrame(frame);resizeObserver.disconnect();observer.disconnect();root.removeEventListener('pointermove',pointer);root.removeEventListener('pointerleave',leave)}
 },[])
 return <div ref={rootRef} className="hero-space" aria-hidden="true"><canvas ref={backRef} className="hero-stars hero-stars--back"/><div className="hero-nebula hero-nebula--deep"/><div className="hero-nebula hero-nebula--violet"/><div className="hero-nebula hero-nebula--texture"/><div className="hero-lime-haze"/><canvas ref={frontRef} className="hero-stars hero-stars--front"/><div className="hero-space__veil"/></div>
}
