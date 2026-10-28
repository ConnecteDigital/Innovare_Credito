// Perguntas enviadas pela cliente (Obs_Site.docx); respostas redigidas pela agência.
// Regra das respostas: sem prometer valores, taxas ou prazos (variam por instituição) e sempre
// lembrando que a proposta é explicada antes da contratação. Revisar com a cliente antes de publicar.

export type Faq = { pergunta: string; resposta: string };
export type FaqGrupo = { titulo: string; itens: Faq[] };

export const faqInss: FaqGrupo[] = [
  {
    titulo: "Sobre valores e custos",
    itens: [
      {
        pergunta: "Quanto posso contratar com a minha margem disponível?",
        resposta:
          "Depende da sua margem consignável, a parte do benefício que pode ser comprometida com parcelas, nos limites definidos pelas regras do INSS. Consultamos a margem disponível no seu benefício e mostramos quanto é possível contratar em cada prazo.",
      },
      {
        pergunta: "Qual valor será depositado na minha conta?",
        resposta:
          "Na simulação mostramos o valor líquido, ou seja, o que realmente cai na sua conta. Se houver portabilidade ou refinanciamento envolvidos, explicamos quanto vai para quitar o contrato antigo e quanto sobra para você.",
      },
      {
        pergunta: "Qual é a taxa de juros mensal e anual?",
        resposta:
          "A taxa varia conforme a instituição financeira e o prazo, sempre respeitando o teto de juros definido para o consignado INSS. Informamos a taxa ao mês e ao ano na proposta, antes de qualquer decisão.",
      },
      {
        pergunta: "Qual é o Custo Efetivo Total (CET), incluindo todos os encargos?",
        resposta:
          "O CET reúne juros, impostos (como o IOF) e outros encargos do contrato, quando houver. É o número mais importante para comparar propostas, e ele é apresentado junto com a simulação.",
      },
      {
        pergunta: "Quanto vou pagar no total até terminar o empréstimo?",
        resposta:
          "Mostramos o total a pagar, que é o valor da parcela multiplicado pelo número de parcelas. Assim você enxerga o custo do empréstimo do começo ao fim, e não apenas a parcela.",
      },
    ],
  },
  {
    titulo: "Sobre as parcelas",
    itens: [
      {
        pergunta: "Qual será o valor descontado do meu benefício por mês?",
        resposta:
          "É o valor da parcela informado na proposta. Ele é fixo durante todo o contrato e descontado automaticamente do benefício, sem boleto.",
      },
      {
        pergunta: "Em quantas parcelas vou pagar?",
        resposta:
          "Você escolhe o prazo dentro do limite permitido pelas regras do INSS e pela instituição financeira. Prazos maiores deixam a parcela menor, mas aumentam o total pago. Mostramos as duas coisas para você decidir.",
      },
      {
        pergunta: "Quando será descontada a primeira parcela?",
        resposta:
          "Depende da data de averbação do contrato no INSS. Em geral, o primeiro desconto acontece em um dos pagamentos seguintes do benefício. Informamos a previsão no momento da contratação.",
      },
      {
        pergunta: "Quanto vai sobrar do meu benefício depois dos descontos?",
        resposta:
          "Fazemos essa conta com você: valor do benefício menos as parcelas de todos os consignados. Nosso objetivo é que a parcela caiba no seu orçamento, sem apertar as despesas do mês.",
      },
    ],
  },
  {
    titulo: "Sobre a contratação",
    itens: [
      {
        pergunta: "Qual banco está oferecendo o empréstimo?",
        resposta:
          "O nome da instituição financeira aparece na proposta e no contrato. Trabalhamos com bancos parceiros e você sabe exatamente com qual está contratando antes de assinar.",
      },
      {
        pergunta: "É um empréstimo consignado ou um cartão consignado?",
        resposta:
          "São produtos diferentes. No empréstimo consignado você recebe um valor e paga em parcelas fixas. O cartão consignado e o cartão benefício funcionam como cartão de crédito com desconto mínimo no benefício. Deixamos claro, por escrito, qual produto está sendo oferecido.",
      },
      {
        pergunta: "Quais documentos preciso apresentar?",
        resposta:
          "Normalmente: documento oficial com foto, CPF, comprovante de residência, número do benefício e dados da conta onde você recebe. A instituição pode pedir outros documentos conforme o caso.",
      },
      {
        pergunta: "Preciso desbloquear meu benefício para contratar?",
        resposta:
          "Benefícios novos costumam vir bloqueados para empréstimo. O desbloqueio é feito pelo próprio titular, no aplicativo ou site Meu INSS, depois do prazo previsto nas regras. Também pode ser exigida validação por biometria. Nossa equipe orienta você em cada etapa.",
      },
      {
        pergunta: "Existe seguro ou algum serviço adicional? É opcional?",
        resposta:
          "Qualquer seguro ou serviço adicional precisa ser opcional e informado antes da contratação. Você não é obrigado a contratar nada além do empréstimo, e mostramos se o valor está incluído ou não na proposta.",
      },
      {
        pergunta: "Posso receber a proposta e uma cópia do contrato para conferir?",
        resposta:
          "Sim. Você pode receber a simulação e o contrato para conferir com calma antes de decidir, inclusive pelo WhatsApp.",
      },
    ],
  },
  {
    titulo: "Sobre outras possibilidades",
    itens: [
      {
        pergunta: "Posso quitar antecipadamente? Como fica o desconto dos juros?",
        resposta:
          "Sim. A quitação antecipada é um direito, total ou parcial, com redução proporcional dos juros das parcelas que ainda não venceram. Ajudamos você a solicitar o saldo devedor atualizado.",
      },
      {
        pergunta: "Se eu fizer portabilidade, qual será a economia?",
        resposta:
          "A economia depende da diferença entre a taxa do contrato atual e a da nova proposta. Mostramos lado a lado parcela, prazo e total a pagar de cada um para você ver se vale a pena.",
      },
      {
        pergunta: "Se houver refinanciamento com “troco”, quanto recebo e como mudam o prazo e o custo total?",
        resposta:
          "O troco é a diferença entre o novo contrato e o saldo que você ainda deve. Em geral o prazo recomeça, o que pode aumentar o total pago. Por isso mostramos troco, novo prazo e custo total juntos.",
      },
      {
        pergunta: "Como funciona o cancelamento se eu desistir da contratação?",
        resposta:
          "Existe um prazo de arrependimento, em geral de 7 dias após a contratação, conforme as regras aplicáveis. Nesse caso o valor recebido precisa ser devolvido. Explicamos o procedimento da instituição antes de você assinar.",
      },
      {
        pergunta: "Qual canal devo procurar se houver algum desconto diferente do combinado?",
        resposta:
          "Fale primeiro com a nossa equipe, que ajuda a verificar o contrato. Você também pode acionar o banco, a ouvidoria da instituição, a Central 135 ou o Meu INSS e o consumidor.gov.br.",
      },
    ],
  },
];

