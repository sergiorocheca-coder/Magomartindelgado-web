'use client'
import { useState, useCallback } from 'react'
import Preloader from '@/components/Preloader'
import NavBar from '@/components/NavBar'
import VideoScrollHero from '@/components/VideoScrollHero'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import ShowreelSection from '@/components/ShowreelSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  const [ready, setReady] = useState(false)
  const handleComplete = useCallback(() => setReady(true), [])

  return (
    <>
      <Preloader onComplete={handleComplete} />
      <main>
        <NavBar />
        <VideoScrollHero ready={ready} />
        <AboutSection />
        <ServicesSection />
        <ShowreelSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
