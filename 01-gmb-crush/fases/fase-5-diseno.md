# Fase 5 — Extracción de Diseño y Layout

**Fuente:** `Cliente preflight` (web de referencia) + inspección directa.

Esta fase extrae el diseño EXACTO de la web de referencia para replicarlo. No estimas ni inventas — trabajas con datos reales (screenshots para composición, CSS computado para valores).

**Cuándo se ejecuta:** después de Fase 3b (Redacción). Antes de Fase 6 (Build). Cierra TODAS las decisiones estéticas — el constructor NO toma decisiones de diseño, solo ejecuta lo que produce esta fase.

> **⛔ BLOQUEO:** No produzcas ningún output de diseño (tokens, layout-map, assets) sin haber completado los Pasos 1–3. Si te saltas la extracción producirás valores estimados y la web no se parecerá a la referencia.

---

## Paso 0 — Obtener la web de referencia

- Si el operador la indicó en el preflight o en Fase 0 (Investigación): usar esa.
- Si no hay referencia: pedir al operador que elija una del informe de competidores.
- Si no hay ninguna: marcar diseño como `⚠ inferido`, usar estilo limpio genérico y **SALTAR al Paso 5**.

---

## Paso 1 — Screenshots full-page

Captura screenshots completos (scroll hasta el footer) de estas páginas de la web de referencia:

1. Homepage
2. Página de servicio principal
3. Location Page (si la tiene)
4. Cualquier sección que el operador haya indicado de otra web

Guarda los archivos en `gmb-crush-ejecuciones/[slug]/diseno/`.

### Herramientas

| Entorno | Herramienta | Método |
|---------|-------------|--------|
| **Claude con computer-use** | Browser MCP | Navegar a la URL → screenshot full-page |
| **Claude Code / terminal** | Playwright | `npx playwright screenshot "https://web.com" --full-page -o screenshot-hp.png` |
| **Sin acceso a navegador** | Pedir al operador | "Sube capturas full-page de Homepage, Service Page y Location Page de la web de referencia." |

**Si no puedes hacer screenshots por ningún método:** No avances. Pide al operador que los suba. Sin screenshots no puedes mapear el layout.

---

## Paso 2 — Extraer CSS exacto

Visita cada página de la referencia y ejecuta este snippet en la consola del navegador para obtener valores reales (no estimados):

```javascript
var r = {};
['h1','h2','h3','p','nav a','button'].forEach(function(sel) {
  var el = document.querySelector(sel);
  if (el) { var s = window.getComputedStyle(el);
    r[sel] = { fontSize: s.fontSize, fontWeight: s.fontWeight, fontFamily: s.fontFamily, lineHeight: s.lineHeight, color: s.color };
  }
});
var accent = document.querySelector('a[class*="btn"], button[class*="btn"], .cta, [class*="primary"]');
if (accent) { var s = window.getComputedStyle(accent); r['btn_cta'] = { bg: s.backgroundColor, color: s.color, borderRadius: s.borderRadius, padding: s.padding, textTransform: s.textTransform }; }
var cnt = document.querySelector('.container, [class*="container"], main');
if (cnt) r['container'] = { maxWidth: window.getComputedStyle(cnt).maxWidth };
var body = document.querySelector('body');
if (body) r['body'] = { bg: window.getComputedStyle(body).backgroundColor, fontFamily: window.getComputedStyle(body).fontFamily };
JSON.stringify(r, null, 2);
```

### Herramientas

| Entorno | Herramienta | Método |
|---------|-------------|--------|
| **Claude con computer-use** | Browser MCP | Navegar a la URL → abrir DevTools → ejecutar snippet en Console |
| **Claude Code / terminal** | Playwright evaluate | Script Node con `page.evaluate()` y el snippet |
| **Sin acceso** | Pedir al operador | "Abre la web de referencia, pulsa F12, ve a Console, pega este código y pásame el resultado." |

---

## Paso 3 — Mapear Layout sección a sección

