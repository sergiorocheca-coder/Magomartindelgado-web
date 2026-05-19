'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <motion.div style={{ scale }} className="absolute inset-0 z-0">
        <img
          src="https://assets.cdn.filesafe.space/F222CaBt1UL1aluI2C1k/media/6a04af9d06993a27a31256e6.jpeg"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.35 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/20 to-bg" />
        {/* Subtle vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, oklch(5% 0.012 275 / 0.7) 100%)',
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Thin gold line top */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-px h-16 bg-gradient-to-b from-transparent via-gold to-transparent mx-auto mb-10"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-gold text-[10px] tracking-[0.6em] uppercase mb-8 font-sans font-light"
        >
          Magia profesional · España
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-light text-cream leading-[0.95]"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
        >
          El arte de lo
          <br />
          <em className="text-gold italic">imposible</em>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 h-px bg-gold/40 mx-auto my-10"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-cream/50 text-xs tracking-[0.4em] uppercase font-sans font-light"
        >
          Bodas · Comuniones · Eventos de empresa
        </motion.p>

        <motion.a
          href="#contacto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="inline-block mt-14 border border-gold/50 text-gold text-[10px] tracking-[0.4em] uppercase px-12 py-5 hover:bg-gold hover:text-bg hover:border-gold transition-all duration-500 font-sans font-light"
        >
          Solicitar presupuesto
        </motion.a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-gold/40 text-[9px] tracking-[0.4em] uppercase font-sans">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent" />
      </motion.div>
    </section>
  )
}
