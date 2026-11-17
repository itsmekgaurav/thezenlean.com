import type { MetadataRoute } from "next";

// One page for now. Add each new page here as it ships (features, science, guides).
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://thezenlean.com/", lastModified: new Date("2026-11-17"), changeFrequency: "weekly", priority: 1 }];
}
