import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { previewClient } from '@/sanity/client'

// Sanity Presentation validates a one-time preview secret against the dataset
// using the read token, so no static secret is shared with the client and the
// route fails closed when the token is missing. Redirects are restricted to
// same-origin paths by the helper.
export const { GET } = defineEnableDraftMode({ client: previewClient })
