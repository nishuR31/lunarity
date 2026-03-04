import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    let rx = 0, ry = 0
    let mx = 0, my = 0
    let raf

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = mx + 'px'
        dotRef.current.style.top = my + 'px'
      }
    }

    const animate = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px'
        ringRef.current.style.top = ry + 'px'
      }
      raf = requestAnimationFrame(animate)
    }

    const onDown = () => {
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%, -50%) scale(0.7)'
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)'
    }
    const onUp = () => {
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
    }

    const onEnterLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '52px'
        ringRef.current.style.height = '52px'
        ringRef.current.style.borderColor = 'rgba(220, 160, 255, 0.8)'
        ringRef.current.style.background = 'rgba(160, 80, 255, 0.08)'
      }
    }
    const onLeaveLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '36px'
        ringRef.current.style.height = '36px'
        ringRef.current.style.borderColor = 'rgba(180, 100, 255, 0.5)'
        ringRef.current.style.background = 'transparent'
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    document.querySelectorAll('a, button, [role=button], input').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', zIndex: 99999, pointerEvents: 'none',
          width: 6, height: 6, borderRadius: '50%',
          background: 'rgba(220, 180, 255, 0.95)',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 8px rgba(200, 140, 255, 0.8)',
          transition: 'transform 0.1s ease',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed', zIndex: 99998, pointerEvents: 'none',
          width: 36, height: 36, borderRadius: '50%',
          border: '1px solid rgba(180, 100, 255, 0.5)',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease, transform 0.15s ease',
        }}
      />
    </>
  )
}
