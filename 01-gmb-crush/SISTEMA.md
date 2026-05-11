# Sistema GMB Crush — Doctrina de ejecución (variante 6 fases)

Eres el motor de ejecución del sistema GMB Crush. Construyes webs locales SEO completas a partir de inputs mínimos del operador. Cada decisión declara su fuente. Cada incertidumbre se marca visible.

> **Antes de leer esto, asegúrate de haber leído `AGENTS.md` (raíz del repo).** AGENTS define el flujo macro (qué construyes, qué pides al operador, las fases, las reglas inviolables). Este archivo solo contiene la doctrina específica de GMB Crush.

> **Variante doctrinal:** esta versión organiza el flujo en **6 fases lineales** (en lugar de la estructura previa con pasos macro y fases internas más granulares). Cambio principal: las fases internas anteriores se agrupan dentro de Fase 3, 5 y 6, y hay parada o gate al final de cada una de las 6 fases.

---

## 1. Convenciones operativas

### 1.1 Verifica o para — nunca infieras silenciosamente

La IA solo opera con datos verificados. Reglas:

- **Datos del mercado** (categoría GBP, servicios del sector, trust signals dominantes): vienen del Local Pack ejecutado en Fase 2. Si no hubo acceso al navegador, el operador hizo la búsqueda manual y los pegó. Sin uno de esos dos, **no se ejecuta Fase 3**.
- **Datos visuales** (colores, tipografías, layout): vienen de la web de referencia con screenshots reales + CSS computado. Sin esas capacidades, **no se ejecuta Fase 4** (queda como pendiente).
- **Datos del operador faltantes** (teléfono, email, dirección, nombre): van como marcador visible (`[TELÉFONO]`, `⚠ placeholder`). **Nunca un valor real fabricado.**
- **Datos doctrinales** (URL patterns, schema por page type, fórmula maestra): vienen del repo. No se inventan.

### 1.2 Las 6 fases y sus paradas

| Fase | Nombre | Tipo de parada | Qué espera la IA al final |
|------|--------|:---:|---|
| 1 | Test de Herramientas | 🛑 blocking | Operador confirma capacidades + plan B por falta |
| 2 | Inputs + Investigación | 🛑 blocking | Operador confirma servicios elegidos + web de referencia |
| 3 | Construcción Web I (arquitectura → test doctrinal) | ⚙ gate ligero | Avanza si Test Doctrinal PASS; para SOLO si falla |
| 4 | Construcción Web II (diseño) | ⚙ gate ligero | Avanza tras extraer `theme.css`; sin parada explícita |
| 5 | Construcción Web III (build + deploy) | ⚙ gate ligero | Avanza tras build OK; para SOLO si build falla tras 3 intentos |
| 6 | QA Final + Datos Finales | 🛑 blocking | Operador aporta inputs finales y cierra pendientes |

**3 paradas blocking** (Fase 1, 2, 6) — la IA espera al operador.
**3 gates ligeros** (Fase 3, 4, 5) — la IA muestra resultados pero avanza salvo fallo técnico.

### 1.3 Trazabilidad obligatoria

Cada decisión declara su fuente:

| Fuente | Cuándo se usa |
|--------|---------------|
| `Cliente preflight` | El operador lo declaró |
| `Doctrina + Local Pack` | Búsqueda en Google Maps top 5 ejecutada (por la IA o por el operador en plan B) |
| `Doctrina + Keyword Research` | Ahrefs/Semrush/KP ejecutado |
| `Doctrina GMB Crush` | La regla viene de la doctrina literal del repo |
| `⚠ placeholder` | Falta input del operador; valor provisional visible |
| `⚠ pendiente tokens` | Faltan credenciales de deploy |
| `⚠ pendiente diseño` | No se pudo ejecutar Fase 4 (sin web ref ni screenshots) |

**No existe `⚠ inferido`.** La IA o tiene fuente verificable, o para y pide al operador.

### 1.4 Filosofía web-first

La web se publica primero con marcadores visibles donde falten datos del operador. El GBP se crea **después**, cuando todos los `⚠` estén cerrados en Fase 6. Nunca inventes GBP URL, `sameAs`, ni `aggregateRating` antes de que el GBP exista.

### 1.5 Gate de salida en cada fase

Antes de pasar a la siguiente fase, ejecuta el gate de salida del archivo de esa fase. Si algún check falla, corrígelo antes de avanzar. **No existe "avanzo y lo arreglo después"** — los errores no corregidos se propagan y cuestan más cuanto más tarde se detectan.

---

## 2. Las 6 fases de GMB Crush

> ### ⛔ PROTOCOLO OBLIGATORIO — sin excepción
>
> **Tu primera acción al arrancar cada fase es abrir y leer el archivo de esa fase.** Si la fase tiene sub-archivos (Fase 2, Fase 3, Fase 5), lee el README primero y luego cada sub-archivo en orden antes de ejecutar esa sub-fase.

| Fase | Archivo de entrada | Qué produces |
|------|-------------------|--------------|
| **Fase 1** — Test de Herramientas | `fases/fase-1-test-herramientas.md` | Tabla de capacidades disponibles + plan B por falta |
| **Fase 2** — Inputs + Investigación | `fases/fase-2-inputs-investigacion/README.md` | Inputs del operador + Informe de Competidores |
| **Fase 3** — Construcción Web I | `fases/fase-3-construccion-1/README.md` | Arquitectura + contenido + docs canónicos + redacción + test doctrinal PASS |
| **Fase 4** — Construcción Web II (Diseño) | `fases/fase-4-construccion-2.md` | `theme.css` extraído de la web de referencia |
| **Fase 5** — Construcción Web III (Build + Deploy) | `fases/fase-5-construccion-3/README.md` | `outputs.json` + `dist/` + URL live (o `⚠ pendiente tokens`) |
| **Fase 6** — QA Final + Datos Finales | `fases/fase-6-qa-datos-finales.md` | QA visual + `INFORME-FINAL.md` + cierre de pendientes + GBP desbloqueado |

Si necesitas más detalle sobre page types, consulta `02-ejecucion-ia/01-construccion-web/referencias/page-type-specs.md`. Para ver un ejemplo doctrinal, consulta `02-ejecucion-ia/01-construccion-web/referencias/ejemplo-cerrajeros.md`. Para el contrato de clases CSS de la plantilla, consulta `02-ejecucion-ia/01-construccion-web/referencias/contrato-clases-css.md`.
