# AGENTS.md — Guía de arranque para agentes IA

> **Variante doctrinal:** este AGENTS describe la versión de **6 fases lineales** del sistema GMB Crush (en lugar de los 6 pasos macro + 9 fases internas de la versión anterior en `main`).

## Qué construimos

Una web local SEO para un negocio (servicio + ciudad), desplegada en Cloudflare Pages, optimizada para Google Maps y búsqueda orgánica, más un Google Business Profile listo. Mismo input + mismo repo = mismo output reproducible.

---

## Las 6 fases

Secuencia completa del flujo. La IA ejecuta cada fase en orden, abre primero el archivo de la fase (o su README si tiene sub-archivos), aplica el gate de salida y avanza según el tipo de parada.

| # | Fase | Tipo de parada | Archivo de entrada |
|---|------|:---:|--------------------|
| 1 | **Test de Herramientas** | 🛑 blocking | `01-gmb-crush/02-ejecucion-ia/01-construccion-web/fases/fase-1-test-herramientas.md` |
| 2 | **Inputs + Investigación de mercado** | 🛑 blocking | `01-gmb-crush/02-ejecucion-ia/01-construccion-web/fases/fase-2-inputs-investigacion/README.md` |
| 3 | **Construcción Web I** (arquitectura → test doctrinal) | ⚙ gate ligero | `01-gmb-crush/02-ejecucion-ia/01-construccion-web/fases/fase-3-construccion-1/README.md` |
| 4 | **Construcción Web II** (diseño → theme.css) | ⚙ gate ligero | `01-gmb-crush/02-ejecucion-ia/01-construccion-web/fases/fase-4-construccion-2.md` |
| 5 | **Construcción Web III** (build + deploy) | ⚙ gate ligero | `01-gmb-crush/02-ejecucion-ia/01-construccion-web/fases/fase-5-construccion-3/README.md` |
| 6 | **QA Final + Datos Finales** | 🛑 blocking | `01-gmb-crush/02-ejecucion-ia/01-construccion-web/fases/fase-6-qa-datos-finales.md` |

**3 paradas blocking** (Fase 1, 2, 6) — la IA espera al operador.
**3 gates ligeros** (Fase 3, 4, 5) — la IA muestra resultados al final pero avanza automáticamente salvo fallo técnico (test doctrinal FAIL, build FAIL tras 3 intentos, capacidades faltantes).

**⚠ Antes de ejecutar cada fase, abre y lee su archivo completo** (o el README + sub-archivos si tiene carpeta). Nunca ejecutes una fase de memoria.

---

## Inputs del operador

Los datos que la IA pide al operador viven en una fuente única: [`01-gmb-crush/01-input-humano.md`](01-gmb-crush/01-input-humano.md).

- **§Iniciales** se piden en Fase 2 (sub-fase 1).
- **§Finales** se piden en Fase 6.

No pidas inputs en otro sitio. Si encuentras una fase pidiendo datos que no están en `01-input-humano.md`, es un bug — repórtalo.

---

## Estructura del repo

```
sistemas-creacion-webs/                            ← ESTE repo — solo sistema, nunca datos de clientes
├── AGENTS.md                                      ← estás aquí
├── README.md                                      ← resumen para humanos
├── scripts/check-coherence.sh                     ← verificador de coherencia
└── 01-gmb-crush/
    ├── SISTEMA.md                                 ← convenciones GMB Crush + tabla de las 6 fases
    ├── 01-input-humano.md                         ← inputs (§Iniciales + §Finales)
    └── 02-ejecucion-ia/
        └── 01-construccion-web/
            ├── fases/
            │   ├── fase-1-test-herramientas.md
            │   ├── fase-2-inputs-investigacion/   (carpeta con README + 2 sub-archivos)
            │   ├── fase-3-construccion-1/         (carpeta con README + 5 sub-archivos)
            │   ├── fase-4-construccion-2.md
            │   ├── fase-5-construccion-3/         (carpeta con README + 2 sub-archivos)
            │   └── fase-6-qa-datos-finales.md
            ├── referencias/                       ← doctrina, ejemplos, test (consulta)
            └── plantilla-astro/                   ← template Astro (se copia por cliente)

ejecuciones-webs/                                  ← repo SEPARADO — datos de clientes
└── gmb-crush-ejecuciones/[slug]/
    ├── outputs.json                               ← outputs del cluster
    ├── theme.css                                  ← CSS extraído de la web de referencia (Fase 4)
    ├── web/                                       ← copia de plantilla-astro renderizada
    ├── lessons.md                                 ← memoria de errores específicos del proyecto
    └── INFORME-FINAL.md                           ← entregable Fase 6 (post-deploy)
```

**Nunca crees carpetas de cliente dentro del repo del sistema.** Datos de clientes → siempre en `ejecuciones-webs/`.

---

## Reglas inviolables

1. **La IA no infiere ni fabrica.** O verifica con la fuente correcta, o para y pide al operador. Único hueco aceptado: marcadores visibles para datos que el operador no aportó (`[TELÉFONO]`, `[EMAIL]`, `[DIRECCIÓN]`, `⚠ placeholder`). Nunca un valor real fabricado.
2. **No inventes** teléfono, email, dirección, años de experiencia, certificaciones, reseñas, fotos, valores de schema (rating, sameAs).
3. **LCAs nunca generan URLs sin aprobación explícita del operador** (escrita en el chat). Implícita o sugerida no cuenta.
4. **Si el Test Doctrinal de Fase 3 falla, no avances a Fase 4** aunque el operador lo pida. Corrige y reejecuta hasta PASS.
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
