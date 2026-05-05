# Test de Implementación Doctrinal GMB Crush — Pre-Build

Este test se aplica **a la documentación pre-build** que produce la IA para un cluster GMB Crush, **antes de generar la web**. Evalúa si las decisiones declaradas (URL Matrix, Page Type Map, Schema Map, Internal Linking Plan, Content Pack, Outputs Consolidados) reflejan la doctrina GMB Crush.

No evalúa HTML real, sitemap publicado, ni runtime. Eso pertenece a otros tests (`Web Live Ready`, `QA técnico`, `GBP Safe`, `Post-lanzamiento`).

> **Cuándo se ejecuta:** después de Bloque 4 (Automatización), antes del Paso 17 (Build) y Paso 18 (Deploy). Es el **gate doctrinal pre-build**: si los docs no pasan, no se construye nada.

---

# Objetivo del test

La pregunta principal es:

```text
¿La documentación pre-build refleja correctamente la doctrina GMB Crush?
```

Este test evalúa que los siguientes elementos estén DECLARADOS y sean DOCTRINALMENTE COHERENTES en los docs:

```text
arquitectura
jerarquía de páginas
función de cada Page Type
patrones URL
Main City
Local Coverage Areas
Approved Expansion Areas
interlinking
schema por tipo
contenido por intención
no canibalización
soporte GBP
GeoArticles
GeoHub
Additional Category Pages
AI Overview / NLP readiness
trazabilidad doctrinal
```

---

# Qué NO evalúa este test

Este test no evalúa:

```text
si la web está construida
si el HTML se renderiza correctamente
si el sitemap.xml está publicado
si el dominio responde 200 OK
si el schema JSON-LD está embebido en el HTML
si el teléfono es real
si el email es real
si hay fotos reales
si el formulario funciona
si el GBP está verificado
si hay reseñas reales
si Google Search Console está conectado
si GA4 mide conversiones
```

Esos chequeos pertenecen a:

```text
Web Live Ready (post-deploy)
QA técnico (post-build)
GBP Safe (post-GBP)
Post-lanzamiento (≥30 días con tráfico)
```

---

# 1. Test de arquitectura GMB Crush

## Pregunta central

```text
¿Los docs declaran la arquitectura completa que dicta GMB Crush?
```

## Checks (sobre la URL Matrix + Page Type Map)

| Check | Criterio |
|---|---|
| Homepage | Está declarada como Root Entity Anchor (Page Type = HP). |
| Service Overview Pages | Declaradas para cada servicio core, sin ciudad. |
| Location-Based Service Pages | Declaradas para cada servicio en Main City. |
| Additional Category Pages | Declaradas solo para categorías adicionales efectivas (`needs_page = true`). |
| GeoHub | Declarado como contenedor de Main City. |
| GeoArticles | Declarados como boosters semánticos (no landings). |
| Contacto | Declarado como página auxiliar (no Page Type SEO). |

## Fallo doctrinal grave

```text
La URL Matrix solo lista homepage + servicios genéricos y no separa Service Overview, LBS, GeoHub y GeoArticles.
```

## Resultado esperado

```text
PASS si cada Page Type aparece declarado en URL Matrix + Page Type Map con función diferenciada.
FAIL si los docs mezclan tipos o reducen todo a landings.
```

---

# 2. Test de fórmula base

## Pregunta central

```text
¿La IA ha derivado la URL Matrix desde la fórmula GMB Crush, o ha listado URLs a ojo?
```

## Fórmula doctrinal

```text
1 Homepage
+ S Service Overview Pages
+ 1 Main City GeoHub
+ S Main City Location-Based Service Pages
+ A Main City Additional Category Pages
+ G × S Main City GeoArticles
```

## Checks

