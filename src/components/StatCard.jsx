import { useInView } from '../hooks/useInView'

export default function StatCard({ label, value, unit, sub, delay = 0 }) {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      className="glass-card"
      style={{
        padding: '24px 20px',
        textAlign: 'center',
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.96)',
        opacity: inView ? 1 : 0,
        transition: `transform 0.7s cubic-bezier(0.34,1.2,0.64,1) ${delay}ms, opacity 0.6s ease ${delay}ms`,
      }}
    >
      <div className="label" style={{ marginBottom: 10 }}>{label}</div>
      <div style={{
        fontSize: 34,
        fontFamily: '"Playfair Display", Georgia, serif',
        fontWeight: 700,
        color: '#e8d5ff',
        lineHeight: 1,
        letterSpacing: -0.5,
      }}>
        {value}
      </div>
      {unit && (
        <div style={{ fontSize: 11, color: 'rgba(180,130,255,0.45)', marginTop: 5, fontFamily: 'Courier New, monospace', letterSpacing: 1 }}>
          {unit}
        </div>
      )}
      {sub && (
        <div style={{ fontSize: 12, color: 'rgba(200,150,255,0.5)', marginTop: 6 }}>{sub}</div>
      )}
    </div>
  )
}
