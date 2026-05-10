# INPUTS.md — Datos del Operador (fuente única)

Único archivo donde se declara qué pide el sistema al operador. Toda la información que cualquier paso o fase necesita está aquí, partida en dos momentos: **Iniciales** (al arrancar) y **Finales** (al cerrar el proyecto).

> **Si encuentras OTRO archivo del repo pidiendo inputs al operador, es un bug.** Repórtalo o redirígelo aquí. No dupliques listas.

---

## §Iniciales — Paso 3 del flujo (al arrancar)

Lo que necesitas para investigar el sector y construir la web. Se piden todos en bloque después del Test de herramientas (Paso 2).

### Campos

Significado de **Status**:
- **bloqueante** → sin esto el agente no puede arrancar.
- **recomendable** → arranca pero el campo va como marcador visible (`[TELÉFONO]`, `[EMAIL]`, `[DIRECCIÓN]`).
- **opcional** → solo afecta a la fase indicada si se aporta.

| # | Campo | Status | Si falta | Se usa en |
|---|-------|--------|----------|-----------|
| 1 | Nombre del negocio | recomendable | derivar de servicio + ciudad y marcar `⚠ placeholder` | Fase 1 output 1.1, schema Organization, slug, dominio derivado |
| 2 | Servicio principal (qué hace) | **bloqueante** | el agente para y pide | Paso 4 búsqueda Local Pack, Fase 1 Core Services |
| 3 | Dirección completa (calle, número, CP, ciudad) | **bloqueante** (al menos ciudad) | sin ciudad no se arranca; sin calle/número/CP marcar `[DIRECCIÓN]` placeholder | Fase 1 NAP + Direct LCAs, schema LocalBusiness |
| 4 | Web actual del cliente (si tiene) | recomendable | sin web propia, el agente pide al operador una **referencia visual alternativa** (URL del sector que le guste) o **screenshots manuales**. Sin nada de eso, **no se ejecuta Fase 6** y el diseño queda como pendiente. | **Fase 6** — extracción de design tokens (colores, tipografía, layout) |
| 5 | Ciudades adicionales para análisis Local Pack | opcional | analizar solo la Main City | Paso 4 cruce de servicios del sector |

### Mensaje exacto que el agente envía al operador

Una sola vez por proyecto, justo después del Test de herramientas:

```
Para arrancar, pásame los datos del negocio:

1. Nombre del negocio
2. Servicio principal (qué hace)
3. Dirección completa (calle, número, CP y ciudad — si no la tiene, al menos la ciudad)
4. Web actual del cliente, si tiene (la usaré como referencia de diseño en Fase 6)
5. Ciudades adicionales para comparar el sector (opcional)

Con servicio + ciudad ya arranco. El resto se completa o queda marcado con marcador visible.
```

---

## §Finales — Paso 6 del flujo (al cerrar)

Lo que se cierra DESPUÉS de que la web esté construida y desplegada. El agente lee el `INFORME-FINAL.md` que produce Fase 9, identifica los `⚠ placeholder` y pide al operador estos campos según corresponda.

### Campos

| # | Campo | Status | Cómo cierra | Bloquea GBP |
|---|-------|--------|-------------|:-----------:|
| 1 | Teléfono | recomendable | operador lo provee, rebuild + redeploy | ✓ |
| 2 | Email | recomendable | igual | — |
| 3 | Estado GBP final (Created / Verified) | opcional | operador confirma cuando lo cree | ✓ (es el cierre del proyecto) |
| 4 | Token GitHub (PAT con `repo` + `workflow`) | opcional | sin él, deploy queda pendiente; con él, redeploy automático | ✓ (si la web no está live, no hay GBP) |
| 5 | Cloudflare Account ID | opcional | igual que 4 | ✓ |
| 6 | Cloudflare API Token (permisos Pages + DNS) | opcional | igual que 4 | ✓ |
| 7 | Dominio definitivo del cliente (con `https://`) | opcional | operador confirma o cambia el derivado | ✓ |

### Mensaje del agente al operador (post-deploy)

Tras entregar `INFORME-FINAL.md`, el agente cita la tabla de pendientes y pide específicamente los campos que aún están marcados como placeholder:

```
La web está [live en https://... / construida en dist/ pendiente de deploy].

Lee el INFORME-FINAL.md. Para cerrar el proyecto y desbloquear la creación del GBP necesito:

[lista dinámica de los placeholders abiertos — ej:]
- Teléfono real del negocio (hoy en la web aparece como [TELÉFONO])
- Email del negocio
- Tokens de deploy si quieres que pase a live: GitHub PAT + Cloudflare Account ID + API Token + dominio

Cuando vayas cerrando cada uno, me lo dices y rebuild + redeploy. Cuando la tabla esté vacía, creo el GBP.
```

---

## Reglas (aplican a iniciales y finales)

- **Campos bloqueantes:** sin servicio principal o sin ciudad, el agente no arranca. Para y los pide.
- **El agente no infiere datos del operador.** Si el operador no aporta un campo recomendable, va como marcador visible. El agente nunca fabrica un valor real.
- **Datos prohibidos de inventar bajo cualquier circunstancia:** años de experiencia, número de reseñas, certificaciones, fotos, valores de schema (rating, sameAs antes del GBP). Si el operador los aporta → `confirmed`. Si no → quedan fuera del contenido publicado.
- **Único punto de entrada:** este archivo. Cualquier IA que pida inputs al operador en otro sitio está duplicando — apúntala a `INPUTS.md`.
