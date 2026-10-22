# Referências visuais — análise técnica

Referências enviadas pela agência: **uy3.com.br** (principal: menu e animações) e **daycoval.com.br** (organização).

Os efeitos do UY3 foram analisados com REA (análise estática dos scripts) e com capturas em navegador.
Nada será copiado: o código da Innovare será escrito do zero, usando as mesmas *técnicas*.

## UY3 — como foi feito

**Stack:** HTML estático + CSS próprio + 3 scripts em JavaScript puro (`uy3.js`, `uy3-particles.js`,
`uy3-typewriter.js`) + 3 scripts inline. Sem framework, sem biblioteca de animação, sem bundler.
Tudo é Canvas 2D, CSS (transições, `@keyframes`, `backdrop-filter`) e `IntersectionObserver`.

### 1. Fundo de partículas ("constelação")
- `<canvas>` fixo atrás da página, desenhado com Canvas 2D e `requestAnimationFrame`.
- Quantidade proporcional à área da tela: `área / 15000`, entre 36 e 120 pontos.
- Cada ponto tem uma velocidade aleatória pequena (~0,34 px/quadro). Quem sai por uma borda volta pela outra.
- Dois pontos a menos de **160 px** são ligados por uma linha, com opacidade que cai com a distância.
- **Distribuição em "U":** 62% dos pontos nascem perto das laterais, deixando o centro livre para o texto do hero.
- **Mouse:** repele os pontos num raio de 90 px. **Clique:** cria 4 pontos novos.
- Brilhos em degradê radial nos 4 cantos.
- **Performance:** densidade de pixels (DPR) limitada a 2, pausa quando a aba fica oculta, e só recria os pontos
  quando a *largura* muda (no celular, a barra de endereço muda só a altura).
- `prefers-reduced-motion`: desenha um único quadro estático.
- **Luz que segue o mouse:** o script grava `--light-x/--light-y` no `<html>` e o CSS usa essas variáveis num
  `radial-gradient` para "acender" as caixas escuras.

### 2. Menu
- **Desktop:** barra flutuante em formato de pílula (bordas arredondadas, borda fina), fixa no topo.
  Depois de 24 px de rolagem ganha a classe `.scrolled`, com vidro fosco (`backdrop-filter: blur(26px) saturate(180%)`).
  Botão de CTA laranja em destaque à direita.
- **Mobile:** o hambúrguer vira "X" (duas barras que giram 45°). O menu abre em tela cheia com
  `blur(30px)` e os links entram **em cascata**: cada um com 55 ms de atraso, via variável CSS `--d`.
- **Acessibilidade:** `aria-expanded`, `aria-hidden` e fechamento com Esc ou ao clicar num link.

### 3. "Esteira de crédito" (fluxo animado)
- 9 cards em zigue-zague, ligados por fios tracejados. Um **cometa de luz** percorre os fios de card em card.
- Cada elemento tem um `data-seq`. O script calcula `--seq-delay = seq × 0,65s` e o CSS faz o resto.
- A animação começa quando a seção entra na tela (`IntersectionObserver`). Para reiniciar, usa dois
  `requestAnimationFrame` em vez de forçar reflow, o que evita travar o scroll no iOS.

### 4. Outros efeitos
- **Reveal no scroll:** elementos entram com fade/slide ao aparecer. Tem uma "rede de segurança" que revela
  o que já está na tela se o observer falhar.
- **Contadores:** números do hero contam até o valor final em 3 s, com *ease-out* cúbico.
- **Logo 3D:** várias cópias do SVG empilhadas no eixo Z simulam espessura, e a peça inclina seguindo o cursor.
- **Typewriter:** texto digitado caractere a caractere em 5 s quando 30% do bloco fica visível.
- **WhatsApp flutuante:** só aparece depois que o hero sai da tela, para não cobrir o CTA principal.
- **Transições entre páginas:** `@keyframes` de saída e entrada com blur (View Transitions).
- Seções alternam fundo escuro, laranja e claro, o que dá ritmo à página.

## Daycoval — o que aproveitar
- Site em Angular + jQuery, sem animações marcantes. A referência aqui é de **organização**:
- header em dois níveis (atalhos e CTAs em cima, categorias com submenu embaixo);
- divisão clara "Para você" / "Para sua empresa" com cards de serviço;
- botão "Consignado" em destaque no topo. Para a Innovare: **Consignado INSS/Servidores** em destaque no header;
- widgets de acessibilidade (Libras/leitura), que fazem sentido para o público da Innovare.

## Tradução para a Innovare

| Referência | Innovare |
|---|---|
| Fundo quase preto + laranja | Fundo marinho `#082343`, linhas em azul `#1768B3`, pontos de destaque em laranja `#F28A2B` |
| Constelação no hero | Mesma técnica, mais um efeito próprio: **as partículas convergem e formam a palavra/logo "Innovare"** (ou a frase do hero) e depois se soltam e voltam a flutuar. A forma do texto é amostrada num canvas invisível e cada partícula viaja até um ponto dela. Quanto menos partículas no celular, mais leve |
| Menu pílula com vidro | Igual, com "Consignado" e "Simular" em destaque. No mobile, menu em tela cheia com cascata e botão grande de WhatsApp |
| Esteira de crédito | **"Como funciona"** (Conversa no WhatsApp → Análise do perfil → Proposta explicada → Contratação) e base visual do **simulador**: ao escolher perfil, valor e prazo, a luz percorre as etapas e o resultado aparece com contagem animada |
| Contadores | Números reais da Innovare (anos, clientes, cidades) — dependem do cliente |
| Logo 3D | Logo da Innovare em 3D na seção "Sobre" (depende do SVG da logo) |
| Seções escuras/laranja | Hero e destaques em marinho, faixas de CTA em laranja e conteúdo em fundo branco para leitura confortável |

**Cuidados para o público** (mais velho, celular simples):
- textos e botões grandes;
- animações nunca bloqueiam a leitura;
- versão estática com `prefers-reduced-motion`;
- menos partículas e sem efeitos pesados em aparelhos fracos.
