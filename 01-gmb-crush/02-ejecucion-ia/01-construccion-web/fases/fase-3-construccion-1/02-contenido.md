## Fase 3 · sub-fase 2 — Contenido

### 4.1 Reglas generales de contenido
- Cada página tiene contenido **único**. No copies bloques entre páginas. **Fuente:** `Doctrina GMB Crush`.
- Los GeoArticles **responden preguntas** (informacional). No venden. **Fuente:** `Doctrina GMB Crush`.
- Las LBS **venden** (comercial). No son artículos. **Fuente:** `Doctrina GMB Crush`.
- Las Service Overviews **explican** (temático). No son locales. **Fuente:** `Doctrina GMB Crush`.

### 4.2 Specs por Page Type

**Fuente de las specs:** `Doctrina GMB Crush` (estructura y función por page type).

> **Word counts canónicos:** los rangos definitivos por page type están en la sub-fase 4 (`./04-redaccion.md`). Los de esta tabla son orientativos para el brief; en caso de conflicto, prevalece la sub-fase 4.

| Page Type | H1 | Word count | CTA | Secciones obligatorias |
|-----------|----|-----------:|-----|------------------------|
| Homepage | Marca o Categoría+Ciudad | 900–1.200 | Principal del negocio | Hero + Servicios + Trust + NAP + Links |
| Service Overview | Servicio (sin ciudad) | 850–1.000 | Suave → "¿Necesitas esto en [ciudad]?" | Qué es + Proceso + Problemas + FAQs genéricas |
| LBS | Servicio + Ciudad | 800–1.000 | Fuerte (Llamar/Presupuesto) | Contexto local + Proceso + FAQs locales + LCAs en contenido |
| GeoHub | "Servicios en [Ciudad]" | 700–1.100 | Navegacional | Índice servicios + Índice artículos + Cobertura |
| GeoArticle | Pregunta/tema + Ciudad | 1.000–1.500 | Suave → enlace a LBS | Respuesta directa + Desarrollo + Contexto local + **3 puentes narrativos** (enlaces contextuales distribuidos en el cuerpo que llevan a la LBS padre) |
| Additional Category | Categoría + Ciudad | 800–1.000 | Fuerte | Similar a LBS |
| Contacto | "Contacto" | 300–500 | Formulario + teléfono | NAP + Horarios + Formulario + Mapa |

### 4.3 Elección de CTA
**Fuente:** `Doctrina GMB Crush`. Usa esta tabla según el tipo de servicio:

| Tipo de servicio | CTA principal |
|------------------|---------------|
| Urgente (cerrajero, fontanero emergencia) | "Llamar ahora" |
| Programable (dentista, peluquería) | "Reservar cita" |
| Proyecto/B2B (reformas, instalaciones) | "Solicitar presupuesto" |
| No encaja en ninguno de los anteriores | "Solicitar presupuesto" (default seguro) |

**Criterio:** Si dudas entre dos CTAs, elige "Solicitar presupuesto" — es el más universal y no compromete.

### 4.4 Local Coverage Areas en contenido
Menciona **2-3 LCAs por LBS** (las más relevantes para ese servicio, no todas en cada página):
- La sección de cobertura de cada LBS (ej: "También atendemos en Chamberí y Salamanca").
- Las FAQs locales (ej: "¿Llegáis a Retiro?").
- El GeoHub (sección de cobertura — aquí sí listar todas).
- **Nunca** como si fueran oficinas físicas.

### 4.5 Schema JSON-LD

**Fuente:** `Doctrina GMB Crush` (asignación por page type).

| Page Type | Schema | Notas |
|-----------|--------|-------|
| Homepage | `Organization` + `WebSite` + `LocalBusiness` | `LocalBusiness.address` = NAP real. `areaServed` = Main City + LCAs como `City` o `AdministrativeArea`. |
| Service Overview | `Service` + `WebPage` + `BreadcrumbList` | `Service.provider` apunta a la Organization. |
| LBS | `LocalBusiness` + `FAQPage` + `BreadcrumbList` | Mismo `address` que Homepage. `areaServed` incluye LCAs. |
| GeoHub | `CollectionPage` + `BreadcrumbList` | — |
| GeoArticle | `Article` + `FAQPage` + `BreadcrumbList` | `author` = Organization. |
| Additional Category | `Service` + `BreadcrumbList` | `areaServed` = Main City. |
| Contacto | `ContactPoint` + `Organization` | — |

**Reglas de Schema:**
- `sameAs`: **omitir el campo completamente** si el GBP no existe (no poner `""` ni `[]` — un valor vacío en JSON-LD es diferente a ausencia del campo).
- `aggregateRating`: no incluir (no hay reseñas reales).
- `address`: solo la dirección real del NAP. Si es `[DIRECCIÓN]` placeholder, no incluir el campo.
- `areaServed`: Main City + Direct LCAs + Candidate LCAs validadas (solo cobertura real). Formato: `{"@type": "City", "name": "[Ciudad]"}` para Main City, `{"@type": "AdministrativeArea", "name": "[Barrio]"}` para LCAs validadas. No incluir zonas aspiracionales ni sin validar (coherente con §3.5).

### 4.6 Internal Linking

**Fuente:** `Doctrina GMB Crush` (mapa de enlaces por page type).

| Página | Enlaza a (en el cuerpo) | Enlaza a (en footer/nav) |
|--------|-------------------------|--------------------------|
| Homepage | Todos los SO + GeoHub | Todos los SO + GeoHub + Contacto |
| Service Overview | Su LBS hijo + 1-2 SO relacionados | Nav global |
| LBS | SO padre + GeoHub + sus 3 GAs + Contacto | Nav global |
| GeoHub | Todas las LBS + ACs + lista de GAs | Nav global |
| GeoArticle | Su LBS padre + GeoHub + 1 GA relacionado | Nav global |
| Additional Category | GeoHub + 1-2 LBS relacionadas | Nav global |

**Mínimo 3 enlaces internos en el cuerpo** de cada página (sin contar nav/footer).
**Anchors:** Variados y contextuales. No repetir el mismo texto. Ej: "instalación de aerotermia en Barcelona", "nuestro servicio de aerotermia", "ver más sobre aerotermia".

### 4.7 Breadcrumbs
**Fuente:** `Doctrina GMB Crush`.

Cada página lleva breadcrumb según su jerarquía:
- Homepage → no tiene breadcrumb (es raíz).
- SO: `Inicio > [Servicio]`
- LBS: `Inicio > [Servicio] > [Servicio] en [Ciudad]`
- GeoHub: `Inicio > [Ciudad]`
- GeoArticle: `Inicio > [Ciudad] > [Topic]`
- AC: `Inicio > [Ciudad] > [Categoría]`
- Contacto: `Inicio > Contacto`

El breadcrumb se refleja en el `BreadcrumbList` del Schema JSON-LD.

---