export const notaInss =
  "Antes de decidir, peça uma simulação com valor líquido, parcela, prazo, taxa de juros, CET e total a pagar.";

export const faqServidores: FaqGrupo[] = [
  {
    titulo: "Quem pode contratar",
    itens: [
      {
        pergunta: "Sou servidor municipal, estadual ou federal. Vocês atendem meu órgão?",
        resposta:
          "Atendemos servidores das três esferas, conforme os convênios disponíveis entre o seu órgão e as instituições financeiras parceiras. Informe onde você trabalha e verificamos as opções.",
      },
      {
        pergunta: "Meu vínculo é efetivo, comissionado ou temporário. Posso contratar?",
        resposta:
          "Servidores efetivos têm mais opções. Para comissionados e temporários, a possibilidade depende das regras do convênio e da instituição. Avaliamos o seu caso.",
      },
      {
        pergunta: "Quem está com o nome negativado pode solicitar uma análise?",
        resposta:
          "Pode. Como as parcelas são descontadas em folha, o consignado costuma ter uma análise diferente da do crédito comum. A aprovação depende da instituição financeira.",
      },
      {
        pergunta: "Já tenho consignado. Posso contratar outro?",
        resposta:
          "Sim, desde que ainda exista margem consignável disponível. Também é possível avaliar portabilidade ou refinanciamento dos contratos atuais.",
      },
    ],
  },
  {
    titulo: "Margem, valores e custos",
    itens: [
      {
        pergunta: "Como consulto minha margem consignável disponível?",
        resposta:
          "A margem aparece no contracheque ou no portal do servidor do seu órgão. Se preferir, nossa equipe faz a consulta com a sua autorização.",
      },
      {
        pergunta: "Quanto posso pegar emprestado e quanto receberei na conta?",
        resposta:
          "Depende da sua margem, do prazo e da taxa do convênio. Na simulação mostramos o valor total do contrato e o valor líquido que cai na sua conta.",
      },
      {
        pergunta: "Qual será o valor da parcela descontada no meu contracheque?",
        resposta:
          "É o valor informado na proposta, fixo durante todo o contrato, e precisa caber na sua margem disponível.",
      },
      {
        pergunta: "Qual é a taxa de juros mensal e anual?",
        resposta:
          "Varia conforme o convênio, a instituição e o prazo. Informamos a taxa ao mês e ao ano na proposta, antes da contratação.",
      },
      {
        pergunta: "Qual é o Custo Efetivo Total — CET — e quanto pagarei ao final?",
        resposta:
          "O CET reúne juros, impostos e encargos do contrato. Mostramos o CET e o total a pagar junto com a simulação.",
      },
    ],
  },
  {
    titulo: "Parcelas e contratação",
    itens: [
      {
        pergunta: "Em quantas vezes posso parcelar?",
        resposta:
          "O prazo máximo é definido pelo convênio do seu órgão e pela instituição financeira. Mostramos as opções de prazo disponíveis para você.",
      },
      {
        pergunta: "Quando começa o desconto da primeira parcela?",
        resposta:
          "Depende da data de corte da folha de pagamento do seu órgão. Em geral, o primeiro desconto acontece em um dos contracheques seguintes à averbação.",
      },
      {
        pergunta: "Quais documentos preciso apresentar?",
        resposta:
          "Normalmente: documento com foto, CPF, comprovante de residência, último contracheque e dados bancários. O convênio pode exigir outros documentos.",
      },
      {
        pergunta: "Preciso autorizar a consulta ou liberar a contratação no portal do servidor?",
        resposta:
          "Em muitos órgãos, sim. O servidor autoriza a consulta de margem ou aprova a operação no portal ou aplicativo do próprio órgão. Orientamos você no passo a passo.",
      },
      {
        pergunta: "Existe seguro ou serviço adicional? A contratação é opcional?",
        resposta:
          "Qualquer seguro ou serviço adicional deve ser opcional e informado antes da contratação. Você decide se quer ou não.",
      },
      {
        pergunta: "Em quanto tempo o dinheiro pode ser liberado após a aprovação?",
        resposta:
          "Depende da averbação no órgão e dos prazos da instituição. Informamos a previsão no momento da proposta, sem prometer o que não depende de nós.",
      },
      {
        pergunta: "Posso receber a simulação e o contrato para conferir antes de decidir?",
        resposta: "Sim. Enviamos a simulação e o contrato para você conferir com calma antes de assinar.",
      },
    ],
  },
  {
    titulo: "Outras possibilidades",
    itens: [
      {
        pergunta: "Posso fazer portabilidade para conseguir condições melhores?",
        resposta:
          "Sim. A portabilidade é um direito: você pode levar o contrato para outra instituição com condições melhores. Comparamos as propostas para você.",
      },
      {
        pergunta: "No refinanciamento, posso receber um “troco”? Como ficam o prazo e o custo total?",
        resposta:
          "Pode, conforme análise. O troco é a diferença entre o novo contrato e o saldo devedor. O prazo costuma recomeçar, então mostramos também o novo prazo e o custo total.",
      },
      {
        pergunta: "Posso quitar antecipadamente com redução dos juros futuros?",
        resposta:
          "Sim. A quitação antecipada, total ou parcial, dá direito à redução proporcional dos juros das parcelas que ainda vão vencer.",
      },
      {
        pergunta: "O que acontece com as parcelas se eu sair do cargo ou me aposentar?",
        resposta:
          "Se você se aposentar, o desconto pode passar para o benefício, conforme as regras do regime e do contrato. Se sair do cargo, a forma de pagamento do saldo é definida no contrato. Explicamos essas condições antes da contratação.",
      },
    ],
  },
];

