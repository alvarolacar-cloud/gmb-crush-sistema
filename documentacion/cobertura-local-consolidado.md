═══════════════════════════════════════════════════════════════════════════════
  CONSOLIDADO DOCTRINAL — COBERTURA LOCAL EN GMB CRUSH
  Local Coverage Areas, Approved Expansion Areas, Test GEO, Direct/Candidate
═══════════════════════════════════════════════════════════════════════════════

Versión: 2026-05-06 (rev 2 — correcciones aplicadas)
Cliente referencia: Cerrajeros Madrid 24h (Rafael Calvo 40, Madrid)

Este documento consolida todo lo que dicen los repos antiguos GMB Crush sobre:
- Cómo se decide qué barrios aparecen en la web
- Test de Coherencia GEO (versiones 3/6 canónica y 3/5 alternativa)
- Distinción Direct vs Candidate LCAs
- Approved Expansion Areas y promoción LCA → AEA
- Cómo aparecen los barrios en cada Page Type
- Schemas, areaServed y reglas anti-invención

Cada afirmación cita la fuente exacta (archivo + sección).

CHANGELOG REV 2:
- D1 (decisión doctrinal): LCAs y AEAs son SOLO barrios/distritos dentro de
  la Main City. Nunca otras ciudades. Aplicado a Sección 4 (filtro previo
  obligatorio del test GEO) y Sección 14 bis (Decisiones doctrinales).
- Sección 2: aclarada relación Direct LCAs ↔ test GEO (no es "se les
  exime", es "cumplen automáticamente criterios 1+2").
- Sección 8: regla unificada de areaServed (cobertura REAL o VALIDADA,
  no solo Direct). Adoptada del doctrina-barrios-distritos §14.
- Sección 10 Regla 5: reformulada coherente con Sección 8.
- Sección 13: aclarado que Direct LCA puede ser AEA (Almagro como ejemplo
  válido, no era error).
- Cita Sección 1 corregida (faltaba "de la dirección").
- Sección 14 bis añadida: bloque "Decisiones doctrinales".

───────────────────────────────────────────────────────────────────────────────
ÍNDICE
───────────────────────────────────────────────────────────────────────────────

  1. GLOSARIO Y LAS 3 CAPAS TERRITORIALES
  2. DIRECT LCAs — MÉTODO Y CRITERIOS
  3. CANDIDATE LCAs — MÉTODO DE 4 PASOS
  4. TEST DE COHERENCIA GEO 3/6 (CANÓNICO)
  5. TEST 3 DE 5 SEÑALES (VERSIÓN ALTERNATIVA)
  6. APPROVED EXPANSION AREAS — DEFINICIÓN Y CRITERIOS
  7. CÓMO APARECEN LOS BARRIOS EN LA WEB (TABLA POR PAGE TYPE)
  8. SCHEMAS Y AREASERVED
  9. WORKFLOW DOCTRINAL COMPLETO
 10. LAS 5 REGLAS DURAS DE LAS LCAs
 11. VALIDACIONES CRUZADAS (CASCADA DE OUTPUTS)
 12. PROTOCOLO DE LOS 3 TRIGGERS (PASO 19 — ESCALADO)
 13. EJEMPLO APLICADO: CERRAJEROS MADRID 24H
 14. VARIANTES ENTRE REPOS ANTIGUOS (02-06)
 15. ARCHIVOS RECOMENDADOS PARA LECTURA

═══════════════════════════════════════════════════════════════════════════════
  1. GLOSARIO Y LAS 3 CAPAS TERRITORIALES
═══════════════════════════════════════════════════════════════════════════════

Fuente principal: 13-sistema-final-operativo.md §22 (08 repos-1-y-2/04 Varios/
                  Sistema_ Vision Completa/paso-13/)
                  + 01a-ejecucion-intake-form.md §6.10 (07 ejecucion-docs/Bloque 1)

El sistema GMB Crush separa el territorio en tres capas que NUNCA se mezclan:

┌──────────────────┬───────────┬─────────────┬──────────────────────────────┐
│ Capa             │ Output ID │ ¿URLs?      │ Función                      │
├──────────────────┼───────────┼─────────────┼──────────────────────────────┤
│ Main City        │ 1.7       │ Sí (base)   │ Crea arquitectura completa: │
│                  │           │             │ 1+S+1+S+A+G·S+3 URLs         │
├──────────────────┼───────────┼─────────────┼──────────────────────────────┤
│ Local Coverage   │ 1.10      │ NO nunca    │ Refuerzan contenido, FAQs,  │
│ Areas (LCAs)     │ Direct +  │             │ schema areaServed.           │
│                  │ Candidate │             │ Solo señales GEO.            │
├──────────────────┼───────────┼─────────────┼──────────────────────────────┤
│ Approved         │ 1.11      │ Sí, opcional│ Sub-cluster por barrio       │
│ Expansion Areas  │           │ (E ≥ 1)     │ aprobado: 1 GH + S LBS +    │
│ (AEA)            │           │ Default E=0 │ G·S GAs nuevas.              │
└──────────────────┴───────────┴─────────────┴──────────────────────────────┘

REGLA CANÓNICA:
  Direct          = sale del ancla física (señal GEO).
  Candidate       = se evalúa con test GEO 3/6.
  Approved Expansion = genera URL.

Citas literales:

  "Las Local Coverage Areas se usan para reforzar el contenido, los ejemplos
   locales, las FAQs y el schema areaServed.
   Solo las Approved Expansion Areas pueden convertirse en URLs propias cuando
   exista una justificación clara.
   Esta separación evita confundir cobertura real con arquitectura obligatoria."
   — 13-sistema-final-operativo.md §22

  "Direct LCAs    = zonas extraídas directamente del NAP (barrio + distrito
                    de la dirección)
   Candidate LCAs = zonas que aparecen en ≥ 2 competidores Y pasan test GEO 3/6
   Local Coverage Areas → contenido + FAQs + schema areaServed (no URLs base)"
   — 01a-ejecucion-intake-form.md §6.10 (líneas 778-781)

NOTA D1 (decisión doctrinal): "barrio + distrito" se refiere SIEMPRE a barrios
o distritos dentro de la Main City. Nunca a ciudades vecinas u otros municipios.
Ver Sección 14 bis para la decisión completa.

═══════════════════════════════════════════════════════════════════════════════
  2. DIRECT LCAs — MÉTODO Y CRITERIOS
═══════════════════════════════════════════════════════════════════════════════

Fuente: 01a-ejecucion-intake-form.md §6.10 método "Direct LCAs"
        (07 ejecucion-docs/01 Teoria.../02 ejecución/Bloque 1 Fundamentos/02
        Ejecución/01a-ejecucion-intake-form.md, líneas 816-818)

DEFINICIÓN
  Zonas que salen DIRECTAMENTE del ancla físico del NAP (barrio + distrito de
  la dirección). Se registran de forma directa, SIN MÁS VALIDACIÓN.

