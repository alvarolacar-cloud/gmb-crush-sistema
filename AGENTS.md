# AGENTS.md — Guía de arranque para agentes IA

## Qué construimos

Un cluster de SEO local para un negocio (servicio + ciudad), desplegado en Cloudflare Pages, optimizado para Google Maps y búsqueda orgánica. Mismo input + mismo sistema = mismo output reproducible.

---

## El flujo — 4 documentos en orden

```
Doc A → Doc B → Doc C → Doc D
```

| Doc | Nombre | Parada | Archivo |
|-----|--------|--------|---------|
| A | Brief del operador | 🛑 blocking — no avanzas sin campos bloqueantes | `01-gmb-crush/doc-a-brief.md` |
| B | Investigación + Arquitectura | 🛑 blocking — operador confirma servicios + web ref. Test Doctrinal PASS obligatorio | `01-gmb-crush/doc-b-investigacion.md` |
| C | Extracción de diseño | ⚙ automático — avanza con lo obtenido, marca ⚠ si sin capacidades | `01-gmb-crush/doc-c-diseno.md` |
| D | Construcción + Build + Deploy + QA | 🛑 blocking al cierre — espera datos finales del operador | `01-gmb-crush/doc-d-construccion.md` |

**Consulta:** `01-gmb-crush/referencia.md` — LCAs, schemas, page-type specs, ejemplo. Solo cuando necesites detalle extra.

---

## Flujo visual

```
┌──────────────┐   ┌──────────────────────────────────┐
│ Doc A        │   │ Doc B                            │
│ Brief        │ → │ 1. Investigación mercado          │
│ operador     │   │ 2. Fórmula Maestra + Arquitectura │
│              │   │ 3. Content Pack                  │
│ 🛑 blocking  │   │ 4. Schema Map                    │
│ (sin datos   │   │ 5. Test Doctrinal ← gate PASS/FAIL│
│  no arrancas)│   │ 🛑 blocking (confirma serv + ref) │
└──────────────┘   └─────────────────┬────────────────┘
                                     ▼
┌──────────────┐   ┌──────────────────────────────────┐
│ Doc C        │   │ Doc D                            │
│ Extracción   │ → │ 1. Bootstrap Astro               │
│ diseño       │   │ 2. Librería base (types, schemas) │
│              │   │ 3. Layout global                 │
│ ⚙ automático │   │ 4. Páginas (HP, SO, LBS, GH, GA) │
│ (⚠ si sin   │   │ 5. Build + QA visual             │
│  capacidades)│   │ 6. Deploy                        │
└──────────────┘   │ 7. Informe Final                 │
                   │ 🛑 blocking (cierre de pendientes)│
                   └──────────────────────────────────┘
```

---

## Reglas inviolables

1. **Verifica o para.** La IA no inventa datos del operador. Único hueco: `[TELÉFONO]`, `[EMAIL]`, `⚠ placeholder` visibles en la web.
2. **LCAs nunca generan URLs.** Barrios, distritos, zonas → solo enriquecen contenido y schemas.
3. **Test Doctrinal es un gate.** FAIL = no avanzas a Doc D aunque el operador lo pida. Corrige y retest.
4. **Inputs en un único sitio.** Todo dato del operador viene de Doc A. No pidas datos en otro documento.
5. **No inventes:** teléfono, email, dirección, años, certificaciones, reseñas, sameAs, aggregateRating.

---

## Estructura del repo

```
sistemas-creacion-webs/          ← ESTE repo — solo sistema, nunca datos de clientes
├── AGENTS.md                    ← estás aquí
├── README.md
└── 01-gmb-crush/
    ├── doc-a-brief.md
    ├── doc-b-investigacion.md
    ├── doc-c-diseno.md
    ├── doc-d-construccion.md
    └── referencia.md

ejecuciones-webs/                ← repo SEPARADO — datos de clientes
└── [slug]/
    ├── DOCS-CANONICOS.md        ← producido por Doc B
    ├── lessons.md               ← memoria de errores del proyecto
    ├── INFORME-FINAL.md         ← producido por Doc D Fase 8
    └── web/                     ← proyecto Astro del cliente
        ├── package.json
        ├── outputs.json         ← vive AQUÍ (junto a package.json) — viaja con el deploy
        └── src/
```

**Por qué `outputs.json` está dentro de `web/`:** es el único dato del cliente que el build consume. `src/lib/cluster.ts` lo importa estáticamente (`../../outputs.json`), Vite lo bundlea, viaja con el repo desplegado en Cloudflare Pages. La doctrina, los docs canónicos y la documentación operativa quedan fuera del proyecto Astro.

**Nunca crees carpetas de cliente dentro del repo del sistema.**

`ejecuciones-webs/` vive al lado del repo del sistema:
```
Desktop/
├── sistemawebvariante/    ← este repo
└── ejecuciones-webs/
    └── [slug]/
```

Si no existe `ejecuciones-webs/` cuando la IA va a crear el primer cliente, la crea como hermana del repo. **Si no puedes determinar el path, pregunta al operador.**

---

## Protocolos operativos

### lessons.md — memoria de errores por proyecto
- Al iniciar sobre un proyecto existente: lee `ejecuciones-webs/[slug]/lessons.md` si existe.
- Tras cualquier corrección del operador: documenta el patrón:
  ```markdown
  ## [fecha] — [título corto]
  **Qué pasó:** descripción breve.
  **Por qué:** causa raíz.
  **Regla:** lo que hago diferente a partir de ahora.
  ```

### Propagación de cambios
Cuando modifiques algo en el sistema, busca referencias al término/archivo cambiado en todo el repo y actualízalas en el mismo cambio. No dejes deuda de coherencia.

### Antes de cualquier commit
1. Lee AGENTS.md y verifica que refleja el estado real.
2. Ejecuta `sh scripts/check-coherence.sh` si existe.
