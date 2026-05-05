# GMB Crush — Sistema de Ejecución

Sistema para que una IA construya webs locales SEO + GBP siguiendo la metodología GMB Crush. Le das un archivo y un preflight, y produce una web completa en Cloudflare Pages.

---

## Cómo usar esto

### Paso 1 — Rellena el preflight

Abre `PREFLIGHT.md` y rellena los datos del cliente. Con solo "qué hace" y "dónde está" ya funciona. Cuantos más datos, mejor resultado.

### Paso 2 — Dáselo a la IA

Copia el contenido de `SISTEMA.md` y pégalo en la IA que uses (Claude, GPT, Manus, o cualquier otra). Debajo, pega el preflight rellenado.

Ejemplo de lo que pegas:

```
[Contenido de SISTEMA.md]

---

Preflight:
- Nombre: Fontaneros Express Barcelona
- Qué hace: fontanería urgente 24h
- Dirección: Carrer de Balmes 45, 08007 Barcelona
- Estado GBP: Not Created
- Ciudades LP: Barcelona
```

### Paso 3 — La IA ejecuta

La IA hará esto en orden:
1. Te muestra la arquitectura (URLs, servicios, fórmula). Si no dices nada, avanza.
2. Redacta el contenido de todas las páginas.
3. Construye el proyecto Astro.
4. Despliega a Cloudflare (si le diste tokens) o te entrega el proyecto listo.
5. Te da la lista de pendientes (datos que faltan o se infirieron).

### Paso 4 — Tú cierras pendientes

La IA te entrega una lista de `⚠ Pendientes`. Tú le das los datos reales (teléfono, email, fotos, etc.) y la IA actualiza la web.

---

## Archivos del repo

| Archivo | Qué es | Cuándo se usa |
|---------|--------|---------------|
| `SISTEMA.md` | Las instrucciones para la IA | Siempre — es lo que le pegas |
| `PREFLIGHT.md` | Template de datos del cliente | Lo rellenas por cada cliente nuevo |
| `referencias/page-type-specs.md` | Specs de contenido por tipo de página | Solo si la IA necesita más detalle |
| `referencias/ejemplo-cerrajeros.md` | Ejemplo de arquitectura completa | Solo si la IA necesita ver un caso real |

---

## Principios del sistema

- **Nunca se para.** Si falta un dato, infiere o marca placeholder y sigue.
- **Web-first.** La web sale con lo que hay. El GBP se crea después.
- **No inventa datos del negocio.** Teléfono, email, dirección, reseñas = placeholder visible, nunca falso.
- **Un archivo = un sistema.** No necesitas leer 20 documentos para ejecutar.
