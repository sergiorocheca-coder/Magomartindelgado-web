'use client'
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero'
import { createDataAttribute } from '@sanity/visual-editing/create-data-attribute'
import type { ResolvedShowreel } from '@/sanity/resolve'

const DEFAULT_YOUTUBE_ID = 'uuakMP-qySg'

export default function ShowreelSection({ content, isDraft }: { content?: ResolvedShowreel; isDraft?: boolean }) {
  const id = content?.youtubeId || DEFAULT_YOUTUBE_ID
  const EMBED_AUTO = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&playsinline=1&rel=0&playlist=${id}`
  const EMBED_NORMAL = `https://www.youtube.com/embed/${id}?controls=1&rel=0&modestbranding=1`
  const titlePlain = content?.titlePlain || 'Martín en'
  const titleAccent = content?.titleAccent || 'acción'
  const poster = content?.poster || '/martin-showreel.webp'

  return (
    <section id="showreel">
      {/* Mobile: plain embed — no scroll trick (avoids touch/Lenis conflict) */}
      <div className="md:hidden py-24 px-6" style={{ background: 'oklch(6% 0.015 265)' }}>
        <div className="text-center mb-10">
          <p
            className="text-[9px] tracking-[0.6em] uppercase font-sans font-light mb-4"
            style={{ color: 'oklch(76% 0.18 72)' }}
          >
            {content?.eyebrow || 'Showreel'}
          </p>
          <h2
            className="font-display font-light text-cream"
            style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', letterSpacing: '-0.02em' }}
          >
            {titlePlain} <em className="text-gold">{titleAccent}</em>
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
      <div className="hidden md:block relative">
        {isDraft && (
          <div
            className="absolute top-4 left-4 z-50 pointer-events-auto"
            data-sanity={createDataAttribute({ id: 'showreel', type: 'showreel', path: 'poster', baseUrl: '/studio' }).toString()}
            style={{ width: 48, height: 48 }}
            aria-hidden
          />
        )}
        <ScrollExpandMedia
          mediaType="video"
          mediaSrc={EMBED_AUTO}
          bgImageSrc={poster}
          title={`${titlePlain} ${titleAccent}`}
          scrollToExpand="Desplázate para descubrir"
          textBlend={false}
        />
      </div>
    </section>
  )
}
