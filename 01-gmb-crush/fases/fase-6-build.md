## 8. Fase 6 — Construcción (Astro)

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
| 16.1 | Design Tokens | Fase 5 |

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

Si el build falla, diagnosticar y corregir. Los errores más comunes son:
- `outputs.json` con campos faltantes → añadir el output que falta.
- Slug inválido (acentos, espacios) → aplicar slugify.
- Tipo incorrecto en un valor → revisar `types.ts`.

### 8.4 Verificar

- `dist/` se genera sin errores.
- El sitemap contiene todas las URLs de la matriz.
- Sin `<meta name="generator">`, sin comentarios scaffold, sin referencias a IA.
- **Cluster completo por servicio:** Cada core service tiene su SO + LBS + G GeoArticles generados. No publicar una LBS sin sus GeoArticles asociados.
- **Orden topológico:** Ninguna página hija existe sin su padre (no hay LBS sin SO, no hay GA sin LBS).
- **Links válidos:** Todos los enlaces internos apuntan a URLs que existen en la URL Matrix. Ningún enlace a URL inexistente o no aprobada (anti-404).

---

