import Link from "next/link";
import { ParticleField } from "@/components/ParticleField";

export default function NotFound() {
  return (
    <section className="superficie-noite relative grid min-h-[80svh] place-items-center overflow-hidden px-5 pt-28 pb-16 text-center">
      <div className="grade-tech pointer-events-none absolute inset-0" />
      <ParticleField formas={[{ tipo: "texto", valor: "404" }]} alvoId="alvo-404" densidade={0.7} />
      <div className="relative">
        <div id="alvo-404" aria-hidden="true" className="mx-auto h-36 w-72 sm:h-44 sm:w-96" />
        <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Página não encontrada</h1>
        <p className="mt-3 text-lg text-ceu">O endereço pode ter mudado. Que tal voltar ao início?</p>
        <Link href="/" className="btn btn-laranja mt-8">
          Ir para o início
        </Link>
      </div>
    </section>
  );
}
