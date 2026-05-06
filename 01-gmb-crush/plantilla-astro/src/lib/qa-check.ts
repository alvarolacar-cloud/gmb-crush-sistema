/**
 * qa-check.ts — Validador del cluster contra doctrina.
 *
 * Tests:
 *   T1-T3 (cobertura, fuentes, cross-refs) → delegado a validateCluster()
 *   T4 URL blacklist (near-me, best, cheap, etc.)
 *   T5 Web-First (no `sameAs Google Maps` en outputs pre-Bloque 7)
 *
 * Ejecución:
 *   CLUSTER_PATH=../clientes/[slug]/outputs.json npx tsx src/lib/qa-check.ts
 */

import { cluster, getPendientes, validateCluster } from "./cluster.ts";
import { urlContainsBlacklist } from "./constants.ts";
import { isMainModule } from "./cli.ts";

interface QAResult {
  pass: boolean;
  errors: string[];
  warnings: string[];
}

/* ──────────────────────────── TESTS ──────────────────────────── */

function testUrlBlacklist(): string[] {
  const errors: string[] = [];

  function walk(id: string, value: unknown): void {
    if (typeof value === "string") {
      if (value.startsWith("/") || value.startsWith("http")) {
        const result = urlContainsBlacklist(value);
        if (result.blocked) {
          errors.push(
            `[T4 Blacklist] Output "${id}" contiene URL con palabra prohibida "${result.word}" en "${value}"`
          );
        }
      }
    } else if (Array.isArray(value)) {
      value.forEach((v) => walk(id, v));
    } else if (value && typeof value === "object") {
      Object.values(value).forEach((v) => walk(id, v));
    }
  }

  for (const [id, output] of Object.entries(cluster.outputs)) {
    walk(id, output.value);
  }
  return errors;
}

function testWebFirst(): string[] {
  const errors: string[] = [];
  for (const [id, output] of Object.entries(cluster.outputs)) {
    if (output.bloque > 5) continue;
    const stringified = JSON.stringify(output.value).toLowerCase();
    if (stringified.includes("sameas") && stringified.includes("google.com/maps")) {
      errors.push(
        `[T5 Web-First] Output "${id}" (Bloque ${output.bloque}) contiene sameAs Google Maps — debe estar SOLO en Bloque 7`
      );
    }
  }
  return errors;
}

/* ──────────────────────────── EJECUTAR ──────────────────────────── */

export function runQACheck(): QAResult {
  const validationErrors = validateCluster().map(
    (e) => `[T1-T3 Validación] ${e.output_id}: ${e.reason}`
  );

  const errors = [...validationErrors, ...testUrlBlacklist(), ...testWebFirst()];

  const pendientes = getPendientes();
  const warnings = pendientes.map(
    (o) => `[⚠] Output "${o.id}" (${o.name}) — status: ${o.status} | ${o.source}`
  );

  return { pass: errors.length === 0, errors, warnings };
}

/* ──────────────────────────── CLI ──────────────────────────── */

if (isMainModule(import.meta.url)) {
  console.log(`▶ QA Check — cluster: ${cluster.slug} (${cluster.fecha_arranque})`);
  console.log(`  Outputs: ${Object.keys(cluster.outputs).length}`);
  console.log("");

  const result = runQACheck();

  if (result.errors.length > 0) {
    console.log("❌ Errores:");
    result.errors.forEach((e) => console.log(`  ${e}`));
    console.log("");
  }

  if (result.warnings.length > 0) {
    console.log(`⚠ Warnings (${result.warnings.length}) — outputs pendientes:`);
    result.warnings.forEach((w) => console.log(`  ${w}`));
    console.log("");
  }

  if (result.pass) {
    console.log("✅ QA PASS — todos los tests críticos OK");
    if (result.warnings.length > 0) {
      console.log(`   (${result.warnings.length} pendientes ⚠ — bloquean Bloque 7 GBP, NO el deploy)`);
    }
    process.exit(0);
  } else {
    console.log(`❌ QA FAIL — ${result.errors.length} error(es)`);
    process.exit(1);
  }
}
