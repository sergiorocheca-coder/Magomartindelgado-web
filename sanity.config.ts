'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { apiVersion, dataset, projectId } from './sanity/env'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/structure'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.magomartindelgado.com'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    presentationTool({
      name: 'presentation',
      title: 'Vista previa',
      previewUrl: {
        origin: siteUrl,
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
    }),
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    actions: (prev, { schemaType }) => {
      const singletons = [
        'siteSettings',
        'about',
        'services',
        'showreel',
        'testimonials',
        'contact',
      ]
      if (singletons.includes(schemaType)) {
        return prev.filter(
          ({ action }) =>
            action && ['publish', 'discardChanges', 'restore'].includes(action),
        )
      }
      return prev
    },
  },
})
