import Link from "next/link";
import type { CSSProperties } from "react";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { FaixaCta, JsonLd, ListaFaq, TituloSecao } from "@/components/ui";
import { faqGeral } from "@/content/faq";
import { hrefServico, servicos, todasFaq } from "@/content/servicos";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Perguntas Frequentes sobre Empréstimo e Consignado",
  description:
    "Tire suas dúvidas sobre a Innovare e veja as perguntas frequentes de cada serviço: consignado INSS, servidores, portabilidade, FGTS, crédito CLT, microcrédito e mais.",
  path: "/faq",
});

const migalhas = [
  { nome: "Início", path: "/" },
  { nome: "Perguntas frequentes", path: "/faq" },
];

// Cada serviço tem o seu FAQ completo na própria página; aqui ficam as dúvidas gerais e o índice.
export default function FaqPage() {
  return (
    <>
      <PageHero migalhas={migalhas} eyebrow="Dúvidas" titulo="Perguntas frequentes" texto="Respostas diretas para as dúvidas mais comuns. Se a sua não estiver aqui, fale com a gente pelo WhatsApp." />

      <section className="py-16 md:py-24">
        <div className="container-site grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <TituloSecao eyebrow="Geral" titulo="Sobre a Innovare" />
          <ListaFaq itens={faqGeral} />
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container-site">
          <TituloSecao
            eyebrow="Por serviço"
            titulo="Perguntas de cada serviço"
            texto="Cada serviço tem a sua própria página de dúvidas, organizada por tema."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {servicos.map((s, i) => {
              const total = todasFaq(s).length;
              return (
                <li key={s.slug} data-reveal style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as CSSProperties}>
                  <Link href={`${hrefServico(s)}#duvidas`} className="card-claro group flex h-full items-center gap-4 p-5">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand/8 text-brand">
                      <Icon name={s.icone} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-tinta">{s.tituloCurto}</span>
                      <span className="block text-sm text-ardosia">
                        {total} {total === 1 ? "pergunta" : "perguntas"}
                      </span>
                    </span>
                    <Icon name="arrow" className="ml-auto size-5 shrink-0 text-brand transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <FaixaCta />
      <JsonLd data={[breadcrumbJsonLd(migalhas), faqJsonLd(faqGeral)]} />
    </>
  );
}
