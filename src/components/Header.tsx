"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { hrefServico, outrosServicos, servicosConsignado } from "@/content/servicos";
import { whatsappUrl } from "@/lib/whatsapp";

const links = [
  { href: "/consignado", label: "Consignado" },
  { href: "/servicos", label: "Serviços", mega: true },
  { href: "/simulador", label: "Simulador" },
  { href: "/cidades", label: "Cidades" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const pathname = usePathname();
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);
  const [mega, setMega] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // fecha menus ao navegar
  useEffect(() => {
    setAberto(false);
    setMega(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAberto(false);
        setMega(false);
      }
    };
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  const ativo = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-3 md:pt-4">
      <div className="container-site">
        <nav
          aria-label="Principal"
          className={`pointer-events-auto relative flex items-center justify-between gap-4 rounded-full border py-2 pr-2 pl-4 transition-all duration-500 md:pl-5 ${
            rolou || aberto
              ? "border-white/12 bg-noite/70 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.6)] backdrop-blur-2xl backdrop-saturate-150"
              : "border-white/10 bg-white/[0.03] backdrop-blur-md"
          }`}
        >
          <Link href="/" aria-label="Innovare — página inicial" className="shrink-0">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) =>
              l.mega ? (
                <li key={l.href} className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
                  <button
                    type="button"
                    aria-expanded={mega}
                    aria-controls="mega-servicos"
                    onClick={() => setMega((v) => !v)}
                    className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors ${
                      ativo(l.href) ? "text-laranja-300" : "text-white/85 hover:text-white"
                    }`}
                  >
                    {l.label}
                    <Icon name="chevron" className={`size-4 transition-transform ${mega ? "rotate-180" : ""}`} />
                  </button>
                  <div
                    id="mega-servicos"
                    className={`absolute top-full left-1/2 w-[min(860px,90vw)] -translate-x-1/2 pt-4 transition-all duration-300 ${
                      mega ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
                    }`}
                  >
                    <div className="grid grid-cols-[1fr_1.6fr] gap-2 rounded-3xl border border-white/12 bg-[#061631] p-3 shadow-2xl">
                      <div className="rounded-2xl bg-gradient-to-br from-brand/50 to-marinho-700/40 p-5">
                        <p className="text-xs font-semibold tracking-[0.16em] text-laranja-300 uppercase">Destaque</p>
                        <p className="mt-2 font-display text-lg font-semibold text-white">Consignado</p>
                        <ul className="mt-3 space-y-1">
                          {servicosConsignado.map((s) => (
                            <li key={s.slug}>
                              <Link href={hrefServico(s)} className="flex items-center gap-2 rounded-xl px-2 py-2 text-sm text-white/85 hover:bg-white/10 hover:text-white">
                                <Icon name={s.icone} className="size-5 text-laranja-300" />
                                {s.tituloCurto}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <ul className="grid grid-cols-2 gap-1 p-2">
                        {outrosServicos.map((s) => (
                          <li key={s.slug}>
                            <Link href={hrefServico(s)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/80 hover:bg-white/8 hover:text-white">
                              <span className="grid size-9 place-items-center rounded-lg bg-white/6 text-brilho">
                                <Icon name={s.icone} className="size-5" />
                              </span>
                              {s.tituloCurto}
                            </Link>
                          </li>
                        ))}
                        <li className="col-span-2 mt-1">
                          <Link href="/servicos" className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-2.5 text-sm font-medium text-white hover:border-laranja/60">
                            Ver todos os serviços <Icon name="arrow" className="size-4" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={ativo(l.href) ? "page" : undefined}
                    className={`rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors ${
                      ativo(l.href) ? "text-laranja-300" : "text-white/85 hover:text-white"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <div className="flex items-center gap-2">
            <a href={whatsappUrl()} target="_blank" rel="noopener" className="btn btn-laranja hidden !min-h-11 !px-5 !text-[0.95rem] sm:inline-flex">
              <Icon name="whatsapp" className="size-5" />
              Falar no WhatsApp
            </a>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white lg:hidden"
              aria-expanded={aberto}
              aria-controls="menu-mobile"
              aria-label={aberto ? "Fechar menu" : "Abrir menu"}
              onClick={() => setAberto((v) => !v)}
            >
              <Icon name={aberto ? "close" : "menu"} className="size-6" />
            </button>
          </div>
        </nav>
      </div>

      {/* Menu mobile em tela cheia, com links entrando em cascata */}
      <div
        id="menu-mobile"
        aria-hidden={!aberto}
        className={`pointer-events-auto fixed inset-0 -z-10 overflow-y-auto bg-noite/95 px-5 pt-28 pb-10 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          aberto ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="space-y-1">
          {[{ href: "/", label: "Início" }, ...links].map((l, i) => (
            <li
              key={l.href}
              style={{ transitionDelay: aberto ? `${80 + i * 55}ms` : "0ms" }}
              className={`border-b border-white/8 transition-all duration-500 ${aberto ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            >
              <Link href={l.href} tabIndex={aberto ? 0 : -1} className="flex items-center justify-between py-4 font-display text-2xl font-medium text-white">
                {l.label}
                <Icon name="arrow" className="size-5 text-laranja" />
              </Link>
            </li>
          ))}
        </ul>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener"
          tabIndex={aberto ? 0 : -1}
          className="btn btn-whatsapp mt-8 w-full !min-h-14 !text-lg"
        >
          <Icon name="whatsapp" className="size-6" /> Falar no WhatsApp
        </a>
      </div>
    </header>
  );
}
