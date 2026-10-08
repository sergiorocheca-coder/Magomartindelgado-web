import type { NextConfig } from 'next'

// Strict CSP for the public marketing site. Sanity image CDN added so
// CMS-managed photos load.
const publicHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // frame-ancestors in CSP controls iframe permissions in all modern browsers.
  // X-Frame-Options is removed to avoid conflict with frame-ancestors.
  // (SAMEORIGIN is already covered by frame-ancestors 'self' below)
  { key: 'X-DNS-Prefetch-Control', value: 'off' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000',
  },
  // Allows WhatsApp/external links to open without cross-origin issues
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Next.js App Router requires unsafe-inline for hydration scripts
      // Nonce-based CSP requires middleware — acceptable for static marketing site
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https://assets.cdn.filesafe.space https://cdn.sanity.io",
      // YouTube embed only — Google Maps removed
      "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
      "connect-src 'self' https://*.sanity.io https://cdn.sanity.io",
      "frame-ancestors 'self' https://www.magomartindelgado.com https://magomartindelgado.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "worker-src 'none'",
      "upgrade-insecure-requests",
    ].join('; '),
  },
]

// Relaxed CSP scoped ONLY to /studio. Sanity Studio needs eval, web workers,
// blob/data sources and connections to *.sanity.io. This does NOT affect the
// public site, which keeps the strict policy above.
const studioHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://cdn.sanity.io https://*.sanity.io",
      "font-src 'self' data:",
      "connect-src 'self' https://api.sanity.io https://*.api.sanity.io https://*.apicdn.sanity.io https://cdn.sanity.io wss://*.api.sanity.io",
      "worker-src 'self' blob:",
      "frame-src 'self' https://www.magomartindelgado.com https://magomartindelgado.com",
      "object-src 'none'",
      "base-uri 'self'",
      "frame-ancestors 'self'",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  async headers() {
    return [
      // Studio gets its own relaxed policy.
      {
        source: '/studio/:path*',
        headers: studioHeaders,
      },
      // Everything except /studio gets the strict policy.
      {
        source: '/((?!studio).*)',
        headers: publicHeaders,
      },
    ]
  },
}

export default nextConfig
