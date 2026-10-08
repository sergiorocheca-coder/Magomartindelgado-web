import type { SiteContent } from './queries'
import { urlForImage } from './image'

// Plain, serializable shape passed from the server component to client
// components. Image fields are resolved to CDN URL strings (or null → fallback).
export interface ResolvedAbout {
  eyebrow?: string
  titleLine1?: string
  titleLine2?: string
  paragraph1?: string
  paragraph2?: string
  photo?: string | null
  stats?: { value?: string; label?: string }[]
}
export interface ResolvedServices {
  eyebrow?: string
  titlePlain?: string
  titleAccent?: string
  items?: { num?: string; title?: string; desc?: string }[]
}
export interface ResolvedShowreel {
  eyebrow?: string
  titlePlain?: string
  titleAccent?: string
  youtubeId?: string
  poster?: string | null
}
export interface ResolvedTestimonials {
  eyebrow?: string
  titlePlain?: string
  titleAccent?: string
  items?: { name?: string; event?: string; text?: string }[]
}
export interface ResolvedContact {
  eyebrow?: string
  titleLine1?: string
  titlePrefix?: string
  rotatingWords?: string[]
  text?: string
  whatsapp?: string
  email?: string
}
export interface ResolvedContent {
  isDraft?: boolean
  logoNavbar?: string | null
  logoFooter?: string | null
  footerTagline?: string
  about?: ResolvedAbout
  services?: ResolvedServices
  showreel?: ResolvedShowreel
  testimonials?: ResolvedTestimonials
  contact?: ResolvedContact
}

export function resolveContent(content: SiteContent | null, isDraft = false): ResolvedContent {
  if (!content) return {}
  const { siteSettings, about, services, showreel, testimonials, contact } = content
  return {
    isDraft,
    logoNavbar: urlForImage(siteSettings?.logoNavbar),
    logoFooter: urlForImage(siteSettings?.logoFooter),
    footerTagline: siteSettings?.footerTagline,
    about: about
      ? { ...about, photo: urlForImage(about.photo) }
      : undefined,
    services: services || undefined,
    showreel: showreel
      ? { ...showreel, poster: urlForImage(showreel.poster) }
      : undefined,
    testimonials: testimonials || undefined,
    contact: contact || undefined,
  }
}
