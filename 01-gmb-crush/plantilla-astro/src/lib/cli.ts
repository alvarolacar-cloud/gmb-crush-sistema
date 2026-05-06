/**
 * Helpers para scripts CLI ejecutados con tsx/node.
 */

/**
 * Detecta si el módulo se está ejecutando como script principal (no importado).
 * Idiomatic ESM: comparar import.meta.url con argv[1] convertido a file URL.
 */
export function isMainModule(metaUrl: string): boolean {
  const argv1 = process.argv[1];
  if (!argv1) return false;
  // Normalizar argv1 a file URL para compararlo con import.meta.url
  const argvUrl = new URL(`file://${argv1.replace(/\\/g, "/")}`).href;
  return metaUrl === argvUrl;
}