MÉTODO (literal)
  1. Las Direct LCAs salen del propio ancla físico del NAP (§6.4):
     barrio y distrito de la dirección. Se registran de forma directa
     sin más validación.

EJEMPLO APLICADO (Cerrajeros Madrid 24h, Rafael Calvo 40)
  Direct LCAs: Almagro, Chamberí

CONSIDERACIONES
  - Las Direct LCAs cumplen AUTOMÁTICAMENTE los criterios 1+2 del test GEO
    (Ancla física + Main City), por lo que se asume que pasan el test sin
    reevaluación. El test 3/6 se aplica formalmente solo a Candidate LCAs.
  - Para schema areaServed: ver Sección 8 — solo entran si la cobertura
    es REAL o VALIDADA (decisión doctrinal del doc doctrina-barrios §14).
  - Forman la columna principal en sección de cobertura del LBS y GeoHub.

═══════════════════════════════════════════════════════════════════════════════
  3. CANDIDATE LCAs — MÉTODO DE 4 PASOS
═══════════════════════════════════════════════════════════════════════════════

Fuente: 01a-ejecucion-intake-form.md §6.10 método "Candidate LCAs"
        (07 ejecucion-docs/01 Teoria.../Bloque 1 Fundamentos/02 Ejecución/
        01a-ejecucion-intake-form.md, líneas 819-823)

PROCESO LITERAL DE 4 PASOS

  1. Revisar las áreas de servicio declaradas por los 3-5 competidores top
     en Google Maps.

  2. Listar todas las zonas (barrios, distritos, municipios) que aparecen
     en al menos 2 competidores Y NO están ya en Direct.

  3. Para cada zona candidata, aplicar el test de coherencia GEO 3/6
     (Bloque IV §14). Si pasa 3 de 6 criterios, queda como Candidate
     validable. Si no, se descarta.

  4. Las Candidate aprobadas entran como contenido en LBS, GeoHub y
     GeoArticles. Solo generan URL si pasan a Approved Expansion (§6.11).

FILTROS ENCADENADOS

  todas las zonas (Local Pack)
       │
       ▼
  ≥2 competidores Y no Direct
       │
       ▼
  Test GEO 3/6 (Bloque IV §14)
       │
       ▼  (3+ criterios)
  Candidate validable
       │
       ▼  (uso en contenido + FAQs)
  Promoción a AEA solo en Paso 19 (post-launch)

EJEMPLO APLICADO (Cerrajeros Madrid 24h)
  Candidate LCAs: Salamanca, Retiro, Centro, Tetuán, Chamartín, Arganzuela,
                  Moncloa, Prosperidad

═══════════════════════════════════════════════════════════════════════════════
  4. TEST DE COHERENCIA GEO 3/6 (CANÓNICO)
═══════════════════════════════════════════════════════════════════════════════

Fuente canónica: 01a-ejecucion-intake-form.md Bloque IV §14
                 (07 ejecucion-docs/01 Teoria.../Bloque 1 Fundamentos/02
                 Ejecución/01a-ejecucion-intake-form.md, líneas 1284-1299)

REGLA CANÓNICA (repo)
  "Una zona se puede añadir como señal GEO si cumple AL MENOS 3 DE ESTOS 6
   CRITERIOS."

REGLA APLICADA (con decisión doctrinal D1 — solo barrios/distritos)
  Filtro previo OBLIGATORIO antes de aplicar el test:
    La zona pertenece geográficamente a la Main City
    (es barrio o distrito dentro de la ciudad, no otra ciudad).

  Si NO pasa el filtro previo → DESCARTADA sin aplicar el resto del test.

  Si pasa el filtro previo → aplicar test sobre los 6 criterios.
  Mínimo: 3 de 6 (incluyendo siempre el criterio 6 — No falsa ubicación).

  Notas:
  - El criterio 2 ("pertenece a Main City") ya queda cubierto por el filtro
    previo. En la práctica, una zona que llega al test ya cumple el criterio 2.
  - Esto convierte el test en "filtro previo + 2 de 5 efectivos" (Ancla
    física + Proximidad + Intención local + Demanda/competencia + No falsa
    ubicación).

LOS 6 CRITERIOS (literales del repo canónico)

┌───┬──────────────────────┬────────────────────────────────────┬────────────────────┐
│ # │ Criterio             │ Pregunta                            │ Si la respuesta sí │
├───┼──────────────────────┼────────────────────────────────────┼────────────────────┤
│ 1 │ Ancla física         │ ¿La zona sale directamente de la   │ Entra casi seguro  │
│   │                      │ dirección?                          │                    │
├───┼──────────────────────┼────────────────────────────────────┼────────────────────┤
│ 2 │ Main City            │ ¿La zona pertenece claramente a la │ Puede usarse como  │
│   │                      │ Main City?                          │ señal GEO          │
├───┼──────────────────────┼────────────────────────────────────┼────────────────────┤
│ 3 │ Proximidad           │ ¿Está cerca o conectada al punto   │ Puede usarse como  │
│   │                      │ físico?                             │ zona candidata     │
├───┼──────────────────────┼────────────────────────────────────┼────────────────────┤
│ 4 │ Intención local      │ ¿La zona ayuda a explicar una      │ Puede aparecer en  │
│   │                      │ necesidad local real del servicio? │ contenido          │
├───┼──────────────────────┼────────────────────────────────────┼────────────────────┤
│ 5 │ Demanda o competencia│ ¿Hay búsquedas o competidores     │ Refuerza su        │
│   │                      │ trabajando esa zona?                │ inclusión          │
├───┼──────────────────────┼────────────────────────────────────┼────────────────────┤
│ 6 │ No falsa ubicación   │ ¿Podemos mencionarla sin decir     │ Es segura para     │
│   │                      │ que tenemos oficina allí?           │ contenido          │
└───┴──────────────────────┴────────────────────────────────────┴────────────────────┘

REGLA DE CORTE
  "Si una zona solo cumple 1 criterio débil, no la metemos."
  — §14, línea 1299

REGLA OPERATIVA
  - El criterio 6 ("No falsa ubicación") es DEFENSIVO: si la respuesta es NO
    (sí fingiríamos oficina), la zona se descarta sin importar los demás.
  - Los criterios 1+2 son los más fuertes (ancla física + Main City).
  - Los criterios 3+4+5 son evaluativos.

═══════════════════════════════════════════════════════════════════════════════
  5. TEST 3 DE 5 SEÑALES (VERSIÓN ALTERNATIVA — 04 GMB CRUSH 23 ABRIL)
═══════════════════════════════════════════════════════════════════════════════

Fuente: 04 gmb crush 23 abril/Modo_Ejecutar/01_web_cloudflare_gbp/
        03_ejecucion_ia/01_docs_ejecucion/03_FASE_A_HIPOTESIS_INICIAL/
        01_INPUT.md, líneas 207-213

NOTA: esta es una versión PREVIA del test, distinta de la canónica (3/6).
La doctrina canónica final es la 3/6 documentada en sección 4 de este consolidado.
La 3/5 se incluye aquí porque sigue siendo útil para repos que la usan.

