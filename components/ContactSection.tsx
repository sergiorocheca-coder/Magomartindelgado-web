'use client'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contacto" ref={ref} className="py-40 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-gold text-[10px] tracking-[0.5em] uppercase mb-6 font-sans font-light">
            Contacto
          </p>
          <h2
            className="font-display text-cream font-light leading-[0.95] mb-8"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            ¿Hablamos sobre
            <br />
            <em className="text-gold">tu evento?</em>
          </h2>
          <div className="w-16 h-px mx-auto mb-10" style={{ background: 'oklch(68% 0.11 82 / 0.4)' }} />
          <p
            className="leading-relaxed mb-16 max-w-sm mx-auto text-sm font-sans font-light tracking-wide"
            style={{ color: 'oklch(95% 0.01 80 / 0.5)' }}
          >
            Cuéntame qué tienes en mente. Te preparo una propuesta
            personalizada sin ningún compromiso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/34XXXXXXXXX"
              className="inline-flex items-center justify-center text-[10px] tracking-[0.4em] uppercase font-sans font-semibold px-12 py-5 transition-all duration-500"
              style={{ background: 'oklch(68% 0.11 82)', color: 'oklch(5% 0.012 275)' }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = 'oklch(79% 0.13 82)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = 'oklch(68% 0.11 82)')
              }
            >
              WhatsApp
            </a>
            <a
              href="mailto:martin@magomartindelgado.com"
              className="inline-flex items-center justify-center text-[10px] tracking-[0.4em] uppercase font-sans font-light px-12 py-5 transition-all duration-500"
              style={{
                border: '1px solid oklch(68% 0.11 82 / 0.5)',
                color: 'oklch(68% 0.11 82)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'oklch(68% 0.11 82 / 0.08)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'transparent'
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
