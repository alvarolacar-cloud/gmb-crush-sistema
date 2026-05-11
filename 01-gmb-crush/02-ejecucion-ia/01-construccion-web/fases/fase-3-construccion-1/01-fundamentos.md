## Fase 3 · sub-fase 1 — Fundamentos y Arquitectura

### Contrato

- **Inputs esperados:** NAP + servicios confirmados (Fase 2 sub-1) + Informe de Competidores con categoría GBP + trust signals dominantes (Fase 2 sub-2).
- **Outputs producidos:** outputs `1.5` (Primary Category), `1.6` (Additional Categories), `1.7` (Main City), `1.9` (Core Services), `1.10` (LCAs Direct + Candidate), `1.14` (Trust Signals), `3.1` (URL Matrix completa con shape canónico), `3.4` (GeoArticle Topics).
- **Gate de salida:** GATE DOCTRINAL §3.10 — entrega al operador de la Arquitectura Propuesta + checklist + datos pendientes.
- **Si falta un input bloqueante:** sin ciudad → STOP, pide al operador (§3.1). Sin Informe de Competidores → vuelve a Fase 2 sub-2. Sin dirección → STOP antes de definir LCAs (§3.5 gate previo).

---

> **Si has llegado aquí, estás en el lugar correcto.** Lee este archivo completo antes de producir ningún output. Los patrones de URL, la fórmula de páginas y las convenciones de naming están en las secciones siguientes — no en el SISTEMA.md.

Cada output de esta fase tiene una fuente y un método concreto. Síguelos en orden.

### 3.1 Main City
- **Dato que buscamos:** La ciudad principal de operación.
- **Cómo se obtiene:** Extraer el campo `City` de la dirección del preflight (`01-gmb-crush/02-ejecucion-ia/01-construccion-web/fases/fase-2-inputs-investigacion/01-inputs.md` campo 3, bloqueante).
- **Fuente:** `Cliente preflight`.
- **Si falta dirección completa pero hay ciudad** (ej. operador dijo "fontanero en Barcelona"): la ciudad cuenta como `confirmed` por declaración del operador. Calle/número/CP van como `[DIRECCIÓN]` placeholder visible.
- **Si falta también la ciudad:** STOP. La ciudad es bloqueante per `01-gmb-crush/02-ejecucion-ia/01-construccion-web/fases/fase-2-inputs-investigacion/01-inputs.md`. Pídela al operador antes de continuar.

### 3.2 Primary Category
- **Dato que buscamos:** La categoría GBP principal (ej: "Fontanero", "Cerrajero", "Instalador de climatización").
- **Cómo se obtiene:** Tomar la "Categoría GBP más frecuente" del **Informe de Competidores** producido en Investigación. Marcar `confirmed`.
- **Fuente:** `Doctrina + Local Pack`.
- **Si ninguna categoría aparece en 3+ de 5 perfiles del informe:** Elegir la que aparece en 2 de 5. Si hay empate, elegir la más específica. Si solo aparece en 1, usar esa (es la mejor señal disponible) y marcarlo en notas.
- **Si no existe el Informe de Competidores:** Vuelve a Investigación y ejecútala. **Esta fase no infiere categorías.** El Informe es el único origen válido.
- **Slug:** La plantilla genera el slug automáticamente aplicando slugify al valor del output 1.5. No lo definas manualmente — la plantilla lo calcula.

### 3.3 Core Services (Variable S)
- **Dato que buscamos:** Lista de servicios con intención de búsqueda diferenciada.
- **Cómo se obtiene:** Tomar los servicios **confirmados por el operador** de la Matriz de Servicios del Informe de Competidores (Investigación). Marcar `confirmed`.
- **Multi-ciudad (opcional):** Si el operador declaró ciudades adicionales en el preflight, el Informe de Investigación ya cruza servicios entre ciudades. Los servicios que aparecen en 2+ ciudades del sector son los más sólidos. La arquitectura sigue siendo solo para la Main City.
- **Fuente:** `Doctrina + Local Pack` + confirmación operador.
- **Si no existe el Informe:** Vuelve a Investigación. **Esta fase no infiere servicios.**
- **Regla anti-duplicación:** Si dos servicios responden a la misma búsqueda del usuario (test: "¿alguien buscaría esto por separado?"), fusionar en uno. En caso de duda, NO crear el servicio — es mejor tener S=4 sólidos que S=6 con canibalización.
- **S es variable:** Puede ser 3, 4, 5, 6 o más. No forzar a 5.
- **Criterio para fijar S:** Solo incluir servicios que (1) el negocio realmente ofrece Y (2) tienen intención de búsqueda propia verificable en el Informe. En caso de duda, S más bajo es mejor que S más alto.