| Check | Criterio |
|---|---|
| S declarada | Variable S (servicios core) está documentada con valor numérico. |
| A declarada | Variable A (additional categories efectivas) está documentada con valor. |
| G declarada | Variable G (GeoArticles por servicio) está documentada. |
| Main City | Declarada como multiplicador base; aparece en todos los outputs LBS/GH/GA. |
| LCAs | Declaradas pero sin generar URL en URL Matrix. |
| Approved Expansion Areas | Si existen, listadas con justificación; solo estas multiplican. |
| Total | El número de filas en URL Matrix coincide con `1 + S + 1 + S + A + G·S`. |

## Fallo doctrinal grave

```text
La URL Matrix lista páginas por barrios, zonas o servicios sin derivarlas de la fórmula.
```

---

# 3. Test de patrones URL

## Pregunta central

```text
¿Las URLs declaradas en URL Matrix respetan los patrones doctrinales?
```

## Patrones correctos

```text
Homepage:
/

Service Overview:
/[category]/[service]/

Location-Based Service:
/[category]/[city]/[service]/

GeoHub:
/[city]/

Additional Category:
/[category]/[city]/[additional-category]/

GeoArticle:
/[city]/[topic]/

Contacto:
/contacto/
```

## Checks (sobre URL Matrix)

| URL Type | Debe cumplir |
|---|---|
| Service Overview | URL declarada NO lleva ciudad. |
| LBS | URL declarada lleva categoría + ciudad + servicio. |
| GeoHub | URL declarada es contenedor de ciudad (`/[city]/`). |
| GeoArticle | URL declarada es ciudad + topic (`/[city]/[topic]/`). |
| Local Coverage Areas | NO aparecen como URLs en URL Matrix. |
| Approved Expansion Areas | Si existen, generan URLs propias declaradas. |

## Fallo doctrinal grave

```text
URL Matrix lista /cerrajero/almagro/cerrajero-urgente/ sin que Almagro figure como Approved Expansion Area.
```

---

# 4. Test Main City vs Local Coverage Areas

## Pregunta central

```text
¿Los docs entienden que Main City crea arquitectura y Local Coverage Areas solo refuerzan señales GEO?
```

## Checks (sobre Output 1.7 + 1.10 + URL Matrix + Schema Map)

| Elemento | Criterio |
|---|---|
| Main City | Declarada (Output 1.7); genera GeoHub, LBS y GeoArticles en URL Matrix. |
| Direct LCA | Declaradas (Output 1.10); aparecen como `areaServed` en Schema Map y en copy de páginas, NO como URLs. |
| Candidate LCA | Declaradas; se usan solo si están validadas o como contexto suave. |
| Approved Expansion Area | Solo estas pueden generar URLs propias en URL Matrix. |
| areaServed declarado | Schema Map asigna `areaServed` que NO incluye zonas no validadas. |
| Falsa ubicación | Content Pack NO declara oficinas físicas en zonas inexistentes. |

## Fallo doctrinal grave

```text
URL Matrix convierte Candidate Local Coverage Areas en páginas propias.
```

## Fallo doctrinal grave adicional

```text
Content Pack declara “oficina en Salamanca” sin que Salamanca esté declarada como ubicación real (Output 1.4 NAP).
```

---

# 5. Test de Page Type Fidelity

## Pregunta central

```text
¿El Page Type Map asigna a cada URL una función coherente con la doctrina, sin mezclar tipos?
```

## Checks por tipo

| Page Type | Debe declarar | NO debe declarar |
|---|---|---|
| Homepage | Anclar entidad, marca, servicio principal, ciudad, NAP, servicios, trust, links a SO + GH + Contacto. | Competir con todas las LBS. |
| Service Overview | Explicar un servicio sin ciudad como target principal; CTA hacia LBS hijo. | Convertirse en “servicio en Madrid”. |
| LBS | Convertir por servicio + ciudad; FAQs específicas; areaServed con LCAs. | Mezclar varios servicios o barrios como sedes. |
| Additional Category | Soportar categoría adicional GBP; declarado solo si `needs_page = true`. | Convertirse en core service si no lo es. |
| GeoHub | Agrupar ciudad, servicios, artículos y categorías; índice. | Ser solo una lista de enlaces sin contexto. |
| GeoArticle | Responder intención long-tail; CTA suave hacia LBS. | Vender como landing principal. |

