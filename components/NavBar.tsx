'use client'
import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'motion/react'
import MobileNav from '@/components/MobileNav'

const leftLinks = [
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#servicios', label: 'Servicios' },
]

const rightLinks = [
  { href: '#showreel', label: 'Showreel' },
  { href: '#contacto', label: 'Contacto' },
]

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <a href={href} className="relative group inline-block py-1">
        <span
          className="text-[10px] tracking-[0.35em] uppercase font-sans font-light transition-colors duration-300 group-hover:text-gold"
          style={{ color: 'oklch(97% 0.005 80 / 0.55)' }}
        >
          {label}
        </span>
        {/* Animated underline */}
        <span
          className="absolute bottom-0 left-0 h-px transition-all duration-300 ease-out"
          style={{
            width: '0%',
            background: 'oklch(76% 0.18 72)',
          }}
          aria-hidden
          // CSS hover handled via parent group
        />
      </a>
    </li>
  )
}

function AnimatedNavLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <li>
      <a
        href={href}
        className="relative inline-block py-1"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span
          className="text-[10px] tracking-[0.35em] uppercase font-sans font-light transition-colors duration-300"
          style={{ color: hovered ? 'oklch(76% 0.18 72)' : 'oklch(97% 0.005 80 / 0.55)' }}
        >
          {label}
        </span>
        <motion.span
          className="absolute bottom-0 left-0 h-px"
          style={{ background: 'oklch(76% 0.18 72)' }}
          initial={{ width: '0%' }}
          animate={{ width: hovered ? '100%' : '0%' }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        />
      </a>
    </li>
  )
}

function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
      className="md:hidden flex flex-col justify-center items-end gap-[5px] w-8 h-8 cursor-pointer"
    >
      <span
        className="block h-px transition-all duration-300"
        style={{
          width: '100%',
          background: 'oklch(76% 0.18 72)',
          transform: open ? 'rotate(-45deg) translateY(6px)' : 'none',
        }}
      />
      <span
        className="block h-px transition-all duration-300"
        style={{
          width: '70%',
          background: 'oklch(76% 0.18 72)',
          opacity: open ? 0 : 1,
          transform: open ? 'scaleX(0)' : 'scaleX(1)',
        }}
      />
      <span
        className="block h-px transition-all duration-300"
        style={{
          width: open ? '100%' : '45%',
          background: 'oklch(76% 0.18 72)',
          transform: open ? 'rotate(45deg) translateY(-6px)' : 'none',
        }}
      />
    </button>
  )
}

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 60))

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          background: scrolled ? 'oklch(6% 0.015 265 / 0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid oklch(76% 0.18 72 / 0.08)' : '1px solid transparent',
        }}
      >
        <div className="px-8 py-4 flex items-center justify-between relative">

          {/* Left links — desktop only */}
          <ul className="hidden md:flex items-center gap-10">
            {leftLinks.map((l) => (
              <AnimatedNavLink key={l.href} href={l.href} label={l.label} />
            ))}
          </ul>

          {/* Center logo — absolute centered on desktop, left on mobile */}
          <a
            href="#"
            className="flex flex-col items-center gap-[3px] group md:absolute md:left-1/2 md:-translate-x-1/2"
          >
            <span
              className="font-display font-light tracking-[0.25em] uppercase transition-colors duration-300 group-hover:text-gold"
              style={{
                color: 'oklch(97% 0.005 80)',
                fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
                lineHeight: 1,
              }}
            >
              Martín Delgado
            </span>
            <span
              className="font-sans font-light tracking-[0.6em] uppercase hidden md:block"
              style={{ fontSize: '0.45rem', color: 'oklch(76% 0.18 72)', lineHeight: 1 }}
            >
              Mago profesional
            </span>
          </a>

          {/* Right: links + CTA + hamburger */}
          <div className="flex items-center gap-10">
            <ul className="hidden md:flex items-center gap-10">
              {rightLinks.map((l) => (
                <AnimatedNavLink key={l.href} href={l.href} label={l.label} />
              ))}
            </ul>

            {/* Gradient CTA */}
            <a
              href="#contacto"
              className="hidden md:inline-block text-[9px] tracking-[0.4em] uppercase font-sans font-semibold px-6 py-2.5 transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, oklch(76% 0.18 72) 0%, oklch(66% 0.20 52) 100%)',
                color: 'oklch(6% 0.015 265)',
                borderRadius: '3px',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  'linear-gradient(135deg, oklch(84% 0.16 74) 0%, oklch(76% 0.18 72) 100%)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  'linear-gradient(135deg, oklch(76% 0.18 72) 0%, oklch(66% 0.20 52) 100%)'
              }}
            >
              Contratar
            </a>

            <Hamburger open={mobileOpen} onClick={() => setMobileOpen((v) => !v)} />
          </div>
        </div>
      </motion.nav>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