### 3.4 Additional Categories (Variable A)
- **Dato que buscamos:** Categorías GBP secundarias que necesitan página propia.
- **Cómo se obtiene:** Cruzar las categorías secundarias extraídas en el Informe de Competidores (Investigación) con los servicios del cliente. Descartar las ya cubiertas por un core service.
- **Fuente:** `Doctrina + Local Pack`.
- **Si el Informe no muestra categoría adicional clara:** A=0. **No se inventa una categoría adicional.**
- **Criterio:** Necesita página propia si (1) el negocio la ofrece Y (2) no es sinónimo ni subconjunto de un core service.

### 3.5 Local Coverage Areas (LCAs)

El sistema GMB Crush separa el territorio en 3 capas que NUNCA se mezclan:
- **Main City** (1.7) → crea arquitectura (URLs).
- **Local Coverage Areas** (1.10) → refuerzan contenido y schema. NUNCA generan URLs.
- **Approved Expansion Areas** (1.11) → generan URLs solo si se aprueban (default vacío en Phase 1).

**Las LCAs son SOLO barrios/distritos dentro de la Main City. Nunca otras ciudades.**

#### Gate previo — Direccion obligatoria

**Antes de definir cualquier LCA, verifica que el preflight tiene direccion fisica.**

- Si la direccion esta presente → continua con Direct LCAs y Candidate LCAs.
- Si la direccion falta → **STOP**. Pregunta al operador:

  > "Necesito la direccion fisica del negocio (calle, numero, ciudad, CP) para determinar las zonas de cobertura. Sin ella no puedo definir las LCAs."

  No avances hasta tener respuesta. No inventes zonas sin ancla fisica.

#### Direct LCAs
- **Dato que buscamos:** Barrio + distrito de la dirección física del NAP.
- **Cómo se obtiene:** Extraer directamente del NAP. Sin más validación.
- **Fuente:** `Cliente preflight`.
- **Ejemplo:** Dirección en Calle Rafael Calvo 40 → Direct LCAs: Almagro (barrio), Chamberí (distrito).

#### Candidate LCAs
- **Dato que buscamos:** Zonas dentro de la Main City donde el negocio podría posicionarse.
- **Cómo se obtiene (4 pasos):**
  1. Revisar áreas de servicio de 3-5 competidores top en Google Maps.
  2. Listar zonas que aparecen en ≥2 competidores Y no son Direct.
  3. Aplicar el **test de coherencia GEO** a cada zona candidata.
  4. Las que pasan entran como contenido. Solo generan URL si pasan a AEA (post-launch).
- **Fuente:** `Doctrina + Local Pack`.
- **Si el Informe de Competidores no muestra zonas claras o no se ejecutó la búsqueda de áreas de servicio:** Candidate LCAs = ∅. **No se inventan barrios.** Solo quedan las Direct LCAs (las que salen del NAP).
- **Máximo Candidate LCAs:** 8. Si hay más candidatas que pasan el test, elegir las más cercanas a la dirección física.

#### Test de Coherencia GEO (3 de 6)

**Filtro previo obligatorio:** La zona pertenece a la Main City (es barrio/distrito, no otra ciudad). Si no pasa → descartada.

**6 criterios (mínimo 3 para pasar, el criterio 6 es OBLIGATORIO):**

**Nota:** El criterio 6 (No falsa ubicación) debe cumplirse SIEMPRE. Una zona que pasa 3 de los primeros 5 criterios pero NO cumple el 6 queda DESCARTADA.

