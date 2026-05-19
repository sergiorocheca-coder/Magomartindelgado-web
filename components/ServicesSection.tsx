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
  const headerRef = useRef(null)
  const gridRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })
  const gridInView = useInView(gridRef, { once: true, margin: '-40px' })

  return (
    <section id="servicios" className="py-32" style={{ background: 'oklch(8% 0.016 265)' }}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <p
            className="text-[9px] tracking-[0.6em] uppercase font-sans font-light mb-5"
            style={{ color: 'oklch(76% 0.18 72)' }}
          >
            Servicios
          </p>
          <h2
            className="font-display font-light text-cream"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', letterSpacing: '-0.02em' }}
          >
            Magia para <em className="text-gold">cada momento</em>
          </h2>
        </motion.div>

        {/* 2x2 bento — all four visible at once */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-px"
          style={{ background: 'oklch(76% 0.18 72 / 0.1)', border: '1px solid oklch(76% 0.18 72 / 0.1)' }}
        >
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col p-10 md:p-12 cursor-default transition-colors duration-500"
              style={{ background: 'oklch(8% 0.016 265)', minHeight: '260px' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'oklch(10% 0.02 265)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'oklch(8% 0.016 265)'
              }}
            >
              <span
                className="font-sans font-light tracking-[0.4em] uppercase mb-6 block"
                style={{ fontSize: '0.65rem', color: 'oklch(76% 0.18 72 / 0.3)' }}
              >
                {s.num}
              </span>

              <h3
                className="font-display font-light text-cream leading-tight mb-5 transition-colors duration-500 group-hover:text-gold"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', letterSpacing: '-0.02em' }}
              >
                {s.title}
              </h3>

              <div
                className="w-8 h-px mb-5 transition-all duration-500 group-hover:w-14"
                style={{ background: 'oklch(76% 0.18 72 / 0.3)' }}
              />

              <p
                className="text-sm leading-relaxed font-sans font-light tracking-wide mt-auto"
                style={{ color: 'oklch(97% 0.005 80 / 0.48)' }}
              >
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
