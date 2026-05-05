/**
 * generate-pendientes.ts — Genera pendientes.md desde outputs.json.
 *
 * Filtra outputs con status `⚠` y los formatea como tabla con timestamp.
 *
 * Uso:
 *   CLUSTER_PATH=../clientes/[slug]/outputs.json \
 *   PENDIENTES_OUT=../clientes/[slug]/pendientes.md \
 *   npx tsx src/lib/generate-pendientes.ts
 */

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { cluster, getPendientes } from "./cluster.ts";
import { isMainModule } from "./cli.ts";
import type { Output } from "./types.ts";

const VALUE_PREVIEW_MAX = 60;

function formatValuePreview(value: unknown): string {
  if (typeof value === "string") return value.slice(0, VALUE_PREVIEW_MAX);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return JSON.stringify(value).slice(0, VALUE_PREVIEW_MAX) + "…";
}

function actionFor(output: Output): string {
  if (output.status === "⚠ inferido") {
    return "Operador ejecuta tool real (Local Pack / KW Research / Catastro)";
  }
  if (output.status === "⚠ placeholder") {
    return "Cliente entrega dato real";
  }
  return "—";
}

export function buildPendientesMarkdown(): string {
  const pendientes = getPendientes();
  const now = new Date().toISOString();

  if (pendientes.length === 0) {
    return [
      `# Pendientes — ${cluster.slug}`,
      "",
      `> **Generado:** ${now}`,
      "> **Total pendientes:** 0",
      "",
      "✅ **Sin pendientes.** Bloque 7 GBP desbloqueado — listo para crear el GBP.",
      "",
    ].join("\n");
  }

  const lines = [
    `# Pendientes — ${cluster.slug}`,
    "",
    `> **Generado:** ${now}`,
    `> **Total pendientes:** ${pendientes.length}`,
    "",
    `> ⚠ Mientras esta tabla NO esté vacía, **el Bloque 7 GBP está bloqueado**.`,
    "> La web SÍ puede salir LIVE con estos pendientes (saldrán visibles en HTML como placeholders).",
    "",
    "---",
    "",
    "## Tabla de pendientes",
    "",
    "| Output | Nombre | Status | Valor actual | Acción | Quién |",
    "|---|---|---|---|---|---|",
  ];

  for (const o of pendientes) {
    const valuePreview = formatValuePreview(o.value).replace(/\|/g, "\\|");
    const accion = actionFor(o);
    const quien = o.status === "⚠ placeholder" ? "Cliente" : "Operador";
    lines.push(`| ${o.id} | ${o.name} | ${o.status} | \`${valuePreview}\` | ${accion} | ${quien} |`);
  }

  lines.push(
    "",
    "---",
    "",
    "## Cómo cerrar un pendiente",
    "",
    "1. Obtener el dato real (cliente entrega o operador ejecuta tool)",
    "2. Editar `outputs.json` → actualizar `value`, cambiar `status` a `confirmed`/`validated`",
    "3. Actualizar `source` con la fecha y prueba real",
    "4. Re-ejecutar `qa-check` y `generate-pendientes`",
    "5. Si afecta HTML publicado → re-deploy",
    ""
  );

  return lines.join("\n");
}

/* ──────────────────────────── CLI ──────────────────────────── */

if (isMainModule(import.meta.url)) {
  const out = process.env.PENDIENTES_OUT;
  if (!out) {
    console.error("PENDIENTES_OUT no está definido. Uso:");
    console.error(
      "  CLUSTER_PATH=../clientes/[slug]/outputs.json PENDIENTES_OUT=../clientes/[slug]/pendientes.md npx tsx src/lib/generate-pendientes.ts"
    );
    process.exit(1);
  }

  const md = buildPendientesMarkdown();
  const absoluteOut = resolve(process.cwd(), out);
  writeFileSync(absoluteOut, md, "utf-8");

  console.log(`✅ pendientes.md escrito en ${absoluteOut}`);
  console.log(`   ${getPendientes().length} pendientes documentados`);
}
