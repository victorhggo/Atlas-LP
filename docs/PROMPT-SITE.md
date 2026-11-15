# Site do Atlas: refazer a partir do repositório atual (prompt de trabalho)

## Objetivo
Transformar o site atual (repo `victorhggo/Atlas-LP`, cópia em `Desktop/Site Atlas`) num site novo que **instiga em vez de entregar tudo**. O visitante entende o que o Atlas faz, vê lampejos do sistema por dentro, sente "caramba, tem muito mais aí" e age: **cria a conta grátis (25 créditos = 25 decisores grátis)** ou **marca uma reunião**. Tudo no localhost; nada vai para o GitHub nem para o ar sem aprovação do Victor.

## O erro do site anterior (não repetir)
Mostrava quase tudo do sistema. Bom para filtrar curioso, ruim para gerar desejo: ninguém precisava marcar reunião porque já tinha visto tudo. Regra nova: **mostrar ~30% de cada coisa**. Telas aparecem em lampejos (zoom rápido, recorte, desfoque nas bordas), nunca a tela inteira parada; recursos aparecem como áreas e resultados, não como lista de funções. Cada bloco termina abrindo uma porta ("veja ao vivo na demonstração", "crie a conta e teste com 25 decisores").

## Referências (estudar a fundo, nunca copiar código, texto ou imagem)
Teardown completo em `.referencias/` (HTML, CSS, JS, prints, vídeos, SINTESE.md). Fulgurite: termos proíbem usar a plataforma para construir concorrente; usar só como inspiração de padrão visual, feita do jeito do Atlas.
- **arkom.ai**: esfera no hero que segue o mouse; texto brilhante com palavras que trocam; jornada animada; lampejos do sistema com zoom rápido e cinematográfico (sem delay, sem travar); animação tipo mapa mental; grade de "áreas trabalhando 24h"; tecnologias usadas (OpenAI, Claude, Gemini...); números e certificações; seção de liderança; pílula flutuante no rodapé estilo Dynamic Island com esfera animada.
- **kaptto.com.br**: bloco do vídeo de entrada com player e interação "assistir com som" no hover; integrações.
- **fulgurite.io** (+ página GTM): CTA "crie sua conta grátis e use X leads"; números grandes com fonte linkada; design da página GTM e o mapa mental/força; barra de navegação superior com menus (produto, serviço, comparativos "X vs Apollo", "X vs Econodata").

