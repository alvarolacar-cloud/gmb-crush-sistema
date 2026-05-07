# plantilla-astro — Template GMB Crush

Proyecto Astro 5 + Tailwind v3 parametrizable. Consume `outputs.json` para generar el sitio completo sin tocar el código.

## Cómo funciona

1. La IA completa la ejecución GMB Crush y genera `outputs.json` con todos los datos del negocio
2. Se copia `outputs.json` a la raíz de este proyecto (o se apunta con la variable `CLUSTER_PATH`)
3. Se ejecuta el build → Astro genera todas las páginas estáticas
4. Se despliega en Cloudflare Pages

## Estructura

```
plantilla-astro/
├── outputs.example.json     ← ejemplo de outputs.json completo (aerotermia)
├── astro.config.mjs         ← config del sitio (actualizar `site` con el dominio real)
├── tailwind.config.js       ← design tokens (colores y fuentes vienen de outputs.json)
├── src/
│   ├── lib/                 ← utilidades TypeScript
│   │   ├── cluster.ts       ← lee y valida outputs.json
│   │   ├── types.ts         ← tipos del sistema (Output, Status, NAP, etc.)
│   │   ├── constants.ts     ← reglas del sistema (word counts, blacklist, etc.)
│   │   ├── calculate-urls.ts← fórmula maestra de páginas
│   │   ├── schemas.ts       ← builders de Schema.org por tipo de página
│   │   └── slugify.ts       ← generador de slugs kebab-case
│   ├── components/          ← componentes reutilizables (Header, Footer, Hero, etc.)
│   ├── layouts/             ← BaseLayout.astro (SEO, schema JSON-LD, meta)
│   └── pages/               ← rutas dinámicas del sitio
│       ├── index.astro      ← Homepage
│       ├── contacto.astro   ← Página de contacto
│       ├── [city]/          ← GeoHub y GeoArticles
│       └── [category]/      ← Service Overviews y LBS
└── styles/
    └── global.css
```

## Campos obligatorios en outputs.json

Estos campos deben estar en estado `confirmed` o `validated` antes del build:

| Campo | Descripción |
|-------|-------------|
| `business_name` | Nombre del negocio |
| `main_city` | Ciudad principal de operación |
| `primary_category` | Categoría GBP principal |
| `core_services` | Lista de servicios (mínimo 3) |
| `domain` | Dominio del sitio (con https://) |
| `nap.phone` | Teléfono (puede ser `[TELÉFONO]` si pendiente) |

Consulta `outputs.example.json` para ver un ejemplo completo con todos los campos.

## Comandos

```bash
pnpm install     # instalar dependencias
pnpm dev         # servidor de desarrollo
pnpm build       # generar sitio estático en dist/
pnpm deploy      # desplegar en Cloudflare Pages
```

## Variables de entorno

| Variable | Uso |
|----------|-----|
| `CLUSTER_PATH` | Ruta alternativa a outputs.json (por defecto busca en raíz del proyecto) |
