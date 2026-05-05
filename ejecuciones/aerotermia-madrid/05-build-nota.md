# Fase 5 — Build (No ejecutada)

El build no se ejecuta en esta prueba porque:

1. No hay dominio confirmado (⚠ placeholder).
2. No hay tokens de deploy (⚠ pendiente).
3. El objetivo de esta ejecución es validar que el sistema produce los docs correctos, no construir la web real.

Cuando el operador provea dominio + tokens, se ejecutaría:

```
pnpm create astro@latest aerotermia-madrid-web -- --template minimal
cd aerotermia-madrid-web
pnpm astro add tailwind
pnpm astro add sitemap
# Crear páginas según URL Matrix (03-docs-canonicos.md)
# Inyectar contenido (02-contenido/)
# Configurar astro.config.mjs con site + trailingSlash
pnpm build
# Verificar dist/ + sitemap con 24 URLs
```

**Status:** `⚠ pendiente tokens + dominio`
