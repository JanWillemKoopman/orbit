// Eigen Orbit-beeldmerk: een planeet met een schuine baan en een satelliet.
export function LogoMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="6.25" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="11" ry="4.25" transform="rotate(-28 12 12)" stroke="currentColor" strokeWidth="1.5" strokeOpacity=".55" />
      <circle cx="21.1" cy="6.9" r="1.6" fill="currentColor" />
    </svg>
  )
}

// Woordmerk in de opmaak van het Linear-logo (Inter, 590, krappe spatiëring).
export function Logo() {
  return <span className="logo">tryOrbit</span>
}
