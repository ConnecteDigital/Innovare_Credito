import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Esteira } from "@/components/Esteira";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { Simulador } from "@/components/Simulador";
import { FaixaCta, JsonLd, ListaFaq, TituloSecao } from "@/components/ui";
import { etapasAtendimento } from "@/content/etapas";
import { hrefServico, servicosConsignado } from "@/content/servicos";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { mensagemServico, whatsappUrl } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Empréstimo Consignado INSS e Servidores Públicos",
  description:
    "Consignado para aposentados, pensionistas do INSS, BPC/LOAS e servidores públicos municipais e estaduais. Portabilidade com troco. Atendimento em Jaguaquara – BA e em todo o Brasil.",
  path: "/consignado",
});

const migalhas = [
  { nome: "Início", path: "/" },
  { nome: "Consignado", path: "/consignado" },
];

const faq = [
  {
    pergunta: "O que é empréstimo consignado?",
    resposta:
      "É o empréstimo em que as parcelas são descontadas direto do benefício do INSS ou da folha de pagamento. Por ter esse desconto automático, costuma ter taxas menores que outras modalidades.",
  },
  {
    pergunta: "O que é margem consignável?",
    resposta:
      "É a parte do benefício ou do salário que pode ser comprometida com parcelas de consignado, conforme limites definidos em lei. Consultamos a sua margem antes de apresentar as opções.",
  },
  {
    pergunta: "Já tenho consignado. Posso pegar mais?",
    resposta:
      "Se ainda houver margem disponível, sim. Também é possível fazer portabilidade ou refinanciamento com troco, conforme análise.",
  },
  ...servicosConsignado.flatMap((s) => s.faq.slice(0, 1)),
];

export default function ConsignadoPage() {
  return (
    <>
      <PageHero
        migalhas={migalhas}
        eyebrow="Destaque Innovare"
        titulo={
          <>
            Empréstimo consignado para <span className="texto-gradiente">INSS e servidores públicos</span>
          </>
        }
        texto="As linhas de crédito com as melhores condições para aposentados, pensionistas, beneficiários do BPC/LOAS e servidores municipais e estaduais. Parcela descontada direto no benefício ou na folha, com tudo explicado antes da contratação."
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={whatsappUrl(mensagemServico("empréstimo consignado"))} target="_blank" rel="noopener" className="btn btn-laranja">
            <Icon name="whatsapp" className="size-5" /> Consultar minha margem
          </a>
          <a href="#simulador" className="btn btn-vidro">
            <Icon name="calculator" className="size-5" /> Simular consignado
          </a>
        </div>
      </PageHero>

      <section className="py-16 md:py-24">
        <div className="container-site">
          <TituloSecao eyebrow="Modalidades" titulo="Escolha a opção do seu perfil" />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {servicosConsignado.map((s, i) => (
              <Link
                key={s.slug}
                href={hrefServico(s)}
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}
                className="card-claro group flex flex-col p-7"
              >
                <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-azul text-white shadow-lg">
                  <Icon name={s.icone} className="size-7" />
                </span>
                <h2 className="mt-6 text-2xl font-semibold text-tinta">{s.titulo}</h2>
                <p className="mt-3 flex-1 leading-relaxed text-ardosia">{s.resumo}</p>
                <ul className="mt-5 space-y-2 text-[0.95rem]">
                  {s.publico.slice(0, 3).map((p) => (
                    <li key={p} className="flex gap-2 text-tinta/80">
                      <Icon name="check" className="mt-0.5 size-5 shrink-0 text-laranja" strokeWidth={2.4} />
                      {p}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-brand">
                  Ver detalhes <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div className="relative" data-reveal>
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-laranja/25 via-transparent to-brand/30 blur-2xl" />
            <Image
              src="/images/equipe-innovare.jpg"
              alt="Equipe da Innovare pronta para atender aposentados, pensionistas e servidores"
              width={1280}
              height={853}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="relative aspect-[4/3] w-full rounded-[2rem] border border-white object-cover shadow-[0_30px_80px_-30px_rgb(36_78_164/0.55)]"
            />
          </div>
          <div>
            <TituloSecao
              eyebrow="Por que a Innovare"
              titulo="Você entende cada número antes de assinar"
              texto="Consignado é um compromisso de longo prazo. Por isso, explicamos margem, parcela, prazo, taxa e custo total com calma, de forma presencial em Jaguaquara ou pelo WhatsApp."
            />
            <ul className="mt-8 space-y-3">
              {[
                "Consulta de margem e das opções disponíveis para o seu benefício ou órgão",
                "Comparação clara em casos de portabilidade e refinanciamento",
                "Sem cobrança antecipada para liberar crédito",
                "Atendimento humanizado, com escuta e paciência",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-ardosia" data-reveal>
                  <Icon name="check" className="mt-0.5 size-5 shrink-0 text-laranja" strokeWidth={2.4} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="superficie-noite relative overflow-hidden py-16 md:py-24">
        <div className="grade-tech pointer-events-none absolute inset-0" />
        <div className="container-site relative">
          <TituloSecao tom="escuro" eyebrow="Como funciona" titulo="Simples, do começo ao fim" />
          <div className="mt-10">
            <Esteira etapas={etapasAtendimento} />
          </div>
          <div id="simulador" className="mt-20 scroll-mt-28">
            <TituloSecao tom="escuro" eyebrow="Simulador" titulo="Simule seu consignado" />
            <div className="mt-8" data-reveal>
              <Simulador modalidadeInicial="inss" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <TituloSecao eyebrow="Dúvidas" titulo="Perguntas sobre consignado" />
          <ListaFaq itens={faq} />
        </div>
      </section>

      <FaixaCta titulo="Quer saber quanto você pode pegar no consignado?" mensagem={mensagemServico("empréstimo consignado")} />

      <JsonLd
        data={[
          serviceJsonLd({
            name: "Empréstimo consignado INSS e servidores públicos",
            description: "Consignado para aposentados, pensionistas, BPC/LOAS e servidores públicos.",
            path: "/consignado",
          }),
          breadcrumbJsonLd(migalhas),
          faqJsonLd(faq),
        ]}
      />
    </>
  );
}