## Fallo doctrinal grave

```text
El Content Pack de un GeoArticle declara CTA agresivo, replica el contenido de la LBS y se comporta como landing.
```

---

# 6. Test de Service Overview

## Pregunta central

```text
¿Las Service Overview declaradas son realmente páginas de servicio sin ciudad?
```

## Checks (sobre Content Pack + URL Matrix + Schema Map)

| Check | Criterio |
|---|---|
| URL declarada | `/[category]/[service]/` (sin ciudad) |
| H1 declarado | Servicio (no servicio + ciudad como target principal) |
| Contenido | Explica servicio, proceso, problemas, entidades y FAQs |
| CTA declarado | Empuja hacia LBS hijo (`/[category]/[city]/[service]/`) |
| Internal links declarados | Enlaza a LBS, servicios laterales, GeoArticles |
| Schema | Service + WebPage + BreadcrumbList |

## Fallo doctrinal grave

```text
H1 declarado: "Cerrajero urgente en Madrid"
URL declarada: /cerrajero/cerrajero-urgente/
```

Eso mezcla Service Overview con LBS.

---

# 7. Test de Location-Based Service Page

## Pregunta central

```text
¿Las LBS declaradas cumplen servicio + ciudad + conversión?
```

## Checks (sobre Content Pack + URL Matrix + Schema Map + Internal Linking Plan)

| Check | Criterio |
|---|---|
| URL declarada | `/[category]/[city]/[service]/` |
| H1 declarado | Servicio + ciudad |
| Intro declarada | Contexto local real |
| H2s declarados | Profundidad, intención, proceso, confianza, CTA |
| LCAs | Declaradas como señales GEO en copy/areaServed, no como URLs |
| FAQs declaradas | Servicio + ciudad |
| Schema | LocalBusiness + FAQPage + BreadcrumbList |
| Links declarados | Parent SO + GH + GAs hijas + AC laterales |

## Fallo doctrinal grave

```text
La LBS declara internal links sin enlazar a su Service Overview padre.
```

## Fallo doctrinal grave adicional

```text
La LBS declara "10 barrios como sedes físicas" en el Content Pack.
```

---

# 8. Test de Additional Category Page

## Pregunta central

```text
¿Las AC declaradas soportan una categoría adicional GBP real sin romper la fórmula de servicios core?
```

## Checks

| Check | Criterio |
|---|---|
| Existe solo si `needs_page = true` | Declarado en Output 1.6 (Additional Categories) |
| URL declarada | `/[category]/[city]/[additional-category]/` |
| H1 declarado | Categoría/servicio adicional + ciudad |
| Contenido declarado | Soporta entidad GBP |
| Links declarados | GeoHub + LBS relacionadas + Contacto |
| Schema | Service + BreadcrumbList (sin LocalBusiness) |
| No core service | Si NO es servicio core, no altera S |

## Fallo doctrinal grave

```text
"Duplicado de llaves" pasa a core service en URL Matrix sin decisión previa documentada.
```

---

# 9. Test de GeoHub

## Pregunta central

```text
¿El GeoHub declarado funciona como contenedor de ciudad?
```

## Checks

| Check | Criterio |
|---|---|
| URL declarada | `/[city]/` |
| Función declarada | Agrupar servicios, categorías, artículos y cobertura |
| Internal Linking Plan | Lista todas las LBS de la ciudad |
| Additional Category | Incluida en Internal Linking Plan si existe |
| GeoArticles | Listados y agrupados |
| LCAs | Declaradas como sección de cobertura o contexto |
| Schema | CollectionPage + BreadcrumbList |

## Fallo doctrinal grave

```text
El Content Pack de /madrid/ declara solo 5 enlaces y nada de contenido propio.
```

---

# 10. Test de GeoArticles

## Pregunta central

```text
¿Los GeoArticles declarados son boosters semánticos y no landings encubiertas?
```

