"use client";

import { useEffect, useRef } from "react";
import { SIMBOLO_PATH, SIMBOLO_VIEWBOX } from "./logo-paths";

/* ============================================================
   Campo de partículas ("constelação") com formação de palavras.

   - Partículas de fundo derivam devagar e se ligam por linhas quando estão perto
     (mais densas nas laterais, para deixar o texto respirar).
   - Um segundo grupo de partículas se junta dentro do elemento `alvoId` formando,
     em ciclo, as formas de `formas` (palavras ou o símbolo da logo), depois se solta.
   - O ponteiro empurra as partículas; as que formam a palavra voltam ao lugar.
   - Pausa fora da tela e com a aba oculta; quadro único com prefers-reduced-motion.
   Canvas 2D puro, sem dependências.
   ============================================================ */

export type Forma = { tipo: "texto"; valor: string } | { tipo: "simbolo" };

type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  laranja: boolean;
};
type F = P & { tx: number; ty: number; a: number; mix: number };

const LINK = 140;
const REPULSAO = 100;

export function ParticleField({
  formas = [],
  alvoId,
  className = "",
  densidade = 1,
}: {
  formas?: Forma[];
  alvoId?: string;
  className?: string;
  densidade?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cw = 0;
    let ch = 0;
    let ultimaLargura = 0;
    let fundo: P[] = [];
    let formadores: F[] = [];
    let alvos: { x: number; y: number }[][] = []; // um conjunto de pontos por forma
    let gap = 5;
    let mx = -9999;
    let my = -9999;
    let raf = 0;
    let rodando = false;
    let visivel = true;

    // Linha do tempo da formação
    let formaAtual = 0;
    let fase: "espera" | "formando" | "segurando" | "soltando" = "espera";
    let faseInicio = performance.now();
    const DUR = { espera: 500, formando: 1900, segurando: 3400, soltando: 3600 };

    const mobile = () => cw < 768;

    function sortearX() {
      // distribuição em "U": mais pontos nas bordas laterais
      if (Math.random() > 0.6) return Math.random() * cw;
      const d = Math.pow(Math.random(), 2.2) * (cw * 0.5);
      return Math.random() < 0.5 ? d : cw - d;
    }

    function novaParticula(x?: number, y?: number): P {
      const ang = Math.random() * Math.PI * 2;
      const vel = 0.32 * (0.4 + Math.random() * 0.9);
      return {
        x: x ?? sortearX(),
        y: y ?? Math.random() * ch,
        vx: Math.cos(ang) * vel,
        vy: Math.sin(ang) * vel,
        r: 1.2 + Math.random() * 1.4,
        laranja: Math.random() < 0.14,
      };
    }

    function criarFundo() {
      const n = Math.round(Math.min(110, Math.max(28, (cw * ch) / 15000)) * densidade);
      fundo = Array.from({ length: n }, () => novaParticula());
    }

    /** Amostra os pixels de uma forma desenhada num canvas invisível. */
    function amostrar(forma: Forma, box: { x: number; y: number; w: number; h: number }, familia: string) {
      const off = document.createElement("canvas");
      off.width = Math.max(1, Math.floor(box.w));
      off.height = Math.max(1, Math.floor(box.h));
      const o = off.getContext("2d", { willReadFrequently: true });
      if (!o) return [];
      o.fillStyle = "#fff";
      if (forma.tipo === "texto") {
        let size = box.h * 0.8;
        o.font = `800 ${size}px ${familia}`;
        const w = o.measureText(forma.valor).width;
        if (w > box.w * 0.96) size = (size * box.w * 0.96) / w;
        o.font = `800 ${size}px ${familia}`;
        o.textAlign = "center";
        o.textBaseline = "middle";
        o.fillText(forma.valor, box.w / 2, box.h / 2 + size * 0.04);
      } else {
        const [vx, vy, vw, vh] = SIMBOLO_VIEWBOX.split(" ").map(Number);
        const escala = Math.min(box.w / vw, box.h / vh) * 0.92;
        o.translate(box.w / 2 - (vw * escala) / 2 - vx * escala, box.h / 2 - (vh * escala) / 2 - vy * escala);
        o.scale(escala, escala);
        o.fill(new Path2D(SIMBOLO_PATH), "evenodd");
      }
      const dados = o.getImageData(0, 0, off.width, off.height).data;
      const pts: { x: number; y: number }[] = [];
      for (let y = 0; y < off.height; y += gap) {
        for (let x = 0; x < off.width; x += gap) {
          if (dados[(y * off.width + x) * 4 + 3] > 128) pts.push({ x: box.x + x, y: box.y + y });
        }
      }
      return pts;
    }

    function prepararFormas() {
      formadores = [];
      alvos = [];
      if (!alvoId || formas.length === 0) return;
      const alvo = document.getElementById(alvoId);
      if (!alvo) return;
      const ra = alvo.getBoundingClientRect();
      const rc = canvas!.getBoundingClientRect();
      if (ra.width < 40 || ra.height < 20) return;
      const box = { x: ra.left - rc.left, y: ra.top - rc.top, w: ra.width, h: ra.height };
      gap = mobile() ? 4 : 5;
      const familia =
        getComputedStyle(document.documentElement).getPropertyValue("--font-sora").trim() || "system-ui, sans-serif";
      const max = mobile() ? 380 : 1100;
      alvos = formas.map((f) => {
        const pts = amostrar(f, box, familia);
        for (let i = pts.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [pts[i], pts[j]] = [pts[j], pts[i]];
        }
        return pts.slice(0, max);
      });
      const total = Math.max(...alvos.map((a) => a.length));
      for (let i = 0; i < total; i++) {
        const p = novaParticula();
        formadores.push({ ...p, tx: p.x, ty: p.y, a: 0, mix: 0, r: 1.1 + Math.random() * 1 });
      }
      atribuirAlvos();
    }

    function atribuirAlvos() {
      const pts = alvos[formaAtual];
      if (!pts || pts.length === 0) return;
      let minX = Infinity;
      let maxX = -Infinity;
      for (const p of pts) {
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
      }
      formadores.forEach((f, i) => {
        const alvo = pts[i % pts.length];
        f.tx = alvo.x;
        f.ty = alvo.y;
        f.mix = (alvo.x - minX) / Math.max(1, maxX - minX);
      });
    }

    function redimensionar() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cw = host!.clientWidth;
      ch = host!.clientHeight;
      canvas!.width = Math.round(cw * dpr);
      canvas!.height = Math.round(ch * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      // no celular, a barra de endereço muda só a altura: não refaz as partículas nesse caso
      if (Math.abs(cw - ultimaLargura) > 1 || fundo.length === 0) {
        ultimaLargura = cw;
        criarFundo();
        prepararFormas();
      }
    }

    function avancarFase(agora: number) {
      if (formadores.length === 0) return;
      const decorrido = agora - faseInicio;
      if (decorrido < DUR[fase]) return;
      faseInicio = agora;
      if (fase === "espera") fase = "formando";
      else if (fase === "formando") fase = "segurando";
      else if (fase === "segurando") {
        fase = "soltando";
        // "explode" para fora, com deriva aleatória
        for (const f of formadores) {
          const ang = Math.random() * Math.PI * 2;
          const v = 0.8 + Math.random() * 3.6;
          f.vx = Math.cos(ang) * v;
          f.vy = Math.sin(ang) * v;
        }
      } else {
        fase = "formando";
        formaAtual = (formaAtual + 1) % alvos.length;
        atribuirAlvos();
      }
    }

    function empurrar(p: P) {
      const dx = p.x - mx;
      const dy = p.y - my;
      const d = Math.hypot(dx, dy);
      if (d < REPULSAO && d > 0.01) {
        const f = ((REPULSAO - d) / REPULSAO) * 1.4;
        p.x += (dx / d) * f;
        p.y += (dy / d) * f;
      }
    }

    function atualizar() {
      const M = 30;
      for (const p of fundo) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -M) p.x = cw + M;
        else if (p.x > cw + M) p.x = -M;
        if (p.y < -M) p.y = ch + M;
        else if (p.y > ch + M) p.y = -M;
        empurrar(p);
      }
      const atraindo = fase === "formando" || fase === "segurando";
      for (const f of formadores) {
        if (atraindo) {
          const k = fase === "formando" ? 0.055 + f.r * 0.012 : 0.12;
          f.x += (f.tx - f.x) * k;
          f.y += (f.ty - f.y) * k;
          f.a += (1 - f.a) * 0.06;
          // cintilação leve quando a forma está montada
          if (fase === "segurando") {
            f.x += (Math.random() - 0.5) * 0.35;
            f.y += (Math.random() - 0.5) * 0.35;
          }
        } else {
          f.x += f.vx;
          f.y += f.vy;
          f.vx *= 0.985;
          f.vy *= 0.985;
          const alvoA = fase === "espera" ? 0.12 : 0.1;
          f.a += (alvoA - f.a) * 0.03;
        }
        empurrar(f);
      }
    }

    function desenhar() {
      ctx!.clearRect(0, 0, cw, ch);

      // linhas entre partículas de fundo próximas
      ctx!.lineWidth = 1;
      for (let a = 0; a < fundo.length; a++) {
        const pa = fundo[a];
        for (let b = a + 1; b < fundo.length; b++) {
          const pb = fundo[b];
          const dx = pa.x - pb.x;
          const dy = pa.y - pb.y;
          if (dx > LINK || dx < -LINK || dy > LINK || dy < -LINK) continue;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            ctx!.strokeStyle = `rgba(91,155,255,${((1 - d / LINK) * 0.32).toFixed(3)})`;
            ctx!.beginPath();
            ctx!.moveTo(pa.x, pa.y);
            ctx!.lineTo(pb.x, pb.y);
            ctx!.stroke();
          }
        }
      }

      // pontos de fundo
      for (const p of fundo) {
        ctx!.fillStyle = p.laranja ? "rgba(242,138,43,0.85)" : "rgba(140,185,255,0.75)";
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      // malha fina entre formadores vizinhos (grade espacial)
      if (formadores.length && (fase === "formando" || fase === "segurando")) {
        const cel = gap * 1.5;
        const grade = new Map<number, F[]>();
        for (const f of formadores) {
          if (f.a < 0.4) continue;
          const k = Math.floor(f.x / cel) * 10000 + Math.floor(f.y / cel);
          const lista = grade.get(k);
          if (lista) lista.push(f);
          else grade.set(k, [f]);
        }
        ctx!.strokeStyle = "rgba(160,200,255,0.16)";
        ctx!.beginPath();
        for (const f of formadores) {
          if (f.a < 0.4) continue;
          const gx = Math.floor(f.x / cel);
          const gy = Math.floor(f.y / cel);
          for (let ox = 0; ox <= 1; ox++) {
            for (let oy = -1; oy <= 1; oy++) {
              const lista = grade.get((gx + ox) * 10000 + gy + oy);
              if (!lista) continue;
              for (const g of lista) {
                if (g === f || g.x < f.x) continue;
                const dx = g.x - f.x;
                const dy = g.y - f.y;
                if (dx * dx + dy * dy < cel * cel) {
                  ctx!.moveTo(f.x, f.y);
                  ctx!.lineTo(g.x, g.y);
                }
              }
            }
          }
        }
        ctx!.stroke();
      }

      // formadores, com brilho aditivo (branco → azul → laranja ao longo da forma)
      ctx!.globalCompositeOperation = "lighter";
      for (const f of formadores) {
        if (f.a < 0.02) continue;
        const m = f.mix;
        const r = Math.round(210 + (255 - 210) * m);
        const g = Math.round(228 - (228 - 160) * m * m);
        const b = Math.round(255 - (255 - 80) * m * m);
        ctx!.fillStyle = `rgba(${r},${g},${b},${(f.a * 0.95).toFixed(3)})`;
        ctx!.beginPath();
        ctx!.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalCompositeOperation = "source-over";
    }

    function quadro(agora: number) {
      if (!rodando) return;
      avancarFase(agora);
      atualizar();
      desenhar();
      raf = requestAnimationFrame(quadro);
    }
    function iniciar() {
      if (rodando || reduzir || !visivel || document.hidden) return;
      rodando = true;
      raf = requestAnimationFrame(quadro);
    }
    function parar() {
      rodando = false;
      cancelAnimationFrame(raf);
    }

    const aoMover = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const aoSair = () => {
      mx = -9999;
      my = -9999;
    };
    const aoVisibilidade = () => (document.hidden ? parar() : iniciar());

    let ativo = true;
    const preparar = async () => {
      // espera a fonte do título carregar para a palavra sair com o desenho certo
      try {
        const familia = getComputedStyle(document.documentElement).getPropertyValue("--font-sora").trim();
        if (familia && document.fonts) await document.fonts.load(`800 80px ${familia}`);
      } catch {
        /* segue com a fonte de fallback */
      }
      if (!ativo) return;
      redimensionar();
      if (reduzir) {
        // quadro estático com a primeira forma montada
        for (const f of formadores) {
          f.x = f.tx;
          f.y = f.ty;
          f.a = 1;
        }
        fase = "segurando";
        desenhar();
        return;
      }
      faseInicio = performance.now();
      iniciar();
    };
    preparar();

    let timer: number | undefined;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        redimensionar();
        if (reduzir) desenhar();
      }, 160);
    });
    ro.observe(host);

    const io = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
      if (visivel) iniciar();
      else parar();
    });
    io.observe(canvas);

    window.addEventListener("pointermove", aoMover, { passive: true });
    document.addEventListener("pointerleave", aoSair);
    document.addEventListener("visibilitychange", aoVisibilidade);

    return () => {
      ativo = false;
      parar();
      ro.disconnect();
      io.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener("pointermove", aoMover);
      document.removeEventListener("pointerleave", aoSair);
      document.removeEventListener("visibilitychange", aoVisibilidade);
    };
    // formas é estático por página; serializa para não reiniciar a cada render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alvoId, densidade, JSON.stringify(formas)]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
