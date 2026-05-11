#!/bin/sh
# check-coherence.sh — Verifica coherencia entre AGENTS.md, SISTEMA.md, README.md
# y la estructura de docs de 01-gmb-crush/.
#
# Variante v0.5 — 4 documentos lineales (Doc A → Doc B → Doc C → Doc D) +
# referencia.md de consulta. Vive directamente en 01-gmb-crush/ (sin carpetas
# anidadas).
#
# Comprueba:
#   1. Los 4 docs lineales + referencia.md existen
#   2. Cada uno aparece referenciado en AGENTS.md (orden y nombre)
#   3. No quedan referencias huérfanas a la estructura vieja (fase-*, 02-ejecucion-ia/)
#   4. Cada .md en 01-gmb-crush/ raíz aparece referenciado en AGENTS, README o SISTEMA
#   5. README.md no menciona "N fases" (terminología vieja)
#
# Salida 0 si todo coherente, 1 si hay discrepancias.

set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

SISTEMA="01-gmb-crush/SISTEMA.md"
CRUSH_ROOT="01-gmb-crush"

EXPECTED_DOCS="doc-a-brief.md doc-b-investigacion.md doc-c-diseno.md doc-d-construccion.md referencia.md"

FAIL=0
fail() {
  printf '  \033[31mFAIL\033[0m  %s\n' "$1"
  FAIL=$((FAIL + 1))
}
ok() {
  printf '  \033[32mok\033[0m    %s\n' "$1"
}
section() {
  printf '\n\033[1m%s\033[0m\n' "$1"
}

# ─────────────────────────────────────────────────────────────────────
section '[1] Los 4 docs lineales + referencia.md existen en 01-gmb-crush/'

for doc in $EXPECTED_DOCS; do
  if [ -f "$CRUSH_ROOT/$doc" ]; then
    ok "$CRUSH_ROOT/$doc existe"
  else
    fail "$CRUSH_ROOT/$doc no existe (esperado por la variante v0.5)"
  fi
done

# ─────────────────────────────────────────────────────────────────────
section '[2] Cada doc esperado aparece referenciado en AGENTS.md'

for doc in $EXPECTED_DOCS; do
  if grep -qF "$doc" AGENTS.md 2>/dev/null; then
    ok "AGENTS.md referencia $doc"
  else
    fail "AGENTS.md no referencia $doc"
  fi
done

# ─────────────────────────────────────────────────────────────────────
section '[3] Sin referencias huérfanas a la estructura vieja'

# Patrones de la estructura vieja que NO deben aparecer en docs canónicos:
#   - "fase-N-..." (archivos de fases viejos)
#   - "02-ejecucion-ia" (carpeta vieja)
#   - "plantilla-astro" (eliminado en v0.4.0)
#   - "01-construccion-web/fases" (path viejo)
LEGACY_PATTERNS="fase-[0-9]+- 02-ejecucion-ia plantilla-astro 01-construccion-web/fases"

DOCS_TO_SCAN="AGENTS.md README.md $SISTEMA"
for doc_a in $CRUSH_ROOT/doc-a-brief.md $CRUSH_ROOT/doc-b-investigacion.md $CRUSH_ROOT/doc-c-diseno.md $CRUSH_ROOT/doc-d-construccion.md $CRUSH_ROOT/referencia.md; do
  [ -f "$doc_a" ] && DOCS_TO_SCAN="$DOCS_TO_SCAN $doc_a"
done

for pat in $LEGACY_PATTERNS; do
  HITS=$(grep -lE "$pat" $DOCS_TO_SCAN 2>/dev/null || true)
  if [ -n "$HITS" ]; then
    for h in $HITS; do
      fail "$h contiene referencia obsoleta '$pat'"
    done
  else
    ok "Ningún doc referencia '$pat'"
  fi
done

# ─────────────────────────────────────────────────────────────────────
section '[4] Cada .md en 01-gmb-crush/ raíz está referenciado en AGENTS/README/SISTEMA'

for FILE in "$CRUSH_ROOT"/*.md; do
  [ -f "$FILE" ] || continue
  BASENAME=$(basename "$FILE")
  [ "$BASENAME" = "SISTEMA.md" ] && continue
  REFCOUNT=$(grep -lF "$BASENAME" AGENTS.md README.md "$SISTEMA" 2>/dev/null | wc -l | tr -d ' ')
  if [ "$REFCOUNT" = "0" ]; then
    fail "$CRUSH_ROOT/$BASENAME existe pero no aparece en AGENTS.md, README.md ni SISTEMA.md"
  else
    ok "$BASENAME referenciado en $REFCOUNT doc(s) canónicos"
  fi
done

# ─────────────────────────────────────────────────────────────────────
section '[5] README.md y SISTEMA.md no usan terminología obsoleta'

# La variante v0.5 ya no habla de "N fases" como estructura del sistema —
# habla de "4 documentos". Permitimos mencionar "fases" dentro de un doc
# (Doc B tiene Fases internas) pero no como contador del sistema entero.
for f in README.md "$SISTEMA"; do
  if grep -qE '[0-9]+[[:space:]]+fases' "$f" 2>/dev/null; then
    fail "$f menciona 'N fases' (terminología v0.4 — la v0.5 usa 4 documentos)"
  else
    ok "$f sin referencias a 'N fases'"
  fi
done

# ─────────────────────────────────────────────────────────────────────
printf '\n'
if [ "$FAIL" -gt 0 ]; then
  printf '\033[31m%s problema(s) de coherencia.\033[0m Revisa los FAIL arriba.\n' "$FAIL"
  exit 1
fi
printf '\033[32mOK\033[0m: todos los checks de coherencia pasan.\n'
