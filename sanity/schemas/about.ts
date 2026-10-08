import { defineType, defineField } from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'Sobre mí',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Etiqueta superior',
      type: 'string',
      description: 'Texto pequeño en mayúsculas (ej. "Sobre mí")',
    }),
    defineField({ name: 'titleLine1', title: 'Título — línea 1', type: 'string' }),
    defineField({ name: 'titleLine2', title: 'Título — línea 2 (en dorado)', type: 'string' }),
    defineField({ name: 'paragraph1', title: 'Párrafo 1', type: 'text', rows: 3 }),
    defineField({ name: 'paragraph2', title: 'Párrafo 2', type: 'text', rows: 3 }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'stats',
      title: 'Cifras destacadas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Valor (ej. +500)', type: 'string' },
            { name: 'label', title: 'Etiqueta', type: 'string' },
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
      validation: (rule) => rule.max(3).warning('Se muestran 3 cifras'),
    }),
  ],
  preview: { prepare: () => ({ title: 'Sobre mí' }) },
})
