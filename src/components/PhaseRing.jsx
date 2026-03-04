import { PHASES } from '../utils/moon'

export default function PhaseRing({ phaseIndex, size = 220 }) {
  const r = size * 0.38
  const center = size / 2

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {/* Decorative ring */}
      <svg
        width={size} height={size}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        <circle
          cx={center} cy={center} r={r}
          fill="none"
          stroke="rgba(120,40,200,0.18)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <circle
          cx={center} cy={center} r={r - 12}
          fill="none"
          stroke="rgba(100,30,180,0.10)"
          strokeWidth="1"
        />
      </svg>

      {/* Phase emojis */}
      {PHASES.map((phase, i) => {
        const angle = (i / 8) * Math.PI * 2 - Math.PI / 2
        const x = center + r * Math.cos(angle) - 14
        const y = center + r * Math.sin(angle) - 14
        const isActive = i === phaseIndex

        return (
          <div
            key={i}
            title={phase.name}
            style={{
              position: 'absolute',
              left: x, top: y,
              width: 28, height: 28,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: isActive ? 20 : 13,
              opacity: isActive ? 1 : 0.28,
              transform: isActive ? 'scale(1.5)' : 'scale(1)',
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              filter: isActive ? 'drop-shadow(0 0 10px rgba(220, 160, 255, 0.9))' : 'none',
              zIndex: isActive ? 2 : 1,
              cursor: 'default',
            }}
          >
            {phase.emoji}
          </div>
        )
      })}

      {/* Center label */}
      <div style={{
        position: 'absolute',
        inset: '30%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 10, letterSpacing: 2, color: 'rgba(160,100,255,0.45)', fontFamily: 'Courier New, monospace', textTransform: 'uppercase' }}>
          Phase
        </div>
        <div style={{ fontSize: 13, color: '#c8a0ff', marginTop: 2, fontFamily: '"Playfair Display", serif' }}>
          {PHASES[phaseIndex].shortName}
        </div>
      </div>
    </div>
  )
}
