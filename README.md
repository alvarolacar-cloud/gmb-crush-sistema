# Sistemas Creación Webs

> **Si eres una IA y te han dado este repo:** lee `AGENTS.md` primero.

Repo con sistemas para crear webs locales SEO con IA. Variante **v0.5 — 4 documentos lineales**.

---

## Estructura — dos repos

```
sistemas-creacion-webs/                ← este repo (solo doctrina + scripts)
├── AGENTS.md                          ← arranque para IAs
├── README.md                          ← este archivo
├── scripts/                           ← coherencia + utilidades
└── 01-gmb-crush/                      ← Sistema GMB Crush (SEO local + GBP)
    ├── SISTEMA.md                     ← convenciones generales + stack canónico
    ├── doc-a-brief.md                 ← brief del operador (formulario)
    ├── doc-b-investigacion.md         ← investigación + arquitectura + test doctrinal
    ├── doc-c-diseno.md                ← extracción de diseño y layout
    ├── doc-d-construccion.md          ← bootstrap Astro + build + deploy + QA
    └── referencia.md                  ← consulta (LCAs, schemas, page-types, ejemplo)

ejecuciones-webs/                      ← repo separado — datos de clientes
└── [slug]/
    ├── DOCS-CANONICOS.md
    ├── lessons.md
    ├── INFORME-FINAL.md
    └── web/                           ← proyecto Astro (Cloudflare Pages)
        ├── package.json
        ├── outputs.json               ← vive aquí — viaja con el deploy
        └── src/
```

---

## Flujo

```
Doc A (brief) → Doc B (investigación + arquitectura) → Doc C (diseño) → Doc D (construcción)
```

1. **Doc A:** El operador rellena el brief (servicio, ciudad, NAP, web ref).
2. **Doc B:** La IA investiga Local Pack, propone arquitectura, ejecuta Test Doctrinal. Para hasta que el operador confirme servicios + web ref y el test pase.
3. **Doc C:** La IA extrae paleta + tipografía + layout de la web ref → `theme.css`.
4. **Doc D:** La IA bootstrapea Astro desde cero, redacta páginas, build, deploy. Para al cierre esperando datos finales (teléfono, email, tokens).

Detalle completo del flujo y paradas blocking en `AGENTS.md`.

---

## Sistemas disponibles

| Sistema | Qué es | Cuándo usarla |
|---------|--------|---------------|
| `01-gmb-crush` | SEO local + GBP. Variante v0.5: 4 docs lineales (Doc A brief → Doc B invest+arquit → Doc C diseño → Doc D construcción) + `referencia.md` de consulta. Stack: Astro 5 + Tailwind v3 + pnpm + Cloudflare Pages. Sin plantilla compartida — cada cliente bootstrapea desde snippets de Doc D. | Negocios locales que quieren posicionar en Google Maps + web. |

---

## Checks automáticos

Dos checks que corren en CI y pueden ejecutarse en local. Detectan deriva entre docs cuando un cambio no se propaga.

| Check | Qué hace | Cómo correrlo en local |
|-------|----------|------------------------|
| **Coherencia** (`scripts/check-coherence.sh`) | Verifica que los 4 docs + referencia.md existan, sean referenciados en AGENTS.md, no queden referencias huérfanas a la estructura previa ni terminología obsoleta. | `sh scripts/check-coherence.sh` |
| **Enlaces rotos** (lychee) | Detecta cualquier `.md` que referencie un archivo o ancla inexistente. | `lychee --offline --no-progress --root-dir "$(pwd)" './**/*.md'` |

### Pre-commit hook local

Para que los checks se ejecuten antes de cada `git commit` (aborta si falla):

```bash
git config core.hooksPath .githooks
```

El hook ejecuta coherencia siempre y lychee si está instalado.
