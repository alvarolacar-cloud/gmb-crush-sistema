## Fase 7 — Deploy

**Fuente:** `Doctrina GMB Crush` (Arquitectura técnica: Cloudflare Pages vía GitHub).

### Dónde están los tokens
Los tokens de GitHub y Cloudflare los declara el operador en `PREFLIGHT.md`.
Si no están, construye hasta `dist/` y marca `⚠ pendiente tokens` — no bloquees la ejecución.

### Con tokens
1. Crear repo GitHub con nombre `[slug-negocio]-web` (ej: `fontaneros-express-barcelona-web`)
2. Push del proyecto al repo
3. Conectar Cloudflare Pages al repo:
   - Build command: `pnpm run build`
   - Output directory: `dist/`
4. Verificar que la web está LIVE y todas las URLs de la URL Matrix responden

### Sin tokens
1. Entregar el proyecto completo con `dist/` generado
2. Añadir a la tabla de pendientes (Fase 8):

| Dato | Status | Qué se necesita |
|------|--------|-----------------|
| Deploy | ⚠ pendiente tokens | Operador provee GitHub token + Cloudflare credentials |
