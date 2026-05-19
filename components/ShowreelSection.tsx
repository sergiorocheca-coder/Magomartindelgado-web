'use client'
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero'

export default function ShowreelSection() {
  return (
    <section id="showreel">
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="https://assets.cdn.filesafe.space/F222CaBt1UL1aluI2C1k/media/6a04af9d06993a27a31256e6.jpeg"
        bgImageSrc="https://assets.cdn.filesafe.space/F222CaBt1UL1aluI2C1k/media/6a04af9d06993a27a31256e6.jpeg"
        title="Martín en acción"
        scrollToExpand="Desplázate para descubrir"
        textBlend={false}
      >
        <div className="max-w-2xl mx-auto text-center py-20 px-6">
          <p
            className="text-[9px] tracking-[0.6em] uppercase font-sans font-light mb-6"
            style={{ color: 'oklch(68% 0.11 82)' }}
          >
            Showreel
          </p>
          <h2
            className="font-display font-light text-cream mb-8"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}
          >
            Vídeo <em className="text-gold">próximamente</em>
          </h2>
          <p className="text-sm font-sans font-light" style={{ color: 'oklch(95% 0.01 80 / 0.5)' }}>
            Síguenos en redes para ser el primero en verlo.
          </p>
        </div>
      </ScrollExpandMedia>
    </section>
  )
}
