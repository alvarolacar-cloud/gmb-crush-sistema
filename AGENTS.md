# AGENTS.md — Instrucciones para agentes IA

## Qué es este repo
Sistema para crear webs locales optimizadas para Google Maps y posicionamiento local.
Contiene múltiples metodologías de construcción. Todas comparten el mismo punto de partida: investigación de competencia.

## Estructura — dos repos separados

```
sistemas-creacion-webs/              ← ESTE repo — solo sistema, nunca datos de clientes
├── AGENTS.md                        ← estás aquí — léelo primero
├── README.md                        ← resumen para humanos
├── 00-investigacion/                ← PASO 0: común a todos los sistemas
│   └── INVESTIGACION.md
└── 01-gmb-crush/                    ← Sistema GMB Crush (web local + Google Maps)
    ├── SISTEMA.md                   ← convenciones + arranque
    ├── fases/                       ← un archivo por fase — léelo antes de ejecutar esa fase
    │   ├── fase-1-fundamentos.md
    │   ├── fase-2-contenido.md
    │   ├── fase-3-docs-canonicos.md
    │   ├── fase-3b-redaccion.md
    │   ├── fase-4-test-doctrinal.md
    │   ├── fase-5-diseno.md
    │   ├── fase-6-build.md
    │   ├── fase-7-deploy.md
    │   └── fase-8-consolidacion.md
    ├── referencias/                 ← doctrina, ejemplos, test — solo consulta
    └── plantilla-astro/             ← template base — se copia por cliente, nunca se modifica aquí

ejecuciones-webs/                   ← repo SEPARADO — un sistema por subcarpeta
│   GitHub: https://github.com/alvarolacar-cloud/ejecuciones-webs
└── [nombre-negocio-slug]/          ← ej: reformaban-madrid/, fontaneria-ramos/
    ├── outputs.json                 ← todos los outputs del cliente
    └── web/                        ← copia de plantilla-astro con datos reales
```

> Cuando se añadan nuevos sistemas aparecerán como `02-nombre-sistema/`, `03-nombre-sistema/`, etc.

## Flujo obligatorio — síguelo en este orden

### PASO 0 — Investigación — común a todos los sistemas
> ⚠ Esta fase NO está en `fases/` — vive en `00-investigacion/INVESTIGACION.md`
1. Lee `00-investigacion/INVESTIGACION.md` — ahí está el método exacto de búsqueda
2. Busca en Google Maps los 5 primeros resultados del Local Pack para [servicio] + [ciudad] siguiendo las instrucciones de ese archivo
3. Presenta tabla comparativa de competidores al operador
4. **Para aquí** — espera que el operador confirme servicios y elija sistema antes de continuar

### PASO 1 — Ejecución GMB Crush (01-gmb-crush/)
1. Clona el repo de ejecuciones: `https://github.com/alvarolacar-cloud/ejecuciones-webs`
2. Crea la carpeta del cliente: `gmb-crush-ejecuciones/[slug-cliente]/` con `outputs.json` vacío y `web/` (copia de `plantilla-astro/`)
3. Lee `01-gmb-crush/SISTEMA.md` completo — convenciones y tabla de fases
4. **⚠ OBLIGATORIO: antes de ejecutar cada fase, lee su archivo en `fases/` completo** — nunca ejecutes una fase de memoria
5. En Fase 4 ejecuta el Test Doctrinal completo, presenta resultados al operador y **para aquí** — espera aprobación antes de continuar a Fase 5

### PASO 2 — Guardar resultados
Los outputs de cada fase van a `gmb-crush-ejecuciones/[slug]/outputs.json`. El build va a `gmb-crush-ejecuciones/[slug]/web/`. Ya creaste esta estructura en PASO 1.

**Nunca crees carpetas de cliente dentro del repo `sistemas-creacion-webs`.** Los datos de clientes van siempre en `gmb-crush-ejecuciones/`.

## lessons.md — Memoria de errores por proyecto

Cada ejecución tiene un archivo `gmb-crush-ejecuciones/[slug]/lessons.md`.

**Al iniciar una sesión sobre un proyecto:**
Lee `gmb-crush-ejecuciones/[slug]/lessons.md` si existe. Aplica cada lección antes de ejecutar nada.

**Después de cualquier corrección del operador:**
Documenta el patrón en ese archivo inmediatamente. Formato:

```markdown
## [fecha] — [título corto del error]
**Qué pasé:** descripción breve de lo que hice mal.
**Por qué:** causa raíz.
**Regla:** lo que hago diferente a partir de ahora.
```

Si el archivo no existe, créalo en el momento de la primera corrección.

---

## Propagación de cambios — obligatorio tras cualquier modificación

Cada vez que modifiques un archivo, antes de dar el trabajo por terminado:

1. Busca en todo el repo referencias al archivo modificado y a los términos clave que cambiaste (nombres de rutas, números de output, nombres de secciones, conceptos renombrados).
2. Por cada referencia encontrada, analiza si necesita actualizarse por coherencia con el cambio que acabas de hacer.
3. Si necesita actualizarse — actualízala sin preguntar.
4. Repite hasta que no quede ninguna referencia desactualizada.

**Ejemplos de qué buscar:**
- Cambiaste una ruta (`ejecuciones/` → `gmb-crush-ejecuciones/`) → busca la ruta antigua en todos los `.md` y actualízala
- Renombraste un output (`16.3` → `16.7`) → busca el número antiguo y actualiza todas las menciones
- Moviste una sección → busca referencias a ese nombre de sección en otros archivos
- Cambiaste el nombre de un archivo → busca ese nombre en todos los archivos que puedan enlazarlo

**El operador no debería tener que pedirte que actualices las referencias — es tu responsabilidad hacerlo como parte del mismo cambio.**

---

## Reglas que nunca puedes romper
- Las LCAs (barrios, distritos, zonas) nunca generan URLs sin aprobación explícita del operador. **Aprobación explícita = el operador lo escribe en el chat**. Una aprobación implícita, sugerida o inferida no cuenta.
- No inventes teléfono, dirección, reseñas, certificaciones ni fotos
- Si el Test Doctrinal falla, no continúes a Fase 5 aunque el operador lo pida — explica qué falla primero
- Todos los datos inciertos se marcan como ⚠ inferido o ⚠ placeholder, nunca se asumen como confirmados

## Antes de hacer cualquier commit
Antes de ejecutar `git commit`, haz siempre estos pasos en orden:
1. Lee `README.md` completo — verifica que su contenido refleja el estado actual del repo
2. Lee `AGENTS.md` completo — verifica que las rutas y el flujo siguen siendo correctos
3. Si algo está desactualizado, corrígelo primero
4. Incluye los cambios de docs en el mismo commit que el resto de cambios

## Inputs mínimos para arrancar
- Nombre del negocio
- Servicio principal
- Dirección completa (calle, número, CP, ciudad) — si no la tiene, al menos la ciudad
- Teléfono

Con eso puedes ejecutar el Paso 0. El resto se completa durante el flujo.
