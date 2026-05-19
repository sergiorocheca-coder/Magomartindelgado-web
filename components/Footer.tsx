export default function Footer() {
  return (
    <footer
      className="py-12 px-6 text-center"
      style={{ borderTop: '1px solid oklch(68% 0.11 82 / 0.08)' }}
    >
      <p
        className="font-display text-xl font-light mb-2"
        style={{ color: 'oklch(68% 0.11 82 / 0.5)' }}
      >
        Martín Delgado
      </p>
      <p
        className="text-[10px] tracking-[0.4em] uppercase font-sans font-light"
        style={{ color: 'oklch(95% 0.01 80 / 0.25)' }}
      >
        Mago Profesional · España
      </p>
      <p
        className="text-[10px] mt-8 font-sans font-light"
        style={{ color: 'oklch(95% 0.01 80 / 0.18)' }}
      >
        © {new Date().getFullYear()} — Todos los derechos reservados
      </p>
    </footer>
  )
}
