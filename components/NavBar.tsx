'use client'
import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'motion/react'
import MobileNav from '@/components/MobileNav'

const links = [
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#showreel', label: 'Showreel' },
  { href: '#contacto', label: 'Contacto' },
]

function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
      className="md:hidden flex flex-col justify-center items-end gap-[5px] w-8 h-8 cursor-pointer"
    >
      <span
        className="block h-px transition-all duration-400 origin-right"
        style={{
          width: open ? '100%' : '100%',
          background: 'oklch(76% 0.18 72)',
          transform: open ? 'rotate(-45deg) translateY(0.5px)' : 'none',
          transformOrigin: 'right center',
        }}
      />
      <span
        className="block h-px transition-all duration-400"
        style={{
          width: open ? '0%' : '70%',
          background: 'oklch(76% 0.18 72)',
          opacity: open ? 0 : 1,
        }}
      />
      <span
        className="block h-px transition-all duration-400 origin-right"
        style={{
          width: open ? '100%' : '45%',
          background: 'oklch(76% 0.18 72)',
          transform: open ? 'rotate(45deg) translateY(-0.5px)' : 'none',
          transformOrigin: 'right center',
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
        className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between transition-all duration-700"
        style={{
          background: scrolled ? 'oklch(6% 0.015 265 / 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid oklch(76% 0.18 72 / 0.1)' : '1px solid transparent',
        }}
      >
        {/* Brand wordmark */}
        <a href="#" className="group flex flex-col gap-[3px]">
          <span
            className="font-display font-light tracking-[0.22em] uppercase text-cream transition-colors duration-300 group-hover:text-gold"
            style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)', lineHeight: 1 }}
          >
            Martín Delgado
          </span>
          <span
            className="font-sans font-light tracking-[0.55em] uppercase"
            style={{ fontSize: '0.48rem', color: 'oklch(76% 0.18 72)', lineHeight: 1 }}
          >
            Mago profesional
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[10px] tracking-[0.35em] uppercase font-sans font-light transition-colors duration-300"
                style={{ color: 'oklch(97% 0.005 80 / 0.55)' }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = 'oklch(76% 0.18 72)')
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = 'oklch(97% 0.005 80 / 0.55)')
                }
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: CTA (desktop) + Hamburger (mobile) */}
        <div className="flex items-center gap-4">
          <a
            href="#contacto"
            className="hidden md:inline-block text-[10px] tracking-[0.35em] uppercase font-sans font-light px-6 py-3 transition-all duration-500"
            style={{ border: '1px solid oklch(76% 0.18 72 / 0.5)', color: 'oklch(76% 0.18 72)' }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.background = 'oklch(76% 0.18 72)'
              el.style.color = 'oklch(6% 0.015 265)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.background = 'transparent'
              el.style.color = 'oklch(76% 0.18 72)'
            }}
          >
            Contratar
          </a>
          <Hamburger open={mobileOpen} onClick={() => setMobileOpen((v) => !v)} />
        </div>
      </motion.nav>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}