export const faqPortabilidade: FaqGrupo[] = [
  {
    titulo: "Sobre portabilidade",
    itens: [
      {
        pergunta: "O que é portabilidade e como funciona?",
        resposta:
          "É a transferência do seu consignado para outra instituição que ofereça condições melhores. O novo banco quita o contrato antigo e você passa a pagar a ele, com a nova taxa.",
      },
      {
        pergunta: "Posso transferir meu empréstimo para outro banco?",
        resposta:
          "Sim. A portabilidade de crédito é um direito garantido pelas regras do Banco Central. Basta haver uma proposta de outra instituição e a sua concordância.",
      },
      {
        pergunta: "A taxa de juros vai diminuir?",
        resposta:
          "Esse é o objetivo. Só recomendamos a portabilidade quando a nova taxa ou as novas condições forem realmente vantajosas para você.",
      },
      {
        pergunta: "Minha parcela fica menor?",
        resposta:
          "Pode ficar, mantendo o prazo, ou pode continuar igual com um prazo menor ou com troco. Mostramos as opções para você escolher.",
      },
      {
        pergunta: "Preciso ter pago quantas parcelas para solicitar?",
        resposta:
          "Depende das regras do benefício e da instituição que vai receber o contrato. Algumas exigem um número mínimo de parcelas pagas. Verificamos o seu caso.",
      },
      {
        pergunta: "Existe algum custo para fazer a portabilidade?",
        resposta:
          "A portabilidade em si não tem custo para você. Os custos que importam estão no novo contrato (juros e CET), e eles são apresentados antes da decisão.",
      },
      {
        pergunta: "Preciso mudar a conta em que recebo meu benefício?",
        resposta: "Não. Você continua recebendo o benefício na mesma conta; o desconto apenas passa a ser feito para o novo banco.",
      },
      {
        pergunta: "Quanto tempo demora para concluir?",
        resposta:
          "Normalmente alguns dias úteis, entre a aceitação da proposta, a quitação do contrato antigo e a averbação do novo. Acompanhamos todo o processo.",
      },
      {
        pergunta: "O banco atual pode impedir a transferência?",
        resposta:
          "Não. Ele pode fazer uma contraproposta para tentar manter você, mas não pode impedir a portabilidade.",
      },
    ],
  },
  {
    titulo: "Sobre refinanciamento e “troco”",
    itens: [
      {
        pergunta: "O que é refinanciar meu consignado?",
        resposta:
          "É fazer um novo contrato que quita o atual. Isso pode liberar um valor adicional (o troco), mudar a taxa ou alterar o prazo.",
      },
      {
        pergunta: "Quanto posso receber de troco?",
        resposta:
          "Depende do saldo que você ainda deve, da margem, da taxa e do novo prazo. Simulamos o valor exato para o seu contrato.",
      },
      {
        pergunta: "Consigo receber um valor sem aumentar minha parcela?",
        resposta:
          "Muitas vezes sim, mas em geral isso significa pagar por mais tempo. Por isso mostramos também o novo prazo e o custo total.",
      },
      {
        pergunta: "O prazo do empréstimo vai aumentar?",
        resposta: "Normalmente sim, porque o novo contrato começa a contar do zero. Você vê o novo prazo antes de decidir.",
      },
      {
        pergunta: "Vou começar a pagar tudo novamente?",
        resposta:
          "Você passa a pagar o novo contrato, que inclui o saldo do antigo e o troco recebido. As parcelas já pagas não são perdidas: elas reduziram o saldo que foi quitado.",
      },
      {
        pergunta: "Preciso ter margem disponível para refinanciar?",
        resposta:
          "Não necessariamente. O refinanciamento usa a parcela que você já paga. Se houver margem livre, pode ser possível liberar um valor maior.",
      },
      {
        pergunta: "Posso refinanciar mais de um contrato?",
        resposta: "Sim, conforme análise. É possível avaliar cada contrato separadamente ou juntar mais de um.",
      },
      {
        pergunta: "Posso fazer portabilidade e depois refinanciar?",
        resposta:
          "Sim. Muitas vezes as duas operações são feitas em sequência: primeiro a portabilidade para melhorar a taxa e depois o refinanciamento para liberar o troco, conforme as regras do banco.",
      },
      {
        pergunta: "O troco cai na conta em quanto tempo?",
        resposta: "Depois da aprovação e da averbação do novo contrato. Informamos a previsão no momento da proposta.",
      },
    ],
  },
  {
    titulo: "Sobre custos e segurança",
    itens: [
      {
        pergunta: "Qual será a nova taxa de juros e o Custo Efetivo Total — CET?",
        resposta: "Ambos são informados na proposta, antes de qualquer decisão, para você comparar com o contrato atual.",
      },
      {
        pergunta: "Quanto ainda devo no contrato atual?",
        resposta:
          "Consultamos o saldo devedor atualizado do seu contrato. Ele é a base para calcular a portabilidade e o troco.",
      },
      {
        pergunta: "Quanto pagarei no total no novo contrato?",
        resposta: "Mostramos o total a pagar do novo contrato ao lado do que falta pagar no atual, para a comparação ficar clara.",
      },
      {
        pergunta: "Pode haver dois descontos no meu benefício durante a troca?",
        resposta:
          "Por um curto período, pode acontecer de um desconto do contrato antigo coincidir com o novo, por causa das datas de averbação. Quando isso ocorre, o valor é ajustado ou devolvido conforme o procedimento do banco. Acompanhamos o processo com você.",
      },
      {
        pergunta: "Preciso desbloquear o benefício ou fazer biometria?",
        resposta:
          "Dependendo do caso, sim. O INSS e os bancos podem exigir confirmação por biometria e o benefício precisa estar liberado para a operação. Orientamos você no passo a passo.",
      },
      {
        pergunta: "Como acompanho a operação e confirmo que o contrato antigo foi quitado?",
        resposta:
          "Você pode conferir no extrato de empréstimos do Meu INSS ou no contracheque. Nossa equipe também acompanha e confirma a quitação com você.",
      },
      {
        pergunta: "Posso receber uma comparação por escrito antes de decidir?",
        resposta: "Sim. Enviamos a comparação entre o contrato atual e a nova proposta por escrito, inclusive pelo WhatsApp.",
      },
    ],
  },
];

