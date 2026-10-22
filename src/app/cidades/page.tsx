import Link from "next/link";
import { Icon } from "@/components/Icon";
import { MapaLocal } from "@/components/MapaLocal";
import { PageHero } from "@/components/PageHero";
import { FaixaCta, JsonLd, TituloSecao } from "@/components/ui";
import { cidades } from "@/content/cidades";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Cidades Atendidas – Jaguaquara, Região e Todo o Brasil",
  description: `Atendimento presencial em Jaguaquara e no ${site.regiao} (Itiruçu, Itaquara, Jequié e região) e atendimento por WhatsApp em todo o Brasil.`,
  path: "/cidades",
});

const migalhas = [
  { nome: "Início", path: "/" },
  { nome: "Cidades", path: "/cidades" },
];

export default function CidadesPage() {
  return (
    <>
      <PageHero
        migalhas={migalhas}
        eyebrow="Onde atendemos"
        titulo={
          <>
            Presencial no {site.regiao}. <span className="texto-gradiente">Online em todo o Brasil.</span>
          </>
        }
        texto="Nossa loja fica no Centro de Jaguaquara, de onde atendemos de perto as cidades da região. Para quem está longe, todo o atendimento pode ser feito pelo WhatsApp."
      />

      <section className="py-16 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <TituloSecao eyebrow="Cidades" titulo="Atendimento de perto na região" />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {cidades.map((c) => (
                <li key={c.slug} data-reveal>
                  <Link href={`/cidades/${c.slug}`} className="card-claro group flex items-center gap-4 p-5">
                    <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${c.sede ? "bg-laranja text-white" : "bg-brand/8 text-brand"}`}>
                      <Icon name="pin" />
                    </span>
                    <span>
                      <span className="block font-semibold text-tinta">
                        {c.nome} – {c.uf}
                      </span>
                      <span className="block text-sm text-ardosia">{c.sede ? "Loja física" : "WhatsApp e loja em Jaguaquara"}</span>
                    </span>
                    <Icon name="arrow" className="ml-auto size-5 text-brand transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-[2rem] bg-marinho p-7 text-white" data-reveal>
              <Icon name="whatsapp" className="size-8 text-laranja-300" />
              <h2 className="mt-4 text-2xl font-semibold">Mora em outra cidade?</h2>
              <p className="mt-2 leading-relaxed text-ceu">
                Atendemos clientes de todo o Brasil pelo WhatsApp, com a mesma atenção e transparência do atendimento presencial.
              </p>
              <a href={whatsappUrl()} target="_blank" rel="noopener" className="btn btn-laranja mt-6">
                Falar no WhatsApp
              </a>
            </div>
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start" data-reveal>
            <MapaLocal />
          </div>
        </div>
      </section>

      <FaixaCta />
      <JsonLd data={breadcrumbJsonLd(migalhas)} />
    </>
  );
}
