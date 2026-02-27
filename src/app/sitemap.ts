import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://toutenmel.fr", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://toutenmel.fr/faq", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://toutenmel.fr/boutique", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://toutenmel.fr/a-propos", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://toutenmel.fr/commandes", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://toutenmel.fr/contact", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}
