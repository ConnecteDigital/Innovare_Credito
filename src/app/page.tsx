import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Esteira } from "@/components/Esteira";
import { Icon } from "@/components/Icon";
import { Logo3D } from "@/components/Logo3D";
import { MapaLocal } from "@/components/MapaLocal";
import { Parceiros } from "@/components/Parceiros";
import { ParticleField } from "@/components/ParticleField";
import { SeletorPerfil } from "@/components/SeletorPerfil";
import { CardServico, FaixaCta, JsonLd, ListaFaq, TituloSecao } from "@/components/ui";
import { cidades } from "@/content/cidades";
import { etapasAtendimento } from "@/content/etapas";
import { faqGeral } from "@/content/faq";
import { hrefServico, outrosServicos, servicosConsignado } from "@/content/servicos";
import { institucional, site } from "@/content/site";
import { faqJsonLd } from "@/lib/seo";
import { whatsappUrl } from "@/lib/whatsapp";



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
        <ParticleField />

        <div className="container-site relative grid flex-1 items-center gap-6 py-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:py-14">
          {/* foto da equipe (pedido da cliente) */}
          <div className="relative order-last mx-auto w-full max-w-xl lg:max-w-none" data-reveal style={{ "--reveal-delay": "300ms" } as CSSProperties}>
            <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-brand/50 via-transparent to-laranja/40 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 shadow-[0_40px_90px_-30px_rgb(0_0_0/0.7)]">
              <Image
                src="/images/equipe-innovare.jpg"
                alt="Equipe da Innovare Soluções em Crédito em Jaguaquara"
                width={1280}
                height={853}
                priority
                sizes="(min-width: 1024px) 45vw, 92vw"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-noite/80 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-noite/60 px-4 py-2 text-sm text-white backdrop-blur-md">
                <span className="size-2 rounded-full bg-[#1fae5b] shadow-[0_0_10px_#1fae5b]" /> Nossa equipe, pronta para te atender
              </div>
            </div>
          </div>
          <div>
            <span className="eyebrow"><span className="hidden sm:inline">Soluções em crédito ·</span> Jaguaquara – BA</span>
            <div className="mt-6">
              <TituloAnimado />
            </div>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ceu sm:mt-6 sm:text-lg md:text-xl" data-reveal style={{ "--reveal-delay": "500ms" } as CSSProperties}>
              <span className="sm:hidden">Consignado, FGTS, crédito CLT e mais, com tudo explicado antes de você decidir.</span>
              <span className="hidden sm:inline">
                Consignado INSS e servidores, portabilidade com troco, FGTS, crédito CLT e muito mais. Atendimento humanizado e
                condições explicadas antes de você decidir.
              </span>
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-reveal style={{ "--reveal-delay": "650ms" } as CSSProperties}>
              <Link href="/servicos" className="btn btn-laranja">
                Ver serviços <Icon name="arrow" className="size-5" />
              </Link>
              <a href={whatsappUrl()} target="_blank" rel="noopener" className="btn btn-whatsapp">
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
              { icone: "whatsapp" as const, t: "Tudo online, todo o Brasil", s: "Atendimento rápido pelo WhatsApp" },
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
            <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white shadow-[0_30px_80px_-30px_rgb(36_78_164/0.55)]">
              <Image
                src="/images/consultor-innovare.jpg"
                alt="Eri, da Innovare Soluções em Crédito, sorrindo, sentado em uma poltrona"
                width={1024}
                height={1536}
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-marinho/80 p-4 text-white backdrop-blur-xl">
                <p className="text-sm text-ceu">Atendimento de verdade</p>
                <p className="font-display text-lg font-semibold">Gente da região cuidando do seu crédito</p>
              </div>
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
                  <Link href={hrefServico(s)} className="card-claro group flex items-start gap-4 p-5 sm:items-center sm:gap-5">
                    <span className="grid size-12 shrink-0 sm:size-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-azul text-white shadow-lg">
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
          <div className="flex items-end gap-6 lg:gap-10">
            <TituloSecao
              eyebrow="Para você"
              titulo="Qual é o seu perfil?"
              texto="Escolha a opção que mais combina com você e veja as modalidades de crédito indicadas."
            />
            {/* logo 3D pequena, balançando (sem virar de costas) */}
            <Logo3D variante="solta" className="relative hidden w-24 shrink-0 sm:block lg:w-28" />
          </div>
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
              texto="Crédito para diferentes perfis e momentos, além de consórcios e microcrédito para o seu negócio."
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

      {/* ============================== COMO FUNCIONA */}
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
          <div className="superficie-noite relative overflow-hidden rounded-[2rem] p-7 sm:p-9" data-reveal>
            <div className="grade-tech pointer-events-none absolute inset-0 opacity-70" />
            <div className="relative space-y-7">
              {[
                { t: "Missão", x: institucional.missao, i: "target" as const },
                { t: "Visão", x: institucional.visao, i: "eye" as const },
              ].map((b) => (
                <div key={b.t} className="flex gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-laranja text-white">
                    <Icon name={b.i} />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{b.t}</h3>
                    <p className="mt-1.5 leading-relaxed text-ceu">{b.x}</p>
                  </div>
                </div>
              ))}
              <p className="border-t border-white/10 pt-5 text-sm text-ceu">
                Correspondente bancário · Seguimos as diretrizes do Banco Central do Brasil (BACEN)
              </p>
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
