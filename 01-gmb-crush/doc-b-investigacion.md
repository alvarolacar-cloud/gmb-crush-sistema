# Doc B — Investigación, Arquitectura y Documentos Canónicos

**Versión:** 1.0  
**Input:** Doc A completo (campos bloqueantes: nombre, categoría, ciudad, servicios)  
**Output:** Arquitectura del cluster + 6 Docs Canónicos + Test Doctrinal PASS  
**Gate:** Operador confirma servicios + web de referencia → IA avanza. Test Doctrinal FAIL → corrige y retest.

---

## Fase 1 — Investigación de Mercado

### 1.1 Búsqueda en Local Pack

Ejecuta la query `[categoría] [ciudad]` en Google y extrae los **3-5 primeros resultados del Local Pack** (no orgánicos, no agregadores como Habitissimo/Houzz).

**Si tienes navegador/Chrome MCP (Opción A):** Ejecuta la búsqueda directamente.  
**Si no tienes navegador (Opción B):** Pide al operador: *"Busca '[categoría] [ciudad]' en Google y pégame los nombres + URLs de los 3-5 resultados del Local Pack."*  
**Si operador no puede (Opción C):** Marca investigación como ⚠ pendiente y continúa con los inputs de Doc A únicamente.

### 1.2 Análisis de Competidores

Para cada competidor encontrado, analiza:

| Competidor | URL | Servicios como página | Patrón URL | Trust signals | ¿Web recomendada como referencia? |
|------------|-----|----------------------|------------|---------------|----------------------------------|
| | | | | | |
| | | | | | |
| | | | | | |

**Campos a observar:**
- ¿Tienen hub de servicios, location pages, blog?
- ¿Qué servicios tienen como página standalone?
- ¿Qué patrón de slugs usan? (`/servicios/slug/`, `/[ciudad]/[servicio]/`, etc.)
- ¿Qué trust signals usan? (años, certificaciones, garantías, n.º de trabajos)
- ¿Publican precios? ¿Reviews?

### 1.3 Propuesta de Cambios

Presenta al operador un mensaje estructurado:

```
ELIMINAR del Doc A: [lista]
AÑADIR al Doc A: [lista]
CONFIRMAR del Doc A: [lista]

Web recomendada como referencia de diseño: [URL]
Razón: [posición en Local Pack, calidad visual, relevancia]
```

**⚠ PARADA:** Espera confirmación del operador sobre:
1. Lista de servicios definitiva (variable S)
2. Web de referencia para Doc C

---

## Fase 2 — Arquitectura del Cluster

### 2.1 Fórmula Maestra

Con S, A y G confirmados, calcula el total de páginas:

```
Total páginas SEO = 1 + S + 1 + S + A + (G × S)

1     = Homepage (HP)
S     = Service Overviews (SO) — sin ciudad en URL
1     = GeoHub ciudad principal (GH)
S     = Location-Based Services ciudad principal (LBS)
A     = Additional Category Pages (AC) — 0 si no hay
G × S = GeoArticles (GA) — G=3 por defecto

+ 1 /contacto/ (auxiliar, fuera del conteo SEO)
```

**Ejemplo con S=5, A=1, G=3:**
`1 + 5 + 1 + 5 + 1 + (3×5) = 28 páginas SEO + 1 contacto = 29 total`

### 2.2 Variables del Cluster

| Variable | Valor | Fuente |
|----------|-------|--------|
| Main City | | NAP en Doc A |
| S — Servicios | | Confirmado por operador |
| A — Categorías adicionales | | Doc A Bloque 2 |
| G — GeoArticles por servicio | 3 | Default (puede ser 2) |
| LCAs directas | | Extraídas del NAP (barrio, distrito) |
| LCAs candidatas | | Test GEO 3/6 (ver referencia.md) |
| Primary Category | | Top categoría en Local Pack |

### 2.3 Temas de GeoArticles (G × S)

3 temas canónicos por servicio:
- **Precio:** "Cuánto cuesta [servicio] en [ciudad]"
- **Proceso:** "Cómo funciona [servicio] en [ciudad]"
- **Comparativa:** "[servicio] vs [alternativa] en [ciudad]"

### 2.4 URL Matrix

Genera la tabla completa de URLs siguiendo los patrones exactos:

| Page Type | Patrón URL | Ejemplo |
|-----------|-----------|---------|
| HP | `/` | `/` |
| SO | `/[cat]/[serv]/` | `/cerrajero/apertura-puertas/` |
| GH | `/[cat]/[ciudad]/` | `/cerrajero/madrid/` |
| LBS | `/[cat]/[ciudad]/[serv]/` | `/cerrajero/madrid/apertura-puertas/` |
| AC | `/[cat-adicional]/[ciudad]/` | `/duplicado-llaves/madrid/` |
| GA | `/[ciudad]/[topic-slug]/` | `/madrid/cuanto-cuesta-apertura-puertas/` |
| Contacto | `/contacto/` | `/contacto/` |

**Reglas de URL irrompibles:**
- LCAs (barrios, distritos, zonas) **NUNCA** generan URLs — solo enriquecen contenido
- SO no lleva ciudad en URL — es pilar temático, no local
- GeoHub existe siempre — una página por cada ciudad que genere arquitectura

```typescript
interface UrlMatrixEntry {
  url: string;
  page_type: 'HP' | 'SO' | 'GH' | 'LBS' | 'AC' | 'GA' | 'Contacto';
  parent: string | null;
  schema_ids: string[];
  status: 'confirmed' | '⚠ placeholder';
}
```

### 2.5 Internal Linking Plan

