'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'

const titles = ['bodas', 'comuniones', 'empresas', 'aniversarios', 'momentos únicos']

function RotatingWord() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % titles.length), 2500)
    return () => clearInterval(timer)
  }, [])

  return (
    <span
      className="inline-block relative overflow-hidden"
      style={{ height: '1.05em', verticalAlign: 'bottom' }}
    >
      <AnimatePresence mode="wait">
        <motion.em
          key={index}
          className="text-gold italic block"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 50, damping: 14 }}
        >
          {titles[index]}
        </motion.em>
      </AnimatePresence>
    </span>
  )
}

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="contacto"
      ref={ref}
      className="py-40 px-6"
      style={{ background: 'oklch(6% 0.015 275)' }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="text-[9px] tracking-[0.6em] uppercase font-sans font-light mb-10"
            style={{ color: 'oklch(76% 0.18 72)' }}
          >
            Contacto
          </p>

          <h2
            className="font-display font-light text-cream leading-[0.92] mb-16"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', letterSpacing: '-0.02em' }}
          >
            Creamos magia
            <br />
            para <RotatingWord />
          </h2>

          <div className="w-12 h-px mx-auto mb-10" style={{ background: 'oklch(76% 0.18 72 / 0.35)' }} />

          <p
            className="leading-relaxed mb-16 max-w-sm mx-auto text-sm font-sans font-light tracking-wide"
            style={{ color: 'oklch(97% 0.005 80 / 0.45)' }}
          >
            Cuéntame qué tienes en mente. Te preparo una propuesta
            personalizada sin ningún compromiso.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Primary — gradient fill */}
            <a
              href="https://wa.me/34XXXXXXXXX"
              className="inline-flex items-center justify-center text-[10px] tracking-[0.4em] uppercase font-sans font-semibold px-14 py-5 transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, oklch(76% 0.18 72) 0%, oklch(66% 0.20 52) 100%)',
                color: 'oklch(6% 0.015 265)',
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
              WhatsApp
            </a>
            {/* Secondary — gradient border */}
            <a
              href="mailto:martin@magomartindelgado.com"
              className="inline-flex items-center justify-center text-[10px] tracking-[0.4em] uppercase font-sans font-light px-14 py-5 transition-all duration-500"
              style={{
                background:
                  'linear-gradient(oklch(7% 0.018 265), oklch(7% 0.018 265)) padding-box, linear-gradient(135deg, oklch(76% 0.18 72), oklch(66% 0.20 52)) border-box',
                border: '1px solid transparent',
                color: 'oklch(76% 0.18 72)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  'linear-gradient(oklch(10% 0.022 265), oklch(10% 0.022 265)) padding-box, linear-gradient(135deg, oklch(76% 0.18 72), oklch(66% 0.20 52)) border-box'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  'linear-gradient(oklch(7% 0.018 265), oklch(7% 0.018 265)) padding-box, linear-gradient(135deg, oklch(76% 0.18 72), oklch(66% 0.20 52)) border-box'
              }}
            >
              Enviar email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

