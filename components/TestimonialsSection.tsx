'use client'
import { motion } from 'motion/react'

const testimonials = [
  {
    name: 'Sara & Roberto',
    event: 'Boda — Sevilla',
    text: 'Martín convirtió nuestra boda en algo que los invitados no olvidarán jamás. Absolutamente alucinante.',
  },
  {
    name: 'Carmen López',
    event: 'Comunión — Granada',
    text: 'Los niños (y los adultos) quedaron con la boca abierta. Martín tiene un don especial para conectar.',
  },
  {
    name: 'TechCorp Spain',
    event: 'Evento corporativo',
    text: 'El mejor team building que hemos hecho. Rompió el hielo en 5 minutos. Lo recomendamos sin dudar.',
  },
  {
    name: 'Familia García',
    event: 'Cumpleaños — Málaga',
    text: 'Una experiencia mágica de principio a fin. Profesional, cercano y con una magia que te deja sin palabras.',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-32 bg-[#0c0b18] overflow-hidden">
      <div className="text-center mb-16 px-6">
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Testimonios</p>
        <h2 className="font-display text-5xl text-cream font-light">
          Lo que dicen <em className="text-gold">de Martín</em>
        </h2>
      </div>
      <div className="relative">
        <motion.div
          animate={{ x: [0, '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex gap-8 w-max"
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="w-80 border border-gold/15 p-8 flex-shrink-0">
              <p className="text-cream/70 text-sm leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
              <div className="border-t border-gold/20 pt-4">
                <div className="text-cream font-medium text-sm">{t.name}</div>
                <div className="text-gold/60 text-xs tracking-wider mt-1">{t.event}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
