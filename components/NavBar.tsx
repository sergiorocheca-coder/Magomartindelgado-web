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
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-500 ${
        scrolled ? 'bg-bg/80 backdrop-blur-md border-b border-gold/10' : ''
      }`}
    >
      <span className="font-display text-xl text-gold tracking-widest uppercase">
        Martín Delgado
      </span>
      <ul className="hidden md:flex gap-8">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-sm tracking-widest uppercase text-cream/70 hover:text-gold transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="#contacto"
        className="border border-gold/60 text-gold text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-gold hover:text-bg transition-all duration-300"
      >
        Contratar
      </a>
    </motion.nav>
  )
}
