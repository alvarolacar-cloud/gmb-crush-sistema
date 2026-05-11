/**
 * Adapter del cluster — slim.
 *
 * Carga outputs.json desde CLUSTER_PATH. Provee acceso genérico a cualquier output
 * por su ID. NO contiene getters opinados por page type — las páginas .astro del
 * cliente leen lo que necesitan vía getValue<T>("<id>").
 *
 * Uso típico en una página .astro:
 *   import { getValue } from "@lib/cluster";
 *   const services = getValue<{slug:string; name:string}[]>("1.9");
 *
 * Build de un cliente:
 *   CLUSTER_PATH=./outputs.json pnpm build
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { slugify } from "./slugify.ts";

interface ClusterOutput<T = unknown> {
  id: string;
  name: string;
  value: T;
  status: string;
  fuente: string;
  source: string;
  hereda_de?: string[];
  bloque?: number;
  notes?: string;
}

interface ClusterFile {
  slug: string;
  fecha_arranque: string;
  meta: { updated_at?: string; catalog_version?: string };
  outputs: Record<string, ClusterOutput>;
}

const CLUSTER_PATH = process.env.CLUSTER_PATH;
if (!CLUSTER_PATH) {
  throw new Error("CLUSTER_PATH no está definido. Ej: CLUSTER_PATH=./outputs.json pnpm build");
}

const absolutePath = resolve(process.cwd(), CLUSTER_PATH);
export const cluster: ClusterFile = JSON.parse(readFileSync(absolutePath, "utf-8"));

/* ───── ACCESO GENÉRICO ───── */

export function getOutput<T = unknown>(id: string): ClusterOutput<T> {
  const output = cluster.outputs[id];
  if (!output) {
    throw new Error(
      `Output ${id} no existe en outputs.json. Revísalo o quita la referencia en tu .astro.`
    );
  }
  return output as ClusterOutput<T>;
}

export function getValue<T = unknown>(id: string): T {
  return getOutput<T>(id).value;
}

/** Devuelve undefined si el output no existe (uso opcional). */
export function getValueOptional<T = unknown>(id: string): T | undefined {
  return cluster.outputs[id]?.value as T | undefined;
}

/* ───── ATAJOS COMUNES (no doctrinales, solo conveniencia) ───── */

export const getDomain = () => getValue<string>("1.2");
export const getBusinessName = () => getValueOptional<string>("1.1") ?? "[NOMBRE]";

/** Útil para canonical, OG, schema, etc. */
export const getSlug = () => cluster.slug;

/* ───── HELPERS PUROS ───── */

export { slugify };