## Checks

| Check | Criterio |
|---|---|
| URL declarada | `/[city]/[topic]/` |
| Tema declarado | Servicio + ciudad + long-tail |
| Intención declarada | Informacional o precomercial |
| H1 declarado | Pregunta o tema + ciudad |
| CTA declarado | Suave, hacia la LBS padre |
| Internal links declarados | LBS + GeoHub + artículos relacionados |
| Schema | Article + FAQPage + BreadcrumbList + Speakable |
| Contenido declarado | NO duplica el de la LBS |

## Fallo doctrinal grave

```text
El Content Pack del artículo "cuánto cuesta..." declara CTA agresivo, copy de venta y no responde la pregunta.
```

## Fallo doctrinal grave adicional

```text
Internal Linking Plan del artículo no enlaza a su LBS padre.
```

---

# 11. Test de Internal Linking Doctrine

## Pregunta central

```text
¿El Internal Linking Plan conecta la arquitectura como GMB Crush exige?
```

## Mapa esperado (declarado en Internal Linking Plan)

```text
Homepage → Service Overview + GeoHub + Contacto
Service Overview → LBS hijo + servicios laterales
LBS → Service Overview padre + GeoHub + GeoArticles + Contacto
GeoHub → todas las LBS + Additional Category + GeoArticles
GeoArticle → LBS padre + GeoHub + artículos relacionados
Additional Category → GeoHub + LBS relacionadas
```

## Checks

| Check | Criterio |
|---|---|
| No páginas huérfanas | Toda página declarada en URL Matrix tiene ≥1 enlace entrante en el plan |
| Anchors contextuales | Internal Linking Plan declara anchor por enlace |
| No enlaces a URLs inexistentes | Cada enlace destino existe en URL Matrix |
| Breadcrumbs | Schema Map asigna BreadcrumbList al Page Type que aplica |
| Links padre/hijo | Plan declara la jerarquía padre→hijo (HP→SO→LBS, GH→LBS) |
| Links laterales | Plan declara enlaces semánticos (SO→servicios laterales, LBS→AC) |

## Fallo doctrinal grave

```text
GeoArticles declarados sin enlace a la LBS padre en el Internal Linking Plan.
```

---

# 12. Test de Schema Doctrine

## Pregunta central

```text
¿El Schema Map asigna schema por Page Type según la doctrina (no genérico)?
```

## Mapa doctrinal

| Page Type | Schema esperado |
|---|---|
| Homepage | Organization + WebSite |
| Service Overview | Service + WebPage + BreadcrumbList |
| LBS | LocalBusiness + FAQPage + BreadcrumbList |
| Additional Category | Service + BreadcrumbList |
| GeoHub | CollectionPage + BreadcrumbList |
| GeoArticle | Article + FAQPage + BreadcrumbList + Speakable |
| Contacto | ContactPage + Organization |

## Fallo doctrinal grave

```text
Schema Map asigna LocalBusiness a todas las páginas.
```

## Fallo doctrinal grave adicional

```text
Schema Map asigna LocalBusiness al GeoArticle como si fuera landing local.
```

---

# 13. Test de canibalización

## Pregunta central

```text
¿Cada URL declarada en URL Matrix tiene una intención única?
```

## Checks

| Check | Criterio |
|---|---|
| 1 intención = 1 URL | Cada URL en URL Matrix tiene intención declarada única |
| Service Overview y LBS no compiten | SO target = informacional/general; LBS target = comercial/local |
| LBS y GeoArticle no compiten | LBS = comercial; GA = informacional/long-tail |
| GeoArticles no duplican topics | Cada topic_slug es único |
| Additional Category no duplica core service | Slug y intención distintos |
| GeoHub no compite con LBS | GH = índice; LBS = conversión por servicio |

## Fallo doctrinal grave

```text
URL Matrix declara:
/madrid/cerrajero-urgente/
/cerrajero/madrid/cerrajero-urgente/
/madrid/cuanto-cuesta-un-cerrajero-urgente/
todas con intención comercial idéntica.
```

