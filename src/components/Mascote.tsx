"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { MascoteCena, Pose } from "./mascote3d/cena";

/* ============================================================
   Mini Eri 3D — guia que desce a página junto com a rolagem.

   - Personagem 3D (Three.js, carregado depois que a página abre).
   - Anda conforme a rolagem: os passos avançam com o scroll e param quando ele para.
   - No desktop desce pela lateral direita acompanhando o progresso da página (mola).
   - Cada seção com data-mascote="chave" define pose e fala; ao trocar de seção ele dá um giro.
   - Clique: comemora e solta notas de dinheiro. Pode ser escondido.
   ============================================================ */

const roteiro: Record<string, { pose: Pose; fala: string; dinheiro?: boolean }> = {
  inicio: { pose: "acena", fala: "Oi! Eu sou o Eri. Vem comigo conhecer a Innovare!" },
  consignado: { pose: "aponta", fala: "Aposentado ou servidor? Dá pra fazer tudo online!" },
  perfil: { pose: "aponta", fala: "Escolha o seu perfil e veja as opções certas pra você." },
  servicos: { pose: "comemora", fala: "Tem opção pra CLT, autônomo, Bolsa Família e muito mais!", dinheiro: true },
  "como-funciona": { pose: "aponta", fala: "É simples: conversa, análise, proposta explicada e pronto!" },
  sobre: { pose: "acena", fala: "Essa é a nossa equipe, pronta pra te atender." },
  cidades: { pose: "aponta", fala: "Estamos no Centro de Jaguaquara. Passa lá!" },
  faq: { pose: "pensa", fala: "Ficou com alguma dúvida? As respostas estão aqui." },
  cta: { pose: "celular", fala: "Me chama no WhatsApp que a gente resolve!" },
  rodape: { pose: "acena", fala: "Obrigado pela visita! Até logo." },
  pagina: { pose: "aponta", fala: "Qualquer dúvida, é só chamar no WhatsApp!" },
};

type Nota = { id: number; dx: number; dy: number; rx: number; ry: number; rz: number; atraso: number; valor: 50 | 100 };
let idNota = 0;

