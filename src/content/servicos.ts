import type { IconName } from "@/components/Icon";
import {
  faqCltFgts,
  faqInss,
  faqMicrocredito,
  faqPortabilidade,
  faqServidores,
  notaInss,
  notaPortabilidade,
  type Faq,
  type FaqGrupo,
} from "./faqs";

export type { Faq, FaqGrupo };

export type PerfilId = "aposentado" | "servidor" | "clt" | "autonomo" | "bolsa-familia" | "empreendedor";

export type Servico = {
  slug: string;
  grupo: "consignado" | "servicos";
  titulo: string;
  tituloCurto: string;
  icone: IconName;
  resumo: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  publico: string[];
  comoFunciona: string[];
  vantagens: { titulo: string; texto: string }[];
  documentos: string[];
  atencao?: string;
  /** parágrafos de apresentação exibidos logo abaixo do topo */
  paragrafos?: string[];
  /** blocos extras de informação (ex.: "O veículo precisa estar quitado?") */
  infos?: { titulo: string; texto: string }[];
  /** FAQ simples (uma lista) ou agrupado por tema */
  faq?: Faq[];
  faqGrupos?: FaqGrupo[];
  /** frase de destaque ao fim do FAQ */
  faqNota?: string;
  /** mostra o aviso "tudo pode ser feito online, atendemos todo o Brasil" */
  online?: boolean;
  /** oferecido apenas no atendimento regional */
  regional?: boolean;
  perfis: PerfilId[];
};

export const perfis: { id: PerfilId; titulo: string; descricao: string; icone: IconName }[] = [
  { id: "aposentado", titulo: "Aposentado ou pensionista", descricao: "INSS, BPC/LOAS", icone: "senior" },
  { id: "servidor", titulo: "Servidor público", descricao: "Municipal ou estadual", icone: "building" },
  { id: "clt", titulo: "Trabalhador CLT", descricao: "Carteira assinada", icone: "badge" },
  { id: "autonomo", titulo: "Autônomo ou comerciante", descricao: "Renda própria", icone: "user" },
  { id: "bolsa-familia", titulo: "Beneficiário do Bolsa Família", descricao: "Contratação independente do benefício", icone: "family" },
  { id: "empreendedor", titulo: "Empreendedor", descricao: "Vendas, compras e planos", icone: "store" },
];

const docsBasicos = [
  "Documento oficial com foto (RG ou CNH)",
  "CPF",
  "Comprovante de residência recente",
];

