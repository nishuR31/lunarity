import { useState } from 'react'
import { getMoonData } from '../utils/moon'
import { getFolkloreForPhase, LUNAR_FOLKLORE } from '../utils/astrology'
import { useInView } from '../hooks/useInView'
import { useIsMobile } from '../hooks/useMediaQuery'

const PHASE_EMOJIS = ['🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘']

function TraditionCard({ tradition, delay }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className="glass-card" style={{
      padding: '20px 22px',
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.6s ease ${delay}ms`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{
          padding: '3px 12px', borderRadius: 20, fontSize: 10,
          fontFamily: 'Courier New,monospace', letterSpacing: 2,
          background: 'rgba(120,40,200,0.25)', border: '1px solid rgba(160,80,255,0.3)',
          color: '#c8a0ff', textTransform: 'uppercase',
        }}>{tradition.culture}</div>
      </div>
      <p style={{ color: 'rgba(200,160,255,0.75)', lineHeight: 1.8, fontSize: 14 }}>
        {tradition.text}
      </p>
    </div>
  )
}

export default function Folklore() {
  const isMobile = useIsMobile()
  const todayMoon = getMoonData(new Date())
  const todayFolklore = getFolkloreForPhase(todayMoon.phase.name)
  const [selected, setSelected] = useState(todayFolklore)
  const [activePhaseIndex, setActivePhaseIndex] = useState(LUNAR_FOLKLORE.indexOf(todayFolklore))

  const selectPhase = (i) => {
    setActivePhaseIndex(i)
    setSelected(LUNAR_FOLKLORE[i])
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 80 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: isMobile ? '0 16px' : '0 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 36 : 52, animation: 'fadeUp 0.7s ease both' }}>
          <div className="label" style={{ marginBottom: 12 }}>Ancient Wisdom</div>
          <h1 className="glow-text" style={{ fontFamily: '"Playfair Display",serif', fontSize: isMobile ? '36px' : 'clamp(36px,7vw,64px)', fontWeight: 400 }}>
            Lunar Folklore
          </h1>
          <p style={{ color: 'var(--text-muted)', fontFamily: 'Courier New,monospace', fontSize: isMobile ? 10 : 12, letterSpacing: 2, marginTop: 8 }}>
            Myths, traditions & rituals from across human history
          </p>
        </div>

        {/* Phase selector */}
        <div style={{
          display: 'flex', gap: isMobile ? 6 : 10, justifyContent: 'center',
          flexWrap: 'wrap', marginBottom: 36,
        }}>
          {LUNAR_FOLKLORE.map((f, i) => (
            <button key={i} onClick={() => selectPhase(i)} style={{
              background: activePhaseIndex === i ? 'rgba(120,40,200,0.35)' : 'rgba(20,0,40,0.4)',
              border: `1px solid ${activePhaseIndex === i ? 'rgba(180,100,255,0.55)' : 'rgba(80,20,140,0.2)'}`,
              borderRadius: 14, padding: isMobile ? '8px 10px' : '10px 16px',
              cursor: 'pointer', transition: 'all 0.25s ease',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              transform: activePhaseIndex === i ? 'scale(1.08)' : 'scale(1)',
              boxShadow: activePhaseIndex === i ? '0 0 16px rgba(160,80,255,0.25)' : 'none',
            }}>
              <span style={{ fontSize: isMobile ? 18 : 22 }}>{PHASE_EMOJIS[i]}</span>
              {!isMobile && (
                <span style={{ fontSize: 9, fontFamily: 'Courier New,monospace', letterSpacing: 1, color: activePhaseIndex === i ? '#d4b4ff' : 'rgba(160,110,220,0.45)', textTransform: 'uppercase' }}>
                  {f.phase.split(' ')[0]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Main folklore card */}
        <div className="glass-card" style={{ padding: isMobile ? '24px 20px' : '36px 40px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, fontSize: 120, opacity: 0.04, pointerEvents: 'none', lineHeight: 1 }}>
            {PHASE_EMOJIS[activePhaseIndex]}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
            <span style={{ fontSize: isMobile ? 40 : 52, filter: 'drop-shadow(0 0 16px rgba(220,160,255,0.6))' }}>{PHASE_EMOJIS[activePhaseIndex]}</span>
            <div>
              <div className="label" style={{ marginBottom: 6 }}>{selected.phase}</div>
              <h2 style={{ fontFamily: '"Playfair Display",serif', fontSize: isMobile ? 22 : 28, color: '#d4b4ff', fontWeight: 400 }}>
                {selected.title}
              </h2>
            </div>
          </div>

          <blockquote style={{
            borderLeft: '2px solid rgba(160,80,255,0.4)', paddingLeft: 20,
            fontStyle: 'italic', color: 'rgba(210,170,255,0.7)',
            fontSize: isMobile ? 15 : 17, lineHeight: 1.7, marginBottom: 28,
            fontFamily: '"Playfair Display",serif',
          }}>
            {selected.quote}
          </blockquote>

          {/* Omens */}
          <div style={{ background: 'rgba(60,0,100,0.25)', borderRadius: 14, padding: '18px 20px', marginBottom: 24, border: '1px solid rgba(120,40,200,0.2)' }}>
            <div className="label" style={{ marginBottom: 8 }}>Signs & Omens</div>
            <p style={{ color: 'rgba(200,160,255,0.7)', lineHeight: 1.75, fontSize: isMobile ? 13 : 14 }}>
              {selected.omens}
            </p>
          </div>

          {/* Ritual */}
          <div style={{ background: 'rgba(40,0,80,0.3)', borderRadius: 14, padding: '18px 20px', border: '1px solid rgba(100,30,180,0.2)' }}>
            <div className="label" style={{ marginBottom: 8 }}>Ritual Practice</div>
            <p style={{ color: 'rgba(200,160,255,0.7)', lineHeight: 1.75, fontSize: isMobile ? 13 : 14 }}>
              {selected.ritual}
            </p>
          </div>
        </div>

        {/* Cultural traditions */}
        <div className="label" style={{ textAlign: 'center', marginBottom: 20 }}>Cultural Traditions</div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
          {selected.traditions.map((t, i) => (
            <TraditionCard key={i} tradition={t} delay={i * 80} />
          ))}
        </div>

        {/* Today note */}
        {selected.phase === todayMoon.phase.name && (
          <div style={{ marginTop: 24, textAlign: 'center', fontFamily: 'Courier New,monospace', fontSize: 11, letterSpacing: 2, color: 'rgba(180,200,100,0.55)' }}>
            This is tonight's active moon phase
          </div>
        )}
      </div>
    </div>
  )
}
