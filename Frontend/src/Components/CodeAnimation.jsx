import React, { useEffect, useRef } from 'react'

const SYMBOLS = ['{', '}', '</', '>', '/>', '()', '=>', '[]', '&&', '||', '!=', '===', '++', '...', '#', '@', '~']

const rand = (min, max) => Math.random() * (max - min) + min

export default function CodeAnimation() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let W, H

    // Particles
    const PARTICLE_COUNT = 60
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: rand(0, window.innerWidth),
      y: rand(0, window.innerHeight),
      r: rand(0.5, 2),
      vx: rand(-0.15, 0.15),
      vy: rand(-0.2, -0.05),
      alpha: rand(0.2, 0.6),
    }))

    // Code symbols
    const CODE_COUNT = 18
    const codeItems = Array.from({ length: CODE_COUNT }, (_, i) => ({
      text: SYMBOLS[i % SYMBOLS.length],
      x: rand(0, window.innerWidth),
      y: rand(0, window.innerHeight),
      vy: rand(0.08, 0.22),
      alpha: rand(0.04, 0.1),
      size: rand(13, 26),
      hue: rand(130, 160),
    }))

    // Orbs
    const orbs = [
      { x: 0.15, y: 0.2,  r: 280, hue: 145, alpha: 0.07 },
      { x: 0.85, y: 0.75, r: 320, hue: 200, alpha: 0.05 },
      { x: 0.5,  y: 0.5,  r: 200, hue: 160, alpha: 0.04 },
    ]

    function resize() {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function drawGrid() {
      const gap = 60
      ctx.strokeStyle = 'rgba(34,197,94,0.04)'
      ctx.lineWidth = 0.5
      for (let x = 0; x < W; x += gap) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = 0; y < H; y += gap) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }
    }

    function drawOrbs() {
      orbs.forEach(o => {
        const grd = ctx.createRadialGradient(o.x * W, o.y * H, 0, o.x * W, o.y * H, o.r)
        grd.addColorStop(0, `hsla(${o.hue},80%,55%,${o.alpha})`)
        grd.addColorStop(1, 'transparent')
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(o.x * W, o.y * H, o.r, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    function drawParticles() {
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(74,222,128,${p.alpha})`
        ctx.fill()
        p.x += p.vx
        p.y += p.vy
        if (p.y < -5) { p.y = H + 5; p.x = rand(0, W) }
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
      })
    }

    function drawCode() {
      codeItems.forEach(c => {
        ctx.font = `${c.size}px monospace`
        ctx.fillStyle = `hsla(${c.hue},70%,60%,${c.alpha})`
        ctx.fillText(c.text, c.x, c.y)
        c.y += c.vy
        if (c.y > H + 30) { c.y = -30; c.x = rand(0, W) }
      })
    }

    function drawScanline(t) {
      const y = (t * 0.04) % H
      const grd = ctx.createLinearGradient(0, y - 60, 0, y + 60)
      grd.addColorStop(0, 'transparent')
      grd.addColorStop(0.5, 'rgba(74,222,128,0.025)')
      grd.addColorStop(1, 'transparent')
      ctx.fillStyle = grd
      ctx.fillRect(0, y - 60, W, 120)
    }

    let t = 0
    function loop() {
      ctx.clearRect(0, 0, W, H)
      drawGrid()
      drawOrbs()
      drawScanline(t)
      drawParticles()
      drawCode()
      t++
      animId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  )
}
