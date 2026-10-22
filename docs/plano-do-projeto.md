# Plano do projeto — Site Innovare Soluções em Crédito

Status: **rascunho para validação** com a agência/cliente.

## 1. Leitura estratégica

- **Modelo de negócio:** a Innovare intermedeia crédito (correspondente/promotora). O site precisa deixar claro *quem* concede o crédito e que tudo passa por análise.
- **Público principal:** aposentados e pensionistas do INSS (incluindo BPC/LOAS), servidores públicos, beneficiários do Bolsa Família, CLT, autônomos e comerciantes de Jaguaquara e região. Usam muito o celular, a maioria Android simples, e o WhatsApp é o canal principal.
- **O que isso muda no design:** o "futurista" vem do acabamento visual (profundidade, luz, movimento), nunca da complexidade. Letras grandes, contraste alto, um botão de WhatsApp sempre à vista, carregamento rápido no 4G e animações que respeitam `prefers-reduced-motion`.
- **SEO:** crédito é tema **YMYL** para o Google, que exige mais confiança do site. Para mostrar experiência e confiabilidade (E-E-A-T): CNPJ e endereço visíveis, loja física, fotos reais, avaliações do Google, textos únicos por página e páginas legais completas.

## 2. Arquitetura de páginas (proposta)

```
/                                      Home
/sobre                                 Quem somos, missão, visão, valores, loja
/consignado                            Página-destaque (pedido do cliente)
  /consignado/inss                     Aposentados, pensionistas, BPC/LOAS
  /consignado/servidores-publicos      Municipais e estaduais
  /consignado/portabilidade-refinanciamento
/servicos                              Hub de todos os serviços
  /servicos/emprestimo-cartao-de-credito
  /servicos/credito-conta-de-energia
  /servicos/credito-bolsa-familia
  /servicos/clt-e-fgts                 CLT + saque-aniversário (agrupados)
  /servicos/credito-pessoal
  /servicos/emprestimo-garantia-veiculo
  /servicos/consorcios-cartas-de-credito
  /servicos/maquininhas-ton
/cidades                               Hub de cidades atendidas
  /cidades/[cidade]                    Uma por cidade (texto único)
  /cidades/[cidade]/consignado-inss    Só para os serviços de maior busca
/blog  /blog/[artigo]                  Conteúdo orgânico (fase 2)
/faq
/contato
/politica-de-privacidade  /termos-de-uso
```

**Combinação cidade × serviço:** 12 serviços × N cidades geraria centenas de páginas quase iguais, e o Google penaliza conteúdo raso. A proposta é cruzar cidades apenas com os 2 ou 3 serviços de maior busca (Consignado INSS, Servidores, FGTS/CLT) e ampliar conforme os dados do Search Console.

**Cidades candidatas** (raio de Jaguaquara, a validar com o cliente): Jaguaquara, Itiruçu, Itaquara, Santa Inês, Lafaiete Coutinho, Jitaúna, Cravolândia, Irajuba, Planaltino, Lajedo do Tabocal, Maracás, Wenceslau Guimarães, Ubaíra, Jequié.

## 3. Direção visual — "futurista institucional"

Base nas cores da marca: fundo marinho `#082343`, luz em azul `#1768B3`, energia em laranja `#F28A2B`.

Referência principal aprovada pela agência: **uy3.com.br** (menu e animações). Análise técnica em
[referencias-visuais.md](referencias-visuais.md).

Ideias para discutir:

1. **Hero com "rede de conexões":** partículas e linhas finas em azul que se ligam ao redor do título. Representa "conectamos você ao crédito certo" e reage ao mouse ou ao toque. Leve (canvas/WebGL simples), com fallback estático.
2. **Glassmorphism + bordas de luz:** cards de serviço com vidro fosco e uma borda em gradiente azul→laranja que acende no hover.
3. **Seletor "Qual é o seu perfil?":** aposentado, servidor, CLT, autônomo ou Bolsa Família. Ao escolher, a página destaca as modalidades daquele perfil. Personaliza sem formulário longo.
4. **"Como funciona" com scroll:** linha de luz que percorre os passos (conversa no WhatsApp → análise → proposta explicada → contratação).
5. **Mapa da região estilizado:** as cidades atendidas "acendem" em sequência.
6. **Números animados:** contadores (anos, atendimentos, cidades). Só com dados reais do cliente.
7. **Simulador (opcional):** parcela estimada com animação, CET exibido e aviso "valores ilustrativos, sujeitos à análise". Depende das regras do cliente.
8. **Microinterações:** botão de WhatsApp com "pulso", transições suaves entre páginas e texto revelado no scroll.

