'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

export default function ShowreelSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section id="showreel" ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Showreel</p>
          <h2 className="font-display text-5xl text-cream font-light">
            Míralo en <em className="text-gold">acción</em>
          </h2>
        </div>
        <div className="relative overflow-hidden aspect-video">
          <motion.div style={{ y }} className="absolute inset-[-10%]">
            <img
              src="https://assets.cdn.filesafe.space/F222CaBt1UL1aluI2C1k/media/6a04af9d06993a27a31256e6.jpeg"
              alt="Martín Delgado en acción"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-bg/50" />
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 border-2 border-gold/60 rounded-full flex items-center justify-center hover:bg-gold/20 transition-colors cursor-pointer">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[18px] border-l-gold ml-1" />
            </div>
          </div>

          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-gold/60" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gold/60" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-gold/60" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-gold/60" />
        </div>
        <p className="text-center text-cream/30 text-xs tracking-widest mt-6 uppercase">
          Vídeo del espectáculo próximamente
        </p>
      </div>
    </section>
  )
}
