export const ZODIAC_SIGNS = [
  { name: 'Aries',       symbol: '♈', emoji: '🐏', element: 'Fire',  elementColor: '#ff6b4a', dates: 'Mar 21 – Apr 19', traits: ['Bold', 'Energetic', 'Impulsive'],      moonMeaning: 'A time of bold action and new beginnings. Energy runs high — channel it into starting something fresh.', ruling: 'Mars' },
  { name: 'Taurus',      symbol: '♉', emoji: '🐂', element: 'Earth', elementColor: '#6bbf59', dates: 'Apr 20 – May 20', traits: ['Stable', 'Sensual', 'Patient'],         moonMeaning: 'Ground yourself in comfort and beauty. Excellent for indulging the senses, financial decisions, and slow pleasures.', ruling: 'Venus' },
  { name: 'Gemini',      symbol: '♊', emoji: '👯', element: 'Air',   elementColor: '#f0d060', dates: 'May 21 – Jun 20', traits: ['Curious', 'Witty', 'Adaptable'],        moonMeaning: 'The mind crackles with ideas. Perfect for communication, learning, short trips, and social connection.', ruling: 'Mercury' },
  { name: 'Cancer',      symbol: '♋', emoji: '🦀', element: 'Water', elementColor: '#60b8d0', dates: 'Jun 21 – Jul 22', traits: ['Intuitive', 'Nurturing', 'Emotional'],   moonMeaning: 'The Moon is at home here. Deep feelings surface — tend to home, family, and your inner world.', ruling: 'Moon' },
  { name: 'Leo',         symbol: '♌', emoji: '🦁', element: 'Fire',  elementColor: '#ff6b4a', dates: 'Jul 23 – Aug 22', traits: ['Generous', 'Creative', 'Dramatic'],      moonMeaning: 'Step into the spotlight. A powerful time for creativity, self-expression, romance, and leadership.', ruling: 'Sun' },
  { name: 'Virgo',       symbol: '♍', emoji: '🌾', element: 'Earth', elementColor: '#6bbf59', dates: 'Aug 23 – Sep 22', traits: ['Analytical', 'Precise', 'Helpful'],      moonMeaning: 'Detail-oriented energy prevails. Ideal for organizing, health routines, refining work, and practical problem-solving.', ruling: 'Mercury' },
  { name: 'Libra',       symbol: '♎', emoji: '⚖️', element: 'Air',   elementColor: '#f0d060', dates: 'Sep 23 – Oct 22', traits: ['Harmonious', 'Diplomatic', 'Aesthetic'], moonMeaning: 'Seek balance and beauty. Favors relationships, artistic pursuits, negotiation, and creating harmony.', ruling: 'Venus' },
  { name: 'Scorpio',     symbol: '♏', emoji: '🦂', element: 'Water', elementColor: '#60b8d0', dates: 'Oct 23 – Nov 21', traits: ['Intense', 'Perceptive', 'Transformative'],moonMeaning: 'Dive deep into hidden truths. A time of transformation, intense emotion, and powerful psychological insight.', ruling: 'Pluto' },
  { name: 'Sagittarius', symbol: '♐', emoji: '🏹', element: 'Fire',  elementColor: '#ff6b4a', dates: 'Nov 22 – Dec 21', traits: ['Adventurous', 'Philosophical', 'Free'],   moonMeaning: 'Expand your horizons. Perfect for travel, philosophy, higher learning, and seeking the bigger picture.', ruling: 'Jupiter' },
  { name: 'Capricorn',   symbol: '♑', emoji: '🐐', element: 'Earth', elementColor: '#6bbf59', dates: 'Dec 22 – Jan 19', traits: ['Disciplined', 'Ambitious', 'Structured'], moonMeaning: 'Focus on long-term goals and structure. Excellent for career moves, building lasting foundations, and discipline.', ruling: 'Saturn' },
  { name: 'Aquarius',    symbol: '♒', emoji: '🏺', element: 'Air',   elementColor: '#f0d060', dates: 'Jan 20 – Feb 18', traits: ['Innovative', 'Humanitarian', 'Eccentric'], moonMeaning: 'Think outside the box. Favors innovation, community, social causes, and unconventional ideas.', ruling: 'Uranus' },
  { name: 'Pisces',      symbol: '♓', emoji: '🐟', element: 'Water', elementColor: '#60b8d0', dates: 'Feb 19 – Mar 20', traits: ['Dreamy', 'Compassionate', 'Mystical'],    moonMeaning: 'The veil between worlds thins. Heightened intuition, creativity, dreams, and spiritual connection.', ruling: 'Neptune' },
]

// UTC-based Julian Day (matches moon.js fix)
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

export function getMoonZodiac(date = new Date()) {
  const JD = julianDay(date)
  const T = (JD - 2451545.0) / 36525.0

  // Moon's mean longitude
  const L0 = 218.3164477 + 481267.88123421 * T
  // Moon's mean anomaly
  const M  = 134.9633964 + 477198.8675055  * T
  // Moon's argument of latitude
  const F  = 93.2720950  + 483202.0175233  * T
  // Sun's mean anomaly
  const MS = 357.5291092 + 35999.0502909   * T

  const Mrad  = (M  * Math.PI) / 180
  const Frad  = (F  * Math.PI) / 180
  const L0rad = (L0 * Math.PI) / 180

  // Simplified longitude correction
  const longitude =
    L0 +
    6.289 * Math.sin(Mrad) +
    1.274 * Math.sin(2 * L0rad - Mrad) +
    0.658 * Math.sin(2 * L0rad) -
    0.214 * Math.sin(2 * Mrad) -
    0.114 * Math.sin(2 * Frad)

  const lon = ((longitude % 360) + 360) % 360
  const signIndex = Math.floor(lon / 30)
  const degreeInSign = (lon % 30).toFixed(1)

  return {
    sign: ZODIAC_SIGNS[signIndex],
    signIndex,
    longitude: lon,
    degreeInSign,
  }
}
