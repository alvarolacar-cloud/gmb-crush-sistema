/**
 * Tipos del sistema GMB Crush v2 ejecutable.
 *
 * Cada output del cluster tiene IDENTIDAD (id), VALOR, STATUS y TRAZABILIDAD (fuente + source).
 * Sin esta estructura, no hay sistema — solo datos sueltos.
 *
 * Doctrina referenciada: doctrina/fuentes.md, doctrina/qa-rules.md
 */

/* ──────────────────────────── STATUS ──────────────────────────── */

export type Status =
  | "confirmed"
  | "validated"
  | "⚠ inferido"
  | "⚠ placeholder"
  | "no aplica";

export const STATUS_BLOCKS_GBP: readonly Status[] = ["⚠ inferido", "⚠ placeholder"];

/* ──────────────────────────── FUENTES ──────────────────────────── */

export type Fuente =
  | "Doctrina GMB Crush"
  | "Arquitectura técnica"
  | "Tracking"
  | "Cliente preflight"
  | "Cliente preflight + Doctrina GMB Crush"
  | "Doctrina + Local Pack"
  | "Doctrina + Keyword Research"
  | "Doctrina + Google Search";

export type FuenteAny = Fuente | "Info heredada" | "no aplica";

export const FUENTES_VALIDAS: readonly Fuente[] = [
  "Doctrina GMB Crush",
  "Arquitectura técnica",
  "Tracking",
  "Cliente preflight",
  "Cliente preflight + Doctrina GMB Crush",
  "Doctrina + Local Pack",
  "Doctrina + Keyword Research",
  "Doctrina + Google Search",
] as const;

/** Set de fuentes que cualquier output puede declarar (incluye notación heredada y descarte). */
export const FUENTES_VALIDAS_COMPLETAS: ReadonlySet<FuenteAny> = new Set<FuenteAny>([
  ...FUENTES_VALIDAS,
  "Info heredada",
  "no aplica",
]);

/* ──────────────────────────── OUTPUT ──────────────────────────── */

/**
 * Un OUTPUT es una decisión trazable del cluster.
 * Cada uno de los 242 outputs del sistema tiene un id "Paso.X" único.
 */
export interface Output<T = unknown> {
  id: string;
  name: string;
  value: T;
  status: Status;
  fuente: FuenteAny;
  /** Fuente real con timestamp/contexto. Ej: "Local Pack Madrid 2026-05-05" o "Cliente declaró 2026-05-04". */
  source: string;
  /** Cross-refs a outputs upstream. Ej: ["1.4"] para Main City. */
  hereda_de?: string[];
  bloque: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  notes?: string;
}

/* ──────────────────────────── PAGE TYPES ──────────────────────────── */

export type PageType = "HP" | "SO" | "LBS" | "AC" | "GH" | "GA";

/* ──────────────────────────── CATÁLOGO DE OUTPUTS ──────────────────────────── */

export interface OutputDefinition {
  id: string;
  name: string;
  bloque: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  fuente_esperada: FuenteAny;
  hereda_de?: string[];
  page_types?: PageType[];
  no_aplica_razon?: string;
}

/* ──────────────────────────── CLUSTER (CLIENTE) ──────────────────────────── */

export interface Cluster {
  slug: string;
  fecha_arranque: string;
  outputs: Record<string, Output>;
  meta: {
    updated_at: string;
    catalog_version: string;
  };
}

/* ──────────────────────────── TIPOS DEL DOMINIO ──────────────────────────── */

export interface NAP {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
}

export interface Service {
  slug: string;
  name: string;
}

export interface AdditionalCategory {
  category: string;
  needs_page: boolean;
  page_slug?: string;
  covered_by?: string;
}

export interface LCAs {
  direct: string[];
  candidate: string[];
}

export interface DesignTokens {
  // Colores
  color_primary: string;
  color_primary_50: string;
  color_primary_500: string;
  color_primary_900: string;
  color_accent: string;
  color_bg_dark?: string;
  color_bg_light?: string;
  color_text_main?: string;
  color_text_heading?: string;
  // Tipografía
  font_family: string;
  h1_size?: string;
  h2_size?: string;
  body_size?: string;
  body_line_height?: string;
  // Botones
  btn_radius?: string;
  btn_padding?: string;
  btn_transform?: "uppercase" | "none";
  // Cards
  card_radius?: string;
  card_shadow?: string;
  // Layout
  hero_layout?: "centered" | "split" | "full-photo";
}

/** Una sección del layout-map por tipo de página. */
export interface LayoutSection {
  section: number;
  name: string;
  layout: "flex" | "grid" | "block";
  cols: string;
  bg: "white" | "light" | "dark" | "image" | "primary";
  image_required: boolean;
  image_ratio?: string;
  notes?: string;
}

/** Layout-map completo por tipo de página (output 16.2). */
export interface LayoutMap {
  homepage: LayoutSection[];
  service_page: LayoutSection[];
  location_page: LayoutSection[];
  geo_article: LayoutSection[];
}

/** Inventario de imágenes CDN generadas en Doc C (output 16.7). */
export interface ImageInventory {
  hero_homepage?: string;
  [key: string]: string | undefined;
}

export interface GeoArticleTopic {
  service_slug: string;
  topic_slug: string;
  title: string;
}

export interface FAQ {
  q: string;
  a: string;
}
