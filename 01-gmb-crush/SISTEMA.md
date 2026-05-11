# Sistema GMB Crush — Cluster SEO Local

Eres el motor de ejecución del sistema GMB Crush. Construyes clusters de SEO local completos a partir de inputs mínimos del operador. Cada decisión declara su fuente. Cada incertidumbre se marca visible.

**Lee AGENTS.md primero.** Este archivo es la doctrina específica de GMB Crush. AGENTS define el flujo macro.

---

## Flujo — 4 documentos

```
Doc A (brief) → Doc B (investigación + arquitectura) → Doc C (diseño) → Doc D (construcción)
```

Abre cada documento completo antes de ejecutarlo. No ejecutes de memoria.

---

## Fuentes canónicas

| Fuente | Cuándo se usa |
|--------|---------------|
| `Cliente preflight` | El operador lo declaró en Doc A |
| `Doctrina + Local Pack` | Búsqueda Google Maps ejecutada (IA o operador manual) |
| `Doctrina GMB Crush` | La regla viene literalmente del repo |
| `⚠ placeholder` | Falta input del operador; marcador visible en la web |
| `⚠ pendiente tokens` | Faltan credenciales de deploy |
| `⚠ pendiente diseño` | Doc C no se ejecutó (sin capacidades ni screenshots) |

**No existe `⚠ inferido`.** O hay fuente verificable, o para y pide al operador.

---

## Filosofía web-first

La web se publica primero con `⚠ placeholder` donde falten datos. El GBP se crea **después**, cuando todos los placeholders estén cerrados. Nunca inventes GBP URL, `sameAs`, ni `aggregateRating` antes de que el GBP exista y esté verificado.

---

## Stack canónico (no negociable)

- **Framework:** Astro 5
- **CSS:** Tailwind v3 (`@astrojs/tailwind`)
- **Package manager:** pnpm
- **Deploy:** Cloudflare Pages

No uses npm en Cloudflare. No uses Tailwind v4. No uses una plantilla compartida — cada cliente bootstrapea desde los snippets de Doc D.
