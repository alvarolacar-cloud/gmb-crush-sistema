# Doc C — Extracción de Diseño y Layout

**Versión:** 1.0  
**Input:** URL de la web de referencia (confirmada en Doc B)  
**Output:** `theme.css` + `global.css` + Layout-Map por page type  
**Gate:** Ninguno — avanza automáticamente a Doc D con lo que se obtuvo. Si no hay capacidades, marca ⚠ pendiente diseño.

---

## Paso 0 — Pre-condición de Capacidades

**Opción A — Chrome MCP / Playwright / computer-use disponible (preferida):**  
Visita la web de referencia directamente. Ejecuta snippets JS. Toma screenshots.

**Opción B — Sin acceso a navegador:**  
Pide al operador: *"Necesito screenshots de la web [URL]: homepage completa, una página de servicio y una location page si existe. También ejecuta este snippet JS en la consola del navegador y pégame el resultado."*

```javascript
// Pegar en consola del navegador sobre la web de referencia
['h1','h2','h3','p','nav a','button','.btn','body'].forEach(sel => {
  const el = document.querySelector(sel);
  if (!el) return;
  const s = getComputedStyle(el);
  console.log(sel, {
    font: s.fontFamily, size: s.fontSize, weight: s.fontWeight,
    color: s.color, bg: s.backgroundColor, lineH: s.lineHeight
  });
});
```

**Opción C — Operador no puede aportar nada:**  
Diseño queda como ⚠ pendiente. Doc D avanza con estilos neutrales. Cuando el operador aporte screenshots, se completa `theme.css` y se regenera.

---

## Paso 1 — Extracción de Paleta y Tipografía

Con las herramientas disponibles (screenshots + snippet JS), documenta:

### Design Tokens

```css
/* Ejemplo del formato esperado — sustituir con valores reales extraídos */
--font-family-primary: 'Poppins', sans-serif;
--font-family-secondary: 'Roboto', sans-serif;

--text-h1-hero: 48px / 1.3 / 700;
--text-h2: 32px / 1.4 / 600;
--text-h3: 24px / 1.4 / 600;
--text-body: 16px / 1.6 / 400;

--color-primary: #000000;        /* Color principal marca */
--color-accent: #000000;         /* CTAs y botones */
--color-bg-alt: #f5f5f5;         /* Fondos alternos */
--color-text: #1a1a1a;
--color-text-muted: #666666;

--btn-padding: 14px 32px;
--btn-radius: 4px;
--btn-font-weight: 600;

--card-radius: 8px;
--card-shadow: 0 2px 8px rgba(0,0,0,0.08);
```

**Reglas:**
- No estimes valores — si no puedes extraerlos, usa variables sin valor y márcalas `/* PENDIENTE */`
- Si la web usa fuentes de pago (Söhne, Circular, etc.), sustituye por la Google Font más cercana
- Si hay errores visuales evidentes en la referencia, anótalos y propón corrección

---

## Paso 2 — Layout-Map por Tipo de Página

### Homepage

| # | Sección | Layout | Columnas | Fondo | Imagen | Notas |
|---|---------|--------|----------|-------|--------|-------|
| 1 | Header/Nav | flex | 2 (logo + nav) | blanco | logo | |
| 2 | Hero | flex/grid | 1 o 2 | primary o imagen | hero photo | H1 + subtítulo + CTA |
| 3 | Servicios grid | grid | 2-4 | blanco | icono/foto | |
| 4 | Trust signals | flex | 3-4 | alt | no | años / proyectos / cert |
| 5 | CTA band | block | 1 | accent | no | |
| 6 | Sobre nosotros | grid | 2 | blanco | foto | |
| 7 | Testimonios | grid | 3 | alt | avatar | |
| 8 | Pre-footer | block | 1 | dark | no | NAP + links |
| 9 | Footer | grid | 3-4 | dark | no | |

*(Adapta las filas según lo que veas realmente en la web de referencia)*

### Service Overview (SO)

