/**
 * Matriz de enlaces internos doctrinal (padre/hijo).
 *
 * Doctrina (resumen):
 *   - HP   → SO + GH + AC + Contacto
 *   - SO   → LBS hijo + servicios laterales (otros SO) + Contacto
 *   - LBS  → SO padre + GH + GAs hijas + AC laterales + Contacto
 *   - AC   → GH + LBS relacionados + Contacto
 *   - GH   → todos los LBS + AC + GAs (índice)
 *   - GA   → LBS padre + GAs relacionadas (mismo service_slug)
 *
 * Cada función devuelve URLs absolutas relativas al dominio (empezando con `/`).
 * No incluye contacto/legal — esas se renderizan globalmente en footer/header.
 */

import {
  getMainCitySlug,
  getPrimaryCategorySlug,
  getServices,
  getGeoArticleTopics,
  getAdditionalCategoriesWithPage,
} from "./cluster.ts";

export interface LinkItem {
  label: string;
  href: string;
}

/* ──────────────────────────── HELPERS DE URL ──────────────────────────── */

function ghUrl(): string {
  return `/${getMainCitySlug()}/`;
}

function soUrl(serviceSlug: string): string {
  return `/${getPrimaryCategorySlug()}/${serviceSlug}/`;
}

function lbsUrl(serviceSlug: string): string {
  return `/${getPrimaryCategorySlug()}/${getMainCitySlug()}/${serviceSlug}/`;
}

function acUrl(pageSlug: string): string {
  return `/${getPrimaryCategorySlug()}/${getMainCitySlug()}/${pageSlug}/`;
}

function gaUrl(topicSlug: string): string {
  return `/${getMainCitySlug()}/${topicSlug}/`;
}

/* ──────────────────────────── ENLACES POR PAGE TYPE ──────────────────────────── */

/** HP → SO + GH + AC. */
export function linksFromHomepage(): LinkItem[] {
  const services = getServices();
  const additionals = getAdditionalCategoriesWithPage();
  return [
    { label: `Cobertura en ${getMainCitySlug()}`, href: ghUrl() },
    ...services.map((s) => ({ label: s.name, href: soUrl(s.slug) })),
    ...additionals.map((ac) => ({ label: ac.category, href: acUrl(ac.page_slug!) })),
  ];
}

/** SO (current service) → LBS hijo + servicios laterales. */
export function linksFromServiceOverview(currentServiceSlug: string): LinkItem[] {
  const services = getServices();
  const current = services.find((s) => s.slug === currentServiceSlug);
  const lateral = services.filter((s) => s.slug !== currentServiceSlug);
  return [
    ...(current ? [{ label: `${current.name} en ciudad`, href: lbsUrl(current.slug) }] : []),
    ...lateral.map((s) => ({ label: s.name, href: soUrl(s.slug) })),
  ];
}

/** LBS (current service) → SO padre + GH + GAs hijas + AC laterales. */
export function linksFromLBS(currentServiceSlug: string): LinkItem[] {
  const topics = getGeoArticleTopics().filter((t) => t.service_slug === currentServiceSlug);
  const additionals = getAdditionalCategoriesWithPage();
  return [
    { label: "Servicio (general)", href: soUrl(currentServiceSlug) },
    { label: "Índice de la ciudad", href: ghUrl() },
    ...topics.map((t) => ({ label: t.title, href: gaUrl(t.topic_slug) })),
    ...additionals.map((ac) => ({ label: ac.category, href: acUrl(ac.page_slug!) })),
  ];
}

/** AC (current page_slug) → GH + LBS relacionados. */
export function linksFromAC(_currentPageSlug: string): LinkItem[] {
  const services = getServices();
  return [
    { label: "Índice de la ciudad", href: ghUrl() },
    ...services.map((s) => ({ label: `${s.name} en ciudad`, href: lbsUrl(s.slug) })),
  ];
}

/** GH → todos los LBS + AC + GAs. */
export function linksFromGeoHub(): LinkItem[] {
  const services = getServices();
  const additionals = getAdditionalCategoriesWithPage();
  const topics = getGeoArticleTopics();
  return [
    ...services.map((s) => ({ label: s.name, href: lbsUrl(s.slug) })),
    ...additionals.map((ac) => ({ label: ac.category, href: acUrl(ac.page_slug!) })),
    ...topics.map((t) => ({ label: t.title, href: gaUrl(t.topic_slug) })),
  ];
}

/** GA (current topic) → LBS padre + GAs relacionadas (mismo service_slug). */
export function linksFromGeoArticle(currentTopicSlug: string): LinkItem[] {
  const topics = getGeoArticleTopics();
  const current = topics.find((t) => t.topic_slug === currentTopicSlug);
  if (!current) return [{ label: "Índice de la ciudad", href: ghUrl() }];
  const related = topics.filter(
    (t) => t.service_slug === current.service_slug && t.topic_slug !== current.topic_slug,
  );
  return [
    { label: `Servicio en ciudad`, href: lbsUrl(current.service_slug) },
    ...related.map((t) => ({ label: t.title, href: gaUrl(t.topic_slug) })),
  ];
}
