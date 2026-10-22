import { NOME_PATH, NOME_VIEWBOX, SIMBOLO_PATH, SIMBOLO_VIEWBOX } from "./logo-paths";

export function LogoSimbolo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox={SIMBOLO_VIEWBOX} className={className} aria-hidden="true">
      <path d={SIMBOLO_PATH} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

export function LogoNome({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg viewBox={NOME_VIEWBOX} className={className} aria-hidden="true">
      <path d={NOME_PATH} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

/** Logo horizontal: símbolo + nome + assinatura. `tom` escuro para fundos claros. */
export function Logo({ tom = "claro", assinatura = true }: { tom?: "claro" | "escuro"; assinatura?: boolean }) {
  const cor = tom === "claro" ? "text-white" : "text-brand";
  return (
    <span className={`inline-flex items-center gap-2.5 ${cor}`}>
      <LogoSimbolo className="h-9 w-auto shrink-0" />
      <span className="flex flex-col leading-none">
        <LogoNome className="h-[15px] w-auto" />
        {assinatura && (
          <span className={`mt-1 text-[0.58rem] font-medium tracking-[0.18em] ${tom === "claro" ? "text-ceu" : "text-brand"}`}>
            SOLUÇÕES EM CRÉDITO
          </span>
        )}
      </span>
      <span className="sr-only">Innovare Soluções em Crédito</span>
    </span>
  );
}
