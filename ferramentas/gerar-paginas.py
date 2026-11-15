# Gera /comparar/*/index.html e /atlaslike/index.html a partir do cabeçalho,
# rodapé, ilha e cookies do index.html (uma fonte só para as partes comuns).
import json, os, re
from urllib.parse import quote

RAIZ = r'C:\Users\VK\Desktop\Site Atlas'
BASE = 'https://lp.atlaslike.com'
idx = open(os.path.join(RAIZ, 'index.html'), encoding='utf8').read()

WA_DEMO = 'https://wa.me/5515996979750?text=Ol%C3%A1!%20Quero%20agendar%20uma%20demonstra%C3%A7%C3%A3o%20do%20Atlas.'
WA_AL = 'https://wa.me/5515996979750?text=' + quote('Olá! Quero aplicar para o AtlasLike. Minha empresa: ___. Vendemos para: ___. Meta de reuniões por mês: ___.', safe='')
CRIAR = 'https://www.atlaslike.com/criar-conta'
AL = '<span class="al" translate="no">Atlas<span>Like</span></span>'
SETA = '<svg class="seta" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"/></svg>'

def para_sub(html):
    """Ajusta um trecho do index para uma página interna."""
    html = re.sub(r'(href|src|srcset)="(img|css|js|fontes|video)/', r'\1="/\2/', html)
    html = html.replace('href="#topo"', 'href="/"')
    html = re.sub(r'href="#(?!i-orbit|conteudo)([a-z][\w-]*)"', r'href="/#\1"', html)
    return html

ini = idx.index('  <a class="pular"'); fim_cab = idx.index('  <main id="conteudo">')
cabecalho = para_sub(idx[ini:fim_cab])
ini_r = idx.index('  <!-- ===== 12. Rodapé ===== -->'); fim_r = idx.index('</body>')
rodape = para_sub(idx[ini_r:fim_r])
# a ilha volta ao topo da própria página
rodape = rodape.replace('<a class="ilha-marca" href="/" aria-label="Voltar ao início">', '<a class="ilha-marca" href="#topo" aria-label="Voltar ao topo">')
fecho = para_sub(idx[idx.index('    <!-- ===== 11. Fecho ===== -->'):idx.index('  </main>')])

ORG = {"@type": "Organization", "@id": BASE + "/#org", "name": "Atlas", "alternateName": "AtlasLike", "url": BASE + "/",
       "logo": BASE + "/img/logo-atlas-256.webp", "sameAs": ["https://www.instagram.com/atlasslike/", "https://www.atlaslike.com/"],
       "contactPoint": {"@type": "ContactPoint", "contactType": "sales", "telephone": "+55-15-99697-9750", "availableLanguage": "pt-BR", "areaServed": "BR"}}
APP = {"@type": "SoftwareApplication", "@id": BASE + "/#app", "name": "Atlas", "applicationCategory": "BusinessApplication",
       "operatingSystem": "Web", "inLanguage": "pt-BR", "url": "https://www.atlaslike.com/",
       "offers": {"@type": "Offer", "price": "0", "priceCurrency": "BRL", "description": "Plano Grátis com 25 créditos para testar (25 decisores), sem cartão."},
       "publisher": {"@id": BASE + "/#org"}}

