# Arquitectura del Sistema — Decisiones de Diseño

Este documento explica cómo se construyó el `SISTEMA.md` a partir de la doctrina GMB Crush original, qué se condensó, qué se añadió, y qué se dejó fuera deliberadamente.

---

## Origen: el sistema GMB Crush original

El sistema GMB Crush original vive en el repo [gmb-crush-ejecucion](https://github.com/alvarolacar-cloud/gmb-crush-ejecucion) y en los repos de referencia `07 ejecucion-docs` y `08 repos-1-y-2`. Tiene:

- **14 pasos** organizados en **7 bloques** (0 a 7)
- **242 outputs** con fuente, método y status declarados
- **8 fuentes canónicas** cerradas
- **47 reglas** estructurales y operativas
- **~34 archivos** operativos (a-docs, planes, consolidaciones)

El sistema era exhaustivo pero no ejecutable de un tirón: una IA se perdía en la cantidad de archivos, outputs y cross-references antes de llegar a construir la web.

---

## Qué hemos hecho: condensar 242 outputs en 7 fases ejecutables

El `SISTEMA.md` condensa los 242 outputs en un flujo de 7 fases que una IA puede seguir de principio a fin sin detenerse.

| Fase del SISTEMA.md | Bloques originales que cubre | Outputs originales |
|---------------------|------------------------------|:------------------:|
| Fase 1 (Arquitectura) | Bloque 1 — Pasos 1, 2, 3 | 42 |
| Fase 2 (Contenido) | Bloque 2 — Pasos 4, 5, 6, 7 + Bloque 5 — Paso 15 | 57 + parte de 39 |
| Fase 3 (6 Docs Canónicos) | No existía en el original (nuevo) | — |
| Fase 5 (Test Doctrinal) | No existía en el original (nuevo) | — |
| Fase 6 (Build) | Bloque 5 — Pasos 17, 18 | parte de 39 |
| Fase 7 (Deploy) | Bloque 5 — Paso 18 | parte de 39 |
| Fase 8 (Consolidación) | Bloque 6 (Info que falta) + Bloque 7 (GBP bloqueado) | 0 + 20 bloqueados |

---

## Bloques 3 y 4 del original: por qué no están como fases separadas

Los Bloques 3 (Priorización, 43 outputs) y 4 (Automatización, 41 outputs) del sistema original producían:

| Bloque | Qué producía | Dónde está ahora |
|--------|-------------|------------------|
| Bloque 3 — Priority Score | Puntuación por página para decidir orden de producción | Embebido en Fase 6 §5.4 como "Orden de construcción" fijo (HP→SO→GH→LBS→AC→GA) |
| Bloque 3 — QA Checklist | Lista de checks por página antes de publicar | Embebido en Fase 5 como "Test Doctrinal" (gate pre-build) |
| Bloque 3 — Producción en Fases | Calendario de publicación por fases | No incluido — la IA construye todo de una vez, no en fases separadas |
| Bloque 4 — Pseudocódigo | Lógica del sistema en pseudocódigo | No incluido — el propio SISTEMA.md ES la lógica |
| Bloque 4 — Master Prompt | El prompt que se le da a la IA | No incluido — el propio SISTEMA.md ES el master prompt |
| Bloque 4 — Sistema Final | Documento operativo consolidado | No incluido — el propio SISTEMA.md ES el sistema final |

La decisión fue: los Bloques 3 y 4 eran **meta-documentación sobre cómo ejecutar el sistema**. En este nuevo enfoque, el SISTEMA.md ya ES esa meta-documentación convertida en instrucciones directas. No tiene sentido producir un "master prompt" cuando el archivo que la IA está leyendo YA es el master prompt.

---

## Qué se añadió (no existía en el original)

| Elemento nuevo | Por qué se añadió |
|----------------|-------------------|
| **Fase 3 — 6 Docs Canónicos** | El sistema original no producía documentos formales intermedios. Se añadió para que el test doctrinal tenga algo concreto contra qué ejecutar los checks. |
| **Fase 5 — Test Doctrinal como gate** | El test-doctrinal.md existía pero no estaba integrado en el flujo de ejecución. Ahora es un gate obligatorio antes del build. |
| **Pregunta de arranque** ("¿buscar datos reales o inferir?") | El sistema original asumía que la IA siempre tenía acceso a tools. Este sistema funciona con o sin acceso — el operador decide. |
| **Regla "nunca te detienes"** | El sistema original toleraba `⚠` pero no lo declaraba como regla de hierro. Aquí es la primera convención. |
| **Trust Signals como output explícito** | En el original estaba en el output 1.14 pero se perdía al condensar. Se recuperó como sección 3.6. |

---

## Qué se mantiene igual que el original

- La **fórmula maestra** (`1+S+1+S+A+G×S`).
- Los **patrones URL** por page type.
- El **schema por page type**.
- El **internal linking map**.
- Las **8 fuentes canónicas** (Cliente preflight, Doctrina GMB Crush, Doctrina + Local Pack, Doctrina + Keyword Research, etc.).
- La filosofía **web-first** (web sale con datos provisionales, GBP después).
- La regla de que **LCAs no generan URLs**.
- Los estados de output: `confirmed`, `validated`, `⚠ placeholder` (operador no aportó dato), `⚠ pendiente tokens` (deploy bloqueado), `⚠ pendiente diseño` (Fase 6 sin capacidades), `no aplica`. **El estado `⚠ inferido` fue eliminado** — la IA o tiene fuente verificable o para; ya no hay zona gris donde "razone con lógica del sector".
- El concepto de **Bloque 6 como agregador** de pendientes que bloquea el GBP.

---

## Qué se perdió deliberadamente

| Elemento eliminado | Por qué |
|--------------------|---------|
| Los 242 output IDs individuales (1.1, 1.2...) | La IA no necesita IDs para producir los datos. Los produce como resultado natural de las fases. |
| Los b-docs (decisiones tomadas y fuentes por paso) | La trazabilidad se resuelve con la tabla de pendientes (⚠) y las fuentes declaradas en Fase 1. |
| El esqueleto canónico de 4 bloques (I/II/III/IV) por a-doc | Era un formato de documentación, no de ejecución. |
| Las cross-references entre pasos (← X.Y) | Se simplifican: cada fase consume el output de la anterior sin necesidad de referenciar IDs. |
| El Priority Score numérico por página | Se reemplaza por un orden fijo de construcción (más simple, mismo resultado). |
| El calendario de producción en 5 fases | La IA construye todo de una vez. No necesita calendario. |

---

## Bootstrap del proyecto Astro (v0.4.0+)

**Cambio histórico:** la carpeta `plantilla-astro/` existía hasta v0.3.0 como plantilla compartida. En v0.4.0 se eliminó. Ahora la doctrina misma contiene los snippets de código que la IA reproduce por cliente.

Cómo bootstrapea ahora la IA en Fase 3 sub-fase 4:
1. Crea `ejecuciones-webs/[slug]/web/` desde cero.
2. Reproduce los snippets canónicos de la doctrina (ver `SISTEMA.md §3`):
   - `package.json`, `astro.config.mjs`, `tsconfig.json` ← `fase-3/04-redaccion.md`
   - `src/lib/{slugify, schema-helpers, cluster, types}.ts` ← snippets repartidos por fase
   - `src/layouts/BaseLayout.astro` ← `fase-3/04-redaccion.md`
   - `src/pages/sitemap.xml.ts` ← `fase-3/01-fundamentos.md`
3. Escribe una `.astro` por URL de la URL Matrix (output `3.1`) con HTML libre fiel a la web de referencia (output de Fase 4).
4. Coloca `outputs.json` consolidado en la raíz del proyecto.
5. Fase 4 produce `theme.css` + `global.css` en `src/styles/`.
6. Fase 5 ejecuta `pnpm install && CLUSTER_PATH=./outputs.json pnpm build`.

La estructura del `outputs.json` está definida fase a fase (cada fase declara los outputs que produce con su shape exacto). El consumo lo hace `src/lib/cluster.ts` (snippet canónico en `fase-3/04-redaccion.md`).

---

## Cómo verificar que no se perdió nada crítico

El archivo `01-todos-los-outputs.md` (en el repo original) contiene los 242 outputs con su fuente y método. Se puede cruzar contra el SISTEMA.md para verificar cobertura. El cruce del Bloque 1 (42 outputs) se hizo y resultó en 40/42 cubiertos (se excluyó deliberadamente 1.8 Physical Location City; 3.1 nombre del spreadsheet es cosmético).

Los Bloques 2-5 no se han cruzado formalmente. La cobertura se asume por el hecho de que las Fases 2-7 producen los mismos artefactos (contenido, schema, linking, build, deploy) que los bloques originales, solo que sin numerar cada output individualmente.
