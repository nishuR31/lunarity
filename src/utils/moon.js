// UTC-based Julian Day with fractional time
function julianDay(date) {
  const d = new Date(date)
  const y = d.getUTCFullYear()
  const m = d.getUTCMonth() + 1
  const dayFrac = d.getUTCDate() + (d.getUTCHours() + d.getUTCMinutes() / 60 + d.getUTCSeconds() / 3600) / 24
  const A = Math.floor((14 - m) / 12)
  const YY = y + 4800 - A
  const MM = m + 12 * A - 3
  return (
    Math.floor(dayFrac) +
    Math.floor((153 * MM + 2) / 5) +
    365 * YY +
    Math.floor(YY / 4) -
    Math.floor(YY / 100) +
    Math.floor(YY / 400) -
    32045 +
    (dayFrac % 1)
  )
}

const SYNODIC = 29.53058867
const HALF    = SYNODIC / 2   // 14.765 — Full Moon peak
const QTR     = SYNODIC / 4   //  7.383 — First Quarter
const TQR     = SYNODIC * 3/4 // 22.148 — Last Quarter

// Calibrated to real data (MoonGiant / TheSkyLive / Astronomy.com March 2026):
// Full Moon  peaked Mar 3  11:38 UTC → age ~14.97 with this REF
// New Moon   peaked Mar 18 05:23 UTC → age ~0.0  with this REF
// Mar 17 (age 28.07) = Waning Crescent ✓
// Mar 18 (age 0.46)  = New Moon ✓
// Mar 4  (age 15.99) = Waning Gibbous ✓
const REF_JD = 2461088.51

// Phase windows calibrated against multiple real almanac sources.
// New Moon & Full Moon use tight ±0.5 day windows so adjacent days
// correctly show Waning/Waxing Crescent and Waning/Waxing Gibbous.
// Quarter phases use ±1.0 day windows.
function phaseIndexFromAge(age) {
  if (age < 0.5 || age > SYNODIC - 0.5)  return 0  // New Moon       (tight)
  if (age < QTR - 1.0)                    return 1  // Waxing Crescent
  if (age < QTR + 1.0)                    return 2  // First Quarter
  if (age < HALF - 0.5)                   return 3  // Waxing Gibbous
  if (age < HALF + 0.5)                   return 4  // Full Moon      (tight)
  if (age < TQR - 1.0)                    return 5  // Waning Gibbous
  if (age < TQR + 1.0)                    return 6  // Last Quarter
  return 7                                           // Waning Crescent
}

export const PHASES = [
  { name: 'New Moon',        emoji: '🌑', shortName: 'New',          index: 0 },
  { name: 'Waxing Crescent', emoji: '🌒', shortName: 'W. Crescent',  index: 1 },
  { name: 'First Quarter',   emoji: '🌓', shortName: 'First Qtr',    index: 2 },
  { name: 'Waxing Gibbous',  emoji: '🌔', shortName: 'W. Gibbous',   index: 3 },
  { name: 'Full Moon',       emoji: '🌕', shortName: 'Full',         index: 4 },
  { name: 'Waning Gibbous',  emoji: '🌖', shortName: 'Wan. Gibbous', index: 5 },
  { name: 'Last Quarter',    emoji: '🌗', shortName: 'Last Qtr',     index: 6 },
  { name: 'Waning Crescent', emoji: '🌘', shortName: 'Wan. Crescent',index: 7 },
]

export function getMoonData(date = new Date()) {
  const jd = julianDay(date)
  const raw = (jd - REF_JD) % SYNODIC
  const age = raw < 0 ? raw + SYNODIC : raw
  const illumination = (1 - Math.cos((2 * Math.PI * age) / SYNODIC)) / 2
  const phaseIndex = phaseIndexFromAge(age)
  const cyclePercent = (age / SYNODIC) * 100
  let daysToFull = HALF - age
  if (daysToFull < 0) daysToFull += SYNODIC
  return {
    age, illumination,
    phase: PHASES[phaseIndex],
    phaseIndex, cyclePercent,
    daysToFull: daysToFull.toFixed(1),
    daysToNew: (SYNODIC - age).toFixed(1),
  }
}

export function getUpcomingEvents(fromDate = new Date(), count = 8) {
  const events = []
  const d = new Date(fromDate)
  let lastDateStr = '', lastPhase = -1
  for (let i = 0; i < 90; i++) {
    const data = getMoonData(d)
    const dateStr = d.toDateString()
    if ([0, 2, 4, 6].includes(data.phaseIndex) && (dateStr !== lastDateStr || data.phaseIndex !== lastPhase)) {
      events.push({ ...data, date: new Date(d), dateStr })
      lastDateStr = dateStr; lastPhase = data.phaseIndex
      if (events.length >= count) break
    }
    d.setDate(d.getDate() + 1)
  }
  return events
}

export function getMonthData(year, month) {
  const days = []
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(Date.UTC(year, month, day, 12, 0, 0))
    days.push({ date, ...getMoonData(date) })
  }
  return days
}
