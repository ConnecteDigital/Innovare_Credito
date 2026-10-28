import Link from "next/link";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { avisoLegal, site } from "@/content/site";
import { cidades } from "@/content/cidades";
import { hrefServico, servicos } from "@/content/servicos";
import { whatsappUrl } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer data-mascote="rodape" className="superficie-noite relative overflow-hidden pt-20 pb-10">
      <div className="grade-tech pointer-events-none absolute inset-0 opacity-50" />
      <div className="container-site relative">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm leading-relaxed text-ceu">
              Conectamos você às melhores opções de crédito, com atendimento humanizado e condições explicadas antes da contratação.
            </p>
            <ul className="mt-6 space-y-3 text-[0.95rem]">
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener" className="flex items-center gap-3 text-white hover:text-laranja-300">
                  <Icon name="whatsapp" className="size-5 text-laranja-300" /> {site.whatsapp.exibicao}
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <Icon name="pin" className="mt-0.5 size-5 shrink-0 text-laranja-300" />
                <span>
                  {site.endereco.rua}, {site.endereco.bairro}
                  <br />
                  {site.endereco.cidade} – {site.endereco.uf}
                </span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <Icon name="spark" className="mt-0.5 size-5 shrink-0 text-laranja-300" />
                <span>
                  {site.atendimento.presencial}
                  <br />
                  <span className="text-ceu">{site.atendimento.nacional}</span>
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.14em] text-white uppercase">Serviços</h2>
            <ul className="mt-5 space-y-2.5 text-[0.95rem]">
              {servicos.map((s) => (
                <li key={s.slug}>
                  <Link href={hrefServico(s)} className="text-ceu hover:text-white">
                    {s.tituloCurto}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.14em] text-white uppercase">Cidades atendidas</h2>
            <ul className="mt-5 space-y-2.5 text-[0.95rem]">
              {cidades.map((c) => (
                <li key={c.slug}>
                  <Link href={`/cidades/${c.slug}`} className="text-ceu hover:text-white">
                    {c.nome} – {c.uf}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/cidades" className="text-laranja-300 hover:text-white">
                  Todo o Brasil →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.14em] text-white uppercase">Institucional</h2>
            <ul className="mt-5 space-y-2.5 text-[0.95rem]">
              {[
                ["/sobre", "Sobre a Innovare"],
                ["/faq", "Perguntas frequentes"],
                ["/contato", "Contato"],
                ["/politica-de-privacidade", "Política de privacidade"],
                ["/termos-de-uso", "Termos de uso"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-ceu hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="max-w-5xl text-xs leading-relaxed text-ceu/80">{avisoLegal}</p>
          <p className="mt-4 text-xs leading-relaxed text-ceu/80">
            <strong className="text-white/80">Atenção:</strong> a Innovare não solicita pagamento ou depósito antecipado para
            liberar crédito. Desconfie de qualquer cobrança desse tipo.
          </p>
          <div className="mt-6 flex flex-col gap-2 text-xs text-ceu/70 sm:flex-row sm:justify-between">
            <span>
              © {new Date().getFullYear()} {site.nome} · CNPJ {site.cnpj}
            </span>
            <span>{site.endereco.rua}, {site.endereco.bairro}, {site.endereco.cidade} – {site.endereco.uf}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