export const notaPortabilidade =
  "A dúvida mais comum no atendimento é: “Quanto recebo de troco e minha parcela continua igual?”. Na Innovare, a simulação mostra também como ficam o prazo e o custo total, porque manter o valor da parcela pode significar pagar por mais tempo.";

export const faqCltFgts: FaqGrupo[] = [
  {
    titulo: "Antecipação do saque-aniversário FGTS",
    itens: [
      {
        pergunta: "Como funciona a antecipação? É um empréstimo?",
        resposta:
          "Sim, é uma operação de crédito. O banco adianta parcelas futuras do seu saque-aniversário e, a cada ano, recebe esses valores direto da sua conta do FGTS. Você não paga parcelas mensais.",
      },
      {
        pergunta: "Quanto posso receber com o saldo que tenho?",
        resposta:
          "Depende do saldo, de quantos saques anuais serão antecipados e da taxa. Fazemos a simulação com o seu saldo real.",
      },
      {
        pergunta: "Qual é o saldo mínimo necessário para contratar?",
        resposta: "Cada instituição define um valor mínimo. Consultamos o seu saldo e informamos se ele atende às regras.",
      },
      {
        pergunta: "Preciso aderir ao saque-aniversário antes de solicitar?",
        resposta: "Sim. A adesão é feita pelo aplicativo FGTS, e a antecipação só é possível depois dela.",
      },
      {
        pergunta: "Após aderir, quanto tempo preciso esperar para antecipar?",
        resposta:
          "As regras podem prever um prazo entre a adesão e a contratação, e esse prazo pode mudar. Verificamos as regras vigentes no momento do seu atendimento.",
      },
      {
        pergunta: "Quem está negativado pode contratar?",
        resposta:
          "Em geral sim, porque a garantia é o próprio saldo do FGTS. Ainda assim, a aprovação depende da análise da instituição.",
      },
      {
        pergunta: "Quem está desempregado pode antecipar?",
        resposta: "Pode, se tiver saldo no FGTS e tiver aderido ao saque-aniversário. O que conta é o saldo disponível.",
      },
      {
        pergunta: "Posso usar o saldo de empregos anteriores?",
        resposta: "Sim. O saque-aniversário considera o saldo de todas as suas contas do FGTS, ativas e inativas.",
      },
      {
        pergunta: "Quantos saques anuais posso antecipar?",
        resposta:
          "Depende das regras vigentes e da instituição. Mostramos quantos anos podem ser antecipados no seu caso e quanto isso representa.",
      },
      {
        pergunta: "Qual é a taxa de juros e o Custo Efetivo Total — CET?",
        resposta: "A taxa e o CET são informados na simulação, antes da contratação.",
      },
      {
        pergunta: "Quanto será depositado na minha conta após os custos?",
        resposta: "Mostramos o valor líquido, ou seja, o que você recebe depois dos juros e do IOF.",
      },
      {
        pergunta: "Vou pagar alguma parcela por mês?",
        resposta: "Não. O pagamento sai direto do seu FGTS, uma vez por ano, nas datas do saque-aniversário.",
      },
      {
        pergunta: "Quanto do meu FGTS ficará bloqueado como garantia?",
        resposta:
          "Fica bloqueado o valor correspondente aos saques anuais antecipados, até que cada um seja pago. O restante continua normalmente na sua conta.",
      },
      {
        pergunta: "Por que o valor disponível para antecipar é menor que meu saldo?",
        resposta:
          "Porque cada saque anual é apenas uma parte do saldo, calculada por faixas, e porque são descontados juros e IOF. Explicamos a conta na simulação.",
      },
      {
        pergunta: "Já antecipei antes. Posso fazer uma nova contratação?",
        resposta:
          "Pode ser possível, se houver anos ainda não antecipados ou saldo livre. Verificamos a sua situação no aplicativo FGTS.",
      },
      {
        pergunta: "Como autorizo o banco a consultar meu saldo no aplicativo FGTS?",
        resposta:
          "No aplicativo FGTS, na área de autorizações, você permite que a instituição consulte o saldo. Nossa equipe mostra o passo a passo.",
      },
      {
        pergunta: "Em quanto tempo recebo após a aprovação?",
        resposta: "Costuma ser rápido, mas depende da instituição. Informamos a previsão na proposta.",
      },
      {
        pergunta: "Preciso pagar algum valor antecipado para liberar o dinheiro?",
        resposta:
          "Não. Nenhuma cobrança antecipada é necessária para liberar crédito. Desconfie de quem pedir qualquer depósito.",
      },
      {
        pergunta: "Se eu for demitido, como ficam meu saldo e o empréstimo?",
        resposta:
          "No saque-aniversário, em caso de demissão sem justa causa você recebe a multa rescisória, mas não o saldo total. O valor antecipado continua bloqueado como garantia até ser pago.",
      },
      {
        pergunta: "Continuarei recebendo algum valor no mês do meu aniversário?",
        resposta:
          "Enquanto os anos antecipados estiverem sendo pagos, o valor do saque vai para o banco. Depois disso, você volta a receber normalmente.",
      },
      {
        pergunta: "Posso quitar o empréstimo antes do prazo e desbloquear meu saldo?",
        resposta: "Sim. A quitação antecipada é possível, com redução proporcional dos juros, e libera o saldo que estava bloqueado.",
      },
      {
        pergunta: "Posso voltar para o saque-rescisão enquanto tenho antecipação ativa?",
        resposta:
          "Você pode solicitar a volta, mas existe um prazo de carência e os valores antecipados continuam bloqueados até a quitação.",
      },
      {
        pergunta: "Por que minha solicitação foi recusada ou aparece saldo bloqueado?",
        resposta:
          "Pode ser falta de adesão ao saque-aniversário, autorização não concedida no aplicativo, saldo insuficiente ou uma antecipação já ativa. Ajudamos você a identificar o motivo.",
      },
      {
        pergunta: "Posso receber uma simulação antes de decidir?",
        resposta: "Sim. A simulação é sem compromisso, e você só contrata se fizer sentido para você.",
      },
    ],
  },
  {
    titulo: "Consignado CLT — Crédito do Trabalhador: quem pode contratar",
    itens: [
      {
        pergunta: "Quem tem carteira assinada pode solicitar?",
        resposta: "Sim. O crédito é voltado a trabalhadores com carteira assinada, conforme as regras do programa e da instituição.",
      },
      {
        pergunta: "Preciso ter quanto tempo na empresa atual?",
        resposta: "Cada instituição define um tempo mínimo de vínculo. Verificamos as opções para o seu tempo de empresa.",
      },
      {
        pergunta: "Estou no período de experiência. Posso contratar?",
        resposta: "Depende da instituição. Algumas exigem que o período de experiência já tenha terminado.",
      },
      {
        pergunta: "Quem está negativado pode solicitar?",
        resposta:
          "Pode solicitar a análise. Como o desconto é feito em folha, a análise costuma ser diferente da do crédito comum, mas a aprovação não é garantida.",
      },
      {
        pergunta: "Empregados domésticos, rurais e funcionários de MEI podem contratar?",
        resposta: "Em regra, sim, desde que tenham vínculo formal registrado. As condições dependem da instituição.",
      },
      {
        pergunta: "Minha empresa precisa ter convênio com o banco?",
        resposta:
          "No Crédito do Trabalhador, a contratação é feita pelos canais oficiais e não depende de um convênio específico da empresa. O desconto é processado na folha de pagamento.",
      },
    ],
  },
  {
    titulo: "Consignado CLT — Crédito do Trabalhador: valores e pagamento",
    itens: [
      {
        pergunta: "Quanto posso pegar emprestado?",
        resposta: "Depende do seu salário, da margem consignável disponível e da análise da instituição.",
      },
      {
        pergunta: "Como consulto minha margem disponível?",
        resposta: "A margem pode ser consultada nos canais oficiais, como a Carteira de Trabalho Digital. Nossa equipe orienta você.",
      },
      {
        pergunta: "Qual será o valor da parcela?",
        resposta: "É o valor informado na proposta, fixo e dentro da sua margem.",
      },
      {
        pergunta: "Qual é a taxa de juros e o Custo Efetivo Total — CET?",
        resposta: "A taxa e o CET são informados na proposta, antes da contratação.",
      },
      {
        pergunta: "Em quantas vezes posso pagar?",
        resposta: "O prazo depende das regras do programa e da instituição. Mostramos as opções disponíveis.",
      },
      {
        pergunta: "Quanto vou receber na conta e quanto pagarei no total?",
        resposta: "Mostramos o valor líquido que cai na conta e o total a pagar na simulação.",
      },
      {
        pergunta: "As parcelas são descontadas diretamente do salário?",
        resposta: "Sim. O desconto é feito na folha de pagamento, todo mês.",
      },
      {
        pergunta: "Quando começa o primeiro desconto?",
        resposta: "Depende da data de fechamento da folha da sua empresa. Informamos a previsão na contratação.",
      },
    ],
  },
];