REGLA
  "Los barrios no tienen página propia por defecto. Solo la merecen si
   cumplen mínimo 3 de estas 5 señales."

LAS 5 SEÑALES

  1. demanda local visible
  2. presencia en competidores
  3. prioridad comercial
  4. contenido único posible
  5. objetivo explícito del negocio

OBSERVACIÓN: este test decide si un barrio tiene PÁGINA PROPIA (equivalente
a AEA del canon), no si entra como LCA. La doctrina canónica separa los dos
filtros (LCA con test 3/6 + AEA con criterios distintos del Bloque IV §17).

OUTPUT TEMPLATE de la 04 (literal)
  | Barrio / zona | Señales | Uso recomendado                         | Prioridad |
  |---|---:|---|---|
  |  |  | context / geoarticle / own_page / backlog | high/med/low |

VALORES "USO RECOMENDADO" (taxonomía operativa interesante)

  - context     → solo mención en contenido (≈ Candidate LCA)
  - geoarticle  → aparece en GeoArticle como ejemplo (≈ usar en GA)
  - own_page    → genera URL propia (≈ AEA del canon)
  - backlog     → para evaluación futura (≈ no decidido)

═══════════════════════════════════════════════════════════════════════════════
  6. APPROVED EXPANSION AREAS — DEFINICIÓN Y CRITERIOS
═══════════════════════════════════════════════════════════════════════════════

Fuente principal: 01a-ejecucion-intake-form.md §6.11 + Bloque IV §17
                  (07 ejecucion-docs/.../01a-ejecucion-intake-form.md,
                  líneas 830-878 y 1413-1441)

DEFINICIÓN
  "Son áreas que sí pueden generar URLs propias, pero solo si se aprueban por
   demanda, competencia o valor comercial. Default vacío en Phase 1; activación
   es decisión consciente, no default."
   — §6.11, línea 836

PATRÓN
  Approved Expansion Area → optional URLs (E ≥ 1)
  Default: E = 0 en Phase 1 (None)

LAS 3 REGLAS DE HIERRO

  1. Default = vacío en Phase 1.
     "El sistema base no crea páginas para todas las zonas de cobertura."

  2. Cada aprobación es decisión consciente, NO default.
     "La expansión territorial se aprueba; no se asume."

  3. Solo las áreas aprobadas generan URLs propias.
     "Solo las áreas aprobadas generan URLs propias." — §6.11 regla final

LOS 7 CRITERIOS PARA PROMOCIÓN LCA → AEA (Bloque IV §17)

┌────────────────────────────────┬──────────────────┐
│ Criterio                        │ Necesario        │
├────────────────────────────────┼──────────────────┤
│ Geografía clara                │ Sí               │
│ Demanda de búsqueda            │ Muy recomendable │
│ Competidores la trabajan       │ Muy recomendable │
│ Contenido único posible        │ Sí               │
│ No duplica página Main City    │ Sí               │
│ NO FINGE OFICINA FÍSICA        │ OBLIGATORIO      │
│ Valor comercial                │ Sí               │
└────────────────────────────────┴──────────────────┘

EJEMPLOS INCORRECTOS (literal)
  - Aprobar todas las áreas de cobertura
  - Crear una capa de expansión sin contenido único
  - Confundir cobertura con arquitectura
  - Activar AEA sin demanda comercial verificada

URL PATTERNS PARA UNA AEA (Paso 04 §4.10)
  Fuente: 04a-ejecucion-url-rules.md §4.10
          (07 ejecucion-docs/.../Bloque 2 Arquitectura/02 Ejecución/
          04a-ejecucion-url-rules.md, líneas 829-848)

  /{aea-slug}/                                    ← Expansion GeoHub
  /{primary-cat-slug}/{aea-slug}/{service-slug}/  ← Expansion LBS
  /{primary-cat-slug}/{aea-slug}/{additional-slug}/ ← Expansion AC
  /{aea-slug}/{topic-slug}/                       ← Expansion GA

PHASE 1 (ejemplo Cerrajeros Madrid)
  E = 0 → 0 URLs de expansión generadas.

  URLs hipotéticas que NO se crean (LCAs sin AEA):
    /almagro/
    /cerrajero/almagro/cerrajero-urgente/
    /chamberi/
    /cerrajero/salamanca/apertura-puertas/
    /retiro/cuanto-cuesta-un-cerrajero-urgente/

PHASE 2+ (si Almagro se aprueba como AEA — hipotético)
  /almagro/                                  ← Expansion GeoHub
  /cerrajero/almagro/cerrajero-urgente/      ← Expansion LBS
  ...

CRITICAL: Madrid sigue siendo Main City. Almagro cuelga DEBAJO de Madrid en la
estructura. AEA NO promociona un barrio a ciudad principal — añade un sub-cluster
hijo.

═══════════════════════════════════════════════════════════════════════════════
  7. CÓMO APARECEN LOS BARRIOS EN LA WEB (TABLA POR PAGE TYPE)
═══════════════════════════════════════════════════════════════════════════════

Fuente: 06a-ejecucion-estructura-contenido-areas-cobertura-local.md §6.12
        (07 ejecucion-docs/.../Bloque 2 Arquitectura/02 Ejecución/
        06a-ejecucion-estructura-contenido-areas-cobertura-local.md,
        líneas 197-206)

TABLA 6.12 — USO DE LCAs POR PAGE TYPE

┌─────────────────────────────┬──────────────────┬─────────────────────────────┐
│ Page Type                   │ ¿Usa LCAs?       │ Cómo las usa                │
├─────────────────────────────┼──────────────────┼─────────────────────────────┤
│ Homepage                    │ Sí, ligero       │ Service area preview        │
│                             │                  │ (mención global)            │
├─────────────────────────────┼──────────────────┼─────────────────────────────┤
│ Service Overview (SO)       │ NO               │ NO debe ser local —          │
│                             │                  │ sin ciudad                  │
├─────────────────────────────┼──────────────────┼─────────────────────────────┤
│ Location-Based Service (LBS)│ Sí               │ Intro, pain points,         │
│                             │                  │ cobertura, FAQs             │
├─────────────────────────────┼──────────────────┼─────────────────────────────┤
│ Additional Category (AC)    │ Sí               │ Escenarios locales          │
│                             │                  │ y cobertura                 │
├─────────────────────────────┼──────────────────┼─────────────────────────────┤
│ GeoHub (GH)                 │ Sí, recomendado  │ Sección PRINCIPAL de        │
│                             │                  │ cobertura local             │
├─────────────────────────────┼──────────────────┼─────────────────────────────┤
│ GeoArticle (GA)             │ Sí               │ Ejemplos, contexto,         │
│                             │                  │ landmarks, FAQs             │
└─────────────────────────────┴──────────────────┴─────────────────────────────┘

