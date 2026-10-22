"use client";

import { Fragment, useEffect, useRef, type CSSProperties } from "react";
import { Icon, type IconName } from "./Icon";

export type Etapa = { titulo: string; texto: string; icone: IconName };

/**
 * Fluxo de etapas ligadas por fios tracejados. Quando entra na tela, um cometa de luz
 * percorre os fios e cada etapa acende em sequência (atraso = ordem × intervalo).
 */
export function Esteira({ etapas, intervalo = 0.75 }: { etapas: Etapa[]; intervalo?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      el.classList.add("rodando");
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("rodando");
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // sequência: etapa 0, fio 0, etapa 1, fio 1...
  const atraso = (seq: number) => ({ "--seq-delay": `${seq * intervalo}s` }) as CSSProperties;

  return (
    <div ref={ref} className="esteira">
      {/* Desktop: linha horizontal */}
      <ol className="hidden items-stretch lg:flex">
        {etapas.map((e, i) => (
          <Fragment key={e.titulo}>
            <li className="esteira-etapa relative flex-1 rounded-2xl border border-dashed p-5" style={atraso(i * 2)}>
              <div className="flex items-center gap-3">
                <span className="esteira-num grid size-8 place-items-center rounded-full font-display text-sm font-semibold" style={atraso(i * 2)}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon name={e.icone} className="size-6 text-laranja-300" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{e.titulo}</h3>
              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ceu">{e.texto}</p>
            </li>
            {i < etapas.length - 1 && <li aria-hidden="true" className="esteira-fio w-10 shrink-0 self-center py-px xl:w-14" style={atraso(i * 2 + 1)} />}
          </Fragment>
        ))}
      </ol>

      {/* Mobile/tablet: linha vertical */}
      <ol className="lg:hidden">
        {etapas.map((e, i) => (
          <Fragment key={e.titulo}>
            <li className="esteira-etapa flex gap-4 rounded-2xl border border-dashed p-4" style={atraso(i * 2)}>
              <span className="esteira-num grid size-9 shrink-0 place-items-center rounded-full font-display text-sm font-semibold" style={atraso(i * 2)}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-semibold text-white">{e.titulo}</h3>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-ceu">{e.texto}</p>
              </div>
            </li>
            {i < etapas.length - 1 && <li aria-hidden="true" className="esteira-fio esteira-vertical ml-[34px] h-8 w-px" style={atraso(i * 2 + 1)} />}
          </Fragment>
        ))}
      </ol>
    </div>
  );
}
