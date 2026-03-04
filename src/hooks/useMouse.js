import { useState, useEffect } from 'react'

export function useMouse() {
  const [pos, setPos] = useState({ x: 0, y: 0, nx: 0, ny: 0 })

  useEffect(() => {
    const onMove = (e) => {
      setPos({
        x: e.clientX,
        y: e.clientY,
        nx: (e.clientX / window.innerWidth - 0.5) * 2,   // -1 to 1
        ny: (e.clientY / window.innerHeight - 0.5) * 2,  // -1 to 1
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return pos
}