export const faqMicrocredito: FaqGrupo[] = [
  {
    titulo: "Sobre o Microcrédito Itaú",
    itens: [
      {
        pergunta: "Quem pode solicitar o Microcrédito Itaú?",
        resposta:
          "Comerciantes e prestadores de serviço que querem investir no próprio negócio. Não é preciso ter CNPJ. A aprovação depende da análise do Itaú.",
      },
      {
        pergunta: "Quais são os valores e prazos?",
        resposta: "Valores de R$ 400 a R$ 21.000, com pagamento em até 15 parcelas, conforme análise.",
      },
      {
        pergunta: "Atendem em qualquer cidade?",
        resposta:
          "Não. O Microcrédito Itaú é oferecido apenas no atendimento regional da Innovare, em Jaguaquara e cidades da região.",
      },
      {
        pergunta: "A Innovare é correspondente do Itaú?",
        resposta:
          "Sim. Atuamos como correspondente autorizado do Banco Itaú, oferecendo orientação e acompanhamento durante a solicitação. O crédito é concedido pelo Itaú.",
      },
      {
        pergunta: "Para que posso usar o dinheiro?",
        resposta: "Para o seu negócio: comprar mercadorias, renovar equipamentos ou reforçar o capital de giro.",
      },
    ],
  },
];
