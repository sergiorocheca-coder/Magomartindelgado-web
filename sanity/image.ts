import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { projectId, dataset } from './env'

const builder = createImageUrlBuilder({ projectId, dataset })

// Returns a Sanity CDN URL for an image field, or null if the field is empty
// (so callers can fall back to their bundled /public asset).
export function urlForImage(source: SanityImageSource | undefined | null): string | null {
  if (!source) return null
  try {
    return builder.image(source).auto('format').fit('max').url()
  } catch {
    return null
  }
}
