#!/bin/sh
# check-coherence.sh — Verifica que valores canónicos repetidos en varios docs no se contradigan.
#
# Comprueba:
#   1. Nº de archivos en 01-gmb-crush/fases/ coincide con "Las N Fases" de SISTEMA.md
#   2. README.md y SISTEMA.md están de acuerdo en el número de fases
#   3. Cada fase referenciada en AGENTS.md o SISTEMA.md existe en fases/
#   4. Cada archivo en fases/ está referenciado en AGENTS.md o SISTEMA.md (orfano si no)
#   5. Cada archivo *.md en 01-gmb-crush/ raíz está referenciado en AGENTS, README o SISTEMA
#
# Salida 0 si todo coherente, 1 si hay discrepancias.

set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

FASES_DIR="01-gmb-crush/fases"
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

N_FILES=$(find "$FASES_DIR" -maxdepth 1 -type f -name '*.md' | wc -l | tr -d ' ')
ok "fases/ contiene $N_FILES archivos .md"

# Recoge TODOS los números distintos que cada archivo declara
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

# Contradicción intra-archivo: más de un número distinto
S_COUNT=$(echo $S_NUMS | wc -w | tr -d ' ')
R_COUNT=$(echo $R_NUMS | wc -w | tr -d ' ')
if [ "$S_COUNT" -gt 1 ]; then
  fail "SISTEMA.md se contradice — menciona $S_COUNT números distintos: $S_NUMS"
fi
if [ "$R_COUNT" -gt 1 ]; then
  fail "README.md se contradice — menciona $R_COUNT números distintos: $R_NUMS"
fi

# Comparación con el conteo real de archivos
for n in $S_NUMS; do
  if [ "$n" != "$N_FILES" ]; then
    fail "SISTEMA.md dice \"$n fases\" pero fases/ tiene $N_FILES archivos"
  fi
done
for n in $R_NUMS; do
  if [ "$n" != "$N_FILES" ]; then
    fail "README.md dice \"$n fases\" pero fases/ tiene $N_FILES archivos"
  fi
done

# ─────────────────────────────────────────────────────────────────────
section '[2] Cada fase referenciada en AGENTS.md o SISTEMA.md existe'

REFS=$(grep -hoE 'fase-[0-9a-z]+-[a-z-]+\.md' AGENTS.md "$SISTEMA" 2>/dev/null | sort -u)
for f in $REFS; do
  if [ ! -f "$FASES_DIR/$f" ]; then
    fail "Doctrina referencia $f pero el archivo no existe en $FASES_DIR/"
  else
    ok "$f existe (referenciado)"
  fi
done

# ─────────────────────────────────────────────────────────────────────
section '[3] Cada archivo en fases/ está referenciado en AGENTS.md o SISTEMA.md'

for FILE in "$FASES_DIR"/*.md; do
  [ -f "$FILE" ] || continue
  BASENAME=$(basename "$FILE")
  if ! grep -qF "$BASENAME" AGENTS.md "$SISTEMA" 2>/dev/null; then
    fail "$BASENAME existe en fases/ pero no aparece en AGENTS.md ni SISTEMA.md (orfano)"
  fi
done

# ─────────────────────────────────────────────────────────────────────
section '[4] Archivos en 01-gmb-crush/ raíz referenciados en docs canónicos'

for FILE in "$CRUSH_ROOT"/*.md; do
  [ -f "$FILE" ] || continue
  BASENAME=$(basename "$FILE")
  # Skip SISTEMA.md mismo (es el referente, no el referenciado en este check)
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
