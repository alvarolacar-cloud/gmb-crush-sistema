# Fase 5 — Construcción Web III (build + deploy)

**Cuándo se ejecuta:** después de Fase 4 (Diseño). Antes de Fase 6 (QA + datos finales).

**Tipo de parada:** **gate ligero**. La fase muestra resultados al final pero AVANZA automáticamente a Fase 6 si build pasa y deploy se ejecuta (o se entrega `dist/` si faltan tokens).

---

## Qué hace esta fase

Dos sub-fases secuenciales:

| # | Sub-fase | Archivo | Qué produce |
|---|----------|---------|-------------|
| 1 | Build | [`01-build.md`](./01-build.md) | `outputs.json` consolidado + `pnpm build` + `dist/` |
| 2 | Deploy | [`02-deploy.md`](./02-deploy.md) | Push a GitHub + Cloudflare Pages (si hay tokens) o entrega de `dist/` (si no) |

---

## Parada gate ligero — al final de Fase 5

Al terminar el deploy:

- **Si build pasa + deploy ejecutado** → presentas la URL live al operador y **avanzas a Fase 6**.
- **Si build pasa + sin tokens deploy** → presentas `dist/` listo + marcas `⚠ pendiente tokens` y **avanzas a Fase 6**.
- **Si build falla** → ejecutas el protocolo de "autonomous bug fixing" (3 intentos diagnóstico + fix). Solo si tras 3 intentos sigue fallando paras y reportas al operador.

La IA no para a preguntar permiso para construir o desplegar. Solo para si hay un fallo persistente.

---

## Gate de salida

- [ ] Sub-fase 1 (Build) completada con build OK (HTMLs generados, sitemap, topología correcta).
- [ ] Sub-fase 2 (Deploy) completada — con tokens (LIVE) o sin tokens (`dist/` entregado).
- [ ] Resultado presentado al operador (URL o ruta a `dist/`).

Cuando los 3 checks están ✓ → avanzar a Fase 6 automáticamente.
