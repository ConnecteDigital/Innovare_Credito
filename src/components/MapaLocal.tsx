import { Icon } from "./Icon";
import { site } from "@/content/site";

export function MapaLocal({ className = "" }: { className?: string }) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(site.mapa.busca)}&z=16&output=embed`;
  return (
    <div className={`overflow-hidden rounded-[2rem] border border-tinta/8 bg-white shadow-[0_20px_60px_-30px_rgb(11_27_51/0.35)] ${className}`}>
      <iframe
        title="Mapa: Innovare Soluções em Crédito em Jaguaquara – BA"
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-72 w-full border-0 md:h-80"
      />
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand/8 text-brand">
            <Icon name="pin" />
          </span>
          <address className="not-italic">
            <span className="block font-semibold text-tinta">{site.endereco.rua}, {site.endereco.bairro}</span>
            <span className="block text-ardosia">
              {site.endereco.cidade} – {site.endereco.uf}
            </span>
          </address>
        </div>
        <a href={site.mapa.perfilGoogle} target="_blank" rel="noopener" className="btn btn-azul !min-h-11 !px-5 !text-sm">
          Como chegar <Icon name="arrowUpRight" className="size-4" />
        </a>
      </div>
    </div>
  );
}