def pagina(caminho, titulo, desc, og_titulo, ld_extra, corpo, migalha, com_fecho=True):
    url = BASE + caminho
    graph = [ORG, APP,
             {"@type": "WebPage", "@id": url + "#pagina", "url": url, "name": titulo, "description": desc, "inLanguage": "pt-BR",
              "isPartOf": {"@type": "WebSite", "@id": BASE + "/#site", "url": BASE + "/", "name": "Atlas"},
              "about": {"@id": BASE + "/#app"}, "dateModified": "2026-11-15"},
             {"@type": "BreadcrumbList", "itemListElement": [
                 {"@type": "ListItem", "position": k + 1, "name": n, "item": BASE + u} for k, (n, u) in enumerate(migalha)]}] + ld_extra
    ld = json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False, separators=(',', ':'))
    return f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>{titulo}</title>
  <meta name="description" content="{desc}">
  <meta name="theme-color" content="#EEF2F7">
  <link rel="canonical" href="{url}">
  <link rel="alternate" hreflang="pt-BR" href="{url}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Atlas">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:url" content="{url}">
  <meta property="og:title" content="{og_titulo}">
  <meta property="og:description" content="{desc}">
  <meta property="og:image" content="{BASE}/img/og-atlaslike.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Atlas, plataforma de vendas brasileira">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{og_titulo}">
  <meta name="twitter:description" content="{desc}">
  <meta name="twitter:image" content="{BASE}/img/og-atlaslike.jpg">
  <script type="application/ld+json">{ld}</script>
  <link rel="preload" href="/fontes/inter-tight-latin-600.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32.png">
  <link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
  <link rel="stylesheet" href="/css/tokens.css">
  <link rel="stylesheet" href="/css/site.css">
  <script>document.documentElement.classList.add("js")</script>
  <script type="module" src="/js/site.js"></script>
</head>
<body class="interna">
{cabecalho}  <main id="conteudo">
{corpo}
{fecho if com_fecho else ''}  </main>

