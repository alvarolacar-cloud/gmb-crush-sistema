# Ejemplo de Arquitectura: Cerrajeros Madrid 24h

Este es el ejemplo canónico de cómo se ve una arquitectura GMB Crush completa después de aplicar la Fórmula Maestra. Úsalo como referencia visual para entender cómo se relacionan las URLs.

**Inputs Base:**
- Categoría Principal: Cerrajero
- Ciudad Principal: Madrid
- Core Services (S=5): Cerrajero urgente, Apertura puertas, Cambio cerraduras, Cambio bombines, Instalación cerraduras seguridad
- Additional Category (A=1): Duplicado llaves
- GeoArticles por servicio (G=3)

## URL Matrix Resultante (28 páginas SEO + 1 Auxiliar)

### 1. Homepage (1)
- `/`

### 2. Service Overviews (S=5)
- `/cerrajero/cerrajero-urgente/`
- `/cerrajero/apertura-puertas/`
- `/cerrajero/cambio-cerraduras/`
- `/cerrajero/cambio-bombines/`
- `/cerrajero/instalacion-cerraduras-seguridad/`

### 3. GeoHub Main City (1)
- `/madrid/`

### 4. Location-Based Services (S=5)
- `/cerrajero/madrid/cerrajero-urgente/`
- `/cerrajero/madrid/apertura-puertas/`
- `/cerrajero/madrid/cambio-cerraduras/`
- `/cerrajero/madrid/cambio-bombines/`
- `/cerrajero/madrid/instalacion-cerraduras-seguridad/`

### 5. Additional Categories (A=1)
- `/cerrajero/madrid/duplicado-llaves/`

### 6. GeoArticles (G×S = 15)
*Cerrajero urgente:*
- `/madrid/cuanto-cuesta-un-cerrajero-urgente/`
- `/madrid/que-hacer-si-no-puedes-entrar-casa/`
- `/madrid/cuanto-tarda-un-cerrajero/`

*Apertura de puertas:*
- `/madrid/cuanto-cuesta-abrir-una-puerta/`
- `/madrid/que-hacer-si-te-dejas-las-llaves-dentro/`
- `/madrid/apertura-de-puertas-sin-romper-cerradura/`

*Cambio de cerraduras:*
- `/madrid/cuando-cambiar-la-cerradura-de-casa/`
- `/madrid/cambio-de-cerradura-tras-perder-llaves/`
- `/madrid/cerradura-nueva-o-reparacion/`

*Cambio de bombines:*
- `/madrid/cuando-cambiar-el-bombin/`
- `/madrid/bombin-antibumping-madrid/`
- `/madrid/cambio-de-bombin-sin-cambiar-cerradura/`

*Instalación cerraduras seguridad:*
- `/madrid/mejores-cerraduras-de-seguridad-para-viviendas/`
- `/madrid/cerraduras-de-seguridad-para-comunidades/`
- `/madrid/instalar-cerradura-de-seguridad-en-puerta-blindada/`

### 7. Auxiliar (1)
- `/contacto/`

---

## Árbol de Internal Linking (Cómo se conectan)

- La **Homepage** enlaza a los 5 Service Overviews, al GeoHub y a Contacto.
- Cada **Service Overview** enlaza a su Location-Based Service correspondiente.
- Cada **Location-Based Service** enlaza hacia arriba (a su Service Overview), al GeoHub, y hacia abajo (a sus 3 GeoArticles).
- El **GeoHub** enlaza a los 5 Location-Based Services, a la Additional Category y al índice de GeoArticles.
- Cada **GeoArticle** enlaza hacia arriba (a su Location-Based Service) y al GeoHub.
- La **Additional Category** enlaza al GeoHub.
