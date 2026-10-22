import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaginaServico } from "@/components/PaginaServico";
import { getServico, servicosConsignado } from "@/content/servicos";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicosConsignado.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getServico("consignado", (await params).slug);
  if (!s) return {};
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/consignado/${s.slug}` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const s = getServico("consignado", (await params).slug);
  if (!s) notFound();
  return <PaginaServico s={s} />;
}