LBS — ESTRUCTURA DE CONTENIDO RECOMENDADA (§6.8 / §6.10)

  1. Hero
  2. Intro (incluye contexto local con LCAs)
  3. H2 servicio + ciudad (foco principal)
  4. H2 proceso
  5. H2 FAQs
  6. H2 trust signals
  7. CTA local
  8. H2 LOCAL COVERAGE AREAS SERVED (2-4 LCAs principales)
  9. CTA cierre

GEOHUB — ESTRUCTURA DE CONTENIDO (§6.10)

  1. Hero (Madrid + servicios + cobertura)
  2. Listado de servicios
  3. H2 LOCAL COVERAGE AREAS SECTION (TODAS las LCAs declaradas)
  4. H2 GeoArticles relacionados
  5. CTA

EJEMPLO PRÁCTICO — SECCIÓN COBERTURA EN LBS (§6.13)

  Aplicado a /cerrajero/madrid/cerrajero-urgente/ :

      H2: Cerrajero urgente en Madrid y zonas de cobertura cercanas

      Texto:
      Cerrajeros Madrid 24h ayuda a clientes en Madrid con aperturas
      urgentes, llaves rotas, cambios de bombín y problemas de acceso.
      También cubrimos Local Coverage Areas como Almagro, Chamberí,
      Salamanca y Retiro según disponibilidad. Estas zonas son señales
      GEO de proximidad que refuerzan la relevancia local mientras la
      página sigue enfocada en el servicio de cerrajero urgente en Madrid.

PATRÓN DOCTRINAL DEL PÁRRAFO
  [servicio core] + [Main City] + "También cubrimos LCAs como X, Y, Z..." +
  cierre que reafirma foco principal.

EJEMPLO FAQ CON COBERTURA NATURAL (§6.14)

  Pregunta:
  ¿Ofrecéis cerrajero urgente en Almagro, Chamberí y Salamanca?

  Respuesta:
  Sí. Cerrajeros Madrid 24h atiende clientes en Madrid y zonas de
  cobertura como Almagro, Chamberí y Salamanca según disponibilidad.
  Esta página se centra en el servicio de cerrajero urgente en Madrid
  y aclara la cobertura local real.

═══════════════════════════════════════════════════════════════════════════════
  8. SCHEMAS Y AREASERVED
═══════════════════════════════════════════════════════════════════════════════

Fuente: 06a-ejecucion-estructura-contenido-areas-cobertura-local.md §6.17
        (07 ejecucion-docs/.../06a-...md, líneas 250-252)

REGLA OPERATIVA AREASERVED — cita del repo canónico

  "areaServed lista Madrid + las 4 LCAs Direct (Almagro, Chamberí, Salamanca,
   Retiro) — las que pasan test GEO 3/6.
   Las Candidate LCAs quedan como contenido en LCAs Section
   (no en areaServed).
   0 ciudades fuera de cobertura."

NOTA: la cita literal del repo nombra "4 Direct" pero en realidad las 4 mezclan
Direct (Almagro, Chamberí — del NAP) y Candidate validadas (Salamanca, Retiro).
Es ambigüedad heredada del repo. La regla unificada de abajo la resuelve.

REGLA UNIFICADA (decisión doctrinal — adoptada de doctrina-barrios §14)

  areaServed = SOLO cobertura REAL o VALIDADA.
  Nunca aspiracional. Nunca decorativo.

  ┌──────────────────────────────────────┬──────────────────────────────────┐
  │ Tipo                                  │ ¿Entra en areaServed?            │
  ├──────────────────────────────────────┼──────────────────────────────────┤
  │ Main City                             │ SIEMPRE (es la base)             │
  │ Direct LCAs (cobertura real validada) │ Sí                                │
  │ Candidate LCAs validadas (test 3/6)   │ Sí, si cobertura real verificada │
  │ Candidate LCAs sin validar            │ NO                                │
  │ Aspiracional / decorativo             │ NO                                │
  │ Zonas fuera de Main City              │ NO (D1 — solo barrios/distritos) │
  └──────────────────────────────────────┴──────────────────────────────────┘

  En caso de duda, prevalece la regla más estricta: NO meter una zona en
  areaServed si genera riesgo E-E-A-T (afirmar cobertura no real).

DISTINCIÓN ADDRESS vs AREASERVED (§5.10, §4.14)

  - address     = donde TIENES OFICINA física real (NAP)
  - areaServed  = donde DAS SERVICIO (puede incluir LCAs cercanas)

  Confundirlos viola la regla anti-falsa-ubicación.

SCHEMA POR PAGE TYPE — RESUMEN

Fuente: 02 docs chatgpt/00_PRINCIPIOS_NO_NEGOCIABLES_GMB_CRUSH.md
        + 5demayoconsolidado/PLANTILLA-CLUSTER/src/lib/schemas.ts

  Homepage             → Organization + WebSite                     (sin areaServed)
  Service Overview     → Service + WebPage + BreadcrumbList         (sin areaServed)
  LBS                  → LocalBusiness + FAQPage + BreadcrumbList   (CON areaServed)
  Additional Category  → Service + BreadcrumbList                   (CON areaServed)
  GeoHub               → CollectionPage + BreadcrumbList            (sin areaServed)
  GeoArticle           → Article + FAQPage + BreadcrumbList +       (sin areaServed)
                          Speakable
  Contacto             → ContactPage + Organization                  (sin areaServed)

═══════════════════════════════════════════════════════════════════════════════
  9. WORKFLOW DOCTRINAL COMPLETO
═══════════════════════════════════════════════════════════════════════════════

Fuente combinada: 01a-ejecucion-intake-form.md + 06a-ejecucion-estructura-...md
                  + 19a-ejecucion-acciones-futuro-escalado.md

PASO 1 — Cliente da NAP en preflight (Bloque 0)

PASO 2 — IA extrae Direct LCAs del NAP (§6.10 método "Direct")
         → Almagro, Chamberí (sin test, salen directas del barrio + distrito)

PASO 3 — IA consulta Local Pack (3-5 competidores top en Google Maps)

PASO 4 — IA filtra zonas en ≥2 competidores (no Direct)
         → Salamanca, Retiro, Centro, Tetuán, Chamartín, Arganzuela, ...

PASO 5 — IA aplica test GEO 3/6 a cada zona candidata
         → Si 3+/6 criterios → Candidate validable
         → Si <3/6 → descartada

PASO 6 — IA distribuye en la web según tabla §6.12:
         - Homepage: mención ligera global (preview)
         - SO: NO USA LCAs (sin ciudad)
         - LBS: intro + H2 cobertura + FAQs + areaServed (Direct)
         - AC: escenarios locales + areaServed
         - GeoHub: sección principal de cobertura
         - GeoArticle: ejemplos + landmarks

PASO 7 — Validación final (Paso 04 §4.9 + §4.14, Paso 09 §9.6):
         - 0 URLs /almagro/ o similares (LCAs no generan URLs)
         - 0 anchors hacia LCAs sin AEA (Paso 07 §7.8)
         - areaServed solo lista Direct + Main City
         - Sin "oficina en X" si X no es NAP
         - QA Regla 5 (Local Coverage QA)

