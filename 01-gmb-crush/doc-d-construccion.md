# Doc D — Construcción, Build y Deploy

**Versión:** 1.0  
**Input:** Doc B (arquitectura + docs canónicos, Test Doctrinal PASS) + Doc C (theme.css + layout-map)  
**Output:** Proyecto Astro completo en `ejecuciones-webs/[slug]/web/` + `dist/` + URL live (si hay tokens)  
**Gate:** Build OK → avanza. Build FAIL tras 3 intentos autónomos → para y reporta.

---

## Fase 1 — Bootstrap del Proyecto

Crea el proyecto desde cero en `ejecuciones-webs/[slug]/web/`. No hay plantilla compartida — la IA genera cada archivo siguiendo los snippets canónicos de esta fase.

### package.json
```json
{
  "name": "[slug]-web",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^5.0.0"
  },
  "devDependencies": {
    "@astrojs/tailwind": "^5.0.0",
    "tailwindcss": "^3.4.0"
  }
}
```

### astro.config.mjs
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://[dominio]',
  integrations: [tailwind()],
  output: 'static',
});
```

### tsconfig.json
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@layouts/*": ["src/layouts/*"],
      "@lib/*": ["src/lib/*"]
    }
  }
}
```

### tailwind.config.mjs
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
      },
      fontFamily: {
        sans: ['var(--font-family-primary)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

---

## Fase 2 — Librería Base

### src/lib/types.ts
```typescript
export interface NAP {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
}

export interface LCAs {
  direct: string[];    // Del NAP (barrio, distrito)
  candidate: string[]; // Test GEO 3/6
}

export interface FAQ {
  question: string;
  answer: string;
}

export type PageType = 'HP' | 'SO' | 'LBS' | 'GH' | 'GA' | 'AC' | 'Contacto';

export interface UrlMatrixEntry {
  url: string;
  page_type: PageType;
  parent: string | null;
  schema_ids: string[];
  status: 'confirmed' | '⚠ placeholder';
}
```

### src/lib/slugify.ts
```typescript
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}
```

### src/lib/cluster.ts
```typescript
// outputs.json vive DENTRO de `web/`, junto a `package.json`. Viaja con el deploy
// y queda dentro de la raíz del proyecto Astro (Vite no permitiría importar
// fuera sin configuración adicional). Path relativo desde `web/src/lib/`:
//   `../../outputs.json` → `web/outputs.json`.
import outputsRaw from '../../outputs.json';

type Outputs = Record<string, unknown>;
const outputs = outputsRaw as Outputs;

export function getValue<T>(key: string): T {
  if (!(key in outputs)) throw new Error(`outputs.json: clave '${key}' no encontrada`);
  return outputs[key] as T;
}

export function getArray<T>(key: string): T[] {
  const val = getValue<T[]>(key);
  if (!Array.isArray(val)) throw new Error(`outputs.json: '${key}' no es un array`);
  return val;
}
```

### src/lib/schema-helpers.ts
```typescript
import type { NAP } from './types';

// Un valor es placeholder si está vacío o tiene forma "[ALGO]" (convención del sistema).
const isPlaceholder = (v: string | undefined | null): boolean =>
  !v || /^\[.+\]$/.test(v.trim());

// Construye el bloque address solo si TODOS sus campos son reales. Si falta cualquiera, omite el campo entero.
function buildAddress(nap: NAP) {
  if ([nap.street, nap.city, nap.zip, nap.country].some(isPlaceholder)) return undefined;
  return {
    '@type': 'PostalAddress' as const,
    streetAddress: nap.street,
    addressLocality: nap.city,
    postalCode: nap.zip,
    addressCountry: nap.country,
  };
}

export const breadcrumb = (items: {name: string; url: string}[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
});

export const organization = (nap: NAP, url: string) => {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: nap.name,
    url,
  };
  if (!isPlaceholder(nap.phone)) schema.telephone = nap.phone;
  if (!isPlaceholder(nap.email)) schema.email = nap.email;
  const address = buildAddress(nap);
  if (address) schema.address = address;
  return schema;
};

export const localBusiness = (nap: NAP, url: string, _category?: string) => {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: nap.name,
    url,
  };
  if (!isPlaceholder(nap.phone)) schema.telephone = nap.phone;
  const address = buildAddress(nap);
  if (address) schema.address = address;
  return schema;
};

export const service = (name: string, provider: string, url: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  provider: { '@type': 'LocalBusiness', name: provider },
  url,
});

export const article = (title: string, url: string, datePublished: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  url,
  datePublished,
});

export const faqPage = (faqs: {question: string; answer: string}[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
});

export const website = (name: string, url: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name,
  url,
});

export const webPage = (title: string, url: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: title,
  url,
});

export const collectionPage = (title: string, url: string) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: title,
  url,
});

export const contactPoint = (phone: string, email: string) => {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ContactPoint',
    contactType: 'customer service',
  };
  if (!isPlaceholder(phone)) schema.telephone = phone;
  if (!isPlaceholder(email)) schema.email = email;
  return schema;
};
```

---

## Fase 3 — Layout Global

### src/layouts/BaseLayout.astro
```astro
---
import '../styles/global.css';
import '../styles/theme.css';

interface Props {
  title: string;
  description: string;
  canonical?: string;
  schema?: object | object[];
}

const { title, description, canonical, schema } = Astro.props;
const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];
---
<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content={description} />
  {canonical && <link rel="canonical" href={canonical} />}
  {schemas.map(s => (
    <script type="application/ld+json" set:html={JSON.stringify(s)} />
  ))}
</head>
<body>
  <slot />
</body>
</html>
```

---

## Fase 4 — outputs.json y Páginas

`outputs.json` se crea en `ejecuciones-webs/[slug]/web/outputs.json` (al lado de `package.json`). Es el único archivo de datos del cliente que vive dentro del proyecto Astro — todo lo demás (DOCS-CANONICOS.md, lessons.md, INFORME-FINAL.md) queda en el nivel superior `[slug]/`.

### outputs.json (estructura mínima)
```json
{
  "nap": {
    "name": "",
    "street": "",
    "city": "",
    "state": "",
    "zip": "",
    "country": "ES",
    "phone": "[TELÉFONO]",
    "email": "[EMAIL]"
  },
  "main_city": "",
  "primary_category": "",
  "services": [],
  "additional_categories": [],
  "lcas": { "direct": [], "candidate": [] },
  "url_matrix": [],
  "gbp_exists": false,
  "domain": "[DOMINIO]"
}
```

### Orden de construcción de páginas

Construye en este orden (respeta dependencias de linking):

1. **BaseLayout** (ya hecho en Fase 3)
2. **Homepage** (`src/pages/index.astro`)
3. **Service Overviews** (`src/pages/[cat]/[serv]/index.astro` o rutas estáticas)
4. **GeoHub** (`src/pages/[cat]/[ciudad]/index.astro`)
5. **Location-Based Services** (`src/pages/[cat]/[ciudad]/[serv]/index.astro`)
6. **Additional Categories** (si A > 0)
7. **GeoArticles** (`src/pages/[ciudad]/[topic]/index.astro`)
8. **Contacto** (`src/pages/contacto/index.astro`)
9. **Sitemap** (`src/pages/sitemap.xml.ts`)

### src/pages/sitemap.xml.ts
```typescript
import type { APIRoute } from 'astro';
import { getValue } from '@lib/cluster';
import type { UrlMatrixEntry } from '@lib/types';

export const GET: APIRoute = ({ site }) => {
  const matrix = getValue<UrlMatrixEntry[]>('url_matrix');
  const domain = site?.toString().replace(/\/$/, '') ?? '';

  const urls = matrix
    .filter(e => e.status === 'confirmed')
    .map(e => `  <url><loc>${domain}${e.url}</loc></url>`)
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } }
  );
};
```

---

## Fase 5 — Build

`outputs.json` debe existir en `ejecuciones-webs/[slug]/web/outputs.json` antes del build (al lado de `package.json`). Es lo que `src/lib/cluster.ts` importa estáticamente.

```bash
cd ejecuciones-webs/[slug]/web
pnpm install
pnpm build
```

**Protocolo de errores autónomos (máximo 3 intentos):**

| Intento | Acción |
|---------|--------|
| 1 | Lee el error, identifica root cause, aplica fix quirúrgico |
| 2 | Si mismo error: prueba enfoque alternativo (no repitas la misma acción) |
| 3 | Si persiste: rethink — ¿el error viene de outputs.json? ¿de una importación? |
| Tras 3 | Para, reporta error exacto + intentos fallidos + hipótesis al operador |

**Errores frecuentes:**
| Error | Causa | Fix |
|-------|-------|-----|
| `outputs key not found` | Clave faltante en outputs.json | Añadir clave con valor ⚠ placeholder |
| `Cannot find module '@lib/...'` | tsconfig paths no configurados | Verificar tsconfig.json paths |
| Tailwind v4 instalado | `@tailwindcss/vite` en lugar de `@astrojs/tailwind` | Reinstalar con Tailwind v3 |
| URLs en dist no coinciden | Slugify inconsistente | Verificar función slugify usada en todos los sitios |
| `<meta name="generator">` presente | Astro lo añade por defecto | No hay que eliminarlo — es inofensivo |

**Verificación post-build:**
- [ ] `dist/` generado sin errores
- [ ] Sitemap completo (mismas URLs que url_matrix con status confirmed)
- [ ] Cluster completo: por cada SO existe su LBS y sus G GAs
- [ ] Orden topológico respetado (padre existe antes que hijo)
- [ ] Sin `⚠ placeholder` en meta titles ni H1s visibles

---

## Fase 6 — QA Visual

Toma screenshot del sitio construido y compara con la web de referencia del Doc C.

| Sección | ¿Coincide? | Severidad | Acción |
|---------|-----------|-----------|--------|
| Header/Nav | | 🔴/🟡/⚪ | |
| Hero | | 🔴/🟡/⚪ | |
| Grid servicios | | 🔴/🟡/⚪ | |
| Footer | | 🔴/🟡/⚪ | |

- 🔴 Bloqueante → corrige antes de entregar
- 🟡 Menor → documenta, entrega igualmente
- ⚪ Aceptada → diferencia intencional

---

## Fase 7 — Deploy

**Opción A — GitHub + Cloudflare Pages (preferida):**
```bash
gh repo create [slug]-web --private
git init && git add . && git commit -m "feat: initial cluster build"
git remote add origin [repo-url]
git push -u origin main
```
En Cloudflare Pages: conectar repo, build command `pnpm install && pnpm build`, output directory `dist`. No requiere env vars — `outputs.json` viaja dentro del repo (en la raíz del proyecto Astro) y `cluster.ts` lo importa estáticamente.

**Opción B — Cloudflare API directo (sin GitHub):**
```bash
pnpm dlx wrangler pages deploy dist --project-name=[slug]
```

**Opción C — Sin tokens:**  
Entrega `dist/` comprimido al operador con instrucciones. Marca en outputs.json: `"deploy_status": "⚠ pendiente tokens"`. Cuando el operador aporte tokens, ejecuta Opción A o B.

---

## Fase 8 — Cierre e Informe Final

Genera `INFORME-FINAL.md` en la raíz del proyecto del cliente con:

1. **Resumen ejecutivo** — URL live, total páginas, fecha
2. **Placeholders pendientes** — qué datos faltan y dónde aparecen en la web
3. **Decisiones tomadas** — por qué se tomó cada decisión con limitaciones
4. **Pendientes del operador** — teléfono, email, GBP, imágenes, dominio definitivo
5. **Auditoría de fuentes** — tabla de outputs con fuente verificable por cada uno
6. **Estado GBP** — bloqueado hasta que NAP real esté en la web sin placeholders

**⚠ PARADA:** Esta fase no termina sola. Espera que el operador aporte los datos pendientes (teléfono, email, GBP, tokens, dominio). Por cada dato recibido: actualiza outputs.json, regenera si afecta al build, redeploya. Cuando no queden placeholders → GBP desbloqueado.
