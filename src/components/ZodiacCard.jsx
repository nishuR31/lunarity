import { useInView } from '../hooks/useInView'
import { ZODIAC_SIGNS } from '../utils/zodiac'

const ELEMENT_STYLES = {
  Fire:  { bg: 'rgba(255,80,40,0.10)',  border: 'rgba(255,100,60,0.28)',  glow: 'rgba(255,80,40,0.35)' },
  Earth: { bg: 'rgba(80,180,60,0.10)',  border: 'rgba(100,200,70,0.28)',  glow: 'rgba(80,180,60,0.35)' },
  Air:   { bg: 'rgba(240,200,50,0.10)', border: 'rgba(240,210,80,0.28)',  glow: 'rgba(240,200,50,0.35)' },
  Water: { bg: 'rgba(60,160,200,0.10)', border: 'rgba(80,180,220,0.28)',  glow: 'rgba(60,160,200,0.35)' },
}

export default function ZodiacCard({ zodiacData, delay = 0 }) {
  const [ref, inView] = useInView()
  const { sign, degreeInSign, longitude } = zodiacData
  const el = ELEMENT_STYLES[sign.element]

  return (
    <div
      ref={ref}
      style={{
        background: el.bg,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${el.border}`,
        borderRadius: 24,
        padding: '32px 28px',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.96)',
        transition: `all 0.7s cubic-bezier(0.34,1.2,0.64,1) ${delay}ms`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 160, height: 160, borderRadius: '50%',
        background: `radial-gradient(circle, ${el.glow} 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
        <div style={{
          fontSize: 52,
          filter: `drop-shadow(0 0 14px ${el.glow})`,
          lineHeight: 1,
        }}>
          {sign.symbol}
        </div>
        <div>
          <div style={{ fontFamily: 'Courier New, monospace', fontSize: 10, letterSpacing: 3, color: 'rgba(180,130,255,0.5)', textTransform: 'uppercase', marginBottom: 4 }}>
            Moon in
          </div>
          <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 28, color: '#e8d5ff', fontWeight: 600, lineHeight: 1 }}>
            {sign.name}
          </div>
          <div style={{ fontFamily: 'Courier New, monospace', fontSize: 11, color: sign.elementColor, marginTop: 4, letterSpacing: 1 }}>
            {sign.element} · Ruled by {sign.ruling}
          </div>
        </div>
      </div>

      {/* Degree indicator */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20,
        background: 'rgba(0,0,0,0.2)', borderRadius: 12, padding: '10px 14px',
      }}>
        <div style={{ fontFamily: 'Courier New, monospace', fontSize: 11, color: 'rgba(180,130,255,0.5)', letterSpacing: 2, textTransform: 'uppercase' }}>
          Position
        </div>
        <div style={{ flex: 1, height: 1, background: 'rgba(140,80,220,0.2)' }} />
        <div style={{ fontFamily: 'Courier New, monospace', fontSize: 13, color: '#c8a0ff' }}>
          {degreeInSign}° {sign.name} · {longitude.toFixed(1)}° ecliptic
        </div>
      </div>

      {/* Traits */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
        {sign.traits.map((t) => (
          <span key={t} style={{
            background: 'rgba(80,20,140,0.3)',
            border: `1px solid ${el.border}`,
            borderRadius: 20, padding: '4px 12px',
            fontFamily: 'Courier New, monospace', fontSize: 11,
            color: sign.elementColor, letterSpacing: 1,
          }}>
            {t}
          </span>
        ))}
      </div>

      {/* Moon meaning */}
      <p style={{
        color: 'rgba(210,170,255,0.75)', lineHeight: 1.75, fontSize: 14,
        borderLeft: `2px solid ${el.border}`, paddingLeft: 14, margin: 0,
      }}>
        {sign.moonMeaning}
      </p>

      {/* Zodiac wheel mini */}
      <ZodiacMiniWheel activeIndex={ZODIAC_SIGNS.indexOf(sign)} elementColor={sign.elementColor} />
    </div>
  )
}

function ZodiacMiniWheel({ activeIndex, elementColor }) {
  const size = 80
  const r = 28
  const center = size / 2

  return (
    <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
      <svg width={size} height={size} style={{ opacity: 0.7 }}>
        {ZODIAC_SIGNS.map((s, i) => {
          const angle = (i / 12) * Math.PI * 2 - Math.PI / 2
          const x = center + r * Math.cos(angle)
          const y = center + r * Math.sin(angle)
          const isActive = i === activeIndex
          return (
            <g key={i}>
              <circle
                cx={x} cy={y} r={isActive ? 5 : 2.5}
                fill={isActive ? elementColor : 'rgba(140,80,220,0.3)'}
                style={{ filter: isActive ? `drop-shadow(0 0 4px ${elementColor})` : 'none' }}
              />
            </g>
          )
        })}
        <circle cx={center} cy={center} r={r - 6} fill="none" stroke="rgba(120,60,200,0.15)" strokeWidth="1" />
        <text x={center} y={center + 4} textAnchor="middle" fontSize="10" fill="rgba(180,130,255,0.5)" fontFamily="Courier New">
          {ZODIAC_SIGNS[activeIndex].symbol}
        </text>
      </svg>
    </div>
  )
}
