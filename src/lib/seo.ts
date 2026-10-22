import type { Metadata } from "next";
import { site } from "@/content/site";
import { cidades } from "@/content/cidades";
import type { Faq } from "@/content/servicos";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.nome,
      locale: "pt_BR",
      type: "website",
    },
  };
}

const orgId = `${site.url}/#organizacao`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": orgId,
    name: site.nome,
    alternateName: site.nomeCurto,
    url: site.url,
    logo: `${site.url}/brand/innovare-simbolo.svg`,
    image: `${site.url}/images/equipe-innovare.jpg`,
    description: site.descricao,
    telephone: "+55-73-99112-1589",
    taxID: site.cnpj,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.endereco.rua,
      addressLocality: site.endereco.cidade,
      addressRegion: site.endereco.uf,
      ...(site.endereco.cep ? { postalCode: site.endereco.cep } : {}),
      addressCountry: site.endereco.pais,
    },
    areaServed: [
      ...cidades.map((c) => ({ "@type": "City", name: `${c.nome}, ${c.uf}` })),
      { "@type": "Country", name: "Brasil" },
    ],
    sameAs: [site.mapa.perfilGoogle, site.redes.instagram, site.redes.facebook].filter(Boolean),
  };
}

export function serviceJsonLd({ name, description, path, area }: { name: string; description: string; path: string; area?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${site.url}${path}`,
    serviceType: name,
    provider: { "@id": orgId },
    areaServed: area ? { "@type": "City", name: area } : { "@type": "Country", name: "Brasil" },
  };
}

export function faqJsonLd(faq: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.pergunta,
      acceptedAnswer: { "@type": "Answer", text: f.resposta },
    })),
  };
}

export function breadcrumbJsonLd(items: { nome: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.nome,
      item: `${site.url}${it.path}`,
    })),
  };
}
