// ── Lunar Zodiac ────────────────────────────────────────────────────────────
// Moon moves through zodiac every ~2.5 days (sidereal period ~27.32 days)
const ZODIAC = [
  {
    sign: 'Aries', symbol: '♈', emoji: '🐏', element: 'Fire', quality: 'Cardinal',
    color: '#ff6b6b',
    traits: ['Bold', 'Energetic', 'Impulsive'],
    moonInfluence: 'High energy and initiative. Great for starting new projects, physical activity, and asserting yourself. Emotions run hot — channel that fire productively.',
  },
  {
    sign: 'Taurus', symbol: '♉', emoji: '🐂', element: 'Earth', quality: 'Fixed',
    color: '#51cf66',
    traits: ['Sensual', 'Stable', 'Patient'],
    moonInfluence: 'Grounding and indulgent. The Moon loves Taurus — emotions stabilize, pleasures deepen. Ideal for cooking, art, financial planning, and self-care rituals.',
  },
  {
    sign: 'Gemini', symbol: '♊', emoji: '👯', element: 'Air', quality: 'Mutable',
    color: '#74c0fc',
    traits: ['Curious', 'Witty', 'Restless'],
    moonInfluence: 'Mental agility peaks. Conversations flow easily, ideas multiply. Watch for scattered energy and overthinking. Great for writing, socializing, and learning.',
  },
  {
    sign: 'Cancer', symbol: '♋', emoji: '🦀', element: 'Water', quality: 'Cardinal',
    color: '#a9e34b',
    traits: ['Nurturing', 'Intuitive', 'Emotional'],
    moonInfluence: 'The Moon rules Cancer — emotions are amplified and intuition sharpens. Deeply nurturing energy for family, home, and healing. Honor your feelings.',
  },
  {
    sign: 'Leo', symbol: '♌', emoji: '🦁', element: 'Fire', quality: 'Fixed',
    color: '#ffd43b',
    traits: ['Creative', 'Dramatic', 'Generous'],
    moonInfluence: 'Radiant and expressive. The heart wants to shine. Perfect for creative pursuits, romance, performing, and celebrating. Generosity flows naturally.',
  },
  {
    sign: 'Virgo', symbol: '♍', emoji: '🌾', element: 'Earth', quality: 'Mutable',
    color: '#69db7c',
    traits: ['Analytical', 'Practical', 'Detail-oriented'],
    moonInfluence: 'A time for refinement and service. Emotions are processed through logic. Excellent for health routines, organizing, editing work, and helping others.',
  },
  {
    sign: 'Libra', symbol: '♎', emoji: '⚖️', element: 'Air', quality: 'Cardinal',
    color: '#f783ac',
    traits: ['Harmonious', 'Diplomatic', 'Aesthetic'],
    moonInfluence: 'Balance and beauty take center stage. Relationships are highlighted — a good time for compromise, social grace, and appreciating art. Avoid indecision.',
  },
  {
    sign: 'Scorpio', symbol: '♏', emoji: '🦂', element: 'Water', quality: 'Fixed',
    color: '#cc5de8',
    traits: ['Intense', 'Perceptive', 'Transformative'],
    moonInfluence: 'Deep emotional currents surge. Secrets may surface. Powerful for shadow work, transformation, intimacy, and research. Trust your instincts completely.',
  },
  {
    sign: 'Sagittarius', symbol: '♐', emoji: '🏹', element: 'Fire', quality: 'Mutable',
    color: '#ff922b',
    traits: ['Adventurous', 'Optimistic', 'Philosophical'],
    moonInfluence: 'Expansive and freedom-loving. The spirit yearns to explore. Ideal for travel, higher learning, philosophy, and broadening your worldview. Stay honest.',
  },
  {
    sign: 'Capricorn', symbol: '♑', emoji: '🐐', element: 'Earth', quality: 'Cardinal',
    color: '#868e96',
    traits: ['Ambitious', 'Disciplined', 'Responsible'],
    moonInfluence: 'Emotions are managed with discipline. Productivity and ambition surge. A strong time for career moves, long-term planning, and building lasting structures.',
  },
  {
    sign: 'Aquarius', symbol: '♒', emoji: '🏺', element: 'Air', quality: 'Fixed',
    color: '#4dabf7',
    traits: ['Innovative', 'Humanitarian', 'Detached'],
    moonInfluence: 'Collective consciousness awakens. Think beyond yourself — community, innovation, and social causes call. Emotionally detached but intellectually electric.',
  },
  {
    sign: 'Pisces', symbol: '♓', emoji: '🐟', element: 'Water', quality: 'Mutable',
    color: '#9775fa',
    traits: ['Dreamy', 'Compassionate', 'Mystical'],
    moonInfluence: 'The veil between worlds thins. Dreams intensify, empathy overflows. Profound for meditation, art, spiritual practice, and acts of compassion. Guard your energy.',
  },
]

