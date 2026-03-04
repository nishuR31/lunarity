import { useState } from 'react'
import { getMoonData } from '../utils/moon'
import { getMoonZodiac } from '../utils/zodiac'
import MoonSVG from '../components/MoonSVG'
import PhaseRing from '../components/PhaseRing'
import StatCard from '../components/StatCard'
import ProgressBar from '../components/ProgressBar'
import ZodiacCard from '../components/ZodiacCard'
import { useMouse } from '../hooks/useMouse'

export default function Explorer() {
  const [date, setDate] = useState(new Date())
  const moon = getMoonData(date)
  const zodiac = getMoonZodiac(date)
  const mouse = useMouse()
  const isToday = date.toDateString() === new Date().toDateString()

  const setDay = (offset) => {
    const d = new Date(date)
    d.setDate(d.getDate() + offset)
    setDate(d)
  }

  const fmt = (d) => d.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })

  return (
    <div style={{ minHeight: '100vh', paddingTop: 76, paddingBottom: 80 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36, animation: 'fadeUp 0.7s ease both' }}>
          <div className="label" style={{ marginBottom: 10 }}>Moon Explorer</div>
          <h1 className="glow-text" style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(30px, 7vw, 60px)', fontWeight: 400 }}>
            Any Date in Time
          </h1>
        </div>

        {/* Date controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          <NavBtn onClick={() => setDay(-7)} label="-7" />
          <NavBtn onClick={() => setDay(-1)} label="<" large />
          <input type="date" value={date.toISOString().split('T')[0]}
            onChange={(e) => setDate(new Date(e.target.value + 'T12:00:00'))}
            style={{ background: 'rgba(30,0,60,0.6)', border: '1px solid rgba(160,80,255,0.35)', color: '#e8d5ff', padding: '11px 14px', borderRadius: 12, fontSize: 13, outline: 'none', fontFamily: 'Courier New, monospace' }} />
          <NavBtn onClick={() => setDay(1)} label=">" large />
          <NavBtn onClick={() => setDay(7)} label="+7" />
          {!isToday && (
            <button onClick={() => setDate(new Date())}
              style={{ background: 'rgba(140,50,220,0.22)', border: '1px solid rgba(180,100,255,0.35)', color: '#c89eff', padding: '11px 14px', borderRadius: 10, fontSize: 10, cursor: 'pointer', letterSpacing: 2, fontFamily: 'Courier New, monospace' }}>
              TODAY
            </button>
          )}
        </div>

        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontFamily: '"Playfair Display", serif', fontSize: 17, color: '#d4b4ff' }}>{fmt(date)}</div>
          {isToday && <div style={{ fontFamily: 'Courier New, monospace', fontSize: 10, color: 'rgba(180,200,100,0.55)', letterSpacing: 3, marginTop: 4 }}>LIVE</div>}
        </div>

        {/* Moon + Ring */}
        <div className="moon-row" style={{ marginBottom: 40 }}>
          <div style={{
            transform: 'translate(' + (mouse.nx * 12) + 'px,' + (mouse.ny * 8) + 'px)',
            transition: 'transform 0.7s ease',
            animation: 'moonPulse 4s ease-in-out infinite',
          }}>
            <MoonSVG phaseIndex={moon.phaseIndex} illumination={moon.illumination} size={220} />
            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <div style={{ fontSize: 22, marginBottom: 2 }}>{moon.phase.emoji}</div>
              <div style={{ fontFamily: '"Playfair Display", serif', fontSize: 16, color: '#d4b4ff' }}>{moon.phase.name}</div>
            </div>
          </div>
          <div style={{ transform: 'translate(' + (mouse.nx * -8) + 'px,' + (mouse.ny * -6) + 'px)', transition: 'transform 0.9s ease' }}>
            <PhaseRing phaseIndex={moon.phaseIndex} size={190} />
          </div>
        </div>

        <div className="stats-grid" style={{ marginBottom: 14 }}>
          <StatCard label="Illumination" value={(moon.illumination * 100).toFixed(1) + '%'} delay={0} />
          <StatCard label="Moon Age" value={moon.age.toFixed(1)} unit="days" delay={70} />
          <StatCard label="Cycle" value={moon.cyclePercent.toFixed(0) + '%'} unit="complete" delay={140} />
          <StatCard label="Cycle Day" value={Math.floor(moon.age) + '/29'} delay={210} />
        </div>

        <div className="glass-card" style={{ padding: '26px 22px', display: 'flex', flexDirection: 'column', gap: 22, marginBottom: 14 }}>
          <ProgressBar label="Illumination" value={moon.illumination * 100} suffix="%" />
          <ProgressBar label="Moon Cycle Age" value={moon.age} max={29.53059} suffix=" days" delay={100} />
        </div>

        <div className="label" style={{ textAlign: 'center', margin: '28px 0 14px' }}>Moon Zodiac</div>
        <ZodiacCard zodiacData={zodiac} key={date.toDateString()} />
      </div>
    </div>
  )
}

function NavBtn({ onClick, label, large }) {
  return (
    <button onClick={onClick} style={{
      background: 'rgba(100,30,180,0.22)', border: '1px solid rgba(150,70,240,0.32)',
      color: '#c8a0ff', width: large ? 44 : 52, height: 44, borderRadius: 10,
      fontSize: large ? 18 : 11, cursor: 'pointer',
      fontFamily: 'Courier New, monospace', letterSpacing: 1,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(120,50,210,0.42)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(100,30,180,0.22)')}>
      {label}
    </button>
  )
}
