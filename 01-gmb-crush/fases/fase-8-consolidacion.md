## 10. Fase 8 — Consolidación y Pendientes

Entrega al operador:

### 10.1 URL de la web (si se desplego)

### 10.2 Tabla de Pendientes

```markdown
| # | Dato | Status | Afecta a | Qué se necesita |
|---|------|--------|----------|-----------------|
| 1 | Teléfono | ⚠ placeholder | NAP, schema, contacto | Cliente lo provee |
| 2 | Primary Category | ⚠ inferido | Arquitectura, schema | Validar con Local Pack |
| 3 | Topics GeoArticles | ⚠ inferido | Contenido GAs | Validar con keyword research |
| 4 | Deploy | ⚠ pendiente tokens | Web no está live | Operador provee tokens |
```

### 10.3 Aviso de bloqueo GBP
> El Paso 14 (Creación del Google Business Profile) queda **BLOQUEADO** hasta que todos los `⚠` de esta tabla estén cerrados. La web tolera datos provisionales; el GBP no.

### 10.4 Formato de cierre de pendientes
Cuando el operador entregue un dato pendiente:
1. Actualizar el contenido/schema afectado.
2. Rebuild (`pnpm build`).
3. Re-deploy.
4. Eliminar la fila de la tabla.
5. Cuando la tabla esté vacía → GBP desbloqueado.

---

## 11. Instrucción de Arranque

**Antes de ejecutar, pregunta al operador:**

> ¿Quieres que busque datos reales (Local Pack, keyword research) o que infiera y avance rápido?

Con la respuesta, decides:
- **"Busca datos reales":** Ejecutas las fuentes canónicas (Google Maps top 5, Ahrefs/Semrush). Los outputs salen como `confirmed` o `validated`. Más lento, más preciso.
- **"Infiere y avanza":** Infieres con lógica y marcas `⚠ inferido`. La tabla de pendientes indicará qué validar después. Más rápido, requiere validación posterior.

**Si el operador dice "busca" y tienes acceso a la tool, DEBES usarla.** No inferir por rapidez cuando el operador pidió datos reales.

Después, pide el Preflight al operador con este mensaje exacto:

> Pásame los datos del preflight. Recuerda indicarme las ciudades que quieres que analice cuando investigue el Local Pack (tu ciudad principal + las que quieras para comparar servicios del sector).

Cuando lo tengas, ejecuta las 8 fases en orden sin detenerte. Si necesitas más detalle sobre el contenido de cada page type, consulta `referencias/page-type-specs.md`. Si necesitas ver un ejemplo completo de arquitectura, consulta `referencias/ejemplo-cerrajeros.md`.
