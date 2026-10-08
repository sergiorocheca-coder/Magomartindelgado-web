import { defineType, defineField } from 'sanity'

export const contact = defineType({
  name: 'contact',
  title: 'Contacto',
  type: 'document',
  fields: [
    defineField({ name: 'eyebrow', title: 'Etiqueta superior', type: 'string' }),
    defineField({
      name: 'titleLine1',
      title: 'Título — línea 1',
      type: 'string',
      description: 'Ej. "Creamos magia"',
    }),
    defineField({
      name: 'titlePrefix',
      title: 'Título — palabra fija antes de la rotativa',
      type: 'string',
      description: 'Ej. "para"',
    }),
    defineField({
      name: 'rotatingWords',
      title: 'Palabras rotativas (en dorado)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Ej. bodas, comuniones, empresas…',
    }),
    defineField({ name: 'text', title: 'Texto descriptivo', type: 'text', rows: 3 }),
    defineField({
      name: 'whatsapp',
      title: 'Número de WhatsApp (solo dígitos, ej. 34648146024)',
      type: 'string',
    }),
    defineField({ name: 'email', title: 'Email de contacto', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Contacto' }) },
})
