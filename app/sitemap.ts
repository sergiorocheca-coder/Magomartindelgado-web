import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

// Single-page site: anchors (#servicios…) are not separate URLs for Google.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, changeFrequency: 'monthly', priority: 1 }]
}