{rodape}</body>
</html>
'''

def ico(i): return f'<svg class="ico" aria-hidden="true"><use href="/img/icones.svg#{i}"/></svg>'

# ---------------------------------------------------------------- comparar
FONTE_ATLAS = '<a href="https://www.atlaslike.com/planos">planos do Atlas</a>'
COMP = {
 'speedio': dict(
  nome='Speedio', cat='Prospecção B2B no Brasil', inicial='S',
  sub='Os dois ajudam a prospectar empresas no Brasil. Aqui está, ponto a ponto, o que cada um publica sobre o próprio produto.',
  desc='Atlas vs Speedio: o que cada um publica sobre base de empresas, contato do decisor, CRM e como começar. Só fatos com fonte, conferidos em novembro de 2026.',
  linhas=[
   ('O que é', 'Uma plataforma de vendas que acha quem decide e leva a conversa até a reunião, com prospecção, CRM, Inbox e cadências no mesmo lugar.', 'Uma empresa de big data focada em geração de leads B2B, com o objetivo de modernizar a prospecção ativa no Brasil.'),
   ('Base de empresas', 'Qualifica empresa a empresa: cada crédito traz quem decide, e só sai quando o Atlas encontra dados reais.', '25 milhões de empresas ativas, 17 milhões de decisores mapeados, 20 milhões de telefones e 17 milhões de e-mails, segundo o site.'),
   ('Como monta a lista', 'Pontua cada empresa e põe no topo quem tem mais chance de atender e comprar.', 'Mais de 80 filtros, como porte, região e faturamento, e a busca por empresas parecidas com os seus melhores clientes.'),
   ('Contato de quem decide', 'O telefone do decisor em todos os planos. Até 3 telefones por empresa no Start e todos a partir do Pro.', 'Decisores por nível e área e a checagem de quais telefones das empresas estão ativos.'),
   ('Depois da lista', 'CRM sem limite de leads, com WhatsApp, Direct do Instagram e Gmail na Inbox, e cadências por ligação, WhatsApp, e-mail, Instagram e LinkedIn no Pro.', 'Os dados seguem para o CRM e as planilhas que o time já usa.'),
   ('Como começar', 'Plano Grátis com 25 créditos, ou 25 decisores. Não precisa de cartão.', 'Teste grátis pelo site e planos mensais por número de empresas e de usuários, com onboarding e treinamento inclusos.'),
  ],
  fontes=[('https://speedio.com.br/', 'site do Speedio'), ('https://speedio.com.br/planos/', 'planos do Speedio')]),
 'econodata': dict(
  nome='Econodata', cat='Dados de empresas brasileiras', inicial='E',
  sub='Os dois partem de empresas brasileiras para chegar a quem decide. Aqui está, ponto a ponto, o que cada um publica sobre o próprio produto.',
  desc='Atlas vs Econodata: base de empresas, filtros, contato do decisor, integrações e como começar, com fonte. Conferido em novembro de 2026.',
  linhas=[
   ('O que é', 'Uma plataforma de vendas que acha quem decide e leva a conversa até a reunião, com prospecção, CRM, Inbox e cadências no mesmo lugar.', 'Uma plataforma de inteligência comercial e prospecção B2B, com uma API que leva os dados ao CRM, às automações e a agentes de IA, incluindo um servidor MCP.'),
   ('Base de empresas', 'Qualifica empresa a empresa: cada crédito traz quem decide, e só sai quando o Atlas encontra dados reais.', 'Mais de 26 milhões de empresas mapeadas, 5,4 milhões de decisores identificados e 45 campos de dados por empresa.'),
   ('Como monta a lista', 'Pontua cada empresa e põe no topo quem tem mais chance de atender e comprar.', 'Mais de 60 filtros e tags, busca em linguagem natural com a DoggIA e lookalike de clientes.'),
   ('Contato de quem decide', 'O telefone do decisor em todos os planos, mais site, Instagram, Google e e-mail da empresa.', 'E-mails e telefones validados, organograma, contatos de decisores e grupo econômico.'),
   ('Depois da lista', 'CRM sem limite de leads, com WhatsApp, Direct do Instagram e Gmail na Inbox, e cadências por ligação, WhatsApp, e-mail, Instagram e LinkedIn no Pro.', 'Painel de prospecção com tags e notas, exportação para Excel e integração com CRM, Zapier e API.'),
   ('Integrações', '28 integrações no hub, entre elas Google Agenda, Meta Ads, HubSpot, RD Station CRM, Zapier e Make.', 'CRM, Zapier, API e servidor MCP.'),
   ('Como começar', 'Plano Grátis com 25 créditos, ou 25 decisores. Não precisa de cartão.', 'Plano Premium montado com um especialista, teste gratuito e ferramentas grátis, como o Gerador de Leads e a extensão para Chrome.'),
  ],
  fontes=[('https://www.econodata.com.br/', 'site da Econodata'), ('https://www.econodata.com.br/prospectar-planos-e-precos', 'planos da Econodata')]),
 'apollo': dict(
  nome='Apollo', cat='Contatos B2B e abordagem', inicial='A',
  sub='Os dois juntam contatos e abordagem num lugar só. Aqui está, ponto a ponto, o que cada um publica sobre o próprio produto.',
  desc='Atlas vs Apollo: base de contatos, abordagem multicanal, IA, integrações, créditos e plano grátis, com fonte. Conferido em novembro de 2026.',
  linhas=[
   ('O que é', 'Uma plataforma de vendas brasileira que acha quem decide e leva a conversa até a reunião, com prospecção, CRM, Inbox e cadências no mesmo lugar.', 'Um sistema de go-to-market com dados de contatos, prospecção, abordagem, discador e agentes de IA.'),
   ('Base', 'Qualifica empresa a empresa: cada crédito traz quem decide, e só sai quando o Atlas encontra dados reais.', 'Mais de 240 milhões de contatos e 30 milhões de empresas.'),
   ('Abordagem', 'Cadências por ligação, WhatsApp, e-mail, Instagram e LinkedIn, que param sozinhas quando o lead responde (Pro).', 'Sequências de e-mail a partir do plano Basic e discador em paralelo.'),
   ('IA', 'Atlas Orbit, que responde por voz, texto ou print quem ligar agora, e agentes do Flow que rodam com Claude, GPT ou Gemini usando a sua chave.', 'Agentes que pesquisam contas, montam listas, escrevem a abordagem e marcam reuniões, e um servidor MCP.'),
   ('Integrações', '28 integrações no hub, além do WhatsApp e do Instagram na Inbox.', 'Mais de 200 integrações.'),
   ('Créditos', '1 crédito traz 1 decisor. A recarga soma no saldo e não expira.', 'Créditos compartilhados pelo time e renovados a cada ciclo. Os que sobram não passam para o ciclo seguinte.'),
   ('Como começar', 'Plano Grátis com 25 créditos, ou 25 decisores. Não precisa de cartão.', 'Plano Free sem prazo e sem cartão, e planos Basic, Professional e Custom, com todos os assentos da conta no mesmo plano.'),
  ],
  fontes=[('https://www.apollo.io/', 'site do Apollo'), ('https://www.apollo.io/pricing', 'planos e perguntas frequentes do Apollo')]),
}

MAIS = [
 ('i-messages-square', 'Inbox', 'WhatsApp, Direct do Instagram e Gmail respondidos ao lado da ficha do lead.'),
 ('i-route', 'Cadências', 'Se o lead não responde, o próximo passo entra na agenda. Se responde, a rota para.'),
 ('i-orbit', 'Atlas Orbit', 'Pergunte quem ligar agora e receba a resposta com o nome do lead.'),
 ('i-phone-call', 'Ligar', 'A fila do dia e o roteiro na tela, pela operadora que você já contrata.'),
]

def comparar(chave, c):
    caminho = f'/comparar/{chave}/'
    nome = c['nome']
    rot = ['Atlas', nome]
    linhas = '\n'.join(
        f'              <tr><th scope="row">{p}</th><td data-rotulo="Atlas">{a}</td><td data-rotulo="{nome}">{x}</td></tr>'
        for p, a, x in c['linhas'])
    fontes = ', '.join(f'<a href="{u}" rel="noopener">{t}</a>' for u, t in c['fontes'])
    mais = '\n'.join(
        f'            <li><h3>{"<svg class=\"ico\" aria-hidden=\"true\"><use href=\"#i-orbit\"/></svg>" if i == "i-orbit" else ico(i)}{t}</h3><p>{d}</p></li>'
        for i, t, d in MAIS)
    outras = '\n'.join(
        f'          <li><a href="/comparar/{k}/"{" aria-current=\"page\"" if k == chave else ""}>Atlas vs {v["nome"]}<svg aria-hidden="true"><use href="/img/icones.svg#i-arrow-left-right"/></svg></a></li>'
        for k, v in COMP.items())
    corpo = f'''    <section class="pg-topo" id="topo" aria-labelledby="t-topo" data-hero>
      <div class="moldura vs-grade">
        <div>
          <nav aria-label="Você está em"><ol class="trilha"><li><a href="/">Início</a></li><li aria-current="page">Atlas vs {nome}</li></ol></nav>
          <h1 id="t-topo">Atlas vs {nome}, ponto a ponto.</h1>
          <p class="pg-sub">{c['sub']}</p>
          <div class="pg-ctas">
            <a class="btn btn-navy btn-g" href="{CRIAR}">Criar conta grátis · 25 decisores{SETA}</a>
            <a class="btn btn-claro btn-g" href="{WA_DEMO}" target="_blank" rel="noopener">Agendar demonstração</a>
          </div>
          <p class="pg-nota">Conferido em novembro de 2026, nas páginas oficiais de cada empresa.</p>
        </div>
        <div class="vs-placa" aria-hidden="true">
          <div class="vs-lado"><span class="app-icone"><img src="/img/logo-atlas-64.webp" width="32" height="32" alt=""></span><b>Atlas</b><small>Da lista à reunião</small></div>
          <span class="vs-x">vs</span>
          <div class="vs-lado"><span class="vs-inicial">{c['inicial']}</span><b>{nome}</b><small>{c['cat']}</small></div>
        </div>
      </div>
    </section>

    <section class="secao cmp" id="ponto-a-ponto" aria-labelledby="t-cmp">
      <div class="moldura">
        <div class="cmp-cab">
          <h2 class="titulo-secao" id="t-cmp">Lado a lado, com o que cada um publica.</h2>
          <p>Só entra aqui o que está escrito nas páginas oficiais. Quando um ponto não aparece no site de um dos dois, ele fica de fora.</p>
        </div>
        <div class="tabela-caixa" role="region" aria-labelledby="cap-cmp" tabindex="0">
          <table class="tabela">
            <caption id="cap-cmp">Atlas e {nome}, ponto a ponto</caption>
            <thead><tr><th scope="col">Ponto</th><th scope="col">Atlas</th><th scope="col">{nome}</th></tr></thead>
            <tbody>
{linhas}
            </tbody>
          </table>
        </div>
        <p class="fontes"><b>Fontes:</b> {fontes} e {FONTE_ATLAS}. Conferido em novembro de 2026. Números e recursos podem mudar; vale sempre o que cada empresa publica hoje.</p>
      </div>
    </section>

    <section class="secao" id="junto" aria-labelledby="t-junto">
      <div class="moldura mais-atlas">
        <div>
          <h2 class="titulo-secao" id="t-junto">O que vem junto no Atlas.</h2>
          <p>Achar quem decide é o começo. O resto do caminho até a reunião também acontece dentro do Atlas.</p>
          <div class="mais-ctas">
            <a class="btn btn-navy btn-g" href="{CRIAR}">Testar com 25 decisores{SETA}</a>
            <a class="btn btn-claro btn-g" href="{WA_DEMO}" target="_blank" rel="noopener">Agendar demonstração</a>
          </div>
        </div>
        <ul class="mais-lista">
{mais}
        </ul>
      </div>
    </section>

    <section class="secao outras" aria-labelledby="t-outras">
      <div class="moldura">
        <h2 id="t-outras">Outras comparações</h2>
        <ul class="outras-lista">
{outras}
        </ul>
      </div>
    </section>
