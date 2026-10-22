import { PageHero } from "@/components/PageHero";
import { FaixaCta, JsonLd, ListaFaq, TituloSecao } from "@/components/ui";
import { faqGeral } from "@/content/faq";
import { servicos } from "@/content/servicos";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Perguntas Frequentes sobre Empréstimo e Consignado",
  description:
    "Tire suas dúvidas sobre consignado, FGTS, crédito CLT, crédito pessoal, CET, segurança e atendimento da Innovare Soluções em Crédito.",
  path: "/faq",
});

const migalhas = [
  { nome: "Início", path: "/" },
  { nome: "Perguntas frequentes", path: "/faq" },
];

export default function FaqPage() {
  const porServico = servicos.map((s) => ({ titulo: s.titulo, itens: s.faq }));
  const todas = [...faqGeral, ...porServico.flatMap((g) => g.itens)];
  return (
    <>
      <PageHero migalhas={migalhas} eyebrow="Dúvidas" titulo="Perguntas frequentes" texto="Respostas diretas para as dúvidas mais comuns. Se a sua não estiver aqui, fale com a gente pelo WhatsApp." />

      <section className="py-16 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <TituloSecao eyebrow="Geral" titulo="Sobre a Innovare" />
          <ListaFaq itens={faqGeral} />
        </div>
        {porServico.map((g) => (
          <div key={g.titulo} className="container-site mt-16 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <TituloSecao titulo={g.titulo} />
            <ListaFaq itens={g.itens} />
          </div>
        ))}
      </section>

      <FaixaCta />
      <JsonLd data={[breadcrumbJsonLd(migalhas), faqJsonLd(todas)]} />
    </>
  );
}
