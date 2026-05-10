# INPUTS.md — Datos del Operador (fuente única)

Único archivo donde se declara qué pide el sistema al operador para arrancar. Toda la información que cualquier fase necesita está aquí.

> **Si encuentras OTRO archivo del repo pidiendo inputs al operador, es un bug.** Repórtalo o redirígelo aquí. No dupliques listas.

---

## Cuándo se piden

Al arrancar cualquier sistema (`01-gmb-crush/`, `02-...`). El agente lee este archivo, hace las preguntas al operador en bloque, completa los campos, y solo entonces pasa a la investigación de Local Pack.

---

## Campos

Las preguntas se hacen en este orden. Significados de la columna **Status**:

- **bloqueante** → sin esto el agente no puede arrancar.
- **recomendable** → arranca pero el campo va como marcador visible (`[TELÉFONO]`, `[EMAIL]`, `[DIRECCIÓN]`).
- **opcional** → solo afecta a la fase indicada si se aporta.

| # | Campo | Status | Si falta | Se usa en |
|---|-------|--------|----------|-----------|
| 1 | Nombre del negocio | recomendable | derivar de servicio + ciudad y marcar `⚠ placeholder` | Fase 1 output 1.1, schema Organization, slug, dominio derivado |
| 2 | Servicio principal (qué hace) | **bloqueante** | el agente para y pide | Fase 0 búsqueda Local Pack, Fase 1 Core Services |
| 3 | Dirección completa (calle, número, CP, ciudad) | **bloqueante** (al menos ciudad) | sin ciudad no se arranca; sin calle/número/CP marcar `[DIRECCIÓN]` placeholder | Fase 1 NAP + Direct LCAs, schema LocalBusiness |
| 4 | Teléfono | recomendable | marcar `[TELÉFONO]`. Bloquea creación GBP en Fase 8 | NAP, schema, página de contacto, CTA "Llamar" |
| 5 | Email | recomendable | marcar `[EMAIL]` | schema ContactPoint, página de contacto |
| 6 | Web actual del cliente (si tiene) | recomendable | sin web propia, el agente pide al operador una **referencia visual alternativa** (URL del sector que le guste) o **screenshots manuales**. Sin nada de eso, **no se ejecuta Fase 5** y el diseño queda como pendiente. | **Fase 5** — extracción de design tokens (colores, tipografía, layout) |
| 7 | Estado GBP (Not Created / Created / Verified / Pending / Suspended) | opcional | asumir `Not Created` | Fase 8 bloqueo de creación de GBP |
| 8 | Ciudades adicionales para análisis Local Pack | opcional | analizar solo la Main City | Fase 0 cruce de servicios del sector |
| 9 | Token GitHub (PAT con `repo` + `workflow`) | opcional | build hasta `dist/`, marcar `⚠ pendiente tokens` | Fase 7 deploy |
| 10 | Cloudflare Account ID | opcional | igual que 9 | Fase 7 deploy |
| 11 | Cloudflare API Token (permisos Pages + DNS) | opcional | igual que 9 | Fase 7 deploy |
| 12 | Dominio del cliente (con `https://`) | opcional | derivar `https://www.[slug-negocio].com/` y marcar `⚠ placeholder` | Fase 6 `astro.config.mjs` (`site`), schema `url` |

---

## Mensaje exacto que el agente envía al operador

Una sola vez por proyecto, antes de cualquier investigación:

```
Pásame los datos del cliente para arrancar:

1. Nombre del negocio
2. Servicio principal (qué hace)
3. Dirección completa (calle, número, CP y ciudad — si no la tiene, al menos la ciudad)
4. Teléfono y email (si los tienes)
5. Web actual del cliente (si tiene — la usaré como referencia de diseño en Fase 5)
6. Estado GBP (Not Created / Created / Verified / Pending / Suspended)
7. Ciudades adicionales para comparar el sector (opcional)
8. Tokens de deploy (GitHub PAT + Cloudflare Account ID + Cloudflare API Token) y dominio (opcionales — si no los tienes, construyo y el deploy queda pendiente)

Con servicio + ciudad ya arranco. El resto se completa o queda marcado pendiente con marcador visible.
```

---

## Reglas

- **Campos bloqueantes:** sin servicio principal o sin ciudad, el agente no arranca. Para y los pide.
- **El agente no infiere datos del operador.** Si el operador no aporta un campo recomendable, va como marcador visible (`[TELÉFONO]`, `[EMAIL]`, `[DIRECCIÓN]`). El agente nunca fabrica un valor real.
- **Datos prohibidos de inventar bajo cualquier circunstancia:** años de experiencia, número de reseñas, certificaciones, fotos, valores de schema (rating, sameAs antes del GBP). Si el operador los aporta → `confirmed`. Si no → quedan fuera del contenido publicado.
- **Único punto de entrada:** este archivo. Cualquier IA que pida inputs al operador en otro sitio está duplicando — apúntala a `INPUTS.md`.
