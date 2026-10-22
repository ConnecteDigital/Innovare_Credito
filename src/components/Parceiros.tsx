import { parceiros } from "@/content/parceiros";

/** Faixa de instituições parceiras. PROVISÓRIA até o cliente enviar a lista real. */
export function Parceiros() {
  return (
    <div data-reveal>
      <p className="text-center text-sm font-medium tracking-[0.14em] text-ardosia uppercase">Instituições financeiras parceiras</p>
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {parceiros.itens.map((p) => (
          <li
            key={p.nome}
            className="grid h-20 place-items-center rounded-2xl border border-dashed border-tinta/15 bg-white px-4 text-center text-sm font-medium text-ardosia/70"
          >
            {p.logo ? <img src={p.logo} alt={p.nome} className="max-h-10 w-auto" /> : p.nome}
          </li>
        ))}
      </ul>
      {parceiros.provisorio && (
        <p className="mt-3 text-center text-xs text-ardosia/70">Lista de parceiros em atualização.</p>
      )}
    </div>
  );
}
