'use client'
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero'

const EMBED_AUTO =
  'https://www.youtube.com/embed/uuakMP-qySg?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&playsinline=1&rel=0&playlist=uuakMP-qySg'

const EMBED_NORMAL =
  'https://www.youtube.com/embed/uuakMP-qySg?controls=1&rel=0&modestbranding=1'

export default function ShowreelSection() {
  return (
    <section id="showreel">
      {/* Mobile: plain embed — no scroll trick (avoids touch/Lenis conflict) */}
      <div className="md:hidden py-24 px-6" style={{ background: 'oklch(6% 0.015 265)' }}>
        <div className="text-center mb-10">
          <p
            className="text-[9px] tracking-[0.6em] uppercase font-sans font-light mb-4"
            style={{ color: 'oklch(76% 0.18 72)' }}
          >
            Showreel
          </p>
          <h2
            className="font-display font-light text-cream"
            style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', letterSpacing: '-0.02em' }}
          >
            Martín en <em className="text-gold">acción</em>
          </h2>
        </div>
        <div className="relative aspect-video overflow-hidden" style={{ borderRadius: '4px' }}>
          <iframe
            src={EMBED_NORMAL}
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Martín Delgado — Showreel"
          />
        </div>
      </div>

      {/* Desktop: full scroll-expansion effect */}
      <div className="hidden md:block">
        <ScrollExpandMedia
          mediaType="video"
          mediaSrc={EMBED_AUTO}
          bgImageSrc="/martin-showreel.webp"
          title="Martín en acción"
          scrollToExpand="Desplázate para descubrir"
          textBlend={false}
        />
      </div>
    </section>
  )
}
