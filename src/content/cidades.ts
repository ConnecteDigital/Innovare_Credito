import type { Faq } from "./servicos";

// Cada cidade tem texto próprio: páginas iguais com o nome trocado são penalizadas pelo Google.
// Para adicionar uma cidade, copie um item, troque os textos e o slug. A página, o sitemap e o schema são gerados sozinhos.
// TODO: revisar com o cliente a forma de atendimento em cada cidade.

export type Cidade = {
  slug: string;
  nome: string;
  uf: string;
  sede?: boolean;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  paragrafos: string[];
  atendimento: string;
  destaques: string[]; // slugs de serviços em destaque
  faq: Faq[];
};

export const cidades: Cidade[] = [
  {
    slug: "jaguaquara-ba",
    nome: "Jaguaquara",
    uf: "BA",
    sede: true,
    metaTitle: "Empréstimo e Consignado em Jaguaquara – BA",
    metaDescription:
      "Loja física da Innovare em Jaguaquara – BA, na Rua Avelar, nº 14, Centro. Consignado INSS, servidores, FGTS, CLT, crédito pessoal e mais, com atendimento presencial.",
    h1: "Soluções em crédito em Jaguaquara – BA",
    intro:
      "Jaguaquara é a nossa casa. É aqui, na Rua Avelar, nº 14, no Centro, que fica a loja da Innovare, onde você é atendido pessoalmente por quem conhece a cidade e entende a realidade de quem mora nela.",
    paragrafos: [
      "Atendemos aposentados e pensionistas do INSS, servidores públicos, trabalhadores com carteira assinada, autônomos e comerciantes de Jaguaquara com as principais modalidades de crédito: consignado, portabilidade com troco, antecipação do FGTS, crédito pessoal, empréstimo no cartão e na conta de energia, entre outras.",
      "Nosso jeito de trabalhar é simples: escutamos, mostramos as opções disponíveis para o seu perfil e explicamos parcela, prazo, taxa e custo total antes de qualquer contratação. Você decide com calma, sem pressão.",
    ],
    atendimento: "Atendimento presencial na loja do Centro e também pelo WhatsApp.",
    destaques: ["inss", "servidores-publicos", "portabilidade-refinanciamento", "clt-e-fgts"],
    faq: [
      {
        pergunta: "Onde fica a Innovare em Jaguaquara?",
        resposta: "Na Rua Avelar, nº 14, Centro, Jaguaquara – BA. Você também pode falar com a gente pelo WhatsApp (73) 99112-1589.",
      },
      {
        pergunta: "Preciso agendar para ser atendido na loja?",
        resposta: "Não é obrigatório, mas se preferir pode avisar pelo WhatsApp que deixamos tudo preparado para o seu atendimento.",
      },
    ],
  },
  {
    slug: "entroncamento-de-jaguaquara-ba",
    nome: "Entroncamento de Jaguaquara",
    uf: "BA",
    metaTitle: "Empréstimo e Consignado no Entroncamento de Jaguaquara",
    metaDescription:
      "Moradores do Entroncamento de Jaguaquara contam com a Innovare para consignado INSS, FGTS, crédito CLT e crédito pessoal. Atendimento pelo WhatsApp e na loja do Centro.",
    h1: "Crédito e consignado para quem mora no Entroncamento de Jaguaquara",
    intro:
      "Para quem mora ou trabalha no Entroncamento de Jaguaquara, a Innovare está perto: a nossa loja fica no Centro de Jaguaquara, e todo o atendimento também pode ser feito pelo WhatsApp, sem precisar sair de casa.",
    paragrafos: [
      "Muita gente da região do Entroncamento trabalha com comércio, transporte e serviços. Por isso, além do consignado para aposentados, pensionistas e servidores, temos opções como crédito pessoal para autônomos, empréstimo com garantia de veículo, antecipação do FGTS e maquininhas Ton para quem vende.",
      "Começando pelo WhatsApp, você envia as informações iniciais, recebe as opções explicadas com clareza e, se quiser, finaliza o atendimento na loja.",
    ],
    atendimento: "Atendimento pelo WhatsApp e presencial na loja do Centro de Jaguaquara.",
    destaques: ["credito-pessoal", "emprestimo-garantia-veiculo", "clt-e-fgts", "maquininhas-ton"],
    faq: [
      {
        pergunta: "Consigo resolver tudo sem ir até o Centro?",
        resposta: "Na maioria dos casos, sim. O atendimento começa pelo WhatsApp e só é presencial se você preferir ou se a modalidade exigir.",
      },
    ],
  },
  {
    slug: "itirucu-ba",
    nome: "Itiruçu",
    uf: "BA",
    metaTitle: "Empréstimo e Consignado em Itiruçu – BA",
    metaDescription:
      "Consignado INSS, crédito para servidores, portabilidade, FGTS e crédito pessoal para moradores de Itiruçu – BA. Atendimento pelo WhatsApp e na loja em Jaguaquara.",
    h1: "Soluções em crédito para Itiruçu – BA",
    intro:
      "Itiruçu é vizinha de Jaguaquara e faz parte da região que atendemos de perto. Moradores da cidade podem falar com a Innovare pelo WhatsApp ou ir até a nossa loja, no Centro de Jaguaquara.",
    paragrafos: [
      "Para aposentados e pensionistas de Itiruçu, o consignado INSS e a portabilidade com troco costumam ser as opções com melhores condições. Servidores municipais também podem ter acesso ao consignado, conforme o convênio da prefeitura.",
      "Para quem trabalha na agricultura, no comércio ou por conta própria, temos crédito pessoal, empréstimo no cartão, crédito na conta de energia e consórcios para planejar a compra de um veículo.",
    ],
    atendimento: "Atendimento pelo WhatsApp e presencial na nossa loja em Jaguaquara.",
    destaques: ["inss", "servidores-publicos", "portabilidade-refinanciamento", "credito-pessoal"],
    faq: [
      {
        pergunta: "Servidor da Prefeitura de Itiruçu pode fazer consignado?",
        resposta: "Depende do convênio vigente entre a prefeitura e as instituições financeiras. Fale com a gente e verificamos.",
      },
    ],
  },
  {
    slug: "itaquara-ba",
    nome: "Itaquara",
    uf: "BA",
    metaTitle: "Empréstimo e Consignado em Itaquara – BA",
    metaDescription:
      "Moradores de Itaquara – BA contam com a Innovare para consignado INSS, servidores, FGTS, crédito CLT e crédito pessoal. Atendimento pelo WhatsApp e em Jaguaquara.",
    h1: "Crédito e consignado para moradores de Itaquara – BA",
    intro:
      "Itaquara fica pertinho de Jaguaquara, e muitos dos nossos clientes vêm de lá. Se você mora em Itaquara, pode resolver tudo pelo WhatsApp ou passar na nossa loja para um atendimento presencial.",
    paragrafos: [
      "Ajudamos aposentados, pensionistas e beneficiários do BPC/LOAS a entender o consignado INSS, e servidores públicos a conhecer as condições do consignado em folha. Para quem tem carteira assinada, explicamos o crédito para trabalhador CLT e a antecipação do saque-aniversário do FGTS.",
      "Em todas as modalidades, mostramos antes o que você vai pagar: parcela, prazo, taxa e custo total. Assim você compara e decide com segurança.",
    ],
    atendimento: "Atendimento pelo WhatsApp e presencial na nossa loja em Jaguaquara.",
    destaques: ["inss", "clt-e-fgts", "servidores-publicos", "credito-conta-de-energia"],
    faq: [
      {
        pergunta: "Atendem aposentados de Itaquara pelo WhatsApp?",
        resposta: "Sim. Você pode começar pelo WhatsApp e, se preferir, finalizar na loja em Jaguaquara.",
      },
    ],
  },
  {
    slug: "jequie-ba",
    nome: "Jequié",
    uf: "BA",
    metaTitle: "Empréstimo e Consignado em Jequié – BA",
    metaDescription:
      "Consignado INSS, servidores municipais e estaduais, portabilidade com troco, FGTS e crédito pessoal para Jequié – BA, com atendimento humanizado da Innovare.",
    h1: "Soluções em crédito para Jequié – BA",
    intro:
      "Jequié é a maior cidade da nossa região, e a Innovare atende moradores de lá com a mesma proximidade de sempre: pelo WhatsApp, com respostas rápidas, ou presencialmente na nossa loja em Jaguaquara.",
    paragrafos: [
      "Jequié reúne muitos servidores públicos municipais e estaduais, além de aposentados e pensionistas do INSS. Para esses públicos, o consignado e a portabilidade com troco costumam oferecer as melhores condições, e explicamos cada detalhe antes da contratação.",
      "Também atendemos trabalhadores CLT, autônomos e comerciantes de Jequié com antecipação do FGTS, crédito pessoal, empréstimo com garantia de veículo e maquininhas Ton.",
    ],
    atendimento: "Atendimento pelo WhatsApp e presencial na nossa loja em Jaguaquara.",
    destaques: ["servidores-publicos", "inss", "portabilidade-refinanciamento", "emprestimo-garantia-veiculo"],
    faq: [
      {
        pergunta: "A Innovare tem loja em Jequié?",
        resposta: "Nossa loja fica em Jaguaquara. Moradores de Jequié são atendidos pelo WhatsApp e podem nos visitar quando quiserem.",
      },
    ],
  },
];

export function getCidade(slug: string) {
  return cidades.find((c) => c.slug === slug);
}
