import { Esteira } from "@/components/Esteira";
import { PageHero } from "@/components/PageHero";
import { Simulador } from "@/components/Simulador";
import { FaixaCta, JsonLd, ListaFaq, TituloSecao } from "@/components/ui";
import { etapasAtendimento } from "@/content/etapas";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Simulador de Empréstimo: Consignado, CLT, Pessoal e Mais",
  description:
    "Simule seu empréstimo em segundos: consignado INSS, servidor público, crédito CLT, crédito pessoal, cartão, conta de energia e garantia de veículo. Envie a simulação pelo WhatsApp.",
  path: "/simulador",
});

const migalhas = [
  { nome: "Início", path: "/" },
  { nome: "Simulador", path: "/simulador" },
];

const faq = [
  {
    pergunta: "A simulação já é uma aprovação?",
    resposta:
      "Não. A simulação mostra uma estimativa. Os valores reais dependem da análise de crédito, da margem disponível e das condições da instituição financeira.",
  },
  {
    pergunta: "Por que o valor real pode ser diferente?",
    resposta:
      "Porque a taxa final considera seu perfil, a modalidade, o prazo e encargos como IOF e seguros, quando houver. Tudo isso entra no Custo Efetivo Total (CET), que informamos antes da contratação.",
  },
  {
    pergunta: "Preciso informar meus dados para simular?",
    resposta: "Não. A simulação é livre. Você só envia seus dados se quiser seguir com o atendimento.",
  },
];

export default function SimuladorPage() {
  return (
    <>
      <PageHero
        migalhas={migalhas}
        eyebrow="Simulador"
        titulo={
          <>
            Simule seu crédito <span className="texto-gradiente">em segundos</span>
          </>
        }
        texto="Escolha seu perfil, quanto precisa e em quantas parcelas. A estimativa aparece na hora, e você pode enviar a simulação para a nossa equipe pelo WhatsApp."
      >
        <div className="mt-12" data-reveal>
          <Simulador />
        </div>
      </PageHero>

      <section className="superficie-noite relative overflow-hidden border-t border-white/10 py-16 md:py-24">
        <div className="grade-tech pointer-events-none absolute inset-0" />
        <div className="container-site relative">
          <TituloSecao tom="escuro" eyebrow="Depois da simulação" titulo="O que acontece em seguida" />
          <div className="mt-10">
            <Esteira etapas={etapasAtendimento} />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <TituloSecao eyebrow="Dúvidas" titulo="Sobre a simulação" />
          <ListaFaq itens={faq} />
        </div>
      </section>

      <FaixaCta />
      <JsonLd data={[breadcrumbJsonLd(migalhas), faqJsonLd(faq)]} />
    </>
  );
}
