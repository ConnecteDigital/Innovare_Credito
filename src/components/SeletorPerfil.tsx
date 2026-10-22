"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "./Icon";
import { hrefServico, perfis, servicos, type PerfilId } from "@/content/servicos";

/** "Qual é o seu perfil?" — destaca as modalidades indicadas para cada público. */
export function SeletorPerfil() {
  const [perfil, setPerfil] = useState<PerfilId>("aposentado");
  const indicados = servicos.filter((s) => s.perfis.includes(perfil));
  const atual = perfis.find((p) => p.id === perfil)!;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
      <div role="tablist" aria-label="Escolha o seu perfil" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
        {perfis.map((p) => {
          const sel = p.id === perfil;
          return (
            <button
              key={p.id}
              role="tab"
              type="button"
              aria-selected={sel}
              aria-controls="perfil-painel"
              onClick={() => setPerfil(p.id)}
              className={`group flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${
                sel ? "border-brand bg-brand text-white shadow-[0_18px_40px_-18px_rgb(36_78_164/0.8)]" : "border-tinta/8 bg-white hover:border-brand/40"
              }`}
            >
              <span className={`grid size-11 shrink-0 place-items-center rounded-xl transition-colors ${sel ? "bg-white/15 text-white" : "bg-brand/8 text-brand"}`}>
                <Icon name={p.icone} />
              </span>
              <span>
                <span className="block font-semibold">{p.titulo}</span>
                <span className={`block text-sm ${sel ? "text-white/75" : "text-ardosia"}`}>{p.descricao}</span>
              </span>
              <Icon name="arrow" className={`ml-auto size-5 shrink-0 transition-all ${sel ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`} />
            </button>
          );
        })}
      </div>

      <div id="perfil-painel" role="tabpanel" className="superficie-noite relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
        <div className="grade-tech pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative">
          <p className="text-sm font-medium text-laranja-300">Indicado para {atual.titulo.toLowerCase()}</p>
          <h3 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
            {indicados.length} {indicados.length === 1 ? "opção" : "opções"} para o seu perfil
          </h3>
          <ul key={perfil} className="mt-6 space-y-3">
            {indicados.map((s, i) => (
              <li key={s.slug} className="animate-[palavra-in_0.6s_var(--ease-suave)_both]" style={{ animationDelay: `${i * 70}ms` }}>
                <Link href={hrefServico(s)} className="card-luz flex items-start gap-4 p-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/8 text-laranja-300">
                    <Icon name={s.icone} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-white">{s.titulo}</span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-ceu">{s.resumo}</span>
                  </span>
                  <Icon name="arrowUpRight" className="ml-auto size-5 shrink-0 text-white/50" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
