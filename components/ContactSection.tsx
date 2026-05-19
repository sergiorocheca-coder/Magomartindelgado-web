'use client'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contacto" ref={ref} className="py-32 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Contacto</p>
          <h2 className="font-display text-5xl text-cream font-light mb-6">
            ¿Hablamos sobre
            <br />
            <em className="text-gold">tu evento?</em>
          </h2>
          <p className="text-cream/60 leading-relaxed mb-16 max-w-md mx-auto">
            Cuéntame qué tienes en mente. Te preparo una propuesta personalizada sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/34XXXXXXXXX"
              className="inline-flex items-center justify-center gap-3 bg-gold text-bg text-sm font-semibold tracking-widest uppercase px-10 py-5 hover:bg-gold-light transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="mailto:martin@magomartindelgado.com"
              className="inline-flex items-center justify-center gap-3 border border-gold/60 text-gold text-sm tracking-widest uppercase px-10 py-5 hover:bg-gold/10 transition-colors"
            >
              Enviar email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
