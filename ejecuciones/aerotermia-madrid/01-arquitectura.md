# Arquitectura Propuesta

**Main City:** Madrid
**Fuente:** `Cliente preflight` (dirección: Calle Gran Vía 28, 28013 Madrid)

**Primary Category:** Instalador de aerotermia
**Fuente:** `⚠ inferido` — No tengo acceso a Google Maps. Razonamiento: el negocio se dedica a "instalación y mantenimiento de aerotermia". La categoría GBP más específica disponible es "Instalador de aerotermia" (existe en el catálogo GBP). Más específica que "Empresa de climatización" o "Instalador de calefacción".
**Slug:** `aerotermia`

**Core Services (S=4):**
1. Instalación de aerotermia → Fuente: `Cliente preflight` (declarado en "qué hace")
2. Mantenimiento de aerotermia → Fuente: `Cliente preflight` (declarado en "qué hace")
3. Aerotermia para suelo radiante → Fuente: `⚠ inferido` (variante con intención de búsqueda diferenciada: "aerotermia suelo radiante" es búsqueda propia)
4. Aerotermia para agua caliente (ACS) → Fuente: `⚠ inferido` (variante con intención diferenciada: "aerotermia agua caliente" es búsqueda propia)

**Descartado:** "Aerotermia para calefacción" — fusionado con "Instalación de aerotermia" porque la intención es la misma (quien busca instalar aerotermia quiere calefacción). Test: "¿alguien buscaría esto por separado?" → No con suficiente diferenciación.

**Additional Categories (A=1):**
- Reparación de bombas de calor → Fuente: `⚠ inferido` (servicio que el sector ofrece habitualmente, no cubierto por los 4 core services que son de instalación/mantenimiento)

**Local Coverage Areas (LCAs):**
- Chamberí, Malasaña, Chueca, Salamanca → Fuente: `⚠ inferido` (barrios adyacentes a Gran Vía 28, 28013 Madrid)
- **No generan URLs.** Solo contenido y schema `areaServed`.

**GeoArticle Topics (G=3 por servicio):**
Fuente: `⚠ inferido` (framework precio/proceso/comparativa, sin keyword research)

- Instalación aerotermia: `cuanto-cuesta-instalar-aerotermia`, `aerotermia-vs-caldera-gas`, `subvenciones-aerotermia-madrid`
- Mantenimiento aerotermia: `mantenimiento-aerotermia-cada-cuanto`, `averias-comunes-aerotermia`, `revision-aerotermia-obligatoria`
- Aerotermia suelo radiante: `aerotermia-suelo-radiante-precio`, `suelo-radiante-con-aerotermia-ventajas`, `aerotermia-suelo-radiante-en-reforma`
- Aerotermia ACS: `aerotermia-agua-caliente-consumo`, `aerotermia-acs-vs-termo-electrico`, `aerotermia-acs-para-cuantas-personas`

**Fórmula:** 1+4+1+4+1+(3×4) = **23 páginas SEO** + /contacto/ = **24 URLs**

---

## URL Matrix

| # | Tipo | URL |
|---|------|-----|
| 1 | Homepage | `/` |
| 2 | Service Overview | `/aerotermia/instalacion-aerotermia/` |
| 3 | Service Overview | `/aerotermia/mantenimiento-aerotermia/` |
| 4 | Service Overview | `/aerotermia/aerotermia-suelo-radiante/` |
| 5 | Service Overview | `/aerotermia/aerotermia-acs/` |
| 6 | GeoHub | `/madrid/` |
| 7 | LBS | `/aerotermia/madrid/instalacion-aerotermia/` |
| 8 | LBS | `/aerotermia/madrid/mantenimiento-aerotermia/` |
| 9 | LBS | `/aerotermia/madrid/aerotermia-suelo-radiante/` |
| 10 | LBS | `/aerotermia/madrid/aerotermia-acs/` |
| 11 | Additional Category | `/aerotermia/madrid/reparacion-bombas-calor/` |
| 12 | GeoArticle | `/madrid/cuanto-cuesta-instalar-aerotermia/` |
| 13 | GeoArticle | `/madrid/aerotermia-vs-caldera-gas/` |
| 14 | GeoArticle | `/madrid/subvenciones-aerotermia-madrid/` |
| 15 | GeoArticle | `/madrid/mantenimiento-aerotermia-cada-cuanto/` |
| 16 | GeoArticle | `/madrid/averias-comunes-aerotermia/` |
| 17 | GeoArticle | `/madrid/revision-aerotermia-obligatoria/` |
| 18 | GeoArticle | `/madrid/aerotermia-suelo-radiante-precio/` |
| 19 | GeoArticle | `/madrid/suelo-radiante-con-aerotermia-ventajas/` |
| 20 | GeoArticle | `/madrid/aerotermia-suelo-radiante-en-reforma/` |
| 21 | GeoArticle | `/madrid/aerotermia-agua-caliente-consumo/` |
| 22 | GeoArticle | `/madrid/aerotermia-acs-vs-termo-electrico/` |
| 23 | GeoArticle | `/madrid/aerotermia-acs-para-cuantas-personas/` |
| 24 | Contacto | `/contacto/` |

---

## Checklist Doctrinal
- [x] Main City = ciudad del NAP (Madrid, de la dirección)
- [x] Ninguna LCA genera URL (Chamberí, Malasaña, Chueca, Salamanca solo en contenido)
- [x] Ningún slug con near-me/best/cheap
- [x] No hay dos URLs con la misma intención (descartado "aerotermia calefacción" por solapamiento)
- [x] Fórmula cuadra: 1+4+1+4+1+12 = 23 SEO + 1 contacto = 24 URLs listadas ✓
- [x] Todos los ⚠ declarados con razonamiento

---

## ⚠ Datos inferidos o pendientes

| Dato | Status | Razonamiento |
|------|--------|--------------|
| Primary Category | ⚠ inferido | Sin acceso a Maps. Elegida por especificidad del sector. |
| Core Services 3 y 4 | ⚠ inferido | Expansiones lógicas con intención diferenciada verificable. |
| Additional Category | ⚠ inferido | Servicio habitual del sector, no cubierto por core. |
| LCAs | ⚠ inferido | Barrios adyacentes a Gran Vía 28. |
| GeoArticle Topics (12) | ⚠ inferido | Framework precio/proceso/comparativa sin KW research. |
| Teléfono | ⚠ placeholder | No provisto por el cliente. |
| Email | ⚠ placeholder | No provisto por el cliente. |
| Dominio | ⚠ placeholder | Derivado: `https://www.aerotermia-madrid-sl.com/` |
| Tokens deploy | ⚠ pendiente | No provistos. Build local hasta dist/. |
