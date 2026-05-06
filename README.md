# Sistemas Creación Webs

> **Si eres una IA y te han dado este repo:** lee `inicio/INVESTIGACION.md` primero. Después, el operador te indicará qué forma de construcción usar.

Repo con sistemas para crear webs locales SEO. Tiene dos capas:

1. **Inicio** — Investigación de competidores (común a todas las formas)
2. **Formas** — Métodos de construcción (cada uno con sus reglas y plantillas)

---

## Estructura

```
├── inicio/                           ← Fase 0: investigar competidores
│   └── INVESTIGACION.md
├── formas/
│   └── gmb-crush/                    ← Forma GMB Crush (SEO local + GBP)
│       ├── SISTEMA.md                ← Instrucciones de ejecución (8 fases)
│       ├── PREFLIGHT.md              ← Template de datos del cliente
│       ├── ARQUITECTURA-SISTEMA.md   ← Decisiones de diseño del sistema
│       ├── plantilla-astro/          ← Proyecto Astro parametrizable
│       ├── referencias/              ← Test doctrinal, specs, ejemplo
│       └── documentacion/            ← Doctrina de referencia (no leer salvo petición)
└── ejecuciones/                      ← Resultados de ejecuciones reales
```

---

## Flujo

1. **Inicio:** La IA investiga el Local Pack y te muestra un informe de competidores.
2. **Tú decides:** Qué servicios poner + qué web usar como referencia de diseño.
3. **Ejecución:** La IA ejecuta la forma elegida (ej: GMB Crush) con tus decisiones confirmadas.
4. **Resultado:** Web en Cloudflare + tabla de pendientes.

---

## Formas disponibles

| Forma | Qué es | Cuándo usarla |
|-------|--------|---------------|
| `gmb-crush` | SEO local + GBP. 8 fases, plantilla Astro, test doctrinal. | Negocios locales que quieren posicionar en Google Maps + web. |
