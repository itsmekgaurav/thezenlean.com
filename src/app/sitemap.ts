import type { MetadataRoute } from "next";

// One page for now. Add each new page here as it ships (features, science, guides).
// Keep lastModified true: Google ignores the date once it has been wrong (its sitemap guidance, June 2023),
// and it is the only "this changed" signal Google still reads. Bing and others get IndexNow: the key file is
// public/<key>.txt and scripts/indexnow.mjs submits the URLs after a deploy.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://thezenlean.com/", lastModified: new Date("2026-11-24"), changeFrequency: "weekly", priority: 1 }];
}
