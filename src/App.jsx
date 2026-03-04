import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Cursor from './components/Cursor'
import { StarField, FloatingOrbs, GridOverlay, Scanline } from './components/Background'
import { useMouse } from './hooks/useMouse'
import Home from './pages/Home'
import Explorer from './pages/Explorer'
import Calendar from './pages/Calendar'
import Zodiac from './pages/Zodiac'
import About from './pages/About'

export default function App() {
  const mouse = useMouse()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <>
      <StarField />
      <FloatingOrbs mouseNX={mouse.nx} mouseNY={mouse.ny} />
      <GridOverlay />
      <Scanline />

      {/* Mouse glow — desktop only */}
      <div style={{
        position: 'fixed', zIndex: 1, pointerEvents: 'none',
        left: mouse.x - 180, top: mouse.y - 180,
        width: 360, height: 360, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(160,80,255,0.05) 0%, transparent 70%)',
        transition: 'left 0.04s linear, top 0.04s linear',
      }} />

      <Cursor />
      <Navbar />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/zodiac" element={<Zodiac />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      <footer style={{
        position: 'relative', zIndex: 2,
        borderTop: '1px solid rgba(100,40,180,0.15)',
        padding: '24px 16px', textAlign: 'center',
        fontFamily: 'Courier New, monospace', fontSize: 10,
        letterSpacing: 2, color: 'rgba(130,70,200,0.3)',
      }}>
        LUNARITY &middot; LUNAR OBSERVATORY
      </footer>
    </>
  )
}
