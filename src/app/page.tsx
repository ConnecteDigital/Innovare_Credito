import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Esteira } from "@/components/Esteira";
import { Icon } from "@/components/Icon";
import { Logo3D } from "@/components/Logo3D";
import { MapaLocal } from "@/components/MapaLocal";
import { Parceiros } from "@/components/Parceiros";
import { ParticleField, type Forma } from "@/components/ParticleField";
import { SeletorPerfil } from "@/components/SeletorPerfil";
import { Simulador } from "@/components/Simulador";
import { CardServico, FaixaCta, JsonLd, ListaFaq, TituloSecao } from "@/components/ui";
import { cidades } from "@/content/cidades";
import { etapasAtendimento } from "@/content/etapas";
import { faqGeral } from "@/content/faq";
import { hrefServico, outrosServicos, servicosConsignado } from "@/content/servicos";
import { institucional, site } from "@/content/site";
import { faqJsonLd } from "@/lib/seo";
import { whatsappUrl } from "@/lib/whatsapp";

const formas: Forma[] = [
  { tipo: "texto", valor: "INNOVARE" },
  { tipo: "simbolo" },
  { tipo: "texto", valor: "CRÉDITO" },
];


function TituloAnimado() {
  const linha1 = "Está precisando de dinheiro?".split(" ");
  const linha2 = "A Innovare tem a solução para você!".split(" ");
  let i = 0;
  const palavra = (p: string, destaque = false) => (
    <span key={`${p}-${i}`} className={`palavra ${destaque ? "texto-gradiente" : ""}`} style={{ "--i": i++ } as CSSProperties}>
      {p}
    </span>
  );
  return (
    <h1 className="text-[2.35rem] leading-[1.05] font-semibold text-white sm:text-6xl lg:text-[4.1rem]">
      <span className="block text-[0.62em] font-medium text-ceu">{linha1.map((p, k) => [k > 0 && " ", palavra(p)])}</span>
      <span className="mt-2 block">{linha2.map((p, k) => [k > 0 && " ", palavra(p, p === "solução")])}</span>
    </h1>
  );
}