## Decisões fixas
- **Tema claro só.** Fundo NÃO é branco puro: branco suave azulado/acinzentado (família #EEF2F7 / #F3F6FA, conferir tokens do Atlas em `Atlas/web/app/globals.css` e o tema "vidro" do onboarding). Destaque **navy do Atlas** (tecla navy: degradê #34456A → #141E34, anel escuro, luz fina no topo; é o mesmo azul das legendas dos reels). Ice blue #EEF4FF / #A9C4F2 para seleção.
- **Sem preços.** Planos aparecem pela liberdade (o que cada um destrava: Grátis, Start, Pro, Scale, Creator, AtlasLike), sem valores. Fonte dos planos: `Atlas/web/components/planos.tsx` (só nomes, propostas e destaques reais).
- **CTAs (só dois):** primário "Criar conta grátis · 25 decisores" → `https://www.atlaslike.com/criar-conta`; secundário "Agendar demonstração" → WhatsApp `https://wa.me/5515996979750?text=...` (manter o texto atual). Mesmo par em todo o site.
- **Grafia: AtlasLike** (junto, uma palavra). O "Like" ganha só um diferencial de cor ou de fonte (ex.: navy mais claro, ou a mesma família em itálico/outro peso), nunca separado nem com espaço. Vale em todo o site.
- **AtlasLike** = nosso equivalente ao "GTM" da Fulgurite: o time do Atlas opera o outbound do cliente, da lista à reunião marcada ("Outbound feito por nós", sob medida). Ganha seção na home + página própria.
- **Atlas Orbit** = a esfera. Usar a esfera real (vídeos `video/orbe/calmo|agitado` gravados da prism-orb do sistema). Lição já aprendida: WebGL ao vivo travou a rolagem no primeiro desenho; o hero usa o vídeo da esfera com a interação de mouse feita por cima (transform com lerp, luz/realce que acompanha o cursor, partículas leves em canvas só depois do carregamento).
- **Vídeo "Como o Atlas funciona"**: `Downloads/Atlas - Como Funciona.mp4` (1:38, 1920x1080, 62 MB; o Victor confirmou este, NÃO o como-funciona.mp4). Reencodar para a web: 1080p e 720p em MP4 H.264 + WebM, alvo ~6-10 MB no 1080p, poster WebP, legenda opcional; nunca subir o original de 62 MB. Vai logo abaixo do hero, num player próprio com hover "Assistir com som", poster leve, carregamento só quando chegar perto.
- **Quem faz:** tom leve e amigável, nada de "liderança". Ordem: **Adriano primeiro, depois Victor**. Fotos e links em `Downloads/LinkedIn/` (provisórias, podem mudar): **Adriano Aquino** https://www.linkedin.com/in/theadrianoaquino/ (adriano.png) e **Victor Cassi** https://www.linkedin.com/in/vksi/ (victor.png). Otimizar as fotos (WebP/AVIF ~2 tamanhos) e dar tratamento uniforme (as duas têm fundos diferentes: recorte/fundo e tom iguais).
- **Comparativos** no menu: "Atlas vs Speedio", "Atlas vs Econodata", "Atlas vs Apollo" (lista confirmada pelo Victor em 2026-11-15). Só afirmações verificáveis, com fonte e data; nada inventado sobre concorrente. Cada comparativo é uma página própria.
- **Números com fonte:** só dados nota A já validados (`Desktop/Referencia Fulgurite/analise/03`), sempre com link e ano; números do Atlas só se forem reais e conferidos no código/banco (ex.: integrações = contar em `lib/integracoes-info.ts`; canais; créditos do plano grátis). Sem certificação (o Atlas ainda não tem; não inventar).
- **Tecnologias:** IAs e plataformas que o Atlas usa de verdade (conferir no código: OpenAI, Anthropic Claude, Google Gemini, Meta/WhatsApp Cloud API, Instagram API, Supabase, Vercel...). Logos oficiais monocromáticos.
- **Cookies:** banner de consentimento LGPD coerente com a política em `https://www.atlaslike.com/privacidade` (categorias necessárias/medição, aceitar/recusar/configurar, lembrar escolha, nada de medição antes do aceite).
- **Português do Brasil**, sem travessão "—" no texto, sem cara de IA (sem "não é X, é Y", sem listas "sem X, sem Y, sem Z", sem eyebrows em caixa alta, sem roxo, sem brilhos/sparkle, sem quadradinho colorido com ícone).

## Dossiê de design por seção (obrigatório; combinações diferentes por área)
Skills disponíveis: **impeccable** (craft floor, animate, critique), **frontend-design** (direção estética), **anti-ui-slop** (contrato por tela + finish gate + referências reais), **minimalist-ui** (art direction de sites, house style, loop olhar-e-corrigir), **copywriting**, **marketing-psychology**, **web-design-guidelines** (auditoria), **modern-web-guidance** (APIs/CSS modernos, desempenho), receita **design-tela-onboarding** (vidro claro, grão, tecla navy).

| # | Seção | Dossiê | Por quê |
|---|---|---|---|
| 0 | Barra superior (menus Produto, AtlasLike, Comparativos, Planos, Quem faz; ícone do Atlas estilo app; 2 CTAs) | minimalist-ui + impeccable + web-design-guidelines | navegação densa e limpa, acessível (teclado, foco, menus) |
| 1 | Hero: esfera Orbit que segue o mouse + título com palavras que trocam e brilho | frontend-design + impeccable (animate) + modern-web-guidance + receita onboarding (vidro) | é o momento de assinatura; precisa ser leve (LCP) |
| 2 | Vídeo "Como funciona" com player e "Assistir com som" | minimalist-ui + impeccable | moldura premium, interação contida |
| 3 | "Áreas do Atlas trabalhando por você": grade-relance dos módulos (Prospectar, CRM, Inbox, Orbit, Flow/Agentes, Cadências, Ligar, Dashboard) | anti-ui-slop + minimalist-ui + copywriting | evitar bento genérico; cada área com resultado, não função |
| 4 | Jornada animada (da lista à reunião) com lampejos do sistema em zoom rápido | frontend-design + impeccable (animate) + modern-web-guidance | movimento cinematográfico fluido, scroll-driven, sem travar |
| 5 | AtlasLike: mapa mental/força do serviço | frontend-design + anti-ui-slop + modern-web-guidance | desenho próprio, canvas/SVG leve |
| 6 | Números com fonte | minimalist-ui + copywriting + impeccable | tipografia de número, fonte linkada discreta |
| 7 | Tecnologias + integrações (logos) | anti-ui-slop + minimalist-ui | grade de logos sem virar parede |
| 8 | Planos pela liberdade (sem preço) | copywriting + marketing-psychology + minimalist-ui | desejo e escolha sem valor |
| 9 | Quem faz: Adriano e Victor | copywriting + impeccable | tom leve, fotos com acabamento |
| 10 | CTA final (25 decisores grátis + agendar) | marketing-psychology + copywriting + receita onboarding (tecla navy) | fechamento forte |
| 11 | Rodapé + banner de cookies | web-design-guidelines + minimalist-ui | LGPD, acessível |
| 12 | Ilha flutuante (logo + Orbit animado; aparece ao rolar; anima no hover) | frontend-design + impeccable (animate) | detalhe de assinatura, Liquid Glass sem exagero |
| 13 | Páginas de comparação | copywriting + minimalist-ui + web-design-guidelines | honestidade e escaneabilidade |
| 14 | Página AtlasLike | frontend-design + copywriting + anti-ui-slop | página de serviço com mapa mental |

Em todas: **impeccable craft floor** antes de dar por pronto, **anti-ui-slop finish gate**, e **web-design-guidelines** na auditoria final.

## Animação (fluida, com propósito)
- Uma assinatura por seção, nada de tudo mexendo. Easing firme do Atlas (`cubic-bezier(.22,1,.36,1)`), 160/260/420ms.
- Esfera: segue o mouse com lerp (sem atraso perceptível), luz que acompanha; no celular, leve movimento pelo giroscópio ou parado.
- Palavras do título trocam com máscara + brilho que percorre a palavra (CSS, sem layout shift).
- Lampejos do sistema: zoom rápido (300-450ms) com mola, recorte arredondado, desfoque de borda; vídeos curtos em loop só quando visíveis.
- Jornada e mapa mental: desenho progressivo guiado pela rolagem; nós entram em sequência.
- Ilha flutuante: aparece depois do hero, expande no hover (Liquid Glass leve, sem scale em selos).
- `prefers-reduced-motion`: tudo vira estado final estático.

## Desempenho e responsivo
- Celular primeiro: 360, 390, 430, 768, 1024, 1280, 1440, 1920. Sem rolagem horizontal; toques ≥ 44px.
- PageSpeed mobile ≥ 90 (desempenho, acessibilidade, boas práticas, SEO ≥ 95). LCP < 2,5s, CLS < 0,05, INP < 200ms.
- HTML/CSS/JS estático (arquitetura atual, sem build). Bibliotecas só se valerem o peso (avaliar GSAP/Lenis já usados); tudo pesado em carregamento tardio (IntersectionObserver/idle); vídeos WebM+MP4 com poster WebP, `preload="none"`; fontes com `font-display: swap` e subset; imagens com tamanho fixo.
- SEO/GEO mantidos e atualizados (title, meta, JSON-LD, sitemap com as páginas novas, llms.txt, og).

## Publicação
- Endereço do site por enquanto: **https://lp.atlaslike.com** (canonical, sitemap, og, JSON-LD, robots e llms.txt apontam para ele). www.atlaslike.com continua sendo o sistema; a troca de domínio fica para depois. CTAs continuam apontando para o sistema em www.atlaslike.com.

## Regras do Atlas
- Nada de push nem publicação sem o Victor aprovar no localhost. Commits locais só no repo `Site Atlas`.
- Nunca copiar código, textos, imagens ou dados das referências. Logos de terceiros só os oficiais e só para integrações/tecnologias reais.
- Afirmações só verdadeiras (conferir no código do Atlas). Sem chaves/senhas em lugar nenhum.

## Processo (superpowers)
1. Teardown das 3 referências (agente) → `.referencias/SINTESE.md`.
2. Documento de design curto (`docs/design-site.md`): direção, tokens, mapa de seções com o dossiê de cada uma, textos-base. Victor vê o mapa de seções antes do código pesado.
3. Construção por grupos de seção (um agente por vez, dono dos seus arquivos): (a) fundação + barra + hero + ilha; (b) vídeo + áreas + jornada; (c) AtlasLike + números + tecnologias/integrações; (d) planos + quem faz + CTA + rodapé + cookies; (e) páginas de comparação e AtlasLike.
4. Revisão independente (design + acessibilidade + Lighthouse) e correções.
5. Fotos em claro (desktop, tablet, celular) e servidor local para o Victor validar.

## Decisões do Victor (2026-11-15)
- **Esfera do hero: Orbit de partículas** (Canvas 2D ao vivo, receita SINTESE §3.1), nas cores do Atlas Orbit (navy → azul claro → branco azulado, sem roxo). Segue o mouse com inércia e se deforma; a mesma esfera em miniatura na ilha flutuante (reage ao hover). Substitui o vídeo da prism-orb no hero.
- Mapa de seções de `docs/design-site.md` aprovado para construir.
