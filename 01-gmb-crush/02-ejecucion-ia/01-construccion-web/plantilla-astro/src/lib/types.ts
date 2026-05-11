/**
 * Tipos esenciales del cluster.
 *
 * NO opina sobre estructura de body, page types, etc. Eso lo decide cada cliente
 * en sus .astro y en su outputs.json. Aquí solo viven los shapes universales:
 * NAP, LCAs, FAQ.
 */

export type Status = "confirmed" | "validated" | "⚠ placeholder" | "⚠ pendiente tokens" | "⚠ pendiente diseño" | "no aplica";

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

export interface LCAs {
  direct: string[];
  candidate: string[];
}

export interface FAQ {
  q: string;
  a: string;
}