'''
    titulo = f'Atlas vs {nome}: comparação ponto a ponto | Atlas'
    html = pagina(caminho, titulo, c['desc'], f'Atlas vs {nome}, ponto a ponto', [], corpo,
                  [('Início', '/'), (f'Atlas vs {nome}', caminho)])
    return caminho, html

# ---------------------------------------------------------------- AtlasLike
def atlaslike():
    caminho = '/atlaslike/'
    nos = [
     ('i-target', 'Diagnóstico de ICP, persona e oferta', 'Contas e cargos prioritários, sinais de compra por segmento e a lista de quem não abordar: clientes, parceiros e concorrentes.'),
     ('i-list-ordered', 'Listas montadas e verificadas', 'A lista sai do seu ICP, dentro do Atlas, com telefone e e-mail de cada decisor checados um a um.'),
     ('i-file-text', 'Mensagens e ângulos por persona', 'O time escreve as mensagens de cada segmento e testa até achar o que gera conversa.'),
     ('i-route', 'Cadência em todos os canais', 'WhatsApp, LinkedIn, e-mail, Instagram e ligação, no ritmo certo, pelo seu perfil e pelos do seu time.'),
     ('i-messages-square', 'Nosso time responde', 'Quem responde a prospecção é o time do Atlas, até a reunião estar marcada.'),
     ('i-calendar-days', 'Reunião na sua agenda', 'Você aparece para a conversa de venda, com relatório toda semana ou quinzena.'),
    ]
    nos_html = '\n'.join(f'          <li class="arvore-no">{ico(i)}<h3>{t}</h3><p>{d}</p></li>' for i, t, d in nos)
    check = ico('i-check')
    corpo = f'''    <section class="pg-topo al-topo" id="topo" aria-labelledby="t-topo" data-hero>
      <div class="moldura al-topo-grade">
        <div>
          <nav aria-label="Você está em"><ol class="trilha"><li><a href="/">Início</a></li><li aria-current="page">{AL}</li></ol></nav>
          <h1 id="t-topo">{AL}, o outbound feito por nós.</h1>
          <p class="pg-sub">A gente assume a sua prospecção, da lista à reunião marcada na sua agenda. Você aparece para a conversa de venda.</p>
          <div class="pg-ctas">
            <a class="btn btn-claro btn-g" href="{WA_AL}" target="_blank" rel="noopener"><span>Aplicar para o {AL}</span>{SETA}</a>
            <a class="btn btn-vidro btn-g" href="{WA_DEMO}" target="_blank" rel="noopener">Agendar uma conversa</a>
          </div>
          <p class="pg-nota">Sob medida: créditos, canais e volume desenhados a partir da sua meta de reuniões.</p>
        </div>
        <ul class="al-pilares">
          <li><b>Estratégia</b><span>ICP, mensagens e testes</span></li>
          <li><b>Operação</b><span>Todos os canais, por nós</span></li>
          <li><b>Reuniões</b><span>Direto na sua agenda</span></li>
        </ul>
      </div>
    </section>

    <section class="secao" id="o-que-montamos" aria-labelledby="t-arvore">
      <div class="moldura">
        <div class="arvore-cab">
          <h2 class="titulo-secao" id="t-arvore">O que o nosso time monta para você.</h2>
          <p>Seis frentes saem do mesmo lugar: a sua conta no Atlas, operada pelo nosso time. Passe o mouse em cada uma para ver o caminho.</p>
        </div>
        <div class="arvore" data-arvore>
          <svg class="arvore-svg" aria-hidden="true" focusable="false"></svg>
          <div class="arvore-hub" aria-hidden="true"><span class="app-icone"><img src="/img/logo-atlas-64.webp" width="30" height="30" alt="" loading="lazy"></span>{AL}</div>
          <ul class="arvore-nos">
{nos_html}
          </ul>
        </div>
      </div>
    </section>

    <section class="secao tempo" id="como-funciona" aria-labelledby="t-tempo">
      <div class="moldura tempo-grade">
        <div class="tempo-cab">
          <h2 class="titulo-secao" id="t-tempo">Do diagnóstico à reunião marcada.</h2>
          <p>Quatro etapas. A partir da segunda, o trabalho é nosso e você acompanha pelos relatórios.</p>
        </div>
        <div>
          <div class="linha" data-linha>
          <span class="linha-trilho" aria-hidden="true"><i></i></span>
          <ol class="linha-lista">
            <li class="etapa"><span class="etapa-bola" aria-hidden="true">1</span><h3>Diagnóstico</h3><p>Definimos com você o ICP, a persona e a oferta, e montamos a lista de exclusão.</p>
              <ul><li>{check}Contas e cargos prioritários</li><li>{check}Sinais de compra por segmento</li><li>{check}Clientes, parceiros e concorrentes fora da prospecção</li></ul>
              <picture class="etapa-tela"><source srcset="/img/areas/prospectar.avif" type="image/avif"><img src="/img/areas/prospectar.webp" width="480" height="600" alt="Recorte da tela de Prospectar do Atlas" loading="lazy" decoding="async"></picture></li>
            <li class="etapa"><span class="etapa-bola" aria-hidden="true">2</span><h3>Estrutura</h3><p>Preparamos tudo para abordar sem expor o seu domínio principal.</p>
              <ul><li>{check}Domínios e caixas de envio dedicadas</li><li>{check}Aquecimento e monitoramento da entrega todos os dias</li><li>{check}Perfis do LinkedIn seus e do time prontos para prospectar</li></ul></li>
            <li class="etapa"><span class="etapa-bola" aria-hidden="true">3</span><h3>Operação</h3><p>Listas verificadas, mensagens por persona e cadência em todos os canais. Quem responde cada contato é o nosso time.</p>
              <ul><li>{check}WhatsApp, LinkedIn, e-mail, Instagram e ligação</li><li>{check}Testes de mensagem, segmento e ângulo</li><li>{check}O que gera conversa ganha volume</li></ul>
              <picture class="etapa-tela"><source srcset="/img/areas/cadencias.avif" type="image/avif"><img src="/img/areas/cadencias.webp" width="480" height="600" alt="Recorte da tela de Cadências do Atlas" loading="lazy" decoding="async"></picture></li>
            <li class="etapa"><span class="etapa-bola" aria-hidden="true">4</span><h3>Reuniões e ajustes</h3><p>A reunião cai na sua agenda. O que acontece nela volta para a lista e para as mensagens.</p>
              <ul><li>{check}Relatórios e alinhamentos semanais ou quinzenais</li><li>{check}Contas abordadas, respostas e reuniões marcadas</li><li>{check}Lista de exclusão sempre atualizada</li></ul>
              <picture class="etapa-tela"><source srcset="/img/areas/dashboard.avif" type="image/avif"><img src="/img/areas/dashboard.webp" width="480" height="600" alt="Recorte do Dashboard do Atlas" loading="lazy" decoding="async"></picture></li>
          </ol>
          </div>
          <p class="tempo-nota">A estratégia de ICP, oferta e mensagem é revisada com você durante todo o contrato.</p>
        </div>
      </div>
    </section>

    <section class="secao para-quem" id="para-quem" aria-labelledby="t-pq">
      <div class="moldura">
        <h2 class="titulo-secao" id="t-pq">Para quem é o {AL}.</h2>
        <div class="para-quem-grade">
          <div class="pq-bloco">
            <h3>Faz sentido se</h3>
            <ul>
              <li>{check}Você vende para outras empresas e sabe quanto vale uma reunião com quem decide.</li>
              <li>{check}Quer reuniões na agenda sem montar e treinar um time de prospecção agora.</li>
              <li>{check}Topa revisar ICP, persona e oferta com a gente antes de abordar o mercado.</li>
            </ul>
          </div>
          <div class="pq-bloco pq-inclui">
            <h3>O que já vem junto</h3>
            <ul>
              <li>{check}Tudo do plano Scale, para você e o seu time</li>
              <li>{check}Créditos e usuários sem teto</li>
              <li>{check}Integração com o seu CRM</li>
              <li>{check}API e relatórios dedicados</li>
              <li>{check}Gerente de conta dedicado</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="secao aplicar" id="aplicar" aria-labelledby="t-aplicar" data-sem-ilha>
      <div class="moldura">
        <h2 class="titulo-secao" id="t-aplicar">Como aplicar.</h2>
        <p class="aplicar-sub">O {AL} é sob medida: créditos, canais e volume saem da sua meta de reuniões. Por isso tudo começa com uma conversa.</p>
        <ol class="passos">
          <li><span class="passo-n" aria-hidden="true">1</span><b>Mande a mensagem</b><p>O botão abre o WhatsApp com um texto pronto. Complete com a sua empresa, para quem vende e a meta de reuniões.</p></li>
          <li><span class="passo-n" aria-hidden="true">2</span><b>Conversa de diagnóstico</b><p>Entendemos o seu ICP, a sua oferta e o que já foi tentado na prospecção.</p></li>
          <li><span class="passo-n" aria-hidden="true">3</span><b>Proposta sob medida</b><p>Créditos, canais e contas abordadas, desenhados junto com você a partir da meta.</p></li>
        </ol>
        <div class="aplicar-ctas">
          <a class="btn btn-navy btn-g" href="{WA_AL}" target="_blank" rel="noopener"><span>Aplicar para o {AL}</span>{SETA}</a>
          <a class="btn btn-claro btn-g" href="{WA_DEMO}" target="_blank" rel="noopener">Agendar uma conversa</a>
        </div>
      </div>
    </section>
