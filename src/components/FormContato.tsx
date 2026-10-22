"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "./Icon";
import { cidades } from "@/content/cidades";
import { servicos } from "@/content/servicos";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * Formulário que monta a mensagem e abre o WhatsApp. Nada é armazenado no site
 * (sem back-end), o que simplifica a LGPD nesta primeira versão.
 */
export function FormContato() {
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [servico, setServico] = useState("");
  const [mensagem, setMensagem] = useState("");

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    const partes = [
      `Olá! Meu nome é ${nome.trim()}.`,
      cidade && `Sou de ${cidade}.`,
      servico && `Tenho interesse em: ${servico}.`,
      mensagem.trim(),
    ].filter(Boolean);
    window.open(whatsappUrl(partes.join(" ")), "_blank", "noopener");
  };

  const campo = "mt-2 w-full rounded-2xl border border-tinta/12 bg-white px-4 py-3.5 text-tinta outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15";

  return (
    <form onSubmit={enviar} className="card-claro grid gap-5 p-6 sm:p-8">
      <div>
        <label htmlFor="ct-nome" className="font-medium text-tinta">
          Seu nome
        </label>
        <input id="ct-nome" required value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" className={campo} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ct-cidade" className="font-medium text-tinta">
            Cidade
          </label>
          <input id="ct-cidade" list="ct-cidades" value={cidade} onChange={(e) => setCidade(e.target.value)} className={campo} />
          <datalist id="ct-cidades">
            {cidades.map((c) => (
              <option key={c.slug} value={`${c.nome} – ${c.uf}`} />
            ))}
          </datalist>
        </div>
        <div>
          <label htmlFor="ct-servico" className="font-medium text-tinta">
            Serviço de interesse
          </label>
          <select id="ct-servico" value={servico} onChange={(e) => setServico(e.target.value)} className={campo}>
            <option value="">Ainda não sei</option>
            {servicos.map((s) => (
              <option key={s.slug} value={s.titulo}>
                {s.titulo}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="ct-msg" className="font-medium text-tinta">
          Mensagem (opcional)
        </label>
        <textarea id="ct-msg" rows={4} value={mensagem} onChange={(e) => setMensagem(e.target.value)} className={campo} />
      </div>
      <button type="submit" className="btn btn-whatsapp w-full">
        <Icon name="whatsapp" className="size-5" /> Enviar pelo WhatsApp
      </button>
      <p className="text-xs leading-relaxed text-ardosia">
        Ao enviar, você será direcionado ao WhatsApp com a mensagem pronta. Seus dados não ficam armazenados no site.
      </p>
    </form>
  );
}
