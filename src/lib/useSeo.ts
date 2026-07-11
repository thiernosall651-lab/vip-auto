import { useEffect } from "react";

type SeoOptions = {
  title: string;
  description: string;
  canonicalPath?: string;
};

const siteUrl = "https://atlas-auto-parts.example";

function upsertMeta(selector: string, attribute: "name" | "property", key: string, content: string): void {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

export function useSeo({ title, description, canonicalPath = "/" }: SeoOptions): void {
  useEffect(() => {
    document.title = title;
    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = `${siteUrl}${canonicalPath}`;
  }, [canonicalPath, description, title]);
}
