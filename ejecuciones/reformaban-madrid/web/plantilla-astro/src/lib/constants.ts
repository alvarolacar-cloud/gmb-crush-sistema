/**
 * Constantes doctrinales del sistema GMB Crush v2.
 *
 * Estas constantes son LITERALES del manual GMB Crush — NO se modifican.
 * Cualquier output que las viole falla qa-check y bloquea deploy.
 *
 * Doctrina referenciada:
 *   doctrina/reglas-operativas.md (cheat sheet)
 *   doctrina/page-types.md
 *   doctrina/url-patterns.md (blacklists)
 *   doctrina/fidelidad-original.md (constantes confirmadas)
 */

/* ──────────────────────────── DEFAULTS DOCTRINALES ──────────────────────────── */

export const G_DEFAULT = 3; // GeoArticles per service
export const S_DEFAULT = 5; // core services
export const E_DEFAULT = 0; // expansion areas en Phase 1
export const TRUST_SIGNAL_THRESHOLD = 3; // perfiles top 5 que deben tener un signal para considerarlo "estándar"

/* ──────────────────────────── PRIORITY SCORE ──────────────────────────── */

export const PRIORITY_RANGE: readonly [number, number] = [6, 30] as const;

export const TIER_THRESHOLDS = {
  P1: 26,
  P2: 21,
  P3: 16,
  P4: 10,
  Hold: 6,
} as const;

/* ──────────────────────────── HP — REGLAS FORZADAS ──────────────────────────── */

export const HP_FORCED_TIER = "P1" as const;
export const HP_FORCED_PHASE = 1 as const;
export const HP_URL = "/" as const;

/* ──────────────────────────── LCAs ──────────────────────────── */

/**
 * Las LCAs (Lista, Salamanca, Chamberí, etc.) NO generan URLs.
 * Aparecen como menciones en copy + en `areaServed` schema.
 *
 * Si esta constante es false, el generador de páginas NO debe crear `/madrid/lista/`.
 */
export const LCAS_GENERATE_URLS = false;

/* ──────────────────────────── WORD COUNTS POR PAGE TYPE ──────────────────────────── */

export const WORD_COUNT_RANGES = {
  HP: { min: 900, max: 1300 },
  SO: { min: 850, max: 1000 },
  LBS: { min: 800, max: 1000 },
  AC: { min: 800, max: 1000 },
  GH: { min: 700, max: 1100 },
  GA: { min: 1000, max: 1500 },
} as const;

/* ──────────────────────────── BLOQUES ESTRUCTURALES POR PAGE TYPE ──────────────────────────── */

export const STRUCTURAL_BLOCKS = {
  HP: 11,
  SO: 11,
  LBS: 12,
  AC: 11,
  GH: 10,
  GA: 10,
} as const;

/* ──────────────────────────── ANCHOR TEXT CATEGORIES ──────────────────────────── */

/**
 * 5 categorías de anchor text (NO 6 — la "Local entity" del v1 era invento detectado).
 */
export const ANCHOR_CATEGORIES = ["branded", "exact", "partial", "topic", "generic"] as const;

/* ──────────────────────────── URL BLACKLISTS ──────────────────────────── */

/**
 * Palabras prohibidas en URLs (doctrina/url-patterns.md).
 * Si una URL las contiene, falla qa-check.
 */
export const URL_BLACKLIST_NEAR_ME = [
  "near-me",
  "cerca-de-mi",
  "cerca-mi",
  "nearby",
] as const;

export const URL_BLACKLIST_EMPTY_ADJECTIVES = [
  "best",
  "mejor",
  "top",
  "top-rated",
  "cheap",
  "barato",
  "economico",
  "low-cost",
  "professional",
  "profesional",
  "trusted",
  "fiable",
  "confiable",
  "quick",
  "rapido",
  "fast",
] as const;

export function urlContainsBlacklist(url: string): { blocked: boolean; word?: string } {
  const lowered = url.toLowerCase();
  for (const word of URL_BLACKLIST_NEAR_ME) {
    if (lowered.includes(word)) return { blocked: true, word };
  }
  for (const word of URL_BLACKLIST_EMPTY_ADJECTIVES) {
    // \b para no matchear "best" dentro de "bestiario"
    const re = new RegExp(`\\b${word}\\b`);
    if (re.test(lowered)) return { blocked: true, word };
  }
  return { blocked: false };
}

/* ──────────────────────────── GBP ──────────────────────────── */

export const GBP_DESCRIPTION_MAX_CHARS = 750;

export const GBP_LIFECYCLE_STATES = [
  "Not Created",
  "Created",
  "Verified",
  "Pending",
  "Suspended",
] as const;

export const BUSINESS_MODELS = ["Storefront", "SAB", "Hybrid"] as const;

export const CTA_OPTIONS = [
  "Llamar ahora",
  "Reservar online",
  "Solicitar presupuesto",
  "Contactar",
] as const;

/* ──────────────────────────── NAP ──────────────────────────── */

export const NAP_FIELDS = [
  "name",
  "street",
  "city",
  "state",
  "zip",
  "country",
  "phone",
  "email",
] as const;
