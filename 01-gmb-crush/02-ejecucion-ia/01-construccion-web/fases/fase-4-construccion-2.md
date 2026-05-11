# Fase 4 — Construcción Web II · Extracción de Diseño y `theme.css`

**Fuente:** `Cliente preflight` (web de referencia) + inspección directa.

> **Cambio doctrinal v0.3.0**: la plantilla Astro es **slim** — solo provee BaseLayout + helpers (schemas, slugify, sitemap). Las páginas `.astro` las escribe la IA por cliente en Fase 3 sub-fase 4 con HTML libre. Esta Fase produce **dos cosas**: (1) `theme.css` con tokens visuales + (2) **mapa de patrones de composición** (split-hero, media-block, gallery, etc.) que la IA usa al escribir las `.astro` en sub-fase 4.
>
> Esto elimina el conflicto que existía antes entre "el diseño promete réplica fiel" y "la plantilla tiene su propio diseño". Ahora la plantilla no opina; el `theme.css` decide. No hay rigidez visual.

**Cuándo se ejecuta:** después de Fase 3 (Construcción Web I). Antes de Fase 5 (Construcción Web III — Build + Deploy).

**Tipo de parada:** gate ligero. Per `SISTEMA.md §1.2`, Fase 4 no requiere aprobación del operador. La plantilla no puede contradecir la referencia (no tiene opinión propia), así que la salida es directamente lo que extrae la IA y se avanza automáticamente a Fase 5.

---

## Paso 0 — Pre-condición de capacidades

| Capacidad | Para qué |
|-----------|----------|
| Navegador real (Chrome MCP, Playwright, computer-use con DevTools) | Visitar la web de referencia |
| Screenshot full-page | Mapear hero/header/footer/cards |
| Inspección de CSS computado (DevTools o `javascript_exec`) | Extraer valores reales |

**Sin las tres capacidades → no se ejecuta esta fase** (ya debería haberse detectado en Fase 1 — Test de Herramientas). El diseño queda como `⚠ pendiente diseño` y la web se entrega con HTML semántico sin estilos (solo `global.css` reset). Nunca se infieren tokens visuales desde texto.

Plan B si faltan capacidades:
1. Operador toma screenshots full-page de la referencia y los pega.
2. Operador conecta un MCP con navegador + DevTools.
3. El diseño queda pendiente y se resuelve post-deploy.

---

## Paso 1 — Leer el contrato de clases de la plantilla

**Sin contrato cerrado de clases CSS** (v0.3.0). La IA decide las clases CSS que usa al escribir las páginas `.astro` del cliente en sub-fase 4 de Fase 3. El `theme.css` que produzcas en esta Fase estiliza esas clases — son las que tú elijas, coherentes con la composición de la web de referencia.

Resumen de los bloques principales (ver el contrato para detalle completo):
- `.page--home / .page--lbs / .page--service-overview / .page--geohub / .page--geoarticle / .page--contact` (modificadores de `<body>`)
- `.site-header`, `.site-footer`, `.hero`, `.services-grid`, `.service-card`, `.trust-block`, `.trust-card`, `.faq`, `.cta-section`, `.lcas`, `.breadcrumb`, `.content` (con sus elementos `__title`, `__heading`, etc.)

---

## Paso 2 — Visitar la web de referencia

URL viene de:
- `fase-2-inputs-investigacion/01-inputs.md` campo "Web actual del cliente" (preferida)
- O del Informe de Competidores de Fase 2 · sub-fase 2 (Investigación), si el operador eligió una de las webs del Local Pack.

Si no hay URL → se entrega plan B al operador. **No se "infiere" un estilo genérico.**

---

## Paso 3 — Extraer paleta, tipografía y estilos de elementos

Para cada página de la referencia (Homepage como mínimo, idealmente también una Service Page y una Location Page), ejecuta:

