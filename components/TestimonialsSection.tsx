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
    text: 'Los niños (y los adultos) quedaron con la boca abierta. Martín tiene un don especial para conectar con la gente.',
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
  {
    name: 'Isabel & Javier',
    event: 'Aniversario — Madrid',
    text: 'Nos dejó completamente sin palabras. Cada truco era más impresionante que el anterior. Noche inolvidable.',
  },
  {
    name: 'Grupo Empresarial Norte',
    event: 'Gala de empresa — Bilbao',
    text: 'La actuación de Martín fue el momento estrella de la noche. Elegante, cercano y con una técnica impecable.',
  },
]

export default function TestimonialsSection() {
  return (
    <section
      className="py-32 overflow-hidden"
      style={{ background: 'oklch(8% 0.016 265)' }}
    >
      <div className="text-center mb-20 px-6">
        <p className="text-gold text-[10px] tracking-[0.5em] uppercase mb-5 font-sans font-light">
          Testimonios
        </p>
        <h2
          className="font-display text-cream font-light"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          Lo que dicen <em className="text-gold">de Martín</em>
        </h2>
      </div>

      <div className="relative">
        <motion.div
          animate={{ x: [0, '-50%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="flex gap-6 w-max"
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="w-80 p-8 flex-shrink-0"
              style={{ border: '1px solid oklch(76% 0.18 72 / 0.12)' }}
            >
              <div
                className="font-display text-4xl font-light mb-6 leading-none"
                style={{ color: 'oklch(76% 0.18 72 / 0.25)' }}
              >
                &ldquo;
              </div>
              <p
                className="text-sm leading-relaxed mb-8 font-sans font-light italic tracking-wide"
                style={{ color: 'oklch(97% 0.005 80 / 0.65)' }}
              >
                {t.text}
              </p>
              <div style={{ borderTop: '1px solid oklch(76% 0.18 72 / 0.2)' }} className="pt-5">
                <div className="text-cream text-sm font-sans font-light tracking-wide">{t.name}</div>
                <div
                  className="text-[10px] tracking-[0.3em] uppercase mt-1 font-sans font-light"
                  style={{ color: 'oklch(76% 0.18 72 / 0.55)' }}
                >
                  {t.event}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

