## Fase 7 — Construcción (Astro)

**Fuente:** `Doctrina GMB Crush` (Arquitectura técnica fija).

Esta fase usa la **plantilla Astro** (`plantilla-astro/`) que ya existe en el repo. La IA NO crea un proyecto desde cero — produce un `outputs.json` y la plantilla lo renderiza.

### 8.1 Producir `outputs.json`

La IA debe producir un archivo `outputs.json` con la estructura definida en `plantilla-astro/src/lib/types.ts`. Cada output tiene:

```json
{
  "id": "1.5",
  "name": "Planned Primary GBP Category",
  "value": "Instalador de aerotermia",
  "status": "confirmed",
  "fuente": "Doctrina + Local Pack",
  "source": "Local Pack Madrid 2026-05-05",
  "hereda_de": null,
  "bloque": 1,
  "notes": null
}
```

Los outputs mínimos que `outputs.json` debe contener para que la plantilla funcione:

| Output ID | Dato | De dónde sale |
|-----------|------|---------------|
| Pre.2 | Short Description (qué hace) | Preflight |
| 1.1 | Business Name | Preflight |
| 1.2 | Canonical Domain | Preflight o derivado |
| 1.4 | Full NAP (8 campos) | Preflight |
| 1.5 | Primary Category | Fase 1 (3.2) |
| 1.6 | Additional Categories | Fase 1 (3.4) |
| 1.7 | Main City | Fase 1 (3.1) |
| 1.9 | Core Services | Fase 1 (3.3) |
| 1.10 | LCAs (direct + candidate) | Fase 1 (3.5) |
| 1.13 | Preferred CTA | Fase 2 (4.3) |
| 1.14 | Trust Signals | Fase 1 (3.6) |
| 3.2 | GeoHub URL Style | `/[main-city]/` |
| 3.4 | GeoArticle Topics | Fase 1 (3.7) |
| 16.1 | Design Tokens | Fase 6 |

### 8.2 Copiar plantilla y configurar

1. Copiar `plantilla-astro/` a la carpeta del cliente.
2. Colocar `outputs.json` en la raíz del proyecto.
3. Asegurar que `outputs.json` tiene `"meta": {"catalog_version": "0.1.0"}` (debe coincidir con la versión del código).
4. Actualizar `astro.config.mjs`: `site` = dominio del cliente.
5. Actualizar `package.json`: `name` = slug del negocio.

### 8.3 Build

```bash
pnpm install
CLUSTER_PATH=./outputs.json pnpm build
```

**Regla:** ejecutar `pnpm install && pnpm build` localmente antes de cada push a Cloudflare. Si falla en local, fallará en producción.

**Autonomous bug fixing — protocolo de errores de build:**
Si `pnpm build` falla, no preguntes al operador — diagnostica y corrige:
1. Lee el error completo en el output del build.
2. Identifica la causa raíz (columna "Causa" de la tabla de abajo).
3. Aplica el fix y vuelve a ejecutar `pnpm build`.
4. Repite hasta 3 veces. Si tras 3 intentos sigue fallando → para y reporta al operador con: error exacto + causa identificada + qué intentaste.

**Stack canónico — NO negociable:**
- Astro 5 (no Astro 6 — incompatible con `@astrojs/tailwind`)
- Tailwind v3 (no Tailwind v4 — v4 requiere `@tailwindcss/vite`, no funciona con la integración canónica)
- pnpm (no npm ni yarn — rompe el build de Cloudflare)
- Cualquier cambio de stack → escalar al operador, no resolver solo.

**Errores frecuentes y solución:**

