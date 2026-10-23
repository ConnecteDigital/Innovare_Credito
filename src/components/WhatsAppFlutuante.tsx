"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { whatsappUrl } from "@/lib/whatsapp";

/** Botão flutuante: entra depois que o topo da página sai da tela, para não cobrir o CTA do hero. */
export function WhatsAppFlutuante() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > window.innerHeight * 0.6);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener"
      aria-label="Falar com a Innovare no WhatsApp"
      className={`pulso fixed right-4 bottom-4 z-40 flex size-14 items-center justify-center gap-2 rounded-full bg-[#1fae5b] font-semibold text-white shadow-xl transition-all duration-500 sm:size-auto sm:py-3 sm:pr-5 sm:pl-3.5 md:right-6 md:bottom-6 ${
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <Icon name="whatsapp" className="size-8 shrink-0 sm:size-7" />
      <span className="hidden sm:inline">Fale com a gente</span>
    </a>
  );
}
