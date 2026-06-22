import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.grssolucao.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/politica-de-privacidade`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/termos-de-uso`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
  // /obrigado fica fora de propósito: é página pós-conversão (deve ser noindex).
}
