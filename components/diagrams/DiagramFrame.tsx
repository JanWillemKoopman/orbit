import type { ReactNode } from 'react'
export function DiagramFrame({number,caption,children}:{number:string;caption:string;children:ReactNode}){return <figure className="diagram"><div className="diagram-canvas">{children}</div><figcaption><b>Figuur {number}</b> {caption}</figcaption></figure>}
export function Node({title,detail,accent=false,muted=false}:{title:string;detail?:string;accent?:boolean;muted?:boolean}){return <div className={`flow-node ${accent?'flow-node--accent':''} ${muted?'flow-node--muted':''}`}><strong>{title}</strong>{detail&&<span>{detail}</span>}</div>}
export function Arrow(){return <span className="flow-arrow" aria-hidden="true">↓</span>}
