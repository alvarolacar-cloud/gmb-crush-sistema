# Fase 7 — Consolidación y Pendientes

## URL de la web
`⚠ pendiente tokens` — No desplegada.

## Tabla de Pendientes

| # | Dato | Status | Afecta a | Qué se necesita |
|---|------|--------|----------|-----------------|
| 1 | Primary Category | `⚠ inferido` | Arquitectura, Schema | Validar con Local Pack (buscar "aerotermia madrid" en Maps) |
| 2 | Core Services 3 y 4 | `⚠ inferido` | URLs, Contenido | Confirmar que "suelo radiante" y "ACS" se buscan por separado |
| 3 | Additional Category | `⚠ inferido` | URL AC-1, Contenido | Confirmar que ofrecen reparación de bombas de calor |
| 4 | LCAs (Chamberí, Malasaña, Chueca, Salamanca) | `⚠ inferido` | Contenido, Schema areaServed | Confirmar que operan en esas zonas |
| 5 | GeoArticle Topics (12) | `⚠ inferido` | Contenido de 12 GAs | Validar con keyword research (volumen + intención) |
| 6 | Teléfono | `⚠ placeholder` | NAP, Schema, Contacto, Footer | Cliente lo provee |
| 7 | Email | `⚠ placeholder` | NAP, Schema, Contacto | Cliente lo provee |
| 8 | Dominio | `⚠ placeholder` | URLs absolutas, astro.config, deploy | Cliente lo provee o se compra |
| 9 | Tokens Deploy (GitHub + Cloudflare) | `⚠ pendiente` | Web no está live | Operador provee |

## Aviso de bloqueo GBP

> El Paso 14 (Creación del Google Business Profile) queda **BLOQUEADO** hasta que todos los `⚠` de esta tabla estén cerrados. La web tolera datos provisionales; el GBP no.

## Para cerrar cada pendiente

1. El operador/cliente entrega el dato.
2. Se actualiza el contenido/schema afectado.
3. Se hace rebuild (`pnpm build`).
4. Se re-despliega.
5. Se elimina la fila de la tabla.
6. Cuando la tabla esté vacía → GBP desbloqueado.