| # | Criterio | Pregunta |
|---|----------|----------|
| 1 | Ancla física | ¿Sale directamente de la dirección o está conectada? |
| 2 | Main City | ¿Pertenece claramente a la Main City? |
| 3 | Proximidad | ¿Está cerca o conectada al punto físico? |
| 4 | Intención local | ¿Explica una necesidad local real del servicio? |
| 5 | Demanda/competencia | ¿Hay búsquedas o competidores trabajando esa zona? |
| 6 | No falsa ubicación | ¿Puede mencionarse sin afirmar oficina física allí? |

#### Dónde aparecen las LCAs

| Dónde | Qué se puede hacer | Qué NO se puede hacer |
|-------|--------------------|-----------------------|
| Contenido LBS | "Atendemos en Chamberí, Salamanca..." | "Oficina en Salamanca" |
| FAQs locales | "¿Llegáis a Retiro?" | Crear URL `/retiro/` |
| GeoHub | Sección de cobertura | Listar como sedes |
| Schema `areaServed` | Solo cobertura REAL o VALIDADA | Zonas aspiracionales o sin validar |

**Regla schema vs contenido:** El contenido puede usar señales GEO coherentes (más flexible). El schema `areaServed` solo admite cobertura real o validada (más estricto).

### 3.6 Trust Signals
- **Dato que buscamos:** Señales de confianza del sector (años, certificaciones, garantías, badges) + diferenciadores del cliente.
- **Cómo se obtiene:** Tomar la columna "Trust signals" del Informe de Competidores (Investigación). Las que aparecen en 3+ perfiles son "estándar del sector". Añadir diferenciadores que el cliente haya declarado.
- **Fuente:** `Doctrina + Local Pack` (estándar del sector) + `Cliente preflight` (diferenciadores propios).
- **Si no existe el Informe:** Vuelve a Investigación. **Esta fase no infiere trust signals del sector.**
- **Se usa en:** Hero de Homepage, bloque de confianza, contenido de LBS.
- **Regla:** Los trust signals que afirman algo del cliente (años, certificaciones, garantías) **solo aparecen si el cliente los declara** en el preflight. No inventar "250+ reseñas", "20 años de experiencia" ni nada similar. Estándares genéricos del sector ("presupuesto gratis", "24h") sí pueden venir del Informe si los competidores los muestran.

### 3.7 GeoArticle Topics (Variable G)
- **Dato que buscamos:** 3 topics por core service con intención informacional/precomercial.
- **Cómo se obtiene:** Buscar en Ahrefs/Semrush `[servicio] [ciudad]` → filtrar por intención informacional → elegir los 3 con más volumen por servicio.
- **Fuente:** `Doctrina + Keyword Research`.
- **Si no tienes acceso a KW tools:** Generar 3 topics por servicio usando este framework:
  1. **Precio:** "¿Cuánto cuesta [servicio] en [ciudad]?"
  2. **Proceso/decisión:** "¿Cuánto tarda [servicio]?" o "¿Cuándo es necesario [servicio]?"
  3. **Comparativa:** "[Servicio] vs [alternativa más común del sector]" (la alternativa es la opción que un usuario consideraría en vez de contratar este servicio — ej: aerotermia vs caldera de gas, no aerotermia vs aire acondicionado)
- **Regla anti-solapamiento:** Antes de fijar los topics, verificar que ninguno se solapa con otro de otro servicio. Si "cuánto cuesta instalar aerotermia" y "precio aerotermia calefacción" atacan la misma búsqueda, eliminar uno.
- **G = 3 por defecto.** Puede ser 2 si no hay 3 topics diferenciados para un servicio.

### 3.8 Aplicar Fórmula Maestra

```
Total páginas SEO = 1 + S + 1 + S + A + (G × S)

1   = Homepage
S   = Service Overviews
1   = GeoHub Main City
S   = Location-Based Services
A   = Additional Category Pages
G×S = GeoArticles

+ 1 /contacto/ (auxiliar, fuera del conteo SEO)
```

### 3.9 Generar URL Matrix

Aplica estos patrones. **Trailing slash: siempre.** **Dominio canónico: https://www.[dominio].com/**

