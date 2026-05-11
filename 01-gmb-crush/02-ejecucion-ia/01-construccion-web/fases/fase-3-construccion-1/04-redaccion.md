## Fase 3 · sub-fase 4 — Redacción + Página Astro por URL

### Contrato

- **Inputs esperados:** sub-fase 3 cerrada (6 docs canónicos disponibles, especialmente Content Pack con brief por URL y Schema Map) + theme.css de Fase 4 si ya está disponible (la coordinación de clases CSS sucede aquí).
- **Outputs producidos:** proyecto Astro completo en `ejecuciones-webs/[slug]/web/` bootstrapeado desde snippets de la doctrina + una `.astro` por URL de la URL Matrix (siguiendo el brief del Content Pack + las 4 capas de redacción + las 4 reglas de calidad) + `outputs.json` con FAQs por page type (`15.1`–`15.6`) y body content (`15.7` HP, `15.8` GH si aplica).
- **Gate de salida:** 17 (u N) `.astro` escritas, word counts dentro del rango doctrinal por page type, cluster completo por servicio (1 SO + 1 LBS + G GAs), 0 placeholders literales en HTML estático, 3 puentes en cada GA a LBS padre.
- **Si falta un input bloqueante:** Content Pack incompleto → vuelve a sub-fase 3. theme.css aún no producido → puedes redactar primero y coordinar clases con Fase 4 después, pero documenta la lista de clases que usarás para que Fase 4 las estilice.

---

**Cuándo se ejecuta:** después de la sub-fase 3 (docs canónicos). Antes de la sub-fase 5 (Test Doctrinal).

> **Cambio v0.3.0 (slim plantilla):** esta sub-fase produce **dos cosas** por cada URL de la matrix:
> 1. **Copy real** (texto publicable: H1, párrafos, listas, FAQs).
> 2. **Página `.astro` completa** en `ejecuciones-webs/[slug]/web/src/pages/` que renderiza ese copy con HTML libre fiel a la composición visual de la web de referencia (output de Fase 4 mapa de patrones).
>
> La plantilla del sistema ya no aporta páginas opinadas — solo `BaseLayout`, helpers de schema, slugify, sitemap. Cada cliente recibe HTML hecho a medida, con la libertad de usar split-heroes, media-blocks, galerías, lo que pida la referencia.
>
> **Cada `.astro` debe:**
> - Importar `@layouts/BaseLayout.astro`
> - Importar helpers de `@lib/schema-helpers` para construir los schemas que el Schema Map de sub-fase 3 declara para esa página
> - Leer datos de `@lib/cluster` (`getValue<T>(id)`)
> - Renderizar HTML libre con clases CSS que coordinen con el `theme.css` de Fase 4

**Errores que previene:**
- Publicar páginas con copy genérico sin contexto local
- Mezclar Service Overview con LBS (canibalización de roles)
- Inventar reseñas o datos no verificables
- Heroes largos que hacen scroll en móvil
- Anchors todos branded sin variedad
- Publicar cluster roto (servicio sin SO + LBS + 3 GAs)

---

### 2b.1 — Las 4 Capas de Redacción

Aplicar estas 4 capas **en orden** a cada página, sin saltarse ninguna:

| Capa | Qué hace | Dónde aplica |
|------|----------|--------------|
| **1 — Estructura** | H1 + H2s + secciones obligatorias por page type + word count en rango | Todas las páginas |
| **2 — Zonas** | Inyectar LCAs donde corresponde según page type | LBS, GH, AC, GA (con matices); NO en SO |
| **3 — Argumentos** | Trust signals reales, datos verificables, USPs concretos (no "los mejores") | Todas las páginas |
| **4 — Entidades** | Marcas, normativas, términos técnicos del sector reconocibles por Google | Todas las páginas |

**Regla de zonas por page type:**
- **Homepage:** menciona Main City. No listar todas las LCAs — solo ciudad principal.
- **Service Overview:** ninguna LCA (page type no-local — pilar temático puro).
- **LBS:** 2-3 LCAs directas en sección dedicada + areaServed. Naturales, no forzadas.
- **GeoHub:** todas las LCAs en sección visible (es el contenedor de la ciudad).
- **GeoArticle:** LCAs como ejemplos contextuales, no listados vacíos.
- **Additional Category:** similar a LBS.

---

### 2b.2 — Las 4 Reglas de Calidad Universal (output 15.2)

Aplicar a **todas** las páginas sin excepción:

