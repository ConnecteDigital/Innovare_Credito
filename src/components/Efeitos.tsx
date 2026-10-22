"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Efeitos globais leves:
 * - revela elementos [data-reveal] ao entrar na tela (com rede de segurança);
 * - holofote dos cards (.card-luz / .card-claro) seguindo o ponteiro via --mx/--my.
 */
export function Efeitos() {
  const pathname = usePathname();

  useEffect(() => {
    const itens = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      itens.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    itens.forEach((el) => io.observe(el));
    // rede de segurança: nada fica invisível se o observer não disparar (âncora, restauração de scroll)
    const varrer = () => {
      for (const el of itens) {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("is-in");
      }
    };
    const t = window.setTimeout(varrer, 1200);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [pathname]);

  useEffect(() => {
    const aoMover = (e: PointerEvent) => {
      const alvo = (e.target as HTMLElement | null)?.closest<HTMLElement>(".card-luz, .card-claro");
      if (!alvo) return;
      const r = alvo.getBoundingClientRect();
      alvo.style.setProperty("--mx", `${e.clientX - r.left}px`);
      alvo.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", aoMover, { passive: true });
    return () => document.removeEventListener("pointermove", aoMover);
  }, []);

  return null;
}
