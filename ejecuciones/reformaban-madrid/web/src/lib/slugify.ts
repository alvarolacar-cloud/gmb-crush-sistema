/**
 * Slugify según doctrina/url-patterns.md.
 *
 * Reglas:
 *   1. lowercase
 *   2. sin acentos / diacríticos (NFD + remove combining marks)
 *   3. kebab-case (separador `-`)
 *   4. solo [a-z0-9-]
 *   5. sin guiones consecutivos
 *   6. sin guion al inicio o final
 */

// eslint-disable-next-line no-misleading-character-class
const COMBINING_MARKS_RE = new RegExp("[\\u0300-\\u036f]", "g");

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(COMBINING_MARKS_RE, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