| # | Sección | Layout | Notas |
|---|---------|--------|-------|
| 1 | Hero SO | flex/grid | H1 servicio, sin ciudad |
| 2 | Intro + Qué es | block | |
| 3 | Proceso | grid | 3-4 pasos |
| 4 | FAQs | block | acordeón |
| 5 | CTA suave | block | → LBS hijo |
| 6 | Footer | grid | |

### Location-Based Service (LBS)

| # | Sección | Layout | Notas |
|---|---------|--------|-------|
| 1 | Hero LBS | flex/grid | H1 servicio + ciudad |
| 2 | Intro local | block | mención LCAs |
| 3 | Proceso local | grid | contexto ciudad |
| 4 | FAQs locales | block | |
| 5 | CTA fuerte | block | Llamar / Presupuesto |
| 6 | Footer | grid | |

### GeoHub (GH)

| # | Sección | Layout | Notas |
|---|---------|--------|-------|
| 1 | Hero GH | block | H1 Servicios en Ciudad |
| 2 | Descripción cobertura | block | LCAs mencionadas |
| 3 | Grid servicios | grid | links a LBS |
| 4 | Índice artículos | list | links a GA |
| 5 | Footer | grid | |

### GeoArticle (GA)

| # | Sección | Layout | Notas |
|---|---------|--------|-------|
| 1 | Hero GA | block | H1 pregunta + ciudad |
| 2 | Respuesta directa | block | |
| 3 | Desarrollo | block | |
| 4 | Contexto local | block | menciones LCAs |
| 5 | CTA suave | block | → LBS padre |
| 6 | Footer | grid | |

---

## Paso 3 — Generar theme.css y global.css

### global.css (reset mínimo — siempre igual)

```css
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; padding: 0; }
html { font-size: 16px; scroll-behavior: smooth; }
body { font-family: var(--font-family-primary, sans-serif); color: var(--color-text, #1a1a1a); }
img, video { max-width: 100%; display: block; }
input, button, textarea, select { font: inherit; }
p, h1, h2, h3, h4 { overflow-wrap: break-word; }
a { color: inherit; text-decoration: none; }
ul, ol { list-style: none; }
```

### theme.css (extraído de la web de referencia)

```css
:root {
  /* — TOKENS (rellenar con valores reales extraídos) — */
  --font-family-primary: ;
  --font-family-secondary: ;

  --text-h1-size: ;
  --text-h1-weight: ;
  --text-h2-size: ;
  --text-h2-weight: ;
  --text-body-size: ;
  --text-body-line-height: ;

  --color-primary: ;
  --color-accent: ;
  --color-bg-alt: ;
  --color-text: ;
  --color-text-muted: ;
  --color-border: ;

  --btn-padding: ;
  --btn-radius: ;
  --card-radius: ;
  --card-shadow: ;

  --container-max: 1200px;
  --section-padding: 80px 24px;
}

/* BASE */
h1 { font-size: var(--text-h1-size); font-weight: var(--text-h1-weight); }
h2 { font-size: var(--text-h2-size); font-weight: var(--text-h2-weight); }

/* HEADER */
.header { /* extraído de referencia */ }
.header__nav { display: flex; align-items: center; gap: 24px; }

/* HERO */
.hero { /* extraído de referencia */ }
.hero__title { /* extraído de referencia */ }
.hero__cta { /* extraído de referencia */ }

/* BUTTONS */
.btn-primary {
  background: var(--color-accent);
  padding: var(--btn-padding);
  border-radius: var(--btn-radius);
  font-weight: var(--btn-font-weight);
  color: white;
}

/* CARDS */
.card {
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow);
}

/* RESPONSIVE */
@media (max-width: 768px) {
  :root { --section-padding: 48px 16px; }
  h1 { font-size: calc(var(--text-h1-size) * 0.75); }
}
```

**Nota:** Las clases CSS las decide la IA al escribir los `.astro` en Doc D. `theme.css` las estiliza. No uses nombres de clases inventados — usa los que realmente aparecen en el HTML de la web de referencia o elige nombres semánticos claros.
