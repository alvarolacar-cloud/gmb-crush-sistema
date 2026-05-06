# Fase de Inicio — Investigación de Competidores

## Objetivo

Antes de construir la web, la IA investiga el Local Pack del sector y entrega al operador un informe visual con los competidores. El operador decide:

1. **Qué web usar como referencia de diseño**
2. **Qué servicios poner en la web**

Con esas decisiones confirmadas, se pasa a la forma de construcción elegida (ej: GMB Crush).

---

## Input necesario

| Campo | Obligatorio |
|-------|:-----------:|
| Qué hace el negocio (servicio principal) | Sí |
| Ciudad principal | Sí |
| Ciudades adicionales para comparar (opcional) | No |

---

## Lo que la IA hace

**Método:** Búsqueda manual en el navegador — abre Google Maps en maps.google.com y busca directamente. No uses APIs ni scraping.

1. Buscar `[servicio principal] [ciudad]` en Google Maps.
2. Identificar los **5 primeros perfiles** del Local Pack.
3. Para cada competidor, extraer:
   - Nombre del negocio
   - URL de su web
   - Categoría GBP principal
   - Categorías secundarias
   - Servicios listados en el perfil
   - Trust signals visibles (años, reseñas, badges)
   - CTA principal de su web
4. Si el operador dio ciudades adicionales, repetir para cada ciudad.
5. Producir el **Informe de Competidores**.

---

## Output: Informe de Competidores

```markdown
## Informe de Competidores — [Servicio] en [Ciudad]

### Top 5 Local Pack

| # | Nombre | Web | Categoría Principal | Servicios | Trust Signals | CTA |
|---|--------|-----|--------------------:|-----------|---------------|-----|
| 1 | ... | ... | ... | ... | ... | ... |
| 2 | ... | ... | ... | ... | ... | ... |
| 3 | ... | ... | ... | ... | ... | ... |
| 4 | ... | ... | ... | ... | ... | ... |
| 5 | ... | ... | ... | ... | ... | ... |

### Servicios más frecuentes (aparecen en 2+ competidores)
1. [servicio] (4 de 5)
2. [servicio] (3 de 5)
3. [servicio] (3 de 5)
4. [servicio] (2 de 5)
5. [servicio] (2 de 5)

### Categoría GBP más frecuente
[categoría] (aparece en X de 5)

### Webs de referencia recomendadas (por calidad visual)
1. [URL] — motivo
2. [URL] — motivo

### Preguntas para el operador
1. ¿Qué servicios quieres incluir? (recomendación: los top 4-5 de la tabla)
2. ¿Qué web te gusta como referencia de diseño?
```

---

## Lo que el operador decide

Después de ver el informe, el operador responde:

1. **Servicios elegidos:** [lista]
2. **Web de referencia:** [URL]

Esos datos entran como `confirmed` en el preflight de la forma de construcción elegida.

---

## Después de esta fase

El operador elige una forma de construcción (ej: `01-gmb-crush/`) y la IA ejecuta con los datos confirmados.

---

## ⛔ PARA AQUÍ

Presenta el informe al operador y espera su respuesta. No arranques el sistema de construcción hasta tener confirmación explícita de:

1. **Servicios elegidos** — el operador te dice cuáles incluir
2. **Web de referencia de diseño** — el operador te indica una URL

Sin esas dos confirmaciones no avances. Si el operador no responde, pregunta de nuevo.
