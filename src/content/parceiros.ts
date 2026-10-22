// PROVISÓRIO: a agência ainda não recebeu a lista de bancos/promotoras parceiros.
// Quando chegar, substituir os itens abaixo (nome + logo em /public/parceiros) e mudar `provisorio` para false.

export const parceiros = {
  provisorio: true,
  itens: [
    { nome: "Instituição parceira 1", logo: null },
    { nome: "Instituição parceira 2", logo: null },
    { nome: "Instituição parceira 3", logo: null },
    { nome: "Instituição parceira 4", logo: null },
    { nome: "Instituição parceira 5", logo: null },
  ] as { nome: string; logo: string | null }[],
};