Analiza los screenshots (Paso 1) y para CADA sección de CADA página documenta:

| Campo | Qué extraer |
|-------|-------------|
| # | Número de orden (1, 2, 3...) |
| Nombre | Nombre descriptivo (ej: "Hero", "Grid Servicios", "CTA/Formulario") |
| Layout | flex / grid / block |
| Columnas | Número y proporción (ej: 55/45, 3 iguales, full-width) |
| Fondo | Color hex (del Paso 2) o "imagen" |
| Imagen | Tipo (foto real / icono / ilustración), ratio (16:9, 4:3, cuadrada), posición (izq/der/fondo) |
| Notas | Hover effects, animaciones, overlay, elementos especiales |

Produce un **Layout-Map** por page type:
- Homepage (todas las secciones de arriba a abajo)
- Service Page (equivalente a nuestro SO o LBS)
- Location Page (si la referencia la tiene)

**Alturas de hero por page type (doctrina GMB Crush):**

| Page type | Desktop | Tablet | Mobile |
|-----------|---------|--------|--------|
| Homepage  | 60vh    | 50vh   | 40vh   |
| LBS       | 50vh    | 45vh   | 40vh   |
| SO        | 40vh    | 35vh   | 30vh   |
| GeoHub    | 35vh    | 30vh   | —      |
| GeoArticle| 30vh    | 25vh   | —      |

---

## Paso 4 — Inventario de Assets

Recorre el Layout-Map y cuenta las secciones cuya columna "Imagen" no sea vacía.

Para cada imagen necesaria:
1. **Describe** qué imagen necesita (nicho del negocio + zona geográfica + estilo fotográfico extraído de la referencia)
2. **Genera** con IA o marca `[IMAGEN: descripción detallada]` como placeholder
3. **Sube** a CDN y documenta la URL

### Herramientas

| Entorno | Herramienta | Método |
|---------|-------------|--------|
| **Claude con generación** | imagen tool / DALL-E | Prompt basado en la descripción de cada imagen |
| **Sin acceso a generación** | Placeholder | Marcar `[IMAGEN: descripción detallada]` — el operador provee después |

Este inventario va al **output 16.7** de `outputs.json`.

---

## Paso 5 — Presentar propuesta al operador

Muestra al operador este resumen y **PARA AQUÍ** — espera aprobación antes de escribir ningún output:

```
He analizado la web de referencia [URL]. Propongo este diseño:

**Tipografía:** [fuente] — H1: [tamaño/peso] / H2: [tamaño/peso] / Body: [tamaño/línea]
**Colores:** Primario: [hex] / Fondo: [hex] / Texto: [hex] / CTA: [hex]

**Layout Homepage:** [nº] secciones
[tabla del layout-map]

**Layout Service Page:** [nº] secciones
[tabla del layout-map]

**Anti-patrones detectados en la referencia (no copiamos):**
- [error visual detectado y por qué lo evitamos]

**Assets necesarios:** [nº] imágenes ([nº] generadas, [nº] placeholder)

¿Apruebas este diseño?
```

Si el operador pide cambios: ajusta y vuelve a mostrar. Si aprueba: continúa al Paso 6.

---

## Paso 6 — Output definitivo en outputs.json

Tras la aprobación, escribe los 5 outputs en `outputs.json`.

### Output 16.1 — Design Tokens

```json
{
  "color_primary": "[HEX extraído del CSS]",
  "color_primary_50": "[HEX tint muy claro]",
  "color_primary_500": "[HEX medio]",
  "color_primary_900": "[HEX oscuro]",
  "color_accent": "[HEX botones/CTAs]",
  "color_bg_dark": "[HEX fondo oscuro]",
  "color_bg_light": "[HEX fondo alterno claro]",
  "color_text_main": "[HEX body text]",
  "color_text_heading": "[HEX headings]",
  "font_family": "[Nombre fuente exacto]",
  "h1_size": "[px del computed style]",
  "h2_size": "[px del computed style]",
  "body_size": "[px del computed style]",
  "body_line_height": "[valor del computed style]",
  "btn_radius": "[px del computed style]",
  "btn_padding": "[top right bottom left]",
  "btn_transform": "[uppercase | none]",
  "card_radius": "[px]",
  "card_shadow": "[valor box-shadow]",
  "hero_layout": "[centered | split | full-photo]"
}
```