// Sidereal Moon position: cycles through 12 signs in 27.32 days
export function getMoonZodiac(date = new Date()) {
  // Reference: Moon was in Aries at J2000.0 (Jan 1.5, 2000)
  // Sidereal period: 27.321661 days
  const J2000 = 2451545.0
  const jd = julianDay(date)
  const daysSinceJ2000 = jd - J2000
  const siderealPeriod = 27.321661
  const progress = ((daysSinceJ2000 % siderealPeriod) + siderealPeriod) % siderealPeriod
  // Offset to calibrate (Moon was approximately at 120° = Virgo at J2000)
  const offsetDays = (120 / 360) * siderealPeriod
  const adjusted = ((progress + offsetDays) % siderealPeriod)
  const signIndex = Math.floor((adjusted / siderealPeriod) * 12) % 12
  const degreeInSign = ((adjusted / siderealPeriod) * 12 - signIndex) * 30
  return {
    ...ZODIAC[signIndex],
    signIndex,
    degree: degreeInSign.toFixed(1),
    progress: (adjusted / siderealPeriod) * 100,
  }
}

function julianDay(date) {
  const d = new Date(date)
  const y = d.getFullYear(), m = d.getMonth() + 1, day = d.getDate()
  const A = Math.floor((14 - m) / 12)
  const YY = y + 4800 - A, MM = m + 12 * A - 3
  return day + Math.floor((153 * MM + 2) / 5) + 365 * YY +
    Math.floor(YY / 4) - Math.floor(YY / 100) + Math.floor(YY / 400) - 32045
}

