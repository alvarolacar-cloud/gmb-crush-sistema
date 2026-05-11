# Referencia — Doctrina GMB Crush

**Uso:** Documento de consulta durante la ejecución. No es un paso del flujo — se lee cuando Doc B o Doc D lo necesitan.

---

## 1. Capas Territoriales

| Capa | Función | ¿Genera URLs? |
|------|---------|---------------|
| Main City | Base de la arquitectura. Extraída del NAP. | Sí — genera GH, LBS, GA |
| LCAs | Barrios, distritos, zonas del NAP y alrededores. Enriquecen contenido y schemas. | **No** |
| AEAs (Approved Expansion Areas) | Ciudades adicionales aprobadas por el operador. | Sí — si el operador las aprueba explícitamente |

**Regla irrompible:** Si una zona no es Main City y no es AEA aprobada, **no genera URL**. Solo aparece en contenido, FAQs y `areaServed` del schema.

---

## 2. LCAs — Local Coverage Areas

### Direct LCAs
Barrios, distritos o zonas que aparecen en la dirección física del NAP.

Ejemplo: NAP `Calle Rafael Calvo 12, Almagro, Madrid` → Direct LCAs: `[Almagro, Chamberí]`

### Candidate LCAs — Test GEO 3/6
Una zona es LCA candidata si cumple al menos 3 de estos 6 criterios:

| Criterio | Descripción |
|----------|-------------|
| 1. Proximidad | ≤ 5 km del NAP |
| 2. Contigüidad | Limita directamente con el barrio del NAP |
| 3. Misma línea de metro/bus | Conectadas por transporte público directo |
| 4. Densidad servicios | Alta concentración de negocios del mismo sector |
| 5. Búsquedas locales | Aparece en sugerencias de Google para la keyword |
| 6. Competidores presentes | Los top 3 del Local Pack la mencionan |

### Cómo aparecen las LCAs por page type

| Page Type | Uso de LCAs |
|-----------|-------------|
| HP | 1-2 menciones en descripción de cobertura |
| SO | No mencionar (pilar temático, no local) |
| LBS | 2-3 menciones naturales en cuerpo + FAQs locales |
| GH | Lista completa en sección de cobertura |
| GA | 1-2 menciones contextuales |
| AC | 1-2 menciones si aplica |

### LCAs en schemas — areaServed
```json
"areaServed": [
  { "@type": "City", "name": "[Main City]" },
  { "@type": "Neighborhood", "name": "[LCA 1]" },
  { "@type": "Neighborhood", "name": "[LCA 2]" }
]
```

---

## 3. Page Type Specs

### HP — Homepage (Root Entity Anchor)
- **H1:** Nombre marca o `[Cat] en [Ciudad]`
- **Contenido:** qué ofrece + trust signals + NAP + links a todos SO y GH
- **Word count:** 900-1200
- **CTA:** Principal (Llamar / Presupuesto)
- **Linking:** → todos SO + GH + Contacto

### SO — Service Overview (Topical Authority Pillar)
- **H1:** El servicio solo, **sin ciudad**
- **Contenido:** qué es + proceso + FAQs genéricas (no locales)
- **Word count:** 850-1000
- **CTA:** Suave → a sus LBS hijo
- **Linking:** → sus LBS + SO relacionadas
- **Regla:** No mencionar ciudades ni LCAs — es pilar temático

### LBS — Location-Based Service (Main City Converter)
- **H1:** `[Marca] — [Servicio] en [Ciudad]`
- **Contenido:** intro local + proceso con contexto ciudad + FAQs locales + LCAs
- **Word count:** 800-1000
- **CTA:** Fuerte — Llamar / Presupuesto
- **Linking:** → SO padre + GH + sus GA hijo + Contacto
- **Regla:** 2-3 menciones LCAs naturales, nunca "oficina en [barrio]"

### GH — GeoHub (Main City Silo Container)
- **H1:** `Servicios de [Cat] en [Ciudad]`
- **Contenido:** descripción cobertura + lista de servicios + índice artículos
- **Word count:** 700-1100
- **CTA:** Suave → a LBS
- **Linking:** → todos LBS + AC + GA ciudad

### GA — GeoArticle (Semantic Booster)
- **H1:** `[Pregunta] en [Ciudad]` (ej: "Cuánto cuesta una apertura de puertas en Madrid")
- **Contenido:** respuesta directa + desarrollo tema + contexto local
- **Word count:** 1000-1500
- **CTA:** Suave → LBS padre (3 puentes mínimo)
- **Linking:** → LBS padre + GH + GA relacionada
- **Regla:** NO vende, responde. No CTA directo de conversión.

### AC — Additional Category Page (GBP AC Support)
- **H1:** `[Categoría adicional] en [Ciudad]`
- **Contenido:** similar a LBS pero para la categoría secundaria
- **Word count:** 800-1000
- **Linking:** → GH + LBS relacionadas

### Contacto — Auxiliar
- **H1:** `Contacto` o `Llámanos`
- **Contenido:** NAP completo + formulario + horarios + LCAs
- **Word count:** 300-500

---

## 4. Schemas por Page Type (referencia rápida)

| Page Type | Schemas |
|-----------|---------|
| HP | Organization + WebSite + LocalBusiness |
| SO | Service + WebPage + BreadcrumbList |
| LBS | Service + LocalBusiness + BreadcrumbList |
| GH | CollectionPage + BreadcrumbList |
| GA | Article + FAQPage + BreadcrumbList |
| AC | Service + LocalBusiness + BreadcrumbList |
| Contacto | LocalBusiness + ContactPage |

**Omisiones obligatorias:**
- `sameAs` → solo si GBP confirmado con URL real
- `address` → solo si NAP sin placeholders
- `aggregateRating` → nunca, sin excepción
- `openingHours` → solo si operador lo aportó

---

## 5. Ejemplo Aplicado — Cerrajeros Madrid

**Inputs:** Categoría=Cerrajero, Ciudad=Madrid, S=5, A=1, G=3

**Variables:**
- S = 5 servicios: cerrajero urgente, apertura puertas, cambio cerraduras, cambio bombines, instalación seguridad
- A = 1: duplicado llaves
- G = 3 por servicio
- Total = 1+5+1+5+1+(3×5) = **28 páginas SEO + 1 contacto = 29**

**URL Matrix (muestra):**

| Page Type | URL |
|-----------|-----|
| HP | `/` |
| SO | `/cerrajero/cerrajero-urgente/` |
| SO | `/cerrajero/apertura-puertas/` |
| GH | `/cerrajero/madrid/` |
| LBS | `/cerrajero/madrid/cerrajero-urgente/` |
| LBS | `/cerrajero/madrid/apertura-puertas/` |
| AC | `/duplicado-llaves/madrid/` |
| GA | `/madrid/cuanto-cuesta-apertura-puertas/` |
| GA | `/madrid/como-funciona-apertura-puertas/` |
| GA | `/madrid/apertura-puertas-vs-cerrajero-urgente/` |
| Contacto | `/contacto/` |

**LCAs (NAP en Almagro, Madrid):**
- Direct LCAs: Almagro, Chamberí
- Candidate LCAs (Test GEO 3/6): Salamanca, Retiro, Centro, Tetuán (las que cumplan ≥3 criterios)
- AEAs: ninguna por defecto

**Árbol de linking:**
```
HP → SO×5 + GH + Contacto
SO/apertura-puertas → LBS/madrid/apertura-puertas + SO relacionadas
LBS/madrid/apertura-puertas → SO padre + GH + GA×3 + Contacto
GH/madrid → LBS×5 + AC + GA ciudad
GA → LBS padre + GH + GA relacionada
```
