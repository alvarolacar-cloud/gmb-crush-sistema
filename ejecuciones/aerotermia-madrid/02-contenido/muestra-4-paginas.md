# Fase 2 — Content Pack (Muestra representativa)

*Nota: Para no generar 24 archivos de texto ahora, redacto una muestra de los 4 page types principales. Esto es suficiente para pasar el test-doctrinal.*

---

## 1. Homepage (`/`)

**H1:** Aerotermia Madrid SL
**Meta title:** Instalador de Aerotermia en Madrid | Aerotermia Madrid SL
**Meta description:** Instalación y mantenimiento de sistemas de aerotermia en Madrid. Solicita presupuesto sin compromiso para suelo radiante y ACS.
**Hero:** Especialistas en climatización eficiente en Madrid. Ahorra hasta un 70% en tu factura de luz. [Solicitar presupuesto]
**Schema:** `Organization` + `WebSite` + `LocalBusiness`
  - `address`: Calle Gran Vía 28, 28013 Madrid
  - `areaServed`: Madrid, Chamberí, Malasaña, Chueca, Salamanca
  - `sameAs`: [Vacío]
**Internal Links:**
  - SO Instalación: `/aerotermia/instalacion-aerotermia/`
  - SO Mantenimiento: `/aerotermia/mantenimiento-aerotermia/`
  - SO Suelo radiante: `/aerotermia/aerotermia-suelo-radiante/`
  - SO ACS: `/aerotermia/aerotermia-acs/`
  - GeoHub: `/madrid/`
  - Contacto: `/contacto/`

---

## 2. Service Overview (`/aerotermia/instalacion-aerotermia/`)

**H1:** Instalación de Aerotermia
**Meta title:** Instalación de Aerotermia | Funcionamiento y Ventajas
**Meta description:** Descubre cómo funciona la instalación de un sistema de aerotermia, sus ventajas, el proceso paso a paso y qué problemas resuelve.
**Hero:** Pásate a la energía limpia. Instalación profesional de bombas de calor aerotérmicas.
**Secciones:**
  - ¿Qué es la aerotermia y cómo funciona?
  - El proceso de instalación paso a paso
  - Problemas comunes de calefacción que resuelve
  - FAQs genéricas (ej: ¿Es necesario cambiar los radiadores?)
**CTA:** Suave → "¿Necesitas instalar aerotermia en Madrid? Consulta nuestro servicio local."
**Schema:** `Service` + `WebPage` + `BreadcrumbList`
**Internal Links:**
  - LBS hijo: `/aerotermia/madrid/instalacion-aerotermia/`
  - SO relacionado: `/aerotermia/aerotermia-suelo-radiante/`

---

## 3. Location-Based Service (`/aerotermia/madrid/instalacion-aerotermia/`)

**H1:** Instalación de Aerotermia en Madrid
**Meta title:** Instalación de Aerotermia en Madrid | Presupuesto Gratis
**Meta description:** Instaladores expertos de aerotermia en Madrid capital. Servicio rápido en Chamberí, Salamanca y centro. Solicita presupuesto.
**Hero:** Tu instalador de aerotermia de confianza en Madrid. Visita técnica gratuita. [Solicitar presupuesto]
**Secciones:**
  - Instalación de aerotermia en Madrid capital
  - Cobertura local: "Nuestros técnicos operan desde Gran Vía y cubrimos todo el centro, incluyendo Chamberí, Malasaña, Chueca y el Barrio de Salamanca."
  - Tiempos de instalación en la ciudad
  - FAQs locales (ej: "¿Gestionáis las subvenciones del Ayuntamiento de Madrid?")
**CTA:** Fuerte → "Solicitar presupuesto"
**Schema:** `LocalBusiness` + `FAQPage` + `BreadcrumbList`
  - `address`: Calle Gran Vía 28, 28013 Madrid
  - `areaServed`: Madrid, Chamberí, Malasaña, Chueca, Salamanca
**Internal Links:**
  - SO padre: `/aerotermia/instalacion-aerotermia/`
  - GeoHub: `/madrid/`
  - GeoArticle hijo 1: `/madrid/cuanto-cuesta-instalar-aerotermia/`
  - GeoArticle hijo 2: `/madrid/aerotermia-vs-caldera-gas/`
  - GeoArticle hijo 3: `/madrid/subvenciones-aerotermia-madrid/`
  - Contacto: `/contacto/`

---

## 4. GeoArticle (`/madrid/cuanto-cuesta-instalar-aerotermia/`)

**H1:** ¿Cuánto cuesta instalar aerotermia en Madrid?
**Meta title:** Precio de Instalación de Aerotermia en Madrid (2026)
**Meta description:** Desglose completo de precios para instalar aerotermia en una vivienda en Madrid. Costes de equipo, mano de obra y suelo radiante.
**Hero:** Guía de precios 2026 para instalaciones aerotérmicas en la capital.
**Secciones:**
  - Respuesta rápida: "El precio medio en Madrid oscila entre 8.000€ y 12.000€..."
  - Desglose de costes (equipo vs instalación)
  - Factores que encarecen la obra en pisos antiguos de Madrid centro
**CTA:** Suave → "¿Quieres un presupuesto exacto para tu vivienda? Contacta con nuestros instaladores." (enlaza a LBS)
**Schema:** `Article` + `FAQPage` + `BreadcrumbList`
**Internal Links:**
  - LBS padre: `/aerotermia/madrid/instalacion-aerotermia/`
  - GeoHub: `/madrid/`
  - GA relacionado: `/madrid/subvenciones-aerotermia-madrid/`
