import { calculateInventory } from "./calculate-urls.ts";

interface TestCase {
  desc: string;
  formula: { S: number; A: number; G: number };
  expected: { total: number; HP: number; SO: number; GH: number; LBS: number; AC: number; GA: number };
}

const cases: TestCase[] = [
  {
    desc: "Aeroeterm default (S=5, A=2, G=3)",
    formula: { S: 5, A: 2, G: 3 },
    expected: { total: 29, HP: 1, SO: 5, GH: 1, LBS: 5, AC: 2, GA: 15 },
  },
  {
    desc: "Cerrajeros del manual (S=5, A=1, G=3)",
    formula: { S: 5, A: 1, G: 3 },
    expected: { total: 28, HP: 1, SO: 5, GH: 1, LBS: 5, AC: 1, GA: 15 },
  },
  {
    desc: "Cliente minimal (S=3, A=0, G=2)",
    formula: { S: 3, A: 0, G: 2 },
    expected: { total: 14, HP: 1, SO: 3, GH: 1, LBS: 3, AC: 0, GA: 6 },
  },
  {
    desc: "Sin GeoArticles (S=5, A=0, G=0)",
    formula: { S: 5, A: 0, G: 0 },
    expected: { total: 12, HP: 1, SO: 5, GH: 1, LBS: 5, AC: 0, GA: 0 },
  },
  {
    desc: "Cliente robusto (S=8, A=3, G=4)",
    formula: { S: 8, A: 3, G: 4 },
    expected: { total: 53, HP: 1, SO: 8, GH: 1, LBS: 8, AC: 3, GA: 32 },
  },
];

let pass = 0;
let fail = 0;

for (const c of cases) {
  const result = calculateInventory(c.formula);
  const ok =
    result.total === c.expected.total &&
    result.HP === c.expected.HP &&
    result.SO === c.expected.SO &&
    result.GH === c.expected.GH &&
    result.LBS === c.expected.LBS &&
    result.AC === c.expected.AC &&
    result.GA === c.expected.GA;
  if (ok) {
    pass++;
    console.log(`  ✓ ${c.desc}: total=${result.total}`);
  } else {
    fail++;
    console.error(
      `  ✗ ${c.desc}: ${JSON.stringify(result)} (esperado: ${JSON.stringify(c.expected)})`
    );
  }
}

console.log(`\n${pass}/${cases.length} tests OK`);
if (fail > 0) {
  console.error(`${fail} tests fallaron`);
  process.exit(1);
}

// Test error: variables negativas
try {
  calculateInventory({ S: -1, A: 0, G: 0 });
  console.error("✗ debería haber lanzado para S=-1");
  process.exit(1);
} catch (err) {
  console.log("  ✓ lanza para variables negativas");
}
