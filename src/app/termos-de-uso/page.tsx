import { PageHero } from "@/components/PageHero";
import { avisoLegal, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Termos de Uso",
  description: "Condições de uso do site da Innovare Soluções em Crédito.",
  path: "/termos-de-uso",
});

// TODO: revisar com o jurídico do cliente antes da publicação definitiva.
export default function TermosPage() {
  return (
    <>
      <PageHero
        migalhas={[
          { nome: "Início", path: "/" },
          { nome: "Termos de uso", path: "/termos-de-uso" },
        ]}
        titulo="Termos de Uso"
      />
      <section className="py-16 md:py-24">
        <div className="container-site">
          <article className="prosa mx-auto max-w-3xl text-lg [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-tinta">
            <p>Ao utilizar este site, você concorda com as condições abaixo.</p>
            <h2>Sobre a Innovare</h2>
            <p>{avisoLegal}</p>
            <h2>Simulações</h2>
            <p>
              As simulações apresentadas no site são estimativas ilustrativas e não constituem oferta, proposta ou garantia de
              aprovação. Valores, taxas, prazos e o Custo Efetivo Total (CET) dependem da análise de crédito e das condições de
              cada instituição financeira, e são informados antes da contratação.
            </p>
            <h2>Segurança</h2>
            <p>
              A {site.nomeCurto} não solicita pagamentos ou depósitos antecipados para liberar crédito. Nosso canal oficial de
              WhatsApp é o {site.whatsapp.exibicao}.
            </p>
            <h2>Conteúdo</h2>
            <p>
              Os textos, marcas e imagens deste site pertencem à {site.nome} ou são usados com autorização. Marcas de terceiros
              mencionadas pertencem aos seus respectivos titulares.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
