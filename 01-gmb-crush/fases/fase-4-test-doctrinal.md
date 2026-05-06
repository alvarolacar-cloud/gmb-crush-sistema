## 6. Fase 4 — Test Doctrinal (Gate Pre-Build)

Ejecuta el test doctrinal (`referencias/test-doctrinal.md`) contra los 6 docs producidos en Fase 3. Para cada bloque del test, responde con:

- **PASS / FAIL**
- **Evidencia:** dato concreto que demuestra el resultado (ej: "URL Matrix tiene 24 filas. Fórmula = 23+1. Cuadra.")
- **Problema doctrinal** (si FAIL): qué regla se viola.
- **Corrección** (si FAIL): qué cambiar para que pase.

**Si todos los bloques dan PASS:** avanza a Fase 5 (Diseño).
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

---

