# Fase 2 · sub-fase 1 — Inputs Iniciales

**Fuente única de qué pedir al operador:** [`01-gmb-crush/01-input-humano.md`](../../../../01-input-humano.md) §Iniciales.

**No dupliques la lista aquí.** Lee ese archivo y pide al operador el mensaje exacto que vive en su §Mensaje exacto.

---

## Procedimiento

1. Abre `01-gmb-crush/01-input-humano.md`.
2. Copia y pega el "Mensaje exacto que el agente envía al operador" (sección §Iniciales).
3. Espera la respuesta del operador.
4. Marca cada campo aportado como `confirmed` y cada campo faltante con el status correspondiente:
   - Operador-dependientes faltantes → `⚠ placeholder` (`[TELÉFONO]`, `[EMAIL]`, etc.).
   - Tokens deploy faltantes → `⚠ pendiente tokens` (se cierran en Fase 6).
   - Web ref del cliente faltante → continuar con la web de referencia que se elija en sub-fase 2 (investigación).

---

## Bloqueantes para arrancar Fase 2

Si el operador NO aporta:
- **Servicio principal** → STOP. Sin esto no puedes investigar el Local Pack en sub-fase 2. Pide explícitamente.
- **Ciudad** → STOP. Idem.

Sin esos dos, no se pasa a la sub-fase 2.

---

## Pasa a sub-fase 2

Cuando tengas servicio + ciudad → abre [`02-investigacion.md`](./02-investigacion.md).
