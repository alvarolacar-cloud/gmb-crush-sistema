# Doctrina GMB Crush — Barrios, Distritos, Zonas y Landmarks

Documento de referencia para mantener estable la lógica de **Main City**, **Local Coverage Areas** y **Approved Expansion Areas** dentro del sistema GMB Crush.

---

# 1. Regla principal

```text
Barrios, distritos, zonas y landmarks no crean URLs por defecto.
```

La arquitectura base se construye primero sobre la **Main City**.

Después, los barrios, distritos, zonas o landmarks se usan como señales GEO dentro del contenido, el GeoHub, los GeoArticles, las FAQs y, si procede, el schema.

Solo generan URLs propias cuando pasan a:

```text
Approved Expansion Areas
```

---

# 2. Lógica completa

```text
Dirección física
→ NAP
→ Main City
→ arquitectura base por ciudad
→ Local Coverage Areas como señales GEO
→ validación de candidatas
→ Approved Expansion Areas solo si se aprueban
→ URLs de expansión solo si procede
```

---

# 3. Aplicado al ejemplo

## Dirección física

```text
Calle Rafael Calvo 12, Barrio Almagro, Distrito Chamberí, Madrid
```

## Main City

```text
Madrid
```

## Direct Local Coverage Areas

Zonas que salen directamente de la dirección física / NAP:

```text
Almagro
Chamberí
```

## Candidate Local Coverage Areas

Zonas candidatas que pueden tener sentido GEO, pero que no están aprobadas automáticamente:

```text
Salamanca
Retiro
Centro
Tetuán
Chamartín
Arganzuela
Moncloa
Prosperidad
```

## Approved Expansion Areas

En la fase inicial:

```text
None in Phase 1
```

---

# 4. Qué crea arquitectura y qué no

| Elemento | Función | ¿Crea URLs por defecto? |
|---|---|---|
| Main City | Crea la arquitectura base | Sí |
| Direct Local Coverage Areas | Refuerzan señales GEO | No |
| Candidate Local Coverage Areas | Zonas candidatas pendientes de validación | No |
| Approved Expansion Areas | Zonas aprobadas para expansión | Sí |
| Landmarks | Contexto local / señales GEO | No |

---

# 5. Regla Main City

La **Main City** es la ciudad principal que crea la arquitectura.

En el ejemplo:

```text
Madrid
```

Madrid puede generar:

```text
/madrid/
/cerrajero/madrid/cerrajero-urgente/
/cerrajero/madrid/apertura-puertas/
/madrid/cuanto-cuesta-un-cerrajero-urgente/
```

Regla final:

```text
La Main City crea la arquitectura base.
```

---

# 6. Regla Local Coverage Areas

Se mantiene el término:

```text
Local Coverage Areas
```

No usar:

```text
Local Positioning Areas
```

Las Local Coverage Areas son zonas, barrios, distritos o landmarks seleccionados desde:

```text
dirección física
Main City
coherencia GEO
proximidad
datos de búsqueda
competidores
lógica GMB Crush
```

Sirven para reforzar:

```text
contenido
H2s
FAQs
GeoHub
GeoArticles
schema areaServed si procede
señales locales
```

Regla final:

```text
Local Coverage Areas son señales GEO. No generan URLs por defecto.
```

---

# 7. Direct Local Coverage Areas

Las **Direct Local Coverage Areas** son zonas que salen directamente de la dirección física.

En el ejemplo:

```text
Almagro
Chamberí
```

Motivo:

```text
Almagro aparece como barrio.
Chamberí aparece como distrito.
```

Uso permitido:

```text
menciones en contenido
secciones de contexto local
FAQs
GeoHub
GeoArticles
schema si la cobertura real está validada
```

Uso no permitido por defecto:

```text
/almagro/
/chamberi/
/cerrajero/almagro/cerrajero-urgente/
/cerrajero/chamberi/cerrajero-urgente/
```

Regla final:

