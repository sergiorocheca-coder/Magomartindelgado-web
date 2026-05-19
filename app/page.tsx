import NavBar from '@/components/NavBar'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import ShowreelSection from '@/components/ShowreelSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ShowreelSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
