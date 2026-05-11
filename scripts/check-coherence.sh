#!/bin/sh
# check-coherence.sh — Verifica coherencia entre docs canónicos y estructura de fases.
#
# Variante 6 fases — cada fase es un archivo `fase-N-*.md` O una carpeta `fase-N-*/` con README.md
#
# Comprueba:
#   1. Nº de fases coincide entre fases/, SISTEMA.md y README.md
#   2. SISTEMA.md no se contradice consigo mismo en el nº de fases
#   3. Cada entry de fase (archivo o carpeta) tiene su entrypoint (.md o README.md)
#   4. Cada archivo .md en 01-gmb-crush/ raíz está referenciado en AGENTS, README o SISTEMA
#
# Salida 0 si todo coherente, 1 si hay discrepancias.

set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

FASES_DIR="01-gmb-crush/02-ejecucion-ia/01-construccion-web/fases"
SISTEMA="01-gmb-crush/SISTEMA.md"
CRUSH_ROOT="01-gmb-crush"

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
section '[1] Número de fases coherente entre fases/, SISTEMA.md, README.md'

# Cuenta entradas en fases/ que son fase válida:
#  - archivo: fase-N-*.md a nivel 1
#  - carpeta: fase-N-*/ a nivel 1 (con README.md dentro)
N_FILES=$(find "$FASES_DIR" -maxdepth 1 -mindepth 1 -type f -name 'fase-*.md' | wc -l | tr -d ' ')
N_DIRS=$(find "$FASES_DIR" -maxdepth 1 -mindepth 1 -type d -name 'fase-*' | wc -l | tr -d ' ')
N_TOTAL=$((N_FILES + N_DIRS))
ok "fases/ contiene $N_TOTAL fases (${N_FILES} archivos + ${N_DIRS} carpetas)"

# Verificar que cada carpeta tiene README.md
for d in "$FASES_DIR"/fase-*/; do
  [ -d "$d" ] || continue
  if [ ! -f "$d/README.md" ]; then
    fail "$d carpeta sin README.md (entrypoint requerido)"
  fi
done

distinct_counts() {
  grep -oiE '[0-9]+[[:space:]]+fases' "$1" 2>/dev/null \
    | grep -oE '[0-9]+' | sort -u | tr '\n' ' '
}

S_NUMS=$(distinct_counts "$SISTEMA")
R_NUMS=$(distinct_counts README.md)

[ -n "$S_NUMS" ] && ok "SISTEMA.md menciona números: $S_NUMS" \
                || ok 'SISTEMA.md no declara nº explícito'
[ -n "$R_NUMS" ] && ok "README.md menciona números: $R_NUMS" \
                || ok 'README.md no declara nº explícito'

S_COUNT=$(echo $S_NUMS | wc -w | tr -d ' ')
R_COUNT=$(echo $R_NUMS | wc -w | tr -d ' ')
if [ "$S_COUNT" -gt 1 ]; then
  fail "SISTEMA.md se contradice — menciona $S_COUNT números distintos: $S_NUMS"
fi
if [ "$R_COUNT" -gt 1 ]; then
  fail "README.md se contradice — menciona $R_COUNT números distintos: $R_NUMS"
fi

for n in $S_NUMS; do
  if [ "$n" != "$N_TOTAL" ]; then
    fail "SISTEMA.md dice \"$n fases\" pero fases/ tiene $N_TOTAL entradas"
  fi
done
for n in $R_NUMS; do
  if [ "$n" != "$N_TOTAL" ]; then
    fail "README.md dice \"$n fases\" pero fases/ tiene $N_TOTAL entradas"
  fi
done

# ─────────────────────────────────────────────────────────────────────
section '[2] Cada fase referenciada en AGENTS.md o SISTEMA.md existe'

# Busca referencias a archivos o carpetas de fase
REFS_FILES=$(grep -hoE 'fase-[0-9a-z]+-[a-z0-9-]+\.md' AGENTS.md "$SISTEMA" 2>/dev/null | sort -u)
REFS_DIRS=$(grep -hoE 'fase-[0-9a-z]+-[a-z0-9-]+/README\.md' AGENTS.md "$SISTEMA" 2>/dev/null | sort -u)

for f in $REFS_FILES; do
  # Skip si es un README.md dentro de carpeta (ya cubierto por REFS_DIRS)
  case "$f" in
    *README.md) continue ;;
  esac
  if [ -f "$FASES_DIR/$f" ]; then
    ok "$f existe (referenciado como archivo)"
  fi
done

for ref in $REFS_DIRS; do
  if [ -f "$FASES_DIR/$ref" ]; then
    ok "$ref existe (referenciado como carpeta)"
  else
    fail "Doctrina referencia $ref pero no existe"
  fi
done

# ─────────────────────────────────────────────────────────────────────
section '[3] Cada entrada en fases/ está referenciada en AGENTS o SISTEMA'

for entry in "$FASES_DIR"/fase-*; do
  [ -e "$entry" ] || continue
  BASENAME=$(basename "$entry")
  if [ -d "$entry" ]; then
    PATTERN="$BASENAME/README.md"
  else
    PATTERN="$BASENAME"
  fi
  if ! grep -qF "$PATTERN" AGENTS.md "$SISTEMA" 2>/dev/null; then
    fail "$PATTERN existe pero no aparece en AGENTS.md ni SISTEMA.md (orfano)"
  fi
done

# ─────────────────────────────────────────────────────────────────────
section '[4] Archivos en 01-gmb-crush/ raíz referenciados en docs canónicos'

for FILE in "$CRUSH_ROOT"/*.md; do
  [ -f "$FILE" ] || continue
  BASENAME=$(basename "$FILE")
  [ "$BASENAME" = "SISTEMA.md" ] && continue
  REFCOUNT=$(grep -lF "$BASENAME" AGENTS.md README.md "$SISTEMA" 2>/dev/null | wc -l | tr -d ' ')
  if [ "$REFCOUNT" = "0" ]; then
    fail "$CRUSH_ROOT/$BASENAME existe pero no aparece en AGENTS.md, README.md ni SISTEMA.md"
  fi
done

# ─────────────────────────────────────────────────────────────────────
printf '\n'
if [ "$FAIL" -gt 0 ]; then
  printf '\033[31m%s problema(s) de coherencia.\033[0m Revisa los FAIL arriba.\n' "$FAIL"
  exit 1
fi
printf '\033[32mOK\033[0m: todos los checks de coherencia pasan.\n'
