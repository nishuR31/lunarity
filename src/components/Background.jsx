import { useEffect, useRef } from 'react'

export function StarField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.2,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      pulse: Math.random() * Math.PI * 2,
      speed: 0.008 + Math.random() * 0.015,
    }))

    let raf
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      stars.forEach((s) => {
        s.pulse += s.speed
        s.x += s.vx
        s.y += s.vy
        if (s.x < 0) s.x = w
        if (s.x > w) s.x = 0
        if (s.y < 0) s.y = h
        if (s.y > h) s.y = 0
        const alpha = 0.25 + 0.55 * Math.abs(Math.sin(s.pulse))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(210, 175, 255, ${alpha})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}

export function FloatingOrbs({ mouseNX = 0, mouseNY = 0 }) {
  const orbs = [
    { w: 700, h: 700, left: '5%',  top: '5%',  color: 'rgba(110,30,190,0.16)', dur: 12, dx: 22, dy: 18 },
    { w: 520, h: 520, left: '55%', top: '45%', color: 'rgba(70,0,150,0.20)',   dur: 16, dx: -18, dy: -14 },
    { w: 380, h: 380, left: '25%', top: '65%', color: 'rgba(150,60,240,0.10)', dur: 20, dx: 14, dy: 12 },
    { w: 280, h: 280, left: '78%', top: '8%',  color: 'rgba(50,0,110,0.18)',   dur: 14, dx: -26, dy: 20 },
  ]

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {orbs.map((orb, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            width: orb.w,
            height: orb.h,
            left: orb.left,
            top: orb.top,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 68%)`,
            transform: `translate(${mouseNX * orb.dx}px, ${mouseNY * orb.dy}px)`,
            transition: 'transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            animation: `orbFloat ${orb.dur}s ease-in-out infinite`,
            animationDelay: `${i * 2.5}s`,
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  )
}

export function GridOverlay() {
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage:
          'linear-gradient(rgba(120,40,200,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(120,40,200,0.035) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
      }}
    />
  )
}

export function Scanline() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
      <div
        className="animate-scanline"
        style={{
          position: 'absolute', left: 0, right: 0, height: '2px',
          background: 'linear-gradient(transparent, rgba(180,100,255,0.035), transparent)',
        }}
      />
    </div>
  )
}
