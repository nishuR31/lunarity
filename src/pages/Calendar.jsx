import { useState } from 'react'
import { getMonthData, getUpcomingEvents } from '../utils/moon'
import { useInView } from '../hooks/useInView'

const DAYS = ['S','M','T','W','T','F','S']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

function CalCell({ day }) {
  const [ref, inView] = useInView()
  const isToday = day.date.toDateString() === new Date().toDateString()
  const isMajor = day.phaseIndex === 0 || day.phaseIndex === 4

  return (
    <div ref={ref} style={{
      padding: '6px 4px', borderRadius: 10, textAlign: 'center',
      background: isToday ? 'rgba(140,50,220,0.25)' : isMajor ? 'rgba(80,20,160,0.18)' : 'rgba(20,0,40,0.3)',
      border: isToday ? '1px solid rgba(180,100,255,0.5)' : isMajor ? '1px solid rgba(140,60,220,0.22)' : '1px solid rgba(80,20,140,0.1)',
      transition: 'all 0.25s ease',
      opacity: inView ? 1 : 0,
      transform: inView ? 'scale(1)' : 'scale(0.9)',
      cursor: 'default',
    }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(120,40,200,0.28)'; e.currentTarget.style.transform = 'scale(1.06)' }}
      onMouseLeave={(e) => { e.currentTarget.style.background = isToday ? 'rgba(140,50,220,0.25)' : isMajor ? 'rgba(80,20,160,0.18)' : 'rgba(20,0,40,0.3)'; e.currentTarget.style.transform = 'scale(1)' }}>
      <div style={{ fontSize: 10, color: isToday ? '#d4b4ff' : 'rgba(160,110,240,0.45)', fontFamily: 'Courier New, monospace', marginBottom: 2 }}>{day.date.getDate()}</div>
      <div style={{ fontSize: 15, lineHeight: 1, filter: isMajor ? 'drop-shadow(0 0 5px rgba(220,160,255,0.7))' : 'none' }}>{day.phase.emoji}</div>
      <div style={{ fontSize: 8, color: 'rgba(160,110,220,0.4)', fontFamily: 'Courier New, monospace', marginTop: 2 }}>{(day.illumination*100).toFixed(0)}%</div>
    </div>
  )
}

export default function Calendar() {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const monthData = getMonthData(year, month)
  const upcoming = getUpcomingEvents(new Date(), 6)
  const firstDay = new Date(year, month, 1).getDay()

  const prevMonth = () => { if (month===0){setMonth(11);setYear(y=>y-1)} else setMonth(m=>m-1) }
  const nextMonth = () => { if (month===11){setMonth(0);setYear(y=>y+1)} else setMonth(m=>m+1) }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 76, paddingBottom: 80 }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36, animation: 'fadeUp 0.7s ease both' }}>
          <div className="label" style={{ marginBottom: 10 }}>Lunar Calendar</div>
          <h1 className="glow-text" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(30px, 7vw, 60px)', fontWeight: 400 }}>
            Moon Calendar
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
          <button onClick={prevMonth} style={navBtn}>{'<'}</button>
          <div style={{ fontFamily: '"Playfair Display", serif', fontSize: 20, color: '#d4b4ff', minWidth: 190, textAlign: 'center' }}>
            {MONTHS[month]} {year}
          </div>
          <button onClick={nextMonth} style={navBtn}>{'>'}</button>
        </div>

        {/* Day labels */}
        <div className="cal-grid" style={{ marginBottom: 4 }}>
          {DAYS.map((d,i) => (
            <div key={i} style={{ textAlign: 'center', fontFamily: 'Courier New, monospace', fontSize: 9, letterSpacing: 1, color: 'rgba(160,110,220,0.4)', padding: '4px 0' }}>{d}</div>
          ))}
        </div>

        {/* Calendar cells */}
        <div className="cal-grid" style={{ marginBottom: 40 }}>
          {Array(firstDay).fill(null).map((_,i) => <div key={'b'+i} />)}
          {monthData.map((day, i) => <CalCell key={i} day={day} />)}
        </div>

        {/* Upcoming events */}
        <div className="label" style={{ textAlign: 'center', marginBottom: 16 }}>Upcoming Major Phases</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
          {upcoming.map((ev, i) => (
            <div key={i} className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14, animation: 'fadeUp 0.6s ease ' + (i*70) + 'ms both' }}>
              <div style={{ fontSize: 28, filter: 'drop-shadow(0 0 7px rgba(220,160,255,0.6))' }}>{ev.phase.emoji}</div>
              <div>
                <div style={{ fontFamily: '"Playfair Display", serif', fontSize: 15, color: '#d4b4ff' }}>{ev.phase.name}</div>
                <div style={{ fontFamily: 'Courier New, monospace', fontSize: 10, color: 'rgba(160,110,220,0.5)', letterSpacing: 1, marginTop: 2 }}>
                  {ev.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const navBtn = {
  background: 'rgba(100,30,180,0.22)', border: '1px solid rgba(150,70,240,0.32)',
  color: '#c8a0ff', width: 42, height: 42, borderRadius: 10,
  fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
}