### Output 16.2 — Layout Map por page type

Array de secciones extraídas en Paso 3, por page type: `homepage`, `service_page`, `location_page`, `geo_article`.

**Secciones por page type en nuestro sistema (el constructor no reordena):**

```
HOMEPAGE:
  Hero > Services Grid (S cards) > Contenido editorial >
  Trust Blocks > FAQ Accordion > CTA Final > Footer

SERVICE OVERVIEW:
  Hero compacto > Secciones de contenido x5 >
  FAQ > CTA presupuesto > Related (LBS matching + otras SO)

LBS:
  Hero local > Cobertura zonas > Contenido local >
  Trust Blocks > FAQ > CTA fixed-bottom mobile (si urgente)

GEOHUB:
  Hero ciudad > Services Menu S-cards > AC Menu >
  LCAs Section > GA Resources > Trust > CTA

GEOARTICLE:
  Hero artículo + breadcrumb > Intro respuesta directa >
  H2 sections x3-5 > FAQ > CTA a LBS padre
```

### Output 16.3 — Confirmación de diseño

Checklist del operador marcado como `status: "confirmed"`:

```json
{
  "color_primary_aprobado": true,
  "tipografia_aprobada": true,
  "hero_layout_definido": true,
  "cards_botones_confirmados": true,
  "layout_map_revisado": true
}
```

### Output 16.6 — Layout-Map definitivo

Cruza el Layout-Map (16.2) con el copy redactado en Fase 3b. Receta literal para el constructor.

Para cada page type: lista numerada de secciones con el componente Astro, las props y los datos reales (h1 del output 15.x, cta del output 1.13, etc.).

### Output 16.7 — Inventario de imágenes CDN

```json
{
  "hero_homepage": "https://[CDN]/hero-homepage.webp",
  "hero_[service-slug]": "https://[CDN]/hero-[servicio].webp"
}
```

Si hay placeholders: valor = `"[IMAGEN: descripción]"` y status = `"⚠ placeholder"`.

---

## Gate de salida — Fase 5

**STOP antes de pasar a Fase 6 (Build):**

- [ ] **16.1** — Design Tokens escritos con valores del CSS real (no estimados)
- [ ] **16.2** — Layout Map con secciones en orden por page type
- [ ] **16.3** — Diseño confirmado por operador (`status: "confirmed"`)
- [ ] **16.5** — Reglas CSS por componente (hero alturas, botones, cards, grids)
- [ ] **16.6** — Layout-Map definitivo cruzado con copy de Fase 3b
- [ ] **16.7** — Inventario de imágenes (URLs CDN o placeholders documentados)

Si cualquier output está como `⚠ inferido` sin confirmación del operador: resolver antes de build.

> **Principio irrenunciable:** El constructor (Fase 6) NO toma decisiones de diseño. Solo ejecuta lo que dice esta fase. Si una decisión de diseño se filtra al build, la consistencia visual se rompe y hay que volver atrás.

---

## Reglas

- **No estimes valores.** Si no puedes extraer el CSS exacto, pide al operador que te ayude.
- **Si la referencia tiene fotos propias:** No las copies. Genera equivalentes o marca placeholder.
- **Si hay varios colores primarios:** El de los botones/CTAs es el primario.
- **Anti-patrones:** Si la referencia tiene errores visuales (contraste bajo, layout roto en móvil), no los copies — anótalos en la propuesta del Paso 5 y propón alternativa.
- **El Layout-Map es la fuente de verdad visual para Fase 6.** El código replica la estructura sección a sección tal como está en el layout-map.
