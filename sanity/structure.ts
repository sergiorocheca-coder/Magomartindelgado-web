import type { StructureResolver } from 'sanity/structure'

// Singleton sections: each document type appears once as a single editable
// entry, so Martín sees a clean list of sections instead of "create document".
const SINGLETONS: { type: string; title: string }[] = [
  { type: 'siteSettings', title: 'Ajustes generales' },
  { type: 'about', title: 'Sobre mí' },
  { type: 'services', title: 'Servicios' },
  { type: 'showreel', title: 'Showreel' },
  { type: 'testimonials', title: 'Testimonios' },
  { type: 'contact', title: 'Contacto' },
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido de la web')
    .items(
      SINGLETONS.map(({ type, title }) =>
        S.listItem()
          .title(title)
          .id(type)
          .child(S.document().schemaType(type).documentId(type)),
      ),
    )
