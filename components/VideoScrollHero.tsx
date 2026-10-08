'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const TOTAL_FRAMES = 285
const FRAME_PATH = (n: number) => `/frames/frame_${String(n).padStart(4, '0')}.webp`

interface VideoScrollHeroProps {
  ready: boolean
}

export default function VideoScrollHero({ ready }: VideoScrollHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const moment1Ref = useRef<HTMLDivElement>(null)
  const moment2Ref = useRef<HTMLDivElement>(null)
  const moment2Line1Ref = useRef<HTMLDivElement>(null)
  const moment2Line2Ref = useRef<HTMLDivElement>(null)
  const moment2Line3Ref = useRef<HTMLDivElement>(null)
  const moment3Ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only mount flag
  useEffect(() => { setMounted(true) }, [])

  function updateOverlays(progress: number) {
    const m1 = moment1Ref.current
    const m2 = moment2Ref.current
    const m3 = moment3Ref.current
    const l1 = moment2Line1Ref.current
    const l2 = moment2Line2Ref.current
    const l3 = moment2Line3Ref.current
    if (!m1 || !m2 || !m3 || !l1 || !l2 || !l3) return

    m1.style.opacity = progress < 0.28 ? '1' : '0'
    m1.style.transform = `translateY(${progress < 0.28 ? 0 : -20}px)`

    const m2Active = progress >= 0.3 && progress < 0.68
    m2.style.opacity = m2Active ? '1' : '0'
    m2.style.pointerEvents = m2Active ? 'auto' : 'none'

    const line1Active = progress >= 0.32 && progress < 0.48
    const line2Active = progress >= 0.48 && progress < 0.62
    const line3Active = progress >= 0.62 && progress < 0.68
    l1.style.opacity = line1Active ? '1' : '0'
    l1.style.transform = `translateY(${line1Active ? 0 : 12}px)`
    l2.style.opacity = line2Active ? '1' : '0'
    l2.style.transform = `translateY(${line2Active ? 0 : 12}px)`
    l3.style.opacity = line3Active ? '1' : '0'
    l3.style.transform = `translateY(${line3Active ? 0 : 12}px)`

    m3.style.opacity = progress >= 0.72 ? '1' : '0'
  }

  useEffect(() => {
    if (!mounted) return
    if (!sectionRef.current || !canvasRef.current || !wrapperRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const dpr = Math.min(window.devicePixelRatio, 2)
    const preloadWindow = isMobile ? 20 : 50
    const frameCache = new Map<number, HTMLImageElement>()
    let currentFrame = 0
    let rafId = 0

    function resize() {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = '100%'
      canvas.style.height = '100%'
    }

    function preloadRange(start: number, end: number) {
      for (let i = start; i <= Math.min(end, TOTAL_FRAMES); i++) {
        if (frameCache.has(i)) continue
        const img = new Image()
        img.src = FRAME_PATH(i)
        frameCache.set(i, img)
      }
    }

    function drawFrame(n: number) {
      const img = frameCache.get(n)
      if (!img || !img.complete || img.naturalWidth === 0 || !ctx) return
      const cw = canvas.width
      const ch = canvas.height
      const iw = img.naturalWidth
      const ih = img.naturalHeight
      const scale = Math.max(cw / iw, ch / ih)
      const dw = iw * scale
      const dh = ih * scale
      const dx = (cw - dw) / 2
      const dy = (ch - dh) / 2
      ctx.fillStyle = 'oklch(6% 0.015 265)'
      ctx.fillRect(0, 0, cw, ch)
      ctx.drawImage(img, dx, dy, dw, dh)
    }

    resize()
    window.addEventListener('resize', resize)
    preloadRange(1, preloadWindow)

    const firstImg = frameCache.get(1)
    if (firstImg) {
      if (firstImg.complete) drawFrame(1)
      else firstImg.onload = () => drawFrame(1)
    }

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: wrapperRef.current,
      pinSpacing: false,
      onUpdate: (self) => {
        const progress = self.progress
        const frameIndex = Math.min(Math.floor(progress * TOTAL_FRAMES * 1.1), TOTAL_FRAMES - 1) + 1
        if (frameIndex !== currentFrame) {
          currentFrame = frameIndex
          preloadRange(frameIndex, frameIndex + preloadWindow)
          if (rafId) cancelAnimationFrame(rafId)
          rafId = requestAnimationFrame(() => drawFrame(frameIndex))
        }
        updateOverlays(progress)
      },
    })

    const refresh = setTimeout(() => ScrollTrigger.refresh(), 100)

    return () => {
      clearTimeout(refresh)
      if (rafId) cancelAnimationFrame(rafId)
      trigger.kill()
      window.removeEventListener('resize', resize)
    }
  }, [mounted])

  return (
    <section
      ref={sectionRef}
      id="hero-scroll"
      style={{ height: '250vh', position: 'relative', background: 'oklch(6% 0.015 265)' }}
    >
      <div
        ref={wrapperRef}
        style={{ position: 'relative', width: '100%', height: '100svh', overflow: 'hidden' }}
      >
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'block' }}
        />

        {/* Vignette */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.7) 100%)',
          }}
        />

        {/* MOMENT 1 — Hero copy */}
        <div
          ref={moment1Ref}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
          style={{ opacity: 0, transform: 'translateY(0)', transition: 'opacity 600ms ease, transform 600ms ease' }}
        >
          <p
            className="text-[10px] tracking-[0.55em] uppercase font-sans font-light mb-10"
            style={{ color: 'oklch(76% 0.18 72)', textShadow: '0 1px 20px rgba(0,0,0,0.9)' }}
          >
            Magia profesional · España
          </p>
          <h1
            className="font-display font-light leading-[0.9]"
            style={{
              fontSize: 'clamp(3.2rem, 11vw, 9rem)',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 60px rgba(0,0,0,0.95), 0 0 120px rgba(0,0,0,0.8)',
            }}
          >
            <span className="sr-only">Mago profesional en Granada y Madrid: </span>
            <span className="block text-cream mb-4">El&nbsp;arte&nbsp;de&nbsp;lo</span>
            <em className="block text-gold italic">imposible</em>
          </h1>
          <div className="mx-auto my-10" style={{ height: '1px', width: '80px', background: 'oklch(76% 0.18 72 / 0.4)' }} />
          <p
            className="text-[10px] tracking-[0.45em] uppercase font-sans font-light mb-14"
            style={{ color: 'oklch(97% 0.005 80)', textShadow: '0 1px 20px rgba(0,0,0,0.9)' }}
          >
            Bodas · Comuniones · Eventos de empresa
          </p>
          <a
            href="#contacto"
            className="inline-block text-[10px] tracking-[0.45em] uppercase font-sans font-semibold px-16 py-5 transition-all duration-500"
            style={{
              background: 'linear-gradient(135deg, oklch(76% 0.18 72) 0%, oklch(66% 0.20 52) 100%)',
              color: 'oklch(6% 0.015 265)',
              borderRadius: '8px',
            }}
          >
            Solicitar presupuesto
          </a>
        </div>

        {/* MOMENT 2 — Card blur narrative */}
        <div
          ref={moment2Ref}
          className="absolute inset-0 z-10 flex items-center justify-center px-6"
          style={{ opacity: 0, transition: 'opacity 500ms ease' }}
        >
          <div
            style={{
              background: 'oklch(6% 0.015 265 / 0.45)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid oklch(97% 0.005 80 / 0.1)',
              borderRadius: '16px',
              padding: '2rem',
              maxWidth: '680px',
              width: '100%',
              textAlign: 'center',
              minHeight: '160px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <div
              ref={moment2Line1Ref}
              className="font-sans font-light"
              style={{ opacity: 0, transform: 'translateY(12px)', transition: 'opacity 500ms ease, transform 500ms ease', fontSize: 'clamp(1.1rem, 4vw, 1.4rem)', color: 'oklch(97% 0.005 80)', lineHeight: 1.4 }}
            >
              Cada actuación está diseñada
            </div>
            <div
              ref={moment2Line2Ref}
              className="font-sans font-light"
              style={{ opacity: 0, transform: 'translateY(12px)', transition: 'opacity 500ms ease, transform 500ms ease', fontSize: 'clamp(1.1rem, 4vw, 1.4rem)', color: 'oklch(97% 0.005 80)', lineHeight: 1.4 }}
            >
              para sorprender, emocionar
            </div>
            <div
              ref={moment2Line3Ref}
              className="font-display italic"
              style={{ opacity: 0, transform: 'translateY(12px)', transition: 'opacity 500ms ease, transform 500ms ease', fontSize: 'clamp(1.3rem, 4.5vw, 1.7rem)', color: 'oklch(76% 0.18 72)', lineHeight: 1.3 }}
            >
              y dejar una huella imborrable.
            </div>
          </div>
        </div>

        {/* MOMENT 3 — CTA bridge */}
        <div
          ref={moment3Ref}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6"
          style={{ opacity: 0, transition: 'opacity 700ms ease' }}
        >
          <div
            style={{
              background: 'oklch(6% 0.015 265 / 0.5)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid oklch(97% 0.005 80 / 0.08)',
              borderRadius: '16px',
              padding: '2rem',
              maxWidth: '640px',
              width: '100%',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
            }}
          >
            <p
              className="text-center font-display font-light italic"
              style={{ fontSize: 'clamp(1.5rem, 6vw, 3rem)', color: 'oklch(97% 0.005 80)', letterSpacing: '-0.01em', lineHeight: 1.2 }}
            >
              Cuéntame qué tienes en mente
            </p>
            <a
              href="#contacto"
              className="inline-block text-[10px] tracking-[0.45em] uppercase font-sans font-semibold px-12 py-4 transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, oklch(76% 0.18 72) 0%, oklch(66% 0.20 52) 100%)',
                color: 'oklch(6% 0.015 265)',
                borderRadius: '8px',
              }}
            >
              Solicitar presupuesto
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
