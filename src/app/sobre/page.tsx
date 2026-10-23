import Image from "next/image";
import type { CSSProperties } from "react";
import { Icon } from "@/components/Icon";
import { LogoSimbolo } from "@/components/Logo";
import { MapaLocal } from "@/components/MapaLocal";
import { PageHero } from "@/components/PageHero";
import { Parceiros } from "@/components/Parceiros";
import { FaixaCta, JsonLd, TituloSecao } from "@/components/ui";
import { institucional, site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sobre a Innovare – Quem Somos, Missão e Valores",
  description:
    "Conheça a Innovare Soluções em Crédito, de Jaguaquara – BA: atendimento humanizado, transparência e responsabilidade para conectar você às melhores opções de crédito.",
  path: "/sobre",
});

const migalhas = [
  { nome: "Início", path: "/" },
  { nome: "Sobre", path: "/sobre" },
];

export default function SobrePage() {
  return (
    <>
      <PageHero
        migalhas={migalhas}
        eyebrow="Quem somos"
        titulo={
          <>
            Crédito com <span className="texto-gradiente">atendimento próximo</span>
          </>
        }
        texto={institucional.quemSomos}
      />

      <section className="py-16 md:py-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div className="relative" data-reveal>
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-laranja/25 via-transparent to-brand/30 blur-2xl" />
            <Image
              src="/images/equipe-innovare.jpg"
              alt="Equipe da Innovare Soluções em Crédito em Jaguaquara"
              width={1280}
              height={853}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="relative aspect-[4/3] w-full rounded-[2rem] border border-white object-cover shadow-[0_30px_80px_-30px_rgb(36_78_164/0.55)]"
              priority
            />
          </div>
          <div className="grid gap-5">
            {[
              { t: "Missão", x: institucional.missao, i: "target" as const },
              { t: "Visão", x: institucional.visao, i: "eye" as const },
            ].map((b, k) => (
              <div key={b.t} className="card-claro p-7" data-reveal style={{ "--reveal-delay": `${k * 100}ms` } as CSSProperties}>
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand text-white">
                    <Icon name={b.i} />
                  </span>
                  <h2 className="text-2xl font-semibold text-tinta">{b.t}</h2>
                </div>
                <p className="mt-4 text-lg leading-relaxed text-ardosia">{b.x}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative mx-auto w-full max-w-sm" data-reveal>
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-brand/30 via-transparent to-laranja/30 blur-2xl" />
            <Image
              src="/images/consultor-innovare.jpg"
              alt={`${site.responsavel}, responsável pela Innovare Soluções em Crédito`}
              width={1024}
              height={1536}
              sizes="(min-width: 1024px) 30vw, 80vw"
              className="relative aspect-[4/5] w-full rounded-[2rem] border border-white object-cover object-top shadow-[0_30px_80px_-30px_rgb(36_78_164/0.55)]"
            />
          </div>
          <div>
            <TituloSecao
              eyebrow="Quem cuida do seu crédito"
              titulo={site.responsavel}
              texto="À frente da Innovare, Eri e a equipe atendem cada cliente com escuta, paciência e transparência: entender o momento de cada pessoa antes de apresentar qualquer proposta."
            />
            <p className="mt-6 text-sm font-semibold tracking-[0.12em] text-ardosia uppercase" data-reveal>
              Responsável · {site.nome}
            </p>
          </div>
        </div>
      </section>

      <section className="superficie-noite relative overflow-hidden py-16 md:py-24">
        <div className="grade-tech pointer-events-none absolute inset-0" />
        <LogoSimbolo className="pointer-events-none absolute -right-20 -bottom-24 h-[28rem] w-auto text-white/[0.04]" />
        <div className="container-site relative">
          <TituloSecao tom="escuro" eyebrow="Valores" titulo="O que guia cada atendimento" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {institucional.valores.map((v, i) => (
              <div key={v.titulo} className="card-luz p-6" data-reveal style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as CSSProperties}>
                <Icon name="check" className="size-7 text-laranja-300" strokeWidth={2.2} />
                <h3 className="mt-4 text-xl font-semibold text-white">{v.titulo}</h3>
                <p className="mt-1.5 text-ceu">{v.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <TituloSecao eyebrow="Objetivos" titulo="Onde queremos chegar" />
            <ol className="mt-8 space-y-4">
              {institucional.objetivos.map((o, i) => (
                <li key={o} className="flex gap-4" data-reveal>
                  <span className="font-display text-3xl font-bold text-laranja">{String(i + 1).padStart(2, "0")}</span>
                  <p className="pt-1.5 text-lg leading-relaxed text-ardosia">{o}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <TituloSecao eyebrow="Visite a loja" titulo={`${site.endereco.cidade} – ${site.endereco.uf}`} />
            <div className="mt-8" data-reveal>
              <MapaLocal />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="container-site">
          <Parceiros />
        </div>
      </section>

      <FaixaCta />
      <JsonLd data={breadcrumbJsonLd(migalhas)} />
    </>
  );
}