```javascript
(function(){
  const r = {};
  // Tipografía por selector
  ['h1','h2','h3','p','nav a','button','a'].forEach(sel => {
    const el = document.querySelector(sel);
    if (el) {
      const s = window.getComputedStyle(el);
      r[sel] = {
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        lineHeight: s.lineHeight,
        color: s.color,
        textTransform: s.textTransform,
      };
    }
  });
  // Botones primarios y secundarios
  const btns = document.querySelectorAll('button, a[class*="btn"], a[class*="cta"]');
  r._buttons = [...btns].slice(0, 5).map(b => {
    const s = window.getComputedStyle(b);
    return {
      text: b.innerText.substring(0, 30),
      bg: s.backgroundColor,
      color: s.color,
      padding: s.padding,
      borderRadius: s.borderRadius,
      border: s.border,
      textTransform: s.textTransform,
    };
  });
  // Body, container, footer
  const body = document.querySelector('body');
  r._body = body ? { bg: window.getComputedStyle(body).backgroundColor, fontFamily: window.getComputedStyle(body).fontFamily } : null;
  return JSON.stringify(r, null, 1);
})()
```

---

## Paso 4 — Mapear el layout sección a sección

Toma screenshots full-page de la referencia y para cada sección visible documenta:

| Sección | Layout | Columnas | Fondo | Notas (sombras, overlays, paddings) |
|---------|--------|----------|-------|-------------------------------------|
| Header | flex | logo+nav+ctas | white | sticky, borde inferior fino |
| Hero | grid 65/35 | foto+formulario | image | overlay opcional, foto izquierda |
| ... | ... | ... | ... | ... |

Esto te informa el **layout** que codifica el `theme.css`. La plantilla emite la estructura semántica; el CSS impone Grid/Flex con las proporciones de la referencia.

---

## Paso 5 — Generar `theme.css` que estiliza el contrato

Escribe un archivo CSS que aplique los valores extraídos a las clases del contrato. **Solo clases del contrato. Solo CSS estándar. Sin Tailwind, sin frameworks.**

Estructura recomendada del `theme.css`:

```css
/* === VARIABLES (opcional, útil para mantener consistencia) === */
:root {
  --color-primary: #A32136;
  --color-primary-hover: #8E1B2D;
  --color-text-dark: #273745;
  --color-text-body: #415464;
  --color-bg: #FFFFFF;
  --color-bg-alt: #F7F7F7;
  --font-display: 'Playfair Display', Georgia, serif;
  --font-ui: 'Open Sans', system-ui, sans-serif;
}

/* === BASE === */
body { font-family: var(--font-ui); color: var(--color-text-body); background: var(--color-bg); }
h1, h2, h3 { font-family: var(--font-display); color: var(--color-text-dark); }

/* === HEADER === */
.site-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 32px; background: var(--color-bg); border-bottom: 1px solid #E5E5E5; position: sticky; top: 0; z-index: 50; }
.site-header__brand { font-size: 24px; font-weight: 700; color: var(--color-text-dark); }
.site-header__nav { display: flex; gap: 24px; }
.site-header__nav-link { color: var(--color-text-body); font-weight: 600; }
.site-header__nav-link:hover { color: var(--color-primary); }
.site-header__cta { background: var(--color-primary); color: white; padding: 8px 20px; border-radius: 36px; font-weight: 700; }

/* === HERO === */
.hero { position: relative; min-height: 60vh; overflow: hidden; }
.hero--with-image .hero__image { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.hero--with-image .hero__overlay { position: absolute; inset: 0; background: rgba(39, 55, 69, 0.5); }
.hero--solid { background: var(--color-text-dark); color: white; }
.hero__content { position: relative; z-index: 10; max-width: 1280px; margin: 0 auto; padding: 80px 32px; }
.page--home .hero { display: grid; grid-template-columns: 65fr 35fr; }
/* ... etc */

/* === SERVICES GRID === */
.services-grid { padding: 80px 32px; background: var(--color-bg-alt); }
.services-grid__heading { font-size: 44px; text-align: center; margin-bottom: 40px; }
.services-grid__list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1280px; margin: 0 auto; }
.service-card { padding: 24px; background: white; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
/* ... etc para cada bloque del contrato */

/* === RESPONSIVE === */
@media (max-width: 768px) {
  .services-grid__list { grid-template-columns: 1fr; }
  .page--home .hero { grid-template-columns: 1fr; }
}
```