| Desde | Enlaza a | Mínimo |
|-------|----------|--------|
| HP | Todos SO + GH + Contacto | 3 en cuerpo |
| SO | Sus LBS hijo + SO relacionadas | 3 en cuerpo |
| LBS | SO padre + GH + sus GA hijo + Contacto | 3 en cuerpo |
| GH | Todos LBS + AC + GA ciudad | 3 en cuerpo |
| GA | LBS padre + GH + GA relacionada | 3 en cuerpo |
| AC | GH + LBS relacionadas | 3 en cuerpo |

Breadcrumbs obligatorios por jerarquía:
- `HP > SO > LBS`
- `HP > GH > GA`
- `HP > AC`

---

## Fase 3 — Content Pack

Para cada URL de la URL Matrix, genera un brief:

| Campo | SO | LBS | GH | GA |
|-------|----|----|----|----|
| H1 | Servicio sin ciudad | Marca — Servicio en Ciudad | Servicios en Ciudad | Pregunta en Ciudad |
| Meta title | Servicio \| Marca | Marca — Serv Ciudad \| Cat | Cat Ciudad \| Marca | Pregunta Ciudad \| Marca |
| Meta desc | 155 chars, no ciudad | 155 chars, ciudad + CTA | 155 chars, servicios | 155 chars, respuesta directa |
| Word count | 850-1000 | 800-1000 | 700-1100 | 1000-1500 |
| Hero | Servicio + CTA suave | Servicio + ciudad + urgencia | Cobertura + índice | Pregunta + respuesta directa |
| H2s | qué es / proceso / FAQs | proceso local / FAQs locales | servicios / artículos | desarrollo / contexto local |
| CTA | Suave → a LBS hijo | Fuerte: Llamar / Presupuesto | Suave → a LBS | Suave → a LBS padre |
| LCAs en texto | No | 2-3 menciones naturales | Lista de LCAs | 1-2 menciones |

**Reglas de contenido:**
- GAs responden preguntas, no venden
- LBS vende, no es artículo
- SOs explican, no son locales
- Datos verificables en lugar de adjetivos ("10 años" no "años de experiencia")
- Hero cabe en móvil sin scroll
- Problema antes que solución

**CTA por tipo de negocio:**
- Urgente → "Llamar ahora"
- Programable → "Reservar cita"
- Proyecto → "Pedir presupuesto"

---

## Fase 4 — Schema Map

Asigna schemas por page type:

| Page Type | Schemas JSON-LD |
|-----------|----------------|
| HP | Organization + WebSite + LocalBusiness |
| SO | Service + WebPage + BreadcrumbList |
| LBS | Service + LocalBusiness + BreadcrumbList |
| GH | CollectionPage + BreadcrumbList |
| GA | Article + FAQPage + BreadcrumbList |
| AC | Service + LocalBusiness + BreadcrumbList |
| Contacto | LocalBusiness + ContactPage |

**Reglas de omisión:**
- Sin `sameAs` si GBP no existe o no está confirmado
- Sin `address` si NAP tiene placeholders
- Sin `aggregateRating` — nunca, sin excepción
- Sin `openingHours` si no se aportó

**10 helpers JSON-LD disponibles** (la IA los reproduce en la construcción):
`breadcrumb` · `organization` · `website` · `localBusiness` · `service` · `article` · `faqPage` · `contactPoint` · `collectionPage` · `webPage`

---

## Fase 5 — Test Doctrinal (Gate Pre-Build)

Ejecuta este checklist antes de avanzar a Doc C o Doc D. **FAIL en cualquier punto bloqueante = para, corrige, retest. No avanzas con FAIL aunque el operador lo pida.**

### Bloque 1 — Arquitectura
- [ ] HP declarada (`/`)
- [ ] Cada SO tiene URL sin ciudad
- [ ] GeoHub existe (`/[cat]/[ciudad]/`)
- [ ] Cada LBS tiene URL con ciudad
- [ ] SO y LBS son páginas separadas (no mezcladas)
- [ ] GA existe por cada servicio (G × S entradas)

### Bloque 2 — Fórmula
- [ ] S declarado como número
- [ ] A declarado como número (puede ser 0)
- [ ] G declarado como número
- [ ] Total de URLs cuadra con `1+S+1+S+A+(G×S)+1`

### Bloque 3 — URLs
- [ ] SO no tiene ciudad en URL
- [ ] LBS tiene `[cat]/[ciudad]/[serv]/`
- [ ] GH tiene `[cat]/[ciudad]/`
- [ ] GA tiene `[ciudad]/[topic]/`
- [ ] **Ninguna LCA genera URL propia**

### Bloque 4 — Contenido
- [ ] Cada URL tiene H1, meta title, meta desc, word count asignados
- [ ] GA no tiene CTA de venta directo (solo suave → LBS)
- [ ] LBS tiene al menos 1 mención de LCA en cuerpo
- [ ] HP enlaza a todos SO + GH + Contacto

### Bloque 5 — Schemas
- [ ] Cada page type tiene schemas asignados según tabla
- [ ] Sin `aggregateRating` en ninguna página
- [ ] Sin `sameAs` si GBP no confirmado
- [ ] Sin `address` si hay placeholders en NAP

**Instant FAIL (para inmediatamente):**
- LCAs en URLs → FAIL
- SO y LBS misma URL o mismo H1 → FAIL
- GA con CTA de venta directa → FAIL
- GeoHub no existe → FAIL
- SO sin enlace a sus LBS hijo → FAIL
- Schema genérico igual en todas las páginas → FAIL
- Dirección física inventada → FAIL

**Resultado:** PASS → avanza a Doc C. FAIL → corrige docs y retest.
