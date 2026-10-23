"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

/* ============================================================
   Mascote "Mini Eri": personagem em SVG que acompanha a rolagem.

   - Anda (pernas e corpo) enquanto a página rola.
   - Cada seção marcada com data-mascote="chave" define a pose e a fala.
   - Poses: acena, aponta (para o conteúdo), joinha, dinheiro (notas voando),
     celular (WhatsApp) e pensando. Clique nele para soltar dinheiro.
   - Pode ser fechado (lembra durante a sessão); estático com prefers-reduced-motion.
   ============================================================ */

type Pose = "acena" | "aponta" | "joinha" | "dinheiro" | "celular" | "pensando";

const roteiro: Record<string, { pose: Pose; fala: string }> = {
  inicio: { pose: "acena", fala: "Oi! Eu sou o Eri. Vem comigo conhecer a Innovare!" },
  consignado: { pose: "aponta", fala: "Aposentado ou servidor? O consignado tem as melhores condições!" },
  perfil: { pose: "aponta", fala: "Escolha o seu perfil e veja as opções certas pra você." },
  servicos: { pose: "joinha", fala: "Tem opção pra CLT, autônomo, Bolsa Família e muito mais." },
  "como-funciona": { pose: "aponta", fala: "É simples: conversa, análise, proposta explicada e pronto!" },
  simulador: { pose: "dinheiro", fala: "Simula aí e veja quanto fica a parcela!" },
  sobre: { pose: "joinha", fala: "Essa é a nossa equipe, pronta pra te atender." },
  cidades: { pose: "aponta", fala: "Estamos no Centro de Jaguaquara. Passa lá!" },
  faq: { pose: "pensando", fala: "Ficou com alguma dúvida? As respostas estão aqui." },
  cta: { pose: "celular", fala: "Me chama no WhatsApp que a gente resolve!" },
  rodape: { pose: "acena", fala: "Obrigado pela visita! Até logo." },
  pagina: { pose: "aponta", fala: "Qualquer dúvida, é só chamar no WhatsApp!" },
};

type Nota = { id: number; dx: number; dy: number; rot: number; atraso: number };

let idNota = 0;

