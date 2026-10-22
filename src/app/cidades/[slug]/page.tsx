import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Esteira } from "@/components/Esteira";
import { Icon } from "@/components/Icon";
import { MapaLocal } from "@/components/MapaLocal";
import { PageHero } from "@/components/PageHero";
import { CardServico, FaixaCta, JsonLd, ListaFaq, TituloSecao } from "@/components/ui";
import { cidades, getCidade } from "@/content/cidades";
import { etapasAtendimento } from "@/content/etapas";
import { hrefServico, servicos } from "@/content/servicos";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { mensagemServico, whatsappUrl } from "@/lib/whatsapp";

export const dynamicParams = false;

export function generateStaticParams() {
  return cidades.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCidade((await params).slug);
  if (!c) return {};
  return pageMetadata({ title: c.metaTitle, description: c.metaDescription, path: `/cidades/${c.slug}` });
}

export default async function CidadePage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCidade((await params).slug);
  if (!c) notFound();

  const path = `/cidades/${c.slug}`;
  const migalhas = [
    { nome: "Início", path: "/" },
    { nome: "Cidades", path: "/cidades" },
    { nome: `${c.nome} – ${c.uf}`, path },
  ];
  const destaques = c.destaques.map((slug) => servicos.find((s) => s.slug === slug)!).filter(Boolean);
  const demais = servicos.filter((s) => !c.destaques.includes(s.slug));
  const local = `${c.nome} – ${c.uf}`;

  return (
    <>
      <PageHero migalhas={migalhas} eyebrow={c.sede ? "Nossa loja" : "Cidade atendida"} titulo={c.h1} texto={c.intro}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={whatsappUrl(mensagemServico("as opções de crédito", local))} target="_blank" rel="noopener" className="btn btn-laranja">
            <Icon name="whatsapp" className="size-5" /> Falar no WhatsApp
          </a>
          <Link href="/simulador" className="btn btn-vidro">
            <Icon name="calculator" className="size-5" /> Simular
          </Link>
        </div>
      </PageHero>

      <section className="py-16 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <TituloSecao eyebrow={local} titulo={`Crédito com atendimento próximo para quem é de ${c.nome}`} />
            <div className="prosa mt-6 text-lg" data-reveal>
              {c.paragrafos.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-brand/15 bg-brand/5 p-5" data-reveal>
              <Icon name="pin" className="size-6 shrink-0 text-brand" />
              <p className="text-tinta">
                <strong>Como é o atendimento: </strong>
                {c.atendimento}
              </p>
            </div>
          </div>
          <div data-reveal>
            <MapaLocal />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container-site">
          <TituloSecao eyebrow="Mais procurados" titulo={`Serviços em destaque em ${c.nome}`} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {destaques.map((s, i) => (
              <CardServico key={s.slug} s={s} i={i} />
            ))}
          </div>
          <p className="mt-10 text-sm font-semibold tracking-[0.12em] text-ardosia uppercase">Também atendemos {c.nome} com</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {demais.map((s) => (
              <li key={s.slug}>
                <Link href={hrefServico(s)} className="inline-block rounded-full border border-tinta/10 px-4 py-2 text-[0.95rem] text-tinta hover:border-brand hover:text-brand">
                  {s.tituloCurto}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="superficie-noite relative overflow-hidden py-16 md:py-24">
        <div className="grade-tech pointer-events-none absolute inset-0" />
        <div className="container-site relative">
          <TituloSecao tom="escuro" eyebrow="Como funciona" titulo={`Atendimento para ${c.nome} em 4 passos`} />
          <div className="mt-10">
            <Esteira etapas={etapasAtendimento} />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <TituloSecao eyebrow="Dúvidas" titulo={`Perguntas de quem é de ${c.nome}`} />
            <p className="mt-6 text-sm font-semibold text-ardosia">Outras cidades atendidas</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {cidades
                .filter((o) => o.slug !== c.slug)
                .map((o) => (
                  <li key={o.slug}>
                    <Link href={`/cidades/${o.slug}`} className="inline-block rounded-full bg-white px-3 py-1.5 text-sm text-ardosia hover:text-brand">
                      {o.nome}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <ListaFaq itens={c.faq} />
        </div>
      </section>

      <FaixaCta titulo={`Atendimento para ${c.nome} pelo WhatsApp`} mensagem={mensagemServico("as opções de crédito", local)} />

      <JsonLd
        data={[
          serviceJsonLd({ name: `Soluções em crédito em ${local}`, description: c.metaDescription, path, area: local }),
          breadcrumbJsonLd(migalhas),
          faqJsonLd(c.faq),
        ]}
      />
    </>
  );
}