**Regla 1 — Hero y CTA above-the-fold**
El hero cabe en móvil sin scroll. H1 + subtítulo + CTA visibles sin bajar. Hero compacto, no párrafo largo.

**Regla 2 — Problema antes que solución**
Abrir describiendo el problema concreto del usuario. No abrir con "Somos una empresa especializada en...". Ejemplo correcto: *"Cuando la bañera ocupa espacio que ya no usas..."*

**Regla 3 — Datos en vez de adjetivos**
Sustituir "rápido y profesional" por datos reales: precios desde X€, plazos típicos, garantías concretas. Si no hay datos reales, marcar `[PENDIENTE: precio real]` — no inventar.

**Regla 4 — Contexto local real**
Mencionar Main City y barrios concretos en cada página local. No listados vacíos. Usar referencias a casos de uso reales del entorno del negocio.

---

### 2b.3 — Homepage (output 15.3)

**Word count:** 900–1.200 palabras
**H1 pattern:** `[Marca] — [Servicio principal] en [Ciudad]`

Bloques obligatorios en orden:
1. Hero compacto: H1 + subtítulo con valor + CTA principal + trust signal mínimo
2. Quick Answer: 1 párrafo que responde "¿qué hacéis y dónde?"
3. Grid de servicios principales (S cards → enlaza a cada SO)
4. Vista previa cobertura local (Main City + mención LCAs directas)
5. Bloques de confianza (trust signals del output 1.14, concretos)
6. FAQ general (4–5 preguntas)
7. Bloque NAP completo
8. CTA final
9. Footer

**Internal links mínimos:** 1 por SO + 1 GeoHub + 1 contacto.

**Capa 2 (Zonas):** Solo Main City. Sin listado de LCAs aquí.
**Capa 3 (Argumentos):** Trust signals reales del output 1.14.
**Capa 4 (Entidades):** Marca + categoría GBP principal + ciudad.

---

### 2b.4 — Service Overview Pages (output 15.4)

**Cantidad:** S páginas (una por core service del output 1.9)
**Word count:** 850–1.000 palabras
**H1 pattern:** `[Servicio] — [Marca]` ← SIN mención de ciudad (pilar temático puro)

Bloques obligatorios en orden:
1. Hero compacto con H1 no-local + intro del servicio
2. H2 Authority — por qué este negocio entiende este servicio
3. H2 Uniqueness — qué diferencia a este negocio en este servicio
4. H2 Depth — detalle técnico del servicio (materiales, proceso, tiempos)
5. H2 Intent — para quién es y cuándo lo necesita
6. H2 Qué incluye — lista concreta de lo que se hace
7. FAQ del servicio (3–5 preguntas)
8. CTA: "Solicitar presupuesto"
9. Links a LBS matching + otras SO relacionadas

**⚠ CRÍTICO — Capa 2 (Zonas): NINGUNA LCA en SO.** La SO no es local. Si se mete ciudad o barrio, compite con la LBS y rompe la arquitectura.

---

### 2b.5 — Location-Based Service Pages (output 15.5)

**Cantidad:** S páginas (una por core service × Main City)
**Word count:** 800–1.000 palabras
**H1 pattern:** `[Marca] — [Servicio] en [Ciudad]` ← CON ciudad (converter local)

Bloques obligatorios en orden:
1. Hero local con H1 + problema del usuario en esa ciudad + CTA Llamar/Presupuesto
2. Quick Local Answer: respuesta directa al intent local
3. Authority + Uniqueness + Depth (3 cards o H2s)
4. Problemas locales específicos (qué pasa en esa ciudad con ese servicio)
5. Sección LCAs: "También atendemos en [LCA1], [LCA2]..." (2–3 LCAs directas, naturales)
6. Servicios relacionados en la ciudad (cross-links a otras LBS)
7. FAQ local (4–6 preguntas con barrios, plazos, llegada)
8. CTA: Llamar/Presupuesto (fijo en mobile si es urgente)
9. Links: SO padre + GeoHub + GAs relacionados + contacto

**Capa 2 (Zonas):** 2–3 LCAs directas en sección dedicada. Mencionar en FAQs también.
**⚠ Sin LCAs inventadas ni "nuestra oficina en [barrio]" si no hay sede física allí.**

---

### 2b.6 — Additional Category Page (output 15.6)

**Cantidad:** A páginas (las que tengan `needs_page=true` del output 1.6)
**Word count:** 800–1.000 palabras
**Tratamiento:** similar a LBS — comercial, local, con LCAs

Si A=0 (sin categorías adicionales): omitir este output.

