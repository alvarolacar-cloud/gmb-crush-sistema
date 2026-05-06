# Sistemas Creación Webs

> **Si eres una IA y te han dado este repo:** lee `AGENTS.md` primero.

Repo con sistemas para crear webs locales SEO. Tiene tres capas:

1. **Investigación** — Análisis de competidores en Google Maps (común a todos los sistemas)
2. **Sistemas** — Métodos de construcción (cada uno con sus reglas y plantillas)
3. **Ejecuciones** — Resultados de proyectos reales

---

## Estructura

```
├── 00-investigacion/
│   └── INVESTIGACION.md              ← Fase 0: investigar competidores (común a todos)
├── 01-gmb-crush/                     ← Sistema GMB Crush (SEO local + GBP)
│   ├── SISTEMA.md                    ← Instrucciones de ejecución (8 fases)
│   ├── PREFLIGHT.md                  ← Template de datos del cliente
│   ├── plantilla-astro/              ← Proyecto Astro parametrizable
│   └── referencias/                  ← Test doctrinal, specs, ejemplo y doctrina
└── ejecuciones/                      ← Resultados de ejecuciones reales
```

---

## Flujo

1. **Investigación:** La IA investiga el Local Pack y te muestra un informe de competidores.
2. **Tú decides:** Qué servicios poner + qué web usar como referencia de diseño.
3. **Ejecución:** La IA ejecuta el sistema elegido con tus decisiones confirmadas.
4. **Resultado:** Web en Cloudflare + tabla de pendientes.

---

## Sistemas disponibles

| Sistema | Qué es | Cuándo usarla |
|---------|--------|---------------|
| `01-gmb-crush` | SEO local + GBP. 8 fases, plantilla Astro, test doctrinal. | Negocios locales que quieren posicionar en Google Maps + web. |
