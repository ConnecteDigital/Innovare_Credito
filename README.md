# Innovare Soluções em Crédito — Site institucional

Site institucional com SEO local para a Innovare Soluções em Crédito (Jaguaquara – BA).
Domínio: **innovarecredito.com.br**

- [Briefing consolidado](docs/briefing.md)
- [Plano do projeto](docs/plano-do-projeto.md)
- [Referências visuais (análise UY3 / Daycoval)](docs/referencias-visuais.md)
- Materiais originais do cliente: `docs/referencias/`

## Stack

Next.js 16 (App Router, páginas estáticas) · React 19 · TypeScript · Tailwind CSS 4 · Three.js (só o mascote 3D, carregado depois da página).
Animações: partículas que formam palavras (`ParticleField`, Canvas 2D), logo 3D arrastável em camadas CSS (`Logo3D`)
e o mascote 3D "Mini Eri" que desce a página e anda conforme a rolagem (`Mascote` + `mascote3d/cena.ts`, Three.js).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção
npm run typecheck
```

## Onde editar o conteúdo

Todo o texto está em `src/content/`. As páginas são geradas a partir desses arquivos.

| Arquivo | O que tem |
|---|---|
| `site.ts` | Dados da empresa, WhatsApp, endereço, região, missão/visão/valores, aviso legal |
| `servicos.ts` | Os 11 serviços: textos, público, passo a passo, documentos, FAQ |
| `cidades.ts` | Páginas de cidade (texto único por cidade) |
| `parceiros.ts` | Instituições parceiras (nomes; logos opcionais em `/public/parceiros`) |
| `faq.ts` | Perguntas frequentes gerais (página /faq) |
| `faqs.ts` | FAQ por serviço, agrupado por tema (enviado pela cliente) |

**Nova cidade:** copie um item de `cidades.ts`, troque o slug e escreva textos próprios. A página, o sitemap e
o schema são criados automaticamente. Não reaproveite o texto de outra cidade, porque o Google penaliza páginas duplicadas.

## Mapa do site

```
/                                  Home (foto da equipe, perfil, serviços, esteira, parceiros)
/consignado                        Página-destaque do consignado
/consignado/{inss|servidores-publicos|portabilidade-refinanciamento}
/servicos  /servicos/{slug}        7 serviços (inclui Microcrédito Itaú, atendimento regional)
/cidades   /cidades/{slug}         Jaguaquara, Entroncamento, Itiruçu, Itaquara, Jequié
/sobre  /contato  /faq  /politica-de-privacidade  /termos-de-uso
/sitemap.xml  /robots.txt
```

## Pendências (provisórios no site)

- [ ] **Logo oficial em vetor.** A atual foi vetorizada a partir de um JPG (`public/brand/`).
- [x] **Região:** Vale do Jiquiriçá (confirmado pela agência).
- [x] Simulador removido a pedido da cliente.
- [x] Parceiros: Itaú, C6, BRB, Facta, Banco do Brasil, Rodobens, BMG, PAN, iCred (faltam os logos, opcional).
- [ ] Revisão das respostas do FAQ pela cliente (`src/content/faqs.ts`).
- [ ] CEP, horário de funcionamento, Instagram e Facebook (`site.ts`).
- [ ] Números reais para contadores (anos, clientes), se o cliente quiser exibir.
- [ ] Mais fotos: fachada e interior da loja.
- [ ] Revisão jurídica da política de privacidade, dos termos e do aviso legal.
- [ ] GA4 / Google Tag Manager e Search Console (incluir aviso de cookies junto com o GA4).
- [ ] Aprovação do Eri para o mascote 3D "Mini Eri". Falas e poses por seção: `roteiro` em `src/components/Mascote.tsx`; poses e modelo em `src/components/mascote3d/cena.ts`. Seções marcadas com `data-mascote="chave"`. Pode ser trocado depois por um modelo .glb feito por um artista 3D.
- [ ] Link do Google Maps definitivo (`site.ts → mapa.perfilGoogle`).
