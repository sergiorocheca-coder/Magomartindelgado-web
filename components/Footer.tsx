export default function Footer() {
  return (
    <footer className="border-t border-gold/10 py-10 px-6 text-center">
      <p className="font-display text-lg text-gold/60 mb-2">Martín Delgado</p>
      <p className="text-cream/30 text-xs tracking-widest uppercase">Mago Profesional · España</p>
      <p className="text-cream/20 text-xs mt-6">
        © {new Date().getFullYear()} — Todos los derechos reservados
      </p>
    </footer>
  )
}
