# Test Doctrinal — Resultado para Aerotermia Madrid SL

Evaluación de la documentación pre-build contra la doctrina GMB Crush.

---

## 1. Test de arquitectura GMB Crush
**¿Los docs declaran la arquitectura completa?**
- Homepage: ✅ Declarada como Root Entity Anchor
- Service Overview Pages: ✅ 4 declaradas, sin ciudad
- Location-Based Service Pages: ✅ 4 declaradas, servicio + Main City
- Additional Category Pages: ✅ 1 declarada (Reparación bombas calor)
- GeoHub: ✅ Declarado como contenedor de Madrid
- GeoArticles: ✅ 12 declarados como boosters semánticos
- Contacto: ✅ Declarado como auxiliar

**Resultado: PASS**

---

## 2. Test de fórmula base
**¿La IA derivó la URL Matrix desde la fórmula?**
- S=4: ✅ Documentado
- A=1: ✅ Documentado
- G=3: ✅ Documentado
- Main City: ✅ Madrid como multiplicador base
- LCAs: ✅ No multiplican páginas
- Total: 1+4+1+4+1+12 = 23 SEO + contacto = 24 URLs: ✅ Cuadra

**Resultado: PASS**

---

## 3. Test de patrones URL
**¿Las URLs respetan los patrones doctrinales?**
- Service Overview sin ciudad: ✅ `/aerotermia/instalacion-aerotermia/`
- LBS con categoría+ciudad+servicio: ✅ `/aerotermia/madrid/instalacion-aerotermia/`
- GeoHub como contenedor: ✅ `/madrid/`
- GeoArticle como ciudad+topic: ✅ `/madrid/cuanto-cuesta-instalar-aerotermia/`
- LCAs no generan URL: ✅ Chamberí, Malasaña, Chueca, Salamanca solo en contenido
- No near-me/best/cheap: ✅

**Resultado: PASS**

---

## 4. Test Main City vs Local Coverage Areas
**¿Main City crea arquitectura y LCAs solo refuerzan señales GEO?**
- Main City genera GeoHub, LBS, GeoArticles: ✅
- LCAs en contenido y areaServed, no URLs: ✅
- No falsa ubicación: ✅ ("cubrimos" no "oficina en")
- areaServed no incluye zonas no validadas: ✅

**Resultado: PASS**

---

## 5. Test de Page Type Fidelity
**¿Cada página se comporta como su Page Type?**
- Homepage ancla entidad: ✅
- Service Overview explica sin ciudad: ✅ (H1: "Instalación de Aerotermia", sin Madrid)
- LBS convierte por servicio+ciudad: ✅ (H1: "Instalación de Aerotermia en Madrid")
- GeoArticle responde pregunta: ✅ (H1: "¿Cuánto cuesta instalar aerotermia en Madrid?")
- GeoArticle no vende como landing: ✅ (CTA suave, enlaza a LBS)

**Resultado: PASS**

---

## 6. Test de Service Overview
**¿La SO es página de servicio sin ciudad?**
- URL sin ciudad: ✅
- H1 sin ciudad: ✅ "Instalación de Aerotermia"
- CTA empuja hacia LBS: ✅

**Resultado: PASS**

---

## 7. Test de Location-Based Service
**¿La LBS cumple servicio+ciudad+conversión?**
- URL con categoría+ciudad+servicio: ✅
- H1 con servicio+ciudad: ✅
- FAQs locales: ✅
- LCAs como señales GEO: ✅
- Enlaza a SO padre: ✅
- Enlaza a GeoHub: ✅
- Enlaza a GeoArticles: ✅

**Resultado: PASS**

---

## 8. Test de Additional Category
- Existe solo para categoría no cubierta por core: ✅ (Reparación bombas calor ≠ instalación/mantenimiento)
- URL con patrón correcto: ✅

**Resultado: PASS**

---

## 9. Test de GeoHub
- URL `/madrid/`: ✅
- Agrupa servicios, artículos, cobertura: ✅ (según specs)

**Resultado: PASS**

---

## 10. Test de GeoArticles
- URL `/madrid/[topic]/`: ✅
- Intención informacional: ✅ (preguntas de precio, proceso, comparativa)
- CTA suave hacia LBS: ✅
- Enlaza a LBS padre: ✅

**Resultado: PASS**

---

## 11. Test de Internal Linking
- Homepage → SO + GeoHub + Contacto: ✅
- SO → LBS hijo: ✅
- LBS → SO padre + GeoHub + GeoArticles + Contacto: ✅
- GeoArticle → LBS padre + GeoHub + GA relacionado: ✅
- No páginas huérfanas: ✅
- No enlaces a URLs inexistentes: ✅

**Resultado: PASS**

---

## 12. Test de Schema
- Homepage: Organization + WebSite + LocalBusiness: ✅
- SO: Service + WebPage + BreadcrumbList: ✅
- LBS: LocalBusiness + FAQPage + BreadcrumbList: ✅
- GeoArticle: Article + FAQPage + BreadcrumbList: ✅
- No sameAs inventado: ✅
- No aggregateRating sin reseñas: ✅
- address = NAP real: ✅

**Resultado: PASS**

---

## 13. Test de canibalización
- "Aerotermia calefacción" descartada por solapamiento con "Instalación aerotermia": ✅
- Cada URL tiene intención única: ✅
- GeoArticles no duplican topics entre servicios: ✅

**Resultado: PASS**

---

## 14-17. Tests restantes (AI Overview, Soporte GBP, Expansión, Trazabilidad)
- Contenido con respuestas directas para AI Overview: ✅
- GBP bloqueado hasta cerrar pendientes: ✅
- No expansión en fase base: ✅
- Cada decisión tiene fuente declarada: ✅

**Resultado: PASS**

---

## Score Final

| Área | Peso | Puntuación |
|------|:----:|:----------:|
| Arquitectura y fórmula | 15 | 15 |
| URLs y Page Types | 15 | 15 |
| Main City / LCA / Expansion | 10 | 10 |
| Contenido por Page Type | 15 | 14 |
| GeoHub y GeoArticles | 10 | 10 |
| Internal Linking | 10 | 10 |
| Schema | 10 | 10 |
| No canibalización | 5 | 5 |
| Soporte GBP | 5 | 5 |
| AI Overview / entidades | 5 | 4 |

**Total: 98/100**

**Bloqueos automáticos: NINGUNO**

---

## Veredicto: PASS — Proceder a Build.