---

### 2b.7 — GeoHub Main City (output 15.7)

**Cantidad:** 1 (una por Main City)
**Word count:** 700–1.100 palabras
**H1 pattern:** `[Marca] — [Categoría] en [Ciudad]`

Bloques obligatorios:
1. Hero ciudad + intro de cobertura
2. Menú de servicios (S cards → cada LBS)
3. Menú de categorías adicionales (A cards, si A>0)
4. Sección LCAs completa (todas las LCAs directas + candidatas validadas)
5. Recursos GeoArticle (G×S cards agrupadas por servicio)
6. Trust signals
7. CTA final

**Internal links:** HP + S LBS + A AC + G×S GAs + contacto. Mínimo 10 enlaces internos.
**Capa 2 (Zonas):** Todas las LCAs en sección visible — aquí sí va el listado completo.

---

### 2b.8 — GeoArticles (output 15.8)

**Cantidad:** G×S artículos (3 por servicio × S servicios core, según output 3.4)
**Word count:** 1.000–1.500 palabras
**H1 pattern:** [Pregunta o tema] en [Ciudad] — NOT el mismo H1 que la LBS padre

**⚠ Los GAs NO son landings comerciales. Son boosters semánticos informativos.**

Bloques obligatorios:
1. Hero artículo con H1-pregunta + intro contextual
2. Respuesta directa (el primer párrafo responde la pregunta — no enrollar)
3. H2 desarrollo del tema (3–5 H2s con profundidad real)
4. H2 Factores locales (cómo aplica esto en Madrid/ciudad)
5. FAQ (3–5 preguntas relacionadas)
6. CTA suave → enlace a LBS padre: *"Si buscas [servicio] en [ciudad], consulta nuestra página de [servicio]"*

**Regla de 3 enlaces a LBS padre (OBLIGATORIA):**
- Punto 1: enlace inline en intro contextual (anchor variado)
- Punto 2: enlace en H2 "Cuándo llamar a un profesional" o similar
- Punto 3: CTA final apuntando a la LBS padre

Sin los 3 puntos → GA huérfano comercialmente → no publicar.

**Capa 2 (Zonas):** LCAs como ejemplos contextuales. *"En el barrio de Salamanca, donde los edificios son de los años 50..."* No listados vacíos.

---

### 2b.9 — Página de Contacto (output 15.9)

**Word count:** 300–500 palabras (página auxiliar, no SEO base)
**H1 pattern:** `Contacto — [Marca]`

Contenido mínimo:
- NAP completo (del output 1.4)
- Formulario de contacto (nombre, teléfono, mensaje)
- Mapa de cobertura o iframe Google Maps
- Horario de atención
- CTAs: teléfono + email + WhatsApp si aplica
- Schema: `ContactPoint`

---

### 2b.10 — Validaciones al terminar la redacción

Antes de pasar a la sub-fase 5 (Test Doctrinal), validar:

**✅ Clusters completos por servicio**
Cada core service tiene: 1 SO + 1 LBS + 3 GAs mínimo.
Si falta cualquiera → cluster ROTO → **no publicar ese servicio**.

```
Para cada servicio i (i = 1..S):
  Cluster_i = SO_i + LBS_i + GA_i_1 + GA_i_2 + GA_i_3
  Si len(Cluster_i) < 5 → BLOQUEAR publicación del servicio
```

**✅ SO no compite con LBS**
Comparar H1 de cada SO con H1 de su LBS matching:
- SO: no menciona ciudad → pilar temático
- LBS: sí menciona ciudad → converter local
- 0 H1 duplicados o casi-duplicados entre SO y LBS

**✅ GeoArticle enlaza a LBS padre (×3)**
Inspeccionar cada GA: debe tener exactamente 3 puntos de enlace a su LBS padre con anchors variados. Si algún GA tiene 0, 1 o 2 → corregir antes de continuar.

**✅ Datos verificables — sin reseñas inventadas**
Si el GBP no está creado todavía:
- 0 menciones a "X reseñas en Google"
- 0 `review.aggregateRating` en schema
- Precios solo si son reales ("desde X€"); si no se saben → marcar `[PENDIENTE: precio real]`
- Trust signals solo verificables (garantía de años, plazo de obra, financiación disponible)

---

### 2b.11 — Outputs en outputs.json

Los contenidos redactados se registran en `outputs.json` como entradas de la familia `15.x`:

