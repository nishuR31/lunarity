import { useState } from 'react'
import { getMoonZodiac, ZODIAC_SIGNS } from '../utils/zodiac'
import { getMoonData } from '../utils/moon'
import ZodiacCard from '../components/ZodiacCard'
import { useInView } from '../hooks/useInView'

function SignRow({ sign, isActive, onClick }) {
  const [ref, inView] = useInView()
  const elementColors = { Fire: '#ff6b4a', Earth: '#6bbf59', Air: '#f0d060', Water: '#60b8d0' }
  const color = elementColors[sign.element]
  return (
    <div ref={ref} onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 12,
      cursor: 'pointer',
      background: isActive ? 'rgba(120,40,200,0.3)' : 'rgba(20,0,40,0.3)',
      border: isActive ? '1px solid rgba(180,100,255,0.45)' : '1px solid rgba(80,20,140,0.15)',
      transition: 'all 0.25s ease',
      opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-12px)',
    }}>
      <span style={{ fontSize: 20, filter: isActive ? 'drop-shadow(0 0 8px ' + color + ')' : 'none' }}>{sign.symbol}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: '"Playfair Display", serif', fontSize: 14, color: isActive ? '#e8d5ff' : '#b090d0' }}>{sign.name}</div>
        <div style={{ fontFamily: 'Courier New, monospace', fontSize: 9, color, letterSpacing: 1, marginTop: 1 }}>{sign.element}</div>
      </div>
      <span style={{ fontSize: 14 }}>{sign.emoji}</span>
    </div>
  )
}

export default function Zodiac() {
  const today = new Date()
  const [date, setDate] = useState(today)
  const [selectedSign, setSelectedSign] = useState(null)
  const moonZodiac = getMoonZodiac(date)
  const moon = getMoonData(date)
  const displayZodiac = selectedSign !== null
    ? { sign: ZODIAC_SIGNS[selectedSign], degreeInSign: '--', longitude: selectedSign * 30 + 15 }
    : moonZodiac
  const isToday = date.toDateString() === today.toDateString()

  return (
    <div style={{ minHeight: '100vh', paddingTop: 76, paddingBottom: 80 }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36, animation: 'fadeUp 0.7s ease both' }}>
          <div className="label" style={{ marginBottom: 10 }}>moon zodiac</div>
          <h1 className="glow-text" style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(30px, 8vw, 68px)', fontWeight: 400, marginBottom: 8 }}>
            Moon in the Stars
          </h1>
          <p style={{ color: 'var(--text-muted)', fontFamily: 'Courier New, monospace', fontSize: 11, letterSpacing: 2 }}>
            {moon.phase.emoji} {moon.phase.name} &middot; {(moon.illumination * 100).toFixed(0)}% illuminated
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
          <button onClick={() => { const d = new Date(date); d.setDate(d.getDate()-1); setDate(d); setSelectedSign(null) }}
            style={{ background: 'rgba(100,30,180,0.22)', border: '1px solid rgba(150,70,240,0.32)', color: '#c8a0ff', width: 40, height: 40, borderRadius: 10, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {'<'}
          </button>
          <input type="date" value={date.toISOString().split('T')[0]}
            onChange={(e) => { setDate(new Date(e.target.value + 'T12:00:00')); setSelectedSign(null) }}
            style={{ background: 'rgba(30,0,60,0.6)', border: '1px solid rgba(160,80,255,0.35)', color: '#e8d5ff', padding: '9px 14px', borderRadius: 12, fontSize: 13, outline: 'none', fontFamily: 'Courier New, monospace' }} />
          <button onClick={() => { const d = new Date(date); d.setDate(d.getDate()+1); setDate(d); setSelectedSign(null) }}
            style={{ background: 'rgba(100,30,180,0.22)', border: '1px solid rgba(150,70,240,0.32)', color: '#c8a0ff', width: 40, height: 40, borderRadius: 10, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {'>'}
          </button>
          {!isToday && (
            <button onClick={() => { setDate(new Date()); setSelectedSign(null) }}
              style={{ background: 'rgba(140,50,220,0.22)', border: '1px solid rgba(180,100,255,0.35)', color: '#c89eff', padding: '9px 14px', borderRadius: 10, fontSize: 11, cursor: 'pointer', letterSpacing: 2, fontFamily: 'Courier New, monospace' }}>
              TODAY
            </button>
          )}
        </div>

        <ZodiacCard zodiacData={displayZodiac} key={displayZodiac.sign.name} />

        <div className="glass-card" style={{ padding: '22px 18px', marginTop: 16 }}>
          <div className="label" style={{ marginBottom: 14, textAlign: 'center' }}>
            {selectedSign !== null ? 'Tap a sign to explore' : 'Moon is here now'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
            {ZODIAC_SIGNS.map((sign, i) => (
              <SignRow key={sign.name} sign={sign}
                isActive={selectedSign !== null ? selectedSign === i : moonZodiac.signIndex === i}
                onClick={() => setSelectedSign(selectedSign === i ? null : i)} />
            ))}
          </div>
          {selectedSign !== null && (
            <button onClick={() => setSelectedSign(null)}
              style={{ marginTop: 14, width: '100%', background: 'rgba(140,50,220,0.18)', border: '1px solid rgba(160,80,255,0.3)', color: '#c89eff', padding: '10px', borderRadius: 10, fontSize: 10, cursor: 'pointer', letterSpacing: 2, fontFamily: 'Courier New, monospace' }}>
              BACK TO MOON ({moonZodiac.sign.name.toUpperCase()})
            </button>
          )}
        </div>

        <div className="glass-card" style={{ padding: '22px 18px', marginTop: 16 }}>
          <div className="label" style={{ marginBottom: 14, textAlign: 'center' }}>The Four Elements</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {[
              { el: 'Fire',  color: '#ff6b4a', signs: 'Aries, Leo, Sagittarius',    desc: 'Action, passion, transformation' },
              { el: 'Earth', color: '#6bbf59', signs: 'Taurus, Virgo, Capricorn',   desc: 'Stability, growth, material world' },
              { el: 'Air',   color: '#f0d060', signs: 'Gemini, Libra, Aquarius',    desc: 'Intellect, ideas, communication' },
              { el: 'Water', color: '#60b8d0', signs: 'Cancer, Scorpio, Pisces',    desc: 'Emotion, intuition, the unconscious' },
            ].map((item) => (
              <div key={item.el} style={{ padding: '14px', borderRadius: 12, background: 'rgba(20,0,40,0.4)', border: '1px solid ' + item.color + '28' }}>
                <div style={{ fontFamily: '"Playfair Display", serif', fontSize: 14, color: item.color, marginBottom: 4 }}>{item.el}</div>
                <div style={{ fontFamily: 'Courier New, monospace', fontSize: 9, color: 'rgba(180,130,255,0.4)', letterSpacing: 1, marginBottom: 5 }}>{item.signs}</div>
                <div style={{ fontSize: 12, color: 'rgba(200,160,255,0.6)', lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
