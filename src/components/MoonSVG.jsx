export default function MoonSVG({ phaseIndex, illumination, size = 260 }) {
  const r = 120
  const isNew = phaseIndex === 0
  const isFull = phaseIndex === 4
  const isWaxing = phaseIndex > 0 && phaseIndex < 4
  const isWaning = phaseIndex > 4

  // Compute the lit arc path
  let litPath = null
  if (isFull) {
    litPath = `M 0,-${r} A ${r},${r} 0 1,1 0,${r} A ${r},${r} 0 1,1 0,-${r}`
  } else if (!isNew) {
    // rx = horizontal radius of the ellipse terminator
    const pct = illumination
    const rx = Math.abs(Math.cos(Math.PI * pct)) * r
    if (isWaxing) {
      // Light on right
      const ellSweep = illumination < 0.5 ? 0 : 1
      litPath = `M 0,-${r} A ${r},${r} 0 0,1 0,${r} A ${rx},${r} 0 0,${ellSweep} 0,-${r}`
    } else {
      // Light on left (waning)
      const ellSweep = illumination < 0.5 ? 1 : 0
      litPath = `M 0,-${r} A ${r},${r} 0 0,0 0,${r} A ${rx},${r} 0 0,${ellSweep} 0,-${r}`
    }
  }

  return (
    <svg
      viewBox="-140 -140 280 280"
      width={size}
      height={size}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <radialGradient id="moonLit" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#f8f4ff" />
          <stop offset="35%" stopColor="#ddc8ff" />
          <stop offset="75%" stopColor="#9050d0" />
          <stop offset="100%" stopColor="#4a1090" />
        </radialGradient>
        <radialGradient id="moonDark" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#140824" />
          <stop offset="100%" stopColor="#050008" />
        </radialGradient>
        <radialGradient id="outerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(160,80,255,0.18)" />
        </radialGradient>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="termGlow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="moonCircle">
          <circle cx="0" cy="0" r={r} />
        </clipPath>
      </defs>

      {/* Outer atmosphere */}
      <circle cx="0" cy="0" r={r + 28} fill="url(#outerGlow)" />
      <circle cx="0" cy="0" r={r + 6} fill="none"
        stroke="rgba(180,110,255,0.18)" strokeWidth="10" />
      <circle cx="0" cy="0" r={r + 2} fill="none"
        stroke="rgba(200,140,255,0.22)" strokeWidth="2" />

      {/* Dark face */}
      <circle cx="0" cy="0" r={r} fill="url(#moonDark)" />

      {/* Subtle craters on dark side */}
      {[[-38, -28, 13], [52, 18, 9], [-18, 62, 7], [28, -68, 11], [-58, 38, 6], [70, -40, 5]].map(
        ([cx, cy, cr], i) => (
          <circle key={i} cx={cx} cy={cy} r={cr}
            fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5"
            clipPath="url(#moonCircle)" />
        )
      )}

      {/* Lit face */}
      {litPath && (
        <path d={litPath} fill="url(#moonLit)"
          clipPath="url(#moonCircle)" filter="url(#softGlow)" />
      )}

      {/* Crater detail on lit side */}
      {litPath && [[-18, -42, 11, 0.06], [38, 32, 8, 0.05], [-48, 52, 6, 0.04], [55, -20, 4, 0.045]].map(
        ([cx, cy, cr, o], i) => (
          <circle key={i} cx={cx} cy={cy} r={cr}
            fill={`rgba(80,30,160,${o})`} clipPath="url(#moonCircle)" />
        )
      )}

      {/* Terminator shimmer */}
      {litPath && !isFull && (
        <line x1="0" y1={-r} x2="0" y2={r}
          stroke="rgba(200,160,255,0.12)" strokeWidth="3"
          filter="url(#termGlow)" clipPath="url(#moonCircle)" />
      )}
    </svg>
  )
}
