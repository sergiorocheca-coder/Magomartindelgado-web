'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onComplete, 900)
    }, 1800)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: 'oklch(6% 0.015 265)' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Name */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[10px] tracking-[0.7em] uppercase font-sans font-light mb-8"
            style={{ color: 'oklch(97% 0.005 80 / 0.35)' }}
          >
            Martín Delgado
          </motion.p>

          {/* Gold progress line */}
          <div
            className="w-40 h-px overflow-hidden"
            style={{ background: 'oklch(76% 0.18 72 / 0.12)' }}
          >
            <motion.div
              className="h-full"
              style={{ background: 'oklch(76% 0.18 72)', transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            />
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-[9px] tracking-[0.5em] uppercase font-sans font-light mt-6"
            style={{ color: 'oklch(76% 0.18 72 / 0.4)' }}
          >
            Mago profesional
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

