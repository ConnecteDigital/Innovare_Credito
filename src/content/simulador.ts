// PROVISÓRIO: taxas ILUSTRATIVAS, só para o protótipo do simulador.
// Substituir pelas taxas e prazos reais enviados pelo cliente e mudar `provisorio` para false.
// taxaMes = taxa de juros ao mês em %, aplicada na tabela Price.

export type Modalidade = {
  id: string;
  titulo: string;
  perfil: string;
  taxaMes: number;
  valorMin: number;
  valorMax: number;
  valorPadrao: number;
  prazos: number[];
  prazoPadrao: number;
};

export const simulador = {
  provisorio: true,
  modalidades: [
    {
      id: "inss",
      titulo: "Consignado INSS",
      perfil: "Aposentado ou pensionista",
      taxaMes: 1.8,
      valorMin: 500,
      valorMax: 50000,
      valorPadrao: 5000,
      prazos: [24, 48, 72, 84, 96],
      prazoPadrao: 84,
    },
    {
      id: "servidor",
      titulo: "Consignado Servidor",
      perfil: "Servidor público",
      taxaMes: 1.9,
      valorMin: 500,
      valorMax: 80000,
      valorPadrao: 8000,
      prazos: [24, 48, 72, 96],
      prazoPadrao: 72,
    },
    {
      id: "clt",
      titulo: "Crédito CLT",
      perfil: "Carteira assinada",
      taxaMes: 3.5,
      valorMin: 500,
      valorMax: 30000,
      valorPadrao: 3000,
      prazos: [6, 12, 24, 36, 48],
      prazoPadrao: 24,
    },
    {
      id: "pessoal",
      titulo: "Crédito pessoal",
      perfil: "Autônomo ou comerciante",
      taxaMes: 6.5,
      valorMin: 300,
      valorMax: 15000,
      valorPadrao: 2000,
      prazos: [6, 12, 18, 24],
      prazoPadrao: 12,
    },
    {
      id: "cartao",
      titulo: "Empréstimo no cartão",
      perfil: "Limite no cartão de crédito",
      taxaMes: 4.9,
      valorMin: 200,
      valorMax: 10000,
      valorPadrao: 1500,
      prazos: [3, 6, 10, 12],
      prazoPadrao: 10,
    },
    {
      id: "energia",
      titulo: "Conta de energia",
      perfil: "Titular da conta de luz",
      taxaMes: 7.5,
      valorMin: 200,
      valorMax: 3000,
      valorPadrao: 1000,
      prazos: [6, 10, 12, 18],
      prazoPadrao: 12,
    },
    {
      id: "veiculo",
      titulo: "Garantia de veículo",
      perfil: "Carro ou moto",
      taxaMes: 2.4,
      valorMin: 3000,
      valorMax: 100000,
      valorPadrao: 15000,
      prazos: [12, 24, 36, 48, 60],
      prazoPadrao: 36,
    },
  ] as Modalidade[],
};

/** Parcela pela tabela Price. */
export function calcularParcela(valor: number, taxaMes: number, prazo: number) {
  const i = taxaMes / 100;
  if (i === 0) return valor / prazo;
  return (valor * i) / (1 - Math.pow(1 + i, -prazo));
}
