# WHITEMARK — Mago Martín Delgado — Landing Page
> Documento de propiedad técnico-comercial. Versión: 2026-05-29.
> Un Claude Code nuevo puede retomar este proyecto leyendo **solo este archivo**.

---

## 1. Identidad del Proyecto

- **Nombre:** Mago Martín Delgado — Landing Page Premium
- **Cliente:** Martín Delgado (mago profesional, Granada, España)
- **Tipo de negocio:** Artistas & Creativos — landing de captación de clientes
- **Fecha inicio:** Mayo 2026
- **Estado:** En desarrollo (11 archivos modificados sin commitear, 2 untracked)
- **Repo:** `magomartindelgado-web/` (master branch)
- **Deploy:** https://www.magomartindelgado.com (Vercel, cuenta `sergiorocheca-coder`)
- **Whitemark Notion:** en DB Whitemarks del Empresa OS (id `36f3658f-9915-818b-a138-f40d58564833`)

---

## 2. Objetivo y Alcance

**Qué se construye y por qué:** Landing de captación de alto impacto visual para mago profesional. El objetivo es convertir visitas en solicitudes de presupuesto (WhatsApp/email directo). Diferenciador: experiencia de scroll cinematográfica única en el sector magia española — canvas video-scroll con 285 frames webp sincronizado con GSAP ScrollTrigger.

**EN SCOPE:**
- Landing one-page: video-scroll hero, about, servicios, showreel YouTube, testimonios, contacto, footer
- SEO local Granada (JSON-LD LocalBusiness, metadata Open Graph, sitemap, robots)
- Security headers (CSP, HSTS, X-Frame-Options, etc.)
- Mobile responsive con fallback estático

**FUERA DE SCOPE:**
- Panel de administración
- Formulario con backend (contacto va a WhatsApp/email directo)
- Pasarela de pago, blog, multi-idioma

---

## 3. Stack Técnico Completo

| Tecnología | Versión | Por qué se eligió |
|---|---|---|
| Next.js | 16.2.6 | App Router, SSR, RSC, metadata API nativa. Deploy 0-config en Vercel. |
| React | 19.2.4 | Concurrent features. `useCallback` para el preloader gate. |
| GSAP + ScrollTrigger | 3.15.0 | Canvas video-scroll frame-perfect. La alternativa (CSS scroll-driven) no da control de frame granular. |
| Lenis | 1.3.23 | Smooth scroll. Wrapper con LenisContext. `lerp=0.1`, `wheelMultiplier=0.85`, `touchMultiplier=1.5`. |
| Motion (Framer Motion) | 12.39.0 | Preloader `AnimatePresence` + exit slide-up. Solo se usa aquí — no mezclar con GSAP. |
| Tailwind CSS | 4.x | Utility-first. Via `@tailwindcss/postcss` (v4 no usa `tailwind.config.js`). |
| TypeScript | 5.x | Strict mode. Todos los componentes tipados. |
| Lucide React | 1.16.0 | Iconos. |
| Google Fonts | — | Cormorant Garamond (display serif, `--font-cormorant`) + Montserrat (sans, `--font-montserrat`). Via `next/font`, zero FOUT. |

**Paleta de color (OKLCH):**
- Background dark navy: `oklch(6% 0.015 265)`
- Gold: `oklch(76% 0.18 72)` → accents, CTA, líneas decorativas
- Cream: `oklch(97% 0.005 80)` → texto principal
- Gold darker: `oklch(66% 0.20 52)` → gradiente del botón CTA

---

## 4. Arquitectura

### Estructura de carpetas
```
magomartindelgado-web/
├── app/
│   ├── layout.tsx        — fonts, metadata, JSON-LD, SmoothScroll wrapper, CursorGlow
│   ├── page.tsx          — orquesta todos los componentes, gate del preloader
│   ├── globals.css       — reset + utilidades CSS globales
│   ├── robots.ts         — Next.js robots metadata API
│   └── sitemap.ts        — Next.js sitemap metadata API
├── components/
│   ├── VideoScrollHero.tsx   — hero principal (canvas + GSAP, 285 frames)
│   ├── HeroSection.tsx       — fallback mobile (estático, sin canvas)
│   ├── Preloader.tsx         — splash screen de entrada (Motion)
│   ├── SmoothScroll.tsx      — Lenis wrapper + LenisContext
│   ├── CursorGlow.tsx        — efecto glow cursor desktop
│   ├── NavBar.tsx            — navbar desktop centrado
│   ├── MobileNav.tsx         — navbar mobile (hamburger)
│   ├── AboutSection.tsx      — sección sobre el mago
│   ├── ServicesSection.tsx   — bento 2x2 de servicios
│   ├── ShowreelSection.tsx   — embed YouTube showreel
│   ├── TestimonialsSection.tsx — testimonios
│   ├── ContactSection.tsx    — contacto (WhatsApp + email)
│   └── Footer.tsx            — pie de página
│   └── ui/                   — componentes shadcn/ui si los hay
├── public/
│   ├── frames/           — 285 webp frames del video (críticos para VideoScrollHero)
│   └── *.mp4             — video original (Magician's_hands_explode_card_...)
├── next.config.ts        — security headers + CSP completa
└── package.json
```

