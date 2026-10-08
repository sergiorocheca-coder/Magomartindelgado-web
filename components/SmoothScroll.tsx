'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'

const LenisContext = createContext<{ lenis: Lenis | null }>({ lenis: null })
export const useLenis = () => useContext(LenisContext)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      // Native scroll only — no Lenis, no momentum. Anchor links use native jump.
      return
    }

    const instance = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.5,
      infinite: false,
    })
    // Lenis only exists client-side, so it must be published to context from the effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance)

    function raf(time: number) {
      instance.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href) return

      // CTA inside the pinned hero — pass the absolute pixel position to Lenis
      // so it doesn't re-calculate from the element (which can stall against the GSAP pin).
      if (anchor.closest('#hero-scroll') && href === '#contacto') {
        e.preventDefault()
        const target = document.querySelector(href) as HTMLElement | null
        if (!target) return
        const top = target.getBoundingClientRect().top + window.scrollY - 80
        instance.scrollTo(top, {
          duration: 2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
        return
      }

      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        instance.scrollTo(target as HTMLElement, {
          offset: -80,
          duration: 1.6,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      }
    }
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
      instance.destroy()
    }
  }, [])

  return <LenisContext.Provider value={{ lenis }}>{children}</LenisContext.Provider>
}
