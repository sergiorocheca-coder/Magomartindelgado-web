'use client'
import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'motion/react'
import MobileNav from '@/components/MobileNav'

const navLinks = [
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#showreel', label: 'En acción' },
  { href: '#contacto', label: 'Contacto' },
]

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
          background: scrolled ? 'oklch(6% 0.015 265 / 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid oklch(76% 0.18 72 / 0.08)'
            : '1px solid transparent',
        }}
      >
        <div className="px-8 py-4 flex items-center justify-between">
          {/* Logo — LEFT, animated entrance */}
          <motion.a
            href="#"
            className="shrink-0"
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="/logo-martin-navbar.png"
              alt="Mago Martín Delgado"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </motion.a>

          {/* Right side — nav links + CTA + hamburger */}
          <div className="flex items-center gap-8">
            {/* Nav links — desktop only */}
            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((l) => (
                <AnimatedNavLink key={l.href} href={l.href} label={l.label} />
              ))}
            </ul>

            {/* Contratar CTA — desktop only */}
            <a
              href="#contacto"
              className="hidden md:inline-block text-[9px] tracking-[0.4em] uppercase font-sans font-semibold px-6 py-2.5 transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, oklch(76% 0.18 72) 0%, oklch(66% 0.20 52) 100%)',
                color: 'oklch(6% 0.015 265)',
                borderRadius: '6px',
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
