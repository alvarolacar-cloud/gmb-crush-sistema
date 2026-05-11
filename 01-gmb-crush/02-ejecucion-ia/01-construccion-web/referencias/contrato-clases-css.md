# Contrato de clases CSS de la plantilla

**Fuente de verdad** del lenguaje compartido entre la plantilla Astro (estructura HTML) y el `theme.css` del cliente (presentación visual).

> **Regla doctrinal:** la plantilla emite **solo** las clases listadas aquí. El `theme.css` del cliente estiliza **solo** estas clases. Si una clase no está aquí, no existe y no debe usarse.

---

## Filosofía

- La plantilla **no decide diseño**. Emite HTML semántico con nombres de clase predecibles.
- El `theme.css` del cliente (output de Fase 6) **decide diseño**. Estiliza las clases según la web de referencia.
- Convención: **BEM** (`.bloque__elemento--modificador`).
- Nombres siempre en inglés-técnico, en kebab-case.

---

## Modificadores de `<body>` por page type

El `<body>` lleva una clase modificadora según el tipo de página. Útil para themes que quieren estilos distintos por page type.

| Modificador | Page type |
|---|---|
| `.page--home` | Homepage |
| `.page--service-overview` | Service Overview |
| `.page--lbs` | Location-Based Service |
| `.page--geohub` | GeoHub |
| `.page--geoarticle` | GeoArticle |
| `.page--additional-category` | Additional Category |
| `.page--contact` | Contacto |
| `.page--auxiliary` | Aviso legal, Privacidad |

---

## Header

```
.site-header
.site-header__brand
.site-header__nav
.site-header__nav-link
.site-header__phone
.site-header__cta
```

---

## Hero

```
.hero                    (con modificador opcional)
.hero--with-image        (modificador: hay foto de fondo)
.hero--solid             (modificador: sin foto, color sólido)
.hero__image             (la <img> de fondo)
.hero__overlay           (overlay sobre la foto)
.hero__content           (wrapper del contenido textual)
.hero__title             (el <h1>)
.hero__subtitle          (subtítulo)
.hero__trust             (línea de trust signal opcional)
.hero__actions           (wrapper de CTAs)
.hero__cta--primary      (CTA principal)
.hero__cta--secondary    (CTA secundario, opcional)
```

---

## Services Grid

```
.services-grid
.services-grid__heading      (el <h2>)
.services-grid__list         (el wrapper del grid)
.service-card
.service-card__title         (el <h3>)
.service-card__description   (el <p>)
.service-card__cta           (link "Ver detalles →")
```

---

## Trust Block

```
.trust-block
.trust-block__heading        (el <h2>)
.trust-block__list           (wrapper del grid)
.trust-card
.trust-card__label           (el <p> con el trust signal)
```

---

## FAQ

```
.faq
.faq__heading                (el <h2>)
.faq__list                   (wrapper)
.faq__item                   (cada <details>)
.faq__question               (el <summary>)
.faq__answer                 (el <p> dentro de details)
```

---

## CTA Section (sección final con call-to-action)

```
.cta-section
.cta-section__title          (el <h2>)
.cta-section__description    (párrafo)
.cta-section__button         (el botón)
```

---

## Cobertura (LCAs)

```
.lcas
.lcas__heading
.lcas__intro
.lcas__list
.lcas__item
```

---

## Breadcrumb

```
.breadcrumb
.breadcrumb__list
.breadcrumb__item
.breadcrumb__link
.breadcrumb__separator
.breadcrumb__current
```

---

## Content (para body largo de SO, LBS, GA)

```
.content                     (wrapper del contenido del artículo / página)
.content__heading            (h2, h3 dentro del cuerpo)
.content__paragraph          (p)
.content__list               (ul, ol)
.content__list-item          (li)
.content__link               (a interno)
.content__bridge             (puente narrativo en GA — link contextual a LBS padre)
.content__strong             (strong, b)
.content__quick-answer       (el primer párrafo de respuesta directa en GA)
```

---

## Footer

```
.site-footer
.site-footer__container
.site-footer__column
.site-footer__heading
.site-footer__nap
.site-footer__address
.site-footer__phone
.site-footer__email
.site-footer__list
.site-footer__list-item
.site-footer__link
.site-footer__copy
```

---

## Reglas de uso para themes (`theme.css`)

1. **No introducir clases nuevas que no estén aquí.** Si el cliente necesita una, primero se añade al contrato y luego se usa.
2. **Especificidad baja.** Estilizar por nombre de clase, no por anidación profunda. Permite override por modificadores.
3. **Variables CSS opcionales.** El theme puede declarar `:root { --color-primary: #A32136; }` y usarlas dentro de las reglas de clase.
4. **Responsive con media queries estándar** (mobile-first preferido).
5. **No depender de Tailwind ni de ningún framework.** El theme es CSS puro.

---

## Reglas de uso para la plantilla (`.astro`)

1. **Solo clases del contrato** en el HTML. Cero clases utility (`bg-blue-500`, `p-6`, etc.).
2. **Cero `style="..."` inline.** Excepción: `style` calculado dinámicamente desde datos (ej. una imagen src), nunca decisión visual hardcoded.
3. **Cero referencias a colores, fuentes, tamaños** en el código `.astro`. Todo eso vive en `theme.css`.
4. **Si un componente necesita una nueva clase**, se añade al contrato primero.

---

## Versión del contrato

Versión 1.0 — 2026-05-11. Compatible con `catalog_version: 0.1.0` de `outputs.json`.

Cambios al contrato (añadir/quitar clases) requieren bump de versión + actualización de todos los `theme.css` existentes.