PASO 8 — Build + Deploy: web LIVE con Phase 1 (E=0, sin AEA)

PASO 9 — Tracking ≥30 días post-deploy (GSC + GA4 + Rank Tracker)

PASO 10 — Paso 19 evalúa Triggers por cada Candidate LCA
          (ver sección 12 de este consolidado)

PASO 11 — Si una LCA cumple 2/3 Triggers + Escenario B SERP →
          DECISIÓN: CREAR sub-cluster expansion
          → output 19.5: URL Matrix v2 con Approved Expansion (E ≥ 1)
          → re-deploy con sub-cluster

═══════════════════════════════════════════════════════════════════════════════
 10. LAS 5 REGLAS DURAS DE LAS LCAs
═══════════════════════════════════════════════════════════════════════════════

Fuentes: 01a §6.10 + 04a §4.9 + 04a §4.14 + 06a §6.2 + 06a §6.17 + 07a §7.8

REGLA 1 — NO URLs
  Las LCAs NUNCA generan URLs base.
  Validación output 4.9: "LCAs no generan URLs"
  Fuente: 04a-ejecucion-url-rules.md §4.9

REGLA 2 — NO ANCHORS
  Las LCAs sin URL (todas las que no son AEA) NO reciben enlaces internos.
  Crear <a href="/almagro/"> hacia URL inexistente genera 404 + anchors rotos.
  Validación output 7.8: "LCAs sin URL no reciben enlaces"
  Fuente: 07a-ejecucion-internal-linking-rules.md §7.8

REGLA 3 — NO FALSA UBICACIÓN
  Mencionar LCA ≠ decir "tenemos oficina en LCA".
  areaServed (cobertura) ≠ address (presencia física).
  Confundirlos compromete E-E-A-T.
  Validaciones output 4.14 + 5.10
  Fuente: 04a-ejecucion-url-rules.md §4.14

REGLA 4 — MENCIÓN NATURAL EN CONTENIDO
  Las LCAs viven en intro, H2, FAQs, ejemplos, schema areaServed.
  No keyword stuffing, no listas de 40 zonas sin naturalidad.
  Validación output 6.2: "Principio 2 — LCAs enriquecen contenido"
  Fuente: 06a-ejecucion-estructura-contenido-areas-cobertura-local.md §6.2

REGLA 5 — AREASERVED = SOLO COBERTURA REAL O VALIDADA
  Schema areaServed solo lista Main City + LCAs (Direct o Candidate) cuya
  cobertura sea REAL o esté VALIDADA.
  NO incluye: Candidate sin validar, aspiracional, decorativo, ni zonas
  fuera de Main City (D1).
  Ver Sección 8 para la regla unificada completa.
  Validación output 6.17: "Schema areaServed coherente"
  Fuentes: 06a-...md §6.17 + doctrina-barrios §14 (decisión adoptada)

═══════════════════════════════════════════════════════════════════════════════
 11. VALIDACIONES CRUZADAS (CASCADA DE OUTPUTS)
═══════════════════════════════════════════════════════════════════════════════

LCAs aparecen como input heredado en múltiples outputs del sistema:

┌──────┬────────┬──────────────────────────────────────────────────────────┐
│ Paso │ Output │ Cómo usa LCAs                                            │
├──────┼────────┼──────────────────────────────────────────────────────────┤
│  02  │  2.5   │ LCAs NO afectan al recuento (S = servicios, no LCAs)    │
│  04  │  4.9   │ "LCAs no generan URLs" — validación URL Matrix          │
│  04  │  4.14  │ "No falsa ubicación" — validación NAP vs URLs           │
│  05  │  5.10  │ "No false location claims" — validación content         │
│  06  │  6.2   │ Principio 2 — LCAs enriquecen contenido                 │
│  06  │  6.10  │ Architecture LBS incluye H2 cobertura LCAs              │
│  06  │  6.12  │ Tabla 6×2 de uso por page type                          │
│  06  │  6.17  │ Schema areaServed coherente                             │
│  07  │  7.8   │ LCAs sin URL no reciben enlaces                         │
│  09  │  9.6   │ QA Regla 5 — Local Coverage QA                          │
│  11  │ 11.10  │ inject_local_coverage() — función automatización        │
│  19  │  19.2  │ Triggers para promover LCA → AEA                        │
└──────┴────────┴──────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
 12. PROTOCOLO DE LOS 3 TRIGGERS (PASO 19 — ESCALADO)
═══════════════════════════════════════════════════════════════════════════════

Fuente: 19a-ejecucion-acciones-futuro-escalado.md
        (07 ejecucion-docs/.../Bloque 5 Salida a Mercado/02 Ejecución/
        19a-ejecucion-acciones-futuro-escalado.md, sección §6)

CONTEXTO
  Tras lanzar la web base (Phase 1, E=0), la IA evalúa post-launch (≥30 días)
  cada Candidate LCA para decidir si se promociona a AEA. La regla es 2-de-3
  Triggers + análisis SERP doble búsqueda.

LOS 3 TRIGGERS (regla 2-de-3)

  TRIGGER 1 — Location ya responde:
    - Impresiones >100/mes en GSC (en LBS Madrid)
    - Clicks reales >10/mes
    - Al menos 1 keyword en posición <30

  TRIGGER 2 — GeoArticles traen tráfico:
    - Al menos 1 GA con impresiones >50/mes
    - Al menos 1 GA con clicks >5/mes
    - Posición media <40 para alguna keyword del artículo

  TRIGGER 3 — Señal en SERP:
    - SERP del barrio difiere de la SERP de ciudad
    - 3+ resultados específicos del barrio
    - Google mantiene la intención al añadir el barrio

DECISIÓN POR REGLA 2-DE-3

  3/3 → se puede crear (alta confianza)
  2/3 → se puede crear (suficiente)
  1/3 → NO escalar, reevaluar en 4-8 semanas
  0/3 → NO escalar

PROTOCOLO SERP DOBLE BÚSQUEDA (output 19.3)

  Compara la SERP de [servicio] [ciudad] vs [servicio] [barrio]:

  ESCENARIO A — sin segmentación:
    Google muestra mismas URLs/dominios en ambas búsquedas.
    Decisión: NO CREAR (Google no segmenta intención por barrio).

  ESCENARIO B — con segmentación:
    Google muestra resultados específicos del barrio.
    3+ URLs orientadas al barrio en SERP.
    Google mantiene intención comercial al añadir el barrio.
    Decisión: CREAR si Triggers 1+2 están activos.

OUTPUT 19.5 — URL MATRIX V2

  Si decisión = CREAR:
    Aplicar generate_expansion() (función Paso-11 11.11)
    URL Matrix v2 = URL Matrix v1 + sub-cluster Approved Expansion
    Sub-cluster = 1 GH + S LBS + G·S GAs nuevas (por barrio aprobado)
    Re-deploy con E ≥ 1

═══════════════════════════════════════════════════════════════════════════════
 13. EJEMPLO APLICADO: CERRAJEROS MADRID 24H
