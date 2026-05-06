# AGENTS.md — Instrucciones para agentes IA

## Qué es este repo
Sistema para crear webs locales optimizadas para Google Maps y posicionamiento local.
Contiene múltiples metodologías de construcción. Todas comparten el mismo punto de partida: investigación de competencia.

## Estructura del repo
```
sistemas-creacion-webs/
├── AGENTS.md                        ← estás aquí — léelo primero
├── README.md                        ← resumen para humanos
├── 00-investigacion/                ← PASO 0: común a todos los sistemas
│   └── INVESTIGACION.md
├── 01-gmb-crush/                    ← Sistema GMB Crush (web local + Google Maps)
│   ├── SISTEMA.md                   ← especificación completa (8 fases)
│   ├── PREFLIGHT.md                 ← datos del cliente
│   ├── referencias/                 ← doctrina, ejemplos, test — solo consulta
│   └── plantilla-astro/             ← template listo para desplegar
└── ejecuciones/                     ← outputs de proyectos reales
    └── [nombre-negocio-slug]/
```

> Cuando se añadan nuevos sistemas aparecerán como `02-nombre-sistema/`, `03-nombre-sistema/`, etc.

## Flujo obligatorio — síguelo en este orden

### PASO 0 — Investigación (00-investigacion/) — común a todos los sistemas
1. Lee `00-investigacion/INVESTIGACION.md`
2. Busca en Google Maps los 5 primeros resultados del Local Pack para [servicio] + [ciudad]
3. Presenta tabla comparativa de competidores al operador
4. **Para aquí** — espera que el operador confirme servicios y elija sistema antes de continuar

### PASO 1 — Ejecución GMB Crush (01-gmb-crush/)
1. Lee `01-gmb-crush/SISTEMA.md` completo antes de hacer nada
2. Rellena `01-gmb-crush/PREFLIGHT.md` con los datos del cliente
3. Ejecuta las 8 fases en orden estricto
4. En Fase 4 ejecuta el Test Doctrinal completo (17 puntos), presenta los resultados al operador y **para aquí** — espera aprobación antes de continuar al build

### PASO 2 — Guardar resultados (ejecuciones/)
Crea carpeta `ejecuciones/[nombre-negocio-slug]/` con todos los outputs generados.

## Antes de hacer cualquier commit
Antes de ejecutar `git commit`, haz siempre estos pasos en orden:
1. Lee `README.md` completo — verifica que su contenido refleja el estado actual del repo
2. Lee `AGENTS.md` completo — verifica que las rutas y el flujo siguen siendo correctos
3. Si algo está desactualizado, corrígelo primero
4. Incluye los cambios de docs en el mismo commit que el resto de cambios

## Reglas que nunca puedes romper
- Las LCAs (barrios, distritos, zonas) nunca generan URLs sin aprobación explícita del operador
- No inventes teléfono, dirección, reseñas, certificaciones ni fotos
- Si el Test Doctrinal falla, no continúes al build aunque el operador lo pida — explica qué falla primero
- Todos los datos inciertos se marcan como ⚠ inferido o ⚠ placeholder, nunca se asumen como confirmados

## Inputs mínimos para arrancar
- Nombre del negocio
- Servicio principal
- Ciudad principal

Con eso puedes ejecutar el Paso 0. El resto se completa durante el flujo.
