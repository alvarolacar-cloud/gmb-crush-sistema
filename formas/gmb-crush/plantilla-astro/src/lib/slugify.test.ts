/**
 * Tests del slugify. Ejecutar con: node --import tsx src/lib/slugify.test.ts
 *
 * Cobertura mínima doctrinal (8 casos):
 *  1. Servicios típicos
 *  2. Acentos españoles
 *  3. ñ
 *  4. Mayúsculas
 *  5. Espacios múltiples
 *  6. Caracteres especiales
 *  7. Guiones inicio/fin
 *  8. Casos del mundo real (cliente Cerrajeros / Aeroterm)
 */

import { slugify } from "./slugify.ts";

interface TestCase {
  desc: string;
  input: string;
  expected: string;
}

const cases: TestCase[] = [
  { desc: "Servicio simple", input: "Cerrajero urgente", expected: "cerrajero-urgente" },
  { desc: "Frase con acentos", input: "Reformas de baño", expected: "reformas-de-bano" },
  { desc: "ñ minúscula", input: "Año nuevo", expected: "ano-nuevo" },
  { desc: "Mayúsculas todo caps", input: "AEROETERM", expected: "aeroeterm" },
  { desc: "Espacios múltiples", input: "Cambio  de  bañera", expected: "cambio-de-banera" },
  { desc: "Caracteres especiales", input: "¿Cuánto cuesta?", expected: "cuanto-cuesta" },
  { desc: "Guiones inicio/fin", input: "-cerrajero-", expected: "cerrajero" },
  { desc: "Cliente real Cerrajeros", input: "Cerrajeros Madrid 24h", expected: "cerrajeros-madrid-24h" },
  { desc: "Múltiples acentos", input: "Instalación de aerotérmica", expected: "instalacion-de-aerotermica" },
  { desc: "Direccion con ñ y números", input: "Marqués de Valdecilla 16", expected: "marques-de-valdecilla-16" },
];

let pass = 0;
let fail = 0;

for (const c of cases) {
  const result = slugify(c.input);
  const ok = result === c.expected;
  if (ok) {
    pass++;
    console.log(`  ✓ ${c.desc}: "${c.input}" → "${result}"`);
  } else {
    fail++;
    console.error(`  ✗ ${c.desc}: "${c.input}" → "${result}" (esperado: "${c.expected}")`);
  }
}

console.log(`\n${pass}/${cases.length} tests OK`);
if (fail > 0) {
  console.error(`${fail} tests fallaron`);
  process.exit(1);
}
