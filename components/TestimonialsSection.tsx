'use client'
import { motion } from 'motion/react'

const testimonials = [
  {
    name: 'Sara & Roberto',
    event: 'Boda — Sevilla',
    text: 'Martín supo leer a nuestros invitados desde el primer instante. No fue solo magia: fue una actuación que marcó el ritmo de toda la velada y generó conversaciones que duraron días. Un profesional de principio a fin.',
  },
  {
    name: 'Carmen López',
    event: 'Comunión — Granada',
    text: 'Llegó puntual, se adaptó a todos los grupos de edad sin esfuerzo aparente y dejó una impresión que siguen comentando quienes estuvieron presentes. Excelente trato y resultado impecable.',
  },
  {
    name: 'TechCorp Spain',
    event: 'Evento corporativo — Barcelona',
    text: 'Necesitábamos cohesionar a un equipo de ochenta personas que apenas se conocían. Martín lo logró en los primeros minutos con una naturalidad y precisión que nos sorprendió a todos. Sin duda repetiremos.',
  },
  {
    name: 'Familia García',
    event: 'Celebración familiar — Málaga',
    text: 'Lo que más valoramos fue su capacidad para involucrar a cada persona sin forzar nada. No es únicamente un mago: es alguien que sabe construir momentos que perduran mucho después del evento.',
  },
  {
    name: 'Isabel & Javier',
    event: 'Aniversario — Madrid',
    text: 'Pedimos discreción, elegancia y algo que nuestros invitados no hubieran visto antes. Martín cumplió los tres requisitos con una solvencia que pocas veces encontramos en este tipo de servicios.',
  },
  {
    name: 'Grupo Empresarial Norte',
    event: 'Gala de empresa — Bilbao',
    text: 'En una gala corporativa es difícil encontrar entretenimiento que no resulte impostado. Martín lo resolvió con criterio: ritmo calculado, adaptación constante al público y un desenlace que nadie anticipó.',
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
          Quienes lo <em className="text-gold">han vivido</em>
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

