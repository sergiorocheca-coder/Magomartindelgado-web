'use client'
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero'

const EMBED =
  'https://www.youtube.com/embed/uuakMP-qySg?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&playsinline=1&rel=0&playlist=uuakMP-qySg'

export default function ShowreelSection() {
  return (
    <section id="showreel">
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc={EMBED}
        bgImageSrc="https://assets.cdn.filesafe.space/F222CaBt1UL1aluI2C1k/media/6a04af9d06993a27a31256e6.jpeg"
        title="Martín en acción"
        scrollToExpand="Desplázate para descubrir"
        textBlend={false}
      />
    </section>
  )
}
