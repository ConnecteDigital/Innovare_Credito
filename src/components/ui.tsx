import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Icon } from "./Icon";
import { hrefServico, type Faq, type FaqGrupo, type Servico } from "@/content/servicos";
import { whatsappUrl } from "@/lib/whatsapp";

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function TituloSecao({
  eyebrow,
  titulo,
  texto,
  tom = "claro",
  centro = false,
}: {
  eyebrow?: string;
  titulo: ReactNode;
  texto?: ReactNode;
  tom?: "claro" | "escuro";
  centro?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${centro ? "mx-auto text-center" : ""}`} data-reveal>
      {eyebrow && <span className={`eyebrow ${tom === "claro" ? "eyebrow-claro" : ""}`}>{eyebrow}</span>}
      <h2 className={`mt-4 text-3xl leading-[1.1] font-semibold sm:text-4xl md:text-[2.75rem] ${tom === "claro" ? "text-tinta" : "text-white"}`}>
        {titulo}
      </h2>
      {texto && <p className={`mt-4 text-lg leading-relaxed ${tom === "claro" ? "text-ardosia" : "text-ceu"}`}>{texto}</p>}
    </div>
  );
}

export function CardServico({ s, i = 0, tom = "claro" }: { s: Servico; i?: number; tom?: "claro" | "escuro" }) {
  const claro = tom === "claro";
  return (
    <Link
      href={hrefServico(s)}
      data-reveal
      style={{ "--reveal-delay": `${(i % 4) * 70}ms` } as CSSProperties}
      className={`${claro ? "card-claro" : "card-luz"} group flex h-full flex-col p-6`}
    >
      <span className={`grid size-12 place-items-center rounded-2xl ${claro ? "bg-brand/8 text-brand" : "bg-white/8 text-laranja-300"}`}>
        <Icon name={s.icone} className="size-6" />
      </span>
      <h3 className={`mt-5 text-lg font-semibold ${claro ? "text-tinta" : "text-white"}`}>{s.titulo}</h3>
      <p className={`mt-2 flex-1 text-[0.95rem] leading-relaxed ${claro ? "text-ardosia" : "text-ceu"}`}>{s.resumo}</p>
      <span className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${claro ? "text-brand" : "text-laranja-300"}`}>
        Saiba mais <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export function ListaFaq({ itens, tom = "claro" }: { itens: Faq[]; tom?: "claro" | "escuro" }) {
  const claro = tom === "claro";
  return (
    <div className="space-y-3">
      {itens.map((f) => (
        <details
          key={f.pergunta}
          data-reveal
          className={`group rounded-2xl border px-5 py-1 transition-colors ${
            claro ? "border-tinta/8 bg-white open:border-brand/30" : "border-white/10 bg-white/[0.03] open:border-laranja/40"
          }`}
        >
          <summary className={`flex items-center justify-between gap-4 py-4 text-left font-semibold ${claro ? "text-tinta" : "text-white"}`}>
            {f.pergunta}
            <span className={`faq-icone grid size-8 shrink-0 place-items-center rounded-full text-xl leading-none transition-transform ${claro ? "bg-brand/8 text-brand" : "bg-white/10 text-white"}`}>
              +
            </span>
          </summary>
          <p className={`pb-5 leading-relaxed ${claro ? "text-ardosia" : "text-ceu"}`}>{f.resposta}</p>
        </details>
      ))}
    </div>
  );
}

/** FAQ dividido por tema: cada grupo com título e contador; grupos sem título viram lista simples. */
export function GruposFaq({ grupos, nota }: { grupos: FaqGrupo[]; nota?: string }) {
  return (
    <div className="space-y-10">
      {grupos.map((g, i) => (
        <div key={g.titulo || i}>
          {g.titulo && (
            <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-tinta/10 pb-2" data-reveal>
              <h3 className="text-lg font-semibold text-tinta">{g.titulo}</h3>
              <span className="shrink-0 text-sm text-ardosia">
                {g.itens.length} {g.itens.length === 1 ? "pergunta" : "perguntas"}
              </span>
            </div>
          )}
          <ListaFaq itens={g.itens} />
        </div>
      ))}
      {nota && (
        <div className="flex gap-4 rounded-2xl border border-laranja/40 bg-laranja/8 p-5" data-reveal>
          <Icon name="spark" className="mt-0.5 size-6 shrink-0 text-laranja" />
          <p className="leading-relaxed font-medium text-tinta">{nota}</p>
        </div>
      )}
    </div>
  );
}

export function FaixaCta({ titulo, texto, mensagem }: { titulo?: string; texto?: string; mensagem?: string }) {
  return (
    <section data-mascote="cta" className="py-16 md:py-24">
      <div className="container-site">
        <div
          data-reveal
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-laranja via-laranja to-laranja-600 px-6 py-12 text-white shadow-[0_30px_80px_-30px_rgb(242_138_43/0.8)] sm:px-12 md:py-16"
        >
          <div className="pointer-events-none absolute -top-32 -right-20 size-96 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-20 size-96 rounded-full bg-marinho/30 blur-3xl" />
          <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl leading-tight font-semibold sm:text-4xl">{titulo ?? "Vamos encontrar a melhor opção para você?"}</h2>
              <p className="mt-3 text-lg text-white/90">
                {texto ?? "Fale com a nossa equipe pelo WhatsApp e peça uma simulação sem compromisso. Explicamos tudo antes de você decidir."}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={whatsappUrl(mensagem)} target="_blank" rel="noopener" className="btn bg-white text-laranja-600 shadow-lg">
                <Icon name="whatsapp" className="size-5" /> Falar no WhatsApp
              </a>
              <Link href="/servicos" className="btn border border-white/50 text-white hover:bg-white/10">
                Ver serviços <Icon name="arrow" className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Migalhas({ itens }: { itens: { nome: string; path: string }[] }) {
  return (
    <nav aria-label="Você está em" className="text-sm text-ceu">
      <ol className="flex flex-wrap items-center gap-1.5">
        {itens.map((it, i) => (
          <li key={it.path} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i < itens.length - 1 ? (
              <Link href={it.path} className="hover:text-white">
                {it.nome}
              </Link>
            ) : (
              <span aria-current="page" className="text-white/90">
                {it.nome}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