| Output | ID en outputs.json | Valor |
|--------|-------------------|-------|
| Homepage redactada | `15.3` | Texto completo o path al archivo |
| SO redactadas | `15.4` | Array con texto por servicio |
| LBS redactadas | `15.5` | Array con texto por servicio |
| AC redactada | `15.6` | Texto o null si A=0 |
| GeoHub redactada | `15.7` | Texto completo |
| GeoArticles redactados | `15.8` | Array G×S |
| Contacto redactada | `15.9` | Texto completo |
| Validación clusters | `15.10` | `S/S clusters OK` o lista de rotos |
| Validación SO vs LBS | `15.11` | `OK` o lista de conflictos |
| Validación GA→LBS links | `15.12` | `OK` o lista de GAs sin 3 puntos |
| Validación datos | `15.13` | `OK` o lista de issues |

---

### Gate de salida — sub-fase 4

**STOP antes de pasar a la sub-fase 5 (Test Doctrinal):**

- [ ] Todas las páginas redactadas (HP + S SO + S LBS + A AC + 1 GH + G×S GA + contacto)
- [ ] 4 capas aplicadas en orden a cada página
- [ ] 4 reglas de calidad cumplidas en todas las páginas
- [ ] Clusters completos: ningún servicio con cluster roto
- [ ] SO ≠ LBS en H1 y contenido: 0 canibalizaciones
- [ ] GAs: 3 enlaces a LBS padre cada uno
- [ ] 0 reseñas inventadas, 0 datos no verificables

Si cualquier check falla → corregir antes de avanzar.

---

## Contratos técnicos producidos por esta sub-fase

Esta sub-fase **crea el proyecto Astro completo desde cero** en `ejecuciones-webs/[slug]/web/`. No existe plantilla compartida — la IA reproduce los snippets de abajo en archivos físicos del cliente. Si la doctrina cambia, la próxima ejecución incorpora el cambio.

### Estructura objetivo

```
ejecuciones-webs/[slug]/web/
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── src/
    ├── layouts/
    │   └── BaseLayout.astro
    ├── lib/
    │   ├── cluster.ts
    │   ├── slugify.ts             (copia desde fase-3 sub-1)
    │   ├── schema-helpers.ts      (copia desde fase-3 sub-2)
    │   └── types.ts
    ├── pages/
    │   ├── index.astro            (HP — Fase 3 sub-4 escribe el HTML)
    │   ├── [una .astro por URL de la matrix]
    │   └── sitemap.xml.ts         (copia desde fase-3 sub-1)
    └── styles/
        ├── global.css             (copia desde fase-4)
        └── theme.css              (sobreescrito por Fase 4)
```

### `package.json`

```json
{
  "name": "[slug]",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^5.1.0",
    "typescript": "^5.7.2"
  },
  "devDependencies": {
    "@types/node": "^22.10.0"
  }
}
```

### `astro.config.mjs`

```js
// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.[dominio].com",  // ← sustituir con output 1.2
  trailingSlash: "always",
  build: { format: "directory" },
  output: "static",
});
```

### `tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@layouts/*": ["src/layouts/*"],
      "@lib/*": ["src/lib/*"]
    }
  }
}
```

### `src/lib/types.ts`

Tipos compartidos entre `cluster.ts` y las `.astro`. Reúne shapes que vienen de fases anteriores.

```ts
export type Status =
  | "confirmed"
  | "validated"
  | "⚠ placeholder"
  | "⚠ pendiente tokens"
  | "⚠ pendiente diseño"
  | "no aplica";

// Shape canónico — definido en fase-2-inputs-investigacion/01-inputs.md
export interface NAP {
  name: string; street: string; city: string; state: string;
  zip: string; country: string; phone: string; email: string;
}

// Shape canónico — definido en fase-3/01-fundamentos.md
export interface LCAs { direct: string[]; candidate: string[]; }

export interface FAQ { q: string; a: string; }
```

### `src/lib/cluster.ts`

Loader de `outputs.json` + getters genéricos. Lo consumen todas las `.astro` que la IA escriba.

```ts
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { slugify } from "./slugify.ts";

interface ClusterOutput<T = unknown> {
  id: string; name: string; value: T; status: string;
  fuente: string; source: string; hereda_de?: string[];
  bloque?: number; notes?: string;
}

interface ClusterFile {
  slug: string; fecha_arranque: string;
  meta: { updated_at?: string; catalog_version?: string };
  outputs: Record<string, ClusterOutput>;
}

const CLUSTER_PATH = process.env.CLUSTER_PATH;
if (!CLUSTER_PATH) {
  throw new Error("CLUSTER_PATH no definido. Ej: CLUSTER_PATH=./outputs.json pnpm build");
}

