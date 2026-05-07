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

