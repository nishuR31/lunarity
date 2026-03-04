import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

const links = [
  { to: '/', label: 'Today' },
  { to: '/explorer', label: 'Explorer' },
  { to: '/calendar', label: 'Calendar' },
  { to: '/zodiac', label: 'Zodiac' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 640) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '0 20px',
        background: scrolled || open ? 'rgba(5,0,8,0.92)' : 'transparent',
        backdropFilter: scrolled || open ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled || open ? 'blur(20px)' : 'none',
        borderBottom: scrolled || open ? '1px solid rgba(140,60,220,0.15)' : '1px solid transparent',
        transition: 'all 0.4s ease',
        height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <NavLink to="/" onClick={() => setOpen(false)}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22 }}>&#127769;</span>
          <span style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 18, color: '#d4baff', letterSpacing: 1, fontWeight: 600 }}>
            Lunarity
          </span>
        </NavLink>

        <div style={{ display: 'flex', gap: 2 }} className="desktop-nav">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <button onClick={() => setOpen(o => !o)} className="hamburger-btn"
          style={{ background: 'none', border: '1px solid rgba(140,60,220,0.3)', borderRadius: 10,
            padding: '8px 10px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 5 }}>
          {[0,1,2].map((i) => (
            <span key={i} style={{
              display: 'block', width: 20, height: 2, background: '#c8a0ff', borderRadius: 2,
              transition: 'all 0.3s ease',
              transform: open ? (i===0 ? 'rotate(45deg) translate(5px,5px)' : i===2 ? 'rotate(-45deg) translate(5px,-5px)' : 'scaleX(0)') : 'none',
              opacity: open && i===1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      <div style={{
        position: 'fixed', top: 60, left: 0, right: 0, zIndex: 999,
        background: 'rgba(5,0,12,0.97)',
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(140,60,220,0.2)',
        padding: open ? '16px 20px 20px' : '0 20px',
        maxHeight: open ? '320px' : '0',
        overflow: 'hidden',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        {links.map((l, i) => (
          <NavLink key={l.to} to={l.to} end={l.to === '/'}
            onClick={() => setOpen(false)}
            className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            style={{ display: 'block', padding: '12px 16px',
              opacity: open ? 1 : 0,
              transform: open ? 'translateX(0)' : 'translateX(-12px)',
              transition: 'all 0.3s ease ' + (i * 50) + 'ms',
            }}>
            {l.label}
          </NavLink>
        ))}
      </div>

      {open && <div onClick={() => setOpen(false)}
        style={{ position: 'fixed', inset: 0, zIndex: 998, background: 'rgba(0,0,0,0.4)' }} />}

      <style>{`
        .desktop-nav { display: none !important; }
        .hamburger-btn { display: flex !important; }
        @media (min-width: 640px) {
          .desktop-nav { display: flex !important; }
          .hamburger-btn { display: none !important; }
        }
      `}</style>
    </>
  )
}