═══════════════════════════════════════════════════════════════════════════════

Fuente: 01a-ejecucion-intake-form.md §18
        (07 ejecucion-docs/.../01a-...md, líneas 1443-1457)

DIRECCIÓN FÍSICA: Rafael Calvo 40, Madrid

DECISIONES POR ZONA

┌──────────────┬──────────────────────────────────────────────┐
│ Zona         │ Decisión correcta                            │
├──────────────┼──────────────────────────────────────────────┤
│ Madrid       │ Main City — crea arquitectura base          │
│ Almagro      │ Direct LCA — señal GEO directa, sin URL     │
│ Chamberí     │ Direct LCA — señal GEO directa, sin URL     │
│ Salamanca    │ Candidate — validar proximidad/demanda/comp │
│ Retiro       │ Candidate — validar antes de usar fuerte    │
│ Centro       │ Candidate — no automática                   │
│ Tetuán       │ Candidate — no automática                   │
│ Chamartín    │ Candidate — no automática                   │
│ Arganzuela   │ Candidate — no automática                   │
└──────────────┴──────────────────────────────────────────────┘

CONFIGURACIÓN PHASE 1

  Output 1.7  Main City                = Madrid
  Output 1.10 Direct LCAs              = Almagro, Chamberí
  Output 1.10 Candidate LCAs           = Salamanca, Retiro, Centro,
                                          Tetuán, Chamartín, Arganzuela,
                                          Moncloa, Prosperidad
  Output 1.11 Approved Expansion Areas = None in Phase 1 (E=0)

URLS GENERADAS (1+S+1+S+A+G·S = 1+5+1+5+2+15 = 29 SEO + 3 AUX = 32)

  /                                              ← Homepage
  /cerrajero/cerrajero-urgente/                   ← SO (sin Madrid)
  /cerrajero/apertura-puertas/                    ← SO
  /cerrajero/cambio-cerraduras/                   ← SO
  /cerrajero/cambio-bombines/                     ← SO
  /cerrajero/instalacion-cerraduras-seguridad/    ← SO
  /madrid/                                        ← GeoHub
  /cerrajero/madrid/cerrajero-urgente/            ← LBS
  /cerrajero/madrid/apertura-puertas/             ← LBS
  /cerrajero/madrid/cambio-cerraduras/            ← LBS
  /cerrajero/madrid/cambio-bombines/              ← LBS
  /cerrajero/madrid/instalacion-cerraduras-seguridad/ ← LBS
  /cerrajero/madrid/duplicado-llaves/             ← AC
  /cerrajero/madrid/cerrajero-emergencia-24h/     ← AC
  /madrid/cuanto-cuesta-cerrajero-urgente/        ← GA
  /madrid/precio-cambiar-bombin/                  ← GA
  ... (15 GAs total)
  /contacto/                                      ← AUX
  /aviso-legal/                                   ← AUX
  /privacidad/                                    ← AUX

URLS QUE NO SE CREAN

  /almagro/                                       ← LCA, no genera URL
  /chamberi/                                      ← LCA, no genera URL
  /salamanca/                                     ← LCA, no genera URL
  /cerrajero/almagro/cerrajero-urgente/           ← LCA, no AEA
  /cerrajero/salamanca/apertura-puertas/          ← LCA, no AEA

USO EN CONTENIDO Y SCHEMA

  Homepage (/)                          : mención ligera "cobertura Madrid + barrios"
  Service Overview (/cerrajero/X/)       : NO menciona barrios (es general)
  LBS (/cerrajero/madrid/X/)            : H2 cobertura con Almagro, Chamberí,
                                           Salamanca, Retiro
                                           Schema areaServed: Madrid + 4 Direct/Candidate
                                           validados con test 3/6
  Additional Category (/cerrajero/madrid/duplicado-llaves/) : escenarios locales
  GeoHub (/madrid/)                     : sección principal "Cobertura en Madrid"
                                           con TODAS las LCAs (Direct + Candidate)
  GeoArticle (/madrid/X/)               : referencias a barrios cuando aporten
                                           contexto al topic

ESCALADO POST-LAUNCH (Phase 2 hipotética)

  Si Almagro cumple 2/3 Triggers a los 60 días:
    → Decisión CREAR
    → Sub-cluster: /madrid/almagro/ (GH) + 5 LBS + 15 GAs nuevas
    → Output 1.11 actualizado: Almagro
    → URL Matrix v2 con E=1
    → Re-deploy

NOTA: Almagro es Direct LCA. La doctrina permite que cualquier LCA (Direct o
Candidate) sea promocionada a AEA — confirmado en doctrina-barrios §9 que usa
literalmente Almagro como ejemplo de promoción a AEA. La promoción no se
restringe a Candidate.

NOTA D1: cualquier promoción a AEA es por barrio/distrito dentro de Main City.
NUNCA por ciudad alternativa. Si el negocio quiere expandirse a otra ciudad
(ej. Toledo), eso requiere un cluster nuevo con preflight nuevo y Main City
distinta — no es una AEA.

═══════════════════════════════════════════════════════════════════════════════
 14. VARIANTES ENTRE REPOS ANTIGUOS (02-06)
═══════════════════════════════════════════════════════════════════════════════

Resultado de auditar los 6 repos numerados de repos-antiguos:

REPO 02 — docs chatgpt
  Naturaleza: doctrina abstracta destilada por ChatGPT
  Test cuantitativo: NO
  Concepto LCA: implícito ("barrios como referencias locales en contenido")
  Schemas: define areaServed por familia
  Útil para: principios genéricos, schemas
  Archivos relevantes:
    00_PRINCIPIOS_NO_NEGOCIABLES_GMB_CRUSH.md
    00_MATRIZ_FAMILIAS_Y_SCHEMA_GMB_CRUSH.md
    DOC_A...E_template.md (templates cliente)

REPO 03 — gmb crush (sistema operativo por escenarios)
  Naturaleza: 4 escenarios (sin/con web/GBP) + base transversal
  Test cuantitativo: NO
  Concepto LCA: define "Zona" como output 3.12 (cualitativo)
  Jerarquía territorial DISTINTA del canon:
    "Cluster geográfico, ciudad núcleo, ciudades primarias/secundarias y
     zonas de soporte"
  Útil para: contexto histórico, evolución doctrinal
  Archivos relevantes:
    sistema_operativo/00_BASE_DEL_SISTEMA_GMB.md (define entidades 3.12, 3.13)
    sistema_operativo/REVISION_DE_COBERTURA_GMB.md (auditoría 14 principios)
    sistema_operativo/0X_ESCENARIO_*.md (4 escenarios)

