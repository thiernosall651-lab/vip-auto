import { useEffect } from "react";

type JsonLd = Record<string, unknown>;

type SeoOptions = {
  title: string;
  description: string;
  canonicalPath?: string;
  /** Absolute URL or site-relative path to the social share image. */
  image?: string;
  /** Open Graph object type. */
  type?: "website" | "product" | "article";
  /** Optional structured data injected for this route (removed when leaving it). */
  jsonLd?: JsonLd;
};

const siteUrl = "https://vipauto.sn";
const defaultImage = "/images/og-cover.jpg";
const routeJsonLdId = "route-jsonld";

function toAbsolute(pathOrUrl: string): string {
  return pathOrUrl.startsWith("http") ? pathOrUrl : `${siteUrl}${pathOrUrl}`;
}

function upsertMeta(selector: string, attribute: "name" | "property", key: string, content: string): void {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

function upsertLink(rel: string, href: string): void {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }

  element.href = href;
}

export function useSeo({
  title,
  description,
  canonicalPath = "/",
  image = defaultImage,
  type = "website",
  jsonLd,
}: SeoOptions): void {
  const serializedJsonLd = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    const canonicalUrl = `${siteUrl}${canonicalPath}`;
    const imageUrl = toAbsolute(image);

    document.title = title;
    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    upsertMeta('meta[property="og:type"]', "property", "og:type", type);
    upsertMeta('meta[property="og:image"]', "property", "og:image", imageUrl);
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", imageUrl);

    upsertLink("canonical", canonicalUrl);

    const existing = document.getElementById(routeJsonLdId);

    if (serializedJsonLd) {
      const script = existing ?? document.createElement("script");
      script.id = routeJsonLdId;
      script.setAttribute("type", "application/ld+json");
      script.textContent = serializedJsonLd;

      if (!existing) {
        document.head.appendChild(script);
      }
    } else if (existing) {
      existing.remove();
    }

    return () => {
      document.getElementById(routeJsonLdId)?.remove();
    };
  }, [canonicalPath, description, image, serializedJsonLd, title, type]);
}