'''
    servico = {"@type": "Service", "@id": BASE + "/atlaslike/#servico", "name": "AtlasLike", "serviceType": "Outbound B2B feito pelo time do Atlas",
               "description": "O time do Atlas assume o outbound do cliente, da lista à reunião marcada: diagnóstico de ICP, persona e oferta, listas verificadas, mensagens por persona com testes A/B, cadência em WhatsApp, LinkedIn, e-mail, Instagram e ligação, respostas conduzidas pelo time e relatórios semanais ou quinzenais. Sob medida para a meta de reuniões.",
               "provider": {"@id": BASE + "/#org"}, "areaServed": {"@type": "Country", "name": "Brasil"}, "availableLanguage": "pt-BR", "url": BASE + "/atlaslike/"}
    html = pagina(caminho, 'AtlasLike: o outbound feito por nós | Atlas',
                  'AtlasLike é o outbound feito pelo time do Atlas: diagnóstico, listas verificadas, mensagens, cadência em todos os canais e reunião marcada na sua agenda. Sob medida.',
                  'AtlasLike, o outbound feito por nós', [servico], corpo, [('Início', '/'), ('AtlasLike', caminho)], com_fecho=False)
    return caminho, html

saidas = [comparar(k, v) for k, v in COMP.items()] + [atlaslike()]
for caminho, html in saidas:
    pasta = os.path.join(RAIZ, *caminho.strip('/').split('/'))
    os.makedirs(pasta, exist_ok=True)
    open(os.path.join(pasta, 'index.html'), 'w', encoding='utf8', newline='\n').write(html)
    print('gerado', caminho, len(html))
