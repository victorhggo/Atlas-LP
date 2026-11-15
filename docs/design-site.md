# Site do Atlas: mapa de seções (para aprovação do Victor)

Base: PROMPT-SITE.md + .referencias/SINTESE.md. Tema claro (fundo branco azulado suave), navy do Atlas, vanilla HTML/CSS/JS sem biblioteca pesada (nenhuma das 3 referências usa GSAP/Three).

## Home (de cima para baixo)

| # | Seção | O que mostra (e o que esconde) | Animação-assinatura | Dossiê |
|---|---|---|---|---|
| 0 | Barra superior | Ícone do Atlas estilo app + menus Produto, AtlasLike, Comparar (vs Speedio, Econodata, Apollo), Planos, Quem faz; botões Entrar, Agendar, **Criar conta grátis** | menus abrem com atraso curto e painel com destaque "25 decisores grátis" | minimalist-ui + impeccable + web-design-guidelines |
| 1 | Hero | Atlas Orbit grande + título curto com palavra que troca (ex.: "O Atlas encontra / qualifica / aborda / agenda") + 2 CTAs | esfera segue o mouse com inércia; texto com halo leve; palavra troca letra a letra | frontend-design + impeccable + modern-web-guidance + vidro do onboarding |
| 2 | Vídeo "Como o Atlas funciona" | player próprio, 0 bytes até o clique, "Assistir com som", etapas clicáveis abaixo | hover no botão; pulso que roda 3 vezes | minimalist-ui + impeccable |
| 3 | Áreas trabalhando por você | 8 áreas (Prospectar, CRM, Inbox, Orbit, Agentes, Cadências, Ligar, Dashboard) em uma frase de resultado cada; sem lista de funções | faixas que deslizam + cartões com clipe curto ao passar | anti-ui-slop + minimalist-ui + copywriting |
| 4 | Jornada | 3 perguntas sobre a prospecção do visitante (autodiagnóstico), a resposta fica para a demonstração | faixa fixa com arco e número em destaque por passo | frontend-design + impeccable + modern-web-guidance |
| 5 | Lampejos do sistema | clipes de 8 a 15 s com zoom rápido (gravações reais do Atlas, tema claro), recortados, sem a tela inteira parada | zoom rápido de câmera dentro do vídeo; entra com o scroll | frontend-design + impeccable |
| 6 | AtlasLike | "O outbound feito por nós": mapa mental do serviço (da lista à reunião marcada) + botão aplicar | traços que se desenham, nós entrando em sequência, pontos correndo nas linhas | frontend-design + anti-ui-slop + modern-web-guidance |
| 7 | Números | 3 ou 4 números reais com fonte linkada e "conferido em" | contador uma vez ao entrar | minimalist-ui + copywriting + impeccable |
| 8 | Tecnologias e integrações | IAs e plataformas que o Atlas usa de verdade + integrações agrupadas (WhatsApp, Instagram, Google, CRMs, telefonia, automação) | órbita de logos leve, parada fora da tela | anti-ui-slop + minimalist-ui |
| 9 | Planos | Grátis, Start, Pro, Scale, Creator, AtlasLike pelo que cada um destrava, sem preço | troca suave entre planos | copywriting + marketing-psychology + minimalist-ui |
| 10 | Quem faz | "O Adriano e eu": Adriano Aquino e Victor Cassi, fotos com o mesmo tratamento, LinkedIn | foto que se abre ao passar | copywriting + impeccable |
| 11 | Fecho | **25 decisores grátis**, número grande, sem cartão + agendar | tecla navy do Atlas | marketing-psychology + copywriting + receita onboarding |
| 12 | Rodapé + cookies | links, política, LGPD; banner de cookies (aceitar, recusar, configurar) | entrada discreta | web-design-guidelines + minimalist-ui |
| ilha | Pílula flutuante | logo do Atlas + Orbit pequeno + "Agendar demonstração"; aparece depois do hero, some no fecho e no rodapé | Orbit acorda no hover, cápsula desliza com seta | frontend-design + impeccable |

## Páginas extras
- `/comparar/speedio/`, `/comparar/econodata/`, `/comparar/apollo/`: tabela ponto a ponto, só fatos públicos com fonte e data (copywriting + minimalist-ui + web-design-guidelines).
- `/atlaslike/`: página de serviço com árvore que realça no hover e linha do tempo que enche ao rolar (frontend-design + copywriting + anti-ui-slop).

## Orçamento
LCP pelo título em HTML (< 2 s em 4G), JS inicial ≤ 30 KB, esfera e vídeos só depois do primeiro desenho, vídeos 0 bytes até perto/clique, tudo parado fora da tela e com movimento reduzido.
