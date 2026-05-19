'use client'
import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'motion/react'

const links = [
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#showreel', label: 'Showreel' },
  { href: '#contacto', label: 'Contacto' },
]

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 60))

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between transition-all duration-700"
      style={{
        background: scrolled
          ? 'oklch(5% 0.012 275 / 0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid oklch(68% 0.11 82 / 0.1)' : '1px solid transparent',
      }}
    >
      <span
        className="font-display text-gold tracking-[0.2em] uppercase font-light"
        style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)' }}
      >
        Martín Delgado
      </span>

      <ul className="hidden md:flex gap-10">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-[10px] tracking-[0.35em] uppercase font-sans font-light transition-colors duration-300"
              style={{ color: 'oklch(95% 0.01 80 / 0.55)' }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = 'oklch(68% 0.11 82)')
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = 'oklch(95% 0.01 80 / 0.55)')
              }
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#contacto"
        className="text-[10px] tracking-[0.35em] uppercase font-sans font-light px-6 py-3 transition-all duration-500"
        style={{
          border: '1px solid oklch(68% 0.11 82 / 0.5)',
          color: 'oklch(68% 0.11 82)',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget
          el.style.background = 'oklch(68% 0.11 82)'
          el.style.color = 'oklch(5% 0.012 275)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget
          el.style.background = 'transparent'
          el.style.color = 'oklch(68% 0.11 82)'
        }}
      >
        Contratar
      </a>
    </motion.nav>
  )
}