---

# 14. Test de AI Overview / NLP Readiness

## Pregunta central

```text
¿El Content Pack está redactado para que IA y buscadores entiendan entidad, servicio, ciudad e intención?
```

## Checks (sobre Content Pack)

| Check | Criterio |
|---|---|
| H1 claro | Servicio / ciudad / entidad según Page Type |
| Quick answers | Respuestas breves declaradas en páginas clave (LBS + GA) |
| FAQs | Preguntas reales y útiles declaradas |
| Entidades | Servicios, ciudad, categoría, problemas, herramientas mencionadas |
| Contexto local | Natural, no stuffing |
| AUDIO | Authority, Uniqueness, Depth, Intent, Optimization en briefs |
| Speakable | Schema Map declara Speakable en GAs |

## Fallo doctrinal grave

```text
Content Pack declara contenido genérico sin entidades, sin preguntas y sin estructura semántica.
```

---

# 15. Test de soporte GBP

## Pregunta central

```text
¿La documentación pre-build prepara correctamente el futuro GBP?
```

No se evalúa si el GBP está creado.
Se evalúa si los docs lo soportan doctrinalmente.

## Checks

| Check | Criterio |
|---|---|
| Primary Category | Declarada (Output 1.5); con soporte en HP y arquitectura |
| Additional Categories | Declaradas (Output 1.6); con páginas si `needs_page = true` |
| Services GBP | Declarados (Output 1.9); reflejados en Page Type Map (SO + LBS) |
| GeoHub | Refuerza ciudad principal en Internal Linking Plan |
| NAP | Declarado (Output 1.4); tratado como dato de entidad |
| sameAs | Schema Map asigna `sameAs` solo si GBP existe |
| Reviews | Content Pack NO declara reseñas si no hay GBP real |
| Service Areas | URL Matrix NO usa LCAs como URLs salvo expansión aprobada |

## Fallo doctrinal grave

```text
Output 1.6 declara una categoría GBP sin que la URL Matrix asigne página a esa categoría.
```

---

# 16. Test de expansión

## Pregunta central

```text
¿Los docs entienden que la expansión es posterior y condicionada?
```

## Checks

| Check | Criterio |
|---|---|
| Candidate LCA | Declarada en Output 1.10; NO genera URL en URL Matrix |
| Approved Expansion Area | Declarada en Output 1.11; SÍ puede generar URL |
| Nueva ciudad | Requiere módulo de expansión documentado, no se mete en la base inicial |
| Barrio | Requiere validación documentada |
| Competidores | Se usan cuando el módulo de competidores se ejecute (post-tracking) |
| Datos post-lanzamiento | Condicionan escalado (Output Bloque tracking) |

## Fallo doctrinal grave

```text
URL Matrix de la base inicial declara páginas por barrio.
```

---

# 17. Test de trazabilidad doctrinal

## Pregunta central

```text
¿Cada decisión declarada en los docs puede explicarse por GMB Crush?
```

## Checks (sobre Outputs Consolidados §8)

| Check | Criterio |
|---|---|
| Page Type | Cada output Page Type tiene `Source` doctrinal declarada |
| URL pattern | Cada output URL tiene `Source` doctrinal declarada |
| Internal link | Cada decisión de linking tiene `Source` doctrinal |
| Schema | Cada decisión de schema tiene `Source` doctrinal |
| Content role | Cada decisión de Content Pack tiene `Source` doctrinal |
| Expansion rule | Cada Approved Expansion Area tiene justificación documentada |

## Fallo doctrinal grave

```text
Un output declara "lo hice así porque queda mejor" como Source.
```

---

# Score doctrinal

| Área | Peso |
|---|---:|
| Arquitectura y fórmula GMB Crush | 15 |
| URLs y Page Types | 15 |
| Main City / LCA / Expansion | 10 |
| Contenido por Page Type | 15 |
| GeoHub y GeoArticles | 10 |
| Internal Linking | 10 |
| Schema | 10 |
| No canibalización | 5 |
| Soporte GBP | 5 |
| AI Overview / entidades | 5 |

