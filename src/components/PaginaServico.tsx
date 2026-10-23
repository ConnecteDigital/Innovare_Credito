import Link from "next/link";
import type { CSSProperties } from "react";
import { Icon } from "./Icon";
import { PageHero } from "./PageHero";
import { Simulador } from "./Simulador";
import { CardServico, FaixaCta, JsonLd, ListaFaq, TituloSecao } from "./ui";
import { cidades } from "@/content/cidades";
import { hrefServico, servicos, type Servico } from "@/content/servicos";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { mensagemServico, whatsappUrl } from "@/lib/whatsapp";

export function PaginaServico({ s }: { s: Servico }) {
  const path = hrefServico(s);
  const migalhas =
    s.grupo === "consignado"
      ? [
          { nome: "Início", path: "/" },
          { nome: "Consignado", path: "/consignado" },
          { nome: s.tituloCurto, path },
        ]
      : [
          { nome: "Início", path: "/" },
          { nome: "Serviços", path: "/servicos" },
          { nome: s.tituloCurto, path },
        ];
  const relacionados = servicos.filter((o) => o.slug !== s.slug && o.perfis.some((p) => s.perfis.includes(p))).slice(0, 3);

  return (
    <>
      <PageHero migalhas={migalhas} eyebrow={s.grupo === "consignado" ? "Consignado" : "Serviços"} titulo={s.h1} texto={s.intro}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={whatsappUrl(mensagemServico(s.titulo))} target="_blank" rel="noopener" className="btn btn-laranja">
            <Icon name="whatsapp" className="size-5" /> Quero saber mais
          </a>
          {s.modalidadeSimulador && (
            <a href="#simulador" className="btn btn-vidro">
              <Icon name="calculator" className="size-5" /> Simular agora
            </a>
          )}
        </div>
      </PageHero>

      <section className="py-16 md:py-24">
        <div className="container-site grid gap-6 lg:grid-cols-3">
          <div className="card-claro p-7 lg:col-span-1" data-reveal>
            <span className="grid size-12 place-items-center rounded-2xl bg-brand/8 text-brand">
              <Icon name="user" />
            </span>
            <h2 className="mt-5 text-2xl font-semibold text-tinta">Para quem é</h2>
            <ul className="mt-4 space-y-3">
              {s.publico.map((p) => (
                <li key={p} className="flex gap-3 text-ardosia">
                  <Icon name="check" className="mt-0.5 size-5 shrink-0 text-laranja" strokeWidth={2.4} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-6 sm:grid-cols-3 lg:col-span-2">
            {s.vantagens.map((v, i) => (
              <div key={v.titulo} className="card-claro p-6" data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}>
                <span className="font-display text-4xl font-bold text-brand/15">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold text-tinta">{v.titulo}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ardosia">{v.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="superficie-noite relative overflow-hidden py-16 md:py-24">
        <div className="grade-tech pointer-events-none absolute inset-0" />
        <div className="container-site relative grid gap-12 lg:grid-cols-2">
          <div>
            <TituloSecao tom="escuro" eyebrow="Passo a passo" titulo="Como funciona" />
            <ol className="mt-8 space-y-4">
              {s.comoFunciona.map((passo, i) => (
                <li key={passo} className="flex gap-4" data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-laranja/50 bg-laranja/10 font-display font-semibold text-laranja-300">
                    {i + 1}
                  </span>
                  <p className="pt-1.5 leading-relaxed text-white/90">{passo}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <TituloSecao tom="escuro" eyebrow="Documentos" titulo="O que pode ser solicitado" />
            <ul className="mt-8 grid gap-3">
              {s.documentos.map((d) => (
                <li key={d} className="card-luz flex items-center gap-3 p-4 text-white/90" data-reveal>
                  <Icon name="doc" className="size-5 shrink-0 text-laranja-300" />
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ceu">A lista pode variar conforme a instituição financeira e a modalidade.</p>
          </div>
        </div>
        {s.atencao && (
          <div className="container-site relative mt-12" data-reveal>
            <div className="flex gap-4 rounded-2xl border border-laranja/40 bg-laranja/10 p-5 text-white">
              <Icon name="shield" className="size-6 shrink-0 text-laranja-300" />
              <p className="leading-relaxed">
                <strong>Importante: </strong>
                {s.atencao}
              </p>
            </div>
          </div>
        )}
        {s.modalidadeSimulador && (
          <div id="simulador" data-mascote="simulador" className="container-site relative mt-20 scroll-mt-28">
            <TituloSecao tom="escuro" eyebrow="Simulador" titulo="Faça uma simulação" />
            <div className="mt-8" data-reveal>
              <Simulador modalidadeInicial={s.modalidadeSimulador} />
            </div>
          </div>
        )}
      </section>

      <section className="py-16 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <TituloSecao eyebrow="Dúvidas" titulo={`Dúvidas sobre ${s.tituloCurto}`} />
            <div className="mt-8 rounded-2xl border border-tinta/8 bg-white p-5" data-reveal>
              <p className="font-semibold text-tinta">Atendemos em</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {cidades.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/cidades/${c.slug}`} className="inline-block rounded-full bg-papel px-3 py-1.5 text-sm text-ardosia hover:text-brand">
                      {c.nome}
                    </Link>
                  </li>
                ))}
                <li className="inline-block rounded-full bg-brand/8 px-3 py-1.5 text-sm font-medium text-brand">e em todo o Brasil</li>
              </ul>
            </div>
          </div>
          <ListaFaq itens={s.faq} />
        </div>
      </section>

      {relacionados.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="container-site">
            <TituloSecao eyebrow="Veja também" titulo="Outras opções para o seu perfil" />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {relacionados.map((r, i) => (
                <CardServico key={r.slug} s={r} i={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <FaixaCta mensagem={mensagemServico(s.titulo)} />

      <JsonLd
        data={[
          serviceJsonLd({ name: s.titulo, description: s.metaDescription, path }),
          breadcrumbJsonLd(migalhas),
          faqJsonLd(s.faq),
        ]}
      />
    </>
  );
}