export const servicos: Servico[] = [
  // ------------------------------------------------------------------ CONSIGNADO
  {
    slug: "inss",
    grupo: "consignado",
    titulo: "Consignado INSS",
    tituloCurto: "Consignado INSS",
    icone: "senior",
    resumo: "Crédito para aposentados e pensionistas do INSS, incluindo beneficiários do BPC/LOAS, com parcelas descontadas direto do benefício.",
    metaTitle: "Empréstimo Consignado INSS em Jaguaquara – BA",
    metaDescription:
      "Consignado INSS para aposentados, pensionistas e BPC/LOAS em Jaguaquara e região. Parcelas descontadas no benefício e condições explicadas antes de contratar.",
    h1: "Empréstimo consignado INSS para aposentados e pensionistas",
    intro:
      "O consignado INSS é uma das formas de crédito mais procuradas por aposentados e pensionistas: as parcelas são descontadas direto do benefício, o que costuma garantir taxas menores que as do crédito pessoal. Na Innovare, você é atendido pessoalmente, entende cada número da proposta e só contrata quando tiver certeza.",
    publico: [
      "Aposentados do INSS",
      "Pensionistas do INSS",
      "Beneficiários do BPC/LOAS, conforme as condições disponíveis",
    ],
    comoFunciona: [
      "Você fala com a nossa equipe pelo WhatsApp, de qualquer lugar do Brasil, ou vem até a loja em Jaguaquara.",
      "Consultamos a margem consignável disponível no seu benefício.",
      "Apresentamos as opções, explicando parcela, prazo, taxa e custo total.",
      "Com a sua aprovação, a proposta segue para a instituição financeira.",
      "Após a aprovação, o valor é liberado na sua conta.",
    ],
    vantagens: [
      { titulo: "Taxas reguladas", texto: "O consignado INSS tem teto de juros definido pelas regras do benefício." },
      { titulo: "Sem boleto", texto: "A parcela é descontada no benefício, sem risco de esquecer o pagamento." },
      { titulo: "Online ou presencial", texto: "Faça tudo pelo WhatsApp, de qualquer lugar do Brasil, ou venha à nossa loja." },
    ],
    documentos: [...docsBasicos, "Extrato ou número do benefício", "Dados da conta onde recebe o benefício"],
    faqGrupos: faqInss,
    faqNota: notaInss,
    online: true,
    perfis: ["aposentado"],
  },
  {
    slug: "servidores-publicos",
    grupo: "consignado",
    titulo: "Consignado para Servidores Públicos",
    tituloCurto: "Servidores públicos",
    icone: "building",
    resumo: "Consignado para servidores municipais e estaduais, com desconto em folha, conforme o convênio do seu órgão.",
    metaTitle: "Consignado para Servidor Público Municipal e Estadual – Bahia",
    metaDescription:
      "Empréstimo consignado para servidores públicos municipais e estaduais da Bahia, conforme convênio. Desconto em folha e atendimento em Jaguaquara e região.",
    h1: "Consignado para servidores públicos municipais e estaduais",
    intro:
      "Servidor público tem acesso a uma das linhas de crédito com melhores condições do mercado: o consignado com desconto em folha. Verificamos o convênio do seu órgão, sua margem disponível e apresentamos as opções de forma clara para você escolher com segurança.",
    publico: [
      "Servidores públicos municipais, conforme convênio da prefeitura",
      "Servidores públicos estaduais, conforme convênio",
      "Aposentados e pensionistas de regimes próprios, quando houver convênio",
    ],
    comoFunciona: [
      "Você informa o órgão em que trabalha pelo WhatsApp ou na loja.",
      "Verificamos o convênio e a sua margem consignável.",
      "Apresentamos as opções com parcela, prazo, taxa e custo total.",
      "Você aprova a proposta e enviamos para a instituição financeira.",
      "O valor é liberado na sua conta após a aprovação.",
    ],
    vantagens: [
      { titulo: "Desconto em folha", texto: "Parcela fixa descontada no contracheque, sem boletos." },
      { titulo: "Prazos longos", texto: "Parcelas que cabem no orçamento, conforme as regras do convênio." },
      { titulo: "Orientação próxima", texto: "Explicamos cada condição antes de você decidir." },
    ],
    documentos: [...docsBasicos, "Último contracheque", "Dados bancários"],
    faqGrupos: faqServidores,
    online: true,
    perfis: ["servidor"],
  },
  {
    slug: "portabilidade-refinanciamento",
    grupo: "consignado",
    titulo: "Portabilidade + Refinanciamento com troco",
    tituloCurto: "Portabilidade e refinanciamento",
    icone: "swap",
    resumo: "Transfira seu consignado para outra instituição em busca de condições melhores e, conforme análise, libere um valor adicional.",
    metaTitle: "Portabilidade e Refinanciamento de Consignado com Troco",
    metaDescription:
      "Leve seu consignado para outra instituição em busca de condições melhores e, conforme análise, libere troco. Atendimento em Jaguaquara e em todo o Brasil.",
    h1: "Portabilidade e refinanciamento de consignado com troco",
    intro:
      "Se você já tem um consignado, pode ser possível transferir o contrato para outra instituição com condições mais vantajosas: a portabilidade é um direito do consumidor previsto nas regras do Banco Central. Em muitos casos, a operação vem junto com um refinanciamento que libera um valor adicional, o chamado troco.",
    publico: [
      "Aposentados e pensionistas do INSS com consignado ativo",
      "Servidores públicos com consignado ativo",
    ],
    comoFunciona: [
      "Você nos informa os contratos que tem hoje.",
      "Analisamos saldo devedor, parcelas pagas e taxa atual.",
      "Buscamos opções com condições melhores e, quando possível, troco.",
      "Mostramos lado a lado como fica o contrato atual e o novo.",
      "Você decide e cuidamos do encaminhamento da operação.",
    ],
    vantagens: [
      { titulo: "Possível redução de taxa", texto: "Comparação clara entre o contrato atual e a nova proposta." },
      { titulo: "Troco na conta", texto: "Conforme análise, libera um valor adicional para seus planos." },
      { titulo: "Decisão consciente", texto: "Você só segue em frente se a nova condição fizer sentido." },
    ],
    documentos: [...docsBasicos, "Extrato do benefício ou contracheque", "Informações dos contratos atuais"],
    faqGrupos: faqPortabilidade,
    faqNota: notaPortabilidade,
    online: true,
    perfis: ["aposentado", "servidor"],
  },

  // ------------------------------------------------------------------ OUTROS SERVIÇOS
  {
    slug: "clt-e-fgts",
    grupo: "servicos",
    titulo: "Crédito CLT e Antecipação do Saque-Aniversário FGTS",
    tituloCurto: "CLT e FGTS",
    icone: "badge",
    resumo: "Opções de empréstimo para quem trabalha com carteira assinada e antecipação do saque-aniversário do FGTS.",
    metaTitle: "Crédito para Trabalhador CLT e Antecipação do FGTS",
    metaDescription:
      "Empréstimo para trabalhador com carteira assinada e antecipação do saque-aniversário do FGTS. Atendimento em Jaguaquara e por WhatsApp em todo o Brasil.",
    h1: "Crédito para trabalhador CLT e antecipação do saque-aniversário FGTS",
    intro:
      "Quem trabalha com carteira assinada tem duas formas de conseguir crédito: o empréstimo para trabalhador CLT, com parcelas descontadas em folha conforme as regras do programa vigente, e a antecipação do saque-aniversário do FGTS, que adianta valores do seu saldo sem parcelas mensais. Explicamos as duas para você escolher a melhor.",
    publico: [
      "Trabalhadores com carteira assinada (CLT)",
      "Quem tem saldo no FGTS e aderiu, ou pretende aderir, ao saque-aniversário",
    ],
    comoFunciona: [
      "Você nos conta se prefere crédito em folha ou antecipação do FGTS.",
      "Verificamos as condições disponíveis para o seu perfil.",
      "Apresentamos valores, prazos e custo total de cada opção.",
      "Com a sua aprovação, encaminhamos a proposta.",
      "O valor é liberado na sua conta após a aprovação.",
    ],
    vantagens: [
      { titulo: "Duas alternativas", texto: "Crédito em folha ou antecipação do FGTS, conforme o seu momento." },
      { titulo: "FGTS sem parcela mensal", texto: "Na antecipação, os valores são descontados do saldo do FGTS." },
      { titulo: "Explicação completa", texto: "Mostramos também as regras e limitações de cada modalidade." },
    ],
    documentos: [...docsBasicos, "Carteira de trabalho (pode ser a digital)", "Liberação de consulta ao saldo FGTS, no caso da antecipação"],
    atencao:
      "Ao aderir ao saque-aniversário, em caso de demissão sem justa causa você recebe apenas a multa rescisória, não o saldo total do FGTS, e há prazo de carência para voltar ao saque-rescisão. Explicamos essas regras antes da contratação.",
    faqGrupos: faqCltFgts,
    perfis: ["clt"],
  },
  {
    slug: "credito-conta-de-energia",
    grupo: "servicos",
    titulo: "Crédito na Conta de Energia",
    tituloCurto: "Conta de energia",
    icone: "bolt",
    resumo: "Empréstimo com pagamento das parcelas junto com a sua conta de luz.",
    metaTitle: "Empréstimo na Conta de Luz – Crédito na Conta de Energia",
    metaDescription:
      "Crédito com parcelas cobradas na conta de energia, para o titular da conta. Atendimento em Jaguaquara – BA e em toda a região.",
    h1: "Crédito na conta de energia: parcelas junto com a conta de luz",
    intro:
      "O crédito na conta de energia é uma opção para quem não tem acesso ao consignado ou ao cartão: as parcelas vêm na própria fatura de luz. É preciso ser o titular da conta e morar em área atendida por distribuidora participante. Verificamos tudo para você.",
    publico: ["Titulares de conta de energia em área de distribuidora participante", "Quem procura crédito sem consignado ou cartão"],
    comoFunciona: [
      "Você envia os dados da sua conta de luz.",
      "Verificamos se a sua distribuidora participa e as condições disponíveis.",
      "Apresentamos parcela, prazo e custo total.",
      "Após a aprovação, o valor é liberado e as parcelas vêm na fatura.",
    ],
    vantagens: [
      { titulo: "Pagamento simples", texto: "A parcela vem junto com a conta de luz que você já paga." },
      { titulo: "Alternativa acessível", texto: "Opção para quem não tem margem consignável." },
      { titulo: "Orientação completa", texto: "Explicamos o impacto da parcela na sua fatura." },
    ],
    documentos: [...docsBasicos, "Conta de energia recente em nome do titular"],
    faq: [
      {
        pergunta: "Preciso ser o titular da conta de luz?",
        resposta: "Sim. O crédito é contratado pelo titular da unidade consumidora.",
      },
    ],
    perfis: ["autonomo", "bolsa-familia", "clt"],
  },
  {
    slug: "credito-bolsa-familia",
    grupo: "servicos",
    titulo: "Crédito para quem recebe Bolsa Família",
    tituloCurto: "Bolsa Família",
    icone: "family",
    resumo: "Recebe Bolsa Família e precisa de crédito? Consulte as opções para o seu perfil. A contratação é independente do benefício.",
    metaTitle: "Crédito para quem recebe Bolsa Família – Jaguaquara",
    metaDescription:
      "Recebe Bolsa Família e precisa de crédito? Consulte opções para o seu perfil, com simulação sem compromisso. A contratação é independente do benefício.",
    h1: "Recebe Bolsa Família e precisa de crédito? Conheça as possibilidades com a Innovare!",
    intro:
      "Quem recebe o Bolsa Família pode consultar opções de crédito de acordo com seu perfil e com os critérios da instituição financeira. Nossa equipe oferece atendimento personalizado para verificar as alternativas disponíveis e explicar cada etapa da contratação.",
    paragrafos: [
      "O crédito pode ajudar a lidar com um imprevisto, realizar um projeto ou investir em uma atividade que gere renda, sempre avaliando se as parcelas cabem no seu orçamento.",
      "Receber o benefício não garante aprovação de crédito. Cada solicitação passa pela análise da instituição financeira.",
    ],
    publico: ["Beneficiários do Bolsa Família maiores de 18 anos", "Conforme os critérios de cada instituição financeira"],
    comoFunciona: [
      "Você fala com a nossa equipe pelo WhatsApp ou na loja.",
      "Consultamos as opções disponíveis para o seu perfil.",
      "Fazemos uma simulação sem compromisso, com valor liberado, parcelas, prazo, juros e CET.",
      "Explicamos a forma de pagamento antes de qualquer decisão.",
      "Com a sua aprovação, encaminhamos a proposta para análise.",
    ],
    vantagens: [
      { titulo: "Opções para o seu perfil", texto: "Consulta das alternativas disponíveis para você." },
      { titulo: "Simulação sem compromisso", texto: "Você conhece a proposta antes de decidir." },
      { titulo: "Informações claras", texto: "Valor liberado, parcelas, prazo, juros e Custo Efetivo Total (CET)." },
    ],
    documentos: [...docsBasicos],
    atencao:
      "A contratação é independente do Bolsa Família: nas opções aqui apresentadas, o benefício não é usado como garantia e as parcelas não são descontadas dele. A forma de pagamento será explicada antes de qualquer decisão.",
    faq: [
      {
        pergunta: "O valor das parcelas é descontado do Bolsa Família?",
        resposta: "Não. Nas opções apresentadas pela Innovare, o benefício não é usado como garantia e as parcelas não são descontadas dele.",
      },
      {
        pergunta: "Receber o Bolsa Família garante a aprovação?",
        resposta: "Não. Cada solicitação passa pela análise da instituição financeira, conforme os critérios dela.",
      },
      {
        pergunta: "Como vou pagar as parcelas?",
        resposta: "A forma de pagamento depende da opção escolhida e é explicada antes de qualquer decisão.",
      },
    ],
    perfis: ["bolsa-familia"],
  },
  {
    slug: "credito-pessoal",
    grupo: "servicos",
    titulo: "Crédito Pessoal",
    tituloCurto: "Crédito pessoal",
    icone: "user",
    resumo: "Opções de crédito pessoal para organizar as contas ou realizar seus planos, conforme análise de cada instituição.",
    metaTitle: "Crédito Pessoal em Jaguaquara – BA",
    metaDescription:
      "Crédito pessoal para organizar as contas, lidar com imprevistos ou realizar seus planos. Simulação sem compromisso e transparência em cada etapa.",
    h1: "Crédito pessoal",
    intro:
      "Precisa de dinheiro para organizar as contas ou realizar seus planos? A Innovare pode ajudar! Trabalhamos com opções de crédito pessoal, conforme análise e critérios de cada instituição financeira, para você avaliar possibilidades de acordo com suas necessidades.",
    paragrafos: [
      "Seja para lidar com um imprevisto, realizar um projeto ou reorganizar sua vida financeira, nossa equipe oferece atendimento personalizado e ajuda você a entender as condições disponíveis.",
      "Na Innovare, você conta com simulação sem compromisso e transparência em cada etapa.",
    ],
    publico: ["Quem precisa organizar as contas", "Quem quer realizar um projeto", "Quem precisa lidar com um imprevisto", "Conforme análise de cada instituição"],
    comoFunciona: [
      "Você conta quanto precisa e para quê.",
      "Buscamos as opções disponíveis para o seu perfil.",
      "Fazemos uma simulação sem compromisso com parcela, prazo, taxa e custo total.",
      "Você aprova e encaminhamos a proposta.",
    ],
    vantagens: [
      { titulo: "Atendimento personalizado", texto: "Ajudamos você a entender as condições disponíveis." },
      { titulo: "Simulação sem compromisso", texto: "Você conhece a proposta antes de decidir." },
      { titulo: "Transparência", texto: "Clareza em cada etapa da contratação." },
    ],
    documentos: [...docsBasicos, "Comprovante de renda, quando houver"],
    faq: [
      {
        pergunta: "Para que posso usar o crédito pessoal?",
        resposta: "Para o que você precisar: organizar as contas, lidar com um imprevisto ou realizar um projeto.",
      },
      {
        pergunta: "Autônomo sem comprovante de renda consegue crédito?",
        resposta: "Depende da análise de cada instituição. Fale com a nossa equipe para verificarmos as opções do seu caso.",
      },
    ],
    perfis: ["autonomo", "clt", "empreendedor"],
  },
  {
    slug: "microcredito-itau",
    grupo: "servicos",
    titulo: "Microcrédito Itaú",
    tituloCurto: "Microcrédito Itaú",
    icone: "store",
    resumo: "Microcrédito para comerciantes e prestadores de serviço, de R$ 400 a R$ 21.000 em até 15x, sem necessidade de CNPJ. Atendimento regional.",
    metaTitle: "Microcrédito Itaú em Jaguaquara – BA",
    metaDescription:
      "Microcrédito Itaú para comerciantes e prestadores de serviço: R$ 400 a R$ 21.000 em até 15x, sem necessidade de CNPJ. Correspondente autorizado Itaú em Jaguaquara.",
    h1: "Microcrédito Itaú para impulsionar seu negócio!",
    intro:
      "Quem empreende sabe: investir na hora certa pode fazer a diferença. Seja para comprar mercadorias, renovar equipamentos ou reforçar o capital de giro, conheça as possibilidades do Microcrédito Itaú.",
    paragrafos: [
      "Na Innovare Soluções em Crédito, somos especialistas em crédito e atuamos como correspondente autorizado do Banco Itaú, oferecendo orientação e acompanhamento durante a solicitação.",
      "Nossa equipe ajuda você a conhecer as condições disponíveis, com explicações claras sobre valores, parcelas, prazos, taxas e Custo Efetivo Total (CET) antes da contratação.",
    ],
    publico: ["Comerciantes", "Prestadores de serviços", "Sem necessidade de CNPJ"],
    comoFunciona: [
      "Você fala com a nossa equipe pelo WhatsApp ou na loja em Jaguaquara.",
      "Entendemos o seu negócio e quanto você precisa.",
      "Apresentamos valores, parcelas, prazos, taxas e CET.",
      "Encaminhamos a solicitação ao Itaú e acompanhamos a análise.",
    ],
    vantagens: [
      { titulo: "Sem necessidade de CNPJ", texto: "Para comerciantes e prestadores de serviço." },
      { titulo: "R$ 400 a R$ 21.000", texto: "Valores para mercadorias, equipamentos ou capital de giro." },
      { titulo: "Prazos até 15x", texto: "Parcelas planejadas para o seu negócio." },
    ],
    documentos: [...docsBasicos, "Informações sobre a sua atividade"],
    atencao:
      "Disponível apenas no atendimento regional da Innovare (Jaguaquara e região). Crédito sujeito à análise e aprovação do Banco Itaú; a Innovare atua como correspondente autorizado.",
    faqGrupos: faqMicrocredito,
    regional: true,
    perfis: ["autonomo", "empreendedor"],
  },
  {
    slug: "emprestimo-garantia-veiculo",
    grupo: "servicos",
    titulo: "Empréstimo com Garantia de Veículo",
    tituloCurto: "Garantia de veículo",
    icone: "car",
    resumo: "Seu carro ou moto como garantia, com possibilidade de valores maiores, prazos mais longos e juros menores. O veículo continua com você.",
    metaTitle: "Empréstimo com Garantia de Veículo – Carro ou Moto",
    metaDescription:
      "Use seu carro ou moto como garantia e tenha acesso a valores maiores, prazos mais longos e juros menores, conforme análise. Você continua usando o veículo.",
    h1: "Seu veículo pode ajudar você a realizar planos, organizar as finanças ou investir no seu negócio!",
    intro:
      "Nessa modalidade, seu carro ou moto é oferecido como garantia do empréstimo. Isso pode permitir valores maiores, prazos mais longos e juros menores em comparação ao crédito pessoal sem garantia, conforme a análise e as condições da instituição financeira.",
    paragrafos: [
      "Você continua usando o veículo normalmente, desde que cumpra as condições do contrato. Durante a operação, ele fica vinculado ao banco por meio de alienação fiduciária até a quitação da dívida.",
      "Na Innovare, você recebe orientação para entender a proposta e avaliar se essa modalidade atende às suas necessidades.",
    ],
    publico: ["Proprietários de carro ou moto", "Veículos aceitos conforme a instituição financeira"],
    comoFunciona: [
      "Avaliação do veículo: são analisados o valor de mercado, o ano, o estado de conservação e a documentação. A aceitação de carros e motos depende da instituição.",
      "Análise da proposta: o valor disponível depende da avaliação do veículo, do seu perfil e da capacidade de pagamento.",
      "Condições claras: antes de contratar, você conhece o valor líquido a receber, as parcelas, o prazo, os juros, eventuais despesas de avaliação e registro e o Custo Efetivo Total (CET).",
      "Liberação do crédito: acontece após a aprovação e a conclusão das etapas de documentação e registro da garantia.",
    ],
    vantagens: [
      { titulo: "Valores maiores", texto: "A garantia pode permitir acessar valores mais altos." },
      { titulo: "Prazos e juros", texto: "Prazos mais longos e juros menores que no crédito sem garantia, conforme análise." },
      { titulo: "Veículo com você", texto: "Você continua usando o carro ou a moto normalmente." },
    ],
    documentos: [...docsBasicos, "Documento do veículo (CRLV)", "Comprovante de renda"],
    infos: [
      {
        titulo: "O veículo precisa estar quitado?",
        texto:
          "Isso depende do banco. Algumas instituições aceitam veículos financiados e utilizam parte do crédito para quitar o saldo existente. Nesse caso, o valor restante é disponibilizado ao cliente.",
      },
    ],
    atencao:
      "Atenção à garantia: em caso de inadimplência, o veículo pode ser retomado e vendido para pagamento da dívida, conforme o contrato e os procedimentos legais. Por isso, é essencial escolher uma parcela que caiba no seu orçamento.",
    faq: [
      {
        pergunta: "Posso continuar usando o carro?",
        resposta: "Sim, desde que cumpra as condições do contrato. O veículo fica vinculado ao banco por alienação fiduciária até a quitação.",
      },
      {
        pergunta: "O veículo precisa estar quitado?",
        resposta:
          "Depende do banco. Algumas instituições aceitam veículos financiados e usam parte do crédito para quitar o saldo existente.",
      },
      {
        pergunta: "Existem custos além dos juros?",
        resposta: "Pode haver despesas de avaliação e registro da garantia. Todas aparecem na proposta e no CET antes da contratação.",
      },
    ],
    perfis: ["autonomo", "empreendedor", "clt", "servidor"],
  },
  {
    slug: "consorcios-cartas-de-credito",
    grupo: "servicos",
    titulo: "Consórcios e Cartas de Crédito",
    tituloCurto: "Consórcios",
    icone: "home",
    resumo: "Alternativas para planejar a compra do seu veículo ou imóvel, sem juros, com taxa de administração.",
    metaTitle: "Consórcio de Veículo e Imóvel – Cartas de Crédito",
    metaDescription:
      "Consórcios e cartas de crédito para planejar a compra de veículo ou imóvel. Orientação completa em Jaguaquara – BA e atendimento em todo o Brasil.",
    h1: "Consórcios e cartas de crédito para veículo e imóvel",
    intro:
      "O consórcio é uma forma planejada de comprar um veículo ou imóvel: não há juros, apenas taxa de administração, e a carta de crédito é liberada por sorteio ou lance. Ajudamos você a escolher o plano e o valor de carta mais adequados ao seu objetivo.",
    publico: ["Quem quer comprar veículo ou imóvel de forma planejada", "Empreendedores que querem investir no negócio"],
    comoFunciona: [
      "Você conta o seu objetivo e quanto pode pagar por mês.",
      "Apresentamos planos e valores de carta de crédito.",
      "Explicamos taxa de administração, prazos, sorteios e lances.",
      "Você escolhe o plano e fazemos a adesão.",
    ],
    vantagens: [
      { titulo: "Sem juros", texto: "Você paga taxa de administração, não juros." },
      { titulo: "Planejamento", texto: "Parcelas que cabem no orçamento até a contemplação." },
      { titulo: "Poder de compra", texto: "Carta de crédito para negociar à vista." },
    ],
    documentos: [...docsBasicos, "Comprovante de renda"],
    faq: [
      {
        pergunta: "Quando recebo a carta de crédito?",
        resposta: "Quando for contemplado, por sorteio ou por lance, conforme as regras do grupo.",
      },
    ],
    perfis: ["empreendedor", "clt", "servidor", "autonomo"],
  },
];

export const servicosConsignado = servicos.filter((s) => s.grupo === "consignado");
export const outrosServicos = servicos.filter((s) => s.grupo === "servicos");

export function hrefServico(s: Pick<Servico, "slug" | "grupo">) {
  return s.grupo === "consignado" ? `/consignado/${s.slug}` : `/servicos/${s.slug}`;
}

export function getServico(grupo: Servico["grupo"], slug: string) {
  return servicos.find((s) => s.grupo === grupo && s.slug === slug);
}

/** FAQ do serviço sempre em grupos (o FAQ simples vira um grupo sem título). */
export function gruposFaq(s: Pick<Servico, "faq" | "faqGrupos">): FaqGrupo[] {
  return s.faqGrupos ?? [{ titulo: "", itens: s.faq ?? [] }];
}

export function todasFaq(s: Pick<Servico, "faq" | "faqGrupos">): Faq[] {
  return gruposFaq(s).flatMap((g) => g.itens);
}