```text
Direct Local Coverage Areas salen del NAP, pero no generan URLs automáticamente.
```

---

# 8. Candidate Local Coverage Areas

Las **Candidate Local Coverage Areas** son zonas que pueden tener sentido GEO, pero que todavía necesitan validación.

En el ejemplo:

```text
Salamanca
Retiro
Centro
Tetuán
Chamartín
Arganzuela
Moncloa
Prosperidad
```

Estas zonas no deben tratarse como:

```text
oficinas físicas
sedes
ubicaciones reales
zonas aprobadas para URLs
cobertura real en schema sin validación
```

Pueden usarse como contexto suave si tienen coherencia y si no crean una falsa ubicación.

Regla final:

```text
Candidate Local Coverage Area no es URL, no es sede y no es cobertura real hasta validarse.
```

---

# 9. Approved Expansion Areas

Las **Approved Expansion Areas** son las únicas zonas que pueden generar URLs propias.

En fase inicial:

```text
Approved Expansion Areas = None in Phase 1
```

Si una zona se aprueba como expansión, entonces puede generar una arquitectura específica.

Ejemplo posible tras aprobación:

```text
/almagro/
/cerrajero/almagro/cerrajero-urgente/
/almagro/cuanto-cuesta-un-cerrajero-urgente/
```

Pero hasta que se apruebe:

```text
no hay URLs
no hay GeoHub de zona
no hay LBS de zona
no hay GeoArticles de zona
```

Regla final:

```text
Sin Approved Expansion Area, no hay URL de zona.
```

---

# 10. Qué NO debemos justificar

No queremos justificar las zonas desde esta pregunta:

```text
¿Dónde dice el dueño que atiende?
```

Ese enfoque es demasiado débil y puede llevar a crear páginas por cualquier zona declarada.

---

# 11. Qué SÍ debemos justificar

La lógica correcta es:

```text
¿Dónde podemos posicionar bajo doctrina GMB Crush a partir de la dirección física, Main City, coherencia GEO, proximidad, datos de búsqueda y competidores?
```

La dirección física sirve como referencia objetiva.

Desde ahí se construye:

```text
Main City
Direct Local Coverage Areas
Candidate Local Coverage Areas
Approved Expansion Areas
```

Regla final:

```text
No elegimos zonas solo porque alguien dice que atiende allí. Elegimos señales GEO desde la dirección física y la doctrina GMB Crush.
```

---

# 12. Test de coherencia GEO

Una Candidate Local Coverage Area puede usarse como señal GEO activa si cumple criterios suficientes de coherencia.

## Criterios

| Criterio | Pregunta |
|---|---|
| Ancla física | ¿La zona sale directamente de la dirección o está conectada a ella? |
| Main City | ¿Pertenece claramente a la Main City? |
| Proximidad | ¿Está cerca o conectada al punto físico? |
| Intención local | ¿Ayuda a explicar una necesidad real del servicio? |
| Demanda o competencia | ¿Hay búsquedas o competidores trabajando esa zona? |
| No falsa ubicación | ¿Puede mencionarse sin afirmar oficina física allí? |

## Regla práctica

```text
Una Candidate Local Coverage Area debe pasar el test GEO antes de usarse como señal fuerte.
```

---

# 13. Uso en contenido

## Permitido

```text
Cerrajeros Madrid 24h presta servicios de cerrajería en Madrid, con referencias locales como Almagro y Chamberí, zonas directamente vinculadas a la dirección física del negocio.
```

## Permitido con cautela

```text
También pueden aparecer referencias contextuales a zonas próximas o relevantes de Madrid, como Salamanca, Retiro o Centro, siempre que no se presenten como sedes físicas ni como páginas propias.
```

## Incorrecto

```text
Tenemos oficina en Salamanca.
```

si no hay oficina real allí.

## Incorrecto

```text
Cerrajero urgente en Retiro
```

si Retiro no está aprobado como página, cobertura validada o expansión.

