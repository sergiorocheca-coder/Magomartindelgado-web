'use client'
import { motion, AnimatePresence } from 'motion/react'

const links = [
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#showreel', label: 'Showreel' },
  { href: '#contacto', label: 'Contacto' },
]

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

export default function MobileNav({ open, onClose }: MobileNavProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ background: 'oklch(6% 0.015 265 / 0.6)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.nav
            className="fixed top-0 right-0 bottom-0 z-50 flex flex-col justify-center px-12"
            style={{
              width: 'min(320px, 85vw)',
              background: 'oklch(8% 0.016 265 / 0.97)',
              backdropFilter: 'blur(24px)',
              borderLeft: '1px solid oklch(76% 0.18 72 / 0.08)',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="flex flex-col gap-8">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={onClose}
                    className="font-display font-light text-cream block transition-colors duration-300 hover:text-gold"
                    style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', letterSpacing: '-0.01em' }}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-16">
              <a
                href="#contacto"
                onClick={onClose}
                className="inline-block text-[9px] tracking-[0.5em] uppercase font-sans font-light px-10 py-4 transition-all duration-500"
                style={{ border: '1px solid oklch(76% 0.18 72 / 0.45)', color: 'oklch(76% 0.18 72)' }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'oklch(76% 0.18 72)'
                  el.style.color = 'oklch(6% 0.015 265)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'transparent'
                  el.style.color = 'oklch(76% 0.18 72)'
                }}
              >
                Contratar
              </a>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}

