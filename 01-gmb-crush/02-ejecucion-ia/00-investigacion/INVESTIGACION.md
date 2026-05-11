# Investigación de Competidores — Paso 4 del flujo

## Objetivo

Antes de construir la web, la IA investiga el Local Pack del sector y entrega al operador un informe visual con los competidores. El operador decide:

1. **Qué servicios poner en la web**
2. **Qué web usar como referencia de diseño**

Con esas decisiones confirmadas, se pasa a la forma de construcción elegida (ej: GMB Crush).

---

## Input necesario

Los datos del operador vienen de [`01-gmb-crush/01-input-humano.md`](../../01-input-humano.md). Esta fase asume que ya están recogidos en bloque, **no los pidas aquí de nuevo**.

Bloqueantes para arrancar la investigación: servicio principal + ciudad. Si el operador declaró ciudades adicionales para comparar el sector, repite la búsqueda en cada una.

---

## Lo que la IA hace

### Paso previo — Comprobar acceso al navegador

Antes de empezar, comprueba si puedes abrir Google Maps e informa al operador:

- **Si tienes acceso a navegador real** (Chrome MCP, computer-use o similar): di exactamente esto → *"✅ Tengo acceso al navegador. Voy a buscar datos reales en Google Maps."* y continúa.
- **Si no tienes acceso**: di exactamente esto → *"⚠ No tengo acceso al navegador. Para que la investigación sea real, necesito que hagas tú la búsqueda y me pegues los resultados. Aquí tienes las instrucciones:"* y a continuación entrega al operador el prompt de investigación (ver más abajo). Espera a que el operador te pegue los resultados antes de continuar.

**Prompt de investigación para el operador** (entrégalo cuando no tengas acceso al navegador):

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

**Método:** Búsqueda manual en el navegador — abre Google Maps en maps.google.com y busca directamente. No uses APIs ni scraping.

1. Buscar `[servicio principal] [ciudad]` en Google Maps.
2. Identificar los **5 primeros perfiles** del Local Pack.
3. Para cada competidor, **entra en su web** y extrae **todos los servicios** que ofrece — no solo los del perfil GBP. Lee su menú, sus páginas de servicios, su footer. El objetivo es tener la lista completa.
4. También extrae por competidor:
   - Nombre y URL
   - Categoría GBP principal y secundarias
   - Trust signals visibles (años experiencia, reseñas, certificaciones, badges)
5. Si el operador dio ciudades adicionales, repetir para cada ciudad.
6. Producir el **Informe de Competidores**.

---

## Output: Informe de Competidores

```markdown
## Informe de Competidores — [Servicio] en [Ciudad(es)]

### Top 5 Local Pack

| # | Nombre | Web | ★ | Reseñas | Trust signals |
|---|--------|-----|----|---------|---------------|---------------|
| 1 | ...    | ... | .. | ...     | ...           | ...           |
| 2 | ...    | ... | .. | ...     | ...           | ...           |
| 3 | ...    | ... | .. | ...     | ...           | ...           |
| 4 | ...    | ... | .. | ...     | ...           | ...           |
| 5 | ...    | ... | .. | ...     | ...           | ...           |

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

## Lo que el operador decide

Después de ver el informe, el operador responde:

1. **Servicios elegidos:** [lista]
2. **Web de referencia:** [URL]

---

## Handoff a GMB Crush

Con las confirmaciones del operador, arranca `01-gmb-crush/SISTEMA.md` pasando estos datos como `confirmed`:

| Dato confirmado | Dónde entra en GMB Crush |
|-----------------|--------------------------|
| Servicios elegidos | Fase 1 — output 1.9 (Core Services) |
| Categoría GBP más frecuente | Fase 1 — output 1.5 (Primary Category) |
| Categorías secundarias de competidores | Fase 1 — output 1.6 (Additional Categories) |
| Trust signals del sector | Fase 1 — output 1.14 |
| Web de referencia de diseño | Fase 6 — Paso 0 |

El agente que ejecuta GMB Crush **no repite la investigación de Local Pack** para estos datos — los toma del informe y los marca como `confirmed` directamente.

---

## ⛔ PARA AQUÍ

Presenta el informe al operador y espera su respuesta. No arranques el sistema de construcción hasta tener confirmación explícita de:

1. **Servicios elegidos** — el operador te dice cuáles incluir
2. **Web de referencia de diseño** — el operador te indica una URL

Sin esas dos confirmaciones no avances. Si el operador no responde, pregunta de nuevo.
