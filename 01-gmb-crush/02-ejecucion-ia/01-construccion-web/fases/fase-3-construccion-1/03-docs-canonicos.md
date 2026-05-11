## Fase 3 · sub-fase 3 — Producir los 6 Docs Canónicos

### Contrato

- **Inputs esperados:** sub-fases 1 y 2 cerradas (arquitectura + schemas + linking + LCAs + servicios).
- **Outputs producidos:** archivo `DOCS-CANONICOS.md` (o 6 archivos separados) en `ejecuciones-webs/[slug]/` con 6 secciones: URL Matrix, Page Type Map, Internal Linking Plan, Content Pack (briefs por URL), Schema Map, Tabla de Pendientes.
- **Gate de salida:** los 6 docs existen, son auditables, y el Content Pack tiene un brief por cada URL de la matrix (la IA en sub-fase 4 los consume textualmente).
- **Si falta un input bloqueante:** algún output de sub-fase 1 o 2 sin producir → vuelve atrás.

---

Antes de construir, consolida todo lo producido en las sub-fases 1 y 2 en estos 6 documentos. Son la fuente de verdad del cluster y el input del test doctrinal (sub-fase 5).

| # | Documento | Qué contiene |
|---|-----------|---------------|
| 1 | **URL Matrix** | Tabla con todas las URLs: ID, URL, Page Type, Servicio, Ciudad, Parent Page, Schema asignado, Links salientes, Status, Fuente del output. |
| 2 | **Page Type Map** | Clasificación de cada URL por función: HP / SO / LBS / AC / GH / GA / AUX. |
| 3 | **Internal Linking Plan** | Mapa de enlaces obligatorios entre páginas (quién enlaza a quién, en cuerpo y en nav). |
| 4 | **Content Pack** | Brief por URL: H1, Meta Title, Meta Description, Hero, H2s, FAQs, CTA, LCAs mencionadas. |
| 5 | **Schema Map** | JSON-LD asignado por Page Type, con campos específicos (address, areaServed, provider, author). |
| 6 | **Tabla de Pendientes (⚠)** | Todos los outputs con status `⚠ placeholder` (datos del operador faltantes), `⚠ pendiente tokens` o `⚠ pendiente diseño`, con fuente y plan de cierre. |

Estos 6 docs se producen como un único entregable consolidado (puede ser un solo archivo .md con 6 secciones o 6 archivos separados).

---

