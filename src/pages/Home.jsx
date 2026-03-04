import { useEffect, useRef, useState } from 'react'
import { getMoonData } from '../utils/moon'
import { getMoonZodiac } from '../utils/zodiac'
import { useMouse } from '../hooks/useMouse'
import MoonSVG from '../components/MoonSVG'
import PhaseRing from '../components/PhaseRing'
import StatCard from '../components/StatCard'
import ProgressBar from '../components/ProgressBar'
import ZodiacCard from '../components/ZodiacCard'

export default function Home() {
  const [moonData] = useState(() => getMoonData(new Date()))
  const [zodiac] = useState(() => getMoonZodiac(new Date()))
  const mouse = useMouse()
  const moonRotRef = useRef(0)
  const rafRef = useRef(null)
  const [rotDeg, setRotDeg] = useState(0)

  useEffect(() => {
    const animate = () => {
      moonRotRef.current += 0.025
      setRotDeg(moonRotRef.current)
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div style={{ minHeight: '100vh', paddingTop: 60 }}>
      {/* Hero */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 16px', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 40, animation: 'fadeUp 1s ease both' }}>
          <div className="label" style={{ marginBottom: 12 }}>Live &middot; {dateStr}</div>
          <h1 className="glow-text" style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(44px, 10vw, 92px)', fontWeight: 400, lineHeight: 1.05, marginBottom: 10 }}>
            Tonight's Moon
          </h1>
          <div style={{ fontFamily: 'Courier New, monospace', fontSize: 12, color: 'rgba(180,120,255,0.5)', letterSpacing: 3 }}>
            {moonData.phase.emoji} {moonData.phase.name.toUpperCase()}
          </div>
        </div>

        {/* Moon row - responsive via CSS class */}
        <div className="moon-row" style={{ marginBottom: 48, width: '100%', maxWidth: 700 }}>
          <div style={{
            transform: 'translate(' + (mouse.nx * 16) + 'px,' + (mouse.ny * 12) + 'px)',
            transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
            animation: 'moonPulse 4s ease-in-out infinite',
          }}>
            <div style={{ transform: 'rotate(' + rotDeg + 'deg)' }}>
              <MoonSVG phaseIndex={moonData.phaseIndex} illumination={moonData.illumination} size={240} />
            </div>
          </div>

          <div style={{
            transform: 'translate(' + (mouse.nx * -10) + 'px,' + (mouse.ny * -8) + 'px)',
            transition: 'transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}>
            <div className="label" style={{ textAlign: 'center', marginBottom: 8 }}>Lunar Cycle</div>
            <PhaseRing phaseIndex={moonData.phaseIndex} size={190} />
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, animation: 'shimmer 2.5s ease-in-out infinite' }}>
          <div className="label">Scroll</div>
          <div style={{ width: 1, height: 36, background: 'linear-gradient(rgba(180,100,255,0.6), transparent)' }} />
        </div>
      </section>

      {/* Data section */}
      <section style={{ maxWidth: 880, margin: '0 auto', padding: '0 16px 80px' }}>
        <div className="label" style={{ textAlign: 'center', marginBottom: 24 }}>Lunar Data</div>

        <div className="stats-grid" style={{ marginBottom: 16 }}>
          <StatCard label="Illumination" value={(moonData.illumination * 100).toFixed(1) + '%'} delay={0} />
          <StatCard label="Moon Age" value={moonData.age.toFixed(1)} unit="days old" delay={80} />
          <StatCard label="Cycle" value={moonData.cyclePercent.toFixed(0) + '%'} unit="complete" delay={160} />
          <StatCard label="To Full Moon" value={moonData.daysToFull} unit="days" delay={240} />
        </div>

        <div className="glass-card" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 16 }}>
          <ProgressBar label="Illumination" value={moonData.illumination * 100} suffix="%" delay={0} />
          <ProgressBar label="Synodic Cycle" value={moonData.age} max={29.53059} suffix=" days" delay={100} />
        </div>

        <div className="glass-card" style={{ padding: '28px 24px', marginBottom: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 44, marginBottom: 10 }}>{moonData.phase.emoji}</div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 24, color: '#d4b4ff', marginBottom: 10, fontWeight: 400 }}>
            {moonData.phase.name}
          </h2>
          <p style={{ color: 'rgba(200,150,255,0.65)', lineHeight: 1.8, maxWidth: 480, margin: '0 auto', fontSize: 14 }}>
            {getPhaseDescription(moonData.phaseIndex)}
          </p>
        </div>

        {/* Zodiac teaser */}
        <div className="label" style={{ textAlign: 'center', margin: '32px 0 16px' }}>Moon Zodiac</div>
        <ZodiacCard zodiacData={zodiac} delay={100} />
      </section>
    </div>
  )
}

function getPhaseDescription(index) {
  return [
    'The Moon is between Earth and the Sun, rendering its face invisible to us. A time of new beginnings and setting intentions for the cycle ahead.',
    'A sliver of light emerges on the right side of the Moon. Energy builds as the lunar disk slowly reveals itself night after night.',
    'Exactly half the Moon is illuminated. A moment of balance and decision.',
    'More than half the Moon glows, swelling toward fullness. Momentum and energy are building to their peak.',
    'The Moon is fully illuminated, directly opposite the Sun. A time of peak clarity and maximum luminosity.',
    'The Moon begins to wane from the left side. Energy slowly recedes as the cycle turns toward completion.',
    'Half the Moon is lit, now the left side. A good time for reflection and letting go.',
    'A sliver remains on the left side as the Moon returns toward darkness, completing its eternal cycle.',
  ][index]
}
