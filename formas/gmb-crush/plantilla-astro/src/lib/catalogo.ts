/**
 * Catálogo declarativo de los outputs doctrinales del sistema GMB Crush.
 *
 * Define QUÉ outputs existen, su ID, su bloque, su fuente esperada y sus dependencias.
 * NO contiene valores — los valores los pone cada cliente en su outputs.json.
 *
 * Este archivo es la encarnación en código del catálogo de 242 outputs documentado en:
 *   - doctrina/fuentes.md
 *   - matriz-cobertura.md sección 3
 *
 * Versión MVP: incluye los outputs CRÍTICOS para producir HTML + schemas + linking.
 * Outputs operativos puros (validaciones internas que no producen HTML) se pueden añadir luego.
 */

import type { OutputDefinition } from "./types.ts";

export const CATALOG_VERSION = "0.1.0";

/* ──────────────────────────── BLOQUE 0 — PREFLIGHT (8 inputs) ──────────────────────────── */

const BLOQUE_0: OutputDefinition[] = [
  { id: "Pre.1", name: "Nombre del negocio", bloque: 0, fuente_esperada: "Cliente preflight" },
  { id: "Pre.2", name: "Qué hace (descripción corta)", bloque: 0, fuente_esperada: "Cliente preflight" },
  { id: "Pre.3", name: "Dirección con CP", bloque: 0, fuente_esperada: "Cliente preflight" },
  { id: "Pre.4", name: "Estado del GBP", bloque: 0, fuente_esperada: "Cliente preflight" },
  { id: "Pre.5", name: "Ciudades para análisis Local Pack", bloque: 0, fuente_esperada: "Cliente preflight" },
  { id: "Pre.6", name: "Token de GitHub", bloque: 0, fuente_esperada: "Cliente preflight", no_aplica_razon: "vive en env vars, no en outputs" },
  { id: "Pre.7", name: "ID account de Cloudflare", bloque: 0, fuente_esperada: "Cliente preflight", no_aplica_razon: "vive en env vars" },
  { id: "Pre.8", name: "Token de Cloudflare", bloque: 0, fuente_esperada: "Cliente preflight", no_aplica_razon: "vive en env vars" },
];

/* ──────────────────────────── BLOQUE 1 — FUNDAMENTOS (14 outputs Paso 1) ──────────────────────────── */

const BLOQUE_1: OutputDefinition[] = [
  { id: "1.1", name: "Business Name", bloque: 1, fuente_esperada: "Cliente preflight", hereda_de: ["Pre.1"], page_types: ["HP", "SO", "LBS", "AC", "GH", "GA"] },
  { id: "1.2", name: "Website URL / Canonical Domain", bloque: 1, fuente_esperada: "Cliente preflight", page_types: ["HP", "SO", "LBS", "AC", "GH", "GA"] },
  { id: "1.3", name: "GBP Lifecycle Status", bloque: 1, fuente_esperada: "Cliente preflight + Doctrina GMB Crush", hereda_de: ["Pre.4"] },
  { id: "1.4", name: "Full NAP (8 campos)", bloque: 1, fuente_esperada: "Cliente preflight", page_types: ["HP", "LBS", "GH"] },
  { id: "1.5", name: "Planned Primary GBP Category", bloque: 1, fuente_esperada: "Doctrina + Local Pack", page_types: ["HP", "LBS"] },
  { id: "1.6", name: "Planned Additional GBP Categories", bloque: 1, fuente_esperada: "Doctrina + Local Pack", page_types: ["AC"] },
  { id: "1.7", name: "Main City", bloque: 1, fuente_esperada: "Info heredada", hereda_de: ["1.4"], page_types: ["HP", "LBS", "GH", "GA"] },
  { id: "1.8", name: "Physical Location City", bloque: 1, fuente_esperada: "Info heredada", hereda_de: ["Pre.3"] },
  { id: "1.9", name: "Servicios principales (S core services)", bloque: 1, fuente_esperada: "Doctrina + Local Pack", page_types: ["HP", "SO", "LBS"] },
  { id: "1.10", name: "Direct + Candidate LCAs", bloque: 1, fuente_esperada: "Doctrina + Local Pack", hereda_de: ["1.4"], page_types: ["HP", "LBS", "GH"] },
  { id: "1.11", name: "Approved Expansion Areas", bloque: 1, fuente_esperada: "Tracking" },
  { id: "1.12", name: "GeoArticles per Service (G)", bloque: 1, fuente_esperada: "Doctrina GMB Crush" },
  { id: "1.13", name: "Preferred CTA", bloque: 1, fuente_esperada: "Doctrina + Local Pack", page_types: ["HP", "SO", "LBS", "AC", "GH"] },
  { id: "1.14", name: "Trust Signals", bloque: 1, fuente_esperada: "Doctrina + Local Pack", page_types: ["HP", "LBS"] },
];

/* ──────────────────────────── BLOQUE 1 — FÓRMULA MAESTRA (Paso 2, 14 outputs) ──────────────────────────── */

