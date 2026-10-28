import type { MetadataRoute } from "next";
import { cidades } from "@/content/cidades";
import { hrefServico, servicos } from "@/content/servicos";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();
  const fixas: [string, number][] = [
    ["/", 1],
    ["/consignado", 0.9],
    ["/servicos", 0.8],
    ["/cidades", 0.7],
    ["/sobre", 0.6],
    ["/contato", 0.6],
    ["/faq", 0.5],
    ["/politica-de-privacidade", 0.2],
    ["/termos-de-uso", 0.2],
  ];
  return [
    ...fixas.map(([path, priority]) => ({ url: `${site.url}${path}`, lastModified: agora, priority })),
    ...servicos.map((s) => ({ url: `${site.url}${hrefServico(s)}`, lastModified: agora, priority: s.grupo === "consignado" ? 0.9 : 0.8 })),
    ...cidades.map((c) => ({ url: `${site.url}/cidades/${c.slug}`, lastModified: agora, priority: c.sede ? 0.8 : 0.7 })),
  ];
}
