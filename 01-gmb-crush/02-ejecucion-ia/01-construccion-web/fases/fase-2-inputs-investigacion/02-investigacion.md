# Fase 2 · sub-fase 2 — Investigación de Mercado (Local Pack)

**Procedimiento doctrinal completo:** [`01-gmb-crush/02-ejecucion-ia/00-investigacion/INVESTIGACION.md`](../../00-investigacion/INVESTIGACION.md).

Ese archivo es la fuente única del método de investigación de competidores. Vive donde está hoy (en `00-investigacion/`) porque es **común a todos los sistemas** del repo (`01-gmb-crush`, `02-…`, etc.).

---

## Procedimiento

1. Abre `01-gmb-crush/02-ejecucion-ia/00-investigacion/INVESTIGACION.md`.
2. Si Fase 1 declaró que tienes navegador → ejecuta la investigación tú (búsqueda manual en Google Maps).
3. Si Fase 1 declaró que no tienes navegador → entrega al operador el prompt de investigación (en `INVESTIGACION.md §Paso previo`) y espera que pegue los resultados.
4. Produce el **Informe de Competidores** según el formato exacto de `INVESTIGACION.md §Output`.

---

## Parada blocking — al final de la sub-fase

Tras presentar el Informe, **paras** y esperas las dos confirmaciones del operador:

1. **Servicios elegidos** para la web.
2. **Web de referencia de diseño** (URL).

Sin las dos, no avanzas a Fase 3.

Esta es la parada blocking oficial de Fase 2 (definida en el [README de Fase 2](./README.md)).

---

## Handoff a Fase 3

Cuando el operador confirme servicios + web ref → avanza a Fase 3 (Construcción Web I), pasando estos datos como `confirmed`:

| Dato confirmado | Dónde entra en Fase 3 |
|-----------------|----------------------|
| Servicios elegidos | sub-fase `01-fundamentos.md` — output 1.9 (Core Services) |
| Categoría GBP más frecuente | sub-fase `01-fundamentos.md` — output 1.5 (Primary Category) |
| Categorías secundarias de competidores | sub-fase `01-fundamentos.md` — output 1.6 (Additional Categories) |
| Trust signals del sector | sub-fase `01-fundamentos.md` — output 1.14 |
| Web de referencia de diseño | Fase 4 (Construcción II — diseño) |
