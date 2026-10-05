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

export function Logo({ name }: { name: string }) {
  return (
    <span className="logo">
      <LogoMark />
      <span className="logo-word">{name}</span>
    </span>
  )
}
