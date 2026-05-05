# GMB Crush — Sistema de Ejecución

Sistema para que una IA construya webs locales SEO + GBP siguiendo la metodología GMB Crush. Le das un archivo y un preflight, y produce una web completa en Cloudflare Pages.

---

## Cómo usar esto

### Paso 1 — Rellena el preflight

Abre `PREFLIGHT.md` y rellena los datos del cliente. Con solo "qué hace" y "dónde está" ya funciona. Cuantos más datos, mejor resultado.

### Paso 2 — Dáselo a la IA

Copia el contenido de `SISTEMA.md` y pégalo en la IA que uses (Claude, GPT, Manus, o cualquier otra). Debajo, pega el preflight rellenado.

Ejemplo de lo que pegas:

```
[Contenido de SISTEMA.md]

---

Preflight:
- Nombre: Fontaneros Express Barcelona
- Qué hace: fontanería urgente 24h
- Dirección: Carrer de Balmes 45, 08007 Barcelona
- Estado GBP: Not Created
- Ciudades LP: Barcelona
```

### Paso 3 — La IA ejecuta 7 fases

| Fase | Qué hace |
|------|----------|
| 1. Arquitectura | Deriva servicios, categoría, URLs. Te muestra el plan. Si no corriges, avanza. |
| 2. Contenido | Redacta H1, meta, hero, FAQs, CTA, schema para cada página. |
| 3. 6 Docs Canónicos | Consolida en URL Matrix, Page Type Map, Internal Linking Plan, Content Pack, Schema Map, Tabla de Pendientes. |
| 4. Test Doctrinal | Ejecuta checks contra los 6 docs. Si PASS → build. Si FAIL → corrige y re-testea. |
| 5. Build | Crea proyecto Astro, inyecta contenido, genera `dist/`. |
| 6. Deploy | Push a GitHub + Cloudflare Pages. Web LIVE. |
| 7. Consolidación | Entrega URL + tabla de pendientes + bloqueo GBP. |

### Paso 4 — Tú cierras pendientes

La IA te entrega una lista de `⚠ Pendientes`. Tú le das los datos reales (teléfono, email, fotos, etc.) y la IA actualiza la web.

---

## Archivos del repo

| Archivo | Qué es | Cuándo se usa |
|---------|--------|---------------|
| `SISTEMA.md` | Las instrucciones para la IA | Siempre — es lo que le pegas |
| `PREFLIGHT.md` | Template de datos del cliente | Lo rellenas por cada cliente nuevo |
| `referencias/page-type-specs.md` | Specs de contenido por tipo de página | Solo si la IA necesita más detalle |
| `referencias/ejemplo-cerrajeros.md` | Ejemplo de arquitectura completa | Solo si la IA necesita ver un caso real |
| `referencias/test-doctrinal.md` | Test de verificación doctrinal | Lo ejecuta la IA en Fase 4 (gate pre-build) |

---

## Principios del sistema

- **Nunca se para.** Si falta un dato, infiere o marca placeholder y sigue.
- **Web-first.** La web sale con lo que hay. El GBP se crea después.
- **No inventa datos del negocio.** Teléfono, email, dirección, reseñas = placeholder visible, nunca falso.
- **Trazabilidad.** Cada decisión declara su fuente. Lo que es inferido se marca como tal.
- **Test antes de build.** Los 6 docs canónicos se verifican contra la doctrina antes de construir.
