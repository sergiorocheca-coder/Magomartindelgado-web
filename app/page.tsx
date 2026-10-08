import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'
import HomeClient from '@/components/HomeClient'
import { getSiteContent } from '@/sanity/queries'
import { resolveContent } from '@/sanity/resolve'
import { previewClient } from '@/sanity/client'

// Force dynamic so the draft-mode cookie is always evaluated server-side.
// This is required for the Sanity Presentation tool (Visual Editing) to work.
// For the public site, ISR revalidation via /api/revalidate keeps the CDN fresh.
export const dynamic = 'force-dynamic'

export default async function Home() {
  const { isEnabled: isDraft } = await draftMode()
  const fetchClient = isDraft ? previewClient : undefined
  const content = resolveContent(await getSiteContent(fetchClient, isDraft), isDraft)

  return (
    <>
      <HomeClient content={content} />
      {isDraft && <VisualEditing />}
    </>
  )
}
