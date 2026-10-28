import { Icon } from "./Icon";
import { parceiros } from "@/content/parceiros";

/** Faixa de instituições parceiras + selos de correspondente bancário. */
export function Parceiros() {
  return (
    <div data-reveal>
      <p className="text-center text-sm font-medium tracking-[0.14em] text-ardosia uppercase">Instituições financeiras parceiras</p>
      <ul className="mt-6 flex flex-wrap justify-center gap-3">
        {parceiros.itens.map((p) => (
          <li
            key={p.nome}
            className="grid h-16 min-w-[8.5rem] place-items-center rounded-2xl border border-tinta/8 bg-white px-5 text-center font-display text-base font-semibold text-tinta shadow-[0_8px_24px_-18px_rgb(11_27_51/0.5)]"
          >
            {p.logo ? <img src={p.logo} alt={p.nome} className="max-h-9 w-auto" /> : p.nome}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
        <span className="inline-flex items-center gap-2 rounded-full bg-marinho px-4 py-2 font-medium text-white">
          <Icon name="building" className="size-4 text-laranja-300" /> Correspondente Bancário
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-marinho px-4 py-2 font-medium text-white">
          <Icon name="shield" className="size-4 text-laranja-300" /> Seguimos as diretrizes do BACEN
        </span>
      </div>
    </div>
  );
}
