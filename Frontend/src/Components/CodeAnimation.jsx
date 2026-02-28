import React, { useEffect, useRef, useState } from 'react'

export default function CodeAnimation() {
  const symbols = ['{', '}', '<', '>', '/', '(', ')', '[', ']', ';', '=', '+', '-', '*', '#', '$', '&', '|', '~', '@', '...', '=>', '!=', '==', '++', '--']
  const containerRef = useRef(null)
  const [positions, setPositions] = useState(symbols.map(() => ({
    left: Math.random() * 100,
    top: Math.random() * 100
  })))
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const symbolElements = containerRef.current?.querySelectorAll('.code-symbol')
      symbolElements?.forEach((symbol, i) => {
        const rect = symbol.getBoundingClientRect()
        const x = rect.left + rect.width / 2
        const y = rect.top + rect.height / 2
        const distance = Math.sqrt((e.clientX - x) ** 2 + (e.clientY - y) ** 2)
        
        if (distance < 80) {
          setPositions(prev => {
            const newPos = [...prev]
            newPos[i] = {
              left: Math.random() * 100,
              top: Math.random() * 100
            }
            return newPos
          })
        }
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {symbols.map((symbol, i) => (
        <div
          key={i}
          className="code-symbol absolute text-6xl font-extralight opacity-[0.06] transition-all duration-[1500ms] ease-[cubic-bezier(0.4,0,0.2,1)] blur-[1px] animate-float-smooth"
          style={{
            left: `${positions[i].left}%`,
            top: `${positions[i].top}%`,
            color: `hsl(${210 + Math.random() * 40}, 80%, 65%)`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${12 + Math.random() * 8}s`
          }}
        >
          {symbol}
        </div>
      ))}
    </div>
  )
}
