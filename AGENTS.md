# AGENTS.md — Instrucciones para agentes IA

## Qué es este repo
Sistema para crear webs locales optimizadas para Google Maps y posicionamiento local.
Flujo completo: investigación de competencia → arquitectura web → build → deploy.

## Flujo obligatorio — síguelo en este orden

### PASO 1 — Investigación (inicio/)
1. Lee `inicio/INVESTIGACION.md`
2. Busca en Google Maps los 5 primeros resultados del Local Pack para [servicio] + [ciudad]
3. Presenta tabla comparativa de competidores al operador
4. **Para aquí** — espera confirmación del operador antes de continuar

### PASO 2 — Ejecución GMB Crush (formas/gmb-crush/)
1. Lee `formas/gmb-crush/SISTEMA.md` completo antes de hacer nada
2. Rellena `formas/gmb-crush/PREFLIGHT.md` con los datos del cliente
3. Ejecuta las 8 fases en orden estricto
4. **Para en Fase 4** (Test Doctrinal) — espera aprobación antes de continuar al build

### PASO 3 — Guardar resultados (ejecuciones/)
Crea carpeta `ejecuciones/[nombre-negocio-slug]/` con todos los outputs generados.

## Reglas que nunca puedes romper
- Las LCAs (barrios, distritos, zonas) nunca generan URLs sin aprobación explícita del operador
- No inventes teléfono, dirección, reseñas, certificaciones ni fotos
- El Test Doctrinal (Fase 4) es un gate — si falla, para y notifica al operador antes de seguir
- Todos los datos inciertos se marcan como ⚠ inferido o ⚠ placeholder, nunca se asumen como confirmados

## Estructura del repo
\`\`\`
sistemas-creacion-webs/
├── AGENTS.md                  ← estás aquí — léelo primero
├── README.md                  ← resumen para humanos
├── inicio/
│   └── INVESTIGACION.md       ← Paso 1: investigación de competencia
├── formas/
│   └── gmb-crush/
│       ├── SISTEMA.md         ← especificación completa de ejecución (8 fases)
│       ├── PREFLIGHT.md       ← datos del cliente
│       ├── ARQUITECTURA-SISTEMA.md
│       ├── documentacion/     ← solo consulta humana, no leer salvo que el operador lo pida
│       ├── referencias/       ← ejemplos y test doctrinal
│       └── plantilla-astro/   ← template Astro 5 listo para desplegar
└── ejecuciones/               ← outputs de proyectos reales
\`\`\`

## Inputs mínimos para arrancar
- Nombre del negocio
- Servicio principal
- Ciudad principal

Con eso puedes ejecutar el Paso 1. El resto se completa durante el flujo.
