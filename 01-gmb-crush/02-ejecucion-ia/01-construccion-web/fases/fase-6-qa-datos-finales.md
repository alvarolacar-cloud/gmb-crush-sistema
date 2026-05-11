# Fase 6 — QA Final + Datos Finales

**Cuándo se ejecuta:** después de Fase 5 (Build + Deploy). Es la última fase del flujo.

**Tipo de parada:** **blocking**. Esta fase combina entrega del proyecto + recogida de inputs finales del operador (teléfono, email, tokens, dominio definitivo, GBP). El operador tarda en aportar; la IA espera.

---

## Qué hace esta fase

Tres bloques secuenciales (no son sub-fases con archivos propios — viven aquí):

### Bloque 1 — QA Visual contra web de referencia

Compara el site construido contra la web de referencia que se usó en Fase 4:

1. Screenshot del site construido (HP + 1 LBS + 1 GA + Contacto).
2. Screenshot de la web de referencia (mismas secciones).
3. Tabla de discrepancias por sección:

| Sección | Referencia | Construido | Discrepancia | Severidad |
|---------|-----------|------------|--------------|:---------:|
| Hero | [descripción] | [descripción] | [diferencia] | 🔴 / 🟡 / ⚪ |
| Servicios | ... | ... | ... | ... |

**Severidad:**
- 🔴 **Bloqueante** — color primario diferente, layout roto, texto ilegible → corregir antes de entregar (theme.css o plantilla).
- 🟡 **Menor** — espaciado ligeramente diferente, sombra distinta → documentar en INFORME-FINAL §4.3.
- ⚪ **Aceptada** — diferencia intencional → documentar.

Si hay 🔴 → corregir y rebuildar antes de continuar. Si solo hay 🟡 / ⚪ → documentar y seguir.

### Bloque 2 — Generar INFORME-FINAL.md

Crea `ejecuciones-webs/gmb-crush-ejecuciones/[slug]/INFORME-FINAL.md` con 7 secciones:

```markdown
# INFORME FINAL — [Nombre del cliente]

**Fecha:** [YYYY-MM-DD]
**URL final:** [URL live o "pendiente deploy"]
**Sistema usado:** GMB Crush variante doctrinal (6 fases)

## 1. Resumen ejecutivo
## 2. Datos del operador no aportados (placeholders visibles en la web)
## 3. Datos derivados (la IA los calculó desde otros)
## 4. Decisiones tomadas con limitaciones de capacidad
   4.1 Pre-flight de capacidades (Fase 1)
   4.2 Bugs técnicos detectados en QA visual
   4.3 Inconsistencias menores documentadas
## 5. Pendientes de cierre (lo que el operador resuelve EN ESTA FASE)
## 6. Auditoría de fuentes (outputs confirmed + evidencia)
## 7. Bloqueo del GBP
```

### Bloque 3 — Parada blocking · operador aporta inputs finales

Lee `01-gmb-crush/02-ejecucion-ia/01-construccion-web/fases/fase-2-inputs-investigacion/01-inputs.md` §Finales y pide al operador el mensaje exacto que vive ahí. Los inputs finales típicos:

- Teléfono real, Email real
- Estado GBP final (Created / Verified)
- Tokens deploy (GitHub PAT, Cloudflare Account ID, API Token)
- Dominio definitivo
- Imágenes propias (logo + heros)
- Diferenciadores propios (años, certificaciones, etc.)

**Por cada cierre del operador:**

1. Actualizas el campo correspondiente en `outputs.json` (o en `astro.config.mjs` si es dominio, o en `theme.css` si es algo visual).
2. Si afectó al build: rebuild local.
3. Si afectó al deploy: redeploy.
4. Eliminas la fila correspondiente en `INFORME-FINAL.md §5 Pendientes`.
5. Continúas esperando inputs adicionales.

Cuando la tabla de pendientes esté vacía → desbloqueas la creación del GBP, actualizas el `INFORME-FINAL.md §7` con "GBP DESBLOQUEADO" y das el proyecto por entregado.

---

## Parada blocking

La fase **NO termina sola**. Espera al operador. La IA puede pausar indefinidamente entre cierres sucesivos de pendientes — el flujo se reactiva cada vez que el operador aporta algo nuevo.

---

## Gate de salida (para dar el proyecto por entregado)

- [ ] QA Visual completado, sin 🔴 bloqueantes (o documentados como corregidos).
- [ ] `INFORME-FINAL.md` generado con sus 7 secciones.
- [ ] Web LIVE en producción (URL final operativa) — o entregada como `dist/` si el operador rechazó tokens.
- [ ] GBP creado y enlazado en schema (o explícitamente diferido por el operador).
- [ ] Tabla de pendientes vacía o reducida a items que el operador decidió no cerrar.

Cuando estos 5 checks están ✓ → proyecto entregado, fin del flujo.
