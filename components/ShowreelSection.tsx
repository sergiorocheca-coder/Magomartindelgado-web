'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

export default function ShowreelSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="showreel" ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold text-[10px] tracking-[0.5em] uppercase mb-5 font-sans font-light">
            Showreel
          </p>
          <h2
            className="font-display text-cream font-light"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Míralo en <em className="text-gold">acción</em>
          </h2>
        </div>

        <div className="relative overflow-hidden aspect-video">
          <motion.div style={{ y }} className="absolute inset-[-8%]">
            <img
              src="https://assets.cdn.filesafe.space/F222CaBt1UL1aluI2C1k/media/6a04af9d06993a27a31256e6.jpeg"
              alt="Martín Delgado en acción"
              className="w-full h-full object-cover"
              style={{ filter: 'grayscale(40%)' }}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'oklch(5% 0.012 275 / 0.45)' }}
            />
          </motion.div>

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 group"
              style={{ border: '1px solid oklch(68% 0.11 82 / 0.6)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'oklch(68% 0.11 82 / 0.15)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent'
              }}
            >
              <div
                className="ml-1"
                style={{
                  width: 0,
                  height: 0,
                  borderTop: '9px solid transparent',
                  borderBottom: '9px solid transparent',
                  borderLeft: '16px solid oklch(68% 0.11 82)',
                }}
              />
            </div>
          </div>

          {/* Corner accents */}
          <div
            className="absolute top-0 left-0 w-10 h-10"
            style={{ borderTop: '1px solid oklch(68% 0.11 82 / 0.6)', borderLeft: '1px solid oklch(68% 0.11 82 / 0.6)' }}
          />
          <div
            className="absolute top-0 right-0 w-10 h-10"
            style={{ borderTop: '1px solid oklch(68% 0.11 82 / 0.6)', borderRight: '1px solid oklch(68% 0.11 82 / 0.6)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-10 h-10"
            style={{ borderBottom: '1px solid oklch(68% 0.11 82 / 0.6)', borderLeft: '1px solid oklch(68% 0.11 82 / 0.6)' }}
          />
          <div
            className="absolute bottom-0 right-0 w-10 h-10"
            style={{ borderBottom: '1px solid oklch(68% 0.11 82 / 0.6)', borderRight: '1px solid oklch(68% 0.11 82 / 0.6)' }}
          />
        </div>

        <p
          className="text-center text-[10px] tracking-[0.5em] uppercase mt-8 font-sans font-light"
          style={{ color: 'oklch(95% 0.01 80 / 0.25)' }}
        >
          Vídeo del espectáculo próximamente
        </p>
      </div>
    </section>
  )
}
