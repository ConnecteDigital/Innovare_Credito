import { site } from "@/content/site";

export function whatsappUrl(mensagem?: string) {
  const texto = mensagem ?? "Olá! Vim pelo site da Innovare e gostaria de saber mais sobre as opções de crédito.";
  return `https://wa.me/${site.whatsapp.numero}?text=${encodeURIComponent(texto)}`;
}

export function mensagemServico(servico: string, cidade?: string) {
  const local = cidade ? ` Sou de ${cidade}.` : "";
  return `Olá! Vim pelo site da Innovare e quero saber mais sobre ${servico}.${local}`;
}