export default function Home() {
  return (
    <>
      {/* ============================== HERO */}
      <section data-mascote="inicio" className="superficie-noite relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-24 md:pt-28">
        <div className="grade-tech pointer-events-none absolute inset-0" />
        <ParticleField formas={formas} alvoId="alvo-particulas" />

        <div className="container-site relative grid flex-1 items-center gap-6 py-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:py-14">
          <div id="alvo-particulas" aria-hidden="true" className="order-first h-24 sm:h-32 lg:order-last lg:h-[320px]" />
          <div>
            <span className="eyebrow"><span className="hidden sm:inline">Soluções em crédito ·</span> Jaguaquara – BA</span>
            <div className="mt-6">
              <TituloAnimado />
            </div>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ceu md:text-xl" data-reveal style={{ "--reveal-delay": "500ms" } as CSSProperties}>
              Consignado INSS e servidores, portabilidade com troco, FGTS, crédito CLT e muito mais. Atendimento humanizado e
              condições explicadas antes de você decidir.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-reveal style={{ "--reveal-delay": "650ms" } as CSSProperties}>
              <Link href="/simulador" className="btn btn-laranja">
                <Icon name="calculator" className="size-5" /> Simular agora
              </Link>
              <a href={whatsappUrl()} target="_blank" rel="noopener" className="btn btn-vidro">
                <Icon name="whatsapp" className="size-5" /> Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-noite/40 backdrop-blur-md">
          <ul className="container-site grid gap-4 py-5 text-sm sm:grid-cols-3 sm:text-[0.95rem]">
            {[
              { icone: "pin" as const, t: "Loja física em Jaguaquara", s: `Atendimento presencial no ${site.regiao}` },
              { icone: "eye" as const, t: "Tudo explicado antes", s: "Parcela, prazo, taxa e custo total" },
              { icone: "whatsapp" as const, t: "Todo o Brasil", s: "Atendimento rápido pelo WhatsApp" },
            ].map((b) => (
              <li key={b.t} className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-laranja-300">
                  <Icon name={b.icone} className="size-5" />
                </span>
                <span>
                  <span className="block font-semibold text-white">{b.t}</span>
                  <span className="block text-ceu">{b.s}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================== CONSIGNADO EM DESTAQUE */}
      <section data-mascote="consignado" className="py-20 md:py-28">
        <div className="container-site grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none" data-reveal>
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-brand/30 via-transparent to-laranja/30 blur-2xl" />
            <div className="relative shadow-[0_30px_80px_-30px_rgb(36_78_164/0.7)] rounded-[2rem]">
              <Logo3D />
            </div>
          </div>

          <div>
            <TituloSecao
              eyebrow="Destaque"
              titulo={
                <>
                  Consignado para <span className="text-brand">aposentados, pensionistas</span> e servidores públicos
                </>
              }
              texto="As modalidades com as melhores condições do mercado, com parcelas descontadas direto no benefício ou na folha. Consultamos sua margem e explicamos cada número."
            />
            <ul className="mt-8 space-y-3">
              {servicosConsignado.map((s, i) => (
                <li key={s.slug} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}>
                  <Link href={hrefServico(s)} className="card-claro group flex items-center gap-5 p-5">
                    <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand to-azul text-white shadow-lg">
                      <Icon name={s.icone} className="size-7" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-lg font-semibold text-tinta">{s.titulo}</span>
                      <span className="mt-0.5 block text-[0.95rem] leading-relaxed text-ardosia">{s.resumo}</span>
                    </span>
                    <Icon name="arrow" className="ml-auto size-5 shrink-0 text-brand transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/consignado" className="btn btn-azul mt-8">
              Conhecer o consignado <Icon name="arrow" className="size-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================== PERFIL */}
      <section data-mascote="perfil" className="bg-white py-20 md:py-28">
        <div className="container-site">
          <TituloSecao
            eyebrow="Para você"
            titulo="Qual é o seu perfil?"
            texto="Escolha a opção que mais combina com você e veja as modalidades de crédito indicadas."
          />
          <div className="mt-12">
            <SeletorPerfil />
          </div>
        </div>
      </section>

      {/* ============================== SERVIÇOS */}
      <section data-mascote="servicos" className="py-20 md:py-28">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <TituloSecao
              eyebrow="Serviços"
              titulo="Mais soluções para os seus planos"
              texto="Crédito para diferentes perfis e momentos, além de consórcios e maquininhas para o seu negócio."
            />
            <Link href="/servicos" className="btn btn-contorno shrink-0" data-reveal>
              Todos os serviços <Icon name="arrow" className="size-5" />
            </Link>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {outrosServicos.map((s, i) => (
              <CardServico key={s.slug} s={s} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================== COMO FUNCIONA + SIMULADOR */}
      <section className="superficie-noite relative overflow-hidden py-20 md:py-28">
        <div className="grade-tech pointer-events-none absolute inset-0" />
        <div className="container-site relative">
          <TituloSecao
            tom="escuro"
            eyebrow="Como funciona"
            titulo="Do primeiro contato ao dinheiro na conta, sem complicação"
            texto="Um caminho simples, com a nossa equipe ao seu lado em cada etapa."
          />
          <div className="mt-12" data-mascote="como-funciona">
            <Esteira etapas={etapasAtendimento} />
          </div>

          <div id="simulador" data-mascote="simulador" className="mt-24 scroll-mt-28">
            <TituloSecao
              tom="escuro"
              eyebrow="Simulador"
              titulo={
                <>
                  Simule em segundos e veja <span className="texto-gradiente">quanto fica a parcela</span>
                </>
              }
              texto="Escolha seu perfil, o valor e o prazo. Depois é só enviar a simulação para a nossa equipe pelo WhatsApp."
            />
            <div className="mt-10" data-reveal>
              <Simulador />
            </div>
          </div>
        </div>
      </section>

      {/* ============================== SOBRE */}
      <section data-mascote="sobre" className="bg-white py-20 md:py-28">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <TituloSecao eyebrow="Quem somos" titulo="Crédito com atendimento próximo" texto={institucional.quemSomos} />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {institucional.valores.map((v, i) => (
                <li
                  key={v.titulo}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 60}ms` } as CSSProperties}
                  className="flex items-start gap-3 rounded-2xl border border-tinta/8 bg-papel p-4"
                >
                  <Icon name="check" className="mt-0.5 size-5 shrink-0 text-laranja" strokeWidth={2.4} />
                  <span>
                    <span className="block font-semibold text-tinta">{v.titulo}</span>
                    <span className="block text-sm text-ardosia">{v.texto}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/sobre" className="btn btn-contorno mt-8" data-reveal>
              Conheça a Innovare <Icon name="arrow" className="size-5" />
            </Link>
          </div>
          <div className="relative" data-reveal>
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-laranja/25 via-transparent to-brand/30 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white shadow-[0_30px_80px_-30px_rgb(36_78_164/0.55)]">
              <Image
                src="/images/equipe-innovare.jpg"
                alt="Equipe da Innovare Soluções em Crédito"
                width={1280}
                height={853}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-6 rounded-2xl bg-marinho px-5 py-4 text-white shadow-xl sm:left-auto sm:-right-4">
              <p className="text-xs tracking-[0.14em] text-laranja-300 uppercase">Nossa missão</p>
              <p className="mt-1 max-w-[16rem] text-sm leading-snug">Facilitar o acesso ao crédito com transparência e responsabilidade.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== ONDE ATENDEMOS */}
      <section data-mascote="cidades" className="py-20 md:py-28">
        <div className="container-site grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <TituloSecao
              eyebrow="Onde atendemos"
              titulo={`Presencial no ${site.regiao}. Pelo WhatsApp, em todo o Brasil.`}
              texto="Nossa loja fica no Centro de Jaguaquara. Atendemos de perto as cidades da região e, por WhatsApp, clientes de qualquer lugar do país."
            />
            <ul className="mt-8 flex flex-wrap gap-2" data-reveal>
              {cidades.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/cidades/${c.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-tinta/10 bg-white px-4 py-2.5 text-[0.95rem] font-medium text-tinta transition-colors hover:border-brand hover:text-brand"
                  >
                    <Icon name="pin" className="size-4 text-laranja" /> {c.nome}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/cidades" className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-[0.95rem] font-medium text-white">
                  Todo o Brasil <Icon name="arrow" className="size-4" />
                </Link>
              </li>
            </ul>
          </div>
          <div data-reveal>
            <MapaLocal />
          </div>
        </div>
      </section>

      {/* ============================== PARCEIROS */}
      <section className="pb-8">
        <div className="container-site">
          <Parceiros />
        </div>
      </section>

      {/* ============================== FAQ */}
      <section data-mascote="faq" className="py-20 md:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <TituloSecao
            eyebrow="Dúvidas"
            titulo="Perguntas frequentes"
            texto={
              <>
                Não encontrou sua dúvida?{" "}
                <a href={whatsappUrl()} target="_blank" rel="noopener" className="font-semibold text-brand underline-offset-4 hover:underline">
                  Fale com a gente
                </a>
                .
              </>
            }
          />
          <ListaFaq itens={faqGeral.slice(0, 5)} />
        </div>
      </section>

      <FaixaCta />
      <JsonLd data={faqJsonLd(faqGeral.slice(0, 5))} />
    </>
  );
}