const absolutePath = resolve(process.cwd(), CLUSTER_PATH);
export const cluster: ClusterFile = JSON.parse(readFileSync(absolutePath, "utf-8"));

export function getOutput<T = unknown>(id: string): ClusterOutput<T> {
  const output = cluster.outputs[id];
  if (!output) throw new Error(`Output ${id} no existe en outputs.json`);
  return output as ClusterOutput<T>;
}

export function getValue<T = unknown>(id: string): T {
  return getOutput<T>(id).value;
}

export function getValueOptional<T = unknown>(id: string): T | undefined {
  return cluster.outputs[id]?.value as T | undefined;
}

export const getDomain = () => getValue<string>("1.2");
export const getBusinessName = () => getValueOptional<string>("1.1") ?? "[NOMBRE]";
export const getSlug = () => cluster.slug;

export { slugify };
```

### `src/layouts/BaseLayout.astro`

Chassis HTML mínimo. Cada `.astro` lo importa y pinta el `<slot>`.

```astro
---
import "../styles/global.css";
import "../styles/theme.css";
import { getDomain } from "@lib/cluster";

interface Props {
  title: string;
  description: string;
  canonical?: string;
  schema?: Record<string, unknown>[];
  bodyClass?: string;
  ogImage?: string;
}

const { title, description, canonical, schema = [], bodyClass = "", ogImage } = Astro.props;
const canonicalUrl = canonical ?? new URL(Astro.url.pathname, getDomain()).href;
---

<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalUrl} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:locale" content="es_ES" />
    {ogImage && <meta property="og:image" content={ogImage} />}

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />

    {schema.map((s) => (
      <script is:inline type="application/ld+json" set:html={JSON.stringify(s)} />
    ))}
  </head>
  <body class={bodyClass}>
    <slot />
  </body>
</html>
```

### Patrón de cada página `.astro`

Por cada entrada de la URL Matrix (output `3.1`), la IA escribe una `.astro` en `src/pages/` siguiendo este patrón:

```astro
---
import BaseLayout from "@layouts/BaseLayout.astro";
import { getValue, getDomain, getBusinessName } from "@lib/cluster";
import { organization, localBusiness, breadcrumb, faqPage } from "@lib/schema-helpers";

// 1. Lee datos del cluster
const name = getBusinessName();
const domain = getDomain();
const nap = getValue<NAP>("1.4");
const faqs = getValue<FAQ[]>("15.1");  // FAQ específicos por page type

// 2. Construye los schemas que el Schema Map (fase-3 sub-2) dice para esta URL
const schemas = [
  organization({ name, url: domain }),
  localBusiness({
    name, url: domain,
    address: {
      streetAddress: nap.street, postalCode: nap.zip,
      addressLocality: nap.city, addressCountry: nap.country,
    },
    // sameAs OMITIDO si GBP no existe
    // telephone OMITIDO si nap.phone === "[TELÉFONO]"
  }),
  breadcrumb([{ name: "Inicio", url: domain }]),  // HP no tiene breadcrumb visible pero el list sí
];

// 3. Title + description (≤ 60 / ≤ 160 chars)
const title = `${name} — Reformas de baños en Madrid`;
const description = `Reformas integrales de baño en Madrid. Presupuesto sin compromiso.`;
---

<BaseLayout title={title} description={description} schema={schemas} bodyClass="page--home">
  <!-- HTML libre, fiel a la web de referencia (Fase 4 mapa de patrones).
       La IA decide la composición: split hero, lifestyle sections, etc. -->
  <header class="site-header">...</header>
  <section class="hero">...</section>
  ...
</BaseLayout>
```

### Reglas inviolables al escribir las `.astro`

1. **Una página por URL de la matrix.** Si la matrix tiene 17 URLs, hay 17 `.astro` (más `sitemap.xml.ts`).
2. **Cada `.astro` invoca exactamente los `schema_ids` declarados** en su entrada de la URL Matrix.
3. **Cero placeholders literales `[Pendiente]` en HTML estático.** Si una sección está pendiente, no la pintes — déjala fuera.
4. **Las clases CSS las decide la IA en coordinación con Fase 4** (Diseño). Evita inventar clases que el `theme.css` no estiliza.
5. **`title` ≤ 60 chars, `description` ≤ 160 chars.** Verifica antes de cerrar la página.
6. **3 puentes a LBS padre en cada GA** (regla doctrinal §4 de redacción).
