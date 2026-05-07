/**
 * Schema builders por page type según doctrina/page-types.md.
 *
 * Mapping doctrinal:
 *   HP    → Organization + WebSite
 *   SO    → Service + WebPage + BreadcrumbList
 *   LBS   → LocalBusiness + FAQPage + BreadcrumbList
 *   AC    → Service + BreadcrumbList
 *   GH    → CollectionPage + BreadcrumbList
 *   GA    → Article + FAQPage + BreadcrumbList + Speakable
 *   AUX   → ContactPage + Organization
 */

import type { FAQ, NAP } from "./types.ts";
import {
  buildAreaServed,
  buildPostalAddress,
  getBusinessName,
  getDomain,
  getNAP,
} from "./cluster.ts";

type Schema = Record<string, unknown>;

interface BreadcrumbItem {
  name: string;
  url?: string;
}

/* ──────────────────────────── HELPERS ──────────────────────────── */

export function buildBreadcrumbList(items: BreadcrumbItem[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.url ? { item: it.url } : {}),
    })),
  };
}

export function buildFaqPage(faqs: FAQ[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function buildOrganization(nap: NAP): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: nap.name,
    url: getDomain(),
    address: buildPostalAddress(nap),
    telephone: nap.phone,
    email: nap.email,
  };
}

export function buildWebSite(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: getBusinessName(),
    url: getDomain(),
    inLanguage: "es-ES",
  };
}

/* ──────────────────────────── SCHEMA POR PAGE TYPE ──────────────────────────── */

/** HP: Organization + WebSite. NO LocalBusiness (esa va en LBS). NO FAQPage (doctrina). */
export function buildHomepageSchemas(): Schema[] {
  const nap = getNAP();
  return [buildOrganization(nap), buildWebSite()];
}

/** SO: Service + WebPage + BreadcrumbList. SIN ciudad (doctrina). */
export function buildServiceOverviewSchemas(opts: {
  serviceName: string;
  primaryCategory: string;
  url: string;
  breadcrumbs: BreadcrumbItem[];
}): Schema[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: opts.serviceName,
      category: opts.primaryCategory,
      provider: { "@type": "Organization", name: getBusinessName() },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: opts.serviceName,
      url: opts.url,
    },
    buildBreadcrumbList(opts.breadcrumbs),
  ];
}

/** LBS: LocalBusiness + FAQPage + BreadcrumbList. */
export function buildLBSSchemas(opts: {
  serviceName: string;
  url: string;
  breadcrumbs: BreadcrumbItem[];
  faqs: FAQ[];
}): Schema[] {
  const nap = getNAP();
  const schemas: Schema[] = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: getBusinessName(),
      url: opts.url,
      telephone: nap.phone,
      address: buildPostalAddress(nap),
      areaServed: buildAreaServed(),
      makesOffer: { "@type": "Offer", itemOffered: { "@type": "Service", name: opts.serviceName } },
    },
    buildBreadcrumbList(opts.breadcrumbs),
  ];
  if (opts.faqs.length > 0) schemas.push(buildFaqPage(opts.faqs));
  return schemas;
}

/** AC: Service + BreadcrumbList (sin LocalBusiness — doctrina). */
export function buildAdditionalCategorySchemas(opts: {
  categoryName: string;
  url: string;
  breadcrumbs: BreadcrumbItem[];
}): Schema[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: opts.categoryName,
      provider: { "@type": "Organization", name: getBusinessName() },
      areaServed: buildAreaServed(),
    },
    buildBreadcrumbList(opts.breadcrumbs),
  ];
}

/** GeoHub: CollectionPage + BreadcrumbList. */
export function buildGeoHubSchemas(opts: {
  cityName: string;
  url: string;
  breadcrumbs: BreadcrumbItem[];
}): Schema[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `Servicios en ${opts.cityName}`,
      url: opts.url,
    },
    buildBreadcrumbList(opts.breadcrumbs),
  ];
}

/** GeoArticle: Article + FAQPage + BreadcrumbList + Speakable. */
export function buildGeoArticleSchemas(opts: {
  title: string;
  url: string;
  breadcrumbs: BreadcrumbItem[];
  faqs: FAQ[];
}): Schema[] {
  const schemas: Schema[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: opts.title,
      author: { "@type": "Organization", name: getBusinessName() },
      publisher: { "@type": "Organization", name: getBusinessName() },
    },
    buildBreadcrumbList(opts.breadcrumbs),
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url: opts.url,
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".quick-answer"],
      },
    },
  ];
  if (opts.faqs.length > 0) schemas.push(buildFaqPage(opts.faqs));
  return schemas;
}

/** Contacto AUX: ContactPage + Organization. */
export function buildContactPageSchemas(opts: { url: string }): Schema[] {
  const nap = getNAP();
  return [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: `Contacto · ${getBusinessName()}`,
      url: opts.url,
      mainEntity: buildOrganization(nap),
    },
  ];
}
