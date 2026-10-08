// Sanity environment configuration.
// projectId/dataset come from env vars. If unset (e.g. before the Sanity
// project is created), we fall back to a placeholder so the Next build still
// passes — content fetches then fail gracefully and components render their
// hardcoded fallbacks. Set the real values in .env.local and in Vercel.

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01'

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder'

export const isSanityConfigured = projectId !== 'placeholder'
