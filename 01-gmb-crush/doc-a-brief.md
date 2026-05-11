# Doc A — Brief del Operador

**Versión:** 1.0  
**Input para:** Doc B (investigación), Doc D (construcción)  
**Rellena:** El operador antes de empezar. La IA no inventa ningún campo.

---

## Bloque 1 — Variables del Negocio

| Campo | Valor | Notas |
|-------|-------|-------|
| Nombre empresa | | Tal como aparecerá en la web |
| Categoría GBP principal | | Ej: Cerrajero, Fontanero, Reformas de Baño |
| Keyword principal | | Ej: cerrajero madrid, fontanero urgente |
| Dominio | | Con o sin www |
| Web actual (referencia) | | URL de la web del cliente si existe |
| Dirección física | | Calle, número, ciudad, CP |
| Teléfono | | Con prefijo nacional |
| Email | | |
| Endpoint formulario | | Ej: Formspree ID |

**Shape canónico NAP** (la IA usa esto exactamente):
```typescript
interface NAP {
  name: string;
  street: string;
  city: string;          // Main City — genera la arquitectura base
  state: string;
  zip: string;
  country: string;
  phone: string;         // ⚠ placeholder si no se aporta
  email: string;         // ⚠ placeholder si no se aporta
}
```

---

## Bloque 2 — Servicios

Lista los servicios que ofrece el negocio. Mínimo 3, máximo 6. La IA los usará como variable **S** en la Fórmula Maestra.

| # | Servicio | ¿Es el servicio bloqueante principal? |
|---|----------|---------------------------------------|
| 1 | | Sí |
| 2 | | No |
| 3 | | No |
| 4 | | No |
| 5 | | No |

**Categorías adicionales** (variable **A**, puede ser 0):

| # | Categoría adicional GBP |
|---|-------------------------|
| 1 | |

---

## Bloque 3 — Cobertura Geográfica

| Campo | Valor |
|-------|-------|
| Ciudad principal (Main City) | Extraída de la dirección física — la IA confirma |
| Ciudades adicionales de cobertura | Opcional. Ej: Getafe, Alcorcón, Leganés |

> Las ciudades adicionales pueden generar URLs propias (AEAs) si el operador las aprueba en Doc B. Por defecto no generan URLs hasta aprobación explícita.

---

## Bloque 4 — GeoArticles

| Campo | Valor |
|-------|-------|
| Número de GeoArticles por servicio (G) | 3 por defecto. Puede ser 2. |
| Temas preferidos | Precio / Proceso / Comparativa (default) |

---

## Bloque 5 — Datos Finales (se completan al cierre, Fase D)

Estos campos se pueden dejar vacíos al inicio. La web usará `[PLACEHOLDER]` visible hasta que se aporten.

| Campo | Valor | Status |
|-------|-------|--------|
| GBP — ¿existe ficha? | Sí / No / Pendiente | |
| Tokens GitHub | | ⚠ pendiente si vacío |
| Tokens Cloudflare | | ⚠ pendiente si vacío |
| Dominio definitivo | | ⚠ pendiente si vacío |
| Imágenes del negocio | URLs o archivos | ⚠ pendiente si vacío |
| Diferenciadores reales | Años, certificaciones, garantías | |

---

## Reglas de este documento

1. **Verifica o para.** Si un campo bloqueante está vacío (nombre, categoría, dirección, ciudad), la IA para y pide — no inventa.
2. **No existe `⚠ inferido`.** O hay fuente verificable (este doc, Local Pack) o hay `⚠ placeholder` visible en la web.
3. **Main City viene del NAP.** La IA extrae la ciudad de la dirección física — no la inventa.
4. **Servicios los confirma el operador.** La IA propone ajustes en Doc B, pero el operador tiene la última palabra.