REPO 04 — gmb crush 23 abril (fases A-F + Master Framework)
  Naturaleza: estructurado por fases (HIPÓTESIS, CONTRASTE, DISEÑO, ...)
  Test cuantitativo: SÍ — 3 de 5 SEÑALES
  Las 5 señales (línea 207-213 de 03_FASE_A_HIPOTESIS_INICIAL/01_INPUT.md):
    1. demanda local visible
    2. presencia en competidores
    3. prioridad comercial
    4. contenido único posible
    5. objetivo explícito del negocio
  Jerarquía territorial:
    Ciudad principal + operativas + análisis (Nivel I, II) + barrios/zonas
    pageEligible flag por defecto false en análisis
  Output template UNIQUE:
    | Barrio/zona | Señales | Uso recomendado | Prioridad |
    Uso recomendado ∈ {context, geoarticle, own_page, backlog}
  Útil para: taxonomía operativa de uso de barrios
  Archivos relevantes:
    Modo_Conocimiento/01_GMB_Crush_Master_Framework.md
    Modo_Conocimiento/02_GMB_Crush_Doctrina_Operativa.md
    Modo_Ejecutar/.../03_FASE_A_HIPOTESIS_INICIAL/01_INPUT.md (test 3/5)
    Modo_Ejecutar/.../03_FASE_A_HIPOTESIS_INICIAL/02_OUTPUT_TEMPLATE.md (tabla)
    Modo_Ejecutar/.../03_FASE_A_HIPOTESIS_INICIAL/04_QA_CHECKLIST.md

REPO 05 — sistema-ejecutable-4-mayo (sistema previo)
  Naturaleza: sistema ejecutable v2 (Astro + outputs.json + scripts)
  Test cuantitativo: NO duplica — referencia a 07
  Concepto LCA: heredado de la doctrina canónica
  Útil para: ver matriz-cobertura.md (mapeo viejo → nuevo)
  Archivos relevantes:
    doctrina/page-types.md
    doctrina/url-patterns.md
    doctrina/linking.md
    doctrina/qa-rules.md
    matriz-cobertura.md
    clientes/2026-05-aeroeterm/outputs.json (cliente real)

REPO 06 — local-seo-framework
  Naturaleza: vacío (1 archivo, 1 KB)
  Sin contenido relevante.

REPO 07 — ejecucion-docs (CANÓNICO)
  Naturaleza: doctrina condensada con esqueleto canónico Bloques I/II/III/IV
  Test cuantitativo: SÍ — 3 DE 6 CRITERIOS (versión final)
  Concepto LCA: completo (Direct + Candidate + AEA)
  Útil para: doctrina operativa final
  Archivos clave:
    01 Teoria/02 ejecución/Bloque 1 Fundamentos/02 Ejecución/01a-...md
        (definición + criterios + test 3/6)
    01 Teoria/02 ejecución/Bloque 2 Arquitectura/02 Ejecución/06a-...md
        (cómo aparecen en la web)
    01 Teoria/02 ejecución/Bloque 5 Salida a Mercado/02 Ejecución/19a-...md
        (Triggers + protocolo SERP)

REPO 08 — repos-1-y-2 (HISTÓRICO PRE-CONDENSACIÓN)
  Naturaleza: versión cruda original
  Útil para: ejemplos de clientes reales (Cerrajeros Madrid, Miami ABC)
  Archivos clave:
    01 Sistema Completo/04 Varios/Sistema_ Vision Completa/paso-13/
        13-sistema-final-operativo.md (vista global)

EVOLUCIÓN CRONOLÓGICA DEL CONCEPTO

  02 docs chatgpt          → "menciónalos como referencias" (sin test)
        ↓
  03 gmb crush             → "no toda zona merece URL" (cualitativo)
        ↓
  04 gmb crush 23 abril    → test 3/5 + pageEligible (primera versión cuantitativa)
        ↓
  05 sistema-ejecutable    → referencia a 07 sin duplicar
        ↓
  07 ejecucion-docs        → test 3/6 + Direct/Candidate/AEA (canon repo)
        ↓
  doctrina-barrios-distritos-zonas-gmb-crush.md → reglas estrictas adicionales:
        - areaServed solo cobertura real/validada (más restrictivo)
        - Direct puede ser AEA (no solo Candidate)
        ↓
  Decisión doctrinal D1 (este consolidado, rev 2):
        - LCAs y AEAs solo barrios/distritos dentro de Main City

═══════════════════════════════════════════════════════════════════════════════
 14 BIS. DECISIONES DOCTRINALES (resoluciones operativas)
═══════════════════════════════════════════════════════════════════════════════

Este bloque registra decisiones doctrinales tomadas para resolver ambigüedades
heredadas de los repos. Cada decisión es vinculante para el sistema actual.

───────────────────────────────────────────────────────────────────────────────
D1 — LCAs y AEAs son SOLO barrios/distritos dentro de la Main City
───────────────────────────────────────────────────────────────────────────────

Decisión:
  Las Local Coverage Areas (LCAs) y Approved Expansion Areas (AEAs) son
  EXCLUSIVAMENTE barrios o distritos dentro de la Main City. Nunca otras
  ciudades, municipios cercanos, áreas metropolitanas alternativas, ni
  comunidades autónomas.

Ambigüedad que resuelve:
  La doctrina canónica del repo 07 no aclara qué pasa si una zona es otra
  ciudad. El criterio 2 del test 3/6 ("¿pertenece a Main City?") quedaba
  como evaluativo, abriendo la puerta a incluir Alcobendas como Candidate
  LCA si pasaba 3/6.

Implicaciones operativas:
  1. El criterio 2 del test 3/6 pasa de "evaluativo" a FILTRO PREVIO
     OBLIGATORIO. Si la zona NO está dentro de Main City → descartada antes
     de evaluar el resto del test.
  2. Cuando la IA consulta el Local Pack: competidores que cubren otras
     ciudades NO generan Candidate LCA.
  3. Expansión a OTRA ciudad ≠ AEA. Eso es un cluster nuevo con preflight
     nuevo y Main City distinta.
  4. El catálogo de exclusiones queda explícito:
       - Otras ciudades de la misma provincia
       - Municipios cercanos (aunque haya tráfico)
       - Áreas metropolitanas que NO son la Main City misma
       - Comunidades autónomas
       - "Mercados secundarios" geográficamente distintos

Aplicación en este consolidado:
  - Sección 4 (Test GEO 3/6): añadido filtro previo OBLIGATORIO antes del
    test. La regla aplicada queda como "filtro previo + 2 de 5 efectivos".
  - Sección 1, NOTA D1: añadida aclaración en la cita literal.
  - Sección 13 NOTA D1: aclaración sobre expansión a otra ciudad = nuevo
    cluster.
  - Sección 8 (areaServed): exclusión explícita de zonas fuera de Main City.

───────────────────────────────────────────────────────────────────────────────
D2 — areaServed = solo cobertura REAL o VALIDADA (no solo Direct)
───────────────────────────────────────────────────────────────────────────────

Decisión:
  El schema areaServed solo incluye Main City + LCAs (Direct o Candidate)
  cuya cobertura sea REAL o esté VALIDADA. No se restringe solo a Direct.

Ambigüedad que resuelve:
  El repo canónico (07) decía "areaServed = Main City + Direct".
  El doc doctrina-barrios §14 era más estricto: "solo cobertura real o
  validada, sin importar si es Direct o Candidate".
  Mi consolidado original mezclaba ambas reglas creando contradicción.

