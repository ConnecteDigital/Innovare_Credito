"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon } from "./Icon";
import { NOME_PATH, NOME_VIEWBOX, SIMBOLO_PATH, SIMBOLO_VIEWBOX } from "./logo-paths";

/* ============================================================
   Logo da Innovare em 3D (símbolo + nome), sem bibliotecas.

   A espessura vem de várias cópias da logo empilhadas no eixo Z
   (cada camada 1px atrás da outra, mais escura conforme se afasta),
   como um objeto extrudado. A frente tem um brilho metálico que
   acompanha a rotação. Gira sozinha e pode ser arrastada em qualquer direção,
   com inércia. Pausa fora da tela; fica parada com prefers-reduced-motion.
   ============================================================ */

const CAMADAS = 22; // espessura em px
const AUTO = 0.35; // graus por quadro no giro automático

function corLateral(i: number) {
  // da frente (i alto) para trás (i baixo): azul da marca → marinho
  const t = i / (CAMADAS - 1);
  const de = [16, 38, 86];
  const ate = [52, 98, 206];
  const c = de.map((v, k) => Math.round(v + (ate[k] - v) * t));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

function Camada({ fill, style, className = "" }: { fill: string; style: CSSProperties; className?: string }) {
  return (
    <div className={`l3d-camada ${className}`} style={style}>
      <svg viewBox={SIMBOLO_VIEWBOX} className="h-[44%] w-auto">
        <use href="#l3d-simbolo" fill={fill} />
      </svg>
      <svg viewBox={NOME_VIEWBOX} className="mt-[7%] w-full">
        <use href="#l3d-nome" fill={fill} />
      </svg>
    </div>
  );
}

export function Logo3D() {
  const palcoRef = useRef<HTMLDivElement>(null);
  const objRef = useRef<HTMLDivElement>(null);
  const brilhoRef = useRef<SVGLinearGradientElement>(null);
  const [dica, setDica] = useState(true);

  useEffect(() => {
    const palco = palcoRef.current;
    const obj = objRef.current;
    if (!palco || !obj) return;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let ry = -24;
    let rx = 8;
    let vy = AUTO;
    let alvoRx = 8;
    let arrastando = false;
    let ultX = 0;
    let ultY = 0;
    let raf = 0;
    let visivel = true;

    const aplicar = () => {
      obj.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      // brilho metálico desliza pela frente conforme o ângulo
      const fase = (((ry % 360) + 360) % 360) / 360;
      const x = -1 + fase * 3;
      brilhoRef.current?.setAttribute("x1", `${x}`);
      brilhoRef.current?.setAttribute("x2", `${x + 1}`);
      // sombra no chão acompanha a largura aparente
      palco.style.setProperty("--l3d-sombra", (0.45 + Math.abs(Math.cos((ry * Math.PI) / 180)) * 0.55).toFixed(3));
    };

    const quadro = () => {
      if (!arrastando) {
        vy += (AUTO - vy) * 0.02; // inércia volta ao giro automático
        rx += (alvoRx - rx) * 0.04;
        alvoRx += (8 - alvoRx) * 0.01;
      }
      ry += vy;
      aplicar();
      raf = requestAnimationFrame(quadro);
    };
    const iniciar = () => {
      if (raf || reduzir || !visivel) return;
      raf = requestAnimationFrame(quadro);
    };
    const parar = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const aoBaixar = (e: PointerEvent) => {
      arrastando = true;
      ultX = e.clientX;
      ultY = e.clientY;
      palco.setPointerCapture(e.pointerId);
      palco.classList.add("arrastando");
      setDica(false);
    };
    const aoMover = (e: PointerEvent) => {
      if (!arrastando) return;
      const dx = e.clientX - ultX;
      const dy = e.clientY - ultY;
      ultX = e.clientX;
      ultY = e.clientY;
      vy = dx * 0.6;
      rx = Math.max(-40, Math.min(40, rx - dy * 0.4));
      alvoRx = rx;
      if (reduzir) {
        ry += vy;
        aplicar();
      }
    };
    const aoSoltar = () => {
      arrastando = false;
      palco.classList.remove("arrastando");
    };

    aplicar();
    const io = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
      if (visivel) iniciar();
      else parar();
    });
    io.observe(palco);
    palco.addEventListener("pointerdown", aoBaixar);
    palco.addEventListener("pointermove", aoMover);
    palco.addEventListener("pointerup", aoSoltar);
    palco.addEventListener("pointercancel", aoSoltar);
    return () => {
      parar();
      io.disconnect();
      palco.removeEventListener("pointerdown", aoBaixar);
      palco.removeEventListener("pointermove", aoMover);
      palco.removeEventListener("pointerup", aoSoltar);
      palco.removeEventListener("pointercancel", aoSoltar);
    };
  }, []);

  const meio = (CAMADAS - 1) / 2;

  return (
    <div
      ref={palcoRef}
      className="l3d-palco superficie-noite relative aspect-[4/5] w-full cursor-grab touch-pan-y overflow-hidden rounded-[2rem] select-none"
      role="img"
      aria-label="Logo da Innovare em 3D girando. Arraste para girar."
    >
      {/* definições compartilhadas por todas as camadas */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id="l3d-brilho" ref={brilhoRef} x1="0" x2="1" y1="0" y2="0.35">
            <stop offset="0" stopColor="#dce8ff" />
            <stop offset="0.42" stopColor="#ffffff" />
            <stop offset="0.5" stopColor="#ffd2a8" />
            <stop offset="0.58" stopColor="#ffffff" />
            <stop offset="1" stopColor="#b9d0ff" />
          </linearGradient>
          <symbol id="l3d-simbolo" viewBox={SIMBOLO_VIEWBOX}>
            <path d={SIMBOLO_PATH} fillRule="evenodd" />
          </symbol>
          <symbol id="l3d-nome" viewBox={NOME_VIEWBOX}>
            <path d={NOME_PATH} fillRule="evenodd" />
          </symbol>
        </defs>
      </svg>

      <div className="grade-tech pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/40 blur-3xl" />

      {/* pedestal holográfico */}
      <div className="l3d-pedestal pointer-events-none absolute bottom-[9%] left-1/2 w-[78%] -translate-x-1/2" aria-hidden="true">
        <div className="l3d-anel l3d-anel-1" />
        <div className="l3d-anel l3d-anel-2" />
        <div className="l3d-sombra" />
      </div>

      {/* objeto 3D */}
      <div className="absolute inset-x-[14%] top-[16%] bottom-[30%] [perspective:1100px]">
        <div className="l3d-flutua h-full w-full [transform-style:preserve-3d]">
          <div ref={objRef} className="relative h-full w-full [transform-style:preserve-3d]">
            {Array.from({ length: CAMADAS }, (_, i) => {
              const z = i - meio;
              if (i === CAMADAS - 1) {
                return <Camada key={i} fill="url(#l3d-brilho)" className="l3d-face" style={{ transform: `translateZ(${z}px)` }} />;
              }
              if (i === 0) {
                return <Camada key={i} fill="url(#l3d-brilho)" className="l3d-face" style={{ transform: `translateZ(${z}px) rotateY(180deg)` }} />;
              }
              return <Camada key={i} fill={corLateral(i)} style={{ transform: `translateZ(${z}px)` }} />;
            })}
          </div>
        </div>
      </div>

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-5 flex justify-center transition-opacity duration-700 ${dica ? "opacity-100" : "opacity-0"}`}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-noite/60 px-4 py-2 text-sm text-ceu backdrop-blur-md">
          <Icon name="swap" className="size-4 text-laranja-300" /> Arraste para girar
        </span>
      </div>
    </div>
  );
}
