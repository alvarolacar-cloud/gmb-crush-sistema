## 3. Fase 1 — Fundamentos y Arquitectura

> **Si has llegado aquí, estás en el lugar correcto.** Lee este archivo completo antes de producir ningún output. Los patrones de URL, la fórmula de páginas y las convenciones de naming están en las secciones siguientes — no en el SISTEMA.md.

Cada output de esta fase tiene una fuente y un método concreto. Síguelos en orden.

### 3.1 Main City
- **Dato que buscamos:** La ciudad principal de operación.
- **Cómo se obtiene:** Extraer el campo `City` de la dirección del preflight.
- **Fuente:** `Cliente preflight`.
- **Si falta dirección:** Extraer la ciudad de la descripción ("fontanero en Barcelona" → Barcelona). Marcar `⚠ inferido`.

### 3.2 Primary Category
- **Dato que buscamos:** La categoría GBP principal (ej: "Fontanero", "Cerrajero", "Instalador de climatización").
- **Cómo se obtiene:** Si existe el Informe de Competidores (Fase 0) → tomar la "Categoría GBP más frecuente" del informe, marcar `confirmed`. Si no existe el informe → buscar `[servicio principal] [Main City]` en Google Maps → mirar los 5 primeros perfiles del Local Pack → la categoría primaria que aparece en 3+ de 5 es la elegida.
- **Fuente:** `Doctrina + Local Pack`.
- **Si no tienes acceso a Maps:** Inferir la categoría más específica que cubra el servicio principal. Elegir siempre la más específica disponible ("Instalador de aerotermia" > "Empresa de climatización" > "Reformas"). Marcar `⚠ inferido` con razonamiento.
- **Si ninguna categoría aparece en 3+ de 5:** Elegir la que aparece en 2 de 5. Si hay empate, elegir la más específica. Si solo aparece en 1, usar esa igualmente (es la mejor señal disponible). Marcar `⚠ inferido`.
- **Slug:** La plantilla genera el slug automáticamente aplicando slugify al valor del output 1.5. No lo definas manualmente — la plantilla lo calcula.

### 3.3 Core Services (Variable S)
- **Dato que buscamos:** Lista de servicios con intención de búsqueda diferenciada.
- **Cómo se obtiene:** Si existe el Informe de Competidores (Fase 0) → tomar los servicios confirmados por el operador de la Matriz de Servicios, marcar `confirmed`. Si no existe el informe → buscar `[categoría] [Main City]` en Google Maps → mirar los servicios listados en los 5 primeros perfiles → los que aparecen en 2+ perfiles son candidatos.
- **Multi-ciudad (opcional):** Si el operador declaró ciudades adicionales en el preflight, analizar también el Local Pack de esas ciudades para cruzar servicios. Los servicios que aparecen en 2+ ciudades del sector son los más sólidos. La arquitectura sigue siendo solo para la Main City — las otras ciudades solo se usan para validar la selección de servicios.
- **Fuente:** `Doctrina + Local Pack`.
- **Si no tienes acceso a Maps:** Tomar los servicios que el operador declaró en el preflight. Si declaró menos de 4, proponer expansiones lógicas del sector marcadas `⚠ inferido`. Si no declaró ninguno, inferir 4-6 del sector.
- **Regla anti-duplicación:** Si dos servicios responden a la misma búsqueda del usuario (test: "¿alguien buscaría esto por separado?"), fusionar en uno. En caso de duda, NO crear el servicio — es mejor tener S=4 sólidos que S=6 con canibalización.
- **S es variable:** Puede ser 3, 4, 5, 6 o más. No forzar a 5.
- **Criterio para fijar S:** Solo incluir servicios que (1) el negocio realmente ofrece Y (2) tienen intención de búsqueda propia verificable. Si no puedes verificar búsqueda, limitar a los servicios que el operador declaró + máximo 2 expansiones inferidas. En caso de duda, S más bajo es mejor que S más alto.

### 3.4 Additional Categories (Variable A)
- **Dato que buscamos:** Categorías GBP secundarias que necesitan página propia.
- **Cómo se obtiene:** Buscar categorías secundarias en los 5 perfiles del Local Pack → filtrar las que el negocio realmente ofrece → descartar las que ya están cubiertas por un core service.
- **Fuente:** `Doctrina + Local Pack`.
- **Si no tienes acceso a Maps:** Si hay una categoría obvia del sector que no encaja en los core services, proponerla como A=1 marcada `⚠ inferido`. Si no hay ninguna obvia, A=0.
- **Criterio:** Necesita página propia si (1) el negocio la ofrece Y (2) no es sinónimo ni subconjunto de un core service.

### 3.5 Local Coverage Areas (LCAs)

El sistema GMB Crush separa el territorio en 3 capas que NUNCA se mezclan:
- **Main City** (1.7) → crea arquitectura (URLs).
- **Local Coverage Areas** (1.10) → refuerzan contenido y schema. NUNCA generan URLs.
- **Approved Expansion Areas** (1.11) → generan URLs solo si se aprueban (default vacío en Phase 1).

