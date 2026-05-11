/**
 * Helpers para construir bloques Schema.org JSON-LD.
 *
 * Esto es una "biblioteca" — NO decide qué schema va en qué página. Eso lo decide
 * cada .astro del cliente según el Schema Map producido en Fase 3.
 *
 * Patrón típico en una página .astro:
 *   import { organization, localBusiness, breadcrumb } from "@lib/schema-helpers";
 *   const schemas = [organization({...}), breadcrumb([{name:"Inicio", url:"/"}, {name:"..."}])];
 *   <BaseLayout schema={schemas} ...>
 */

type Schema = Record<string, unknown>;

interface BreadcrumbItem {
  name: string;
  url?: string;
}

export function breadcrumb(items: BreadcrumbItem[]): Schema {
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

interface OrganizationInput {
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
}

export function organization({ name, url, logo, sameAs }: OrganizationInput): Schema {
  const s: Schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
  };
  if (logo) s.logo = logo;
  if (sameAs && sameAs.length > 0) s.sameAs = sameAs;
  return s;
}

interface WebSiteInput {
  url: string;
  name: string;
}

export function website({ url, name }: WebSiteInput): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url,
    name,
  };
}

interface LocalBusinessInput {
  name: string;
  url: string;
  address?: {
    streetAddress?: string;
    postalCode?: string;
    addressLocality?: string;
    addressCountry?: string;
  };
  telephone?: string;
  email?: string;
  areaServed?: Array<{ type: "City" | "AdministrativeArea"; name: string }>;
  image?: string;
}

export function localBusiness(input: LocalBusinessInput): Schema {
  const s: Schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: input.name,
    url: input.url,
  };
  if (input.address && Object.values(input.address).some(Boolean)) {
    s.address = { "@type": "PostalAddress", ...input.address };
  }
  if (input.telephone) s.telephone = input.telephone;
  if (input.email) s.email = input.email;
  if (input.image) s.image = input.image;
  if (input.areaServed && input.areaServed.length > 0) {
    s.areaServed = input.areaServed.map((a) => ({ "@type": a.type, name: a.name }));
  }
  return s;
}

interface ServiceInput {
  name: string;
  url: string;
  description?: string;
  provider?: { name: string; url: string };
  areaServed?: string;
}

export function service(input: ServiceInput): Schema {
  const s: Schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    url: input.url,
  };
  if (input.description) s.description = input.description;
  if (input.provider) {
    s.provider = { "@type": "Organization", name: input.provider.name, url: input.provider.url };
  }
  if (input.areaServed) s.areaServed = { "@type": "City", name: input.areaServed };
  return s;
}

interface ArticleInput {
  headline: string;
  url: string;
  description?: string;
  datePublished?: string;
  author?: { name: string; url: string };
  image?: string;
}

export function article(input: ArticleInput): Schema {
  const s: Schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    url: input.url,
  };
  if (input.description) s.description = input.description;
  if (input.datePublished) s.datePublished = input.datePublished;
  if (input.author) {
    s.author = { "@type": "Organization", name: input.author.name, url: input.author.url };
  }
  if (input.image) s.image = input.image;
  return s;
}

interface FAQ {
  q: string;
  a: string;
}

export function faqPage(faqs: FAQ[]): Schema {
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

interface ContactPointInput {
  organizationName: string;
  telephone?: string;
  email?: string;
  url: string;
}

export function contactPoint(input: ContactPointInput): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: input.organizationName,
    url: input.url,
    contactPoint: {
      "@type": "ContactPoint",
      ...(input.telephone ? { telephone: input.telephone } : {}),
      ...(input.email ? { email: input.email } : {}),
      contactType: "customer service",
    },
  };
}

export function collectionPage({ name, url }: { name: string; url: string }): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url,
  };
}

export function webPage({ name, url, description }: { name: string; url: string; description?: string }): Schema {
  const s: Schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    url,
  };
  if (description) s.description = description;
  return s;
}
