import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Ajustes generales',
  type: 'document',
  fields: [
    defineField({
      name: 'logoNavbar',
      title: 'Logo de la cabecera',
      type: 'image',
      description: 'Logo horizontal blanco que aparece arriba',
    }),
    defineField({
      name: 'logoFooter',
      title: 'Logo del pie de página',
      type: 'image',
      description: 'Logo apilado blanco que aparece abajo',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Pie — texto bajo el logo',
      type: 'string',
      description: 'Ej. "Mago Profesional · España"',
    }),
  ],
  preview: { prepare: () => ({ title: 'Ajustes generales' }) },
})
