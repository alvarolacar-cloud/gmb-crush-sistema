## 7. Fase 5 — Extracción de Diseño (Web de Referencia)

**Fuente:** `Cliente preflight` (web de referencia del cliente).

Antes de construir, extrae los tokens visuales de la web de referencia del cliente (o de su sector si no tiene web). Esto define el look & feel del proyecto Astro.

### 7.1 Input necesario
- URL de la web de referencia del cliente (campo "Web actual" del preflight).
- Si no tiene web propia: pedir al operador una web del sector que le guste, o usar la web del competidor #1 del Local Pack.
- Si no hay ninguna referencia: marcar diseño como `⚠ inferido` y usar un estilo limpio y profesional genérico.

### 7.2 Tokens a extraer

Visita la web de referencia y extrae estos elementos:

| Token | Qué extraer | Ejemplo |
|-------|-------------|----------|
| **Paleta de colores** | Color primario, secundario, acento, fondo, texto | `#1a56db` (primario), `#f3f4f6` (fondo), `#111827` (texto) |
| **Tipografía** | Familia de fuente para títulos y para cuerpo | Títulos: Inter Bold. Cuerpo: Inter Regular. |
| **Estilo de botones** | Forma, color, hover, tamaño | Redondeados, fondo primario, texto blanco, hover oscurece 10% |
| **Estilo de hero** | Layout (imagen fondo / split / solo texto), altura, overlay | Split: texto izquierda + imagen derecha. Overlay oscuro 40%. |
| **Estilo de cards** | Bordes, sombras, padding, esquinas | Bordes `1px gray-200`, sombra `sm`, esquinas `rounded-lg`, padding `p-6` |
| **Estilo de nav** | Fija/estática, color fondo, logo posición, items | Fija, fondo blanco, logo izquierda, items derecha, hamburguesa en móvil |
| **Estilo de footer** | Columnas, color fondo, contenido | 3 columnas, fondo oscuro, NAP + links + legal |
| **Espaciado general** | Sección padding, max-width contenido | Secciones `py-16`, contenido `max-w-6xl mx-auto` |
| **Iconografía** | Estilo de iconos (outline/solid/none), librería | Lucide icons, estilo outline, tamaño 24px |
| **Imágenes** | Estilo (redondeadas, full-bleed, con overlay), aspecto | Redondeadas `rounded-xl`, aspect-ratio 16:9 |

### 7.3 Output: Design Tokens

Produce un archivo `design-tokens.md` (o sección dentro de los 6 docs) con todos los tokens extraídos en formato que Tailwind pueda consumir:

```markdown
## Design Tokens — [Nombre del cliente]

### Colores
- Primario: `#1a56db` → Tailwind: `bg-blue-700`
- Secundario: `#9333ea` → Tailwind: `bg-purple-600`
- Fondo: `#f9fafb` → Tailwind: `bg-gray-50`
- Texto: `#111827` → Tailwind: `text-gray-900`
- Acento/CTA: `#16a34a` → Tailwind: `bg-green-600`

### Tipografía
- Títulos: `font-family: 'Inter', sans-serif; font-weight: 700;`
- Cuerpo: `font-family: 'Inter', sans-serif; font-weight: 400;`
- Tamaños: H1 `text-4xl`, H2 `text-3xl`, H3 `text-xl`, body `text-base`

### Componentes
- Botones: `rounded-lg px-6 py-3 bg-primary text-white hover:bg-primary/90`
- Cards: `rounded-lg border border-gray-200 shadow-sm p-6`
- Hero: Split layout, imagen derecha, overlay 40%
- Nav: Fija, fondo blanco, sombra `shadow-sm`
- Footer: 3 columnas, fondo `bg-gray-900 text-white`
- Secciones: `py-16 px-4 max-w-6xl mx-auto`
```

### 7.4 Reglas de diseño

- **Si la web de referencia tiene logo:** Pedir al operador que lo provea como archivo. Marcar `⚠ placeholder` si no lo da.
- **Si la web de referencia tiene fotos propias:** No copiarlas. Marcar `[IMAGEN: descripción]` como placeholder en el contenido.
- **Si no hay web de referencia:** Usar un estilo limpio: fondo blanco, texto oscuro, un color primario del sector (azul para servicios técnicos, verde para salud, naranja para urgencias). Marcar `⚠ inferido`.
- **Si hay varios colores primarios en la referencia:** Elegir el que más se usa en botones y CTAs de la web de referencia — ese es el color de acción.
- **No inventar branding:** Si el cliente no tiene colores corporativos, no inventarlos. Usar neutros + un acento lógico del sector.

### 7.5 Integración con Fase 6 (Build)

Los design tokens se aplican en:
- `tailwind.config.js` → extender colores y fuentes.
- `BaseLayout.astro` → aplicar tipografía global y fondo.
- Componentes (`Hero.astro`, `CTA.astro`, etc.) → usar las clases Tailwind derivadas de los tokens.

---

