'use client'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const stats = [
  { value: '+500', label: 'Eventos realizados' },
  { value: '+15', label: 'Años de experiencia' },
  { value: '100%', label: 'Satisfacción garantizada' },
]

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="sobre-mi" ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Decorative large text background */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-light text-gold/[0.04] select-none pointer-events-none leading-none"
        style={{ fontSize: 'clamp(8rem, 20vw, 20rem)' }}
        aria-hidden
      >
        Martín
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-20 items-center relative">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src="https://assets.cdn.filesafe.space/F222CaBt1UL1aluI2C1k/media/6a04af9d06993a27a31256e6.jpeg"
              alt="Martín Delgado"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, oklch(5% 0.012 275 / 0.7) 0%, transparent 50%)',
              }}
            />
          </div>
          {/* Corner accents */}
          <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b border-r border-gold/30" />
          <div className="absolute -top-3 -left-3 w-16 h-16 border-t border-l border-gold/20" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-gold text-[10px] tracking-[0.5em] uppercase mb-6 font-sans font-light">
            Sobre mí
          </p>
          <h2
            className="font-display text-cream font-light leading-[0.95] mb-10"
            style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)' }}
          >
            Martín
            <br />
            <em className="text-gold">Delgado</em>
          </h2>
          <div className="w-12 h-px bg-gold/40 mb-10" />
          <p className="text-cream/60 leading-relaxed mb-6 text-sm font-sans font-light tracking-wide">
            Mago profesional especializado en crear experiencias únicas e irrepetibles.
            Cada actuación está diseñada para sorprender, emocionar y dejar una huella
            imborrable en los momentos más especiales de tu vida.
          </p>
          <p className="text-cream/60 leading-relaxed mb-14 text-sm font-sans font-light tracking-wide">
            Desde íntimas celebraciones familiares hasta grandes eventos corporativos,
            adapto cada espectáculo para convertirlo en el recuerdo más mágico del evento.
          </p>
          <div className="grid grid-cols-3 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="border-t border-gold/20 pt-5">
                <div className="font-display text-3xl text-gold font-light">{s.value}</div>
                <div className="text-cream/40 text-[10px] tracking-widest uppercase mt-2 font-sans font-light">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
