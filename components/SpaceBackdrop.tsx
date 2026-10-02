const stars = [
  [7,5,2],[19,11,1],[82,7,1],[93,15,2],[12,24,1],[72,27,1],[87,34,1],[4,43,1],[29,39,2],[97,48,1],
  [17,54,1],[64,57,2],[79,64,1],[8,70,2],[38,67,1],[91,75,1],[23,82,1],[56,86,2],[74,91,1],[96,96,2],
]

export default function SpaceBackdrop(){return <div className="space-backdrop" aria-hidden="true">
  <div className="nebula nebula--hero"/><div className="nebula nebula--middle"/><div className="nebula nebula--final"/>
  <div className="star-field">{stars.map(([x,y,size],index)=><i key={index} style={{left:`${x}%`,top:`${y}%`,width:size,height:size,animationDelay:`-${index*.7}s`}}/>)}</div>
  <svg className="orbit-map" viewBox="0 0 1200 3600" preserveAspectRatio="none">
    <defs><linearGradient id="orbit-stroke" x1="0" x2="1"><stop stopColor="#bcff2f" stopOpacity="0"/><stop offset=".35" stopColor="#bcff2f" stopOpacity=".28"/><stop offset=".7" stopColor="#7b6cff" stopOpacity=".2"/><stop offset="1" stopColor="#7b6cff" stopOpacity="0"/></linearGradient></defs>
    <path className="orbit-line orbit-line--one" d="M-120 300 C260 40 480 620 860 370 S1320 500 1130 900 C920 1320 170 970 100 1510 S920 1900 1110 1490 C1280 1120 1300 2200 760 2210 S-110 1960 120 2670 C280 3160 950 2780 1290 3370"/>
    <path className="orbit-line orbit-line--two" d="M1180 720 C790 470 640 930 830 1120 S1270 1350 1040 1770 C790 2230 120 1840 35 2340 S410 3030 900 2850"/>
    <circle className="orbit-runner orbit-runner--one" r="4"><animateMotion dur="24s" repeatCount="indefinite" path="M-120 300 C260 40 480 620 860 370 S1320 500 1130 900 C920 1320 170 970 100 1510 S920 1900 1110 1490 C1280 1120 1300 2200 760 2210 S-110 1960 120 2670 C280 3160 950 2780 1290 3370"/></circle>
    <circle className="orbit-runner orbit-runner--two" r="3"><animateMotion dur="31s" repeatCount="indefinite" path="M1180 720 C790 470 640 930 830 1120 S1270 1350 1040 1770 C790 2230 120 1840 35 2340 S410 3030 900 2850"/></circle>
  </svg>
  <div className="knowledge-cluster cluster--one"><i/><i/><i/><i/><span/></div>
  <div className="knowledge-cluster cluster--two"><i/><i/><i/><i/><span/></div>
  <div className="planet-arc"/>
</div>}
