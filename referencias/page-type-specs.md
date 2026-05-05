# Especificaciones de Contenido por Tipo de Página (Page Type Specs)

Cada tipo de página en el ecosistema GMB Crush tiene una función única. Cuando redactes el contenido y construyas los componentes Astro, debes seguir estrictamente esta estructura para cada página.

## 1. Homepage (Root Entity Anchor)
**Función:** Establecer la entidad, la marca, la categoría principal y la ciudad base.
- **H1:** Nombre del negocio o Categoría Principal + Ciudad (ej: Fontaneros Express Barcelona).
- **Hero Section:** Propuesta de valor clara, Trust Signals (años de experiencia, 24/7), y el CTA principal.
- **Secciones clave:**
  - Resumen de los 5 core services (con enlaces a sus Location-Based Services).
  - Bloque de confianza (por qué elegirnos, garantías).
  - NAP completo y visible (Name, Address, Phone).
  - Mapa embebido (opcional, centrado en la ciudad).
- **Enlaces salientes obligatorios:** A los Service Overviews, al GeoHub, y a Contacto.

## 2. Service Overview (Topical Authority Pillar)
**Función:** Explicar el servicio a nivel general, sin enfoque local. Construir autoridad temática.
- **H1:** Nombre del servicio general (ej: Instalación de Calderas). *Nunca incluir ciudad aquí.*
- **Secciones clave:**
  - Qué es el servicio y cómo funciona el proceso.
  - Problemas comunes que resuelve.
  - Tipos de soluciones o tecnologías usadas.
  - FAQs genéricas sobre el servicio.
- **CTA:** Suave, empujando hacia la página local (ej: "¿Necesitas este servicio en [Main City]?").
- **Enlaces salientes obligatorios:** A su Location-Based Service hijo, a servicios relacionados.

## 3. Location-Based Service (LBS - Main City Converter)
**Función:** La landing page comercial principal. Convierte búsquedas de "servicio + ciudad".
- **H1:** Servicio + Ciudad (ej: Instalación de Calderas en Barcelona).
- **Secciones clave:**
  - Contexto local (mencionar la ciudad y las Local Coverage Areas o barrios donde se opera).
  - Urgencia y disponibilidad local (tiempos de llegada).
  - Proceso de trabajo en la ciudad.
  - FAQs locales (ej: "¿Cuánto tardan en llegar a Gràcia?").
- **CTA:** Fuerte y directo (Llamar ahora / Solicitar presupuesto).
- **Enlaces salientes obligatorios:** A su Service Overview padre, al GeoHub, y a sus GeoArticles hijos.

## 4. GeoHub (Main City Silo Container)
**Función:** Índice geográfico. Agrupa todo lo que el negocio hace en esa ciudad.
- **H1:** Servicios en [Main City] (ej: Servicios de Fontanería en Barcelona).
- **Secciones clave:**
  - Descripción de la cobertura en la ciudad.
  - Lista de todos los servicios locales ofrecidos (enlaces a LBS).
  - Lista de categorías adicionales (enlaces a AC).
  - Índice de artículos locales (enlaces a GeoArticles).
- **Enlaces salientes obligatorios:** A todas las LBS, AC y GeoArticles de la ciudad.

## 5. GeoArticle (Semantic Booster)
**Función:** Atrapar tráfico long-tail informacional y empujar autoridad a la LBS.
- **H1:** Pregunta o tema específico + Ciudad (ej: ¿Cuánto cuesta instalar una caldera en Barcelona?).
- **Secciones clave:**
  - Respuesta directa y clara al principio (para AI Overviews / Featured Snippets).
  - Desarrollo del tema con profundidad.
  - Contexto local natural (no forzado).
- **CTA:** Informativo/Suave, redirigiendo a la LBS para contratar el servicio.
- **Enlaces salientes obligatorios:** A su LBS padre, al GeoHub, y a otro GeoArticle relacionado.

## 6. Additional Category Page (GBP AC Support)
**Función:** Dar soporte a una categoría secundaria del GBP que no encaja en los core services.
- **H1:** Categoría Adicional + Ciudad (ej: Desatascos 24h en Barcelona).
- **Secciones clave:** Similar a una LBS, pero enfocada exclusivamente en esta categoría secundaria.
- **Enlaces salientes obligatorios:** Al GeoHub y a LBS relacionadas.

## 7. Contacto (Auxiliar)
**Función:** Punto central de conversión y confianza.
- **H1:** Contacto / Llámanos.
- **Secciones clave:** NAP completo, formulario de contacto, horarios de apertura, información de áreas de servicio (LCAs).
