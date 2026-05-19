'use client'
import { useRef, useEffect, useState, ReactNode } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react'
import { useLenis } from '@/components/SmoothScroll'

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image'
  mediaSrc: string
  posterSrc?: string
  bgImageSrc: string
  title?: string
  scrollToExpand?: string
  textBlend?: boolean
  children?: ReactNode
}

export default function ScrollExpandMedia({
  mediaType = 'image',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  scrollToExpand = 'Scroll to expand',
  textBlend = false,
  children,
}: ScrollExpandMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { lenis } = useLenis()
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // 0→0.5: media expands from small to full viewport
  const mediaWidth = useTransform(scrollYProgress, [0, 0.5], ['40%', '100%'])
  const mediaHeight = useTransform(scrollYProgress, [0, 0.5], ['50vh', '100vh'])
  const mediaBorderRadius = useTransform(scrollYProgress, [0, 0.5], ['16px', '0px'])

  // Title fades out as media expands
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -40])

  // Hint text fades out immediately
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  // Children appear after full expansion
  const childrenOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1])

  // Track full expansion to enable/disable Lenis
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const fullyExpanded = v >= 0.5
      if (fullyExpanded !== mediaFullyExpanded) {
        setMediaFullyExpanded(fullyExpanded)
      }
    })
    return unsubscribe
  }, [scrollYProgress, mediaFullyExpanded])

  // Stop Lenis while media is expanding, resume when done
  useEffect(() => {
    if (!lenis) return
    if (!mediaFullyExpanded) {
      // Let native scroll handle during expansion (don't stop completely)
    } else {
      lenis.start()
    }
  }, [lenis, mediaFullyExpanded])

  const titleWords = title ? title.split(' ') : []
  const firstWord = titleWords[0] ?? ''
  const restOfTitle = titleWords.slice(1).join(' ')

  return (
    <div ref={containerRef} className="relative" style={{ height: '300vh' }}>
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center"
        style={{ background: 'oklch(5% 0.012 275)' }}>

        {/* Background image — blurred, fades out */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.4], [0.15, 0]) }}
        >
          <img
            src={bgImageSrc}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'blur(20px)', transform: 'scale(1.1)' }}
          />
        </motion.div>

        {/* Title */}
        {title && (
          <motion.div
            className="absolute z-20 text-center px-6 pointer-events-none"
            style={{
              opacity: titleOpacity,
              y: titleY,
              mixBlendMode: textBlend ? 'difference' : 'normal',
            }}
          >
            <h2
              className="font-display font-light text-cream leading-[0.9]"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.02em' }}
            >
              <span style={{ color: 'oklch(68% 0.11 82)' }}>{firstWord}</span>
              {restOfTitle && <><br />{restOfTitle}</>}
            </h2>
          </motion.div>
        )}

        {/* Expanding media */}
        <motion.div
          className="relative overflow-hidden z-10"
          style={{
            width: mediaWidth,
            height: mediaHeight,
            borderRadius: mediaBorderRadius,
          }}
        >
          {mediaType === 'video' ? (
            <iframe
              src={`${mediaSrc}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&playsinline=1`}
              className="absolute inset-0 w-full h-full"
              style={{ border: 'none', pointerEvents: 'none' }}
              allow="autoplay; fullscreen"
            />
          ) : (
            <img
              src={mediaSrc}
              alt={title ?? ''}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, transparent 50%, oklch(5% 0.012 275 / 0.7) 100%)',
            }}
          />
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
          style={{ opacity: hintOpacity }}
        >
          <span
            className="text-[9px] tracking-[0.5em] uppercase font-sans font-light"
            style={{ color: 'oklch(68% 0.11 82 / 0.6)' }}
          >
            {scrollToExpand}
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            className="w-px h-8"
            style={{ background: 'linear-gradient(to bottom, oklch(68% 0.11 82 / 0.5), transparent)' }}
          />
        </motion.div>

        {/* Children — visible after full expansion */}
        {children && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center"
            style={{ opacity: childrenOpacity, pointerEvents: mediaFullyExpanded ? 'auto' : 'none' }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  )
}
