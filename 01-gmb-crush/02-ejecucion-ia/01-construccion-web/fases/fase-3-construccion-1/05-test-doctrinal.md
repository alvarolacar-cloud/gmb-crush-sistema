## Fase 3 · sub-fase 5 — Test Doctrinal (Gate Pre-Build)

### Contrato

- **Inputs esperados:** sub-fases 1-4 cerradas (arquitectura + schemas + linking + docs canónicos + .astro escritas + outputs.json poblado).
- **Outputs producidos:** resultado PASS/FAIL del test doctrinal por cada bloque, con evidencia concreta + correcciones aplicadas si hubo FAIL.
- **Gate de salida:** **PASS en todos los bloques bloqueantes.** Sin PASS → no avanzar a Fase 4 aunque el operador lo pida (regla inviolable §4).
- **Si falta un input bloqueante:** algún output de sub-fases 1-4 ausente → vuelve a la sub-fase correspondiente. No se ejecuta el test sobre docs incompletos.

---

**Lee el checklist completo antes de continuar: `../../referencias/test-doctrinal.md`**
Ábrelo ahora y ejecútalo punto por punto contra los 6 docs producidos en la sub-fase 3.

Para cada bloque del test, responde con:

- **PASS / FAIL**
- **Evidencia:** dato concreto que demuestra el resultado (ej: "URL Matrix tiene 24 filas. Fórmula = 23+1. Cuadra.")
- **Problema doctrinal** (si FAIL): qué regla se viola.
- **Corrección** (si FAIL): qué cambiar para que pase.

**Si todos los bloques dan PASS:** avanza a Fase 4 (Diseño).
**Si algún bloque da FAIL:** corrige los 6 docs, re-ejecuta el test, y solo avanza cuando todo sea PASS.

**Bloqueos automáticos** (FAIL instantáneo sin importar el score):
- LCAs generan URLs sin aprobación.
- Service Overview y LBS se mezclan.
- GeoArticles se comportan como landings.
- No existe GeoHub.
- No hay internal linking padre/hijo.
- Schema genérico para todas las páginas.
- Se inventa ubicación física.
- Orden topológico roto (páginas hijas declaradas sin padre).
