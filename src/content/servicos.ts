import type { IconName } from "@/components/Icon";

export type PerfilId = "aposentado" | "servidor" | "clt" | "autonomo" | "bolsa-familia" | "empreendedor";

export type Faq = { pergunta: string; resposta: string };

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
  faq: Faq[];
  perfis: PerfilId[];
  modalidadeSimulador?: string;
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
      "Você fala com a nossa equipe pelo WhatsApp ou vem até a loja em Jaguaquara.",
      "Consultamos a margem consignável disponível no seu benefício.",
      "Apresentamos as opções, explicando parcela, prazo, taxa e custo total.",
      "Com a sua aprovação, a proposta segue para a instituição financeira.",
      "Após a aprovação, o valor é liberado na sua conta.",
    ],
    vantagens: [
      { titulo: "Taxas reguladas", texto: "O consignado INSS tem teto de juros definido pelas regras do benefício." },
      { titulo: "Sem boleto", texto: "A parcela é descontada no benefício, sem risco de esquecer o pagamento." },
      { titulo: "Atendimento presencial", texto: "Você pode resolver tudo na nossa loja, com calma e sem pressa." },
    ],
    documentos: [...docsBasicos, "Extrato ou número do benefício", "Dados da conta onde recebe o benefício"],
    faq: [
      {
        pergunta: "Quanto posso pegar no consignado INSS?",
        resposta:
          "O valor depende da sua margem consignável, a parte do benefício que pode ser comprometida com parcelas, definida em lei. Consultamos a sua margem e mostramos as opções disponíveis.",
      },
      {
        pergunta: "Beneficiário do BPC/LOAS pode fazer consignado?",
        resposta: "Sim, conforme as regras e condições disponíveis no momento. Nossa equipe verifica o seu caso.",
      },
      {
        pergunta: "Preciso ir até a loja?",
        resposta:
          "Não é obrigatório. Você pode começar pelo WhatsApp e, se preferir, finalizar o atendimento na nossa loja na Rua Avelar, nº 14, Centro de Jaguaquara.",
      },
    ],
    perfis: ["aposentado"],
    modalidadeSimulador: "inss",
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
    faq: [
      {
        pergunta: "Minha prefeitura tem convênio?",
        resposta:
          "Os convênios variam por órgão e por instituição financeira. Fale com a nossa equipe informando onde você trabalha e verificamos as opções.",
      },
      {
        pergunta: "Posso fazer portabilidade do meu consignado de servidor?",
        resposta: "Sim. Veja a nossa página de portabilidade e refinanciamento para entender como funciona.",
      },
    ],
    perfis: ["servidor"],
    modalidadeSimulador: "servidor",
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
    faq: [
      {
        pergunta: "O que é o troco do refinanciamento?",
        resposta:
          "É o valor liberado quando o novo contrato é maior que o saldo devedor do contrato antigo. A disponibilidade e o valor dependem da análise.",
      },
      {
        pergunta: "A portabilidade sempre vale a pena?",
        resposta:
          "Nem sempre. Por isso mostramos a comparação completa (parcela, prazo e custo total) antes de qualquer decisão.",
      },
    ],
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
    documentos: [...docsBasicos, "Carteira de trabalho (pode ser a digital)", "Acesso ao aplicativo FGTS, no caso da antecipação"],
    atencao:
      "Ao aderir ao saque-aniversário, em caso de demissão sem justa causa você recebe apenas a multa rescisória, não o saldo total do FGTS, e há prazo de carência para voltar ao saque-rescisão. Explicamos essas regras antes da contratação.",
    faq: [
      {
        pergunta: "Preciso ter saldo no FGTS para antecipar?",
        resposta: "Sim. O valor antecipado depende do saldo disponível e das regras da modalidade.",
      },
      {
        pergunta: "Qual é melhor: crédito CLT ou antecipação do FGTS?",
        resposta:
          "Depende do seu objetivo e do seu orçamento. Na conversa, comparamos as duas opções com números reais do seu caso.",
      },
    ],
    perfis: ["clt"],
    modalidadeSimulador: "clt",
  },
  {
    slug: "emprestimo-cartao-de-credito",
    grupo: "servicos",
    titulo: "Empréstimo no Cartão de Crédito",
    tituloCurto: "Empréstimo no cartão",
    icone: "card",
    resumo: "Transforme o limite disponível do seu cartão de crédito em dinheiro via Pix e pague parcelado na fatura.",
    metaTitle: "Empréstimo no Cartão de Crédito via Pix – Jaguaquara",
    metaDescription:
      "Use o limite do cartão de crédito para receber dinheiro via Pix e pagar parcelado na fatura. Atendimento em Jaguaquara – BA e por WhatsApp.",
    h1: "Empréstimo no cartão de crédito: limite que vira dinheiro via Pix",
    intro:
      "Tem limite disponível no cartão de crédito? Ele pode virar dinheiro na sua conta via Pix, com pagamento parcelado na fatura. É uma alternativa para quem precisa de agilidade e não tem acesso ao consignado. Mostramos o valor das parcelas e o custo total antes de você confirmar.",
    publico: ["Quem tem cartão de crédito com limite disponível", "Autônomos, CLT, aposentados e outros perfis"],
    comoFunciona: [
      "Você informa quanto precisa e o limite disponível.",
      "Simulamos as parcelas e o custo total.",
      "Com a sua confirmação, a operação é feita no cartão.",
      "O valor cai na sua conta via Pix.",
    ],
    vantagens: [
      { titulo: "Agilidade", texto: "Processo rápido e direto, com pouca burocracia." },
      { titulo: "Sem consulta à margem", texto: "Usa o limite que você já tem no cartão." },
      { titulo: "Transparência", texto: "Custo total informado antes de confirmar." },
    ],
    documentos: [...docsBasicos, "Cartão de crédito do titular"],
    faq: [
      {
        pergunta: "O valor compromete o limite do cartão?",
        resposta: "Sim. O valor contratado e os encargos ocupam o limite e são cobrados nas próximas faturas.",
      },
    ],
    perfis: ["autonomo", "clt", "aposentado", "servidor", "empreendedor"],
    modalidadeSimulador: "cartao",
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
    modalidadeSimulador: "energia",
  },
  {
    slug: "credito-bolsa-familia",
    grupo: "servicos",
    titulo: "Crédito para Beneficiários do Bolsa Família",
    tituloCurto: "Bolsa Família",
    icone: "family",
    resumo: "Opções de crédito para quem recebe o Bolsa Família. A contratação é independente do benefício.",
    metaTitle: "Crédito para quem recebe Bolsa Família – Jaguaquara",
    metaDescription:
      "Opções de crédito para beneficiários do Bolsa Família, com contratação independente do benefício. Orientação clara e atendimento humanizado em Jaguaquara – BA.",
    h1: "Crédito para beneficiários do Bolsa Família",
    intro:
      "Quem recebe o Bolsa Família também pode ter acesso a opções de crédito. Importante: a contratação é independente do benefício, que não é usado como garantia nem sofre descontos. Apresentamos as alternativas disponíveis para o seu perfil com toda a clareza.",
    publico: ["Beneficiários do Bolsa Família maiores de 18 anos"],
    comoFunciona: [
      "Você fala com a nossa equipe pelo WhatsApp ou na loja.",
      "Avaliamos quais opções estão disponíveis para o seu perfil.",
      "Explicamos parcela, prazo e custo total.",
      "Com a sua aprovação, encaminhamos a proposta.",
    ],
    vantagens: [
      { titulo: "Benefício preservado", texto: "O Bolsa Família não é descontado nem usado como garantia." },
      { titulo: "Orientação responsável", texto: "Ajudamos a avaliar se a parcela cabe no seu orçamento." },
      { titulo: "Atendimento acolhedor", texto: "Sem julgamentos, com escuta e respeito." },
    ],
    documentos: [...docsBasicos],
    atencao:
      "Crédito para beneficiários do Bolsa Família é uma contratação independente do benefício. O benefício não é consignado, não é usado como garantia e não sofre descontos.",
    faq: [
      {
        pergunta: "O valor das parcelas é descontado do Bolsa Família?",
        resposta: "Não. A contratação é independente do benefício, que não sofre nenhum desconto.",
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
    resumo: "Opções de crédito para autônomos, comerciantes e outros públicos, conforme análise.",
    metaTitle: "Crédito Pessoal para Autônomos e Comerciantes – Jaguaquara",
    metaDescription:
      "Crédito pessoal para autônomos, comerciantes e outros públicos, conforme análise. Atendimento presencial em Jaguaquara e por WhatsApp em todo o Brasil.",
    h1: "Crédito pessoal para autônomos, comerciantes e outros públicos",
    intro:
      "Nem todo mundo tem acesso ao consignado, e é aí que o crédito pessoal entra. Trabalhamos com opções para autônomos, comerciantes e outros perfis, sempre conforme análise. Explicamos tudo antes da contratação, para você decidir com tranquilidade.",
    publico: ["Autônomos", "Comerciantes", "Profissionais liberais", "Outros perfis, conforme análise"],
    comoFunciona: [
      "Você conta quanto precisa e qual é a sua renda.",
      "Buscamos as opções disponíveis para o seu perfil.",
      "Apresentamos parcela, prazo, taxa e custo total.",
      "Você aprova e encaminhamos a proposta.",
    ],
    vantagens: [
      { titulo: "Para vários perfis", texto: "Opções para quem não tem vínculo formal." },
      { titulo: "Uso livre", texto: "Use o dinheiro como precisar: contas, reforma, negócio." },
      { titulo: "Clareza", texto: "Comparação simples entre as opções." },
    ],
    documentos: [...docsBasicos, "Comprovante de renda, quando houver"],
    faq: [
      {
        pergunta: "Autônomo sem comprovante de renda consegue crédito?",
        resposta: "Depende da análise de cada instituição. Fale com a nossa equipe para verificarmos as opções do seu caso.",
      },
    ],
    perfis: ["autonomo", "empreendedor"],
    modalidadeSimulador: "pessoal",
  },
  {
    slug: "emprestimo-garantia-veiculo",
    grupo: "servicos",
    titulo: "Empréstimo com Garantia de Veículo",
    tituloCurto: "Garantia de veículo",
    icone: "car",
    resumo: "Crédito usando o seu carro ou moto como garantia, com prazos maiores. O veículo continua com você.",
    metaTitle: "Empréstimo com Garantia de Veículo – Carro ou Moto",
    metaDescription:
      "Crédito com garantia de veículo: use seu carro ou moto como garantia e continue usando normalmente. Atendimento em Jaguaquara – BA e região.",
    h1: "Empréstimo com garantia de veículo",
    intro:
      "Com o seu carro ou moto como garantia, é possível acessar valores maiores e prazos mais longos, e você continua usando o veículo normalmente. Explicamos como funciona a garantia, os custos e os prazos antes da contratação.",
    publico: ["Proprietários de carro ou moto quitado ou em condições aceitas pela instituição"],
    comoFunciona: [
      "Você informa os dados do veículo.",
      "Verificamos as condições e o valor possível.",
      "Apresentamos parcela, prazo e custo total.",
      "Após a aprovação, o valor é liberado e o veículo fica como garantia até a quitação.",
    ],
    vantagens: [
      { titulo: "Valores maiores", texto: "A garantia permite acessar valores mais altos." },
      { titulo: "Prazos longos", texto: "Parcelas mais leves para o seu orçamento." },
      { titulo: "Veículo com você", texto: "Você continua usando o carro ou a moto." },
    ],
    documentos: [...docsBasicos, "Documento do veículo (CRLV)", "Comprovante de renda"],
    faq: [
      {
        pergunta: "Posso continuar usando o carro?",
        resposta: "Sim. O veículo fica como garantia (alienação fiduciária) até a quitação, mas continua com você.",
      },
    ],
    perfis: ["autonomo", "empreendedor", "clt", "servidor"],
    modalidadeSimulador: "veiculo",
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
  {
    slug: "maquininhas-ton",
    grupo: "servicos",
    titulo: "Maquininhas Ton",
    tituloCurto: "Maquininhas Ton",
    icone: "pos",
    resumo: "Soluções para receber suas vendas no cartão com as maquininhas Ton.",
    metaTitle: "Maquininha de Cartão Ton em Jaguaquara – BA",
    metaDescription:
      "Maquininhas Ton para receber vendas no cartão de crédito, débito e Pix. Atendimento e orientação para o seu negócio em Jaguaquara e região.",
    h1: "Maquininhas Ton para receber suas vendas no cartão",
    intro:
      "Para quem vende, aceitar cartão é essencial. Oferecemos as maquininhas Ton e ajudamos você a escolher o modelo e o plano mais adequados ao volume de vendas do seu negócio.",
    publico: ["Comerciantes", "Autônomos e prestadores de serviço", "Pequenos negócios"],
    comoFunciona: [
      "Você conta como vende hoje e quanto fatura.",
      "Indicamos o modelo e o plano mais adequados.",
      "Ajudamos no pedido e na ativação.",
    ],
    vantagens: [
      { titulo: "Venda mais", texto: "Aceite crédito, débito e Pix." },
      { titulo: "Orientação local", texto: "Ajuda presencial para configurar e começar a vender." },
      { titulo: "Plano adequado", texto: "Escolha conforme o volume de vendas." },
    ],
    documentos: [...docsBasicos, "CNPJ ou CPF para cadastro"],
    faq: [
      {
        pergunta: "Preciso ter CNPJ?",
        resposta: "Não necessariamente. É possível se cadastrar com CPF, conforme as regras da Ton.",
      },
    ],
    perfis: ["empreendedor", "autonomo"],
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
