// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
//
// Plantilla design-agnostic: no integraciones de estilo (Tailwind eliminado).
// El estilo viene de src/styles/theme.css (por cliente, output de Fase 6).
// La plantilla emite HTML semántico con clases del contrato
// (referencias/contrato-clases-css.md).
export default defineConfig({
  site: "https://example.com",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  integrations: [],
  output: "static",
});
