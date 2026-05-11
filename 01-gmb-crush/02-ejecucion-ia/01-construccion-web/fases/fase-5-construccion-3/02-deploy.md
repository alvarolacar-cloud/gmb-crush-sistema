## Fase 5 · sub-fase 2 — Deploy

### Contrato

- **Inputs esperados:** sub-fase 1 cerrada (`dist/` generado y verificado).
- **Outputs producidos:** URL live en producción (si hay tokens) o `dist/` entregado + plan de cierre (si no).
- **Gate de salida:** una de las dos cosas materializa.
- **Si falta un input bloqueante:** sin tokens → Opción C de abajo (no es bloqueante para avanzar a Fase 6 — los tokens se cierran ahí).

---

**Fuente:** `Doctrina GMB Crush` (Arquitectura técnica: Cloudflare Pages).

### Dónde están los tokens

Los tokens de GitHub y Cloudflare son inputs finales del operador y se cierran en Fase 6 (ver `fase-2-inputs-investigacion/01-inputs.md` §Finales). Si no están, construye hasta `dist/` y marca `⚠ pendiente tokens` — no bloquees la ejecución.

### Vías según tokens disponibles

**Opción A (preferida) — GitHub PAT + Cloudflare Account ID + Cloudflare API Token con permisos Pages:**

1. Crear repo GitHub con nombre `[slug-negocio]-web` (ej: `tergo-madrid-web`)
2. `git init && git add . && git commit -m "Initial commit"`
3. `gh repo create [slug-negocio]-web --private --source=. --push`
4. Crear proyecto en Cloudflare Pages conectado al repo:
   - Build command: `pnpm run build`
   - Output directory: `dist/`
   - Variables de entorno: `CLUSTER_PATH=./outputs.json`
5. Cada push a `main` redespliega automáticamente.
6. Verificar URL `*.pages.dev` LIVE y todas las URLs de la URL Matrix responden 200.

**Opción B — solo Cloudflare API Token (sin GitHub):**

1. `export CLOUDFLARE_API_TOKEN=...`
2. `export CLOUDFLARE_ACCOUNT_ID=...`
3. `npx wrangler pages project create [slug-negocio] --production-branch main`
4. `npx wrangler pages deploy dist --project-name=[slug-negocio] --branch=main`
5. Verificar URL `*.pages.dev` LIVE.

Más rápido que Opción A, pero el cliente no tiene el código en GitHub para iteraciones manuales (la IA siempre puede redeployar via wrangler).

**Opción C — sin tokens:**

1. Entrega `dist/` al operador con instrucciones de subida manual (drag-and-drop en dashboard de Cloudflare Pages, Netlify, Vercel, GitHub Pages, o cualquier hosting estático).
2. Añade a la tabla de pendientes que cierra Fase 6:

| Dato | Status | Qué se necesita |
|------|--------|-----------------|
| Deploy | ⚠ pendiente tokens | Operador aporta tokens o sube `dist/` manualmente |

3. Cuando el operador aporte tokens en Fase 6, redeploya con Opción A o B y la web pasa a LIVE.