export function Mascote() {
  const pathname = usePathname();
  const [fechado, setFechado] = useState(false);
  const [pronto, setPronto] = useState(false);
  const [fala, setFala] = useState("");
  const [balao, setBalao] = useState(false);
  const [notas, setNotas] = useState<Nota[]>([]);
  const guiaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cenaRef = useRef<MascoteCena | null>(null);
  const chaveAtual = useRef<string | null>(null);
  const timerBalao = useRef<number | undefined>(undefined);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("mascote-fechado") === "1") setFechado(true);
    } catch {
      /* armazenamento indisponível: mantém visível */
    }
  }, []);

  const soltarDinheiro = useCallback((qtd = 12) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const novas: Nota[] = Array.from({ length: qtd }, (_, i) => ({
      id: ++idNota,
      dx: -30 - Math.random() * 160,
      dy: -60 - Math.random() * 140,
      rx: 360 + Math.random() * 720,
      ry: (Math.random() - 0.5) * 720,
      rz: (Math.random() - 0.5) * 220,
      atraso: i * 55,
      valor: Math.random() < 0.5 ? 100 : 50,
    }));
    setNotas((n) => [...n, ...novas]);
    window.setTimeout(() => setNotas((n) => n.filter((x) => !novas.includes(x))), 2400);
  }, []);

  const reagir = useCallback(
    (pose: Pose, texto: string, dinheiro = false, girar = true) => {
      const cena = cenaRef.current;
      cena?.setPose(pose);
      if (girar) cena?.girar();
      else cena?.pular();
      setFala(texto);
      setBalao(true);
      window.clearTimeout(timerBalao.current);
      timerBalao.current = window.setTimeout(() => setBalao(false), window.innerWidth < 768 ? 2800 : 4200);
      if (dinheiro) soltarDinheiro();
    },
    [soltarDinheiro],
  );

  // carrega o 3D só depois que a página abriu, e roda o laço de animação
  useEffect(() => {
    if (fechado) return;
    const guia = guiaRef.current;
    const canvas = canvasRef.current;
    if (!guia || !canvas) return;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ativo = true;
    let raf = 0;

    // estado da física
    let y = 0;
    let vy = 0;
    let iniciado = false;
    let ultimoScroll = window.scrollY;
    let vel = 0;
    let passo = 0;
    let andando = 0;
    let ultimo = performance.now();

    const alvoY = () => {
      const altura = guia.offsetHeight;
      if (window.innerWidth < 768) return 84; // celular: fica no topo, logo abaixo do menu
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const topo = 96;
      const base = window.innerHeight - altura - 96; // acima do botão do WhatsApp
      return topo + (base - topo) * p;
    };

    const dimensionar = () => {
      const r = canvas.getBoundingClientRect();
      cenaRef.current?.resize(Math.max(1, r.width), Math.max(1, r.height));
    };

    const quadro = (agora: number) => {
      const dt = Math.min(0.05, (agora - ultimo) / 1000);
      ultimo = agora;

      const alvo = alvoY();
      if (!iniciado) {
        y = alvo;
        iniciado = true;
      }
      vy += (alvo - y) * 0.05;
      vy *= 0.78;
      y += vy;
      guia.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;

      const s = window.scrollY;
      const delta = s - ultimoScroll;
      ultimoScroll = s;
      vel += (delta - vel) * 0.25;
      passo += Math.min(0.5, Math.abs(delta) * 0.03); // os passos avançam com a rolagem
      andando += (Math.min(1, Math.abs(vel) / 6) - andando) * (1 - Math.pow(0.002, dt));

      cenaRef.current?.tick(dt, { passo, andando, vel });
      raf = requestAnimationFrame(quadro);
    };

    const iniciar = () => {
      if (!raf && ativo) {
        ultimo = performance.now();
        raf = requestAnimationFrame(quadro);
      }
    };
    const parar = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const aoVisibilidade = () => (document.hidden ? parar() : iniciar());

    const carregar = async () => {
      const { MascoteCena } = await import("./mascote3d/cena");
      if (!ativo) return;
      try {
        cenaRef.current = new MascoteCena(canvas, "esquerda");
      } catch {
        return; // sem WebGL: não mostra o guia
      }
      dimensionar();
      setPronto(true);
      if (reduzir) {
        guia.style.transform = `translate3d(0, ${alvoY()}px, 0)`;
        for (let i = 0; i < 90; i++) cenaRef.current.tick(1 / 60, { passo: 0, andando: 0, vel: 0 });
        return;
      }
      iniciar();
      document.addEventListener("visibilitychange", aoVisibilidade);
    };

    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const t = window.setTimeout(() => (ric ? ric(carregar, { timeout: 2000 }) : carregar()), 900);
    const ro = new ResizeObserver(dimensionar);
    ro.observe(canvas);

    return () => {
      ativo = false;
      window.clearTimeout(t);
      parar();
      ro.disconnect();
      document.removeEventListener("visibilitychange", aoVisibilidade);
      cenaRef.current?.dispose();
      cenaRef.current = null;
    };
  }, [fechado]);

  // escolhe a seção que está no meio da tela
  useEffect(() => {
    if (fechado || !pronto) return;
    chaveAtual.current = null;
    let raf = 0;
    const avaliar = () => {
      raf = 0;
      const meio = window.innerHeight * 0.55;
      let chave: string | null = null;
      for (const el of document.querySelectorAll<HTMLElement>("[data-mascote]")) {
        const r = el.getBoundingClientRect();
        if (r.top <= meio && r.bottom >= meio) chave = el.dataset.mascote ?? null;
      }
      if (chave && chave !== chaveAtual.current && roteiro[chave]) {
        chaveAtual.current = chave;
        const p = roteiro[chave];
        reagir(p.pose, p.fala, p.dinheiro);
      }
    };
    const aoRolar = () => {
      if (!raf) raf = requestAnimationFrame(avaliar);
    };
    const t = window.setTimeout(avaliar, 300);
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      window.clearTimeout(t);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", aoRolar);
    };
  }, [pathname, fechado, pronto, reagir]);

  if (fechado) return null;

  const fechar = () => {
    setFechado(true);
    try {
      sessionStorage.setItem("mascote-fechado", "1");
    } catch {
      /* sem armazenamento: esconde só nesta visualização */
    }
  };

  return (
    <div
      ref={guiaRef}
      className="eri-guia pointer-events-none fixed top-0 right-1 z-40 w-[84px] md:w-[150px]"
      style={{ transform: "translate3d(0,-400px,0)" }}
    >
      <div className={`relative transition-opacity duration-700 ${pronto ? "opacity-100" : "opacity-0"}`}>
        {/* balão de fala */}
        <div
          aria-hidden="true"
          className={`absolute top-[8%] right-[76%] w-[8.5rem] rounded-xl border border-white/60 bg-white/95 px-2.5 py-1.5 text-[0.7rem] leading-snug font-medium text-tinta shadow-[0_10px_26px_-12px_rgb(3_15_36/0.55)] backdrop-blur transition-all duration-300 md:w-[10rem] md:px-3 md:py-2 md:text-[0.76rem] ${
            balao ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-95 opacity-0"
          }`}
        >
          {fala}
        </div>

        <button
          type="button"
          onClick={fechar}
          aria-label="Esconder o guia"
          className="eri-fechar pointer-events-auto absolute top-[10%] right-1 z-20 grid size-6 place-items-center rounded-full bg-marinho/90 text-xs text-white shadow md:right-3"
        >
          ×
        </button>

        {/* notas de dinheiro girando em 3D */}
        <div className="pointer-events-none absolute top-[38%] left-1/2 z-10 [perspective:700px] [transform-style:preserve-3d]" aria-hidden="true">
          {notas.map((n) => (
            <span
              key={n.id}
              className={`eri-nota ${n.valor === 100 ? "eri-nota-100" : "eri-nota-50"}`}
              style={
                {
                  "--dx": `${n.dx}px`,
                  "--dy": `${n.dy}px`,
                  "--rx": `${n.rx}deg`,
                  "--ry": `${n.ry}deg`,
                  "--rz": `${n.rz}deg`,
                  animationDelay: `${n.atraso}ms`,
                } as CSSProperties
              }
            >
              <b>R$</b>
              <i>{n.valor}</i>
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => reagir("comemora", "Bora realizar os seus planos!", true, false)}
          aria-label="Guia Innovare: clique para uma surpresa"
          className="pointer-events-auto block w-full"
        >
          <canvas ref={canvasRef} className="block aspect-[3/4] w-full" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