| Tipo | Patrón | Ejemplo |
|------|--------|---------|
| Homepage | `/` | `/` |
| Service Overview | `/[primary-cat-slug]/[service-slug]/` | `/fontanero/reparacion-fugas/` |
| GeoHub | `/[main-city-slug]/` | `/barcelona/` |
| LBS | `/[primary-cat-slug]/[main-city-slug]/[service-slug]/` | `/fontanero/barcelona/reparacion-fugas/` |
| Additional Category | `/[primary-cat-slug]/[main-city-slug]/[additional-slug]/` | `/fontanero/barcelona/desatascos/` |
| GeoArticle | `/[main-city-slug]/[topic-slug]/` | `/barcelona/cuanto-cuesta-reparar-una-fuga/` |
| Contacto | `/contacto/` | `/contacto/` |

**Slugify:** `lowercase → eliminar acentos → reemplazar espacios/símbolos por guión → colapsar guiones → sin guión al inicio/final`.

**Prohibido en slugs:** `near-me`, `best`, `cheap`, `top-rated`, `urgente` (salvo que sea el nombre real del servicio).

### 3.10 GATE DOCTRINAL — Entrega al Operador

Antes de pasar a la sub-fase 2 (Contenido), muestra al operador este bloque exacto:

```
## Arquitectura Propuesta

**Main City:** [ciudad]
**Primary Category:** [categoría] → Fuente: [fuente]
**Core Services (S=[n]):**
1. [servicio] → Fuente: [fuente]
2. [servicio] → Fuente: [fuente]
...

**Additional Categories (A=[n]):**
- [categoría] → Fuente: [fuente]

**GeoArticle Topics (G=[n] por servicio):**
- [servicio 1]: [topic1], [topic2], [topic3]
- [servicio 2]: [topic1], [topic2], [topic3]
...

**Fórmula:** 1+[S]+1+[S]+[A]+([G]×[S]) = [total] páginas + /contacto/

**URL Matrix:** [lista completa de URLs]

## Checklist Doctrinal

**Arquitectura:**
- [ ] Main City = ciudad del NAP (no inventada)
- [ ] Ninguna LCA genera URL
- [ ] GeoHub existe (`/[main-city-slug]/`) — es obligatorio, no opcional
- [ ] Fórmula declarada: `1+S+1+S+A+(G×S) = [total]` y el número de URLs en la matrix cuadra exactamente

**Patrones URL — verifica cada tipo contra la tabla de 3.9:**
- [ ] SO sigue `/[primary-cat-slug]/[service-slug]/` — NO `/[service-slug]/` sin categoría
- [ ] LBS sigue `/[primary-cat-slug]/[main-city-slug]/[service-slug]/` — NO ciudad pegada al servicio sin categoría
- [ ] GeoArticle sigue `/[main-city-slug]/[topic-slug]/` — NO anidado bajo LBS
- [ ] AC sigue `/[primary-cat-slug]/[main-city-slug]/[additional-slug]/`

**Calidad:**
- [ ] Ningún slug con near-me/best/cheap/urgente
- [ ] No hay dos URLs con la misma intención de búsqueda
- [ ] Todos los ⚠ están declarados con razonamiento

## ⚠ Datos pendientes (placeholders del operador)
| Dato | Status | Cómo cerrar |
|------|--------|-------------|
| Teléfono | ⚠ placeholder | Operador lo provee |
| Email | ⚠ placeholder | Operador lo provee |
| Dirección (calle/número/CP) | ⚠ placeholder | Operador la completa |
```

**Si el operador corrige:** ajusta y vuelve a mostrar. **Si no dice nada:** avanza a la sub-fase 2 (Contenido).

---

## Contratos técnicos producidos por esta sub-fase

Esta sub-fase decide la columna vertebral del cluster: ciudad, categoría, servicios, LCAs, URL Matrix. Los snippets de abajo son **lo que la IA reproduce en el proyecto del cliente en sub-fase 4** — no hay plantilla compartida.

### 1) Slugify — `src/lib/slugify.ts`

Función canónica para convertir cualquier label a un slug URL. Toda URL generada en la URL Matrix pasa por aquí.

