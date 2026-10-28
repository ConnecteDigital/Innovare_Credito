import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { CardServico, FaixaCta, JsonLd, TituloSecao } from "@/components/ui";
import { hrefServico, outrosServicos, servicosConsignado } from "@/content/servicos";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Serviços de Crédito: Consignado, FGTS, CLT, Pessoal e Mais",
  description:
    "Conheça todos os serviços da Innovare: consignado INSS e servidores, portabilidade, FGTS, crédito CLT, crédito pessoal, Microcrédito Itaú, conta de energia, garantia de veículo e consórcios.",
  path: "/servicos",
});

const migalhas = [
  { nome: "Início", path: "/" },
  { nome: "Serviços", path: "/servicos" },
];

export default function ServicosPage() {
  return (
    <>
      <PageHero
        migalhas={migalhas}
        eyebrow="Serviços"
        titulo="Soluções em crédito para cada momento da sua vida"
        texto="Do consignado ao crédito pessoal, de consórcios ao microcrédito para o seu negócio: conectamos você à opção mais adequada ao seu perfil."
      />

      <section className="py-16 md:py-24">
        <div className="container-site">
          <TituloSecao eyebrow="Destaque" titulo="Consignado" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {servicosConsignado.map((s) => (
              <Link key={s.slug} href={hrefServico(s)} className="card-claro group flex items-center gap-4 p-5" data-reveal>
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand to-azul text-white">
                  <Icon name={s.icone} />
                </span>
                <span className="font-semibold text-tinta">{s.titulo}</span>
                <Icon name="arrow" className="ml-auto size-5 shrink-0 text-brand transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>

          <div className="mt-16">
            <TituloSecao eyebrow="Mais opções" titulo="Outros serviços" />
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {outrosServicos.map((s, i) => (
              <CardServico key={s.slug} s={s} i={i} />
            ))}
          </div>
        </div>
      </section>

      <FaixaCta />
      <JsonLd data={breadcrumbJsonLd(migalhas)} />
    </>
  );
}
