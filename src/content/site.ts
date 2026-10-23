// Dados institucionais centralizados. Tudo que aparece em mais de uma página sai daqui.

export const site = {
  nome: "Innovare Soluções em Crédito",
  nomeCurto: "Innovare",
  url: "https://innovarecredito.com.br",
  cnpj: "47.539.161/0001-11",
  responsavel: "Eri Cerqueira",
  frase: "Está precisando de dinheiro? A Innovare tem a solução para você!",
  descricao:
    "Soluções em crédito em Jaguaquara – BA: consignado INSS e servidores públicos, portabilidade, FGTS, crédito CLT, crédito pessoal e mais. Atendimento humanizado e condições explicadas antes de contratar.",
  whatsapp: {
    exibicao: "(73) 99112-1589",
    numero: "5573991121589",
  },
  endereco: {
    rua: "Rua Avelar, nº 14",
    bairro: "Centro",
    cidade: "Jaguaquara",
    uf: "BA",
    // TODO: confirmar o CEP com o cliente antes de publicar.
    cep: "",
    pais: "BR",
  },
  mapa: {
    // Link enviado pela agência (perfil no Google).
    perfilGoogle: "https://share.google/TFj4EACKWq9N4oOst",
    busca: "Innovare Soluções em Crédito, Rua Avelar 14, Centro, Jaguaquara - BA",
  },
  // TODO: confirmar horário de funcionamento com o cliente.
  horario: [] as { dias: string; horas: string }[],
  redes: {
    // TODO: preencher quando o cliente enviar.
    instagram: "",
    facebook: "",
  },
  // Jaguaquara pertence ao Território de Identidade do Vale do Jiquiriçá (BA). Confirmado pela agência.
  regiao: "Vale do Jiquiriçá",
  atendimento: {
    presencial: "Atendimento presencial em Jaguaquara e em todo o Vale do Jiquiriçá",
    nacional: "Atendimento por WhatsApp em todo o Brasil",
  },
} as const;

export const institucional = {
  // Textos da apresentação institucional (proposta aprovada pela agência para uso provisório).
  quemSomos:
    "Somos uma empresa de soluções de crédito localizada em Jaguaquara – BA. Conectamos clientes a opções de crédito de acordo com seu perfil e suas necessidades. Explicamos as condições antes da contratação, para que cada cliente compreenda sua proposta e decida com segurança.",
  missao:
    "Facilitar o acesso a soluções de crédito, com atendimento humanizado, transparência e responsabilidade, ajudando nossos clientes a realizar seus planos e organizar sua vida financeira.",
  visao:
    "Ser referência nacional em soluções de crédito, reconhecida pela confiança, pela qualidade do atendimento e pelo compromisso em oferecer opções adequadas às necessidades de cada cliente.",
  valores: [
    { titulo: "Ética", texto: "Atuação correta em cada atendimento." },
    { titulo: "Responsabilidade", texto: "Cuidado na apresentação das opções." },
    { titulo: "Transparência", texto: "Condições explicadas com clareza." },
    { titulo: "Atendimento humanizado", texto: "Escuta e acolhimento em cada contato." },
    { titulo: "Respeito", texto: "Atenção ao perfil de cada pessoa." },
    { titulo: "Compromisso com o cliente", texto: "Orientação para uma decisão consciente." },
  ],
  objetivos: [
    "Ampliar o acesso à informação sobre crédito.",
    "Oferecer atendimento ágil, personalizado e transparente.",
    "Auxiliar na comparação de condições e na compreensão de parcelas, prazos, taxas e custo total.",
    "Construir relacionamentos duradouros com clientes e parceiros.",
    "Crescer de forma sustentável, com qualidade no atendimento.",
  ],
};

export const avisoLegal =
  "A Innovare Soluções em Crédito atua na orientação e intermediação de operações de crédito junto a instituições financeiras parceiras. Não somos instituição financeira e não concedemos crédito diretamente. Todas as operações estão sujeitas à análise de crédito e às condições de cada instituição. Taxas, prazos e o Custo Efetivo Total (CET) são informados antes da contratação. Crédito para beneficiários do Bolsa Família é uma contratação independente do benefício.";
