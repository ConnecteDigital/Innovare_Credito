import { FormContato } from "@/components/FormContato";
import { Icon } from "@/components/Icon";
import { MapaLocal } from "@/components/MapaLocal";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/ui";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Contato – WhatsApp e Endereço em Jaguaquara – BA",
  description: `Fale com a Innovare pelo WhatsApp ${site.whatsapp.exibicao} ou visite a nossa loja na ${site.endereco.rua}, ${site.endereco.bairro}, Jaguaquara – BA.`,
  path: "/contato",
});

const migalhas = [
  { nome: "Início", path: "/" },
  { nome: "Contato", path: "/contato" },
];

export default function ContatoPage() {
  return (
    <>
      <PageHero migalhas={migalhas} eyebrow="Contato" titulo="Fale com a Innovare" texto="Estamos prontos para te atender pelo WhatsApp ou presencialmente na nossa loja em Jaguaquara.">
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:max-w-3xl">
          <a href={whatsappUrl()} target="_blank" rel="noopener" className="card-luz flex items-center gap-4 p-5">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#1fae5b] text-white">
              <Icon name="whatsapp" />
            </span>
            <span>
              <span className="block text-sm text-ceu">WhatsApp</span>
              <span className="block text-lg font-semibold text-white">{site.whatsapp.exibicao}</span>
            </span>
          </a>
          <a href={site.mapa.perfilGoogle} target="_blank" rel="noopener" className="card-luz flex items-center gap-4 p-5">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-laranja text-white">
              <Icon name="pin" />
            </span>
            <span>
              <span className="block text-sm text-ceu">Loja</span>
              <span className="block font-semibold text-white">
                {site.endereco.rua}, {site.endereco.bairro}
              </span>
            </span>
          </a>
        </div>
      </PageHero>

      <section className="py-16 md:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div data-reveal>
            <h2 className="text-3xl font-semibold text-tinta">Envie sua mensagem</h2>
            <p className="mt-2 text-ardosia">Preencha e a mensagem abre pronta no WhatsApp.</p>
            <div className="mt-6">
              <FormContato />
            </div>
          </div>
          <div data-reveal>
            <h2 className="text-3xl font-semibold text-tinta">Como chegar</h2>
            <p className="mt-2 text-ardosia">
              {site.endereco.rua}, {site.endereco.bairro} – {site.endereco.cidade}/{site.endereco.uf}
            </p>
            <div className="mt-6">
              <MapaLocal />
            </div>
          </div>
        </div>
      </section>

      <JsonLd data={breadcrumbJsonLd(migalhas)} />
    </>
  );
}
