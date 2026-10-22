import type { ReactNode } from "react";
import { ParticleField } from "./ParticleField";
import { Migalhas } from "./ui";

/** Hero escuro das páginas internas: constelação discreta no fundo, migalhas e título. */
export function PageHero({
  migalhas,
  eyebrow,
  titulo,
  texto,
  children,
}: {
  migalhas: { nome: string; path: string }[];
  eyebrow?: string;
  titulo: ReactNode;
  texto?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="superficie-noite relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="grade-tech pointer-events-none absolute inset-0" />
      <ParticleField densidade={0.6} />
      <div className="container-site relative">
        <Migalhas itens={migalhas} />
        {eyebrow && <span className="eyebrow mt-8">{eyebrow}</span>}
        <h1 className="mt-5 max-w-4xl text-4xl leading-[1.08] font-semibold text-white sm:text-5xl md:text-6xl">{titulo}</h1>
        {texto && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ceu md:text-xl">{texto}</p>}
        {children}
      </div>
    </section>
  );
}
