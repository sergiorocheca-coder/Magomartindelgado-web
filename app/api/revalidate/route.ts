import { timingSafeEqual } from 'node:crypto'
import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

// Sanity webhook target. On publish, Sanity calls POST /api/revalidate and we
// revalidate the 'content' tag so the live site refreshes within seconds.
// Guarded by a bearer token (SANITY_REVALIDATE_SECRET); fails closed if unset.
function isAuthorized(header: string | null, secret: string | undefined) {
  if (!secret) return false
  const given = Buffer.from(header ?? '')
  const expected = Buffer.from(`Bearer ${secret}`)
  return given.length === expected.length && timingSafeEqual(given, expected)
}

export async function POST(req: NextRequest) {
  try {
    if (!isAuthorized(req.headers.get('authorization'), process.env.SANITY_REVALIDATE_SECRET)) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    revalidateTag('content', { expire: 0 })
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (error) {
    console.error('[revalidate] error:', error)
    return new NextResponse('Error revalidating', { status: 500 })
  }
}