const BLOQUE_1_PASO_2: OutputDefinition[] = [
  { id: "2.1", name: "Planned GBP Categories Status", bloque: 1, fuente_esperada: "Info heredada", hereda_de: ["1.5", "1.6"] },
  { id: "2.2", name: "Primary Category Slug", bloque: 1, fuente_esperada: "Info heredada", hereda_de: ["1.5"] }, // slugify(1.5)
  { id: "2.3", name: "Main City Slug", bloque: 1, fuente_esperada: "Info heredada", hereda_de: ["1.7"] }, // slugify(1.7)
  { id: "2.4", name: "Service Slugs", bloque: 1, fuente_esperada: "Info heredada", hereda_de: ["1.9"] }, // slugify(each 1.9)
  { id: "2.5", name: "Variable S (count core services)", bloque: 1, fuente_esperada: "Info heredada", hereda_de: ["1.9"] },
  { id: "2.6", name: "Variable A (count Additional con página propia)", bloque: 1, fuente_esperada: "Info heredada", hereda_de: ["1.6"] },
  { id: "2.7", name: "Variable G", bloque: 1, fuente_esperada: "Info heredada", hereda_de: ["1.12"] },
  { id: "2.8", name: "Total páginas SEO base = 1+S+1+S+A+G×S", bloque: 1, fuente_esperada: "Info heredada", hereda_de: ["2.5", "2.6", "2.7"] },
  { id: "2.9", name: "Inventario por tipo de página", bloque: 1, fuente_esperada: "Info heredada", hereda_de: ["2.8"] },
  { id: "2.10", name: "Optional Expansion Formula", bloque: 1, fuente_esperada: "Info heredada", hereda_de: ["1.11"] },
  { id: "2.11", name: "Validación anti-duplicación", bloque: 1, fuente_esperada: "Info heredada" },
  { id: "2.12", name: "Validación dependencias", bloque: 1, fuente_esperada: "Info heredada" },
  { id: "2.13", name: "Validación LCAs fuera fórmula", bloque: 1, fuente_esperada: "Info heredada", hereda_de: ["1.10"] },
  { id: "2.14", name: "Validación auditabilidad del total", bloque: 1, fuente_esperada: "Info heredada" },
];

/* ──────────────────────────── BLOQUE 1 — MATRIZ BASE (Paso 3, 14 outputs) ──────────────────────────── */

const BLOQUE_1_PASO_3: OutputDefinition[] = [
  { id: "3.1", name: "Spreadsheet Name", bloque: 1, fuente_esperada: "Info heredada", hereda_de: ["1.1"] },
  { id: "3.2", name: "GeoHub URL Style", bloque: 1, fuente_esperada: "Arquitectura técnica", page_types: ["GH", "LBS"] },
  { id: "3.3", name: "Additional Category Slugs", bloque: 1, fuente_esperada: "Info heredada", hereda_de: ["1.6"] },
  { id: "3.4", name: "GeoArticle Topics propuestos", bloque: 1, fuente_esperada: "Doctrina + Keyword Research", hereda_de: ["1.9"], page_types: ["GA"] },
  { id: "3.5", name: "URL Matrix completa", bloque: 1, fuente_esperada: "Info heredada", hereda_de: ["2.8", "2.9"] },
  { id: "3.6", name: "IDs por tipo de página", bloque: 1, fuente_esperada: "Info heredada", hereda_de: ["3.5"] },
  { id: "3.7", name: "Parent Page declarado por fila", bloque: 1, fuente_esperada: "Info heredada", hereda_de: ["3.5"] },
  { id: "3.8", name: "Schema asignado desde matriz", bloque: 1, fuente_esperada: "Info heredada", hereda_de: ["3.5"] },
  { id: "3.9", name: "Enlaces internos Required por fila", bloque: 1, fuente_esperada: "Info heredada", hereda_de: ["3.5"] },
  { id: "3.10", name: "Priority y Publish Phase por fila", bloque: 1, fuente_esperada: "Info heredada", hereda_de: ["3.5"] },
  { id: "3.11", name: "Default Page Status", bloque: 1, fuente_esperada: "Doctrina GMB Crush" },
  { id: "3.12", name: "Notes estratégicas por fila", bloque: 1, fuente_esperada: "no aplica", no_aplica_razon: "viven en commits git, no en spreadsheet" },
  { id: "3.13", name: "Validación LCAs sin filas base", bloque: 1, fuente_esperada: "Info heredada" },
  { id: "3.14", name: "Validación matriz cerrada antes de contenido", bloque: 1, fuente_esperada: "Info heredada" },
];

/* ──────────────────────────── BLOQUE 5 — Outputs clave ──────────────────────────── */