## 4. Stack técnica

- **Next.js (App Router) + TypeScript**, páginas estáticas (SSG): rápido e ótimo para SEO.
- **Tailwind CSS** com design tokens nas cores da marca.
- **Motion (Framer Motion)** para microinterações. **GSAP/ScrollTrigger** ou canvas leve para o hero e o scroll.
- **Conteúdo em arquivos de dados** (`content/servicos`, `content/cidades`). Nova cidade ou serviço = um arquivo novo, e a página é gerada com metadados, schema e sitemap.
- **SEO técnico:** metadados por página, Open Graph, `sitemap.xml`, `robots.txt`, canonical, breadcrumbs, schema.org (`FinancialService`/`LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`).
- **Medição:** GA4 + Google Tag Manager, eventos de clique no WhatsApp, Search Console.
- **Hospedagem:** Vercel (já conectada), com preview a cada alteração para aprovação.

## 5. Fases

| Fase | Entrega |
|---|---|
| 0. Insumos | Pendências da seção 7 respondidas |
| 1. Arquitetura e conteúdo | Sitemap final, palavras-chave por página, textos (home, consignado, serviços, sobre, FAQ) |
| 2. Design system + protótipo | Tokens, componentes e **home navegável** no preview da Vercel |
| 3. Desenvolvimento | Consignado, serviços, cidades, sobre, contato, FAQ, páginas legais |
| 4. SEO técnico e medição | Schema, sitemap, GA4/GTM, Search Console, alinhamento com o Google Meu Negócio |
| 5. QA e lançamento | Lighthouse ≥ 90, acessibilidade (WCAG AA), testes em celular, domínio e redirecionamentos |
| 6. Pós-lançamento | Blog, novas páginas de cidade conforme dados, estratégia de avaliações no Google |

## 6. Pontos de atenção (compliance)

- **Correspondente bancário:** se for o caso, a regulação exige identificar as instituições financeiras contratantes. Precisamos da lista de bancos/promotoras parceiros.
- **Bolsa Família:** o consignado vinculado ao benefício é proibido. Manter o texto do cliente ("contratação independente do benefício") e revisar a copy com cuidado. Esse tema também tem restrições no Google Ads e na Meta.
- **Sem promessas:** nada de "aprovação garantida", "sem consulta" ou "dinheiro na hora". Sempre "sujeito à análise".
- **CET:** se houver simulação ou exemplo de valores, mostrar taxa, prazo e custo efetivo total.
- **Marcas de terceiros:** INSS, Ton e a distribuidora de energia (Coelba/Neoenergia) só como referência textual, sem sugerir parceria oficial não comprovada.
- **LGPD:** política de privacidade, aviso de cookies e consentimento em formulários.
- **Imagens:** a capa da apresentação é gerada por IA. No site, usar fotos reais ou deixar claro que a imagem é ilustrativa.

## 7. Pendências para o cliente

1. **Logo em vetor** (SVG/AI/PDF) e variações. Manual de marca/fonte, se houver.
2. **Fotos reais:** fachada, interior da loja, equipe, Eri Cerqueira.
3. **Bancos/promotoras parceiros** e se a empresa é correspondente bancário.
4. **Validação** de missão, visão e valores (estão como "proposta").
5. **Cidades atendidas** (confirmar a lista da seção 2) e forma de atendimento em cada uma.
6. **Link do Google Meu Negócio**, horário de funcionamento, e-mail, Instagram/Facebook.
7. **Domínio:** já existe? Há site antigo no ar?
8. **Números reais** para os contadores: ano de início, clientes atendidos etc.
9. **Depoimentos** de clientes (com autorização) ou permissão para exibir avaliações do Google.
10. **Simulador:** querem? Se sim, quais faixas de taxa/prazo podem ser exibidas.
11. **Consignado:** uma página para INSS e Servidores juntos ou uma para cada (proposta: hub + subpáginas)?
12. **Anúncios pagos** previstos (Google/Meta)? Isso define o tracking e as páginas de destino.