**Las LCAs son SOLO barrios/distritos dentro de la Main City. Nunca otras ciudades.**

#### Gate previo — Direccion obligatoria

**Antes de definir cualquier LCA, verifica que el preflight tiene direccion fisica.**

- Si la direccion esta presente → continua con Direct LCAs y Candidate LCAs.
- Si la direccion falta → **STOP**. Pregunta al operador:

  > "Necesito la direccion fisica del negocio (calle, numero, ciudad, CP) para determinar las zonas de cobertura. Sin ella no puedo definir las LCAs."

  No avances hasta tener respuesta. No inventes zonas sin ancla fisica.

#### Direct LCAs
- **Dato que buscamos:** Barrio + distrito de la dirección física del NAP.
- **Cómo se obtiene:** Extraer directamente del NAP. Sin más validación.
- **Fuente:** `Cliente preflight`.
- **Ejemplo:** Dirección en Calle Rafael Calvo 40 → Direct LCAs: Almagro (barrio), Chamberí (distrito).

#### Candidate LCAs
- **Dato que buscamos:** Zonas dentro de la Main City donde el negocio podría posicionarse.
- **Cómo se obtiene (4 pasos):**
  1. Revisar áreas de servicio de 3-5 competidores top en Google Maps.
  2. Listar zonas que aparecen en ≥2 competidores Y no son Direct.
  3. Aplicar el **test de coherencia GEO** a cada zona candidata.
  4. Las que pasan entran como contenido. Solo generan URL si pasan a AEA (post-launch).
- **Fuente:** `Doctrina + Local Pack`.
- **Si no tienes acceso a Maps:** Inferir 4-6 barrios/distritos adyacentes a la dirección. Marcar `⚠ inferido`.
- **Máximo Candidate LCAs:** 8. Si hay más candidatas que pasan el test, elegir las más cercanas a la dirección física.

#### Test de Coherencia GEO (3 de 6)

**Filtro previo obligatorio:** La zona pertenece a la Main City (es barrio/distrito, no otra ciudad). Si no pasa → descartada.

**6 criterios (mínimo 3 para pasar, el criterio 6 es OBLIGATORIO):**

**Nota:** El criterio 6 (No falsa ubicación) debe cumplirse SIEMPRE. Una zona que pasa 3 de los primeros 5 criterios pero NO cumple el 6 queda DESCARTADA.

| # | Criterio | Pregunta |
|---|----------|----------|
| 1 | Ancla física | ¿Sale directamente de la dirección o está conectada? |
| 2 | Main City | ¿Pertenece claramente a la Main City? |
| 3 | Proximidad | ¿Está cerca o conectada al punto físico? |
| 4 | Intención local | ¿Explica una necesidad local real del servicio? |
| 5 | Demanda/competencia | ¿Hay búsquedas o competidores trabajando esa zona? |
| 6 | No falsa ubicación | ¿Puede mencionarse sin afirmar oficina física allí? |

#### Dónde aparecen las LCAs

| Dónde | Qué se puede hacer | Qué NO se puede hacer |
|-------|--------------------|-----------------------|
| Contenido LBS | "Atendemos en Chamberí, Salamanca..." | "Oficina en Salamanca" |
| FAQs locales | "¿Llegáis a Retiro?" | Crear URL `/retiro/` |
| GeoHub | Sección de cobertura | Listar como sedes |
| Schema `areaServed` | Solo cobertura REAL o VALIDADA | Zonas aspiracionales o sin validar |

**Regla schema vs contenido:** El contenido puede usar señales GEO coherentes (más flexible). El schema `areaServed` solo admite cobertura real o validada (más estricto).

### 3.6 Trust Signals
- **Dato que buscamos:** Señales de confianza del sector (años, certificaciones, garantías, badges) + diferenciadores del cliente.
- **Cómo se obtiene:** Si existe el Informe de Competidores (Fase 0) → tomar la columna "Trust signals" del informe, marcar `confirmed`. Si no existe el informe → extraer trust signals de los 5 perfiles top del Local Pack → las que aparecen en 3+ perfiles son "estándar del sector". Añadir diferenciadores propios del cliente si los declara.
- **Fuente:** `Doctrina + Local Pack`.
- **Si no tienes acceso a Maps:** Inferir los trust signals más comunes del sector (ej: fontanería → "24h", "sin desplazamiento", "presupuesto gratis"). Marcar `⚠ inferido`.
- **Se usa en:** Hero de Homepage, bloque de confianza, contenido de LBS.
- **Regla:** Los trust signals deben ser verificables (años reales, certificaciones reales, garantías reales). No inventar "250+ reseñas" ni datos que el cliente no pueda respaldar.

