/**
 * Adapter del cluster: carga outputs.json desde CLUSTER_PATH y expone helpers para Astro pages.
 *
 * Uso en Astro:
 *   import { getNAP, getServices } from "@lib/cluster";
 *
 * Build de un cliente:
 *   CLUSTER_PATH=../clientes/[slug]/outputs.json pnpm build
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type {
  Cluster,
  Output,
  AdditionalCategory,
  DesignTokens,
  FAQ,
  GeoArticleTopic,
  LCAs,
  NAP,
  Service,
} from "./types.ts";
import { STATUS_BLOCKS_GBP } from "./types.ts";
import { CATALOGO_INDEX, CATALOG_VERSION } from "./catalogo.ts";
import { FUENTES_VALIDAS_COMPLETAS } from "./types.ts";
import { slugify } from "./slugify.ts";

/* ──────────────────────────── CARGA ──────────────────────────── */

const CLUSTER_PATH = process.env.CLUSTER_PATH;

if (!CLUSTER_PATH) {
  throw new Error(
    "CLUSTER_PATH no está definido. Build con: CLUSTER_PATH=../clientes/[slug]/outputs.json pnpm build"
  );
}

const absolutePath = resolve(process.cwd(), CLUSTER_PATH);
const outputsRaw = JSON.parse(readFileSync(absolutePath, "utf-8"));

export const cluster: Cluster = outputsRaw as Cluster;

/* ──────────────────────────── FAIL-FAST ──────────────────────────── */

if (cluster.meta.catalog_version !== CATALOG_VERSION) {
  throw new Error(
    `[cluster] Versión catálogo desincronizada: outputs.json=${cluster.meta.catalog_version}, código=${CATALOG_VERSION}.`
  );
}

/* ──────────────────────────── ACCESORES TIPADOS ──────────────────────────── */

export function getOutput<T = unknown>(id: string): Output<T> {
  const output = cluster.outputs[id];
  if (!output) {
    throw new Error(`Output ${id} no existe en outputs.json. Revisar catálogo + outputs.json`);
  }
  return output as Output<T>;
}

export function getValue<T = unknown>(id: string): T {
  return getOutput<T>(id).value;
}

/* ──────────────────────────── HELPERS DEL DOMINIO ──────────────────────────── */

export const getBusinessName = () => getValue<string>("1.1");
export const getDomain = () => getValue<string>("1.2");
export const getNAP = () => getValue<NAP>("1.4");
export const getPrimaryCategory = () => getValue<string>("1.5");
export const getAdditionalCategories = () => getValue<AdditionalCategory[]>("1.6");
export const getMainCity = () => getValue<string>("1.7");
export const getServices = () => getValue<Service[]>("1.9");
export const getLCAs = () => getValue<LCAs>("1.10");
export const getApprovedExpansionAreas = () => getValue<string[]>("1.11");
export const getPreferredCTA = () => getValue<string>("1.13");
export const getTrustSignals = () => getValue<string[]>("1.14");
export const getGeoHubURLStyle = () => getValue<string>("3.2");
export const getGeoArticleTopics = () => getValue<GeoArticleTopic[]>("3.4");
export const getDesignTokens = () => getValue<DesignTokens>("16.1");

export function getMainCitySlug(): string {
  return slugify(getMainCity());
}

/** Slug de la categoría primaria (ej. "Bathroom remodeler" → "bathroom-remodeler"). */
export function getPrimaryCategorySlug(): string {
  return slugify(getPrimaryCategory());
}

/** Devuelve los outputs FAQ por page type. Vacío si el cliente no los ha declarado. */
function getFaqsByOutputId(outputId: string): FAQ[] {
  const output = cluster.outputs[outputId];
  if (!output) return [];
  return (output.value as FAQ[]) ?? [];
}

export const getFaqsHomepage = () => getFaqsByOutputId("15.1");
export const getFaqsServiceOverview = () => getFaqsByOutputId("15.2");
export const getFaqsLBS = () => getFaqsByOutputId("15.3");
export const getFaqsAdditionalCategory = () => getFaqsByOutputId("15.4");
export const getFaqsGeoHub = () => getFaqsByOutputId("15.5");
export const getFaqsGeoArticle = () => getFaqsByOutputId("15.6");

/** Solo Additional Categories que necesitan página propia. */
export function getAdditionalCategoriesWithPage(): AdditionalCategory[] {
  return getAdditionalCategories().filter((ac) => ac.needs_page);
}

/** Atajo para construir URLs `tel:` desde un phone — formato consistente. */
export function phoneHref(phone: string): string {
  return `tel:${phone.replace(/\s/g, "")}`;
}

/** Construye el bloque PostalAddress de schema.org desde el NAP. */
export function buildPostalAddress(nap: NAP): Record<string, unknown> {
  return {
    "@type": "PostalAddress",
    streetAddress: nap.street,
    addressLocality: nap.city,
    addressRegion: nap.state,
    postalCode: nap.zip,
    addressCountry: "ES",
  };
}

/** Construye el array `areaServed` (Main City + LCAs direct + candidate). */
export function buildAreaServed(): Record<string, unknown>[] {
  const lcas = getLCAs();
  const all = [getMainCity(), ...lcas.direct, ...lcas.candidate];
  return all.map((name) => ({ "@type": "City", name }));
}

/* ──────────────────────────── PENDIENTES ──────────────────────────── */

export function getPendientes(): Output[] {
  return Object.values(cluster.outputs).filter((o) => STATUS_BLOCKS_GBP.includes(o.status));
}

export function isReadyForGBP(): boolean {
  return getPendientes().length === 0;
}

/* ──────────────────────────── VALIDACIÓN ──────────────────────────── */

export interface ValidationError {
  output_id: string;
  reason: string;
}

/**
 * Valida que outputs.json cumple la doctrina:
 *  1. Cada output existe en el catálogo
 *  2. Fuente declarada está en el catálogo de 8 + Info heredada + no aplica
 *  3. Cross-refs `hereda_de` apuntan a outputs existentes en el cluster
 */
export function validateCluster(): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const [id, output] of Object.entries(cluster.outputs)) {
    const def = CATALOGO_INDEX[id];

    if (!def) {
      errors.push({ output_id: id, reason: `No existe en catálogo` });
      continue;
    }

    if (output.fuente !== def.fuente_esperada) {
      errors.push({
        output_id: id,
        reason: `Fuente declarada "${output.fuente}" ≠ esperada "${def.fuente_esperada}"`,
      });
    }

    if (!FUENTES_VALIDAS_COMPLETAS.has(output.fuente)) {
      errors.push({
        output_id: id,
        reason: `Fuente "${output.fuente}" no está en el catálogo de 8 fuentes válidas`,
      });
    }

    if (output.hereda_de) {
      for (const refId of output.hereda_de) {
        if (!cluster.outputs[refId]) {
          errors.push({
            output_id: id,
            reason: `hereda_de "${refId}" no existe en outputs.json`,
          });
        }
      }
    }
  }

  return errors;
}
