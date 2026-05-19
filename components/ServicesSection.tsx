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

function ServiceRow({
  service,
  index,
}: {
  service: (typeof services)[0]
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div
        className="py-10 grid grid-cols-[3.5rem_1fr] md:grid-cols-[5rem_1fr_22rem] gap-6 md:gap-14 items-baseline transition-all duration-500"
        style={{ borderTop: '1px solid oklch(68% 0.11 82 / 0.12)' }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLElement).style.borderTopColor = 'oklch(68% 0.11 82 / 0.4)'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLElement).style.borderTopColor = 'oklch(68% 0.11 82 / 0.12)'
        }}
      >
        {/* Roman numeral */}
        <span
          className="font-display font-light transition-colors duration-500"
          style={{
            fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
            color: 'oklch(68% 0.11 82 / 0.25)',
          }}
        >
          {service.num}
        </span>

        {/* Title */}
        <h3
          className="font-display font-light text-cream leading-tight transition-colors duration-500 group-hover:text-gold"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}
        >
          {service.title}
        </h3>

        {/* Description — desktop only */}
        <p
          className="text-sm leading-relaxed font-sans font-light tracking-wide hidden md:block"
          style={{ color: 'oklch(95% 0.01 80 / 0.45)' }}
        >
          {service.desc}
        </p>
      </div>

      {/* Description — mobile */}
      <p
        className="text-sm leading-relaxed font-sans font-light tracking-wide md:hidden pb-8"
        style={{ color: 'oklch(95% 0.01 80 / 0.45)' }}
      >
        {service.desc}
      </p>
    </motion.div>
  )
}

export default function ServicesSection() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  return (
    <section id="servicios" className="py-32" style={{ background: 'oklch(7% 0.012 275)' }}>
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <p className="text-[9px] tracking-[0.6em] uppercase font-sans font-light mb-5" style={{ color: 'oklch(68% 0.11 82)' }}>
            Servicios
          </p>
          <h2 className="font-display font-light text-cream" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', letterSpacing: '-0.02em' }}>
            Magia para <em className="text-gold">cada momento</em>
          </h2>
        </motion.div>

        {/* Service rows */}
        <div>
          {services.map((s, i) => (
            <ServiceRow key={i} service={s} index={i} />
          ))}
          <div style={{ borderTop: '1px solid oklch(68% 0.11 82 / 0.12)' }} />
        </div>
      </div>
    </section>
  )
}