### 3.7 GeoArticle Topics (Variable G)
- **Dato que buscamos:** 3 topics por core service con intención informacional/precomercial.
- **Cómo se obtiene:** Buscar en Ahrefs/Semrush `[servicio] [ciudad]` → filtrar por intención informacional → elegir los 3 con más volumen por servicio.
- **Fuente:** `Doctrina + Keyword Research`.
- **Si no tienes acceso a KW tools:** Generar 3 topics por servicio usando este framework:
  1. **Precio:** "¿Cuánto cuesta [servicio] en [ciudad]?"
  2. **Proceso/decisión:** "¿Cuánto tarda [servicio]?" o "¿Cuándo es necesario [servicio]?"
  3. **Comparativa:** "[Servicio] vs [alternativa más común del sector]" (la alternativa es la opción que un usuario consideraría en vez de contratar este servicio — ej: aerotermia vs caldera de gas, no aerotermia vs aire acondicionado)
- **Regla anti-solapamiento:** Antes de fijar los topics, verificar que ninguno se solapa con otro de otro servicio. Si "cuánto cuesta instalar aerotermia" y "precio aerotermia calefacción" atacan la misma búsqueda, eliminar uno.
- **G = 3 por defecto.** Puede ser 2 si no hay 3 topics diferenciados para un servicio.

### 3.8 Aplicar Fórmula Maestra

```
Total páginas SEO = 1 + S + 1 + S + A + (G × S)

1   = Homepage
S   = Service Overviews
1   = GeoHub Main City
S   = Location-Based Services
A   = Additional Category Pages
G×S = GeoArticles

+ 1 /contacto/ (auxiliar, fuera del conteo SEO)
```

### 3.9 Generar URL Matrix

Aplica estos patrones. **Trailing slash: siempre.** **Dominio canónico: https://www.[dominio].com/**

| Tipo | Patrón | Ejemplo |
|------|--------|---------|
| Homepage | `/` | `/` |
| Service Overview | `/[primary-cat-slug]/[service-slug]/` | `/fontanero/reparacion-fugas/` |
| GeoHub | `/[main-city-slug]/` | `/barcelona/` |
| LBS | `/[primary-cat-slug]/[main-city-slug]/[service-slug]/` | `/fontanero/barcelona/reparacion-fugas/` |
| Additional Category | `/[primary-cat-slug]/[main-city-slug]/[additional-slug]/` | `/fontanero/barcelona/desatascos/` |
| GeoArticle | `/[main-city-slug]/[topic-slug]/` | `/barcelona/cuanto-cuesta-reparar-una-fuga/` |
| Contacto | `/contacto/` | `/contacto/` |

**Slugify:** `lowercase → eliminar acentos → reemplazar espacios/símbolos por guión → colapsar guiones → sin guión al inicio/final`.

**Prohibido en slugs:** `near-me`, `best`, `cheap`, `top-rated`, `urgente` (salvo que sea el nombre real del servicio).

### 3.10 GATE DOCTRINAL — Entrega al Operador

Antes de pasar a Fase 2, muestra al operador este bloque exacto:

```
## Arquitectura Propuesta

**Main City:** [ciudad]
**Primary Category:** [categoría] → Fuente: [fuente]
**Core Services (S=[n]):**
1. [servicio] → Fuente: [fuente]
2. [servicio] → Fuente: [fuente]
...

**Additional Categories (A=[n]):**
- [categoría] → Fuente: [fuente]

**GeoArticle Topics (G=[n] por servicio):**
- [servicio 1]: [topic1], [topic2], [topic3]
- [servicio 2]: [topic1], [topic2], [topic3]
...

**Fórmula:** 1+[S]+1+[S]+[A]+([G]×[S]) = [total] páginas + /contacto/

**URL Matrix:** [lista completa de URLs]

## Checklist Doctrinal

**Arquitectura:**
- [ ] Main City = ciudad del NAP (no inventada)
- [ ] Ninguna LCA genera URL
- [ ] GeoHub existe (`/[main-city-slug]/`) — es obligatorio, no opcional
- [ ] Fórmula declarada: `1+S+1+S+A+(G×S) = [total]` y el número de URLs en la matrix cuadra exactamente

**Patrones URL — verifica cada tipo contra la tabla de 3.9:**
- [ ] SO sigue `/[primary-cat-slug]/[service-slug]/` — NO `/[service-slug]/` sin categoría
- [ ] LBS sigue `/[primary-cat-slug]/[main-city-slug]/[service-slug]/` — NO ciudad pegada al servicio sin categoría
- [ ] GeoArticle sigue `/[main-city-slug]/[topic-slug]/` — NO anidado bajo LBS
- [ ] AC sigue `/[primary-cat-slug]/[main-city-slug]/[additional-slug]/`

**Calidad:**
- [ ] Ningún slug con near-me/best/cheap/urgente
- [ ] No hay dos URLs con la misma intención de búsqueda
- [ ] Todos los ⚠ están declarados con razonamiento

## ⚠ Datos inferidos o pendientes
| Dato | Status | Razonamiento |
|------|--------|--------------|
| ... | ⚠ inferido | ... |
```

**Si el operador corrige:** ajusta y vuelve a mostrar. **Si no dice nada:** avanza a Fase 2.

---

