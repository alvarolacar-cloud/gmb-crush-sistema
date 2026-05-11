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

## Contratos técnicos producidos por esta sub-fase

### Schema helpers — `src/lib/schema-helpers.ts`

Vocabulario cerrado de constructores JSON-LD que esta sub-fase usa al producir el Schema Map (§4.5). Los nombres son los que aparecen en el campo `schema_ids` de la URL Matrix (output `3.1`).

```ts
type Schema = Record<string, unknown>;

interface BreadcrumbItem { name: string; url?: string; }

export function breadcrumb(items: BreadcrumbItem[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem", position: i + 1, name: it.name,
      ...(it.url ? { item: it.url } : {}),
    })),
  };
}

interface OrganizationInput { name: string; url: string; logo?: string; sameAs?: string[]; }
export function organization(i: OrganizationInput): Schema {
  const s: Schema = { "@context": "https://schema.org", "@type": "Organization", name: i.name, url: i.url };
  if (i.logo) s.logo = i.logo;
  if (i.sameAs?.length) s.sameAs = i.sameAs;
  return s;
}

export function website({ url, name }: { url: string; name: string }): Schema {
  return { "@context": "https://schema.org", "@type": "WebSite", url, name };
}

interface LocalBusinessInput {
  name: string; url: string;
  address?: { streetAddress?: string; postalCode?: string; addressLocality?: string; addressCountry?: string };
  telephone?: string; email?: string; image?: string;
  areaServed?: Array<{ type: "City" | "AdministrativeArea"; name: string }>;
}
export function localBusiness(i: LocalBusinessInput): Schema {
  const s: Schema = { "@context": "https://schema.org", "@type": "LocalBusiness", name: i.name, url: i.url };
  if (i.address && Object.values(i.address).some(Boolean)) s.address = { "@type": "PostalAddress", ...i.address };
  if (i.telephone) s.telephone = i.telephone;
  if (i.email) s.email = i.email;
  if (i.image) s.image = i.image;
  if (i.areaServed?.length) s.areaServed = i.areaServed.map((a) => ({ "@type": a.type, name: a.name }));
  return s;
}

interface ServiceInput { name: string; url: string; description?: string; provider?: { name: string; url: string }; areaServed?: string; }
export function service(i: ServiceInput): Schema {
  const s: Schema = { "@context": "https://schema.org", "@type": "Service", name: i.name, url: i.url };
  if (i.description) s.description = i.description;
  if (i.provider) s.provider = { "@type": "Organization", ...i.provider };
  if (i.areaServed) s.areaServed = { "@type": "City", name: i.areaServed };
  return s;
}

interface ArticleInput { headline: string; url: string; description?: string; datePublished?: string; author?: { name: string; url: string }; image?: string; }
export function article(i: ArticleInput): Schema {
  const s: Schema = { "@context": "https://schema.org", "@type": "Article", headline: i.headline, url: i.url };
  if (i.description) s.description = i.description;
  if (i.datePublished) s.datePublished = i.datePublished;
  if (i.author) s.author = { "@type": "Organization", ...i.author };
  if (i.image) s.image = i.image;
  return s;
}

export function faqPage(faqs: Array<{ q: string; a: string }>): Schema {
  return {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

interface ContactPointInput { organizationName: string; telephone?: string; email?: string; url: string; }
export function contactPoint(i: ContactPointInput): Schema {
  return {
    "@context": "https://schema.org", "@type": "Organization",
    name: i.organizationName, url: i.url,
    contactPoint: {
      "@type": "ContactPoint",
      ...(i.telephone ? { telephone: i.telephone } : {}),
      ...(i.email ? { email: i.email } : {}),
      contactType: "customer service",
    },
  };
}

export function collectionPage({ name, url }: { name: string; url: string }): Schema {
  return { "@context": "https://schema.org", "@type": "CollectionPage", name, url };
}

export function webPage({ name, url, description }: { name: string; url: string; description?: string }): Schema {
  const s: Schema = { "@context": "https://schema.org", "@type": "WebPage", name, url };
  if (description) s.description = description;
  return s;
}
```

### Mapping Schema Map (§4.5) ↔ helpers

| Page type | `schema_ids` en URL Matrix |
|---|---|
| HP | `["organization", "website", "localBusiness"]` |
| SO | `["service", "webPage", "breadcrumb"]` |
| LBS | `["localBusiness", "faqPage", "breadcrumb"]` |
| GH | `["collectionPage", "breadcrumb"]` |
| GA | `["article", "faqPage", "breadcrumb"]` |
| AC | `["service", "breadcrumb"]` |
| AUX (contacto) | `["contactPoint", "organization"]` |

**Reglas de omisión obligatorias** (las funciones ya las aplican):
- `sameAs` se omite si el GBP no existe — no pasar el array.
- `address` se omite si los campos están en placeholder — no pasar el objeto.
- `telephone`/`email` se omiten si son placeholder — no pasarlos.
- `aggregateRating` no existe como helper — nunca se inventa.

### Si necesitas un schema nuevo

Si una página requiere un schema que no está en la lista (ej. `Event`, `Course`, `Product`), **añade el helper a este archivo de la doctrina antes de usarlo en una URL Matrix**. La regla doctrinal es: vocabulario cerrado, ampliable solo por edición consciente.

