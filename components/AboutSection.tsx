'use client'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const stats = [
  { value: '+500', label: 'Eventos realizados' },
  { value: '+15', label: 'Años de experiencia' },
  { value: '100%', label: 'Clientes satisfechos' },
]

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="sobre-mi" ref={ref} className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src="https://assets.cdn.filesafe.space/F222CaBt1UL1aluI2C1k/media/6a04af9d06993a27a31256e6.jpeg"
              alt="Martín Delgado"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent" />
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-gold/40" />
          <div className="absolute -top-4 -left-4 w-24 h-24 border border-gold/20" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Sobre mí</p>
          <h2 className="font-display text-5xl text-cream font-light leading-tight mb-8">
            Martín
            <br />
            <em className="text-gold">Delgado</em>
          </h2>
          <p className="text-cream/70 leading-relaxed mb-6">
            Mago profesional especializado en crear experiencias únicas e irrepetibles.
            Cada actuación está diseñada para sorprender, emocionar y dejar una huella
            imborrable en los momentos más especiales de tu vida.
          </p>
          <p className="text-cream/70 leading-relaxed mb-12">
            Desde íntimas celebraciones familiares hasta grandes eventos corporativos,
            adapto cada espectáculo para que se convierta en el recuerdo más mágico del evento.
          </p>
          <div className="grid grid-cols-3 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="border-t border-gold/30 pt-4">
                <div className="font-display text-3xl text-gold">{s.value}</div>
                <div className="text-cream/50 text-xs tracking-wider mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
