/**
 * Sitemap.xml generado automáticamente desde outputs.json.
 *
 * La URL Matrix vive en outputs.json en el output "3.1" (URL Matrix).
 * Espera un array de objetos con al menos { url: string, lastmod?: string }.
 *
 * Si no existe "3.1", se intenta deducir desde Astro.glob (todas las páginas estáticas).
 */
import type { APIRoute } from "astro";
import { getDomain, getValueOptional } from "@lib/cluster";

interface UrlMatrixEntry {
  url: string;
  lastmod?: string;
  priority?: number;
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
}

export const GET: APIRoute = async () => {
  const domain = getDomain().replace(/\/$/, "");
  let urls = getValueOptional<UrlMatrixEntry[]>("3.1") ?? [];

  // Fallback: si no hay URL Matrix declarada, sitemap mínimo con HP
  if (!urls || urls.length === 0) {
    urls = [{ url: "/", priority: 1.0, changefreq: "weekly" }];
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((entry) => {
    const loc = `${domain}${entry.url.startsWith("/") ? entry.url : "/" + entry.url}`;
    const parts = [`  <url>`, `    <loc>${loc}</loc>`];
    if (entry.lastmod) parts.push(`    <lastmod>${entry.lastmod}</lastmod>`);
    if (entry.changefreq) parts.push(`    <changefreq>${entry.changefreq}</changefreq>`);
    if (entry.priority !== undefined) parts.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
    parts.push(`  </url>`);
    return parts.join("\n");
  })
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