// ── Lunar Folklore ──────────────────────────────────────────────────────────
export const LUNAR_FOLKLORE = [
  // New Moon
  {
    phase: 'New Moon',
    title: 'The Dark Mirror',
    quote: 'In the darkness, the seed knows nothing of the flower it will become.',
    traditions: [
      { culture: 'Celtic', text: 'New Moons were sacred to Cerridwen, goddess of transformation. Druids would not begin any endeavor without consulting the Moon\'s phase, believing the dark moon held the most potent magic for unseen workings.' },
      { culture: 'Babylonian', text: 'The Akkadians called the New Moon "Aku" — the crescent protector. Priests would fast and pray during the dark phase, believing the Moon had journeyed to the underworld and returned reborn.' },
      { culture: 'Chinese', text: 'In Chinese tradition, the new moon marks the beginning of a lunar month. Families gather to make wishes and release sky lanterns, trusting the darkness to carry intentions to heaven.' },
      { culture: 'Hindu', text: 'Amavasya (new moon) is considered both powerful and delicate. Ancestors are honored through rituals called "Shraddha," and it is customary to avoid major undertakings while honoring endings.' },
    ],
    ritual: 'Write your deepest intentions on paper by candlelight. Fold it toward you three times, then place it under a crystal or stone until the Full Moon.',
    omens: 'Seeing the first sliver of the new crescent over your right shoulder is considered deeply auspicious in many cultures — a sign of fortune for the month ahead.',
  },
  // Waxing Crescent
  {
    phase: 'Waxing Crescent',
    title: 'The Silver Bow',
    quote: 'As the moon grows, so grows the power of all things set in motion.',
    traditions: [
      { culture: 'Greek', text: 'Artemis, goddess of the hunt, wielded a silver bow shaped like the crescent moon. Warriors would pray to her during this phase before campaigns, believing her growing light strengthened their resolve.' },
      { culture: 'Norse', text: 'The Norse called this phase "Mani\'s Waxing" — as the moon-god Mani drove his chariot higher, farmers believed crops planted now would grow with unusual vigor and abundance.' },
      { culture: 'Islamic', text: 'The crescent (Hilal) holds deep significance in Islam, marking the beginning of Ramadan and Islamic months. Community gatherings to sight the crescent are cherished traditions across the Muslim world.' },
      { culture: 'Native American', text: 'Many Plains tribes used the waxing crescent as a signal to begin vision quests, seeing the growing light as the Great Spirit opening a window between worlds.' },
    ],
    ritual: 'Plant seeds — literal or metaphorical. Write the steps needed to achieve your new moon intention and take the very first action, however small.',
    omens: 'A crescent moon with its tips pointing upward like a cup is said to "hold water" — a sign of abundance and blessing to come. Tips pointing sideways "spill" the luck.',
  },
  // First Quarter
  {
    phase: 'First Quarter',
    title: 'The Warrior\'s Moon',
    quote: 'Obstacles are not walls — they are doors asking to be tried.',
    traditions: [
      { culture: 'Roman', text: 'Roman generals consulted the lunar calendar obsessively. The First Quarter was called "Luna Dimidiata" — the half-light — and considered ideal for strategic decisions requiring both courage and calculation.' },
      { culture: 'Mayan', text: 'Mayan astronomers tracked the quarter moons with extraordinary precision. The First Quarter signaled the midpoint of planting season, when farmers performed elaborate ceremonies to ensure the maize would thrive.' },
      { culture: 'Japanese', text: 'In Japanese tradition, Jogen (First Quarter) is associated with clarity and decisive action. Samurai were said to sharpen their swords during this phase, aligning their discipline with the moon\'s growing strength.' },
      { culture: 'Egyptian', text: 'Ancient Egyptians dedicated the quarter moon to Thoth, god of wisdom and writing. Scribes would begin important texts during this phase, believing Thoth\'s clarity of mind was most accessible.' },
    ],
    ritual: 'Identify what is blocking your intention and name it aloud. Then take bold action to move through it. The First Quarter rewards courage.',
    omens: 'In European folklore, a Moon with a distinct "face" visible at the First Quarter means a wise elder wishes to communicate wisdom through dreams this night.',
  },
  // Waxing Gibbous
  {
    phase: 'Waxing Gibbous',
    title: 'The Almost-Full',
    quote: 'Perfection approaches — refine, edit, and prepare for the harvest.',
    traditions: [
      { culture: 'Medieval European', text: 'Alchemists called this phase "Luna Crescens" and considered it the most potent time for completing long works. The near-full moon was thought to heighten psychic sensitivity and the efficacy of healing remedies.' },
      { culture: 'Aboriginal Australian', text: 'Yolngu people read the gibbous moon as Ngalindi, the Moon-man, almost restored to his full glory after being "eaten" by his wives. This phase carries themes of resurrection and perseverance.' },
      { culture: 'Persian', text: 'Persian poets wrote extensively of the swelling moon as a metaphor for love approaching its peak — beautiful, almost unbearable in its intensity, pregnant with fulfillment.' },
      { culture: 'African Yoruba', text: 'Yoruba tradition associates this phase with Yemoja, mother of waters. Her blessings are close at hand — prayers offered now for healing, protection, and abundance are said to reach her most readily.' },
    ],
    ritual: 'Review your progress since the New Moon. Refine your approach, express gratitude for growth already visible, and make any final adjustments before the Full Moon reveals all.',
    omens: 'If you see a ring (corona) around the waxing gibbous moon, old weather wisdom says rain within three days — but mystic tradition calls it a halo of power, amplifying any work done beneath it.',
  },
  // Full Moon
  {
    phase: 'Full Moon',
    title: 'The Great Illuminator',
    quote: 'What was hidden in darkness is now revealed in silver light.',
    traditions: [
      { culture: 'Buddhist', text: 'Vesak, the most sacred Buddhist holiday, falls on the Full Moon of May — celebrating the birth, enlightenment, and passing of the Buddha. Full moons are called "Uposatha" days of intensified practice and merit-making.' },
      { culture: 'Hindu', text: 'Purnima (Full Moon) is among the holiest times in the Hindu calendar. Devotees fast, bathe in sacred rivers, and light lamps to honor deities. The Full Moon of Kartik is considered equivalent to a lifetime of good deeds.' },
      { culture: 'Slavic', text: 'Slavic folklore holds that the Full Moon is when rusalki — water spirits — emerge to dance. Villages would leave offerings at riversides and avoid swimming, while lovers were said to be enchanted by the moon\'s silver pull.' },
      { culture: 'Indigenous Lakota', text: 'Each Full Moon has a name among the Lakota: the Wolf Moon, the Snow Moon, the Flower Moon. Each name carries specific ceremonies, teachings, and wisdom passed through generations of oral tradition.' },
    ],
    ritual: 'Stand beneath the Full Moon (or at an open window) with arms open. Breathe deeply and release what no longer serves you with each exhale. Write what you are grateful for, then burn or bury the list.',
    omens: 'A blood-red full moon has historically signaled great change — not necessarily bad, but transformative. A golden moon promises abundance. A pale white moon calls for introspection and rest.',
  },
  // Waning Gibbous
  {
    phase: 'Waning Gibbous',
    title: 'The Gratitude Moon',
    quote: 'The harvest is gathered — now is the time to share what abundance has given.',
    traditions: [
      { culture: 'Ancient Greek', text: 'Hecate, goddess of magic and crossroads, was said to walk the earth most freely as the moon began to wane. Offerings of garlic, bread, and fish were left at crossroads to honor her passage.' },
      { culture: 'Medieval Herbalism', text: 'Herbalists and wise women of medieval Europe harvested medicinal plants during the waning gibbous, believing the receding lunar pull drew beneficial properties deeper into roots and bark, concentrating their power.' },
      { culture: 'West African Ashanti', text: 'Ashanti tradition celebrates the waning moon as a time of communal storytelling. Elders gather the young under the fading light to transmit ancestral wisdom — the moon\'s dimming is seen as leaning down to listen.' },
      { culture: 'Chinese Taoism', text: 'Taoist practice emphasizes "wu wei" (effortless action) during the waning phase. As the moon releases its fullness, practitioners are encouraged to release control, practice forgiveness, and restore internal balance.' },
    ],
    ritual: 'Cook a meal and share it, or perform an act of generosity. The waning gibbous rewards those who circulate their abundance rather than hoard it.',
    omens: 'Dreaming vividly during the waning gibbous is considered prophetic in many traditions. Keep a journal by your bed — the moon whispers truths in dreams that daylight obscures.',
  },
  // Last Quarter
  {
    phase: 'Last Quarter',
    title: 'The Letting Go',
    quote: 'Only by releasing the old can the arms be open to receive the new.',
    traditions: [
      { culture: 'Celtic', text: 'The Last Quarter was the beginning of the "dying time" in Celtic tradition — a holy threshold when the old cycle surrenders to make way for the new. Crone goddesses like the Morrigan were honored here.' },
      { culture: 'Mesoamerican Aztec', text: 'Aztec priests performed elaborate release ceremonies at the Last Quarter, burning effigies of what needed to be cleared — old debts, old grudges, old patterns. Smoke carried prayers to the gods.' },
      { culture: 'Tibetan Buddhist', text: 'Tibetan practice emphasizes the Last Quarter as a profound time for repentance, purification, and renewing vows. Monks perform "Sojong" — confession rituals — in alignment with this phase.' },
      { culture: 'Hoodoo Southern American', text: 'In Hoodoo tradition, the Last Quarter is the premier time for banishing and uncrossing work — breaking hexes, clearing obstacles, and cutting cords with people or situations that have drained energy.' },
    ],
    ritual: 'Write on paper what habits, relationships, or thought patterns you are releasing. Read each one aloud, then safely burn or tear the paper. Release without guilt.',
    omens: 'A Last Quarter moon appearing through mist or cloud is said to be "veiled" — a sign that something obscured is now being uncovered in your life. Pay attention to what comes to light.',
  },
  // Waning Crescent
  {
    phase: 'Waning Crescent',
    title: 'The Dreamtime',
    quote: 'Rest is not absence of power — it is the source from which all power is drawn.',
    traditions: [
      { culture: 'Ancient Sumerian', text: 'The waning crescent was called "the moon at rest" by Sumerian astronomers. The moon-god Nanna was said to retreat to the underworld to render judgment of the dead, and the living were advised to respect this sacred absence.' },
      { culture: 'Sufi Islamic', text: 'Sufi mystics honor the balsamic (waning crescent) moon as a time of divine intimacy. The thinning crescent mirrors the thinning of the ego — the closer to the dark moon, the closer to union with the infinite.' },
      { culture: 'Polynesian', text: 'Polynesian navigators paid the closest attention to the waning crescent — its angle and color revealed ocean currents invisible to the naked eye. The crescent was a sacred map, and its reader a priest as much as a sailor.' },
      { culture: 'European Witch Tradition', text: 'Witches\' wisdom holds the waning crescent as the Crone\'s own moon — a time for banishing the very last of what needs to go, resting in the void, and beginning to dream the next cycle into being.' },
    ],
    ritual: 'Dedicate this time to sleep, meditation, and journaling dreams. Let the body rest deeply. The answers you seek are forming in the darkness — they will emerge with the New Moon.',
    omens: 'If the waning crescent is clearly visible just before sunrise, old sailors called it "the old moon in the new moon\'s arms" — a sign of calm seas and safe passage ahead.',
  },
]

export function getFolkloreForPhase(phaseName) {
  return LUNAR_FOLKLORE.find(f => f.phase === phaseName) || LUNAR_FOLKLORE[0]
}

export { ZODIAC }
