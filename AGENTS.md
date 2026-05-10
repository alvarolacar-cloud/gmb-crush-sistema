# AGENTS.md — Guía de arranque para agentes IA

## 1. Qué construimos

Una web local SEO para un negocio (servicio + ciudad), desplegada en Cloudflare Pages, optimizada para Google Maps y búsqueda orgánica, más un Google Business Profile listo. Mismo input + mismo repo = mismo output reproducible.

## 2. Qué pides al operador

Los datos que necesitas vienen de `INPUTS.md` (raíz del repo). Es la **única fuente** — no pidas datos en otro sitio.

**Bloqueantes para arrancar:** servicio principal + ciudad. Sin esos dos, paras y los pides. Todo lo demás se completa o queda como marcador visible (`[TELÉFONO]`, `[DIRECCIÓN]`).

## 3. Pre-flight de capacidades — antes de arrancar nada

Antes de pedir inputs al operador, **declaras qué herramientas tienes y a qué fase afecta cada una**. Formato exacto:

```
Capacidades disponibles para este proyecto:

✓/✗ Navegador real (Maps, web ref)   → Fase 0 (investigación), Fase 5 (diseño)
✓/✗ Screenshot capability             → Fase 5 (diseño)
✓/✗ CSS inspection (DevTools/JS eval) → Fase 5 (diseño)
✓/✗ Shell (bash/PowerShell)           → Fase 6, Fase 7
✓/✗ Git + gh CLI                      → Fase 7 (deploy)
✓/✗ pnpm                              → Fase 6, Fase 7

Resumen: [todo OK / falta X — plan B: el operador hace Y manualmente]
```

Si alguna capacidad falta, **ofreces plan B en el momento del pre-flight, no a mitad de fase**. Ejemplos:
- Sin navegador → operador busca en Maps manualmente y pega resultados (Fase 0).
- Sin screenshot/CSS inspection → operador toma screenshots de la web ref y los pega; o el diseño queda como pendiente (Fase 5).
- Sin tokens → build hasta `dist/`, deploy queda pendiente (Fase 7).

## 4. Los pasos

| # | Paso | Archivo de referencia | Para si... |
|---|------|----------------------|------------|
| 0 | Recoger inputs + pre-flight de capacidades | `INPUTS.md` (esta sección §3) | falta servicio o ciudad |
| 1 | Investigar competencia (Local Pack) | `00-investigacion/INVESTIGACION.md` | tras el informe — esperar confirmación de servicios + web ref |
| 2 | Ejecutar Fase 1 → Fase 4 GMB Crush | `01-gmb-crush/SISTEMA.md` | tras Fase 4 si el Test Doctrinal falla |
| 3 | Ejecutar Fase 5 (diseño) | `01-gmb-crush/fases/fase-5-diseno.md` | tras propuesta de diseño — esperar aprobación |
| 4 | Ejecutar Fase 6 → Fase 7 (build + deploy) | `01-gmb-crush/fases/fase-6-build.md`, `fase-7-deploy.md` | si faltan tokens (deploy queda pendiente) |
| 5 | Cerrar con Fase 8 (consolidación + informe final) | `01-gmb-crush/fases/fase-8-consolidacion.md` | hasta que todos los `⚠ placeholder` estén cerrados (bloquea creación GBP) |

**⚠ Antes de ejecutar cada fase, abre y lee su archivo completo.** Nunca ejecutes una fase de memoria. Los patrones exactos (URLs, fórmulas, schemas) viven en el archivo de fase, no en SISTEMA.md.

## 5. Estructura — dos repos separados

```
sistemas-creacion-webs/              ← ESTE repo — solo sistema, nunca datos de clientes
├── AGENTS.md                        ← estás aquí
├── INPUTS.md                        ← fuente única de inputs del operador
├── README.md                        ← resumen para humanos
├── 00-investigacion/INVESTIGACION.md
└── 01-gmb-crush/
    ├── SISTEMA.md                   ← convenciones GMB Crush
    ├── fases/                       ← fase-1...fase-8 (lee la que vas a ejecutar)
    ├── referencias/                 ← doctrina, ejemplos, test (consulta)
    └── plantilla-astro/             ← template Astro (se copia por cliente)

ejecuciones-webs/                    ← repo SEPARADO — datos de clientes
└── gmb-crush-ejecuciones/[slug]/
    ├── outputs.json                 ← outputs del cluster
    ├── web/                         ← copia de plantilla-astro renderizada
    ├── lessons.md                   ← memoria de errores específicos del proyecto
    └── INFORME-FINAL.md             ← entregable Fase 8 (post-deploy)
```

**Nunca crees carpetas de cliente dentro del repo del sistema.** Datos de clientes → siempre en `ejecuciones-webs/`.

## 6. Reglas inviolables

1. **La IA no infiere ni fabrica.** O verifica con la fuente correcta, o para y pide al operador. Único hueco aceptado: marcadores visibles para datos que el operador no aportó (`[TELÉFONO]`, `[EMAIL]`, `[DIRECCIÓN]`, `⚠ placeholder`). Nunca un valor real fabricado.
2. **No inventes** teléfono, email, dirección, años de experiencia, certificaciones, reseñas, fotos, valores de schema (rating, sameAs).
3. **LCAs nunca generan URLs sin aprobación explícita del operador** (escrita en el chat). Implícita o sugerida no cuenta.
4. **Si el Test Doctrinal de Fase 4 falla, no avances a Fase 5** aunque el operador lo pida. Explica qué falla primero.
5. **Datos inciertos = marcador visible** (`[TELÉFONO]`, `⚠ placeholder`). Nunca asumir como confirmado.

## 7. Protocolos operativos

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
