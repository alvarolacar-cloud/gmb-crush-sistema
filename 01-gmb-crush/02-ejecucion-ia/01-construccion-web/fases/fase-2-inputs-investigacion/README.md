# Fase 2 — Inputs + Investigación de Mercado

## Contrato

- **Inputs esperados:** Fase 1 cerrada (capacidades + plan B confirmados).
- **Outputs producidos:** datos del negocio (NAP + servicios + web ref) + Informe de Competidores (top 5 Local Pack + matriz de servicios + categorías GBP + recomendaciones).
- **Gate de salida:** 2 confirmaciones explícitas del operador → servicios elegidos + URL de web de referencia.
- **Si falta un input bloqueante:** sin servicio principal o ciudad → para y pide al operador. No inventes.

---

**Cuándo se ejecuta:** después de Fase 1 (Test de Herramientas). Antes de Fase 3 (Construcción I).

**Tipo de parada:** blocking. Tras presentar el Informe de Competidores, la IA espera dos confirmaciones explícitas del operador: servicios a incluir + web de referencia de diseño.

---

## Qué hace esta fase

Dos sub-fases secuenciales:

| # | Sub-fase | Archivo | Qué produce |
|---|----------|---------|-------------|
| 1 | Inputs iniciales del operador | [`01-inputs.md`](./01-inputs.md) | Datos del negocio (servicio, ciudad, dirección, web ref, etc.) |
| 2 | Investigación de mercado (Local Pack) | [`02-investigacion.md`](./02-investigacion.md) | Informe de Competidores + categorías GBP del sector |

Ambas sub-fases se ejecutan en orden. La parada blocking llega **al final de Fase 2**, después de presentar el Informe.

---

## Parada blocking — qué esperas del operador

Tras presentar el Informe:

1. **Servicios elegidos** — el operador confirma qué servicios incluir en la web. Recomendación: los que aparecen en 3+/5 perfiles del Local Pack.
2. **Web de referencia de diseño** — el operador indica una URL (de las propuestas en el Informe o cualquier otra).

Sin esas dos confirmaciones explícitas, **no avanzas a Fase 3**. Si el operador no responde, preguntas de nuevo con la misma pregunta.

---

## Gate de salida

- [ ] Inputs iniciales recogidos (al menos los bloqueantes: servicio + ciudad).
- [ ] Investigación ejecutada (por la IA o por el operador en plan B).
- [ ] Informe de Competidores presentado.
- [ ] Servicios confirmados por el operador.
- [ ] Web de referencia confirmada (URL).

Cuando los 5 checks están ✓ → avanzar a Fase 3.
