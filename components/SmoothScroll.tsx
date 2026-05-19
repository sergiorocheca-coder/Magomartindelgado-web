'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'

const LenisContext = createContext<{ lenis: Lenis | null }>({ lenis: null })
export const useLenis = () => useContext(LenisContext)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const instance = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.5,
      infinite: false,
    })
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
