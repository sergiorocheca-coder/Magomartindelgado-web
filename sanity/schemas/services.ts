import { defineType, defineField } from 'sanity'

export const services = defineType({
  name: 'services',
  title: 'Servicios',
  type: 'document',
  fields: [
    defineField({ name: 'eyebrow', title: 'Etiqueta superior', type: 'string' }),
    defineField({
      name: 'titlePlain',
      title: 'Título — parte normal',
      type: 'string',
      description: 'Ej. "Magia para"',
    }),
    defineField({
      name: 'titleAccent',
      title: 'Título — parte en dorado',
      type: 'string',
      description: 'Ej. "cada momento"',
    }),
    defineField({
      name: 'items',
      title: 'Servicios',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'num', title: 'Número romano (I, II, III, IV)', type: 'string' },
            { name: 'title', title: 'Nombre del servicio', type: 'string' },
            { name: 'desc', title: 'Descripción', type: 'text', rows: 3 },
          ],
          preview: { select: { title: 'title', subtitle: 'num' } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Servicios' }) },
})
