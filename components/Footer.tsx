export default function Footer() {
  return (
    <footer
      className="py-24 px-6 text-center relative overflow-hidden"
      style={{
        borderTop: '1px solid oklch(76% 0.18 72 / 0.12)',
        background:
          'radial-gradient(ellipse 90% 70% at 50% 110%, oklch(76% 0.18 72 / 0.18) 0%, oklch(66% 0.20 52 / 0.08) 45%, transparent 70%), oklch(6% 0.015 265)',
      }}
    >
      {/* Glow blur layer */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 50% at 50% 100%, oklch(76% 0.18 72 / 0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />
      <img
        src="/logo-martin-footer.png"
        alt="Mago Martín Delgado"
        className="mx-auto mb-6 h-16 md:h-24 w-auto object-contain relative"
      />
      <p
        className="font-display font-light mb-4 relative"
        style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'oklch(76% 0.18 72)', letterSpacing: '-0.02em' }}
      >
        Martín Delgado
      </p>
      <p
        className="tracking-[0.6em] uppercase font-sans font-light relative"
        style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.15rem)', color: 'oklch(97% 0.005 80 / 0.75)' }}
      >
        Mago Profesional · España
      </p>
      <p
        className="text-[10px] mt-8 font-sans font-light relative"
        style={{ color: 'oklch(97% 0.005 80 / 0.25)' }}
      >
        © {new Date().getFullYear()} — Todos los derechos reservados
      </p>
      <p
        className="mt-6 font-mono relative"
        style={{
          fontSize: '0.65rem',
          letterSpacing: '0.05em',
          color: 'oklch(97% 0.005 80 / 0.3)',
        }}
      >
        Powered by{' '}
        <a
          href="mailto:sergioteautomatiza@gmail.com"
          style={{ color: 'inherit', textDecoration: 'none', borderBottom: '1px solid oklch(76% 0.18 72 / 0.3)' }}
        >
          sergioteautomatiza@gmail.com
        </a>
      </p>
    </footer>
  )
}

