import type { SanityImageSource } from '@sanity/image-url'
import { type SanityClient } from 'next-sanity'
import { client } from './client'
import { isSanityConfigured } from './env'

// ── Types — every field optional so components can fall back to hardcoded defaults
export interface AboutContent {
  eyebrow?: string
  titleLine1?: string
  titleLine2?: string
  paragraph1?: string
  paragraph2?: string
  photo?: SanityImageSource
  stats?: { value?: string; label?: string }[]
}
export interface ServicesContent {
  eyebrow?: string
  titlePlain?: string
  titleAccent?: string
  items?: { num?: string; title?: string; desc?: string }[]
}
export interface ShowreelContent {
  eyebrow?: string
  titlePlain?: string
  titleAccent?: string
  youtubeId?: string
  poster?: SanityImageSource
}
export interface TestimonialsContent {
  eyebrow?: string
  titlePlain?: string
  titleAccent?: string
  items?: { name?: string; event?: string; text?: string }[]
}
export interface ContactContent {
  eyebrow?: string
  titleLine1?: string
  titlePrefix?: string
  rotatingWords?: string[]
  text?: string
  whatsapp?: string
  email?: string
}
export interface SiteSettingsContent {
  logoNavbar?: SanityImageSource
  logoFooter?: SanityImageSource
  footerTagline?: string
}
export interface SiteContent {
  siteSettings?: SiteSettingsContent
  about?: AboutContent
  services?: ServicesContent
  showreel?: ShowreelContent
  testimonials?: TestimonialsContent
  contact?: ContactContent
}

const CONTENT_QUERY = `{
  "siteSettings": *[_type == "siteSettings"][0]{ logoNavbar, logoFooter, footerTagline },
  "about": *[_type == "about"][0]{ eyebrow, titleLine1, titleLine2, paragraph1, paragraph2, photo, stats },
  "services": *[_type == "services"][0]{ eyebrow, titlePlain, titleAccent, items },
  "showreel": *[_type == "showreel"][0]{ eyebrow, titlePlain, titleAccent, youtubeId, poster },
  "testimonials": *[_type == "testimonials"][0]{ eyebrow, titlePlain, titleAccent, items },
  "contact": *[_type == "contact"][0]{ eyebrow, titleLine1, titlePrefix, rotatingWords, text, whatsapp, email }
}`

// Fetches all editable content. On any failure (no project yet, network, etc.)
// logs loudly and returns null so the UI renders its hardcoded fallbacks.
export async function getSiteContent(
  fetchClient: SanityClient = client,
  isDraft = false,
): Promise<SiteContent | null> {
  if (!isSanityConfigured) {
    return null
  }
  try {
    return await fetchClient.fetch<SiteContent>(
      CONTENT_QUERY,
      {},
      isDraft ? {} : { next: { tags: ['content'] } },
    )
  } catch (error) {
    console.error('[sanity] getSiteContent failed, using fallbacks:', error)
    return null
  }
}
