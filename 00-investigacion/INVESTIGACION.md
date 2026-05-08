# Fase de Inicio — Investigación de Competidores

## Objetivo

Antes de construir la web, la IA investiga el Local Pack del sector y entrega al operador un informe visual con los competidores. El operador decide:

1. **Qué servicios poner en la web**
2. **Qué web usar como referencia de diseño**

Con esas decisiones confirmadas, se pasa a la forma de construcción elegida (ej: GMB Crush).

---

## Input necesario

Antes de buscar nada, pregunta al operador:

1. **¿Cuál es el servicio principal del negocio?**
2. **¿Cuál es la ciudad principal?**
3. **¿Quieres analizar ciudades adicionales?** (si sí, lista cuáles)

No empieces la investigación hasta tener estas respuestas.

---

## Lo que la IA hace

**Método:** Búsqueda manual en el navegador — abre Google Maps en maps.google.com y busca directamente. No uses APIs ni scraping.

1. Buscar `[servicio principal] [ciudad]` en Google Maps.
2. Identificar los **5 primeros perfiles** del Local Pack.
3. Para cada competidor, **entra en su web** y extrae **todos los servicios** que ofrece — no solo los del perfil GBP. Lee su menú, sus páginas de servicios, su footer. El objetivo es tener la lista completa.
4. También extrae por competidor:
   - Nombre y URL
   - Categoría GBP principal y secundarias
   - Trust signals visibles (años experiencia, reseñas, certificaciones, badges)
   - CTA principal
5. Si el operador dio ciudades adicionales, repetir para cada ciudad.
6. Producir el **Informe de Competidores**.

---

## Output: Informe de Competidores

```markdown
## Informe de Competidores — [Servicio] en [Ciudad(es)]

### Top 5 Local Pack

| # | Nombre | Web | ★ | Reseñas | Trust signals | CTA principal |
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
| Trust signals del sector | Fase 1 — output 1.14 |
| CTA dominante en el sector | Fase 2 — output 1.13 |
| Web de referencia de diseño | Fase 5 — Paso 0 |

El agente que ejecuta GMB Crush **no repite la investigación de Local Pack** para estos datos — los toma del informe y los marca como `confirmed` directamente.

---

## ⛔ PARA AQUÍ

Presenta el informe al operador y espera su respuesta. No arranques el sistema de construcción hasta tener confirmación explícita de:

1. **Servicios elegidos** — el operador te dice cuáles incluir
2. **Web de referencia de diseño** — el operador te indica una URL

Sin esas dos confirmaciones no avances. Si el operador no responde, pregunta de nuevo.
