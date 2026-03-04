import { useInView } from '../hooks/useInView'
import { PHASES } from '../utils/moon'

function Section({ title, children, delay = 0 }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className="glass-card"
      style={{
        padding: '36px 40px', marginBottom: 16,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `all 0.7s ease ${delay}ms`,
      }}
    >
      <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 22, color: '#d4b4ff', marginBottom: 16, fontWeight: 400 }}>
        {title}
      </h2>
      <div style={{ color: 'rgba(200,155,255,0.7)', lineHeight: 1.85, fontSize: 15 }}>
        {children}
      </div>
    </div>
  )
}

export default function About() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 100, paddingBottom: 80 }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 56, animation: 'fadeUp 0.7s ease both' }}>
          <div className="label" style={{ marginBottom: 12 }}>◈ About</div>
          <h1 className="glow-text" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(36px, 7vw, 64px)', fontWeight: 400 }}>
            The Observatory
          </h1>
        </div>

        <Section title="How It Works" delay={0}>
          <p style={{ marginBottom: 12 }}>
            Lunar Observatory calculates moon phases entirely client-side using astronomical algorithms — no API, no backend, no data fetching. All computations happen in your browser in real time.
          </p>
          <p>
            The core calculation converts any date to a Julian Day Number, then computes the Moon's synodic age — how many days have elapsed since the last New Moon. From there, we derive illumination percentage, phase name, and cycle position with high accuracy.
          </p>
        </Section>

        <Section title="The Lunar Cycle" delay={80}>
          <p style={{ marginBottom: 20 }}>
            The Moon completes one synodic cycle (New Moon to New Moon) in approximately 29.53 days. This cycle has eight recognized phases:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
            {PHASES.map((p) => (
              <div key={p.index} style={{
                background: 'rgba(40,0,80,0.3)', borderRadius: 12,
                padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12,
                border: '1px solid rgba(100,40,180,0.18)',
              }}>
                <span style={{ fontSize: 22 }}>{p.emoji}</span>
                <span style={{ fontFamily: '"Playfair Display", serif', fontSize: 14, color: '#c8a0ff' }}>{p.name}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Synodic vs Sidereal" delay={160}>
          <p style={{ marginBottom: 12 }}>
            The <em>synodic</em> month (29.53 days) is the time between identical moon phases — it's what we experience as the lunar calendar. The <em>sidereal</em> month (27.32 days) is the Moon's true orbital period around Earth, measured against distant stars.
          </p>
          <p>
            The difference arises because Earth is also orbiting the Sun, so the Moon must travel slightly farther each cycle to "catch up" and align with the Sun again.
          </p>
        </Section>

        <Section title="Illumination" delay={240}>
          <p>
            Illumination is calculated as <code style={{ background: 'rgba(80,20,140,0.3)', padding: '2px 6px', borderRadius: 4, fontFamily: 'Courier New, monospace', fontSize: 13, color: '#d4b4ff' }}>
              (1 - cos(2*pi * age / 29.53)) / 2
            </code>
            {' '}— a simple cosine formula that maps the Moon's age to a value from 0 (New Moon, 0% lit) to 1 (Full Moon, 100% lit). This approximation is accurate to within a few percent for casual observation.
          </p>
        </Section>

        <div style={{ textAlign: 'center', marginTop: 48, color: 'rgba(140,80,200,0.35)', fontFamily: 'Courier New, monospace', fontSize: 11, letterSpacing: 2 }}>
          ◈ BUILT CLIENT-SIDE · NO API · ALL ASTRONOMY ◈
        </div>
      </div>
    </div>
  )
}