### Componentes clave y su responsabilidad

**`VideoScrollHero`** — el corazón técnico:
- `<section>` de 250vh con canvas pinned a 100vh via ScrollTrigger
- Carga frames webp bajo demanda con ventana de preload de +50 frames
- `drawFrame()` en canvas en modo "cover" (escala para llenar viewport)
- 3 momentos de texto sincronizados con el progreso del scroll:
  - Momento 1 (0–0.28): hero copy con CTA
  - Momento 2 (0.30–0.68): narración en cards blur con stagger de líneas
  - Momento 3 (0.72+): CTA puente hacia la siguiente sección
- **Mobile:** si `window.matchMedia('max-width: 767px')`, renderiza `<HeroSection>` estático

**`SmoothScroll`** — Lenis wrapper:
- Instancia Lenis en `useEffect`, corre RAF loop
- Expone `useLenis()` hook via Context
- Intercepta clicks en `a[href^="#"]` para smooth scroll con easing expo

**`Preloader`** — splash screen:
- 1800ms timeout → `visible=false` → Motion exit `y: '-100%'` (0.85s)
- `onComplete` se llama 900ms después del exit para sincronizar
- `page.tsx` guarda `ready` state — VideoScrollHero no monta GSAP hasta `ready=true`

### Flujo de datos / boot sequence
```
1. page.tsx monta Preloader (ready=false)
2. SmoothScroll (layout.tsx) inicia Lenis + RAF loop
3. Preloader: 1800ms → exit animation → onComplete → ready=true
4. VideoScrollHero recibe ready=true → useEffect registra GSAP ScrollTrigger
5. ScrollTrigger.refresh() a los 100ms → sincroniza posiciones con Lenis
6. Usuario hace scroll → onUpdate → frameIndex calculado → drawFrame()
```

---

## 5. Cronología de Desarrollo

| Commit | Hash | Qué se hizo |
|---|---|---|
| 1 | `699183e` | MVP luxury magician website. Estructura base, diseño inicial. |
| 2 | `4969f14` | Redesign editorial luxury: paleta oklch, sin emojis, numeración romana, servicios editoriales. |
| 3 | `35b0c38` | Lenis smooth scroll + preloader + animación hero word-split + reveals cinematográficos. |
| 4 | `65a03ae` | Phase 2 UX: scroll showreel, CTA animado, cursor glow, mobile nav hamburger. |
| 5 | `df24f6d` | Brand overhaul: showreel YouTube, bento 2x2 servicios, botones degradado, nueva paleta. |
| 6 | `85da0f8` | Fix datos reales: número WhatsApp (+34648146024) y email (martindelgadosalud@gmail.com) del cliente. |
| 7 | `a1b692a` | Navbar centrado, Google Maps removed, botones redondeados, security headers, JSON-LD, fix showreel mobile. |
| **WIP** | sin commit | VideoScrollHero con canvas + 285 frames webp, robots.ts, sitemap.ts, next.config.ts con CSP completa. |

---

## 6. Análisis de Fallos y Riesgos

### 6a. Bugs encontrados + fixes exactos

| Bug | Fix |
|---|---|
| ScrollTrigger + Lenis desincronía → pin en posición incorrecta | `setTimeout(() => ScrollTrigger.refresh(), 100)` tras crear el trigger |
| Canvas sobredimensionado en Retina | `Math.min(window.devicePixelRatio, 2)` para capear DPR |
| Canvas frames no cargan a tiempo en mobile → pantalla negra | `matchMedia('max-width: 767px')` → renderizar `HeroSection` estático en mobile |
| GSAP ScrollTrigger registrado antes de que el DOM tuviera altura real | Prop `ready` en `VideoScrollHero` — GSAP solo se inicializa tras `onComplete` del preloader |
| Hydration mismatch en SSR: `window.matchMedia` no existe en servidor | `const [checked, setChecked] = useState(false)` — render condicional solo cuando `checked=true` |

