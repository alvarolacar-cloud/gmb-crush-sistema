# Fase 2 · sub-fase 2 — Investigación de Mercado (Local Pack)

## Objetivo

Antes de construir la web, la IA investiga el Local Pack del sector y entrega al operador un informe visual con los competidores. El operador decide:

1. **Qué servicios poner en la web**
2. **Qué web usar como referencia de diseño**

Con esas dos confirmaciones, se pasa a Fase 3.

---

## Input necesario

Los datos del operador ya están recogidos en la sub-fase anterior [`01-inputs.md`](./01-inputs.md). Bloqueantes para arrancar la investigación: **servicio principal + ciudad**. Si el operador declaró ciudades adicionales para comparar el sector, repite la búsqueda en cada una.

---

## Procedimiento

### Paso previo — Comprobar acceso al navegador

> **Nota:** este check ya se hizo en Fase 1 (Test de Herramientas). Si Fase 1 declaró `✗ Navegador real`, entrega directamente el prompt de plan B al operador.

- **Si tienes acceso a navegador real** (Chrome MCP, computer-use o similar): di exactamente esto → *"✅ Tengo acceso al navegador. Voy a buscar datos reales en Google Maps."* y continúa con el método de búsqueda manual.
- **Si no tienes acceso** (declarado ya en Fase 1): di exactamente esto → *"⚠ No tengo acceso al navegador. Para que la investigación sea real, necesito que hagas tú la búsqueda y me pegues los resultados. Aquí tienes las instrucciones:"* y entrega el prompt de plan B abajo.

**Prompt de plan B para el operador** (entrégalo cuando no tengas acceso al navegador):

```
Busca en Google Maps: "[servicio principal] [ciudad]"

Para cada uno de los 5 primeros resultados anota:
- Nombre del negocio
- URL de su web
- Puntuación (★) y número de reseñas
- Categoría principal que aparece en su perfil GBP
- Trust signals visibles en su web (años de experiencia, certificaciones, badges, garantías)
- TODOS los servicios que ofrece (revisa su menú, páginas de servicios y footer)

Repite la búsqueda para cada ciudad adicional si las hay.
Pégame los resultados y continúo con el informe.
```

---

### Método (cuando tienes navegador)

Búsqueda manual en el navegador — abre Google Maps en maps.google.com y busca directamente. No uses APIs ni scraping.

1. Buscar `[servicio principal] [ciudad]` en Google Maps.
2. Identificar los **5 primeros perfiles** del Local Pack (descartar anuncios `Patrocinado`).
3. Para cada competidor, **entra en su web** y extrae **todos los servicios** que ofrece — no solo los del perfil GBP. Lee su menú, sus páginas de servicios, su footer. El objetivo es tener la lista completa.
4. También extrae por competidor:
   - Nombre y URL
   - Categoría GBP principal y secundarias
   - Trust signals visibles (años experiencia, reseñas, certificaciones, badges)
5. Si el operador dio ciudades adicionales, repetir para cada ciudad.
6. Producir el **Informe de Competidores** según el formato exacto de abajo.

---

## Output: Informe de Competidores

```markdown
## Informe de Competidores — [Servicio] en [Ciudad(es)]

### Top 5 Local Pack

| # | Nombre | Web | ★ | Reseñas | Trust signals |
|---|--------|-----|----|---------|---------------|
| 1 | ...    | ... | .. | ...     | ...           |
| 2 | ...    | ... | .. | ...     | ...           |
| 3 | ...    | ... | .. | ...     | ...           |
| 4 | ...    | ... | .. | ...     | ...           |
| 5 | ...    | ... | .. | ...     | ...           |

### Matriz de servicios

| Servicio | Comp 1 | Comp 2 | Comp 3 | Comp 4 | Comp 5 | Total |
|----------|:------:|:------:|:------:|:------:|:------:|:-----:|
| [serv A] |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |  5/5  |
| [serv B] |   ✓    |   ✓    |        |   ✓    |        |  3/5  |
| [serv C] |        |   ✓    |        |        |   ✓    |  2/5  |
| [serv D] |   ✓    |        |        |        |        |  1/5  |

_Ordenada de más a menos frecuente. Sirve para decidir qué servicios incluir._

### Categoría GBP más frecuente
[categoría] (aparece en X de 5)

### Webs de referencia recomendadas (por calidad visual)
1. [URL] — motivo
2. [URL] — motivo

### Preguntas para el operador
1. ¿Qué servicios quieres incluir? (recomendación: los que aparecen en 3+/5)
2. ¿Qué web te gusta como referencia de diseño?
```

---

## ⛔ Parada blocking — qué espera la IA del operador

Esta es la parada blocking oficial de **Fase 2** (definida en el [README de Fase 2](./README.md)).

Después de presentar el informe, espera dos confirmaciones explícitas del operador:

1. **Servicios elegidos** — qué servicios incluir en la web (recomendación: los que aparecen en 3+/5 del Local Pack).
2. **Web de referencia de diseño** — una URL (de las propuestas en el informe o cualquier otra).

Sin las dos confirmaciones, **no avances a Fase 3**. Si el operador no responde, pregunta de nuevo.

---

## Handoff a Fase 3

Con las dos confirmaciones del operador, arranca Fase 3 (Construcción Web I). Los datos del informe pasan como `confirmed` a la sub-fase 1 (Fundamentos):

| Dato confirmado | Dónde entra en Fase 3 |
|-----------------|----------------------|
| Servicios elegidos | sub-fase `01-fundamentos.md` — output 1.9 (Core Services) |
| Categoría GBP más frecuente | sub-fase `01-fundamentos.md` — output 1.5 (Primary Category) |
| Categorías secundarias de competidores | sub-fase `01-fundamentos.md` — output 1.6 (Additional Categories) |
| Trust signals del sector | sub-fase `01-fundamentos.md` — output 1.14 |
| Web de referencia de diseño | **Fase 4** (Construcción II — Diseño) — para extraer `theme.css` |

El agente que ejecuta Fase 3 **no repite la investigación de Local Pack** — los toma del informe y los marca como `confirmed` directamente.
