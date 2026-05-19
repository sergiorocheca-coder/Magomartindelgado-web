'use client'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'

const stats = [
  { value: '+500', label: 'Eventos realizados' },
  { value: '+15', label: 'Años de experiencia' },
  { value: '100%', label: 'Satisfacción garantizada' },
]

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function AboutSection() {
  const imgRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

  return (
    <section id="sobre-mi" className="relative py-36 px-6 overflow-hidden">
      {/* Decorative large text background */}
      <div
        className="absolute right-[-2%] top-1/2 -translate-y-1/2 font-display font-light select-none pointer-events-none leading-none"
        style={{
          fontSize: 'clamp(8rem, 22vw, 22rem)',
          color: 'oklch(76% 0.18 72 / 0.03)',
        }}
        aria-hidden
      >
        Martín
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-24 items-center relative">
        {/* Image with scroll parallax */}
        <div ref={imgRef} className="relative overflow-hidden">
          <div className="relative aspect-[3/4] overflow-hidden">
            <motion.img
              style={{ y: imgY, scale: 1.12 }}
              src="https://assets.cdn.filesafe.space/F222CaBt1UL1aluI2C1k/media/6a04af9d06993a27a31256e6.jpeg"
              alt="Martín Delgado"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, oklch(6% 0.015 265 / 0.65) 0%, transparent 55%)',
              }}
            />
          </div>
          {/* Corner accents */}
          <div
            className="absolute -bottom-3 -right-3 w-14 h-14"
            style={{ borderBottom: '1px solid oklch(76% 0.18 72 / 0.3)', borderRight: '1px solid oklch(76% 0.18 72 / 0.3)' }}
          />
          <div
            className="absolute -top-3 -left-3 w-14 h-14"
            style={{ borderTop: '1px solid oklch(76% 0.18 72 / 0.2)', borderLeft: '1px solid oklch(76% 0.18 72 / 0.2)' }}
          />
        </div>

        {/* Content */}
        <div>
          <Reveal>
            <p className="text-[9px] tracking-[0.6em] uppercase font-sans font-light mb-6" style={{ color: 'oklch(76% 0.18 72)' }}>
              Sobre mí
            </p>
          </Reveal>

          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              className="font-display font-light text-cream leading-[0.92] mb-10"
              style={{ fontSize: 'clamp(3rem, 5.5vw, 5rem)', letterSpacing: '-0.02em' }}
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Martín
              <br />
              <em className="text-gold">Delgado</em>
            </motion.h2>
          </div>

          <Reveal delay={0.1}>
            <div className="w-10 h-px mb-10" style={{ background: 'oklch(76% 0.18 72 / 0.4)' }} />
          </Reveal>

          <Reveal delay={0.15}>
            <p className="leading-relaxed mb-6 text-sm font-sans font-light tracking-wide" style={{ color: 'oklch(97% 0.005 80 / 0.58)' }}>
              Mago profesional especializado en crear experiencias únicas e irrepetibles.
              Cada actuación está diseñada para sorprender, emocionar y dejar una huella
              imborrable en los momentos más especiales de tu vida.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="leading-relaxed mb-14 text-sm font-sans font-light tracking-wide" style={{ color: 'oklch(97% 0.005 80 / 0.58)' }}>
              Desde íntimas celebraciones familiares hasta grandes eventos corporativos,
              adapto cada espectáculo para convertirlo en el recuerdo más mágico del evento.
            </p>
          </Reveal>

          <div className="grid grid-cols-3 gap-6">
            {stats.map((s, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <div className="pt-5" style={{ borderTop: '1px solid oklch(76% 0.18 72 / 0.2)' }}>
                  <div className="font-display text-3xl font-light" style={{ color: 'oklch(76% 0.18 72)' }}>
                    {s.value}
                  </div>
                  <div className="text-[10px] tracking-widest uppercase mt-2 font-sans font-light" style={{ color: 'oklch(97% 0.005 80 / 0.38)' }}>
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