```ts
/**
 * Reglas:
 *   1. lowercase
 *   2. sin acentos / diacríticos (NFD + remove combining marks)
 *   3. kebab-case (separador `-`)
 *   4. solo [a-z0-9-]
 *   5. sin guiones consecutivos
 *   6. sin guion al inicio o final
 */
const COMBINING_MARKS_RE = /[̀-ͯ]/g;

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(COMBINING_MARKS_RE, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
```

**Prohibido en slugs** (validación adicional, no automática — la IA debe respetarla):
- `near-me`, `best`, `cheap`, `top-rated`, `urgente` (salvo que sea el nombre real del servicio).

### 2) Shape de LCAs — output `1.10` en `outputs.json`

```ts
export interface LCAs {
  direct: string[];     // Barrios/distritos del NAP. Generan contenido, NUNCA URLs.
  candidate: string[];  // Barrios validados por el test de coherencia GEO. Tampoco generan URLs salvo aprobación post-launch.
}
```

Ejemplo:

```json
{
  "id": "1.10",
  "name": "Local Coverage Areas",
  "value": {
    "direct": ["Lista", "Salamanca"],
    "candidate": []
  },
  "status": "confirmed",
  "fuente": "Cliente preflight",
  "source": "NAP Calle Gallarza 22, 28002 → barrio Lista, distrito Salamanca",
  "bloque": 1
}
```

### 3) Shape de URL Matrix — output `3.1` en `outputs.json`

```ts
export interface UrlMatrixEntry {
  url: string;                  // Path relativo, empezando por "/", terminando en "/". Ej: "/reformas-banos/madrid/reforma-integral/"
  page_type: "HP" | "SO" | "LBS" | "AC" | "GH" | "GA" | "AUX";
  parent?: string;              // Path del padre en la jerarquía (para breadcrumbs)
  schema_ids: string[];         // Ej: ["organization", "localBusiness", "breadcrumb"] — nombres de helpers (ver sub-fase 2)
  lastmod?: string;             // ISO date para sitemap
  priority?: number;            // 0.0–1.0 para sitemap
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
  status: "confirmed" | "⚠ placeholder";
}
```

Ejemplo de output `3.1`:

```json
{
  "id": "3.1",
  "name": "URL Matrix",
  "value": [
    {"url": "/", "page_type": "HP", "schema_ids": ["organization", "website", "localBusiness"], "priority": 1.0, "changefreq": "weekly", "status": "confirmed"},
    {"url": "/madrid/", "page_type": "GH", "parent": "/", "schema_ids": ["collectionPage", "breadcrumb"], "priority": 0.8, "changefreq": "monthly", "status": "confirmed"}
  ],
  "status": "confirmed",
  "fuente": "Doctrina GMB Crush",
  "source": "Aplicación de fórmula maestra + slugify",
  "bloque": 1
}
```

### 4) Sitemap endpoint — `src/pages/sitemap.xml.ts`

Astro endpoint que lee la URL Matrix y emite `/sitemap.xml`. Snippet canónico:

```ts
import type { APIRoute } from "astro";
import { getDomain, getValueOptional } from "@lib/cluster";

interface UrlMatrixEntry {
  url: string;
  lastmod?: string;
  priority?: number;
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
}

export const GET: APIRoute = async () => {
  const domain = getDomain().replace(/\/$/, "");
  let urls = getValueOptional<UrlMatrixEntry[]>("3.1") ?? [];
  if (urls.length === 0) urls = [{ url: "/", priority: 1.0, changefreq: "weekly" }];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((e) => {
    const loc = `${domain}${e.url.startsWith("/") ? e.url : "/" + e.url}`;
    const parts = ["  <url>", `    <loc>${loc}</loc>`];
    if (e.lastmod) parts.push(`    <lastmod>${e.lastmod}</lastmod>`);
    if (e.changefreq) parts.push(`    <changefreq>${e.changefreq}</changefreq>`);
    if (e.priority !== undefined) parts.push(`    <priority>${e.priority.toFixed(1)}</priority>`);
    parts.push("  </url>");
    return parts.join("\n");
  })
  .join("\n")}
</urlset>`;

  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
```

La IA copia este archivo tal cual al proyecto del cliente en sub-fase 4.

