'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

// Word reveal with overflow clip — Figure & Plot pattern
function Word({
  children,
  delay,
  ready,
}: {
  children: React.ReactNode
  delay: number
  ready: boolean
}) {
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
      <motion.span
        style={{ display: 'inline-block' }}
        initial={{ y: '110%', opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  )
}

function FadeIn({
  children,
  delay,
  ready,
  className,
}: {
  children: React.ReactNode
  delay: number
  ready: boolean
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={ready ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

interface HeroSectionProps {
  ready: boolean
}

export default function HeroSection({ ready }: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.07])

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <motion.div style={{ scale }} className="absolute inset-0 z-0">
        <img
          src="/martin-showreel.webp"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.45 }}
        />
        {/* Gradient bottom fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, oklch(6% 0.015 265 / 0.55) 0%, oklch(6% 0.015 265 / 0.1) 40%, oklch(6% 0.015 265) 100%)',
          }}
        />
        {/* Radial vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, oklch(6% 0.015 265 / 0.65) 100%)',
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full"
      >
        {/* Top vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={ready ? { scaleY: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-px h-14 mx-auto mb-10"
          style={{
            background: 'linear-gradient(to bottom, transparent, oklch(76% 0.18 72 / 0.7))',
            transformOrigin: 'top',
          }}
        />

        {/* Eyebrow */}
        <FadeIn delay={0.1} ready={ready} className="mb-10">
          <span
            className="text-[10px] tracking-[0.55em] uppercase font-sans font-light"
            style={{ color: 'oklch(76% 0.18 72)' }}
          >
            Magia profesional · España
          </span>
        </FadeIn>

        {/* Main title — word split */}
        <h1
          className="font-display font-light text-cream leading-[0.9] mb-4"
          style={{ fontSize: 'clamp(3.8rem, 11vw, 9rem)', letterSpacing: '-0.02em' }}
        >
          <Word delay={0.2} ready={ready}>
            El&nbsp;arte&nbsp;de&nbsp;lo
          </Word>
        </h1>
        <h1
          className="font-display font-light leading-[0.9]"
          style={{ fontSize: 'clamp(3.8rem, 11vw, 9rem)', letterSpacing: '-0.02em' }}
        >
          <Word delay={0.35} ready={ready}>
            <em className="text-gold italic">imposible</em>
          </Word>
        </h1>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={ready ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto my-10"
          style={{
            height: '1px',
            width: '80px',
            background: 'oklch(76% 0.18 72 / 0.4)',
            transformOrigin: 'left',
          }}
        />

        {/* Sub */}
        <FadeIn delay={0.65} ready={ready}>
          <p
            className="text-[10px] tracking-[0.45em] uppercase font-sans font-light"
            style={{ color: 'oklch(97% 0.005 80 / 0.65)' }}
          >
            Bodas · Comuniones · Eventos de empresa
          </p>
        </FadeIn>

        {/* CTA — gradient fill */}
        <FadeIn delay={0.8} ready={ready} className="mt-14">
          <a
            href="#contacto"
            className="inline-block text-[10px] tracking-[0.45em] uppercase font-sans font-semibold px-16 py-5 transition-all duration-500"
            style={{
              background: 'linear-gradient(135deg, oklch(76% 0.18 72) 0%, oklch(66% 0.20 52) 100%)',
              color: 'oklch(6% 0.015 265)',
              borderRadius: '8px',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                'linear-gradient(135deg, oklch(84% 0.16 74) 0%, oklch(76% 0.18 72) 100%)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                'linear-gradient(135deg, oklch(76% 0.18 72) 0%, oklch(66% 0.20 52) 100%)'
            }}
          >
            Solicitar presupuesto
          </a>
        </FadeIn>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span
          className="text-[9px] tracking-[0.5em] uppercase font-sans font-light"
          style={{ color: 'oklch(76% 0.18 72 / 0.35)' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, oklch(76% 0.18 72 / 0.5), transparent)' }}
        />
      </motion.div>
    </section>
  )
}

