import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"], // bloqueia rotas que não devem ser indexadas
    },
    sitemap: "https://seusite.com/sitemap.xml",
  };
}
