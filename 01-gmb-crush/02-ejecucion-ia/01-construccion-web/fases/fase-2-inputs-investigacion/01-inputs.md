# Fase 2 · sub-fase 1 — Inputs del Operador

Único archivo donde se declara qué pide el sistema al operador. Toda la información que cualquier fase necesita está aquí, partida en dos momentos: **Iniciales** (sub-fase 1 de Fase 2) y **Finales** (Fase 6 — QA + Datos Finales).

> **Si encuentras OTRO archivo del repo pidiendo inputs al operador, es un bug.** Repórtalo o redirígelo aquí. No dupliques listas.

---

## §Iniciales — al arrancar (esta sub-fase)

Lo que necesitas para investigar el sector (sub-fase 2 de Fase 2) y construir la web (Fases 3-5). Se piden todos en bloque tras Fase 1 (Test de Herramientas).

### Campos

Significado de **Status**:
- **bloqueante** → sin esto la IA no puede arrancar.
- **recomendable** → arranca pero el campo va como marcador visible (`[TELÉFONO]`, `[EMAIL]`, `[DIRECCIÓN]`).
- **opcional** → solo afecta a la fase indicada si se aporta.

| # | Campo | Status | Si falta | Se usa en |
|---|-------|--------|----------|-----------|
| 1 | Nombre del negocio | recomendable | derivar de servicio + ciudad y marcar `⚠ placeholder` | Fase 3 output 1.1, schema Organization, slug, dominio derivado |
| 2 | Servicio principal (qué hace) | **bloqueante** | la IA para y pide | Fase 2 sub-fase 2 (Local Pack), Fase 3 Core Services |
| 3 | Dirección completa (calle, número, CP, ciudad) | **bloqueante** (al menos ciudad) | sin ciudad no se arranca; sin calle/número/CP marcar `[DIRECCIÓN]` placeholder | Fase 3 NAP + Direct LCAs, schema LocalBusiness |
| 4 | Web actual del cliente (si tiene) | recomendable | sin web propia, la IA pide al operador una **referencia visual alternativa** (URL del sector que le guste) o **screenshots manuales**. Sin nada de eso, **no se ejecuta Fase 4** y el diseño queda como pendiente. | **Fase 4** — extracción de `theme.css` (colores, tipografía, layout) |
| 5 | Ciudades adicionales para análisis Local Pack | opcional | analizar solo la Main City | Fase 2 sub-fase 2 (cruce de servicios del sector) |

### Mensaje exacto que la IA envía al operador

Una sola vez por proyecto, justo después de Fase 1:

```
Para arrancar, pásame los datos del negocio:

1. Nombre del negocio
2. Servicio principal (qué hace)
3. Dirección completa (calle, número, CP y ciudad — si no la tiene, al menos la ciudad)
4. Web actual del cliente, si tiene (la usaré como referencia de diseño en Fase 4)
5. Ciudades adicionales para comparar el sector (opcional)

Con servicio + ciudad ya arranco. El resto se completa o queda marcado con marcador visible.
```

---

## §Finales — al cerrar (Fase 6)

Lo que se cierra DESPUÉS de que la web esté construida y desplegada. La IA lee el `INFORME-FINAL.md` que produce Fase 6, identifica los `⚠ placeholder` y pide al operador estos campos según corresponda.

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

### Mensaje de la IA al operador (post-deploy)

Tras entregar `INFORME-FINAL.md`, la IA cita la tabla de pendientes y pide específicamente los campos que aún están marcados como placeholder:

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

- **Campos bloqueantes:** sin servicio principal o sin ciudad, la IA no arranca. Para y los pide.
- **La IA no infiere datos del operador.** Si el operador no aporta un campo recomendable, va como marcador visible. La IA nunca fabrica un valor real.
- **Datos prohibidos de inventar bajo cualquier circunstancia:** años de experiencia, número de reseñas, certificaciones, fotos, valores de schema (rating, sameAs antes del GBP). Si el operador los aporta → `confirmed`. Si no → quedan fuera del contenido publicado.
- **Único punto de entrada:** este archivo (`01-inputs.md`). Cualquier IA que pida inputs al operador en otro sitio está duplicando — apúntala aquí.

---

## Procedimiento para esta sub-fase

1. Envía al operador el mensaje exacto de §Iniciales arriba.
2. Espera la respuesta. Marca cada campo aportado como `confirmed`; los faltantes como `⚠ placeholder` (operador-dependientes) o `⚠ pendiente tokens` (deploy).
3. **Si faltan los dos bloqueantes** (servicio principal o ciudad) → para y pide de nuevo.
4. Con servicio + ciudad mínimos → pasa a sub-fase 2 (`02-investigacion.md`).

---

## Contratos técnicos producidos por esta sub-fase

### Shape canónico del NAP — output `1.4` en `outputs.json`

El `NAP` (Name + Address + Phone) es el bloque más reutilizado del cliente. Vive en el output `1.4` de `outputs.json` con este shape exacto (TypeScript):

```ts
export interface NAP {
  name: string;       // razón social o nombre comercial. Si falta → "[NOMBRE]"
  street: string;     // "Calle Gallarza 22". Si falta → "[DIRECCIÓN]"
  city: string;       // "Madrid". BLOQUEANTE — sin esto no se arranca.
  state: string;      // provincia/comunidad. Por defecto = city si España.
  zip: string;        // "28002". Si falta → "[CP]"
  country: string;    // ISO-2: "ES", "MX", "AR", etc.
  phone: string;      // E.164 sin separadores ideal. Si falta → "[TELÉFONO]"
  email: string;      // Si falta → "[EMAIL]"
}
```

Ejemplo de output `1.4` válido cuando aún falta phone/email:

```json
{
  "id": "1.4",
  "name": "Full NAP",
  "value": {
    "name": "[NOMBRE]",
    "street": "Calle Gallarza 22",
    "city": "Madrid",
    "state": "Madrid",
    "zip": "28002",
    "country": "ES",
    "phone": "[TELÉFONO]",
    "email": "[EMAIL]"
  },
  "status": "⚠ placeholder",
  "fuente": "Cliente preflight",
  "source": "Operador 2026-MM-DD — dirección confirmed, resto pendiente",
  "bloque": 1
}
```

**Reglas del shape:**
- Las 8 claves son **obligatorias**. Si un dato no se conoce, va el placeholder visible entre corchetes, nunca `null`/`""`/omitido.
- `city` es bloqueante — el operador la aporta o no se arranca.
- Cualquier otra clave faltante → marcador (`[NOMBRE]`, `[TELÉFONO]`, etc.) y el output entero queda `status: "⚠ placeholder"`.
- Fase 6 cierra estos placeholders al final del proyecto (ver §Finales).

Este shape lo consumen:
- Schema `LocalBusiness.address` (Fase 3 sub-2)
- Bloque NAP del footer y página de Contacto (Fase 3 sub-4)
- Sitemap (indirectamente, vía el dominio del output `1.2`)