Total:

```text
100 puntos
```

## Interpretación

| Puntuación | Resultado |
|---|---|
| 90–100 | Implementación doctrinal excelente |
| 75–89 | Buena, con ajustes |
| 60–74 | Parcial, necesita corrección |
| <60 | No cumple doctrina GMB Crush |

---

# Bloqueos automáticos

Aunque los docs saquen buena nota, fallan automáticamente si ocurre cualquiera de estos casos:

```text
URL Matrix declara URLs de Local Coverage Areas sin aprobación documentada.
Page Type Map mezcla Service Overview y LBS.
Content Pack convierte GeoArticles en landings.
URL Matrix no incluye GeoHub.
Internal Linking Plan rompe jerarquía padre/hijo.
Schema Map asigna schema genérico para todas las páginas.
URL Matrix declara Additional Category sin soporte (ni en Page Type Map ni en Content Pack).
Output 1.6 declara categoría GBP sin respaldo en URL Matrix.
Content Pack declara ubicación física inventada.
Hay URLs en cualquier doc (Page Type Map, Content Pack, Internal Linking Plan) que no existen en la URL Matrix declarada.
```

---

# Prompt para ejecutar este test

```text
Audita estos docs pre-build según la doctrina GMB Crush.

Los docs incluidos son:
- URL Matrix
- Page Type Map
- Schema Map
- Internal Linking Plan
- Content Pack (briefs por URL)
- Outputs Consolidados §8 (con Source y Status por output)

NO evalúes:
- HTML construido
- sitemap publicado
- runtime
- si el teléfono / email / dominio / GBP son reales

Evalúa solo si los docs reflejan correctamente la doctrina GMB Crush:

1. Arquitectura base.
2. Fórmula de páginas.
3. Patrones URL.
4. Page Types.
5. Main City vs Local Coverage Areas.
6. Approved Expansion Areas.
7. Service Overview Pages.
8. Location-Based Service Pages.
9. Additional Category Pages.
10. GeoHub.
11. GeoArticles.
12. Internal Linking Plan.
13. Schema Map por Page Type.
14. Canibalización.
15. Soporte GBP.
16. AI Overview / NLP readiness.
17. Trazabilidad doctrinal.

Para cada bloque devuelve:

- PASS / WARNING / FAIL
- Evidencia encontrada (cita el doc + sección)
- Problema doctrinal si existe
- Corrección exacta
- Severidad: crítica / alta / media / baja

Entrega un score final de 0 a 100 y lista los bloqueos automáticos si existen.

Veredicto:
- PASS (≥90): luz verde para Paso 17 (Build) + Paso 18 (Deploy).
- PARTIAL (60-89): docs requieren ajustes antes de build.
- FAIL (<60): rehacer desde el bloque que falla; no proceder a build.
```

---

# Conclusión

El test doctrinal pre-build no pregunta:

```text
¿La web está construida?
¿Tengo todos los datos reales?
```

Pregunta:

```text
¿Los docs declaran una arquitectura GMB Crush coherente y completa,
para que cuando construyamos la web, sepamos que va a estar bien?
```

Los docs pueden tener `⚠ inferido` o `⚠ placeholder` en outputs (lo permite la doctrina) y aun así estar doctrinalmente bien diseñados.

Pero NO pueden estar doctrinalmente bien si:

```text
URL Matrix mezcla page types
URL Matrix rompe la fórmula
URL Matrix declara URLs por barrios sin Approved Expansion
URL Matrix no incluye GeoHub
Internal Linking Plan no enlaza GeoArticles a LBS
Schema Map asigna schema genérico
Content Pack convierte artículos en landings
Output 1.6 declara categorías GBP sin páginas en URL Matrix.
```

**Si esos problemas aparecen aquí, llegarán al HTML.** Por eso es gate pre-build.