export function Mascote() {
  const pathname = usePathname();
  const [fechado, setFechado] = useState(false);
  const [visivel, setVisivel] = useState(false);
  const [pose, setPose] = useState<Pose>("acena");
  const [fala, setFala] = useState("");
  const [balao, setBalao] = useState(false);
  const [andando, setAndando] = useState(false);
  const [pulo, setPulo] = useState(0);
  const [notas, setNotas] = useState<Nota[]>([]);
  const chaveAtual = useRef<string | null>(null);
  const timerBalao = useRef<number | undefined>(undefined);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("mascote-fechado") === "1") setFechado(true);
    } catch {
      /* armazenamento indisponível: mantém aberto */
    }
    const t = window.setTimeout(() => setVisivel(true), 1200);
    return () => window.clearTimeout(t);
  }, []);

  const soltarDinheiro = useCallback((qtd = 9) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const novas = Array.from({ length: qtd }, (_, i) => ({
      id: ++idNota,
      dx: -40 - Math.random() * 130,
      dy: -60 - Math.random() * 120,
      rot: (Math.random() - 0.5) * 540,
      atraso: i * 55,
    }));
    setNotas((n) => [...n, ...novas]);
    window.setTimeout(() => setNotas((n) => n.filter((x) => !novas.includes(x))), 1900);
  }, []);

  const mostrarFala = useCallback((texto: string) => {
    setFala(texto);
    setBalao(true);
    window.clearTimeout(timerBalao.current);
    timerBalao.current = window.setTimeout(() => setBalao(false), window.innerWidth < 768 ? 2800 : 4200);
  }, []);

  // escolhe a seção que está no meio da tela
  useEffect(() => {
    if (fechado) return;
    chaveAtual.current = null;
    let raf = 0;
    let timerAndar: number | undefined;

    const avaliar = () => {
      raf = 0;
      const meio = window.innerHeight * 0.55;
      const secoes = document.querySelectorAll<HTMLElement>("[data-mascote]");
      let chave: string | null = null;
      for (const el of secoes) {
        const r = el.getBoundingClientRect();
        if (r.top <= meio && r.bottom >= meio) chave = el.dataset.mascote ?? null;
      }
      if (chave && chave !== chaveAtual.current && roteiro[chave]) {
        chaveAtual.current = chave;
        const passo = roteiro[chave];
        setPose(passo.pose);
        setPulo((p) => p + 1);
        mostrarFala(passo.fala);
        if (passo.pose === "dinheiro") soltarDinheiro();
      }
    };
    const aoRolar = () => {
      setAndando(true);
      window.clearTimeout(timerAndar);
      timerAndar = window.setTimeout(() => setAndando(false), 260);
      if (!raf) raf = requestAnimationFrame(avaliar);
    };

    const t = window.setTimeout(avaliar, 1400);
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(timerAndar);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", aoRolar);
    };
  }, [pathname, fechado, mostrarFala, soltarDinheiro]);

  if (fechado) return null;

  const fechar = () => {
    setFechado(true);
    try {
      sessionStorage.setItem("mascote-fechado", "1");
    } catch {
      /* sem armazenamento: fecha só nesta visualização */
    }
  };

  const clicar = () => {
    setPose("dinheiro");
    setPulo((p) => p + 1);
    soltarDinheiro(12);
    mostrarFala("Bora realizar os seus planos!");
  };

  return (
    <div
      className={`mascote fixed bottom-3 left-2 z-40 w-[54px] transition-all duration-700 md:right-4 md:bottom-24 md:left-auto md:w-[112px] ${
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-10 opacity-0"
      }`}
      data-pose={pose}
      data-andando={andando ? "1" : "0"}
    >
      {/* balão de fala */}
      <div
        aria-hidden="true"
        className={`mascote-balao absolute bottom-[calc(100%+6px)] left-0 w-[10rem] rounded-2xl border border-tinta/8 bg-white px-3 py-2 text-[0.78rem] leading-snug font-medium text-tinta shadow-[0_12px_30px_-10px_rgb(11_27_51/0.45)] transition-all duration-300 md:right-0 md:left-auto md:w-[13.5rem] md:text-sm ${
          balao ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-2 scale-95 opacity-0"
        }`}
      >
        {fala}
      </div>

      {/* notas de dinheiro */}
      <div className="pointer-events-none absolute top-[30%] left-1/2" aria-hidden="true">
        {notas.map((n) => (
          <span
            key={n.id}
            className="mascote-nota"
            style={{ "--dx": `${n.dx}px`, "--dy": `${n.dy}px`, "--rot": `${n.rot}deg`, animationDelay: `${n.atraso}ms` } as CSSProperties}
          >
            R$
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={fechar}
        aria-label="Esconder o mascote"
        className="mascote-fechar absolute -top-1 -right-1 z-10 grid size-6 place-items-center rounded-full bg-marinho text-xs text-white shadow md:top-0 md:-left-2 md:right-auto"
      >
        ×
      </button>

      <button type="button" onClick={clicar} aria-label="Mascote da Innovare: clique para uma surpresa" className="mascote-vira block w-full">
        <svg key={pulo} viewBox="0 0 120 200" className="mascote-corpo block w-full overflow-visible" aria-hidden="true">
          <ellipse className="mascote-sombra" cx="60" cy="193" rx="28" ry="5" fill="rgba(3,15,36,.28)" />

          {/* pernas */}
          <g className="perna perna-e">
            <path d="M46 128h12.5v46H46z" fill="#1c2536" />
            <path d="M41 172.5c0-1.6 1.3-2.5 3-2.5h14.5c1.4 0 2.5 1.1 2.5 2.5v4.5H43c-1.1 0-2-.9-2-2z" fill="#0f0f12" />
          </g>
          <g className="perna perna-d">
            <path d="M61.5 128H74v46H61.5z" fill="#232d40" />
            <path d="M58.5 172.5c0-1.6 1.3-2.5 3-2.5H76c1.4 0 2.5 1.1 2.5 2.5v4.5h-18c-1.1 0-2-.9-2-2z" fill="#0f0f12" />
          </g>

          <g className="tronco">
            {/* camisa */}
            <path d="M36 97c0-5 3-8.5 8-9.5l8.5-2 7.5 6 7.5-6 8.5 2c5 1 8 4.5 8 9.5l-2 37.5c-14.5 3-29.5 3-44 0z" fill="#a9cff6" />
            <path d="M72 88.5l4 .9c5 1 8 4.5 8 9.5l-2 35.6c-3 .6-6 1-9 1.3z" fill="#97bfec" opacity=".7" />
            <path d="M52.5 85.5L60 96l-4.2 4.8-7-11.3zM67.5 85.5L60 96l4.2 4.8 7-11.3z" fill="#cde4fb" />
            <path d="M60 97v33" stroke="#86b1e2" strokeWidth="1.2" />
            <circle cx="60" cy="105" r="1" fill="#eef6ff" />
            <circle cx="60" cy="114" r="1" fill="#eef6ff" />
            <circle cx="60" cy="123" r="1" fill="#eef6ff" />
            <rect x="65.5" y="103.5" width="12" height="5" rx="1" fill="#d8b25a" />
            <path d="M67.5 106h8" stroke="#7a5a1c" strokeWidth=".8" />
            <rect x="38" y="128" width="44" height="5.5" rx="1.5" fill="#15171c" />
            <rect x="56.5" y="128.6" width="7" height="4.3" rx="1" fill="#a3acb7" />

            {/* braço de trás (lado direito da tela) */}
            <g className="braco braco-tras">
              <path d="M86 91c3 1 5 4 5 8l1.5 26.5c.2 3-1.8 5-4.5 5h-5c-2.4 0-4-1.8-4-4.2L77 97.5c-.3-4.5 4-7.5 9-6.5z" fill="#9cc6f2" />
              <path d="M79.5 124h12.8l.3 5.2c.1 1.8-1.3 2.8-3 2.8h-7c-1.7 0-3-1.2-3-2.8z" fill="#b9d8f8" />
              <rect x="80.5" y="121" width="11" height="3.6" rx="1.2" fill="#7a4a22" />
              <circle cx="86" cy="122.8" r="2.1" fill="#d9dde3" stroke="#555" strokeWidth=".6" />
              <circle cx="86.5" cy="135.5" r="5.4" fill="#b2733f" />
              <rect className="polegar" x="84.9" y="138" width="3.4" height="7.5" rx="1.7" fill="#b2733f" />
              <g className="celular">
                <rect x="81" y="135" width="9.5" height="15" rx="2.2" fill="#111827" />
                <rect x="82.3" y="137" width="6.9" height="10" rx="1" fill="#25d366" />
              </g>
            </g>

            {/* pescoço e cabeça */}
            <rect x="53" y="76" width="14" height="13" rx="4" fill="#a2643a" />
            <g className="cabeca">
              <ellipse cx="35.8" cy="57" rx="4.2" ry="6" fill="#b2733f" />
              <ellipse cx="84.2" cy="57" rx="4.2" ry="6" fill="#b2733f" />
              <ellipse cx="60" cy="55" rx="24" ry="27" fill="#bd7c4a" />
              <path d="M35 51c-1.5-15 7.5-24.5 19-26.5 10-1.7 19 .5 25 6 5 4.6 6.5 11 6 20.5-2.5-6.5-6-9.8-11-11.2-8.5-2.3-17-2-24.5.2-6 1.8-11 5-14.5 11z" fill="#16110e" />
              <path d="M36 52c.3-3.5 1.3-6.5 3-9M84 52c-.3-3.5-1.3-6.5-3-9" stroke="#2b211b" strokeWidth="3" strokeLinecap="round" opacity=".7" />
              <path d="M46.5 47.5c3-2.3 6.5-2.6 10-1M63.5 46.5c3.5-1.6 7-1.3 10 1" stroke="#16110e" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              <g className="olhos">
                <ellipse cx="51.5" cy="55" rx="2.7" ry="3.3" fill="#1b1410" />
                <ellipse cx="68.5" cy="55" rx="2.7" ry="3.3" fill="#1b1410" />
                <circle cx="52.4" cy="53.9" r=".95" fill="#fff" />
                <circle cx="69.4" cy="53.9" r=".95" fill="#fff" />
              </g>
              <path d="M59.5 59.5c-1.8 4.2-1.6 6.3.6 6.6 1.2.1 2-.3 2.4-1" stroke="#8a5230" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              <ellipse cx="44" cy="65" rx="4" ry="2.4" fill="#d98e66" opacity=".45" />
              <ellipse cx="76" cy="65" rx="4" ry="2.4" fill="#d98e66" opacity=".45" />
              <path d="M48.5 68.5c7 7.5 16 7.5 23 0z" fill="#fff" stroke="#6b331d" strokeWidth="1.4" strokeLinejoin="round" />
            </g>

            {/* braço da frente (lado esquerdo da tela): acena e aponta */}
            <g className="braco braco-frente">
              <path d="M34 91c-3 1-5 4-5 8l-1.5 26.5c-.2 3 1.8 5 4.5 5h5c2.4 0 4-1.8 4-4.2L43 97.5c.3-4.5-4-7.5-9-6.5z" fill="#b4d6f8" />
              <path d="M40.5 124H27.7l-.3 5.2c-.1 1.8 1.3 2.8 3 2.8h7c1.7 0 3-1.2 3-2.8z" fill="#c8e1fa" />
              <circle cx="33.5" cy="135.5" r="5.4" fill="#bd7c4a" />
              <rect className="dedo" x="31.9" y="138" width="3.3" height="9" rx="1.65" fill="#bd7c4a" />
            </g>
          </g>
        </svg>
      </button>
    </div>
  );
}
