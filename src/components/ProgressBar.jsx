import { useInView } from '../hooks/useInView'

export default function ProgressBar({ label, value, max = 100, unit = '%', suffix = '', delay = 0 }) {
  const [ref, inView] = useInView()
  const pct = Math.min((value / max) * 100, 100)

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(-16px)',
        transition: `all 0.6s ease ${delay}ms`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <span className="label">{label}</span>
        <span style={{ fontFamily: 'Courier New, monospace', fontSize: 13, color: '#c8a0ff' }}>
          {typeof value === 'number' ? value.toFixed(1) : value}{suffix}
        </span>
      </div>
      <div style={{
        height: 6, background: 'rgba(60,0,100,0.5)', borderRadius: 3, overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: inView ? `${pct}%` : '0%',
          background: 'linear-gradient(90deg, #4010a0, #9040f0, #d090ff)',
          borderRadius: 3,
          boxShadow: '0 0 10px rgba(180,100,255,0.55)',
          transition: `width 1.2s cubic-bezier(0.34,1.1,0.64,1) ${delay + 200}ms`,
        }} />
      </div>
    </div>
  )
}