Regla final:

```text
Las zonas se pueden usar como señales GEO, no como claims de ubicación falsa.
```

---

# 14. Uso en schema areaServed

Hay que distinguir contenido de schema.

## Contenido

Puede usar señales GEO coherentes:

```text
Almagro
Chamberí
zonas próximas de Madrid
```

## Schema areaServed

Debe ser más estricto.

Solo debe incluir:

```text
Madrid
zonas de cobertura real
zonas validadas
```

No debe incluir:

```text
zonas aspiracionales
zonas decorativas
Candidate Local Coverage Areas sin validar
barrios usados solo como contexto semántico
```

Regla final:

```text
Contenido puede usar señales GEO coherentes. Schema areaServed solo debe usar cobertura real o validada.
```

---

# 15. Ejemplos correctos

## URL correcta de LBS

```text
/cerrajero/madrid/cerrajero-urgente/
```

## Mención correcta de Direct LCA

```text
Servicio de cerrajería en Madrid con referencias locales como Almagro y Chamberí.
```

## GeoArticle correcto

```text
/madrid/cuanto-cuesta-un-cerrajero-urgente/
```

Puede mencionar zonas como contexto, pero sigue siendo un artículo de Madrid.

## GeoHub correcto

```text
/madrid/
```

Organiza servicios, categorías, GeoArticles y contexto local de Madrid.

---

# 16. Ejemplos incorrectos en fase inicial

No crear:

```text
/almagro/
/chamberi/
/salamanca/
/retiro/
```

No crear:

```text
/cerrajero/almagro/cerrajero-urgente/
/cerrajero/chamberi/apertura-puertas/
/cerrajero/salamanca/cambio-cerraduras/
```

No crear:

```text
/madrid/chamberi/
/cerrajero/madrid/chamberi/cerrajero-urgente/
```

si esas zonas no están aprobadas como expansión.

No afirmar:

```text
oficina en Salamanca
sede en Retiro
cerrajeros en Tetuán como landing propia
```

sin validación o aprobación.

---

# 17. Regla sobre patrones URL

## LBS canónica

La Location-Based Service Page usa:

```text
/[category]/[city]/[service]/
```

Ejemplo:

```text
/cerrajero/madrid/cerrajero-urgente/
```

## GeoHub

```text
/[city]/
```

Ejemplo:

```text
/madrid/
```

## GeoArticle

```text
/[city]/[topic]/
```

Ejemplo:

```text
/madrid/cuanto-cuesta-un-cerrajero-urgente/
```

## Approved Expansion Area

Solo si se aprueba, puede usar patrón propio de expansión:

```text
/[approved-area]/
/[category]/[approved-area]/[service]/
```

Regla final:

```text
/[city]/[service]/ no debe usarse como LBS si la doctrina aprobada es /[category]/[city]/[service]/.
```

---

# 18. Regla para auditoría doctrinal

Una web falla doctrina GMB Crush si:

```text
crea URLs por barrios sin aprobación
convierte Candidate LCAs en landing pages
mete Candidate LCAs en areaServed sin validación
afirma sedes físicas falsas
usa barrios como ciudades base
mezcla GeoArticles con LBS
rompe el patrón /category/city/service/
```

Una web pasa doctrina GMB Crush si:

```text
Main City crea arquitectura
Local Coverage Areas refuerzan contenido
Approved Expansion Areas son la única vía para URLs de zona
Direct LCAs se usan como señales GEO
Candidate LCAs quedan pendientes o contextuales
schema areaServed usa solo cobertura real o validada
```

---

# 19. Regla final resumida

```text
Dirección física → NAP + Main City.
Main City → arquitectura base.
Barrios/distritos → señales GEO.
Candidate zones → validación.
Approved Expansion Areas → URLs.
```

Y la regla más importante:

```text
Local Coverage Areas = señales GEO.
Approved Expansion Areas = URLs.
```
