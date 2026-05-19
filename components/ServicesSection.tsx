'use client'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const services = [
  {
    icon: '💍',
    title: 'Bodas',
    desc: 'Un espectáculo a medida para el día más importante. Magia entre mesa y mesa, show nupcial y momentos únicos que los invitados recordarán siempre.',
  },
  {
    icon: '✨',
    title: 'Comuniones',
    desc: 'Magia adaptada para los más pequeños y sus familias. Espectáculos participativos, cercanos y llenos de asombro.',
  },
  {
    icon: '🏢',
    title: 'Eventos de empresa',
    desc: 'Team building mágico, gala de empresa o presentación de producto. La magia une equipos y convierte cualquier evento corporativo en algo extraordinario.',
  },
  {
    icon: '🎉',
    title: 'Eventos privados',
    desc: 'Cumpleaños, aniversarios, reuniones familiares. Un espectáculo íntimo y personalizado para celebrar lo que merece ser especial.',
  },
]

export default function ServicesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="servicios" ref={ref} className="py-32 px-6 bg-[#0c0b18]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Servicios</p>
          <h2 className="font-display text-5xl text-cream font-light">
            Magia para <em className="text-gold">cada momento</em>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="group border border-gold/15 p-10 hover:border-gold/40 hover:bg-gold/5 transition-all duration-500"
            >
              <div className="text-3xl mb-6">{s.icon}</div>
              <h3 className="font-display text-2xl text-cream mb-4 group-hover:text-gold transition-colors">
                {s.title}
              </h3>
              <p className="text-cream/60 leading-relaxed text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