**Reglas:**
- Cada clase del contrato debe tener al menos una regla. Lo que no estilizas, se ve desnudo.
- Usa variables CSS si declaras paleta + tipografía (mantenibilidad).
- Mobile-first o desktop-first, elige uno y sé consistente.
- Cero clases utility (`bg-blue-500` no existe aquí).
- Especificidad baja: estiliza por clase, no por anidación profunda.

---

## Paso 6 — Guardar `theme.css` en la carpeta del cliente

```
ejecuciones-webs/gmb-crush-ejecuciones/[slug]/theme.css
```

Fase 5 · sub-fase 1 (Build) lo copiará a `plantilla-astro/src/styles/theme.css` durante la construcción.

---

## Gate de salida — Fase 4

- [ ] `theme.css` existe en `ejecuciones-webs/gmb-crush-ejecuciones/[slug]/`
- [ ] Cubre todas las clases principales del contrato (header, hero, services-grid, trust-block, faq, cta-section, lcas, footer, content)
- [ ] Usa SOLO clases del contrato (no inventa nuevas)
- [ ] No depende de Tailwind, ni de ningún framework CSS
- [ ] Tiene al menos un breakpoint responsive (móvil)
- [ ] Los colores y fuentes coinciden razonablemente con la web de referencia

Si no hay web de referencia O si Fase 4 no pudo ejecutarse por falta de capacidades: el cliente se entrega sin `theme.css` (HTML semántico desnudo solo con `global.css` reset) y queda como `⚠ pendiente diseño` en INFORME-FINAL.

---

## Reglas

- **No estimes valores.** Si no puedes extraer el CSS exacto de un componente, pide screenshots adicionales al operador.
- **No reutilices fotos propias de la referencia.** Genera equivalentes o usa placeholders documentados (output 16.7).
- **Si la referencia usa fuentes de pago** (ej. `freight-display-pro`), sustituye por equivalente gratuita de Google Fonts (`Playfair Display`, `EB Garamond`, etc.) e indícalo en notes.
- **Si la referencia tiene errores visuales** (contraste bajo, layout roto en móvil), no los copies — anótalos y propón corrección.
- **El `theme.css` es la fuente de verdad visual para Fase 5 · sub-fase 1 (Build).** El constructor no toma decisiones de diseño, solo copia el theme.

---

## Contratos técnicos producidos por esta sub-fase

### `global.css` — reset de referencia

El `theme.css` que produzcas se carga **después** de un `global.css` neutral (sin opiniones de color/fuente). Snippet canónico a poner en `src/styles/global.css` del proyecto del cliente:

```css
/* Reset mínimo. Sin opiniones de diseño. El theme.css decide la apariencia. */

*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; padding: 0; }

html { -webkit-text-size-adjust: 100%; -moz-tab-size: 4; tab-size: 4; }
body { min-height: 100vh; line-height: 1.5; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; display: flex; flex-direction: column; }
main { flex: 1; }
img, picture, video, canvas, svg { display: block; max-width: 100%; }
input, button, textarea, select { font: inherit; }
p, h1, h2, h3, h4, h5, h6 { overflow-wrap: break-word; }
button { background: none; border: none; cursor: pointer; }
a { color: inherit; text-decoration: none; }
ul, ol { list-style: none; }
```

### `theme.css` — clases las decide la IA

A diferencia del modelo anterior, **no hay contrato cerrado de clases CSS**. La IA decide qué clases usa en las `.astro` (sub-fase 4 de Fase 3) y qué clases estiliza en el `theme.css`. Las dos cosas se coordinan en esta fase + sub-fase 4.

**Orden recomendado:**
1. Esta Fase 4 produce primero **el mapa de patrones** (composición sección a sección de la referencia) y **propone una lista de clases CSS** que la IA va a usar.
2. Esta Fase 4 produce el `theme.css` estilizando esas clases.
3. Sub-fase 4 de Fase 3 escribe las `.astro` usando exactamente esas clases.

Si en sub-fase 4 hace falta una clase nueva → añadirla al theme primero, luego usarla en el HTML.