Resolución:
  Se adopta la regla del doc doctrina-barrios §14 por ser más conservadora
  y proteger mejor contra E-E-A-T comprometido. La validación de cobertura
  real es el criterio rector, no el origen de la zona (Direct vs Candidate).

Aplicación en este consolidado:
  - Sección 8: regla unificada con tabla explícita.
  - Sección 10 Regla 5: reformulada coherente con Sección 8.
  - Resumen final: actualizado.

───────────────────────────────────────────────────────────────────────────────
D3 — Direct LCAs pueden ser promocionadas a AEA
───────────────────────────────────────────────────────────────────────────────

Decisión:
  Cualquier LCA (Direct o Candidate) puede ser promocionada a AEA si
  cumple los Triggers post-launch. La promoción NO se restringe a Candidate.

Ambigüedad que resuelve:
  No estaba claro en el repo canónico si las Direct (que ya están en
  areaServed y contenido) podían además generar URLs propias.

Resolución:
  Confirmado por doctrina-barrios §9 que usa literalmente Almagro (Direct)
  como ejemplo de promoción a AEA. Las Direct sí pueden ser AEA.

Aplicación en este consolidado:
  - Sección 13 NOTA: aclarada que Almagro como ejemplo de AEA es válido.

───────────────────────────────────────────────────────────────────────────────
AMBIGÜEDADES PERSISTENTES (no resueltas aún)
───────────────────────────────────────────────────────────────────────────────

A1. ¿Direct LCAs pasan formalmente por el test 3/6?
    El test se aplica a Candidate. Direct cumplen automáticamente criterios
    1+2 pero el repo no aclara si "se les exime" o "lo pasan implícitamente".
    Estado: ambigüedad heredada. Operativamente irrelevante (Direct entran
    al sistema sin reevaluación).

═══════════════════════════════════════════════════════════════════════════════
 15. ARCHIVOS RECOMENDADOS PARA LECTURA
═══════════════════════════════════════════════════════════════════════════════

PRIORIDAD 1 — Si solo lees 1 archivo (60 min)
  07 ejecucion-docs/01 Teoria Leer antes de Ejecutar/02 ejecución/Bloque 1
  Fundamentos/02 Ejecución/01a-ejecucion-intake-form.md
  → §6.10 (LCAs Direct/Candidate)
  → §6.11 (AEAs)
  → Bloque IV §9-§19 (test 3/6 + criterios + ejemplo aplicado)

PRIORIDAD 2 — Si lees 2 archivos (90 min)
  Añade:
  07 ejecucion-docs/.../Bloque 2 Arquitectura/02 Ejecución/
  06a-ejecucion-estructura-contenido-areas-cobertura-local.md
  → Tabla §6.12 (uso por page type)
  → §6.13 (ejemplo cobertura)
  → §6.14 (FAQ ejemplo)
  → §6.17 (areaServed)

PRIORIDAD 3 — Si lees 3 archivos (120 min)
  Añade:
  07 ejecucion-docs/.../Bloque 5 Salida a Mercado/02 Ejecución/
  19a-ejecucion-acciones-futuro-escalado.md
  → Los 3 Triggers
  → Protocolo SERP doble búsqueda
  → Output 19.5 URL Matrix v2

PRIORIDAD 4 — Para taxonomía operativa adicional (30 min)
  04 gmb crush 23 abril/Modo_Ejecutar/01_web_cloudflare_gbp/
  03_ejecucion_ia/01_docs_ejecucion/03_FASE_A_HIPOTESIS_INICIAL/
  → 01_INPUT.md (test 3/5 alternativo)
  → 02_OUTPUT_TEMPLATE.md (tabla con uso recomendado)

PRIORIDAD 5 — Validaciones cruzadas (30 min)
  07 ejecucion-docs/.../Bloque 2 Arquitectura/02 Ejecución/
  04a-ejecucion-url-rules.md
  → §4.9 (LCAs no generan URLs)
  → §4.10 (Approved Expansion URLs)
  → §4.14 (No falsa ubicación)

  07 ejecucion-docs/.../Bloque 2 Arquitectura/02 Ejecución/
  07a-ejecucion-internal-linking-rules.md
  → §7.8 (LCAs sin URL no reciben enlaces)
  → §7.15 (Expansion linking separado)

═══════════════════════════════════════════════════════════════════════════════
  RESUMEN DE 1 PÁGINA
═══════════════════════════════════════════════════════════════════════════════

LAS 3 CAPAS (D1: SOLO BARRIOS/DISTRITOS DENTRO DE MAIN CITY)
  Main City  = Madrid (output 1.7)         → arquitectura base completa
  LCA        = barrios/distritos de Madrid → señales GEO, NO URLs
  AEA        = LCA promocionada (1.11)     → URL propia, default vacío
  Otra ciudad → NUEVO CLUSTER, no AEA

LCAS: DIRECT vs CANDIDATE
  Direct     = del NAP, cumple criterios 1+2 del test automáticamente
  Candidate  = ≥2 competidores + filtro previo D1 (dentro de Main City)
               + test GEO ≥3/6

TEST GEO (con D1 aplicada):
  Filtro previo OBLIGATORIO: ¿pertenece a Main City? (es barrio/distrito)
  Si pasa → test sobre 6 criterios, mínimo 3:
    1 Ancla física | 2 Main City | 3 Proximidad
    4 Intención local | 5 Demanda/competencia | 6 NO falsa ubicación

DÓNDE APARECEN LAS LCAS:
  Homepage: ligero | SO: NO | LBS: sí | AC: sí | GH: sección principal | GA: sí

AREASERVED (regla unificada D2):
  Main City + LCAs (Direct o Candidate) con cobertura REAL o VALIDADA.
  NO aspiracional, NO decorativo, NO zonas fuera de Main City.

REGLAS DURAS:
  1 NO URLs (LCAs)        | 2 NO anchors hacia LCAs sin AEA
  3 NO falsa ubicación    | 4 Mención natural en contenido
  5 areaServed = real/validada (Direct o Candidate, D2)

PROMOCIÓN LCA → AEA (post-launch ≥30 días):
  Cualquier LCA (Direct o Candidate, D3) puede promocionarse.
  Triggers (2 de 3): Location responde + GAs traen tráfico + Señal SERP
  + Protocolo SERP doble búsqueda (Escenario A o B)
  + 7 criterios Bloque IV §17 (incluyendo "no fingir oficina")
  + Filtro D1: solo barrios/distritos dentro de Main City.

DECISIONES DOCTRINALES APLICADAS:
  D1 — LCAs y AEAs solo barrios/distritos en Main City
  D2 — areaServed solo cobertura real/validada (no solo Direct)
  D3 — Direct LCAs pueden promocionarse a AEA

═══════════════════════════════════════════════════════════════════════════════
                              FIN DEL CONSOLIDADO
═══════════════════════════════════════════════════════════════════════════════
