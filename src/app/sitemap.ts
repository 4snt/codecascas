import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://codecascas.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: "https://codecascas.com/en",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://codecascas.com/pt",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // etc para cada lang
  ];
}