### 6b. Riesgos técnicos por dependencia

- **GSAP ScrollTrigger + Lenis + Next.js 16:** la combinación requiere que Lenis RAF esté corriendo antes de que ScrollTrigger calcule posiciones. El `refresh()` de 100ms es un workaround frágil. Si Lenis tarda más (red lenta, CPU bajo), el pin puede fallar. Solución robusta: escuchar el evento `lenis:ready` o usar `useLenis()` hook.
- **285 webp frames en `public/`:** ~50–100MB en disco. Vercel tiene límite de 100MB por build. Si los frames crecen o se añaden más secciones con frames, migrar a CDN (Cloudflare R2, Bunny.net, Vercel Blob).
- **Next.js 16 + React 19:** versiones recientes con potenciales breaking changes en dependencias de terceros.
- **CSP con `unsafe-inline`:** necesario para Next.js App Router hydration scripts. Para CSP estricta habría que implementar nonce en middleware — scope separado.
- **Motion + GSAP coexistencia:** Motion solo se usa en Preloader, GSAP en VideoScrollHero. No mezclar los dos sistemas de animación en el mismo componente.

### 6c. Decisiones que podrían exigir refactor al escalar

- Los 285 frames son estáticos en `public/`. Cambiar el video = regenerar todos los frames con `ffmpeg` + re-deploy. Para producción: pipeline de generación de frames + CDN.
- Sin backend de formulario: contacto va a WhatsApp/email directo. Para capturar leads en base de datos: añadir API route + Notion o Resend.

---

## 7. Estado Actual del Negocio

- **Acordado con cliente:** landing premium para mago profesional en Granada
- **Implementado:** diseño completo, video-scroll hero con 285 frames webp, todas las secciones, SEO completo, security headers, mobile responsive con fallback
- **Pendiente técnico:** commitear 11 archivos modificados + 2 untracked, testear en producción con frames reales, formulario de contacto con backend (opcional)
- **Pendiente comercial:** acordar precio final, revisión con el cliente, deploy a dominio `magomartindelgado.com`
- **Estado relación:** activo, en desarrollo
- **Cobros:** acordado: pendiente definir · recibido: 0€ · pendiente: por definir

---

## 8. Próximos Pasos

### Técnicos (por prioridad)
1. `git add . && git commit -m "feat: VideoScrollHero canvas scroll, sitemap, robots, CSP completa"` — no perder el trabajo actual
2. Verificar que los 285 frames en `public/frames/` están completos (`ls public/frames/ | wc -l`)
3. `npm run build` — verificar que el build pasa con la CSP y los frames
4. Test en mobile real (iOS Safari + Android Chrome)
5. Revisar tamaño total de `public/frames/` vs límite Vercel 100MB
6. (Opcional) Formulario de contacto → API route → Notion / email

### Comerciales
1. Acordar precio y condiciones con Martín Delgado
2. Revisión final con el cliente
3. Deploy a `magomartindelgado.com` (apuntar DNS a Vercel)

---

## 9. Cómo Continuar este Proyecto

```bash
cd magomartindelgado-web
npm run dev          # arranca en localhost:3000
npm run build        # verifica que el build pasa
git status           # hay 11 modified + 2 untracked SIN commitear — commitear primero
```

**Leer primero:** este WHITEMARK, luego `components/VideoScrollHero.tsx` (el corazón técnico), luego `app/layout.tsx` (boot sequence).

**NO tocar sin entender:**
- `public/frames/` — son los 285 webp del video-scroll. No borrar, no renombrar.
- El `setTimeout(() => ScrollTrigger.refresh(), 100)` en VideoScrollHero — es el fix de sincronización Lenis/GSAP.
- La prop `ready` de VideoScrollHero — es el gate que evita el hydration mismatch.

**Contexto del sistema:** este proyecto vive en el Empresa OS de Notion (DB Proyectos + DB Whitemarks). Los IDs de Notion están en `C:\Users\Sergio\.claude\notion-ids.json`. Para actualizar la documentación en Notion, usar la API REST con PowerShell (`Invoke-RestMethod`, `Notion-Version: 2022-06-28`).
