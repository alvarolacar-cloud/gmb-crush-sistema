/**
 * Fórmula maestra del sistema GMB Crush.
 * Doctrina: doctrina/reglas-operativas.md §2 + matriz-cobertura.md regla 2.
 *
 *   Total URLs base = 1 + S + 1 + S + A + G×S
 *
 *     1   = Homepage
 *     S   = Service Overviews + LBS (S por cada uno)
 *     1   = GeoHub Main City
 *     A   = Additional Categories que necesitan página propia
 *     G×S = GeoArticles (G por cada core service)
 */

export interface ClusterFormula {
  S: number; // count core services
  A: number; // count Additional Categories que necesitan página
  G: number; // GeoArticles per service
}

export interface ClusterInventory {
  HP: number;
  SO: number;
  GH: number;
  LBS: number;
  AC: number;
  GA: number;
  /** Total URLs base SEO (sin contar la página contacto auxiliar). */
  total: number;
}

export function calculateInventory(formula: ClusterFormula): ClusterInventory {
  const { S, A, G } = formula;

  if (S < 0 || A < 0 || G < 0) {
    throw new Error(`calculateInventory: variables negativas (S=${S}, A=${A}, G=${G})`);
  }

  const HP = 1;
  const SO = S;
  const GH = 1;
  const LBS = S;
  const AC = A;
  const GA = G * S;
  const total = HP + SO + GH + LBS + AC + GA;

  return { HP, SO, GH, LBS, AC, GA, total };
}
