'use client'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const services = [
  {
    num: 'I',
    title: 'Bodas',
    desc: 'Un espectáculo a medida para el día más importante. Magia entre mesa y mesa, show nupcial y momentos únicos que los invitados recordarán siempre.',
  },
  {
    num: 'II',
    title: 'Comuniones',
    desc: 'Magia adaptada para los más pequeños y sus familias. Espectáculos participativos, cercanos y llenos de asombro genuino.',
  },
  {
    num: 'III',
    title: 'Eventos de empresa',
    desc: 'Team building mágico, gala de empresa o presentación de producto. La magia une equipos y convierte cualquier evento corporativo en algo extraordinario.',
  },
  {
    num: 'IV',
    title: 'Eventos privados',
    desc: 'Cumpleaños, aniversarios, reuniones familiares. Un espectáculo íntimo y personalizado para celebrar lo que merece ser especial.',
  },
]

export default function ServicesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="servicios" ref={ref} className="py-32 bg-[oklch(7%_0.012_275)]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <p className="text-gold text-[10px] tracking-[0.5em] uppercase mb-5">Servicios</p>
          <h2 className="font-display text-6xl text-cream font-light">
            Magia para <em className="text-gold">cada momento</em>
          </h2>
        </motion.div>

        <div>
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <div className="border-t border-gold/15 py-10 grid grid-cols-[4rem_1fr] md:grid-cols-[6rem_1fr_20rem] gap-6 md:gap-12 items-start group-hover:border-gold/40 transition-colors duration-500">
                <span
                  className="font-display text-gold/30 font-light group-hover:text-gold/60 transition-colors duration-500"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                >
                  {s.num}
                </span>
                <h3
                  className="font-display text-cream font-light group-hover:text-gold transition-colors duration-500 leading-tight"
                  style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)' }}
                >
                  {s.title}
                </h3>
                <p className="text-cream/50 text-sm leading-relaxed font-sans font-light tracking-wide hidden md:block mt-2">
                  {s.desc}
                </p>
              </div>
              <p className="text-cream/50 text-sm leading-relaxed font-sans font-light tracking-wide md:hidden px-0 pb-8">
                {s.desc}
              </p>
            </motion.div>
          ))}
          <div className="border-t border-gold/15" />
        </div>
      </div>
    </section>
  )
}
