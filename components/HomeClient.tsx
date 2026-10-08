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
import type { ResolvedContent } from '@/sanity/resolve'

// Holds the preloader gate (ready) exactly as before and distributes
// CMS-resolved content to each section. Sections fall back to their own
// hardcoded defaults when a field is empty.
export default function HomeClient({ content }: { content: ResolvedContent }) {
  const [ready, setReady] = useState(false)
  const handleComplete = useCallback(() => setReady(true), [])

  return (
    <>
      <Preloader onComplete={handleComplete} />
      <main>
        <NavBar logo={content.logoNavbar} isDraft={content.isDraft} />
        <VideoScrollHero ready={ready} />
        <AboutSection content={content.about} isDraft={content.isDraft} />
        <ServicesSection content={content.services} />
        <ShowreelSection content={content.showreel} isDraft={content.isDraft} />
        <TestimonialsSection content={content.testimonials} />
        <ContactSection content={content.contact} />
        <Footer logo={content.logoFooter} tagline={content.footerTagline} isDraft={content.isDraft} />
      </main>
    </>
  )
}
