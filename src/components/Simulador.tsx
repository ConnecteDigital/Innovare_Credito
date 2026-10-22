"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Icon } from "./Icon";
import { calcularParcela, simulador } from "@/content/simulador";
import { whatsappUrl } from "@/lib/whatsapp";

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** Número que "conta" até o novo valor (ease-out cúbico). */
function useNumeroAnimado(valor: number, duracao = 700) {
  const [atual, setAtual] = useState(valor);
  const deRef = useRef(valor);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAtual(valor);
      deRef.current = valor;
      return;
    }
    const de = deRef.current;
    let raf = 0;
    const t0 = performance.now();
    const passo = (t: number) => {
      const p = Math.min(1, (t - t0) / duracao);
      const v = de + (valor - de) * (1 - Math.pow(1 - p, 3));
      setAtual(v);
      deRef.current = v;
      if (p < 1) raf = requestAnimationFrame(passo);
    };
    raf = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(raf);
  }, [valor, duracao]);
  return atual;
}

const etapas = ["Perfil", "Valor", "Prazo", "Resultado"];

export function Simulador({ modalidadeInicial }: { modalidadeInicial?: string }) {
  const mods = simulador.modalidades;
  const [modId, setModId] = useState(mods.find((m) => m.id === modalidadeInicial)?.id ?? mods[0].id);
  const mod = mods.find((m) => m.id === modId) ?? mods[0];
  const [valor, setValor] = useState(mod.valorPadrao);
  const [prazo, setPrazo] = useState(mod.prazoPadrao);
  const [etapaAtiva, setEtapaAtiva] = useState(3);
  const [pulso, setPulso] = useState(0);

  const trocarModalidade = (id: string) => {
    const m = mods.find((x) => x.id === id)!;
    setModId(id);
    setValor(m.valorPadrao);
    setPrazo(m.prazoPadrao);
    disparar(0);
  };
  // reacende a esteira a partir da etapa alterada
  const disparar = (etapa: number) => {
    setEtapaAtiva(etapa);
    setPulso((p) => p + 1);
  };

  const parcela = useMemo(() => calcularParcela(valor, mod.taxaMes, prazo), [valor, mod.taxaMes, prazo]);
  const parcelaAnimada = useNumeroAnimado(parcela);
  const total = parcela * prazo;
  const passoValor = mod.valorMax > 20000 ? 500 : 100;
  const pct = ((valor - mod.valorMin) / (mod.valorMax - mod.valorMin)) * 100;

  const mensagem = `Olá! Fiz uma simulação no site da Innovare: ${mod.titulo}, ${brl.format(valor)} em ${prazo}x (parcela estimada de ${brl.format(parcela)}). Quero saber as condições reais para o meu caso.`;

  return (
    <div className="card-luz overflow-visible p-5 sm:p-7 md:p-9">
      {/* Esteira do simulador: a luz percorre as etapas a cada alteração */}
      <ol className="relative mb-8 grid grid-cols-4 gap-2" aria-hidden="true">
        <span className="absolute top-4 right-[12.5%] left-[12.5%] h-px bg-white/15" />
        <span key={pulso} className="sim-cometa absolute top-4 h-[3px] -translate-y-px" style={{ "--de": `${etapaAtiva * 25 + 12.5}%` } as CSSProperties} />
        {etapas.map((e, i) => (
          <li key={e} className="relative flex flex-col items-center gap-2 text-center">
            <span
              key={`${pulso}-${i}`}
              className={`sim-no grid size-8 place-items-center rounded-full border text-xs font-semibold ${
                i >= etapaAtiva ? "sim-no-anima" : "border-laranja bg-laranja text-white"
              }`}
              style={{ "--d": `${Math.max(0, i - etapaAtiva) * 0.22}s` } as CSSProperties}
            >
              {i + 1}
            </span>
            <span className="text-xs font-medium tracking-wide text-ceu sm:text-sm">{e}</span>
          </li>
        ))}
      </ol>

      <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
        <div className="space-y-8">
          <fieldset>
            <legend className="mb-3 text-sm font-semibold tracking-wide text-white">1. Qual é o seu perfil?</legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {mods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  aria-pressed={m.id === modId}
                  onClick={() => trocarModalidade(m.id)}
                  className={`rounded-2xl border px-3 py-3 text-left transition-all ${
                    m.id === modId
                      ? "border-laranja bg-laranja/15 shadow-[0_0_0_1px_rgb(242_138_43/0.4)]"
                      : "border-white/12 bg-white/[0.03] hover:border-white/30"
                  }`}
                >
                  <span className="block text-[0.92rem] font-semibold text-white">{m.titulo}</span>
                  <span className="mt-0.5 block text-xs text-ceu">{m.perfil}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <div className="mb-3 flex items-end justify-between gap-4">
              <label htmlFor="sim-valor" className="text-sm font-semibold tracking-wide text-white">
                2. Quanto você precisa?
              </label>
              <span className="font-display text-2xl font-semibold text-white">{brl.format(valor)}</span>
            </div>
            <input
              id="sim-valor"
              type="range"
              min={mod.valorMin}
              max={mod.valorMax}
              step={passoValor}
              value={valor}
              onChange={(e) => setValor(Number(e.target.value))}
              onPointerUp={() => disparar(1)}
              onKeyUp={() => disparar(1)}
              className="range-innovare"
              style={{ "--p": `${pct}%` } as CSSProperties}
            />
            <div className="mt-2 flex justify-between text-xs text-ceu">
              <span>{brl.format(mod.valorMin)}</span>
              <span>{brl.format(mod.valorMax)}</span>
            </div>
          </div>

          <fieldset>
            <legend className="mb-3 text-sm font-semibold tracking-wide text-white">3. Em quantas parcelas?</legend>
            <div className="flex flex-wrap gap-2">
              {mod.prazos.map((p) => (
                <button
                  key={p}
                  type="button"
                  aria-pressed={p === prazo}
                  onClick={() => {
                    setPrazo(p);
                    disparar(2);
                  }}
                  className={`min-w-16 rounded-full border px-4 py-2.5 font-semibold transition-all ${
                    p === prazo ? "border-laranja bg-laranja text-white" : "border-white/15 text-white/85 hover:border-white/40"
                  }`}
                >
                  {p}x
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand/35 via-marinho-700/40 to-noite/60 p-6 sm:p-7" aria-live="polite">
          <div className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-laranja/20 blur-3xl" />
          <div className="relative">
            <p className="text-sm font-medium text-ceu">4. Parcela estimada</p>
            <p className="mt-2 font-display text-5xl font-bold tracking-tight text-white sm:text-6xl">
              {brl.format(parcelaAnimada)}
            </p>
            <p className="mt-1 text-ceu">
              em <strong className="text-white">{prazo}x</strong> · {mod.titulo}
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-white/5 p-3">
                <dt className="text-ceu">Valor solicitado</dt>
                <dd className="mt-0.5 font-semibold text-white">{brl.format(valor)}</dd>
              </div>
              <div className="rounded-2xl bg-white/5 p-3">
                <dt className="text-ceu">Total estimado</dt>
                <dd className="mt-0.5 font-semibold text-white">{brl.format(total)}</dd>
              </div>
              <div className="col-span-2 rounded-2xl bg-white/5 p-3">
                <dt className="text-ceu">Taxa ilustrativa</dt>
                <dd className="mt-0.5 font-semibold text-white">{mod.taxaMes.toLocaleString("pt-BR")}% ao mês</dd>
              </div>
            </dl>
          </div>
          <div className="relative mt-6">
            <a href={whatsappUrl(mensagem)} target="_blank" rel="noopener" className="btn btn-laranja w-full">
              <Icon name="whatsapp" className="size-5" /> Quero essa proposta
            </a>
            <p className="mt-3 text-xs leading-relaxed text-ceu/90">
              {simulador.provisorio && <strong className="text-laranja-300">Simulação ilustrativa. </strong>}
              Valores aproximados, sem IOF e encargos. Taxas, prazos e valores reais dependem da análise de crédito e da
              instituição financeira. O Custo Efetivo Total (CET) é informado antes da contratação.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
