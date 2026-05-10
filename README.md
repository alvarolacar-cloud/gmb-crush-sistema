# Sistemas Creación Webs

> **Si eres una IA y te han dado este repo:** lee `AGENTS.md` primero.

Repo con sistemas para crear webs locales SEO. Tiene tres capas:

1. **Investigación** — Análisis de competidores en Google Maps (común a todos los sistemas)
2. **Sistemas** — Métodos de construcción (cada uno con sus reglas y plantillas)
3. **Ejecuciones** — Resultados de proyectos reales

---

## Estructura — dos repos

```
sistemas-creacion-webs/               ← este repo — solo sistema
├── AGENTS.md                         ← instrucciones para IAs
├── README.md                         ← este archivo
├── 00-investigacion/
│   └── INVESTIGACION.md              ← Investigación: investigar competidores (común a todos)
└── 01-gmb-crush/                     ← Sistema GMB Crush (SEO local + GBP)
    ├── SISTEMA.md                    ← índice del sistema (convenciones + tabla de fases)
    ├── fases/                        ← un archivo por fase, se lee antes de ejecutarla
    ├── referencias/                  ← test doctrinal, specs, ejemplo y doctrina
    └── plantilla-astro/              ← proyecto Astro parametrizable — se copia por cliente

ejecuciones-webs/                    ← repo separado — un sistema por subcarpeta
└── [nombre-negocio-slug]/
    ├── outputs.json
    └── web/
```

---

## Flujo

1. **Investigación:** La IA investiga el Local Pack y te muestra un informe de competidores.
2. **Tú decides:** Qué servicios poner + qué web usar como referencia de diseño.
3. **Ejecución:** La IA ejecuta el sistema elegido fase a fase.
4. **Resultado:** Web en Cloudflare + tabla de pendientes.

---

## Sistemas disponibles

| Sistema | Qué es | Cuándo usarla |
|---------|--------|---------------|
| `01-gmb-crush` | SEO local + GBP. 6 pasos del flujo (explicación → test herramientas → inputs iniciales → investigación → construcción 9 fases → inputs finales). Plantilla Astro + test doctrinal. | Negocios locales que quieren posicionar en Google Maps + web. |

---

## Checks automáticos

El repo tiene tres checks que corren en CI y pueden ejecutarse en local. Detectan deriva entre docs cuando un cambio no se propaga.

| Check | Qué hace | Cómo correrlo en local |
|-------|----------|------------------------|
| **Coherencia** (`scripts/check-coherence.sh`) | Verifica que el nº de fases sea idéntico en SISTEMA.md, README.md y `fases/`, y que no haya archivos huérfanos. | `sh scripts/check-coherence.sh` |
| **Enlaces rotos** (lychee) | Detecta cualquier `.md` que referencie un archivo o ancla inexistente. | `lychee --offline --no-progress --root-dir "$(pwd)" './**/*.md'` |
| **Build del fixture** | Construye `01-gmb-crush/plantilla-astro/` con `outputs.example.json`. Garantiza que `types.ts` y el ejemplo siguen casados. | `cd 01-gmb-crush/plantilla-astro && pnpm install && CLUSTER_PATH=./outputs.example.json pnpm build` |

### Pre-commit hook local

Para que los checks se ejecuten antes de cada `git commit` (aborta si falla):

```bash
git config core.hooksPath .githooks
```

El hook ejecuta coherencia siempre, lychee si está instalado, y el build del fixture solo si exportas `PRE_COMMIT_FIXTURE=1` (es lento).
