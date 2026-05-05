# 6 Docs Canónicos — Aerotermia Madrid SL

## 1. URL Matrix & 2. Page Type Map

| ID | URL | Page Type | Servicio | Ciudad | Parent Page | Status | Fuente |
|----|-----|-----------|----------|--------|-------------|--------|--------|
| HP-1 | `/` | Homepage | — | Madrid | — | `confirmed` | `Cliente preflight` |
| SO-1 | `/aerotermia/instalacion-aerotermia/` | Service Overview | Instalación aerotermia | — | HP-1 | `confirmed` | `Cliente preflight` |
| SO-2 | `/aerotermia/mantenimiento-aerotermia/` | Service Overview | Mantenimiento aerotermia | — | HP-1 | `confirmed` | `Cliente preflight` |
| SO-3 | `/aerotermia/aerotermia-suelo-radiante/` | Service Overview | Suelo radiante | — | HP-1 | `⚠ inferido` | `⚠ inferido` |
| SO-4 | `/aerotermia/aerotermia-acs/` | Service Overview | ACS | — | HP-1 | `⚠ inferido` | `⚠ inferido` |
| GH-1 | `/madrid/` | GeoHub | — | Madrid | HP-1 | `confirmed` | `Cliente preflight` |
| LBS-1 | `/aerotermia/madrid/instalacion-aerotermia/` | LBS | Instalación aerotermia | Madrid | SO-1 | `confirmed` | `Cliente preflight` |
| LBS-2 | `/aerotermia/madrid/mantenimiento-aerotermia/` | LBS | Mantenimiento aerotermia | Madrid | SO-2 | `confirmed` | `Cliente preflight` |
| LBS-3 | `/aerotermia/madrid/aerotermia-suelo-radiante/` | LBS | Suelo radiante | Madrid | SO-3 | `⚠ inferido` | `⚠ inferido` |
| LBS-4 | `/aerotermia/madrid/aerotermia-acs/` | LBS | ACS | Madrid | SO-4 | `⚠ inferido` | `⚠ inferido` |
| AC-1 | `/aerotermia/madrid/reparacion-bombas-calor/` | Additional Category | Reparación bombas | Madrid | GH-1 | `⚠ inferido` | `⚠ inferido` |
| GA-1 | `/madrid/cuanto-cuesta-instalar-aerotermia/` | GeoArticle | Instalación aerotermia | Madrid | LBS-1 | `⚠ inferido` | `⚠ inferido` |
| GA-2 | `/madrid/aerotermia-vs-caldera-gas/` | GeoArticle | Instalación aerotermia | Madrid | LBS-1 | `⚠ inferido` | `⚠ inferido` |
| GA-3 | `/madrid/subvenciones-aerotermia-madrid/` | GeoArticle | Instalación aerotermia | Madrid | LBS-1 | `⚠ inferido` | `⚠ inferido` |
| GA-4 | `/madrid/mantenimiento-aerotermia-cada-cuanto/` | GeoArticle | Mantenimiento aerotermia | Madrid | LBS-2 | `⚠ inferido` | `⚠ inferido` |
| GA-5 | `/madrid/averias-comunes-aerotermia/` | GeoArticle | Mantenimiento aerotermia | Madrid | LBS-2 | `⚠ inferido` | `⚠ inferido` |
| GA-6 | `/madrid/revision-aerotermia-obligatoria/` | GeoArticle | Mantenimiento aerotermia | Madrid | LBS-2 | `⚠ inferido` | `⚠ inferido` |
| GA-7 | `/madrid/aerotermia-suelo-radiante-precio/` | GeoArticle | Suelo radiante | Madrid | LBS-3 | `⚠ inferido` | `⚠ inferido` |
| GA-8 | `/madrid/suelo-radiante-con-aerotermia-ventajas/` | GeoArticle | Suelo radiante | Madrid | LBS-3 | `⚠ inferido` | `⚠ inferido` |
| GA-9 | `/madrid/aerotermia-suelo-radiante-en-reforma/` | GeoArticle | Suelo radiante | Madrid | LBS-3 | `⚠ inferido` | `⚠ inferido` |
| GA-10| `/madrid/aerotermia-agua-caliente-consumo/` | GeoArticle | ACS | Madrid | LBS-4 | `⚠ inferido` | `⚠ inferido` |
| GA-11| `/madrid/aerotermia-acs-vs-termo-electrico/` | GeoArticle | ACS | Madrid | LBS-4 | `⚠ inferido` | `⚠ inferido` |
| GA-12| `/madrid/aerotermia-acs-para-cuantas-personas/` | GeoArticle | ACS | Madrid | LBS-4 | `⚠ inferido` | `⚠ inferido` |
| AUX-1| `/contacto/` | Contacto | — | — | HP-1 | `confirmed` | `Doctrina GMB Crush` |

## 3. Internal Linking Plan

Ver tabla de enlaces obligatorios en `SISTEMA.md` §4.6. Todas las páginas siguen ese esquema exacto.

## 4. Content Pack

Ver `02-contenido/muestra-4-paginas.md` para el brief de contenido de los 4 page types principales. El resto de páginas siguen el mismo patrón.

## 5. Schema Map

| Page Type | Schema JSON-LD Asignado |
|-----------|-------------------------|
| Homepage | `Organization` + `WebSite` + `LocalBusiness` (address: Gran Vía 28, 28013 Madrid; areaServed: Madrid, Chamberí, Malasaña, Chueca, Salamanca) |
| Service Overview | `Service` + `WebPage` + `BreadcrumbList` |
| GeoHub | `CollectionPage` + `BreadcrumbList` |
| LBS | `LocalBusiness` + `FAQPage` + `BreadcrumbList` (mismo address y areaServed que HP) |
| Additional Category | `Service` + `BreadcrumbList` (areaServed: Madrid) |
| GeoArticle | `Article` + `FAQPage` + `BreadcrumbList` (author: Aerotermia Madrid SL) |
| Contacto | `ContactPoint` + `Organization` |

## 6. Tabla de Pendientes (⚠)

| # | Dato | Status | Afecta a | Qué se necesita |
|---|------|--------|----------|-----------------|
| 1 | Primary Category | `⚠ inferido` | Arquitectura, Schema | Validar con Local Pack |
| 2 | Core Services (3 y 4) | `⚠ inferido` | Arquitectura, Contenido | Validar intención de búsqueda |
| 3 | Additional Category | `⚠ inferido` | Arquitectura, Contenido | Validar con Local Pack |
| 4 | LCAs | `⚠ inferido` | Contenido, Schema `areaServed` | Validar si realmente operan ahí |
| 5 | GeoArticle Topics (12) | `⚠ inferido` | Contenido GAs | Validar con Keyword Research |
| 6 | Teléfono | `⚠ placeholder` | NAP, Schema, Contacto | Cliente lo provee |
| 7 | Email | `⚠ placeholder` | NAP, Schema, Contacto | Cliente lo provee |
| 8 | Dominio | `⚠ placeholder` | URLs, Deploy | Cliente lo provee |
| 9 | Tokens Deploy | `⚠ pendiente` | Web no está live | Operador provee tokens |
