# Fase 3 — Construcción Web I (arquitectura → contenido → test doctrinal)

**Cuándo se ejecuta:** después de Fase 2 (inputs + investigación confirmados). Antes de Fase 4 (Diseño).

**Tipo de parada:** **gate ligero**. La fase muestra resultados al final pero AVANZA automáticamente a Fase 4 salvo que el Test Doctrinal falle. Si falla, paras y corriges hasta que pase.

---

## Qué hace esta fase

Las 5 sub-fases estructurales del cluster, en orden:

| # | Sub-fase | Archivo | Qué produce |
|---|----------|---------|-------------|
| 1 | Fundamentos y Arquitectura | [`01-fundamentos.md`](./01-fundamentos.md) | Main City, servicios, URLs, fórmula de páginas |
| 2 | Contenido (specs) | [`02-contenido.md`](./02-contenido.md) | Specs de páginas, schemas, enlaces internos |
| 3 | Docs Canónicos | [`03-docs-canonicos.md`](./03-docs-canonicos.md) | 6 documentos de referencia del cluster |
| 4 | Redacción de contenido | [`04-redaccion.md`](./04-redaccion.md) | Copy real de todas las páginas |
| 5 | Test Doctrinal | [`05-test-doctrinal.md`](./05-test-doctrinal.md) | Validación de los 6 docs — gate obligatorio |

**Lee cada sub-fase antes de ejecutarla** (protocolo obligatorio).

---

## Parada gate ligero — al final de Fase 3

Al terminar la sub-fase 5 (Test Doctrinal):

- **Si PASS (todos los bloques verdes)** → presentas el resultado del test al operador como visibilidad y **avanzas a Fase 4** sin esperar respuesta.
- **Si FAIL (cualquier bloqueante)** → **paras**. Corriges los docs canónicos según el problema indicado. Vuelves a ejecutar el Test Doctrinal. Solo cuando PASS, avanzas a Fase 4. **Nunca avanzas con FAIL aunque el operador lo pida.**

Esto convierte el Test Doctrinal en un gate técnico: la IA no para a preguntar permiso, solo para a corregir si la doctrina lo exige.

---

## Gate de salida

- [ ] Sub-fases 1-4 ejecutadas con sus gates internos respectivos.
- [ ] Sub-fase 5 (Test Doctrinal) ejecutada.
- [ ] Resultado del Test = PASS.
- [ ] Resultado presentado al operador (visibilidad).

Cuando los 4 checks están ✓ → avanzar a Fase 4 automáticamente.
