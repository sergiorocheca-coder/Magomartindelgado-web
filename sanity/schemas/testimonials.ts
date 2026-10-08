import { defineType, defineField } from 'sanity'

export const testimonials = defineType({
  name: 'testimonials',
  title: 'Testimonios',
  type: 'document',
  fields: [
    defineField({ name: 'eyebrow', title: 'Etiqueta superior', type: 'string' }),
    defineField({
      name: 'titlePlain',
      title: 'Título — parte normal',
      type: 'string',
      description: 'Ej. "Quienes lo"',
    }),
    defineField({
      name: 'titleAccent',
      title: 'Título — parte en dorado',
      type: 'string',
      description: 'Ej. "han vivido"',
    }),
    defineField({
      name: 'items',
      title: 'Testimonios',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Nombre', type: 'string' },
            { name: 'event', title: 'Evento (ej. Boda — Sevilla)', type: 'string' },
            { name: 'text', title: 'Testimonio', type: 'text', rows: 4 },
          ],
          preview: { select: { title: 'name', subtitle: 'event' } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Testimonios' }) },
})