| Error | Causa | Fix |
|-------|-------|-----|
| `outputs.json` con campos faltantes | Output de una fase anterior no generado | Añadir el output que falta con `status: "⚠ placeholder"` |
| Slug inválido (acentos, espacios) | Valor sin slugify | Aplicar `slugify()` al campo |
| Tipo incorrecto en un valor | Mismatch con `types.ts` | Revisar tipo esperado en `plantilla-astro/src/lib/types.ts` |
| `Cannot find module '@astrojs/tailwind'` | Se instaló Tailwind v4 en lugar de v3 | `pnpm remove tailwindcss && pnpm add -D tailwindcss@3.x @astrojs/tailwind` |
| Build pasa en local pero falla en Cloudflare | Build command usa `npm` en Cloudflare | En Cloudflare Pages → Settings → Build command: `pnpm run build` (no `npm run build`) |
| URLs en `dist/` no coinciden con URL Matrix | Directorio extra en `src/pages/` | La estructura de `src/pages/` debe replicar exactamente la URL Matrix. Ningún directorio extra. |
| Schema `sameAs` apunta a GBP inexistente | Se añadió `sameAs` antes de crear el GBP | Omitir `sameAs` completamente si el GBP no existe. Añadirlo en Fase 9 cuando el GBP esté creado. |
| `<meta name="generator" content="Astro">` en HTML | No se eliminó en limpieza | Eliminar en `BaseLayout.astro` o `Layout.astro` |

### 8.4 Verificar

- `dist/` se genera sin errores.
- El sitemap contiene todas las URLs de la matriz.
- Sin `<meta name="generator">`, sin comentarios scaffold, sin referencias a IA.
- **Cluster completo por servicio:** Cada core service tiene su SO + LBS + G GeoArticles generados. No publicar una LBS sin sus GeoArticles asociados.
- **Orden topológico:** Ninguna página hija existe sin su padre (no hay LBS sin SO, no hay GA sin LBS).
- **Links válidos:** Todos los enlaces internos apuntan a URLs que existen en la URL Matrix. Ningún enlace a URL inexistente o no aprobada (anti-404).

### 8.5 — Visual QA (OBLIGATORIO antes de entregar)

**Antes de dar por buena la entrega**, compara el site construido contra la web de referencia:

1. **Screenshot del site construido** — captura la homepage desplegada en Cloudflare Pages (o localhost).
2. **Screenshot de la web de referencia** — captura la homepage de la web de referencia usada en Doc C.
3. **Compara sección a sección** y lista las discrepancias:

| Sección | Referencia | Construido | Discrepancia |
|---------|-----------|------------|--------------|
| Hero | [descripción] | [descripción] | [diferencia] |
| Servicios | [descripción] | [descripción] | [diferencia] |

4. **Clasifica cada discrepancia:**
   - 🔴 **Bloqueante** — color primario diferente, layout roto, texto ilegible → corregir antes de entregar
   - 🟡 **Menor** — espaciado ligeramente diferente, sombra distinta → documentar en notes del output
   - ⚪ **Aceptada** — diferencia intencional (mejora sobre la referencia) → documentar en notes

5. **Corrige los bloqueantes** y vuelve a hacer el screenshot.
6. **Reporta al operador** con el resultado del QA: lista de discrepancias menores aceptadas + confirmación de que no hay bloqueantes.

> Sin este paso, el operador no puede saber si el diseño es fiel a la referencia hasta que lo ve en producción. El QA visual aquí es más barato que una corrección post-entrega.

---

### 8.6 Configuración Cloudflare Pages

Al conectar el repo a Cloudflare Pages, verificar estos 4 campos:

| Campo | Valor correcto |
|-------|----------------|
| Build command | `pnpm run build` |
| Build output directory | `dist` |
| Root directory | ruta al proyecto en el repo de ejecuciones (ej. `gmb-crush-ejecuciones/reformaban-madrid/web/`) |
| Node.js version | Compatible con Astro 5 (≥ 18.x) |

**Dominio y SSL:**
- Conectar dominio del output 1.2.
- Configurar redirección www ↔ apex según versión canónica del output 1.3.
- SSL: auto-SSL completo de Cloudflare (no Flexible).

---

