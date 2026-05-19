'use client'
import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = glowRef.current
    if (!el) return

    if (window.matchMedia('(pointer: coarse)').matches) {
      el.style.display = 'none'
      return
    }

    const move = (e: MouseEvent) => {
      el.style.left = e.clientX + 'px'
      el.style.top = e.clientY + 'px'
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-[999] -translate-x-1/2 -translate-y-1/2"
      style={{
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, oklch(68% 0.11 82 / 0.035) 0%, transparent 70%)',
        transition: 'left 0.12s ease-out, top 0.12s ease-out',
      }}
    />
  )
}
