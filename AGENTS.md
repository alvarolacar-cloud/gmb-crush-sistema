# AGENTS.md — Guía de arranque para agentes IA

## Qué construimos

Una web local SEO para un negocio (servicio + ciudad), desplegada en Cloudflare Pages, optimizada para Google Maps y búsqueda orgánica, más un Google Business Profile listo. Mismo input + mismo repo = mismo output reproducible.

---

## Los 6 pasos

Esta es la secuencia completa que sigues con el operador. Cada paso tiene su propio archivo de referencia. No improvises orden — síguelo literal.

| # | Paso | Quién manda | Archivo de referencia | Para si... |
|---|------|-------------|----------------------|------------|
| 1 | **Explicación del sistema** | IA | esta sección §Paso 1 abajo | nunca paras — solo presentas |
| 2 | **Test de herramientas** | IA | esta sección §Paso 2 abajo | falta capacidad crítica sin plan B |
| 3 | **Inputs iniciales** | operador | `01-gmb-crush/01-input-humano.md` §Iniciales | falta servicio o ciudad |
| 4 | **Investigación de mercado** | IA + operador | `01-gmb-crush/02-ejecucion-ia/00-investigacion/INVESTIGACION.md` | tras informe — esperar confirmación de servicios + web ref |
| 5 | **Construcción de la web** (9 fases internas) | IA | `01-gmb-crush/SISTEMA.md` | dentro: paradas en Fase 5 (test) y Fase 6 (diseño) |
| 6 | **Inputs finales** | operador + IA | `01-gmb-crush/01-input-humano.md` §Finales | hasta cerrar todos los `⚠ placeholder` (bloquea creación GBP) |

---

### Paso 1 — Explicación del sistema

Al arrancar la sesión con un operador nuevo (o cuando vuelve a este repo después de tiempo), explica brevemente:

> Vamos a construir una web local SEO para tu negocio. El proceso son 6 pasos. Yo te voy a guiar.
>
> 1. Te explico el sistema (esto).
> 2. Hago un self-check de mis herramientas y te digo si necesito tu ayuda en alguna fase.
> 3. Te pido los datos del negocio (servicio, ciudad, dirección, etc.).
> 4. Investigo el sector en Google Maps y te entrego un informe; tú confirmas los servicios a incluir y una web de referencia de diseño.
> 5. Construyo la web (9 fases internas; te pararé solo dos veces: tras el test doctrinal y tras la propuesta de diseño).
> 6. Cuando la web está live, te paso un informe final con lo que falta para cerrar (teléfono, GBP, tokens, etc.) y rebuild/redeploy a medida que tú lo cierras.
>
> Resultado: web desplegada en Cloudflare + tabla de pendientes + GBP listo cuando todo esté cerrado.

Si el operador ya conoce el sistema, dilo en una línea y pasa a Paso 2.

---

### Paso 2 — Test de herramientas

Antes de pedir nada al operador, **declaras qué capacidades tienes en esta sesión y a qué paso/fase afecta cada una**. Formato exacto:

```
Capacidades disponibles para este proyecto:

✓/✗ Navegador real (Google Maps, web ref)  → Paso 4, Fase 6
✓/✗ Screenshot capability                   → Fase 6
✓/✗ CSS inspection (DevTools / JS eval)     → Fase 6
✓/✗ Shell (bash/PowerShell)                 → Fase 7, Fase 8
✓/✗ Git + gh CLI                            → Fase 8
✓/✗ pnpm                                    → Fase 7, Fase 8

Resumen: [todo OK / falta X — plan B: el operador hace Y manualmente]
```

Si alguna capacidad falta, **ofreces plan B en este momento, no a mitad de fase**. Ejemplos:

- Sin navegador → el operador busca en Maps manualmente y pega resultados (Paso 4).
- Sin screenshot/CSS inspection → el operador pasa capturas full-page de la web ref; o el diseño queda como `⚠ pendiente diseño` (Fase 6).
- Sin tokens GitHub/Cloudflare → build hasta `dist/`, deploy queda pendiente (Fase 8).

---

### Paso 3 — Inputs iniciales

Lee `01-gmb-crush/01-input-humano.md` §Iniciales y pásale al operador el mensaje exacto que vive ahí. **No pidas inputs en otro sitio.** Si falta servicio o ciudad, no se arranca.

---

### Paso 4 — Investigación de mercado

Lee `01-gmb-crush/02-ejecucion-ia/00-investigacion/INVESTIGACION.md` y ejecuta. Si no tienes navegador, plan B ya está documentado allí (entregar prompt al operador). Cuando entregues el informe, **paras** y esperas confirmación de:

1. Servicios elegidos por el operador.
2. URL de la web de referencia de diseño.

---

### Paso 5 — Construcción de la web

Lee `01-gmb-crush/SISTEMA.md`. Ejecuta las 9 fases en orden. Las paradas oficiales dentro de este paso son SOLO dos:

- **Fase 5 (Test Doctrinal)** — si falla, corriges y reejecutas. No avanzas a Fase 6 hasta pasar.
- **Fase 6 (Diseño)** — esperas aprobación del operador antes de escribir tokens en `outputs.json`.

La Fase 9 cierra el paso entregando `INFORME-FINAL.md` en `ejecuciones-webs/gmb-crush-ejecuciones/[slug]/`. Este informe es el input para el Paso 6.

---

### Paso 6 — Inputs finales

Lee `01-gmb-crush/01-input-humano.md` §Finales y pide al operador lo que aún falta para cerrar el cluster (teléfono real, email, tokens de deploy, dominio definitivo, confirmación GBP). El operador va resolviendo cada `⚠ placeholder` del INFORME-FINAL.md y por cada cierre:

1. Actualizas el contenido o schema afectado.
2. Rebuild (`pnpm build`).
3. Redeploy.
4. Eliminas la fila correspondiente de la tabla de pendientes.

Cuando la tabla esté vacía → creas el Google Business Profile y enlazas todo.

---

## Estructura del repo

```
sistemas-creacion-webs/                        ← ESTE repo — solo sistema, nunca datos de clientes
├── AGENTS.md                                  ← estás aquí
├── README.md                                  ← resumen para humanos
├── scripts/                                   ← check-coherence.sh y otros
└── 01-gmb-crush/
    ├── SISTEMA.md                             ← convenciones GMB Crush + tabla de las 9 fases
    ├── 01-input-humano.md                     ← inputs iniciales (§Paso 3) + finales (§Paso 6)
    └── 02-ejecucion-ia/
        ├── 00-investigacion/
        │   └── INVESTIGACION.md               ← Paso 4 del flujo
        └── 01-construccion-web/
            ├── fases/                         ← fase-1...fase-9 (lee la que vas a ejecutar)
            ├── referencias/                   ← doctrina, ejemplos, test (consulta)
            └── plantilla-astro/               ← template Astro (se copia por cliente)

ejecuciones-webs/                              ← repo SEPARADO — datos de clientes
└── gmb-crush-ejecuciones/[slug]/
    ├── outputs.json                           ← outputs del cluster
    ├── web/                                   ← copia de plantilla-astro renderizada
    ├── lessons.md                             ← memoria de errores específicos del proyecto
    └── INFORME-FINAL.md                       ← entregable Fase 9 (post-deploy)
```

**Nunca crees carpetas de cliente dentro del repo del sistema.** Datos de clientes → siempre en `ejecuciones-webs/`.

---

## Reglas inviolables

1. **La IA no infiere ni fabrica.** O verifica con la fuente correcta, o para y pide al operador. Único hueco aceptado: marcadores visibles para datos que el operador no aportó (`[TELÉFONO]`, `[EMAIL]`, `[DIRECCIÓN]`, `⚠ placeholder`). Nunca un valor real fabricado.
2. **No inventes** teléfono, email, dirección, años de experiencia, certificaciones, reseñas, fotos, valores de schema (rating, sameAs).
3. **LCAs nunca generan URLs sin aprobación explícita del operador** (escrita en el chat). Implícita o sugerida no cuenta.
4. **Si el Test Doctrinal de Fase 5 falla, no avances a Fase 6** aunque el operador lo pida. Explica qué falla primero.
5. **Datos inciertos = marcador visible** (`[TELÉFONO]`, `⚠ placeholder`). Nunca asumir como confirmado.

---

## Protocolos operativos

### lessons.md — memoria de errores por proyecto

Cada ejecución tiene `ejecuciones-webs/gmb-crush-ejecuciones/[slug]/lessons.md`.

- **Al iniciar sesión sobre un proyecto:** lee ese archivo si existe. Aplica cada lección antes de ejecutar.
- **Tras cualquier corrección del operador:** documenta el patrón con formato:
  ```markdown
  ## [fecha] — [título corto del error]
  **Qué pasé:** descripción breve.
  **Por qué:** causa raíz.
  **Regla:** lo que hago diferente a partir de ahora.
  ```
- Si no existe, créalo en la primera corrección.

### Propagación de cambios — obligatorio tras cualquier modificación

Cuando modifiques un archivo:
1. Busca en todo el repo referencias al archivo y a los términos clave que cambiaste.
2. Por cada referencia, evalúa si necesita actualizarse por coherencia.
3. Si sí, actualízala sin preguntar.
4. Repite hasta que no quede deuda.

**El operador no debería tener que pedirte que propagues. Es tu responsabilidad como parte del mismo cambio.**

### Antes de cualquier commit

1. Lee `README.md` y `AGENTS.md` completos — verifica que reflejan el estado real del repo.
2. Si algo está desactualizado, corrígelo en el mismo commit.
3. Ejecuta `sh scripts/check-coherence.sh` (lo hace el pre-commit hook si está activo).
