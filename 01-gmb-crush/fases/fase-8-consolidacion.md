# Fase 8 — Consolidación, Informe Final y Bloqueo GBP

Esta fase cierra el proyecto. Produce dos entregables al operador y bloquea la creación del GBP hasta que el operador resuelva los pendientes.

---

## 8.1 Entregable A — URL de la web

Si el deploy se ejecutó (Fase 7 con tokens), la URL de Cloudflare Pages.
Si el deploy quedó pendiente, indicar dónde está `dist/` listo para subir manualmente.

---

## 8.2 Entregable B — INFORME-FINAL.md

Crear el archivo `ejecuciones-webs/gmb-crush-ejecuciones/[slug]/INFORME-FINAL.md` con esta estructura exacta:

```markdown
# INFORME FINAL — [Nombre del cliente]

**Fecha:** [YYYY-MM-DD]
**URL final:** [https://... o "pendiente deploy"]
**Sistema usado:** GMB Crush (sistemas-creacion-webs/01-gmb-crush)

---

## 1. Resumen ejecutivo

[2-4 líneas: qué se construyó, cuántas páginas, estado del deploy.]

---

## 2. Datos del operador no aportados (placeholders visibles en la web)

| Campo | Marcador en la web | Cómo cerrar |
|-------|--------------------|-------------|
| Teléfono | `[TELÉFONO]` | El operador provee el número, rebuild + redeploy |
| Email | `[EMAIL]` | El operador provee el email, rebuild + redeploy |
| ... | ... | ... |

> Estos placeholders son visibles para cualquier visitante de la web. La página NO es comercial hasta cerrarlos.

---

## 3. Datos derivados (la IA los calculó desde otros)

| Dato | Valor usado | Derivado de | Confirmar / cambiar |
|------|-------------|-------------|---------------------|
| Nombre del negocio | "Tergo Reformas" | servicio + ciudad | El operador valida o reescribe |
| Dominio | `https://www.tergo-reformas.com/` | slug del nombre | El operador valida o cambia |
| ... | ... | ... | ... |

---

## 4. Decisiones tomadas con limitaciones de capacidad

[Solo si el pre-flight de capacidades de AGENTS.md §3 reportó algo faltante. Ejemplo:]

- **Fase 5 (Diseño):** No tenía capacidad de screenshot. El operador entregó capturas manuales de [URL ref]. Tokens extraídos: [resumen].
- **Fase 7 (Deploy):** Sin tokens GitHub/Cloudflare. Build entregado en `dist/` para subida manual.

Si no hubo limitaciones, omitir esta sección.

---

## 5. Pendientes de cierre

| # | Dato | Status | Afecta a | Qué se necesita | Bloquea GBP |
|---|------|--------|----------|-----------------|:-----------:|
| 1 | Teléfono | `⚠ placeholder` | NAP, schema, contacto | Operador lo provee | ✓ |
| 2 | Deploy | `⚠ pendiente tokens` | Web no está live | Operador provee tokens GitHub + Cloudflare | ✓ |
| ... | ... | ... | ... | ... | ... |

---

## 6. Auditoría de fuentes

Lista de outputs `confirmed` con su fuente, para que el operador pueda re-verificar si quiere:

| Output | Valor | Fuente | Evidencia |
|--------|-------|--------|-----------|
| 1.5 Primary Category | "Empresa de reformas" | Local Pack Madrid 2026-05-09 | aparece en 4/5 perfiles |
| 1.9 Core Services | [lista] | Local Pack Madrid + Barcelona | aparecen en 2+ ciudades |
| 16.1 Design tokens | [tokens] | Web ref tergo.com — screenshots + CSS computado | archivos en `diseno/` |

---

## 7. Bloqueo del GBP

> El Paso 14 (Creación del Google Business Profile) queda **BLOQUEADO** hasta que todos los `⚠` de la sección 5 estén cerrados.
>
> La web tolera marcadores visibles; el GBP no admite datos placeholder.
```

**Reglas para llenar el informe:**

- Sección 2: solo lista campos que el operador NO aportó y que la IA marcó con `[PLACEHOLDER]` visible.
- Sección 3: solo lista derivaciones (nombre desde servicio+ciudad, dominio desde slug, etc.). NO inferencias prohibidas.
- Sección 4: solo si el pre-flight de capacidades reportó alguna falta. Si todo el pre-flight fue ✓ + `confirmed`, omitir.
- Sección 6: una fila por output `confirmed` o `validated` con evidencia trazable. Si la IA no puede citar evidencia → el output no debió ser `confirmed`.

---

## 8.3 Aviso al operador en el chat

Al cerrar la sesión, la IA dice exactamente esto:

> ✅ Web construida [+ desplegada en URL si aplica].
>
> 📋 Informe final: `ejecuciones-webs/gmb-crush-ejecuciones/[slug]/INFORME-FINAL.md`
>
> Resumen rápido:
> - **Placeholders visibles en la web:** [N] datos del operador faltan ([lista corta]).
> - **Pendientes que bloquean GBP:** [N] entradas.
> - **Limitaciones de capacidad encontradas:** [si hubo, resumen breve].
>
> Cuando cierres los placeholders, dime y rebuilds + redeploy. El GBP queda bloqueado hasta entonces.

---

## 8.4 Cierre de pendientes (cuando el operador resuelve cada uno)

1. Actualizar contenido / schema afectado.
2. Rebuild (`pnpm build`).
3. Redeploy.
4. Eliminar la fila de la tabla en INFORME-FINAL.md sección 5.
5. Cuando la tabla esté vacía → desbloquear creación de GBP.