const BLOQUE_5: OutputDefinition[] = [
  { id: "16.1", name: "Identidad Visual y CSS Base (design tokens)", bloque: 5, fuente_esperada: "Cliente preflight", page_types: ["HP", "SO", "LBS", "AC", "GH", "GA"] },
  // FAQs por page type (Bloque 5 — Paso 15 redacción)
  { id: "15.1", name: "FAQs Homepage", bloque: 5, fuente_esperada: "Doctrina + Local Pack", page_types: ["HP"] },
  { id: "15.2", name: "FAQs Service Overview", bloque: 5, fuente_esperada: "Doctrina + Local Pack", page_types: ["SO"] },
  { id: "15.3", name: "FAQs LBS", bloque: 5, fuente_esperada: "Doctrina + Local Pack", page_types: ["LBS"] },
  { id: "15.4", name: "FAQs Additional Category", bloque: 5, fuente_esperada: "Doctrina + Local Pack", page_types: ["AC"] },
  { id: "15.5", name: "FAQs GeoHub", bloque: 5, fuente_esperada: "Doctrina + Local Pack", page_types: ["GH"] },
  { id: "15.6", name: "FAQs GeoArticle", bloque: 5, fuente_esperada: "Doctrina + Keyword Research", page_types: ["GA"] },
];

/* ──────────────────────────── BLOQUE 7 — GBP (Paso 14, 20 outputs) ──────────────────────────── */

const BLOQUE_7: OutputDefinition[] = [
  { id: "14.1", name: "GBP creado o plan de creación listo", bloque: 7, fuente_esperada: "Cliente preflight + Doctrina GMB Crush" },
  { id: "14.2", name: "Estado de verificación definido", bloque: 7, fuente_esperada: "Cliente preflight + Doctrina GMB Crush" },
  { id: "14.3", name: "NAP final aprobado", bloque: 7, fuente_esperada: "Info heredada", hereda_de: ["1.4"] },
  { id: "14.4", name: "Modelo de negocio definido", bloque: 7, fuente_esperada: "Cliente preflight + Doctrina GMB Crush" },
  { id: "14.5", name: "Categoría principal confirmada", bloque: 7, fuente_esperada: "Info heredada", hereda_de: ["1.5"] },
  { id: "14.6", name: "Categorías adicionales confirmadas o descartadas", bloque: 7, fuente_esperada: "Doctrina + Local Pack", hereda_de: ["1.6"] },
  { id: "14.7", name: "Servicios del GBP mapeados a páginas web", bloque: 7, fuente_esperada: "Info heredada", hereda_de: ["1.9"] },
  { id: "14.8", name: "URL de web seleccionada para el GBP", bloque: 7, fuente_esperada: "Info heredada", hereda_de: ["4.3"] },
  { id: "14.9", name: "URL UTM preparada", bloque: 7, fuente_esperada: "Tracking" },
  { id: "14.10", name: "Descripción GBP aprobada", bloque: 7, fuente_esperada: "Doctrina + Local Pack" },
  { id: "14.11", name: "Plan de fotos", bloque: 7, fuente_esperada: "Cliente preflight + Doctrina GMB Crush" },
  { id: "14.12", name: "Plan de Q&A", bloque: 7, fuente_esperada: "Doctrina + Local Pack" },
  { id: "14.13", name: "Plan de posts", bloque: 7, fuente_esperada: "Doctrina + Keyword Research" },
  { id: "14.14", name: "Estrategia de reseñas reales", bloque: 7, fuente_esperada: "Doctrina + Local Pack" },
  { id: "14.15", name: "Cola de actualización post-GBP", bloque: 7, fuente_esperada: "Doctrina GMB Crush" },
  { id: "14.16", name: "Schema update plan (sameAs Google Maps)", bloque: 7, fuente_esperada: "Info heredada", hereda_de: ["3.8"] },
  { id: "14.17", name: "Homepage update plan", bloque: 7, fuente_esperada: "Info heredada", hereda_de: ["5.1"] },
  { id: "14.18", name: "Contact page update plan", bloque: 7, fuente_esperada: "Info heredada" },
  { id: "14.19", name: "Tracking baseline plan", bloque: 7, fuente_esperada: "Tracking" },
  { id: "14.20", name: "Lista de riesgos", bloque: 7, fuente_esperada: "Doctrina GMB Crush" },
];

/* ──────────────────────────── CATÁLOGO COMPLETO ──────────────────────────── */

/**
 * Catálogo MVP. Bloques 2-6 quedan TODO (~145 outputs adicionales).
 * Para Aeroeterm como caso de validación, este subconjunto es suficiente:
 * Bloque 0 (preflight) + Bloque 1 (intake + matriz, 42 outputs) + Bloque 7 (GBP, 20 outputs)
 * = 70 outputs trazables que cubren el 100% del HTML generado.
 *
 * Los Bloques 2-6 (arquitectura, priorización, automatización, salida, info que falta)
 * son operativos: producen reglas/checks pero la mayoría son Info heredada de Bloque 1.
 * Se añaden conforme se necesiten.
 */
export const CATALOGO: OutputDefinition[] = [
  ...BLOQUE_0,
  ...BLOQUE_1,
  ...BLOQUE_1_PASO_2,
  ...BLOQUE_1_PASO_3,
  ...BLOQUE_5,
  ...BLOQUE_7,
];

/** Map id → definition para lookup rápido. */
export const CATALOGO_INDEX: Record<string, OutputDefinition> = Object.fromEntries(
  CATALOGO.map((o) => [o.id, o])
);

/** Total de outputs en el catálogo MVP. */
export const CATALOGO_SIZE = CATALOGO.length;
