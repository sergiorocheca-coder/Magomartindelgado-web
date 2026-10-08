import { defineType, defineField } from 'sanity'

export const showreel = defineType({
  name: 'showreel',
  title: 'Showreel',
  type: 'document',
  fields: [
    defineField({ name: 'eyebrow', title: 'Etiqueta superior', type: 'string' }),
    defineField({
      name: 'titlePlain',
      title: 'Título — parte normal',
      type: 'string',
      description: 'Ej. "Martín en"',
    }),
    defineField({
      name: 'titleAccent',
      title: 'Título — parte en dorado',
      type: 'string',
      description: 'Ej. "acción"',
    }),
    defineField({
      name: 'youtubeId',
      title: 'ID del vídeo de YouTube',
      type: 'string',
      description: 'Solo el ID, ej. en youtu.be/uuakMP-qySg el ID es uuakMP-qySg',
    }),
    defineField({
      name: 'poster',
      title: 'Imagen de fondo (poster)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: { prepare: () => ({ title: 'Showreel' }) },
})
